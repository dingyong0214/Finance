<template>
	<div class="calendarDetail">
		<div class="header">
			<ul>
				<li>
					<span>待收总额</span>
					<p>{{format(model.CapitalInterest)}}</p>
				</li>
				<li>
					<span>待收本金</span>
					<p>{{format(model.DueInCapital)}}</p>
				</li>
				<li>
					<span>待收利息</span>
					<p>{{format(model.DueInInterest)}}</p>
				</li>
				<li>
					<span>待收出借奖励</span>
					<p>{{format(model.DueInRaiseInterest)}}</p>
				</li>
				<li>
					<span>回款日期</span>
					<p>{{getDate(this.$route.query.oDate)}}</p>
				</li>
			</ul>
		</div>
		<div class="list-box">
			<ul>
				<!--状态：1-待收 2-还款中 3-已收 4-还款失败 5-已转让 -->
				<li @tap="link(item.Id,item.LoanType,item.TenderDetailId,item.LoanId)" :class="{normal:model.State!=1&&model.State!=2,abnormal:model.State==1||model.State==2}" v-for="item in model.ReceiptPlan">
					<div class="mui-table-view-cell">
						<h2 class="border-1px">{{item.Name}}</h2>
						<div class="main">
							<div>{{item.State==3?"已收总额":"待收总额"}}：<span>{{format(item.CapitalInterest)}}</span></div>
							<div>{{item.State==3?"已收本金":"待收本金"}}：<span>{{format(item.BenJin)}}</span></div>
							<div>{{item.State==3?"已收利息":"待收利息"}}：<span>{{format(item.State==3?item.FactInterest:item.Interest)}}</span></div>
							<div>{{item.State==3?"已收出借奖励":"待收出借奖励"}}：<span>{{format(item.State==3?item.FactRaiseInterest:item.RaiseInterest)}}</span></div>
						</div>
						<span class="status">{{getState(item.State)}}</span>
					</div>
				</li>
				<!--<li class="normal">
					<div class="mui-table-view-cell">
						<h2 class="border-1px">业主贷-99160612</h2>
						<div class="main">
							<div>待收总额：<span>200000.00</span></div>
							<div>待收本金：<span>18000.00</span></div>
							<div>待收利息：<span>1520.00</span></div>
							<div>待收出借奖励：<span>1000.00</span></div>
						</div>
						<span class="status">未还款</span>
					</div>
				</li>-->
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				model: {
					ReceiptPlan: []
				}
			}
		},
		methods: {
			link(Id, type, detailId, loanId) {
				//标的回款计划
				this.$router.push({
					name: 'repayList',
					query: {
						id: Id,
						type: type,
						detailId: detailId,
						loanId: loanId
					}
				})
			},
			format(value) {
				return value ? this.sui.rmoney(value) : '0.00';
			},
			getDate(value) {
				//格式化日期
				return value ? this.sui.formatDate('y-m-d', value) : "-";
			},
			getState(value) {
				//状态：1-待收 2-还款中 3-已收 4-还款失败 5-已转让
				return ["待收", "还款中", "已收", "还款失败", "已转让"][value - 1];
			}
		},
		created: function() {
			this.sui.request('Account/CurrentReceiptPlan', {
				currDate: this.$route.query.oDate
			}, "get", (data) => {
				if(data) {
					if(data.IsPass) {
						this.model = data.ReturnObject;
					} else {
						mui.toast(data.Desc);
					}
				}
			});
		}
	}
</script>

<style lang="scss">
	.calendarDetail {
		.header {
			background-color: #1e82d2;
			ul {
				padding: 20px 0;
				font-size: 0;
				li {
					margin-bottom: 25px;
					display: inline-block;
					vertical-align: top;
					width: 33.33%;
					text-align: center;
					&:nth-of-type(4),
					&:nth-of-type(5) {
						margin-bottom: 0;
					}
					span {
						position: relative;
						display: inline-block;
						vertical-align: middle;
						font-size: 14px;
						color: #9dd3ff;
						&:before {
							content: '';
							position: absolute;
							top: 50%;
							left: -13px;
							transform: translateY(-50%);
							display: inline-block;
							vertical-align: middle;
							border-radius: 50%;
							width: 7px;
							height: 7px;
							background-color: #9dd3ff;
						}
					}
					p {
						margin-top: 14px;
						font-size: 16px;
						color: #ffffff;
					}
				}
			}
		}
		.list-box {
			ul {
				padding: 15px;
				li {
					position: relative;
					margin-bottom: 15px;
					background: #FFFFFF;
					font-size: 0;
					border-radius: 6px;
					&.abnormal {
						color: #999999;
					}
					&.normal {
						color: #2c2c2c;
						span {
							color: #2c2c2c;
						}
					}
					.mui-table-view-cell {
						padding: 15px 15px 0;
						.status {
							position: absolute;
							right: 15px;
							top: 15px;
							font-size: 14px;
						}
						h2 {
							padding-bottom: 15px;
							font-size: 16px;
							@include border-1px(#e5e5e5)
						}
						.main {
							margin-top: 15px;
							>div {
								margin-bottom: 15px;
								display: inline-block;
								vertical-align: top;
								width: 50%;
								font-size: 12px;
								color: #999999;
							}
						}
					}
				}
			}
		}
	}
</style>