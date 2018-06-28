<template>
	<div class="investment">
		<tabs @switch="tabItem" :type="tabType" :tabName="tabName" :currentIndex="currentIndex"></tabs>
		<div class="mui-scroll-wrapper mui-content" id="pullrefresh" style="top: 45px;bottom: 51px;" ref="pullrefresh">
			<div class="mui-scroll">
				<div class="banner" v-show="isLogin" @tap="btnRisk">
					{{riskTips}}
				</div>
				<div v-show="currentIndex == 0" v-if="years.list[0].MinRate">
					<ul class="list">
						<!-- 年月账户标不需要id请求，传0 -->
						<li class="tender" @tap="link(0,item.LoanType,item.LoanType==2?'月账户':'年账户')" v-for="item in years.list">
							<div class="mui-table-view-cell">
								<div class="title-box border-1px">
									<h2>{{item.LoanType==2?"月账户":"年账户"}}</h2>
									<!--<div class="btn-box">
										<button class="mui-btn mui-btn-warning mui-btn-outlined">最短期限{{item.LoanType==2?"1个月":"1年"}}</button>
									</div>-->
								</div>
								<div class="main" :class="{gray:item.SurplusAmount==0}">
									<div class="item">
										<h3 v-html="yearsRate(item.MinRate,item.MaxRate,item.RaiseRate,item.LoanType)"></h3>
										<span>年利率</span>
									</div>
									<div class="item">
										<p>{{yearsTerm(item.MinLoanTerm,item.LoanTermUnit,item.MaxLoanTerm)}}</p>
										<span>出借期限</span>
									</div>
									<div class="item">
										<p>{{ getAmount(item.SurplusAmount) }}</p>
										<span>可投金额</span>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div v-show="currentIndex == 1">
					<ul class="list">
						<li class="tender" v-for="item in loan.list" @tap="link(item.Id,item.LoanType,item.Name)">
							<div class="mui-table-view-cell">
								<div class="title-box border-1px">
									<h2>{{item.Name}}</h2>
									<div class="btn-box">
										<button class="mui-btn mui-btn-warning mui-btn-outlined">{{item.RiskLevel}}</button>
										<button class="mui-btn mui-btn-warning mui-btn-outlined">{{ refundWays(item.RefundWays) }}</button>
										<!-- 6-可加入 7-撤标中 8-流标 9-已结束 10-放款中 11-还款中 12-还款完成-->
										<button class="mui-btn" :class="{'btn-gray':item.State!=6,'mui-btn-warning':item.State==6}">{{statusDesc(item.State)}}</button>
									</div>
								</div>
								<div class="main" :class="{gray:item.State!=6}">
									<div class="item">
										<h3 v-html="getRate(item.Rate,item.RaiseRate)"></h3>
										<span>年利率</span>
									</div>
									<div class="item">
										<p>{{getTerm(item.LoanTerm,item.LoanTermUnit)}}</p>
										<span>借款期限</span>
									</div>
									<div class="item">
										<p>{{item.SurplusAmount}}</p>
										<span>可投金额</span>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div v-show="currentIndex == 2">

					<ul class="list">
						<li class="tender" v-for="item in transfer.list" @tap="link(item.Id,4,item.Name)">
							<div class="mui-table-view-cell">
								<div class="title-box border-1px">
									<h2>{{item.Name}}</h2>
									<div class="btn-box">
										<!--<button class="mui-btn mui-btn-warning mui-btn-outlined">最短期限一个月</button>
									<button class="mui-btn mui-btn-warning mui-btn-outlined">月债</button>
									<button class="mui-btn" :class="{'mui-btn-warning':1,'btn-gray':0}">{{1?'可投':'还款中'}}</button>-->

										<button class="mui-btn mui-btn-warning mui-btn-outlined">{{item.RiskLevel}}</button>
										<button class="mui-btn mui-btn-warning mui-btn-outlined">{{ refundWays(item.RefundWays) }}</button>
										<!--状态：1-转让中 2-取消 3-成功 4-失败-->
										<button class="mui-btn" :class="{'btn-gray':item.State!=1,'mui-btn-warning':item.State==1}">{{transferDesc(item.State)}}</button>
									</div>
								</div>
								<div class="main" :class="{gray:item.State!=1}">
									<!--class='gray'-->
									<div class="item">
										<h3 v-html="getRate(item.Rate,item.RaiseRate)"></h3>
										<span>年利率</span>
									</div>
									<div class="item">
										<p>{{getTerm(item.SurplusPeriod,2)}}</p>
										<span>剩余期数</span>
									</div>
									<div class="item">
										<p>{{item.SurplusAmount}}</p>
										<span>可投金额</span>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<tips v-show='isTips'></tips>
	</div>
