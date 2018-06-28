<template>
	<div class="addInvest">
		<div class="money-box">
			<ul>
				<li>
					<p>账户余额</p>
					<span>{{getAmount(model.AvailBal)}}</span>
				</li>
				<li>
					<p>可投金额</p>
					<span>{{getAmount(model.SurplusAmount)}}</span>
				</li>
			</ul>
		</div>
		<div class="item-box">
			<div class="item border-1px">
				<input type="number" value="" :placeholder="placeholder(model.MinInvestAmount,model.MaxInvestAmount || model.SurplusAmount)" v-model="viewModel.amount" @input="watchInput" />
				<router-link :to="{name:'recharge'}" class="btn">去充值</router-link>
			</div>
			<div class="item">
				<span>一键全投</span>
				<div id="switch" class="mui-switch mui-switch-mini" @toggle="btnSwitch($event)">
					<div class="mui-switch-handle"></div>
				</div>
			</div>
		</div>
		<div class="item-box">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" :class="{default:!viewModel.isChoice}" @tap="showPeriods">
					<span>{{viewModel.sName}}</span>
					<div class="right">
						<span>{{viewModel.pName}}</span>
						<i class="mui-icon mui-icon-arrowright" v-show="viewModel.isChoice"></i>
					</div>
				</li>
				<li class="mui-table-view-cell default">
					<span>年利率</span>
					<div class="right">
						<span class="num">{{model.Rate}}</span>
					</div>
				</li>
				<li class="mui-table-view-cell default">
					<span>预期收益</span>
					<div class="right">
						<span class="num">{{viewModel.profit}}</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="item-box">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" @tap="showCoupon">
					<span>选择卡券</span>
					<div class="right">
						<span>{{viewModel.hbName}}</span>
						<i class="mui-icon mui-icon-arrowright"></i>
					</div>
				</li>
			</ul>
		</div>
		<div class="item-box code mui-hidden">
			<div class="item">
				<input type="password" value="" placeholder="请输入安全码"  />
				<router-link :to="{name:'safetyCode'}" class="btn">忘记安全码</router-link>
			</div>
		</div>
		<div class="xieyi-box">
			<div class="input-box">
				<input class="checkbox" type="checkbox" v-model="viewModel.agree" />
			</div>
			<div class="text">
				<span>我已阅读并同意签署</span>
				<router-link :to="{name:'riskNote'}">《风险提示书》</router-link>
				<router-link :to="{name:'loanContract'}">《融资借款合同》</router-link>
				<router-link :to="{name:'transferProtocol'}">《债权转让协议》</router-link>
			</div>
		</div>
		<div class="btn-box">
			<button class="mui-btn mui-btn-primary mui-btn-block" :class="{'mui-btn-grey':grey}" :disabled="grey" @tap="sendTender">确认出借</button>
		</div>
		<div id="huifu" v-html="huifu"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				huifu: "",
				isBack: false,
				grey: false,
				check: true,
				picker: null,
				couponPicker: null,
				watch: null,
				//hongbao: false,
				//isTransfer: false,
				id: this.$route.query.id,
				type: Number(this.$route.query.type),
				loanType: this.$route.query.loanType,
				model: {},
				viewModel: {
					pName: "",
					amount: "",
					profit: '0.00',
					hbName: "",
					agree: true,
					isChoice: false
				}
			}
		},
		created: function() {
			this.loading = this.sui.wait(true, '正在加载');
			this.sui.request('Invest/InvestInfo', {
				id: this.id,
				loanType: this.type
			}, "get", (data) => {
				this.loading = this.sui.closewait(this.loading);
				if(data) {
					var IsPass = data.IsPass;
					if(IsPass) {
						this.model = data.ReturnObject;
						this.init();
						this.couponPicker = new mui.PopPicker();
					} else {
						mui.toast(data.Desc);
					}
				}
			});
		},
		mounted: function() {
			this.$nextTick(() => {
				mui('.mui-switch')['switch']();
				mui("body").on('tap', '#Authorize', () => {
					this.$router.push({
						name: "Authorize"
					})
				})
			})
		},
		beforeDestroy: function() {
			this.isBack = true;
			mui.closePopups()
		},
		methods: {
			init() {
				/*
				//债转不能使用红包，年月账户债转可使用We券
				if(this.type != 4 || (this.type == 4 && this.loanType != 1)) {
					this.hongbao = true;
				}
				if(this.type == 4 && this.loanType != 1) {
					//判断是否是年月账户的债转标
					this.isTransfer = true;
				}
               */
				//初始化请求结果处理
				//出借期限处理
				var param = {
					choice: false,
					name: "出借期限",
					pName: "", //出借期限+单位
					periods: 1 //出借期限
				};

				if(this.id != 0 && this.type != 2 && this.type != 3 && this.loanType != 2 && this.loanType != 3) {
					//房易融 和房易融债转 不能选择期数 （合规调整，年月账户债转与房易融调成一致）
					param.name = this.type == 4 ? "剩余期数" : "出借期限";
					//1-天 2-月 3-年 4-小时
					param.pName = this.model.LoanTerm + ["天", "个月", "年", "小时"][this.model.LoanTermUnit - 1];
					param.periods = this.model.LoanTermUnit == 3 ? this.model.LoanTerm * 12 : this.model.LoanTerm;
				} else {
					//年月账户才可以选择期数
					var pickerArr = [];
					//1-天 2-月 3-年 4-小时
					//债转
					if(this.type == 4) {
						//年债
						/*
						if(this.loanType == 3) {
							var year = this.model.LoanTerm / 12;
							if(year == 1) {
								//param.choice=false;
								param.name = "剩余期数";
							} else {
								param.choice = true;
								param.name = "选择期数";
								for(var i = 0; i < year; i++) {
									pickerArr.push({
										v: (i + 1) * 12,
										t: (i + 1) * 12 + "个月"
									});
								}
								this.picker = new mui.PopPicker();
								this.picker.setData(pickerArr);
							}
						} else {
							//月债
							if(this.model.LoanTerm == 1) {
								param.name = "剩余期数";
							} else {
								param.choice = true;
								param.name = "选择期数";
								for(var i = 0; i < this.model.LoanTerm; i++) {
									pickerArr.push({
										v: i + 1,
										t: (i + 1) + "个月"
									});
								}
								this.picker = new mui.PopPicker();
								this.picker.setData(pickerArr);
							}
						}
						*/
						param.name = "剩余期数";
						param.pName = this.model.LoanTerm + "个月"; //所有债转期数都是月份单位
						param.periods = this.model.LoanTerm; //默认最大的
					} else {
						if(this.model.LoanTerm == 1) {
							param.name = "出借期限";
						} else {
							param.choice = true;
							param.name = "选择期数";
							for(var i = 0; i < this.model.LoanTerm; i++) {
								var v = this.model.LoanTermUnit == 3 ? (i + 1) * 12 : (i + 1);
								pickerArr.push({
									v: v,
									t: (i + 1) + ["天", "个月", "年", "小时"][this.model.LoanTermUnit - 1]
								});
							}
							this.picker = new mui.PopPicker();
							this.picker.setData(pickerArr);
						}
						param.pName = ((this.model.LoanTermUnit == 3 || this.model.LoanTermUnit == 2) ? 1 : this.model.LoanTerm) + ["天", "个月", "年", "小时"][this.model.LoanTermUnit - 1];
						param.periods = this.model.LoanTermUnit == 3 ? 12 : 1; //默认最小的
					}
				}
				this.viewModel.periods = param.periods;
				this.viewModel.pName = param.pName;
				this.viewModel.isChoice = param.choice;
				this.viewModel.sName = param.name;
				if((this.loanType == 2 && this.type == 4) || this.type == 2) {
					this.model.Rate = this.getRate(param.periods).toFixed(1) + '%';
				}
				//按钮处理
				//状态： 6-可加入 7-撤标中 8-流标 9-已结束 10-放款中 11-还款中 12-还款完成
				//债转：状态：1-转让中 2-取消 3-成功 4-失败
				if(this.model.SurplusAmount <= 0) {
					//所有标
					this.grey = true;
				}
				if(this.id != 0) {
					if(this.type == 4 && this.model.State != 1) {
						//债转且不是转让中
						this.grey = true;
					}
					if(this.type != 4 && this.model.State != 6) {
						//不是债转标且不是可加入
						this.grey = true;
					}
				}

				if(!this.model.IsRealAuth) {
					this.realAuth();
				} else if(!this.model.IsAutoTender) {
					this.isAutoTender();
				}
			},
			getRate(periods) {
				//月账户利率计算
				var rate = 8.7 + 0.1 * periods;
				return rate > 10.8 ? 10.8 : rate;
			},
			expectProfit() {
				//计算预期收益
				if(!this.viewModel.amount || ((typeof this.viewModel.amount != "number") && !this.viewModel.amount.isFloat()) || this.viewModel.amount <= 0 || this.viewModel.amount < this.model.MinInvestAmount) {
					this.viewModel.profit = '0.00';
					return;
				}
				var postData = {
					refundWay: this.model.RefundWays,
					loanType: this.loanType,
					amount: this.viewModel.amount,
					rate: ((this.loanType == 2 && this.type == 4) || this.type == 2) ? this.getRate(this.viewModel.periods) : this.model.TenderRate,
					periods: this.viewModel.periods,
					quanId: this.viewModel.couponId
				};
				this.sui.request('Invest/ExpectProfit', postData, "get", (data) => {
					data && (this.viewModel.profit = this.sui.rmoney(data.Profit));
				}, false);
			},
			watchInput() {
				//出借金额输入框
				clearTimeout(this.watch);
				this.watch = setTimeout(() => {
					this.expectProfit();
					this.viewModel.hbName = "";
					this.viewModel.couponId = "";
				}, 800);
			},
			placeholder(min, max) {
				//input框提示文字
				return min ? '请输入出借金额(' + this.sui.rmoney(min) + '-' + this.sui.rmoney(max) + ')' : '请输入出借金额';
			},
			btnSwitch() {
				//一键全投切换
				if(event.detail.isActive) {
					var value = this.model.AvailBal > this.model.SurplusAmount ? this.model.SurplusAmount : this.model.AvailBal;
					if(this.model.MaxInvestAmount) {
						value = value > this.model.MaxInvestAmount ? this.model.MaxInvestAmount : value;
					}
					this.viewModel.amount = value ? value.toFixed(2) : 0;
					this.expectProfit(); //计算预期收益
					this.viewModel.hbName = "";
					this.viewModel.couponId = null;
				}
			},
			showPeriods() {
				//选择期数
				if(this.picker) {
					this.picker.show((items) => {
						if(items[0] && items[0].v && this.viewModel.couponId != items[0].v) {
							this.viewModel.pName = items[0].t;
							this.viewModel.couponId = items[0].v;
							this.viewModel.hbName = "";
							this.viewModel.couponId = null;
							if((this.loanType == 2 && this.type == 4) || this.type == 2) {
								this.model.Rate = this.getRate(items[0].v).toFixed(1) + '%';
							}
						}
					});
				}
			},
			showCoupon() {
				//选择优惠券
				this.loading = this.sui.wait(true, '正在加载');
				this.sui.request('Loan/CouponList', {
					investAmount: this.viewModel.amount || 0,
					investPeriod: (this.model.RefundWays == 1 ? 1 : this.viewModel.periods),
					//isTransfer: this.isTransfer
				}, "get", (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						if(data.IsPass) {
							if(data.ReturnList.length) {
								var quanArr = [];
								for(var i = 0, item; item = data.ReturnList[i++];) {
									quanArr.push({
										v: item.Id,
										t: item.Name
									});
								}
								this.couponPicker.setData(quanArr);
								setTimeout(() => {
									this.couponPicker.show((items) => {
										if(items[0] && items[0].v) {
											this.viewModel.hbName = items[0].t;
											this.viewModel.couponId = items[0].v;
										}
									});
								}, 50);
							} else {
								//无可用优惠券
								this.viewModel.hbName = "暂无可用优惠券";
								this.viewModel.couponId = null;
							}
						} else {
							mui.toast(data.Desc);
						}
					}
				});
			},
			realAuth() {
				//去实名认证
				var btn = ['取消', '立即开通'];
				mui.confirm('您还没有开通银行存管账户，请先开通', '', btn, (e) => {
					if(e.index == 1) {
						//去开通银行存管账户
						this.$router.push({
							name: "openingAccount"
						});
						/*
						this.loading = this.sui.wait(true, '正在加载');
						this.sui.request('User/RealAuth', {
							channel: 2
						}, 'get', (data) => {
							this.loading = this.sui.closewait(this.loading);
							if(data) {
								if(data.IsPass) {
									this.huifu = data.ReturnObject;
									this.$nextTick(() => {
										document.getElementById('HuiFuForm').submit();
									})
								}
							}
						})*/
					} else {
						if(!this.isBack) {
							this.$router.go(-1);
						}
					}
				});
			},
			isAutoTender() {
				let textArr = [
					`
						<div class="_mui-popup-title"> </div>
					`,
					`
						<div class="_mui-popup-text">欢迎您首次出借！出借前，需您授权第三方支付机构，授权确认方可进行下一步操作。</div>
					`
				]
				mui.confirm(textArr[1], textArr[0], ['取消', '立即授权'], (e) => {
					if(e.index == 1) {
						this.$router.push({
							name: "businessAuth"
						})
					} else {
						if(!this.isBack) {
							this.$router.go(-1);
						}
					}
				}, 'div');
			},
			sendTender() {
				//发送出借
				if(!this.sui.isLogin()) {
					this.$router.push({
						name: "login"
					})
					return;
				}
				if(this.sui.IsNullOrEmpty(this.viewModel.amount) || this.viewModel.amount <= 0) {
					mui.toast('请输入出借金额');
					return;
				} else if(typeof(this.viewModel.amount) != 'number' && !this.viewModel.amount.isFloat()) {
					mui.toast('请输入正确的出借金额');
					return;
				} else if(this.model.AvailBal <= 0 || this.viewModel.amount > this.model.AvailBal) {
					mui.toast('您的账户余额不足，请先充值');
					return;
				} else if(this.model.MinInvestAmount > this.viewModel.amount) {
					mui.toast('出借金额不能低于' + this.sui.rmoney(this.model.MinInvestAmount));
					return;
				} else if(this.model.MaxInvestAmount != 0 && this.viewModel.amount > this.model.MaxInvestAmount) {
					mui.toast('出借金额不能高于' + this.sui.rmoney(this.model.MaxInvestAmount));
					return;
				} else if(!this.viewModel.agree) {
					mui.toast('请先阅读并同意签署风险提示书以及借款合同');
					return;
				} else if(!this.model.IsRealAuth) {
					this.realAuth();
					return;
				}
				this.loading = this.sui.wait(true, '请稍候...');
				var postData = {
					Id: this.id == 0 ? '' : this.id,
					LoanType: this.type,
					Periods: this.viewModel.periods,
					TenderAmount: this.viewModel.amount,
					CouponId: this.viewModel.couponId ? this.viewModel.couponId : '',
					Channel: 2,
					Agree: this.viewModel.agree
				}
				this.sui.request('Invest/SendTender', postData, "post", (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						var IsPass = data.IsPass;
						if(IsPass) {
							//出借成功处理
							mui.toast('提交成功，系统正在处理')
							this.$router.go(-1);
						} else {
							if(data.StatusCode == 'S0014') {
								//还未实名认证
								this.realAuth();
							} else if(data.StatusCode == 'S0045') {
								//还未授权汇付自动投标
								this.isAutoTender();
							} else if(data.StatusCode == 'S1030') {
								let textArr = [
									`
										<div class="_mui-popup-title">首次出借需要您签署<span id="Authorize">电子签章授权委托书</span>，请先同意签署</div>
									`,
									`
										<div class="_mui-popup-text">注：电子签章和电子合同，与纸质合同具有同等的法律证据效力；用户交易后可在【我的账户】—【我的出借】和【我的转让】中查看已发生交易的电子合同。</div>
									`
								]
								mui.confirm(textArr[1], textArr[0], ['拒绝', '同意签署'], (e) => {
									if(e.index == 1) {
										this.loading = this.sui.wait(true, '请稍候...');
										this.sui.request('Invest/EsignAuthorize', {}, 'get', (data) => {
											this.loading = this.sui.closewait(this.loading);
											if(data) {
												if(data.IsPass) {
													mui.toast('签署成功');
												} else {
													mui.toast(data.Desc);
												}
											}
										});
									} else {
										if(!this.isBack) {
											this.$router.go(-1);
										}
									}
								}, 'div');
							} else if(data.StatusCode == 'S1033') {
								this.$router.push({
									name: "riskText"
								})
							} else {
								mui.toast(data.Desc);
							}
						}
					}
				});
			},

			//格式化函数:
			getAmount(value) {
				return value ? this.sui.rmoney(value) : '0.00';
			}
		}
	}
