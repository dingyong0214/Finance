<template>
	<div class="addAutoTender">
		<ul class="mui-table-view">
			<li class="mui-table-view-cell default-bg">
				<span class="text">账户预留金额</span>
				<i @tap.stop="dialog(1)" class="mui-icon mui-icon-info"></i>
				<input type="text" value="" placeholder="请输入账户需保留金额" v-model="tenderFrom.AccountBal" />
			</li>
		</ul>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell default-bg float">
				<span class="text">出借类型</span>
				<div class="right">
					<button class="mui-btn mui-btn-outlined" :class="{'mui-btn-primary':classList[0]}" @tap="btnType('1')">房易融</button>
					<button class="mui-btn mui-btn-outlined" :class="{'mui-btn-primary':classList[1]}" @tap="btnType('2')">月账户</button>
					<button class="mui-btn mui-btn-outlined" :class="{'mui-btn-primary':classList[2]}" @tap="btnType('3')">年账户</button>
				</div>
			</li>
			<li class="mui-table-view-cell default-bg">
				<span class="text">预期收益</span>
				<div class="right">
					<b>8.0~12.0%</b>
				</div>
			</li>
		</ul>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell default-bg">
				<span class="text">出借期限</span>
				<i @tap.stop="dialog(2)" class="mui-icon mui-icon-info"></i>
				<div class="right">
					<input type="text" value="" placeholder="默认为项目的最大期数" v-model="tenderFrom.InvestTerm" />
					<b>个月</b>
				</div>
			</li>
			<li class="mui-table-view-cell default-bg" @tap="showCoupon">
				<span class="text">优惠券</span>
				<i @tap.stop="dialog(3)" class="mui-icon mui-icon-info"></i>
				<div class="right">
					<b>{{getCoupon(tenderFrom.Coupon)}}</b>
					<i class="mui-icon mui-icon-arrowright"></i>
				</div>
			</li>
		</ul>
		<div class="btn-box">
			<button class="mui-btn mui-btn-primary mui-btn-block" @tap="save">保存</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				picker: null,
				classList: [0, 0, 0],
				tenderFrom: {
					LoanType: []
				}
			}
		},
		created() {
			this.loading = this.sui.wait(true, '正在加载');
			this.sui.request("Invest/RuleDetail", {
				ruleId: this.$route.query.id
			}, "get", (data) => {
				this.loading = this.sui.closewait(this.loading);

				this.tenderFrom = JSON.parse(JSON.stringify(data.ReturnObject));
				this.tenderFrom.LoanType = (this.tenderFrom.LoanType || "").split(',');
				this.tenderFrom.LoanType.forEach(item => this.classList[item - 1] = 1);

				this.tenderFrom.AccountBal = this.sui.rmoney(this.tenderFrom.AccountBal);

				this.picker = new mui.PopPicker();
				var arr = [];
				data.ReturnList.forEach((item) => {
					arr.push({
						v: item.Index,
						t: item.Name
					})
				})
				this.picker.setData(arr);
			});
		},
		methods: {
			save() {
				(typeof(this.tenderFrom.InvestTerm) == 'number') && (this.tenderFrom.InvestTerm = this.tenderFrom.InvestTerm.toString());
				(typeof(this.tenderFrom.AccountBal) == 'number') && (this.tenderFrom.AccountBal = this.tenderFrom.AccountBal.toString());
				if(this.sui.IsNullOrEmpty(this.tenderFrom.AccountBal)) {
					mui.toast("请输入账户预留金额");
					return;
				} else if(this.sui.IsNullOrEmpty(this.tenderFrom.LoanType.join(','))) {
					mui.toast("请选择出借类型");
					return;
				} else if(this.sui.IsNullOrEmpty(this.tenderFrom.InvestTerm)) {
					mui.toast("请输入出借期限");
					return;
				} else if(!this.tenderFrom.AccountBal.isFloat()) {
					mui.toast("请输入正确的账户预留金额，必须为数字且允许保留两位小数");
					return;
				} else if(!this.tenderFrom.InvestTerm.isNumber() || this.tenderFrom.InvestTerm > 36 || this.tenderFrom.InvestTerm <= 0) {
					mui.toast("请输入正确的出借期限，必须为1~36以内的正整数");
					return;
				}

				var postData = {
					Id: this.$route.query.id,
					AccountBal: this.tenderFrom.AccountBal,
					LoanType: this.tenderFrom.LoanType.join(","),
					InvestTerm: this.tenderFrom.InvestTerm,
					Coupon: this.tenderFrom.Coupon
				}
				this.loading = this.sui.wait(true, '正在加载');
				this.sui.request("Invest/ModifyRule", postData, 'post', (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						if(data.IsPass) {
							mui.toast('保存成功');
							this.$router.go(-1);
						} else {
							mui.toast(data.Desc)
						}
					}
				})
			},
			showCoupon() {
				document.activeElement.blur();
				setTimeout(() => {
					this.picker.show((item) => {
						this.tenderFrom.Coupon = item[0].v;
					})
				}, 280)
			},
			dialog(type) {
				var main = ["账户需保留的金额", '出借期限，单位为月，即1期=1个月', '自动出借时，如选中优惠券的类型，将以出借金额为基础，且以收益最大化的原则使用对应类型的优惠券。'][type - 1]
				mui.alert(main, ' ');
			},
			btnType(type) {
				if(this.tenderFrom.LoanType.indexOf(type) == -1) {
					this.classList[type - 1] = 1;
					this.tenderFrom.LoanType.push(type);
					this.$set(this.classList, type - 1, 1);
				} else {
					this.classList[type - 1] = 0;
					this.tenderFrom.LoanType.splice(this.tenderFrom.LoanType.indexOf(type), 1);
					this.$set(this.classList, type - 1, 0);
				}
			},
			//格式化函数：
			getCoupon(val) {
				return ['现金券', '红包', 'We券'][val - 1]
			}
		}
	}
