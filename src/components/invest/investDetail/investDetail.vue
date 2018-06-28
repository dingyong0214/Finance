<template>
	<div class="investDetail">
		<div class="background">
			<div class="invest-header">
				<div class="interest-box">
					<div class="interest" v-html="getRate()">
						<!--8.8
						<div class="lv">AA</div>
						<div class="jia">+2.0%</div>-->
					</div>
					<span>年利率</span>
				</div>
				<div class="schedule-wrap">
					<div class="schedule-box">
						<div class="schedule" :style="{width: getProgress()+'%'}"></div>
					</div>
				</div>
				<ul class="text-box">
					<!--1-房易融 2-月账户 3-年账户 4-债转-->
					<li class="border-1px">
						<p>{{type==4?model.UserName:getAmount(model.MinInvestAmount)}}</p>
						<p>{{type==4?"债转人":"起投金额"}}</p>
					</li>
					<li class="border-1px">
						<p>{{getTerm()}}</p>
						<p>{{termNoun()}}</p>
					</li>
					<li class="border-1px">
						<p>{{investedAmt()}}</p>
						<p>{{type==4?"转让金额":"借款金额"}}</p>
					</li>
				</ul>
			</div>
			<img src="./user-bg.png" width="100%" />
			<div class="wave">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="150">
					<g fill="rgba(255,255,255,0.03)">
						<path d="M 0 70 Q 75 39, 150 70 T 300 70 T 450 70 T 600 70 T 750 70  T 900 70  T 1050 70 T 1200 70 T 1350 70 V 200 H 0 V 0"></path>
						<animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-300" dur="8s" repeatCount="indefinite"></animateTransform>
					</g>
					<g fill="rgba(255,255,255,0.045)">
						<path d="M 0 70 Q 87.5 47, 175 70 T 350 70 T 525 70 T 700 70 T 875 70 T 1050 70 T 1225 70 T 1400 70  T 1575 70  V 200 H 0 V 0"></path>
						<animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-350" dur="16s" repeatCount="indefinite"></animateTransform>
					</g>
					<g fill="rgba(255,255,255,0.057)" transform="translate(-903.868 0)">
						<path d="M 0 70 Q 135 36, 270 70 T 540 70 T 810 70 T 1080 70 T 1350 70 T 1620 70  V 200 H 0 V 0" transform="translate(-38.232284367796474, 0)"></path>
						<animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-540" dur="10s" repeatCount="indefinite"></animateTransform>
					</g>
				</svg>
			</div>
		</div>

		<div class="list-box" v-if="type == 4">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<span>剩余本金：</span>
					<i class="active">{{getAmount(model.SurplusBenJin)}}</i>
				</li>
				<li class="mui-table-view-cell">
					<span>最近还款日：</span>
					<i class="active">{{getDate(model.RefundTime)}}</i>
				</li>
				<li class="mui-table-view-cell">
					<span>剩余募集时间</span>
					<i class="active">{{surplusTime}}</i>
				</li>
			</ul>
		</div>
		<div class="list-box">
			<ul class="mui-table-view">
				<!--<li class="mui-table-view-cell">
					<span>还款方式</span>
					<i>{{ refundWays(model.RefundWays) }}</i>
				</li>-->
				<li class="mui-table-view-cell">
					<span>起息日期</span>
					<i>已结束次日开始计算收益</i>
				</li>
				<li class="mui-table-view-cell">
					<span>还款日期</span>
					<i>计划还款的日期</i>
				</li>
				<li class="mui-table-view-cell" v-if="type == 1 || (id!=0 && type!=4)">
					<span>剩余时间</span>
					<i class="active">{{surplusTime}}</i>
				</li>
			</ul>
		</div>
		<div class="img-box" v-if="type==2">
			<img src="./data.png" width="100%" />
		</div>
		<div class="item-box">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" @tap="link('investMsg',1,'融资信息')" v-if="id!=0">
					<span class="text">融资信息</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @tap="link('investMsg',2,'房产信息')" v-if="id!=0">
					<span class="text">房产信息</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @tap="link('investMsg',3,'借款人信息')" v-if="id!=0">
					<span class="text">借款人信息</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @tap="link('investText',2,'风险评估')" v-if="id!=0">
					<span class="text">风险评估</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @tap="link('investText',3,'借款项目跟进')" v-if="id!=0">
					<span class="text">借款项目跟进</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @tap="link('investText',0,'项目介绍')" v-if="id==0">
					<span class="text">项目介绍</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @tap="link('investText',1,'风控措施')">
					<span class="text">风控措施</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" v-if="(type==2||type==3)&&id==0" @tap="link('tenderList')">
					<span class="text">标的列表</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @tap="link('investRecording',0,'出借记录')">
					<span class="text">出借记录</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @tap="link('investRecording',1,'还款计划')" v-if="id!=0">
					<span class="text">还款计划</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
			</ul>
		</div>

		<div class="btn-box">
			<p>
				<b>项目可投金额：</b>
				<span>{{getAmount(model.SurplusAmount)}}</span>
			</p>
			<button class="mui-btn mui-btn-primary mui-btn-block" :class="{'mui-btn-grey':grey}" :disabled="grey" @click="btnEvent">出借</button>
		</div>
		<div id="huifu" v-html="huifu"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				id: 1,
				type: 1,
				huifu: "",
				inTime: null,
				grey: false,
				btnText: "出借",
				surplusTime: "00天00时",
				loading: null,
				model: {
					Rate: 0,
					RaiseRate: 0,
					RiskLevel: "AA",
					SurplusTime: 0
				}
			}
		},
		created: function() {
			document.title = this.$route.query.title
			this.loading = this.sui.wait(true, '正在加载');
			this.id = this.$route.query.id;
			this.type = parseInt(this.$route.query.type) == 4 ? 4 : 1;

			//房易融、债转、年月账户详情
			//标的类型：1-房易融 2-月账户 3-年账户 4-债转
			var postUrl = "Loan/YearsDetail";
			var param = {
				loanType: this.type
			};

			if(this.id != 0) {
				postUrl = this.type == 4 ? "Transfer/TransferDetail" : "Loan/LoanDetail";
				param = this.type == 4 ? {
					transferId: this.id
				} : {
					loanId: this.id
				};
			}

			this.sui.request(postUrl, param, "get", (data) => {
				if(data) {
					var IsPass = data.IsPass;
					if(IsPass) {
						this.model = data.ReturnObject;
						this.$nextTick(function() {
							this.getProgress(); //项目进度
							this.btnState(); //按钮状态
							if(this.id != 0) {
								if(this.model.SurplusTime) {
									clearInterval(this.inTime);
									this.countDown();; //进入页面先计算一遍时间,防止00天00时情况出现。
									this.intervalTime();
								} else {
									this.grey = true;
								}
							}
						});
					} else {
						mui.toast(data.Desc);
					}
				}
				if(this.loading) {
					this.loading = this.sui.closewait(this.loading);
				}
			});
		},
		beforeDestroy: function() {
			clearInterval(this.inTime);
			this.loading = this.sui.closewait(this.loading);
			mui.closePopups()
		},
		methods: {
			link(url, status, title) {
				this.$router.push({
					name: url,
					query: {
						id: this.$route.query.id,
						type: this.$route.query.type,
						loanId: this.model.LoanId ? this.model.LoanId : 0,
						status: status,
						title: title
					}
				})
			},
			btnState() {
				//按钮状态以及按钮文本内容
				//状态： 6-可加入 7-撤标中 8-流标 9-已结束 10-放款中 11-还款中 12-还款完成
				// 债转：状态：1-转让中 2-取消 3-成功 4-失败
				if(this.model.SurplusAmount <= 0) {
					//所有标
					this.grey = true;
				}
				if(this.id != 0) {
					if(this.type == 4 && this.model.State != 1) {
						//债转且不是转让中
						this.grey = true;
						this.model.SurplusAmount = 0;
						this.btnText = ["已取消", "转让成功", "转让失败"][this.model.State - 2]
					}
					if(this.type != 4 && this.model.State != 6) {
						//不是债转标且不是可加入
						this.grey = true;
						this.model.SurplusAmount = 0;
						this.btnText = ["借款失败", "借款失败", "已结束", "已结束", "还款中", "已结清"][this.model.State - 7]
					}
					if(!this.model.IsTender) {
						this.grey = true;
						this.model.SurplusAmount = 0;
					}
				}
			},
			btnEvent() {
				//出借按钮事件
				if(this.sui.isLogin()) {
					if(!this.model.IsRisk) {
						this.$router.push({
							name: "riskTest",
							query: {
								first: 2
							}
						})
						return;
					}
					if(!this.model.IsRealAuth) {
						//您还没有开通银行存管账户
						var btn = ['取消', '立即开通'];
						mui.confirm('您还没有开通银行存管账户，请先开通', '', btn, (e) => {
							if(e.index == 1) {
								//开通银行存管账户
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
								this.$router.push({
									name: "openingAccount"
								})
							} else {
								if(!this.isBack) {
									this.$router.go(-1);
								}
							}
						});
						return;
					}
					this.$router.push({
						name: "addInvest",
						query: {
							id: this.id,
							type: this.type,
							loanType: this.type == 4 ? this.model.LoanType : 0
						}
					})
				} else {
					this.$router.push({
						name: "login"
					})
				}
			},
			countDown() {
				//计算剩余时间
				var seconds = this.model.SurplusTime;
				if(seconds > 0) {
					var days = this.two(Math.floor(seconds / 86400)); //天数
					var hours = this.two(Math.floor(seconds % 86400 / 3600)); //小时
					if(days || hours) {
						var temp = `${days}天${hours}时`;
						if(this.surplusTime != temp) { //避免重复赋值渲染
							this.surplusTime = temp;
						}
					} else {
						if(this.surplusTime != "00天01时") {
							this.surplusTime = "00天01时";
						}
					}
					--seconds;
				} else {
					this.surplusTime = "00天00时";
					this.grey = true;
					clearInterval(this.inTime);
				}
			},
			two(n) {
				//格式化:一位数转两位数
				return n < 10 ? '0' + n : '' + n;
			},
			intervalTime() {
				//打开定时器
				if(this.model.SurplusTime) {
					this.inTime = setInterval(this.countDown, 1000);
				}
			},
			getAmount(value) {
				//格式化金额
				return value ? this.sui.rmoney(value) : "0.00";
			},
			getRate() {
				//标的类型：1-房易融 2-月账户 3-年账户 4-债转
				var rate = null;
				if(this.id != 0) { //年月账户id=0
					//具体标
					rate = (this.model.Rate + this.model.RaiseRate).toFixed(1) + "<i>%</i><div class='lv'>" + this.model.RiskLevel + "</div>";
					//					rate = (this.model.RaiseRate <= 0 || this.type == 2 || this.model.LoanType == 2) ? this.model.Rate.toFixed(1) : `${this.model.Rate.toFixed(1)}<i>+${this.model.RaiseRate.toFixed(1)}%</i>`;
				} else {
					rate = this.type == 2 ? `${this.model.MinRate}~${this.model.MaxRate}<i>%</i>` : `${this.model.MinRate}<i>+${this.model.RaiseRate}%</i>`;
				}
				return ~rate.indexOf('undefined') ? "0.0" : rate;
			},
			termNoun() {
				//借款期限名词
				//1-房易融 2-月账户 3-年账户 4-债转
				if(this.id != 0) {
					return this.type == 4 ? "剩余期数" : (this.type == 1 ? "借款期限" : "锁定转让期");
				} else {
					return "锁定转让期";
				}
			},
			getTerm() {
				//出借期限/借款期限/剩余期数
				//1-天 2-月 3-年 4-小时
				var termUnit = ["天", "个月", "年", "小时"][this.model.LoanTermUnit - 1];
				if(this.id != 0) {
					var result = "";
					if(this.type == 4) {
						result = this.model.SurplusPeriod + termUnit;
					} else {
						result = this.model.LoanTerm + termUnit;
					}
				} else {
					if(!this.model.MaxLoanTerm || this.model.MinLoanTerm == this.model.MaxLoanTerm)
						result = this.model.MinLoanTerm + termUnit;
					else
						result = this.model.MinLoanTerm + "-" + this.model.MaxLoanTerm + termUnit;
				}

				if(!result) {
					return 0;
				} else {
					return ~result.indexOf('undefined') ? 0 : result;
				}
			},
			getProgress() {
				//项目进度
				//状态： 6-可加入 7-撤标中 8-流标 9-已结束 10-放款中 11-还款中 12-还款完成
				//债转：状态：1-转让中 2-取消 3-成功 4-失败
				var progress = 100;
				if(this.id != 0) {
					if(this.type == 4) {
						progress = this.model.State == 1 ? this.model.TenderProgress : 100;
					} else {
						progress = this.model.State == 6 ? this.model.TenderProgress : 100;
					}
					progress = this.model.State ? progress : 0;
				} else {
					var total = this.model.SurplusAmount + this.model.InvestedAmount;
					if(total) {
						progress = (this.model.InvestedAmount / total) * 100;
					} else {
						progress = 100;
					}
					progress = typeof(this.model.SurplusAmount) == "undefined" ? 0 : progress;
				}
				return progress ? progress : 0;
			},
			investedAmt() {
				//已募集金额/转让金额
				var amount = 0;
				if(this.id != 0) {
					amount = this.model.Amount;
				} else {
					amount = this.model.SurplusAmount + this.model.InvestedAmount;
				}
				return amount ? this.sui.rmoney(amount) : '0.00';
			},
			getDate(d) {
				return d ? this.sui.formatDate('y-m-d', d) : "";
			},
			refundWays(value) {
				// 还款方式：1-到期还本付息 2-等额本息 3-先息后本
				return ['到期还本付息', '等额本息', '先息后本'][value - 1];
			}
		}
	}
