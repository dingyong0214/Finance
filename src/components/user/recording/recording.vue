<template>
	<div class="recording">
		<div class="mui-scroll-wrapper mui-content" id="pullrefresh">
			<div class="mui-scroll">
				<ul class="mui-table-view">
					<li class="border-1px" v-for="item in fundList">
						<div class="money-box">
							<p class="money" :class="{'red':item.PayFlag==1 ,'green':item.PayFlag==2}">{{money(item.Amount,item.PayFlag)}}</p>
							<p class="company">{{item.FundType}}</p>
						</div>
						<div class="status-box">
							<p v-if="type != 0">成功</p>
							<span :class="{position:type!=0}">{{item.TranTime}}</span>
						</div>
					</li>
					<li class="border-1px" v-for="item in rechargeList">
						<div class="money-box">
							<p class="money">{{money(item.Amount)}}</p>
							<p class="company">{{item.BankName}}</p>
						</div>
						<div class="status-box">
							<p>{{rechargeType(item.State)}}</p>
							<span class="position">{{item.PayTime}}</span>
						</div>
					</li>
					<li class="border-1px" v-for="item in withdrawList">
						<div class="money-box">
							<p class="money">{{money(item.WithdrawAmout)}}</p>
							<p class="company">{{item.BankName}}</p>
						</div>
						<div class="status-box">
							<p>{{withdrawType(item.State)}}</p>
							<span class="position">{{item.WithdrawTime}}</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<tips v-show="isTips"></tips>
	</div>
</template>

<script>
	import tips from "@/common/components/tips/tips"

	export default {
		data() {
			return {
				type: null, //type: 0-资金明细,1-充值记录,2-提现记录
				pageIndex: 1,
				isTips: false,
				fundList: [],
				rechargeList: [],
				withdrawList: []
			}
		},
		methods: {
			pullupRefresh() {
				//上拉加载
				var postUrl = ['Account/FundDetailList', 'Account/RechargeList', 'Account/WithdrawList'][this.type];
				this.sui.request(postUrl, {
					pageIndex: this.pageIndex
				}, "get", (data) => {
					if(data) {
						if(data.IsPass) {
							if(data.ReturnList.length) {
								switch(Number(this.type)) {
									case 0:
										this.fundList = this.fundList.concat(data.ReturnList);
										break;
									case 1:
										this.rechargeList = this.rechargeList.concat(data.ReturnList);
										break;
									case 2:
										this.withdrawList = this.withdrawList.concat(data.ReturnList);
										break;
								}
								this.pageIndex++;
								mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
								mui('#pullrefresh').pullRefresh().enablePullupToRefresh();
							} else {
								mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
								if(this.pageIndex == 1) {
									mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
									this.isTips = true;
								}
							}
						}
					}
				})
			},

			//格式化函数：
			money(Amount, PayFlag) {
				var result = ""
				if(PayFlag == 1) {
					result = "+" + this.sui.rmoney(Amount)
				} else if(PayFlag == 2) {
					result = "-" + this.sui.rmoney(Amount)
				} else {
					result = this.sui.rmoney(Amount)
				}
				return result;
			},
			formatDate(value) {
				return this.sui.formatDate('y-m-d h:i:s', value);
			},
			rechargeType(value) {
				//充值类型
				return ["充值中", "成功", "失败"][value - 1];
			},
			withdrawType(value) {
				//状态：1-待审 2-取消 3-拒绝 4-待打款 5-打款中 6-已打款 7-打款失败
			  return ["审核中","已取消","打款失败","待打款","打款中","已打款","打款失败"][value-1];
			},
		},
		created: function() {
			//type: 0-资金明细,1-充值记录,2-提现记录
			this.type = this.$route.query.type;
			document.title = ['资金明细', '充值记录', '提现记录'][this.type];
		},
		mounted: function() {
			this.$nextTick(() => {

				for(var i = mui.hooks.inits.length - 1, item; i >= 0; i--) {
					item = mui.hooks.inits[i];
					if(item.name == "pullrefresh") {
						item.repeat = true;
					}
				}

				mui.init({
					pullRefresh: {
						container: '#pullrefresh',
						up: {
							callback: this.pullupRefresh
						}
					}
				});

				setTimeout(() => {
					var pull = mui('#pullrefresh').pullRefresh();
					pull && pull.disablePulldownToRefresh();
					pull && pull.pullupLoading();
				}, 200);
			})

		},
		components: {
			tips
		}
	}
</script>

<style lang="scss">
	.recording {
		ul {
			background: #FFFFFF;
			padding-left: 15px;
			li {
				box-sizing: border-box;
				height: 75px;
				padding: 15px 15px 15px 0;
				position: relative;
				overflow: hidden;
				@include border-1px(#e5e5e5);
				p {
					font-size: 16px;
					color: #2c2c2c;
				}
				.money-box {
					float: left;
					.money {
						margin-bottom: 13px;
						&.red {
							color: #ff3535;
						}
						&.green {
							color: #00c305;
						}
					}
				}
				.status-box {
					float: right;
					span {
						line-height: 45px;
						font-size: 14px;
						color: #999999;
						&.position {
							position: absolute;
							bottom: 15px;
							right: 15px;
							line-height: initial;
						}
					}
				}
			}
		}
	}
</style>