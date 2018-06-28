<template>
	<div class="coupon">
		<div class="menu-box border-1px">
			<ul class="menu">
				<li @tap="showPicker(0)">
					<div class="cen">
						<span>{{name}}</span>
						<i class="iconfont icon-xia-copy"></i>
					</div>
				</li>
				<li @tap="showPicker(1)">
					<div class="cen">
						<span>{{stateName}}</span>
						<i class="iconfont icon-xia-copy"></i>
					</div>
				</li>
			</ul>
		</div>
		<div class="mui-scroll-wrapper mui-content" id="pullrefresh" style="top: 44px;">
			<div class="mui-scroll">
				<div class="list-box">
					<ul class="list">
						<li class="coupon-1" v-for="item in hongbao" :class="{'hb-normal':item.State==3,unusual:item.State!=3}">
							<div class="icon-box">
								<div class="money">
									<span>{{getAmount(item.Amount)}}</span>
								</div>
							</div>
							<div class="content">
								<div class="title">
									<h2>{{item.Name}}</h2>
								</div>
								<div class="text">
									<p>最低出借金额：{{item.MinInvestAmount}}</p>
									<p>最少出借期限：{{item.MinInvestPeriod}}个月以上</p>
									<p>过期时间：{{item.ValidEnd}}</p>
								</div>
							</div>
							<div class="iconfont" v-if="item.State!=3" :class="{'icon-yishiyong':item.State==4,'icon-yiguoqi1':item.State==5}"></div>
						</li>

						<li class="coupon-2" v-for="model in coupon" :class="{unusual:model.State!=3}">
							<div class="interest">
								<p>{{model.Amount.toFixed(1)}}<i>%</i></p>
								<span>We券</span>
							</div>
							<div class="content">
								<h2>{{model.Name}}</h2>
								<div class="text">
									<p>最低出借金额：{{model.MinInvestAmount}}</p>
									<p>出借奖励期数：{{model.MinInvestPeriod}}期</p>
									<p>过期时间：{{model.ValidEnd}}</p>
								</div>
							</div>
							<div class="iconfont" v-if="model.State!=3" :class="{'icon-yishiyong':model.State==4,'icon-yiguoqi1':model.State==5}"></div>
						</li>
					</ul>
				</div>
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
				type: 2,
				status: 3,
				pageIndex: 1,
				hongbao: [],
				coupon: [],
				name: '红包',
				stateName: '未使用',
				loopPullDown: null,
				picker: null,
				isTips: false
			};
		},
		created: function() {
			this.picker = new mui.PopPicker();
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
		beforeDestroy: function() {
			this.picker.dispose();
			this.picker = null;
		},
		methods: {
			showPicker(type) {
				var arr = [
					[{
						v: 2,
						t: "红包"
					}, {
						v: 3,
						t: "We券"
					}],
					[{
						v: 3,
						t: "未使用"
					}, {
						v: 4,
						t: "已使用"
					}, {
						v: 5,
						t: "已过期"
					}]
				][type];
				this.picker.setData(arr);

				//两个选择器共用一个picker，需每次显示都置为第一个选项。
				this.picker.pickers[0].setSelectedIndex(0, 0);

				setTimeout(() => {
					this.picker.show((item) => {
						if(type == 0) {
							this.type = item[0].v;
							this.name = item[0].t
						} else {
							this.status = item[0].v;
							this.stateName = item[0].t
						}
						this.refresh();
					});
				}, 200)
			},
			refresh() {
				clearTimeout(this.loopPullDown);
				this.loading = this.sui.wait(true, '正在加载');
				this.sui.request('User/CouponList', {
					type: this.type,
					status: this.status,
					pageIndex: 1
				}, "get", (data) => {
					this.loading = this.sui.closewait(this.loading);
					var pull = mui('#pullrefresh').pullRefresh();
					if(data) {
						var IsPass = data.IsPass;
						if(IsPass) {
							if(data.ReturnList && data.ReturnList.length) {
								this.isTips = false;
								if(this.type == 2) {
									this.coupon = [];
									this.hongbao = data.ReturnList;
								} else {
									this.hongbao = [];
									this.coupon = data.ReturnList;
								}
								this.pageIndex = 2;
								this.loopPullDown = setTimeout(() => {
									//重新启用上拉加载
									pull && pull.enablePullupToRefresh();
									pull && pull.refresh(true);
								}, 200);
							} else {
								this.hongbao = this.coupon = [];
								pull && pull.disablePullupToRefresh();
								this.isTips = true;
							}
						} else {
							mui.toast(data.Desc);
						}
					}
				});
			},
			pullupRefresh() {
				//上拉加载
				this.sui.request('User/CouponList', {
					type: this.type,
					status: this.status,
					pageIndex: this.pageIndex
				}, "get", (data) => {
					var pull = mui('#pullrefresh').pullRefresh();
					var refresh = false;
					if(data) {
						if(data.IsPass) {
							if(data.ReturnList && data.ReturnList.length) {
								if(this.type == 2) {
									this.hongbao = this.hongbao.concat(data.ReturnList);
								} else {
									this.coupon = this.coupon.concat(data.ReturnList);
								}
								this.pageIndex++;
							} else {
								if(this.pageIndex == 1) {
									pull && pull.disablePullupToRefresh();
									this.hongbao = this.coupon = [];
									this.isTips = true;
								}
								refresh = true;
							}
						} else {
							mui.toast(data.Desc);
						}
					}
					pull && pull.endPullupToRefresh(refresh);
				});
			},
			getAmount(value) {
				return value ? this.sui.rmoney(value) : '0.00';
			}
		},
		components: {
			tips
		}
	}
