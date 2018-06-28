<template>
	<div class="transferDetail" v-if="type == 1">
		<div class="mui-scroll-wrapper mui-content" id="pullrefresh" style="bottom: 50px;">
			<div class="mui-scroll">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<span class="text">项目名称</span>
						<i>{{model.Name}}</i>
					</li>
					<li class="mui-table-view-cell">
						<span class="text">转让金额</span>
						<i>{{model.TransferAmount}}</i>
					</li>
					<li class="mui-table-view-cell">
						<span class="text">待收本金</span>
						<i>{{model.SurplusCapital}}</i>
					</li>
					<li class="mui-table-view-cell">
						<span class="text">当期应收利息</span>
						<i>{{model.Interest}}</i>
					</li>
				</ul>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<span class="text">剩余期数</span>
						<i>{{model.SurplusPeriod || 0}}个月</i>
					</li>
					<li class="mui-table-view-cell">
						<span class="text">持有期数</span>
						<i>{{model.HoldPeriod || 0}}个月</i>
					</li>
				</ul>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<span class="text">转让手续费</span>
						<i>{{model.Fee}}</i>
					</li>
					<li class="mui-table-view-cell">
						<span class="text">折溢价</span>
						<i>{{model.ReduceAmount}}</i>
					</li>
					<li class="mui-table-view-cell">
						<span class="text">实际到账金额</span>
						<i>{{model.FactAmount}}</i>
					</li>
					<li class="mui-table-view-cell">
						<span class="text">状态</span>
						<i>{{getState(model.State)}}</i>
					</li>
				</ul>
				<div class="list-box">
					<h2>收购方</h2>

					<ul class="mui-table-view">
						<li class="border-1px" v-for="item in acquirer.list">
							<span class="name">{{item.UserName}}</span>
							<span class="money">{{item.Amount}}</span>
							<span class="date">{{item.InsertTime}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<button class="mui-btn mui-btn-primary mui-btn-block" @tap="btnCancle">取消转让</button>
	</div>

	<div class="transferDetail" v-else>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell">
				<span class="text">项目名称</span>
				<i>{{acquirerModel.Name}}</i>
			</li>
			<li class="mui-table-view-cell">
				<span class="text">年利率</span>
				<i>{{acquirerModel.Rate}}</i>
			</li>
			<li class="mui-table-view-cell">
				<span class="text">出借金额</span>
				<i>{{acquirerModel.TenderAmount}}</i>
			</li>
			<li class="mui-table-view-cell">
				<span class="text">受让金额</span>
				<i>{{acquirerModel.AcquirerAmount}}</i>
			</li>
			<li class="mui-table-view-cell">
				<span class="text">待收利息</span>
				<i>{{acquirerModel.Interest}}</i>
			</li>
			<li class="mui-table-view-cell">
				<span class="text">期数</span>
				<i>{{acquirerModel.SurplusPeriod}}</i>
			</li>
			<li class="mui-table-view-cell">
				<span class="text">还款方式</span>
				<i>{{acquirerModel.RefundWays}}</i>
			</li>
			<li class="mui-table-view-cell">
				<span class="text">受让时间</span>
				<i>{{acquirerModel.InsertTime}}</i>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: null,
				type: null,
				//转让记录
				model: {},
				acquirer: {
					index: 1,
					list: []
				},
				//受让记录
				acquirerModel: {

				}
			}
		},
		methods: {
			pullupRefresh() {
				//上拉加载
				this.sui.request('Invest/TenderList', {
					loanId: this.$route.query.id,
					loanType: 4,
					pageIndex: this.acquirer.index
				}, "get", (data) => {
					var refresh = false;
					var pull = mui('#pullrefresh').pullRefresh();
					if(data) {
						if(data.IsPass) {
							var len = data.ReturnList.length;
							if(len > 0) {
								this.acquirer.list = this.acquirer.list.concat(data.ReturnList);
								this.acquirer.index++;
							} else {
								refresh = true;
							}
						} else {
							mui.toast(data.Desc);
						}
					}
					pull && pull.endPullupToRefresh(refresh);
				});
			},
			btnCancle() {
				this.loading = this.sui.wait(true, '正在加载');
				this.sui.request('Transfer/CancelTransfer', {
					transferId: this.$route.query.id
				}, "get", (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						var IsPass = data.IsPass;
						if(IsPass) {
							mui.toast('取消成功');
						} else {
							mui.toast(data.Desc);
						}
					}
				});
			},
			//格式化函数：
			getState(value) {
				//状态：1-转让中 2-取消 3-成功 4-失败
				return value ? ["转让中", "已取消", "转让成功", "转让失败"][value-1] : "";
			}
		},
		created: function() {
			this.type = this.$route.query.type;
			//type:1=转让记录 2=受让记录
			var postData = [{
				transferId: this.$route.query.id
			}, {
				transferId: this.$route.query.id,
				tenderDetailId: this.$route.query.detailId
			}][this.type - 1];

			this.loading = this.sui.wait(true, '正在加载');

			this.sui.request('Transfer/' + ['UserTransferDetail', 'AcquirerDetail'][this.type - 1], postData, "get", (data) => {
				//console.log(data);
				this.loading = this.sui.closewait(this.loading);
				if(data) {
					var IsPass = data.IsPass;
					if(IsPass) {
						if(this.type == 1) {
							this.model = data.ReturnObject;
						} else {
							this.acquirerModel = data.ReturnObject;
						}
					} else {
						mui.toast(data.Desc);
					}
				}
			});

		},
		mounted: function() {
			if(this.type == 1) {
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
			}
		}
	}
</script>

<style lang="scss">
	.transferDetail {
		padding-bottom: 49px;
		.mui-table-view {
			margin-bottom: 10px;
			&:nth-last-of-type(1) {
				margin-bottom: 0;
			}
			.mui-table-view-cell {
				position: relative;
				padding: 0 15px;
				height: 44px;
				line-height: 44px;
				font-size: 0;
				font-size: 16px;
				background: #FFFFFF !important;
				i {
					position: absolute;
					line-height: 44px;
					right: 18px;
					color: #999999;
				}
			}
		}
		.list-box {
			h2 {
				padding-left: 15px;
				height: 50px;
				line-height: 50px;
				background: #f7f7f9;
			}
			ul {
				padding-left: 15px;
				background: #FFFFFF;
				li {
					position: relative;
					padding: 30px 15px 30px 0;
					@include border-1px(#E3E3EA);
					.money,
					.date {
						position: absolute;
						right: 15px;
					}
					.money {
						top: 15px;
						font-size: 16px;
					}
					.date {
						bottom: 15px;
						font-size: 14px;
						color: #999999;
					}
					.name {
						display: inline-block;
						vertical-align: middle;
						font-size: 16px;
					}
				}
			}
		}
		.mui-btn {
			position: fixed;
			bottom: 0;
			z-index: 100;
			border-radius: 0;
			margin-bottom: 0;
		}
	}
</style>