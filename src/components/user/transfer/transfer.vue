<template>
	<div class="transfer">
		<div class="info">
			<div class="title border-1px">
				{{model.Name || "加载中..."}}
				<router-link :to="{name:'text', query: { type: 3 }}" class="iconfont icon-wenhao" tag="i"></router-link>
			</div>
			<ul class="main">
				<li>
					<span class="name">剩余本金：</span>
					<span class="val">{{getAmount(model.SurplusCapital)}}</span>
				</li>
				<li>
					<span class="name">剩余期数：</span>
					<span class="val">{{model.SurplusPeriods || 0}}个月</span>
				</li>
				<li>
					<span class="name">当期应收利息：</span>
					<span class="val">{{getAmount(model.CurrentInterest)}}</span>
				</li>
				<li>
					<span class="name">最近还款日：</span>
					<span class="val">{{getDate(model.CurrentReceiptDate)}}</span>
				</li>
				<li>
					<span class="name">转让手续费：</span>
					<span class="val">{{getAmount(model.Fee)}}</span>
				</li>
				<li>
					<span class="name">还款方式：</span>
					<span class="val">{{model.RefundWays}}</span>
				</li>
			</ul>
		</div>
		<div class="form-box">
			<ul>
				<li class="item border-1px">
					<div class="checkbox">
						<input name="radio" type="radio" class="radio" v-model.number="kind" value="1" @change="rateDiscount">
						<label for="radio">折价</label>
					</div>
					<div class="checkbox">
						<input name="radio" type="radio" class="radio" v-model.number="kind" value="2" @change="rateDiscount">
						<label for="radio">溢价</label>
					</div>
				</li>
				<li class="item border-1px">
					<input type="text" value="" :placeholder="placeholder()" v-model="postData.ReduceAmount" @input="rateDiscount" />
				</li>
				<li class="item border-1px">
					<span class="name">折溢率</span>
					<router-link :to="{name:'text', query: { type: 4 }}" class="iconfont icon-wenhao" tag="i"></router-link>
					<span class="val">{{rate}}%</span>
				</li>
				<li class="item border-1px">
					<span class="name">实际到账金额</span>
					<router-link :to="{name:'text', query: { type: 4 }}" class="iconfont icon-wenhao" tag="i"></router-link>
					<span class="val">{{factAmt}}</span>
				</li>
				<li class="item flex border-1px mui-hidden">
					<input type="password" value="" placeholder="请输入安全码"/>
					<router-link :to="{name:'safetyCode'}" class="code">忘记安全码</router-link>
				</li>
			</ul>
			<div class="xieyi-box">
				<div class="input-box">
					<input class="checkbox" type="checkbox" v-model="postData.Agree" />
				</div>
				<div class="text">
					<span>我已阅读并同意前海领投的</span>
					<router-link :to="{name:'transferProtocol'}">《债权转让协议》</router-link>
				</div>
			</div>
			<button class="mui-btn mui-btn-primary mui-btn-block" @tap="btnSure">立即转让</button>
		</div>

		<!--<div id="dialog-box" class="mui-popover mui-popover-action mui-popover-bottom" :class="{'mui-active':isMasking}" style="display: block;">
			<div class="dialog" id="dialog" :class="{maxHeight:platform}">
				<div class="title border-1px">
					<router-link :to="{name:'text', query: { type: 4 }}" class="iconfont icon-wenhao" tag="i"></router-link>
					立即转让
					<i class="mui-icon mui-icon-closeempty" @tap="hide"></i>
				</div>
				<ul>
					<li class="mui-table-view-cell">
						<input type="text" value="" placeholder="请输入转让金额" v-model="postData.ReduceAmount" @input="rateDiscount" />
					</li>
					<li class="mui-table-view-cell">
						<span class="name">折溢价率</span>
						<span class="val">{{rate}}%</span>
					</li>
					<li class="mui-table-view-cell">
						<span class="name">实际到账金额</span>
						<span class="val">{{factAmt}}</span>
					</li>
					<li class="mui-table-view-cell">
						<input type="password" value="" placeholder="请输入安全码" v-model="postData.SafeCode" />
						<router-link :to="{name:'safetyCode'}" class="code">忘记安全码</router-link>
					</li>
				</ul>
				<div class="xieyi-box">
					<div class="input-box">
						<input class="checkbox" type="checkbox" v-model="postData.Agree" />
					</div>
					<div class="text">
						<span>我已阅读并同意前海领投的</span>
						<router-link :to="{name:'transferProtocol'}">《债权转让协议》</router-link>
					</div>
				</div>
				<div class="btn-box">
					<button class="mui-btn mui-btn-primary mui-btn-block" @tap="btnSure">确定</button>
				</div>
			</div>
		</div>
		<transition name="fade">
			<div id="masking" v-show="isMasking" class="masking" @tap="hide"></div>
		</transition>-->

		<div class="bg"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				platform: false,
				isMasking: false,
				rate: '0.0',
				factAmt: '0.00',
				model: {
					SurplusCapital: 1000,
					CurrentInterest: 10,
					Fee: 100
				},
				doLoop: null,
				postData: {
					LoanId: this.$route.query.id,
					ReduceAmount: null,
					Agree: null
				},
				kind: 1
			}
		},
		created: function() {
			this.loading = this.sui.wait(true, '正在加载');
			this.sui.request('Transfer/CanTransferDetail', {
				tenderDetailId: this.$route.query.id
			}, "get", (data) => {
				this.loading = this.sui.closewait(this.loading);
				if(data) {
					if(data.IsPass) {
						this.model = data.ReturnObject;
						this.factAmt = this.sui.rmoney(data.ReturnObject.SurplusCapital - data.ReturnObject.Fee);
					} else {
						mui.toast(data.Desc);
					}
				}
			})
		},
		mounted: function() {
			this.$nextTick(() => {
				if(!mui.os.android) {
					this.platform = true;
				}
			})
		},
		beforeDestroy: function() {
			this.loading = this.sui.closewait(this.loading);
		},
		methods: {
			rateDiscount() {
				//折益率=折益价/剩余本金
				//实际到账金额=转让金额±溢/折价金额-转让手续费
				clearTimeout(this.doLoop);
				this.doLoop = setTimeout(() => {
					var tempAmt = this.postData.ReduceAmount;
					if(typeof(this.postData.ReduceAmount) == 'number') {
						this.postData.ReduceAmount = this.postData.ReduceAmount.toString();
					}
					if(!this.postData.ReduceAmount.isFloat()) {
						tempAmt = 0
						this.postData.ReduceAmount = "";
					} else if(this.kind == 1 && parseFloat(tempAmt) > ((this.model.SurplusCapital || 0) * 0.01)) {
						this.postData.ReduceAmount = (this.model.SurplusCapital * 0.01).toFixed(2).toString();
						tempAmt = (this.model.SurplusCapital * 0.01).toFixed(2);
					} else if(this.kind == 2 && parseFloat(tempAmt) > this.model.CurrentInterest) {
						this.postData.ReduceAmount = this.model.CurrentInterest.toFixed(2).toString();
						tempAmt = this.model.CurrentInterest.toFixed(2);
					}
					tempAmt = this.kind == 1 ? (-parseFloat(tempAmt)) : parseFloat(tempAmt);
					this.factAmt = this.sui.rmoney(this.model.SurplusCapital + tempAmt - this.model.Fee);
					this.rate = (tempAmt / this.model.SurplusCapital * 100).toFixed(2);

				}, 800);
			},
			btnSure() {
				if(typeof(this.postData.ReduceAmount) == "number") {
					this.postData.ReduceAmount = this.postData.ReduceAmount.toString();
				}
				if(this.sui.IsNullOrEmpty(this.postData.ReduceAmount)) {
					this.postData.ReduceAmount = '0';
				}
				var kindCn = this.kind == 1 ? "折价" : "溢价";
				if(this.sui.IsNullOrEmpty(this.postData.ReduceAmount)) {
					mui.toast('请输入' + kindCn + '金额');
					return;
				} else if(!this.postData.Agree) {
					mui.toast('请阅读并同意《债权转让协议》');
					return;
				} else if(!this.postData.ReduceAmount.isFloat()) {
					mui.toast(kindCn + '金额必须为大于等于0的数字且允许保留两位小数');
					return;
				} else if(this.kind == 1 && parseFloat(this.postData.ReduceAmount) > (this.model.SurplusCapital * 0.01).toFixed(2)) {
					mui.toast('折价金额不能大于' + this.sui.rmoney(this.model.SurplusCapital * 0.01));
					return;
				} else if(this.kind == 2 && parseFloat(this.postData.ReduceAmount) > this.model.CurrentInterest) {
					mui.toast('溢价金额不能大于' + this.sui.rmoney(this.model.SurplusCapital * 0.01));
					return;
				}
				this.loading = this.sui.wait(true, '请稍候');
				this.postData.ReduceAmount = this.kind == 1 ? (-parseFloat(this.postData.ReduceAmount)) : parseFloat(this.postData.ReduceAmount)
				this.sui.request('Transfer/ApplyTransfer', this.postData, "post", (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						var IsPass = data.IsPass;
						if(IsPass) {
							setTimeout(() => {
								mui.toast('转让成功');
								this.$router.go(-1)
							}, 200);
						} else {
							mui.toast(data.Desc);
						}
					}
				});
			},
			placeholder() {
				//1-折价 2-溢价
				var showTips = "请输入折价金额，可折价（0.00~" + this.sui.rmoney(this.model.SurplusCapital * 0.01) + "）";
				if(this.kind == 2) {
					var showTips = "请输入溢价金额，可溢价（0.00~" + this.sui.rmoney(this.model.CurrentInterest) + "）";
				}
				return showTips;
			},
			//格式化函数：
			getAmount(value) {
				return value ? this.sui.rmoney(value) : '0.00';
			},
			getDate(value) {
				return value ? this.sui.formatDate('y-m-d', value) : "";
			}
		}
	}
