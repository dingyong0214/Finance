<template>
	<div class="investRecording">
		<div id="pullrefresh" class="mui-content mui-scroll-wrapper recharge-item">
			<div class="mui-scroll">
				<ul class="border-1px">
					<li class="border-1px" v-for="item in investList">
						<i class="icon" :class="className(item.Channel)"></i>
						<span class="name">{{item.UserName}}</span>
						<span class="money">{{item.Amount}}</span>
						<span class="date">{{item.InsertTime}}</span>
					</li>
					<li class="border-1px" v-for="item in refundList">
						<span class="name">第{{item.CurrentPeriod}}期</span>
						<!--<span class="name">第{{item.CurrentPeriod}}期</span>-->
						<span class="money">{{item.TotalAmount}}</span>
						<span class="date">{{item.RefundDate}}</span>
					</li>

					<!--<li class="border-1px">
						<i class="icon icon-2"></i>
						<span class="name">159****4914</span>
						<span class="money">10000.00</span>
						<span class="date">2017-10-12&nbsp;&nbsp;09:12</span>
					</li>-->
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
				id: "",
				type: "",
				pageIndex: 1,
				investList: [],
				refundList: [],
				isTips: false
			}
		},
		methods: {
			className(type) {
				//渠道：1-网站 2-微信 3-安卓 4-IOS 5-触屏版 6-运营后台 7-支付宝
				switch(type) {
					case 1 || 6:
						return 'icon-1'
					case 2:
						return 'icon-2'
					case 3 || 4 || 5:
						return 'icon-3'
					case 7:
						return 'icon-4'
					default:
						return 'icon-1'
				}

				//return ['icon-1','icon-2','icon-3','icon-3','icon-3','icon-1','icon-4'][type-1];
			},
			pullupRefresh() {
				var postUrl = '';
				var param = {
					pageIndex: this.pageIndex
				};

				//status: 0=出借记录,1=待还记录
				if(this.$route.query.status == 0) {
					if(this.id != 0) {
						postUrl = 'Invest/TenderList'
						param.loanId = this.id;
					} else {
						postUrl = 'Invest/YearsTenderList'
					}
					param.loanType = this.type;
				} else {
					postUrl = 'Refund/RefundPlanList';
					param.loanId = this.type == 4 ? this.$route.query.loanId : this.id;
				}

				this.sui.request(postUrl, param, "get", (data) => {
					var pull = mui('#pullrefresh').pullRefresh();
					var refresh = false;
					if(data) {
						if(data.IsPass) {
							var len = data.ReturnList.length;
							if(len > 0) {
								//status: 0=出借记录,1=待还记录
								if(this.$route.query.status == 0) {
									this.investList = this.investList.concat(data.ReturnList);
								} else {
									this.refundList = this.refundList.concat(data.ReturnList);
								}
								this.pageIndex++;
								refresh = false;
							} else {
								if(this.pageIndex == 1) {
									this.isTips = true;
									pull && pull.disablePullupToRefresh();
								}
								refresh = true;
							}
						} else {
							mui.toast(data.Desc);
							refresh = false;
						}
					}
					pull && pull.endPullupToRefresh(refresh);
				});
			}
		},
		created: function() {
			document.title = this.$route.query.title;
			this.id = this.$route.query.id;
			this.type = this.$route.query.type;
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
	.investRecording {
		background: #f7f7f9;
		ul {
			padding-left: 15px;
			background: #FFFFFF;
			@include border-1px(#E3E3EA);
			li {
				position: relative;
				padding: 30px 15px 30px 0;
				@include border-1px(#E3E3EA);
				&:last-child {
					@include border-none();
				}
				.icon {
					display: inline-block;
					vertical-align: middle;
					width: 22px;
					height: 22px;
					&.icon-1 {
						background: url(icon-1.png) no-repeat 0/100%;
					}
					&.icon-2 {
						background: url(icon-2.png) no-repeat 0/100%;
					}
					&.icon-3 {
						background: url(icon-3.png) no-repeat 0/100%;
					}
					&.icon-4 {
						background: url(icon-4.png) no-repeat 0/100%;
					}
				}
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
</style>