<template>
	<div class="assetsRecords" ref="records">
		<div class=" mui-scroll-wrapper mui-content" id="pullrefresh">
			<div class="mui-scroll">
				<ul class="list">
					<li v-for="item in tenderList">
						<div class="mui-table-view-cell" @tap="link({id:item.LoanId,state:item.LoanStatus,type:item.LoanType,name:item.Name,transferId:item.TransferId,detailId:item.TenderDetailId})">
							<div class="title-box border-1px">
								<h2>{{item.Name}}</h2>
								<div class="btn-box">
									<button class="mui-btn mui-btn-warning mui-btn-outlined">{{item.RefundWays}}</button>
									<!--<button class="mui-btn mui-btn-warning mui-btn-outlined" v-if="type!=1 && item.LoanType==4">{{type == 2 ? "月债" : "年债"}}</button>-->
									<!--状态： 6-可加入 7-撤标中 8-流标 9-已结束 10-放款中 11-还款中 12-还款完成-->
									<button class="mui-btn" :class="{'mui-btn-grey':item.LoanStatus!=6,'mui-btn-warning':item.LoanStatus==6}">{{item.LoanStatusDesc}}</button>
								</div>
							</div>
							<div class="main border-1px">
								<ul>
									<li>
										<p>年化利率：{{item.Rate.toFixed(1)}}%</p>
										<p>预期收益：{{format(item.YuQiTotalIncome)}}</p>
									</li>
									<li>
										<p>出借金额：{{item.Amount}}</p>
										<p>出借期限：{{item.Periods}}个月</p>
									</li>
									<li>
										<p>投标时间：{{getDate(item.InsertTime,1)}}</p>
									</li>
									<li>
										<p>到期日期：{{getDate(item.DueDate,2)}}</p>
									</li>
								</ul>
							</div>
						</div>
						<!--<div class="xuqi-box" v-if="type!=1 && item.KeCuQiShu>0" @tap="showPicker(item.TenderDetailId,item.KeCuQiShu)">
							<div class="mui-table-view-cell">
								<span>续期</span>
							</div>
						</div>-->
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
				tenderList: [],
				index: 1,
				type: -99,//this.$route.query.type,
				//type =1房易融， =2月账户  =3年账户
				picker: null
			}
		},
		created: function() {
			document.title = this.$route.query.title;
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

						},
						up: {
							callback: this.pullupRefresh
						}
					}
				});

				var pull = mui('#pullrefresh').pullRefresh();
				pull && pull.disablePulldownToRefresh();
				pull && pull.pullupLoading();

				this.picker = new mui.PopPicker();

			})

		},
		beforeDestroy: function() {
			this.picker.dispose();
			this.picker = null;
		},
		methods: {
			showPicker(id, periods) {
				var dataArr = [];
				//1-房易融 2-月账户 3-年账户
				var unit = ["", "个月", "年"][parseInt(this.type) - 1];
				for(var i = 0; i < periods; i++) {
					dataArr.push({
						v: i + 1,
						t: (i + 1) + unit
					});
				}
				this.picker.setData(dataArr);
				setTimeout(() => {
					this.picker.show((items) => {
						if(items[0] && items[0].v) {
							this.saveRenewal(id, items[0].v);
						}
					});
				}, 50);
			},
			saveRenewal(id, periods) {
				//保存续期
				var w = this.sui.wait(true, '请稍候...');
				this.sui.request('Invest/SaveRenewal', {
					tenderDetailId: id,
					periods: periods
				}, "get", (data) => {
					w = this.sui.closewait(w);
					if(data) {
						if(data.IsPass) {
							mui.toast('续期成功');
							vm.pulldownRefresh();
						} else {
							mui.toast(data.Desc);
						}
					}
				});
			},
			link(data) {
				// state：<!-- 4-可加入 5-撤标中 6-流标 7-已结束 8-放款中 9-还款中 10-还款完成-->
				//标的id：  type=4为债转标
				var id = data.type == 4 ? data.transferId : data.id;
				if(data.state == 11 || data.state == 12) {
					this.$router.push({
						name: "repayList",
						query: {
							id: id,
							type: data.type,
							detailId: data.detailId,
							loanId: data.id,
							title: data.name
						}
					})
				} else {
					this.$router.push({
						name: "investDetail",
						query: {
							id: id,
							type: data.type,
							title: data.name
						}
					})
				}
			},
			pullupRefresh() {
				this.sui.request('Invest/UserTenderList', {
					pageIndex: this.index,
					loanType: this.type
				}, "get", (data) => {
					if(data) {
						if(data.IsPass) {
							var pull = mui('#pullrefresh').pullRefresh();
							if(data.ReturnList.length) {
								this.tenderList = this.tenderList.concat(data.ReturnList);
								this.index++;
								pull.endPullupToRefresh(false);
							} else {
								if(this.index == 1) {
									this.isTips = true;
									pull && pull.disablePullupToRefresh();
								}
								pull && pull.endPullupToRefresh(true);
							}
						} else {
							mui.toast(data.Desc);
						}
					}
				})
			},
			format(value) {
				return this.sui.rmoney(value);
			},
			getDate(date, type) {
				return this.sui.formatDate(type == 1 ? 'y-m-d h:i:s' : 'y-m-d', date);
			}
		},
		components: {
			tips
		}
	}
</script>

<style lang="scss">
	.assetsRecords {
		position: fixed;
		width: 100%;
		top: 0;
		bottom: 0;
		background: #f7f7f9;
		z-index: 100;
		overflow: auto;
		.list {
			padding: 10px;
			>li {
				margin-bottom: 10px;
				border-radius: 6px;
				background: #FFFFFF;
				>.mui-table-view-cell {
					padding: 0;
					border-radius: 6px;
					.title-box {
						display: flex;
						position: relative;
						padding: 15px 0;
						margin: 0 15px;
						@include border-1px(#e5e5e5);
						h2 {
							flex: 1;
							line-height: 22px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							font-size: 14px;
							color: #2c2c2c;
						}
						.btn-box {
							.mui-btn {
								padding: 2px 10px;
								font-size: 12px;
								line-height: initial;
								border-radius: 25px;
							}
						}
					}
					.main {
						padding: 15px;
						@include border-1px(#e5e5e5);
						li {
							display: flex;
							margin-bottom: 15px;
							&:last-child {
								margin-bottom: 0;
							}
							p {
								flex: 1;
								font-size: 14px;
								color: #999999;
							}
						}
						&:after {
							display: none;
						}
					}
				}
				.xuqi-box {
					text-align: center;
					color: #007aff;
				}
			}
		}
	}
</style>