</template>

<script>
	import tabs from "@/common/components/tabs/tabs"
	import tips from "@/common/components/tips/tips"

	export default {
		data() {
			return {
				tabType: 1,
				pull: null,
				currentIndex: 1,
				isTips: false,
				riskLevel: 0,
				isLogin:false,
				tabName: [
					//				{
					//						name: '年月账户'
					//					},
					{
						name: '房易融'
					},
					{
						name: '债权转让'
					}
				],
				pullrefresh: null,
				loopPullDown: null,
				isLoad: true,
				years: {
					pageIndex: 1,
					list: [{}]
				},
				loan: {
					pageIndex: 1,
					list: []
				},
				transfer: {
					pageIndex: 1,
					list: []
				}
			}
		},
		computed: {
			banner() {
				if(localStorage.getItem('LEAD_TOKEN')) {

				}
			}
		},
		mounted() {
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
		activated() {
			var pull = mui('#pullrefresh').pullRefresh();
			pull && pull.endPulldownToRefresh();
			this.isLogin = this.sui.isLogin()
		},
		methods: {
			link(id, type, name) {
				// state：<!-- 4-可加入 5-撤标中 6-流标 7-已结束 8-放款中 9-还款中 10-还款完成-->
				//标的id： 0-false表示年月账户资金池明细  type=4为债转标
				if(this.riskLevel == 0 && this.isLogin) {
					this.$router.push({
						name: "riskTest"
					})
				} else {
					this.$router.push({
						name: "investDetail",
						query: {
							id: id,
							type: type,
							title: name
						}
					})
				}

			},
			btnRisk() {
				if(this.riskLevel == 0 && this.isLogin) {
					this.$router.push({
						name: "riskTest"
					})
				}
			},
			tabItem(i) {
				//i = 子组件传参,切换选项卡
				if(this.isLoad) {
					mui.toast("请稍候")
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

				var page = [this.years.pageIndex, this.loan.pageIndex, this.transfer.pageIndex][this.currentIndex];

				if(page == 1) {
					//等于第一页说明没有数据，先禁用上拉加载，再调用下拉刷新,以防上拉加载字样闪烁。
					mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
					mui('#pullrefresh').pullRefresh().pulldownLoading();
				} else {
					if(this.currentIndex == 0) {
						//年月账户，禁止上拉加载
						mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
						return;
					}
					setTimeout(() => {
						//避免上拉加载字样出现太快
						//重新启用上拉加载。
						var pull = mui('#pullrefresh').pullRefresh();
						if(pull) {
							pull.enablePullupToRefresh();
							pull.refresh(true);
						}
					}, 200);
				}
			},

			pullupRefresh() {
				//上拉加载
				var tabIndex = this.currentIndex;
				var pull = mui('#pullrefresh');
				if(tabIndex == 0) {
					//如果是年月账户，禁用上拉加载。
					pull.pullRefresh().endPullupToRefresh(true);
					pull.pullRefresh().disablePullupToRefresh();
					return;
				}
				var postUrl = ["Loan/YearsLoan", "Loan/LoanList", "Transfer/TransferList"][tabIndex];
				var param = [{}, {
					pageIndex: this.loan.pageIndex
				}, {
					pageIndex: this.transfer.pageIndex
				}][tabIndex];

				this.sui.request(postUrl, param, "get", (data) => {
					if(data) {
						var refresh = false;
						if(data.IsPass) {
							if(data.ReturnList.length) {
								if(tabIndex == 1) {
									this.loan.list = this.loan.list.concat(data.ReturnList);
									this.riskLevel = data.ReturnObject;
									this.loan.pageIndex++
								} else {
									this.transfer.list = this.transfer.list.concat(data.ReturnList);
									this.riskLevel = data.ReturnObject;
									this.transfer.pageIndex++
								}
								refresh = false;
							} else {
								//优化
								refresh = true;
							}

						} else {
							mui.toast(data.Desc);
						}
					}
					pull && pull.pullRefresh().endPullupToRefresh(refresh);

				})
			},
			pullDownRefresh() {
				//下拉刷新
				this.isLoad = true;
				var tabIndex = this.currentIndex;
				clearTimeout(this.loopPullDown);
				var postUrl = ["Loan/YearsLoan", "Loan/LoanList", "Transfer/TransferList"][tabIndex];
				var param = [{}, {
					pageIndex: 1
				}, {
					pageIndex: 1
				}][tabIndex];

				this.sui.request(postUrl, param, "get", (data) => {
					var pull = mui('#pullrefresh').pullRefresh();
					pull && pull.endPulldownToRefresh();
					if(data) {
						if(data.IsPass) {
							if(tabIndex == 0) {
								this.years.list = [];
								this.years.list.push(data.ReturnObject);
								this.years.list.push(data.ReturnObject2);
								if(this.years.list.length) {
									this.years.pageIndex = 2;
								} else {
									this.isTips = true;
								}

								//禁用上拉加载
								pull && pull.disablePullupToRefresh();

								this.$nextTick(function() {
									this.isLoad = false;
								})
								return;
							}

							if(data.ReturnList.length) {
								if(tabIndex == 1) {
									this.loan.list = data.ReturnList;
									this.riskLevel = data.ReturnObject;
									this.loan.pageIndex = 2;
								} else {
									this.transfer.list = data.ReturnList;
									this.riskLevel = data.ReturnObject;
									this.transfer.pageIndex = 2;
								}
								this.isTips = false;
								this.loopPullDown = setTimeout(() => {
									if(tabIndex != 0 && this.currentIndex != 0 && pull) {
										//重新启用上拉加载
										pull.enablePullupToRefresh();
										pull.refresh(true);
									}
								}, 1000);
							} else {
								//禁用上拉加载
								this.isTips = true;
								pull && pull.disablePullupToRefresh();
							}

						} else {
							mui.toast(data.Desc);
						}
					}
					this.$nextTick(function() {
						this.isLoad = false;
					})
				})
			},
			//格式化函数：
			getAmount(value) {
				return this.sui.rmoney(value);
			},
			getTerm(periods, unit) {
				//1-天 2-月 3-年 4-小时
				return periods + ["天", "个月", "年", "小时"][unit - 1];
			},
			yearsTerm(min, unit, max) {
				var result = "";
				//1-天 2-月 3-年 4-小时
				var termUnit = ["天", "个月", "年", "小时"][unit - 1];
				if(!max || min == max) {
					result = min + termUnit;
				} else {
					result = min + "-" + max + termUnit;
				}
				return result;
			},
			refundWays(value) {
				//还款方式：1-到期还本付息 2-等额本息 3-先息后本
				return ["到期还本付息", "等额本息", "先息后本"][value - 1];
			},
			statusDesc(status) {
				//状态： 6-可加入 7-撤标中 8-流标 9-已结束 10-放款中 11-还款中 12-还款完成
				return ["可加入", "撤标中", "借款失败", "已结束", "已结束", "还款中", "已结清"][status - 6];
			},
			transferDesc(status) {
				//状态：1-转让中 2-取消 3-成功 4-失败
				return ["转让中", "已取消", "转让成功", "转让失败"][status - 1];
			},

			yearsRate(min, max, raise, type) {
				//借款类型：1-房易融 2-月账户 3-年账户 4-债转
				if(type == 2) {
					return min + '~<b class="big">' + max + '%</b>';
				} else {
					return '<b class="big">' + min + '</b>+' + raise + '%';
				}
			},
			getRate(rate, raise) {
				return '<b class="big">' + (parseFloat(rate) + parseFloat(raise)).toFixed(1) + '</b>%';
				//				var raiseRate = Math.floor(raise);
				//				if(raiseRate <= 0) {
				//					return '<b class="big">' + rate + '</b>%';
				//				} else {
				//					return '<b class="big">' + rate + '</b>+' + raise + '%';
				//				}
			}
		},
		computed: {
			riskTips() {
				var showTxt = "按国家互联网金融监管有关规定，需您先完成“风险测评”。测评完成，方可进行下一步操作。";
				if(this.isLogin && this.riskLevel > 0) {
					showTxt = "您当前风险测评等级为“" + ["保守型", "保守型", "稳健型", "积极型"][this.riskLevel] + "”，可出借的项目风险级别包括：" + ["AA、A", "AA、A", "AA、A、B", "AA、A、B、C、D"][this.riskLevel];
				}
				return showTxt;
			}
		},
		components: {
			tabs,
			tips
		}
	}
</script>

<style lang="scss">
	.investment {
		@import "src/common/scss/tender.scss";
		width: 100%;
		padding-top: 45px;
		padding-bottom: 50px;
		background: #f7f7f9;
		.banner {
			padding: 15px 12px;
			width: 100%;
			background: #FFFFFF;
			color: #FF7900;
			font-size: 14px;
			line-height: 20px;
		}
		.tabs {
			position: fixed;
			top: 0;
			padding: 0 65px;
		}
		.list {
			padding: 10px;
			li {
				margin-bottom: 10px;
			}
		}
	}
</style>