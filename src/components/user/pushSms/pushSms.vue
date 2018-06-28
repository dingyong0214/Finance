<template>
	<div class="pushSms">
		<ul class="mui-table-view">
			<li class="mui-table-view-cell">
				<span>短信通知总开关</span>
				<div class="mui-switch mui-switch-mini" :class="{'mui-active':model.SMSNotice}">
					<div class="mui-switch-handle"></div>
				</div>
			</li>
		</ul>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell">
				<span>新标短信通知</span>
				<div class="mui-switch mui-switch-mini" @toggle="btnSwitch($event,'LoanSMS')" :class="{'mui-active':model.LoanSMS}">
					<div class="mui-switch-handle"></div>
				</div>
			</li>
			<li class="mui-table-view-cell">
				<span>回款短信通知</span>
				<div class="mui-switch mui-switch-mini" @toggle="btnSwitch($event,'ReceiptSMS')" :class="{'mui-active':model.ReceiptSMS}">
					<div class="mui-switch-handle"></div>
				</div>
			</li>
			<!--<li class="mui-table-view-cell">
				<span>自动投标短信通知</span>
				<div class="mui-switch mui-switch-mini" @toggle="btnSwitch($event,'AutoTenderSMS')" :class="{'mui-active':model.AutoTenderSMS}">
					<div class="mui-switch-handle"></div>
				</div>
			</li>-->
			<li class="mui-table-view-cell">
				<span>还款短信通知</span>
				<div class="mui-switch mui-switch-mini" @toggle="btnSwitch($event,'RefundSMS')" :class="{'mui-active':model.RefundSMS}">
					<div class="mui-switch-handle"></div>
				</div>
			</li>
			<li class="mui-table-view-cell">
				<span>提现短信通知</span>
				<div class="mui-switch mui-switch-mini" @toggle="btnSwitch($event,'WithdrawSMS')" :class="{'mui-active':model.WithdrawSMS}">
					<div class="mui-switch-handle"></div>
				</div>
			</li>
			<li class="mui-table-view-cell">
				<span>优惠券短信通知</span>
				<div class="mui-switch mui-switch-mini" @toggle="btnSwitch($event,'CouponSMS')" :class="{'mui-active':model.CouponSMS}">
					<div class="mui-switch-handle"></div>
				</div>
			</li>
			<li class="mui-table-view-cell">
				<span>资讯短信通知</span>
				<div class="mui-switch mui-switch-mini" @toggle="btnSwitch($event,'NewsSMS')" :class="{'mui-active':model.NewsSMS}">
					<div class="mui-switch-handle"></div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				model: {}
			}
		},
		created() {
			this.sui.request('User/GetMessageSet', {}, "get", (data) => {
				this.model = data.ReturnObject || {}
			})
		},
		mounted: function() {
			this.$nextTick(() => {
				mui('.mui-switch')['switch']();
			})
		},
		methods: {
			btnSwitch(event, Key) {
				this.sui.request('User/SetUserMessage', {
					fileds: Key,
					filedsValue: event.detail.isActive
				}, 'get', (data) => {
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.pushSms {
		.mui-table-view {
			margin: 10px 0;
		}
		.mui-table-view-cell {
			padding: 13px 15px;
		}
	}
</style>