</script>

<style lang="scss">
	.addInvest {
		padding-bottom: 70px;
		background: #f7f7f9;
		.mui-popup-title {
			font-size: 16px;
			span {
				color: #007aff;
			}
		}
		.money-box {
			padding: 24px;
			background-color: #1e82d2;
			ul {
				display: flex;
				li {
					position: relative;
					flex: 1;
					text-align: center;
					&:after {
						content: '';
						position: absolute;
						right: -1px;
						top: 6px;
						bottom: 6px;
						width: 1px;
						border-left: 1px solid #FFFFFF;
						@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio:1.5) {
							transform: scaleX(0.7);
							-webkit-transform: scaleX(0.7);
						}
						@media (-webkit-min-device-pixel-ratio:2),
						(min-device-pixel-ratio:2) {
							transform: scaleX(0.5);
							-webkit-transform: scaleX(0.5);
						}
						@media (-webkit-min-device-pixel-ratio:3),
						(min-device-pixel-ratio:3) {
							-webkit-transform: scaleX(.35);
							transform: scaleX(.35);
						}
					}
					&:last-child {
						@include border-none()
					}
					p {
						margin-bottom: 18px;
						font-size: 16px;
						color: #FFFFFF;
					}
					span {
						color: #FFFFFF;
					}
				}
			}
		}
		.item-box {
			position: relative;
			background: #FFFFFF;
			margin-bottom: 10px;
			&.code {
				.item {
					padding-right: 100px;
					@include border-none();
					input {
						margin: 0;
					}
				}
			}
			.item {
				position: relative;
				padding: 15px 65px 15px 15px;
				&:first-child {
					@include border-1px(#E3E3EA)
				}
				input {
					border: none;
					line-height: initial;
					margin: 15px 0;
					padding: initial;
					height: initial;
					font-size: 16px;
				}
				a {
					&.btn {
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						right: 15px;
						font-size: 16px;
					}
				}
				.mui-switch {
					position: absolute;
					right: 15px;
					top: 50%;
					transform: translateY(-50%);
				}
			}
			.mui-table-view {
				.mui-table-view-cell {
					position: relative;
					padding: 15px;
					font-size: 0;
					&.default {
						background: #ffffff !important;
					}
					span {
						display: inline-block;
						vertical-align: top;
						font-size: 16px;
						color: #2c2c2c;
					}
					.mui-icon {
						margin-left: 5px;
						vertical-align: top;
						color: #999999;
					}
					.right {
						position: absolute;
						line-height: 24px;
						right: 15px;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}
		.xieyi-box {
			display: flex;
			padding: 5px 15px 15px;
			.input-box {
				margin-right: 10px;
				position: relative;
				width: 24px;
				height: 24px;
			}
			.text {
				line-height: 23px;
				font-size: 12px;
				color: #2c2c2c;
				a {
					display: block;
				}
			}
		}
		.btn-box {
			padding: 0 15px;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			background: #FFFFFF;
			-webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .85);
			box-shadow: 0 0 1px rgba(0, 0, 0, .85);
			.mui-btn {
				margin-top: 10px;
			}
		}
	}
</style>