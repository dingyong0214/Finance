<template>
	<div class="info" ref="info">
		<div class="mui-scroll-wrapper mui-content" id="pullrefresh">
			<div class="mui-scroll">
				<ul class="mui-table-view">
					<li v-for="item in arr" @tap="link(item.Id)">
						<div class="mui-table-view-cell">
							<div class="img-box">
								<img :src="item.Cover || 'static/img/info.png'" width="100%" />
							</div>
							<div class="main">
								<h2>{{item.Title}}</h2>
								<p>{{substr(item.Content)}}</p>
							</div>
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
				arr: [],
				page: 1,
				isTips: false
			}
		},
		mounted: function() {
			this.$nextTick(function() {

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
					let pull = mui('#pullrefresh').pullRefresh();
					pull && pull.disablePulldownToRefresh();
					pull && pull.pullupLoading();
				}, 200);

			})

		},
		methods: {
			pullupRefresh() {
				this.sui.request('Home/NewsList', {
					pageIndex: this.page
				}, "get", (data) => {
					if(data) {
						if(data.IsPass) {
							var pull = mui('#pullrefresh').pullRefresh();
							if(data.ReturnList.length) {
								this.arr.push.apply(this.arr, data.ReturnList);
								this.page++
									pull && pull.endPullupToRefresh(false);
							} else {
								if(this.page == 1) {
									pull && pull.disablePullupToRefresh();
									this.isTips = true;
								}
								pull && pull.endPullupToRefresh(true);
							}
						} else {
							mui.toast(data.Desc)
						}
					}

				})
			},
			//			路由跳转
			link(infoId) {
				this.$router.push({
					name: "infoDetail",
					query: {
						id: infoId
					}
				})
			},
			substr(content) {
				//去除全部的html标签
				var result = content.replace(/<\s?[^>]*>/gi, "");
				if(result && result.length > 50) {
					result = result.substr(0, 50);
				}
				return result;
			}
		},
		components: {
			tips
		}
	}
</script>

<style lang="scss">
	.info {
		.mui-table-view {
			background: #f7f7f9;
			li {
				margin-bottom: 10px;
				background: #fff;
			}
		}
		.mui-table-view-cell {
			padding: 15px;
			display: flex;
			font-size: 0;
			.img-box {
				margin-right: 15px;
				display: inline-block;
				vertical-align: top;
				width: 75px;
				height: 75px;
			}
			.main {
				flex: 1;
				overflow: hidden;
				h2 {
					padding-top: 2px;
					margin-bottom: 8px;
					color: #2c2c2c;
					font-size: 14px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				p {
					font-size: 12px;
					line-height: 18px;
					color: #999999;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					overflow: hidden;
				}
			}
		}
	}
</style>