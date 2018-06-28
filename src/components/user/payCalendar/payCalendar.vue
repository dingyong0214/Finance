<template>
	<div class="pay-calendar">
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
			</ul>
		</div>
		<div class="calendar-box" v-if="model.StateList.length">
			<calendar @picker="pickerItem" @switchDate="switchDate" :url="'payCalendarDTL'" :dateList="model.StateList" :CurrentDate="model.CurrentDate" :Today="model.Today">
			</calendar>
			<div class="status-box">
				<span class="abnormal">已还款</span>
				<span class="normal">未还款</span>
			</div>
		</div>
	</div>
</template>

<script>
	import calendar from "@/common/components/calendar/calendar"

	export default {
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
				this.sui.request('Account/ReceiptCalendar', {
					receiptDate: receiptDate,
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
				return value ? this.sui.rmoney(value) : '0.00';
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
	.pay-calendar {
		.header {
			background-color: #1e82d2;
			ul {
				padding: 20px 0;
				font-size: 0;
				li {
					margin-bottom: 25px;
					display: inline-block;
					vertical-align: top;
					width: 50%;
					text-align: center;
					&:nth-of-type(3),
					&:nth-of-type(4) {
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
				}
			}
		}
	}
</style>