</script>

<style lang="scss">
	.transfer {
		background: #f7f7f9;
		.info {
			padding: 0 15px;
			background-color: #ffffff;
			.title {
				position: relative;
				height: 44px;
				line-height: 44px;
				width: 100%;
				color: #2c2c2c;
				font-size: 16px;
				@include border-1px(#e5e5e5);
				.icon-wenhao {
					position: absolute;
					font-size: 20px;
					color: #2c2c2c;
					z-index: 10;
					padding: 5px;
					top: 50%;
					transform: translateY(-50%);
					right: 0;
				}
			}
			.main {
				padding-top: 15px;
				font-size: 0;
				li {
					display: inline-block;
					vertical-align: top;
					width: 50%;
					margin-bottom: 15px;
					font-size: 12px;
					.name {
						color: #999999;
					}
					.val {
						color: #2c2c2c;
					}
				}
			}
		}
		.form-box {
			background: #FFFFFF !important;
			margin: 10px 0 20px;
			padding: 0 15px;
			.item {
				position: relative;
				height: 53px;
				line-height: 53px;
				@include border-1px(#e5e5e5);
				.checkbox {
					margin-right: 60px;
					position: relative;
					display: inline-block;
					vertical-align: middle;
					height: 100%;
					font-size: 0;
					&:last-child {
						margin-right: 0;
					}
					label {
						margin-left: 30px;
						display: inline-block;
						vertical-align: middle;
						font-size: 16px;
					}
				}
				input {
					border: none;
					margin: 0;
					padding: 0;
					height: initial;
					vertical-align: middle;
					font-size: 16px;
					&[type='password'] {
						padding-right: 10px;
						flex: 1;
					}
				}
				span {
					font-size: 16px;
					color: #2c2c2c;
					&.val {
						float: right;
					}
				}
				.code {
					/*float: right;*/
					/*color: #1e82d2;*/
				}
			}
			.flex {
				display: flex;
			}
		}
		.xieyi-box {
			position: relative;
			display: flex;
			padding: 20px 0;
			.input-box {
				width: 24px;
				margin-right: 5px;
				input {
					margin-top: -2px;
				}
			}
			.text {
				line-height: 23px;
				flex: 1;
				font-size: 12px;
				color: #2c2c2c;
			}
		}
		.bg {
			position: fixed;
			left: 0;
			bottom: 0;
			right: 0;
			top: 0;
			z-index: -1;
			background: #FFFFFF;
		}
		/*遮罩层 start*/
		.masking {
			position: fixed;
			z-index: 998;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			transition: all .4s ease;
			/*background-color: rgb(0, 0, 0);
			opacity: 0.5;*/
			background-color: #fff;
		}
		.fade-enter-active,
		.fade-leave-active {
			transition: opacity .3s
		}
		.fade-enter,
		.fade-leave-to {
			opacity: 0
		}
		/*遮罩层 end*/
		#dialog-box {
			position: absolute;
			top: 0;
		}
		.dialog {
			background: #FFFFFF;
			.title {
				position: relative;
				height: 44px;
				line-height: 44px;
				text-align: center;
				font-size: 18px;
				color: #2c2c2c;
				@include border-1px(#e5e5e5);
				.mui-icon {
					position: absolute;
					right: 18px;
					color: #999999;
					font-size: 43px;
				}
				.icon-wenhao {
					top: 0;
					left: 15px;
				}
			}
			>ul {
				margin-top: 20px;
				.mui-table-view-cell {
					box-sizing: border-box;
					padding: 0 15px;
					height: 53px;
					line-height: 53px;
					overflow: initial;
					background: #FFFFFF !important;
					input {
						border: none;
						margin: 0;
						padding: 0;
						height: initial;
						vertical-align: middle;
						font-size: 16px;
					}
					span {
						font-size: 16px;
						color: #2c2c2c;
						&.val {
							position: absolute;
							right: 15px;
						}
					}
					.code {
						position: absolute;
						right: 15px;
						top: 0;
						/*color: #1e82d2;*/
					}
				}
			}
			.xieyi-box {
				display: flex;
				padding: 25px 15px;
				.input-box {
					width: 24px;
					margin-right: 5px;
					input {
						margin-top: -2px;
					}
				}
				.text {
					line-height: 23px;
					flex: 1;
					font-size: 12px;
					color: #2c2c2c;
				}
			}
			.btn-box {
				padding: 0 15px 25px;
			}
		}
	}
	/*.mui-backdrop {
		display: none;
	}*/
</style>