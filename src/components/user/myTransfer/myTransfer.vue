<template>
	<div class="myTransfer">
		<tabs @switch="tabItem" :tabName="tabName" :currentIndex="currentIndex"></tabs>
		<div class="mui-scroll-wrapper mui-content" id="pullrefresh" style="top: 45px;bottom: 0px;" ref="pullrefresh">
			<div class="mui-scroll">
				<div class="list-box">
					<ul v-show="currentIndex==0">
						<li v-for="item in can.list" @tap="link(item.LoanId,item.LoanType,item.Name)">
							<h2 class="border-1px">{{item.Name}}</h2>
							<div class="main">
								<div>待收本金：<span>{{getAmount(item.SurplusCapital)}}</span></div>
								<div>年利率：<span>{{getRate(item.Rate,item.RaiseRate)}}%</span></div>
								<div>待收利息：<span>{{getAmount(item.SurplusIntrest)}}</span></div>
								<div>剩余期数：<span>{{item.SurplusPeriods}}个月</span></div>
							</div>
							<button @tap="toDetail($event,0,item.TenderDetailId)" class="mui-btn mui-btn-primary">转让</button>
						</li>
					</ul>
					<ul v-show="currentIndex==1">
						<li v-for="item in transfer.list" @tap="link(item.TransferId,4,item.Name)">
							<h2 class="border-1px">{{item.Name}}</h2>
							<div class="main">
								<div>转让金额：<span>{{getAmount(item.Amount)}}</span></div>
								<div>年利率：<span>{{getRate(item.Rate,0)}}%</span></div>
								<div>待收本金：<span>{{getAmount(item.SurplusCapital)}}</span></div>
								<div>剩余期数：<span>{{item.SurplusPeriods}}个月</span></div>
							</div>
							<button @tap="toDetail($event,1,item.TransferId)" class="mui-btn mui-btn-primary">详情</button>
						</li>
						<!--<li v-for="item in 1" @tap="link(1,4,2)">
							<button @tap="toDetail($event,1,123)" class="mui-btn mui-btn-primary">详情</button>
						</li>-->
					</ul>
					<ul v-show="currentIndex==2">
						<li v-for="item in farmIn.list" @tap="link(item.TransferId,4,item.Name)">
							<h2 class="border-1px">{{item.Name}}</h2>
							<div class="main">
								<div>受让金额：<span>{{getAmount(item.Amount)}}</span></div>
								<div>年利率：<span>{{getRate(item.Rate,0)}}%</span></div>
								<div>转让人：<span>{{item.Farmor}}</span></div>
								<div>期限：<span>{{item.Periods}}个月</span></div>
							</div>
							<button @tap="toDetail($event,2,item.TransferId,item.TenderDetailId)" class="mui-btn mui-btn-primary">详情</button>
						</li>
						<!--<li v-for="item in 1">
							<button @tap="toDetail($event,2,123,45)" class="mui-btn mui-btn-primary">详情</button>
						</li>-->
					</ul>

				</div>
			</div>
		</div>
		<tips v-show="isTips"></tips>
	</div>
</template>

