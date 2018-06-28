<template>
	<div class="tenderList">
		<div id="pullrefresh" class="mui-content mui-scroll-wrapper recharge-item">
			<div class="mui-scroll">
				<ul>
					<li class="tender" v-for="item in tenderList" @tap="link(item.Id,item.LoanType,item.Name)">
						<div class="mui-table-view-cell">
							<div class="title-box border-1px">
								<h2>{{item.Name}}</h2>
								<div class="btn-box">
									<button class="mui-btn mui-btn-warning mui-btn-outlined">{{refundWays(item.RefundWays)}}</button>
									<!--<button class="mui-btn mui-btn-warning mui-btn-outlined" v-if="this.$route.query.type!=1 && item.LoanType==4">{{transfer()}}</button>-->
									<!--状态： 6-可加入 7-撤标中 8-流标 9-已结束 10-放款中 11-还款中 12-还款完成-->
									<button class="mui-btn" :class="{'mui-btn-warning':item.State==6,'btn-gray':item.State!=6}">{{loanState(item.State)}}</button>
								</div>
							</div>
							<div class="main" :class="{gray:item.State!=6}">
								<div class="item">
									<h3 v-html="getRate(item.MinRate,item.RaiseRate)"><b class="big">10.0</b>+2.0%</h3>
									<span>年利率</span>
								</div>
								<div class="item">
									<p>{{getTerm(item.LoanTerm,item.LoanTermUnit)}}</p>
									<span>出借期限</span>
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
		<tips v-show="isTips"></tips>
	</div>
</template>

<script>
	import tips from "@/common/components/tips/tips"

	export default {
		data() {
			return {
				pageIndex: 1,
				tenderList: [],
				loopPullDown: null,
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
		methods: {
			link(id, type, name) {
				// 状态： 6-可加入 7-撤标中 8-流标 9-已结束 10-放款中 11-还款中 12-还款完成
				// 标的id：  type=4为债转标
				// 债转：状态：1-转让中 2-取消 3-成功 4-失败
				this.$router.push({
					name: "investDetail",
					query: {
						id: id,
						type: type,
						title: name
					}
				})
			},
			pullupRefresh() {
				//上拉加载
				this.sui.request('Loan/YearsLoanList', {
					pageIndex: this.pageIndex,
					loanType: this.$route.query.type
				}, "get", (data) => {
					var pull = mui('#pullrefresh').pullRefresh();
					if(data) {
						if(data.IsPass) {
							if(data.ReturnList.length) {
								this.tenderList = this.tenderList.concat(data.ReturnList);
								this.pageIndex++;
								pull.endPullupToRefresh(false);
							} else {
								if(this.pageIndex == 1) {
									this.isTips = true;
								}
								pull.endPullupToRefresh(true);
							}
						}
					}
					pull && pull.endPulldownToRefresh();
				})
			},
			pullDownRefresh() {
				//下拉刷新
				this.sui.request('Loan/YearsLoanList', {
					pageIndex: 1,
					loanType: this.$route.query.type
				}, "get", (data) => {
					var pull = mui('#pullrefresh').pullRefresh();
					pull && pull.endPulldownToRefresh();
					//console.log(data);
					if(data) {
						if(data.IsPass) {
							if(data.ReturnList.length) {
								this.tenderList = data.ReturnList;
								this.pageIndex = 2;

								//再次刷新如果有数据，删除tips提示并启用上拉加载。
								this.loopPullDown = setTimeout(() => {
									this.isTips = false;
									let pull = mui('#pullrefresh').pullRefresh()
									if(pull) {
										//重新启用上拉加载
										pull.enablePullupToRefresh();
										pull.refresh(true);
									}
								}, 1000);

							} else {
								//禁用上拉加载
								pull && pull.disablePullupToRefresh();
								this.isTips = true;
							}
						}
					}

				})
			},
			getRate(rate, raise) {
				//获取利率
				var html = '';
				if(this.type == 2) {
					html = `<b>${rate}</b>%`;
				} else {
					html = `<b class="big">${rate}</b>+${raise}%`;
				}
				return html;
			},
			transfer() {
				//2-月债 3-年债
				return this.$route.query.type == 2 ? "月债" : "年债";
			},
			getTerm(periods, unit) {
				//1-天 2-月 3-年 4-小时
				return periods + ["天", "个月", "年", "小时"][unit - 1];
			},
			refundWays(way) {
				//还款方式：1-到期还本付息 2-等额本息 3-先息后本
				return ["到期还本付息", "等额本息", "先息后本"][way - 1];
			},
			loanState(status) {
				//状态： 6-可加入 7-撤标中 8-流标 9-已结束 10-放款中 11-还款中 12-还款完成
				return ["可加入", "撤标中", "借款失败", "已结束", "已结束", "还款中", "已结清"][status - 6];
			}
		},
		components: {
			tips
		}
	}
</script>

<style lang="scss">
	.tenderList {
		@import "src/common/scss/tender.scss";
		background: #f7f7f9;
		ul {
			padding: 10px;
			li {
				margin-bottom: 10px;
				.mui-table-view-cell {
					padding: 0 15px;
					border-radius: 6px;
				}
			}
		}
	}
</style>