</script>

<style lang="scss">
	.coupon {
		padding-top: 44px;
		.menu-box {
			position: fixed !important;
			left: 0;
			top: 0;
			width: 100%;
			overflow: hidden;
			z-index: 100;
			background-color: #FFFFFF;
			@include border-1px(#E3E3EA);
			&.border-1px {
				&::after {
					transform: scaleY(0.4);
					-webkit-transform: scaleY(0.4);
				}
			}
			.menu {
				display: flex;
				li {
					position: relative;
					flex: 1;
					text-align: center;
					&::after {
						content: ' ';
						top: 12px;
						bottom: 12px;
						content: '';
						position: absolute;
						right: -1px;
						width: 1px;
						border-left: 1px solid #e5e5e5;
						@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio:1.5) {
							transform: scaleX(0.7);
							-webkit-transform: scaleX(0.7);
						}
						@media (-webkit-min-device-pixel-ratio:2),
						(min-device-pixel-ratio:2) {
							transform: scaleX(0.5);
							-webkit-transform: scaleX(0.5);
						}
						@media (-webkit-min-device-pixel-ratio:3),
						(min-device-pixel-ratio:3) {
							-webkit-transform: scaleX(.35);
							transform: scaleX(.35);
						}
					}
					&:last-child {
						&:after {
							display: none;
						}
					}
					.cen {
						height: 44px;
						line-height: 44px;
						span {
							margin-right: 10px;
							display: inline-block;
							vertical-align: middle;
							font-size: 16px;
							color: #2c2c2c;
						}
						i {
							color: #666666;
							font-size: 10px;
						}
					}
				}
			}
		}
		.list-box {
			padding-top: 10px;
			.list {
				padding: 0 10px;
				>li {
					margin-bottom: 10px;
					position: relative;
					display: flex;
					border-radius: 6px;
					font-size: 0;
					&.coupon-1 {
						padding: 0 15px;
						background: #FFFFFF;
						.icon-box {
							position: relative;
							width: 92px;
							flex: 0 0 92px;
							background: url(hb.png) no-repeat scroll 0/100%;
							.money {
								position: absolute;
								left: 14px;
								top: 69px;
								width: 62px;
								text-align: center;
								font-size: 16px;
								color: #ffffff;
								i {
									display: inline-block;
									margin-left: -7px;
								}
								span {
									display: inline-block;
									margin-left: -5px;
								}
							}
						}
						.content {
							flex: 1;
							margin: 15px 0 15px 23px;
							vertical-align: middle;
							.title {
								padding-bottom: 12px;
								@include border-1px(#E3E3EA);
								font-size: 14px;
								h2 {
									color: #1e82d2;
								}
							}
							.text {
								p {
									margin-top: 11px;
									font-size: 12px;
									color: #2c2c2c;
								}
							}
						}
						&.unusual {
							.icon-box {
								background: url(hb-gray.png) no-repeat scroll 0/100%;
							}
							.content {
								.title {
									h2 {
										color: #999999;
									}
								}
								.text {
									p {
										color: #999999;
									}
								}
							}
							>.iconfont {
								position: absolute;
								right: 15px;
								top: 50%;
								transform: translate(0, -50%);
								font-size: 70px;
								color: #999999;
							}
						}
						&.hb-normal {}
					}
					&.coupon-2 {
						background: #ff7070;
						&.unusual {
							background: #d9d9d9;
							>.iconfont {
								position: absolute;
								right: 15px;
								top: 50%;
								transform: translate(0, -50%);
								font-size: 70px;
								color: #999999;
							}
						}
						.interest {
							margin: 15px 0;
							position: relative;
							width: 115px;
							flex: 0 0 115px;
							text-align: center;
							border-right: 1px dashed #FFFFFF;
							p {
								margin: 15px 0;
								color: #FFFFFF;
								font-size: 30px;
								i {
									font-size: 14px;
								}
							}
							span {
								color: #FFFFFF;
								font-size: 14px;
							}
						}
						.content {
							flex: 1;
							margin: 15px 0 15px 25px;
							vertical-align: middle;
							h2 {
								font-weight: bold;
								font-size: 14px;
								color: #1e82d2;
								color: #ffffff;
							}
							.text {
								p {
									margin-top: 12px;
									color: #ffffff;
									font-size: 12px;
								}
							}
						}
						&:after,
						&:before {
							content: '';
							position: absolute;
							top: 50%;
							transform: translate(0, -50%);
							width: 19px;
							height: 19px;
							background: #f7f7f9;
							border-radius: 50%;
						}
						&:after {
							left: -9px;
						}
						&:before {
							right: -9px;
						}
					}
				}
			}
		}
	}
</style>