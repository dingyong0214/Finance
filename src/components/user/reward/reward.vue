<template>
	<div class="reward">
		<div class="mui-scroll-wrapper mui-content" id="pullrefresh">
			<div class="mui-scroll">
				<ul>
					<li class="reward-item" v-for="item in list">
						<div>
							<span class="name">结算时间：</span>
							<span class="val">{{formatDate(item.SettleDate)}}</span>
						</div>
						<div>
							<span class="name">好友总待收本金：</span>
							<span class="val">{{getAmount(item.RewardAmount)}}</span>
						</div>
						<div>
							<span class="name">奖励年利率：</span>
							<span class="val">{{type(item.TradeType)}}</span>
						</div>
						<div>
							<span class="name">奖励金额：</span>
							<span class="val">{{item.RewardRate.toFixed(1)}}%</span>
						</div>
						<div>
							<span class="name">到账时间：</span>
							<span class="val">{{formatDate(item.AccountTime)}}</span>
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
				isTips: false,
				pageIndex: 1,
				list: []
			}
		},
		methods: {
			pullupRefresh() {
				//上拉加载
				this.sui.request('Account/RewardList', {
					pageIndex: this.pageIndex
				}, "get", (data) => {
					var pull = mui('#pullrefresh').pullRefresh();
					if(data) {
						if(data.IsPass) {
							if(data.ReturnList.length) {
								this.list = this.list.concat(data.ReturnList);
								this.pageIndex++;
								pull && pull.endPullupToRefresh(false);
								pull && pull.enablePullupToRefresh();
							} else {
								pull && pull.endPullupToRefresh(true);
								if(this.pageIndex == 1) {
									this.isTips = true;
									pull && pull.disablePullupToRefresh();
								}
							}
						}
					}
				})
			},
			formatDate(value) {
				return value ? this.sui.formatDate('y-m-d h:i:s', value) : "";
			},
			type(value) {
				switch(value) {
					case 10:
						return '邀请注册奖励'
					case 11:
						return '邀请出借奖励'
					case 20:
						return '个人出借奖励'
				}
			},
			getAmount(value) {
				return this.sui.rmoney(value);
			}
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
	.reward {
		ul {
			padding: 10px;
		}
		.reward-item {
			padding: 15px;
			background: #FFFFFF;
			border-radius: 6px;
			margin-bottom: 10px;
			div {
				margin-bottom: 15px;
				&:last-child {
					margin-bottom: 0;
				}
			}
			span {
				display: inline-block;
				vertical-align: middle;
				text-align: center;
				font-size: 14px;
			}
			.name {
				color: #999999;
			}
			.val {
				color: #2C2C2C;
			}
		}
	}
</style>