<script>
	import tabs from "@/common/components/tabs/tabs"
	import tips from "@/common/components/tips/tips"

	export default {
		data() {
			return {
				currentIndex: 0,
				tabName: [{
						name: '可转让'
					},
					{
						name: '转让记录'
					},
					{
						name: '受让记录'
					}
				],
				loopPullDown: null,
				isTips: false,
				isLoad: true,
				can: {
					//可转让
					pageIndex: 1,
					list: []
				},
				transfer: {
					//转让记录
					pageIndex: 1,
					list: []
				},
				farmIn: {
					//受让记录
					pageIndex: 1,
					list: []
				}
			}
		},
		methods: {
			link(id, type, name) {
				this.$router.push({
					name: "investDetail",
					query: {
						id: id,
						type: type,
						title: name
					}
				})
			},
			toDetail(ev, type, id, detailId) {
				ev.stopPropagation();

				this.$router.push({
					name: type ? "transferDetail" : "transfer",
					query: {
						type: type,
						id: id,
						detailId: detailId
					}
				})

			},
			tabItem(i) {
				//i = 子组件传参,切换选项卡
				if(this.isLoad) {
					mui.toast("请稍候...")
					return;
				}
				if(this.currentIndex == i) {
					mui('#pullrefresh').pullRefresh().scrollTo(0, 0, 200);
					return;
				} else {
					mui('#pullrefresh').pullRefresh().scrollTo(0, 0, 0);
				}
				this.isTips = false;
				this.currentIndex = i;
				var page = [this.can.pageIndex, this.transfer.pageIndex, this.farmIn.pageIndex][this.currentIndex];

				if(page == 1) {
					mui('#pullrefresh').pullRefresh().pulldownLoading();
				}
			},
			pullupRefresh() {
				//上拉加载
				var tabIndex = this.currentIndex;
				var postUrl = "Transfer/" + ["CanTransferList", "UserTransferList", "FarmInList"][tabIndex];
				var pageIndex = [this.can.pageIndex, this.transfer.pageIndex, this.farmIn.pageIndex][tabIndex];
				this.sui.request(postUrl, {
					pageIndex: pageIndex
				}, "get", (data) => {
					var refresh = false;
					var pull = mui('#pullrefresh').pullRefresh();
					if(data) {
						if(data.IsPass) {
							if(data.ReturnList && data.ReturnList.length) {
								if(tabIndex == 0) {
									this.can.list = this.can.list.concat(data.ReturnList);
									this.can.pageIndex++;
								} else if(tabIndex == 1) {
									this.transfer.list = this.transfer.list.concat(data.ReturnList);
									this.transfer.pageIndex++;
								} else {
									this.farmIn.list = this.farmIn.list.concat(data.ReturnList);
									this.farmIn.pageIndex++;
								}
							} else {
								//这里未处理第一页的情况
								refresh = true;
							}
						} else {
							mui.toast(data.Desc);
						}
					}
					pull && pull.endPullupToRefresh(refresh);
				})
			},
			pullDownRefresh() {
				//下拉刷新
				this.isLoad = true;
				var tabIndex = this.currentIndex;
				clearTimeout(this.loopPullDown);
				var postUrl = "Transfer/" + ["CanTransferList", "UserTransferList", "FarmInList"][tabIndex];

				this.sui.request(postUrl, {
					pageIndex: 1
				}, 'get', (data) => {
					//console.log(data);
					var pull = mui('#pullrefresh').pullRefresh();
					pull && pull.endPulldownToRefresh();
					if(data) {
						if(data.IsPass) {
							if(data.ReturnList && data.ReturnList.length) {
								if(tabIndex == 0) {
									this.can.list = data.ReturnList;
									this.can.pageIndex = 2;
								} else if(tabIndex == 1) {
									this.transfer.list = data.ReturnList;
									this.transfer.pageIndex = 2;
								} else {
									this.farmIn.list = data.ReturnList;
									this.farmIn.pageIndex = 2;
								}
								this.isTips = false;
								this.loopPullDown = setTimeout(() => {
									//重新启用上拉加载
									pull && pull.enablePullupToRefresh();
									pull && pull.refresh(true);

								}, 1000);
							} else {
								if(tabIndex == 0) {
									this.can.list = [];
								} else if(tabIndex == 1) {
									this.transfer.list = [];
								} else {
									this.farmIn.list = [];
								}
								//禁用上拉加载
								pull && pull.disablePullupToRefresh();
								this.isTips = true;
							}
						} else {
							mui.toast(data.Desc)
						}
					}
					this.$nextTick(() => {
						this.isLoad = false;
					})
				})
			},
			//格式化函数：
			getAmount(value) {
				return value ? this.sui.rmoney(value) : '0.00';
			},
			getRate(rate, raise) {
				return rate ? (raise ? rate.toFixed(1) + '+' + raise.toFixed(1) : rate.toFixed(1)) : '0.0';
			}
		},
		activated: function() {
			if(this.$route.params.index) {
				this.currentIndex = this.$route.params.index;
			}

			this.$nextTick(() => {
				var pull = mui('#pullrefresh').pullRefresh();
				pull && pull.endPulldownToRefresh();
				pull && pull.pulldownLoading();
			})
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
						down: {
							callback: this.pullDownRefresh
						},
						up: {
							callback: this.pullupRefresh
						}
					}
				});

				setTimeout(() => {
					var pull = mui('#pullrefresh').pullRefresh();
					pull && pull.pulldownLoading();
				}, 200);
			})

		},
		components: {
			tabs,
			tips
		}
	}
</script>

<style lang="scss">
	.myTransfer {
		padding-top: 45px;
		.tabs {
			position: fixed !important;
			left: 0;
			top: 0;
		}
		.list-box {
			ul {
				padding: 15px;
				li {
					position: relative;
					padding: 15px 15px 0;
					margin-bottom: 15px;
					background: #FFFFFF;
					font-size: 0;
					border-radius: 6px;
					.mui-btn {
						position: absolute;
						right: 15px;
						top: 9px;
						height: 28px;
						line-height: 28px;
						padding: 0 12px;
					}
					h2 {
						padding-bottom: 15px;
						font-size: 16px;
						color: #2c2c2c;
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
						span {
							color: #2c2c2c;
						}
					}
				}
			}
		}
	}
</style>