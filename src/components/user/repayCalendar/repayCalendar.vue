<template>
	<div class="repay-calendar">
		<div class="repay-money">
			<h2>{{model.TotalAmount || "0.00"}}</h2>
			<span>待还总额</span>
		</div>
		<div class="calendar-box" v-if="model.StateList.length">
			<calendar :url="'repayCalendarDTL'" @picker="pickerItem" @switchDate="switchDate" :dateList="model.StateList" :CurrentDate="model.CurrentDate" :Today="model.Today"></calendar>
			<div class="status-box">
				<span class="abnormal">已还款</span>
				<span class="normal">未还款</span>
				<span class="overdue">逾期</span>
			</div>
		</div>
	</div>
</template>

<script>
	import calendar from "@/common/components/calendar/calendar"

	export default {
		props: {
			type: {
				type: Number
			}
		},
		data() {
			return {
				model: {
					StateList: []
				}
			}
		},
		methods: {
			pickerItem(item) {
				this.init(item.t, -99)
			},
			switchDate(i) {
				this.init(this.model.CurrentDate, i)
			},
			init(receiptDate, upOrDown) {
				this.loading = this.sui.wait(true, '请稍候...');
				this.sui.request('Refund/RefundCalendar', {
					refundDate: receiptDate,
					upOrDown: upOrDown
				}, 'get', (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						if(data.IsPass) {
							this.model = data.ReturnObject;
						} else {
							mui.toast(data.Desc);
						}
					}
				})
			},
			//格式化函数:
			format(value) {
				return value ? sui.rmoney(value) : '0.00';
			}
		},
		created: function() {
			this.init(null, -99);
		},
		beforeDestroy: function() {
			this.loading = this.sui.closewait(this.loading);
		},
		components: {
			calendar
		}
	}
</script>

<style lang="scss">
	.repay-calendar {
		.repay-money {
			padding: 25px 0;
			background-color: #1e82d2;
			text-align: center;
			color: #FFFFFF;
			h2 {
				margin-bottom: 18px;
				font-size: 30px;
			}
			span {
				font-size: 14px;
			}
		}
		.calendar-box {
			.status-box {
				padding: 0 15px 20px;
				background: #FFFFFF;
				font-size: 0;
				span {
					display: inline-block;
					vertical-align: top;
					font-size: 12px;
					margin-right: 15px;
					&:before {
						content: '';
						margin-right: 5px;
						margin-top: -3px;
						display: inline-block;
						vertical-align: middle;
						width: 7px;
						height: 7px;
						border-radius: 50%;
					}
					&.abnormal {
						&:before {
							background-color: #cbcbcb;
						}
					}
					&.normal {
						&:before {
							background-color: #ff6600;
						}
					}
					&.overdue {
						&:before {
							background-color: #f53f3f;
						}
					}
				}
			}
		}
	}
</style>