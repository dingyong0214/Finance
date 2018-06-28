<template>
	<div class="message">
		<div class="mui-scroll-wrapper mui-content" id="pullrefresh" ref="pullrefresh">
			<div class="mui-scroll">
				<ul>
					<li @tap="link(item.Id)" class="mui-table-view-cell" v-for="(item,index) in list">
						<div class="mui-slider-right mui-disabled" @tap.stop="del(index,item.Id,$event)">
							<a class="mui-btn mui-btn-red">删除</a>
						</div>
						<div class="mui-slider-handle">
							<div class="main">
								<h2><i v-if="item.State===1"></i>{{item.Title}}</h2>
								<span>{{formatDate(item.InsertTime)}}</span>
							</div>
							<i class="mui-icon mui-icon-arrowright"></i>
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
		beforeDestroy: function() {
			this.loading = this.sui.closewait(this.loading);
			mui.closePopups();
		},
		methods: {
			link(id) {
				this.$router.push({
					name: "msgDetail",
					query: {
						id: id
					}
				})
			},
			del(i, id, ev) {
				let oLi = ev.target.parentNode.parentNode;
				this.loading = this.sui.wait(true, '请稍候...');
				mui.confirm('', '是否删除此消息？', (e) => {
					if(e.index == 1) {
						this.sui.request('User/DeleteMessage', {
							msgIds: id
						}, 'get', (data) => {
							this.loading = this.sui.closewait(this.loading);
							if(data) {
								if(data.IsPass) {
									this.list.splice(i, 1);
									mui.toast('删除成功');
								} else {
									mui.toast(data.Desc);
								}
							}
							mui.swipeoutClose(oLi);
						})
					}
				})
			},
			pullupRefresh() {
				this.sui.request('User/MessageList', {
					pageIndex: this.pageIndex
				}, 'get', (data) => {
					var refresh = false;
					var pull = mui('#pullrefresh').pullRefresh();
					if(data) {
						if(data.IsPass) {
							if(data.ReturnList && data.ReturnList.length) {
								this.list = this.list.concat(data.ReturnList);
								this.pageIndex++;
							} else {
								if(this.pageIndex == 1) {
									refresh = true;
									this.isTips = true;
									pull && pull.disablePullupToRefresh();

								}
							}
						} else {
							mui.toast(data.Desc);
						}
					}
					pull && pull.endPullupToRefresh(refresh);
				})
			},
			formatDate(value) {
				return this.sui.formatDate('y-m-d h:i:s', value);
			}
		},
		components: {
			tips
		}
	}
</script>

<style lang="scss">
	.message {
		background: #f7f7f9;
		.msg {
			&:before {
				content: '';
				display: block;
				position: absolute;
				right: 45px;
				top: 50%;
				transform: translateY(-50%);
				width: 10px;
				height: 10px;
				border-radius: 50%;
				background-color: #ff3535;
			}
		}
		ul {
			background-color: #ffffff;
		}
		.mui-table-view-cell {
			.mui-slider-right {
				.mui-btn {
					padding: 0 20px;
				}
			}
			.main {
				display: inline-block;
				vertical-align: top;
				width: 90%;
				h2 {
					position: relative;
					padding-top: 1px;
					padding: 1px 0 0 12px;
					width: 100%;
					margin-bottom: 15px;
					font-size: 15px;
					color: #2c2c2c;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					i {
						position: absolute;
						left: 0px;
						top: 50%;
						transform: translateY(-50%);
						width: 8px;
						height: 8px;
						border-radius: 50%;
						background-color: #ff3535;
					}
				}
				span {
					padding-left: 15px;
					font-size: 14px;
					color: #999999;
				}
			}
			.mui-icon {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				right: 15px;
				color: #999999;
			}
		}
	}
</style>