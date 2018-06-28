<template>
	<div class="invite">
		<div class="mui-scroll-wrapper mui-content" id="pullrefresh">
			<div class="mui-scroll">
				<ul class="list">
					<li v-for="item in list">
						<div class="title">
							<h2 class="border-1px">{{item.Mobile}}</h2>
							<button class="mui-btn mui-btn-outlined" :class="{'mui-btn-warning':item.State}">{{item.State==1?'有效':'无效'}}</button>
						</div>
						<div class="main">
							<div>姓名：<span>{{item.Name}}</span></div>
							<div>是否实名：<span>{{item.IsRealName}}</span></div>
							<div>已得奖励：<span>{{item.IsInvest}}</span></div>
							<div>注册时间：<span>{{item.RecommandTime}}</span></div>
							<div>奖励过期时间：<span>{{item.RecommandTime}}</span></div>
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
				list: [],
				pageIndex: 1,
				isTips: false
			}
		},
		methods: {
			pullupRefresh() {
				//上拉加载

				this.sui.request('Account/RecommendList', {
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
	.invite {
		.list {
			padding: 15px;
			li {
				position: relative;
				padding: 0 15px 15px;
				margin-bottom: 15px;
				background: #FFFFFF;
				font-size: 0;
				border-radius: 6px;
				.title {
					position: relative;
					padding: 15px 0;
					@include border-1px(#e5e5e5) h2 {
						font-size: 16px;
					}
					.mui-btn {
						position: absolute;
						right: 0;
						top: 50%;
						transform: translateY(-50%);
						padding: 2px 10px;
						font-size: 12px;
						line-height: normal;
						border-radius: 25px;
					}
				}
				.main {
					>div {
						margin-top: 15px;
						font-size: 12px;
						color: #999999;
					}
					span {
						color: #2C2C2C;
					}
				}
			}
		}
	}
</style>