</script>

<style lang="scss">
	.addAutoTender {
		input {
			padding: 0;
			margin: 0;
		}
		.mui-table-view {
			margin-bottom: 10px;
			.mui-table-view-cell {
				display: flex;
				position: relative;
				padding: 0 15px;
				height: 44px;
				line-height: 44px;
				font-size: 0;
				&.default-bg {
					background: #FFFFFF !important;
				}
				&.float {
					height: initial;
					display: block;
					.right {
						float: right;
						position: static;
					}
				}
				>.mui-icon {
					margin-left: 5px;
					font-size: 20px;
					line-height: 42px;
					color: #1e82d2;
				}
				>span {
					display: inline-block;
					vertical-align: middle;
					font-size: 16px;
					white-space: nowrap;
					color: #2c2c2c;
				}
				>input {
					flex: 1;
					height: 100%;
					color: #2c2c2c;
					border: none;
					font-size: 16px;
					text-align: right;
					&.tenderMoney {
						width: 113px;
					}
				}
				.right {
					position: absolute;
					right: 15px;
					top: 0;
					label {
						position: relative;
						input {
							position: absolute;
							left: 50%;
							top: -20px;
							width: initial;
							height: 0;
							opacity: 1;
						}
					}
					.mui-btn {
						vertical-align: middle;
						margin-left: 15px;
						width: 70px;
						padding: 4px 0;
						border: none;
						&:active {
							background: #FFFFFF !important;
							color: #333 !important;
						}
					}
					.mui-btn-primary {
						&:before {
							border: 1px solid #1E81D2 !important;
						}
					}
					.mui-btn-outlined {
						position: relative;
						&:before {
							content: "";
							position: absolute;
							width: 200%;
							height: 200%;
							border: 1px solid #333;
							-webkit-transform-origin: 0 0;
							transform-origin: 0 0;
							-webkit-transform: scale(0.5, 0.5);
							transform: scale(0.5, 0.5);
							-webkit-box-sizing: border-box;
							box-sizing: border-box;
							left: 0;
							top: 0;
						}
					}
					input {
						display: inline-block;
						vertical-align: middle;
						border: none;
						font-size: 16px;
						text-align: right;
						width: 196px;
						height: 44px;
						line-height: 44px;
						&::-webkit-input-placeholder {
							font-size: 14px;
						}
					}
					b {
						margin-left: 5px;
						display: inline-block;
						vertical-align: middle;
						font-size: 16px;
						color: #2c2c2c;
					}
					.mui-icon {
						margin-right: -6px;
						display: inline-block;
						vertical-align: middle;
						color: #999999;
					}
				}
			}
		}
		.btn-box {
			margin-top: 35px;
			padding: 0 15px;
		}
	}
</style>