</script>

<style lang="scss">
	.investDetail {
		width: 100%;
		background: #f7f7f9;
		padding-bottom: 107px;
		.background {
			position: relative;
			width: 100%;
			overflow: hidden;
			font-size: 0;
			.wave {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
			}
		}
		.invest-header {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.interest-box {
				text-align: center;
				.interest {
					position: relative;
					margin-bottom: 14px;
					color: #FFFFFF;
					font-size: 30px;
					.lv {
						width: 38px;
						position: absolute !important;
						top: 0;
						height: 28px;
						left: 65%;
						line-height: 28px;
						/*border-radius: 12px;
						border: solid 1px #FFFFFF;*/
						font-size: 12px;
						color: #FFFFFF;
						text-align: center;
						@include border-box-1px(#FFFFFF, 18px)
					}
					i {
						position: relative;
						display: inline-block;
						font-size: 18px;
					}
				}
				span {
					color: #FFFFFF;
					font-size: 14px;
				}
			}
			.schedule-wrap {
				width: 100%;
				padding: 0 15px;
				margin: 23px 0 20px;
				.schedule-box {
					position: relative;
					width: 100%;
					height: 2px;
					background: rgba(255, 255, 255, 0.3);
					.schedule {
						position: absolute;
						left: 0;
						top: 0;
						height: 2px;
						border-radius: 2px;
						background: #FFFFFF;
					}
				}
			}
			.text-box {
				display: flex;
				width: 100%;
				li {
					position: relative;
					flex: 1;
					text-align: center;
					p {
						color: #FFFFFF;
						font-size: 14px;
						&:first-child {
							margin-bottom: 14px;
						}
					}
					&:after {
						content: '';
						position: absolute;
						right: -1px;
						top: 3px;
						bottom: 3px;
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
				}
			}
		}
		.list-box {
			margin-bottom: 10px;
			.mui-table-view {
				.mui-table-view-cell {
					display: flex;
					background: #FFFFFF !important;
					span,
					i {
						display: inline-block;
						vertical-align: top;
						font-size: 14px;
						text-align: right;
					}
					i {
						flex: 1;
						color: #999999;
						&.active {
							color: #1e82d2;
						}
					}
				}
			}
		}
		.img-box {
			padding: 15px;
			margin-bottom: 10px;
			background: #FFFFFF;
		}
		.item-box {
			.mui-table-view {
				.mui-table-view-cell {
					position: relative;
					padding: 0 15px;
					height: 44px;
					line-height: 44px;
					font-size: 0;
					.text {
						font-size: 16px;
					}
					.mui-icon {
						position: absolute;
						line-height: 44px;
						right: 18px;
						color: #999999;
					}
				}
			}
		}
		.btn-box {
			padding: 12px 15px;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			background: #FFFFFF;
			-webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .85);
			box-shadow: 0 0 1px rgba(0, 0, 0, .85);
			p {
				text-align: center;
				font-size: 14px;
				b {
					color: #2c2c2c;
				}
				span {
					color: #1e82d2;
				}
			}
			.mui-btn {
				margin-top: 10px;
			}
		}
	}
</style>