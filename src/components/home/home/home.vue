<template>
	<div class="home">
		<div class="mui-slider">
			<div class="mui-slider-group mui-slider-loop">
				<div class="mui-slider-item mui-slider-item-duplicate">
					<a href="#">
						<img :src="homeData.Banner[homeData.Banner.length-1]?homeData.Banner[homeData.Banner.length-1].ImageUrl:'static/img/banner.png'" />
					</a>
				</div>
				<div class="mui-slider-item" v-for="item in homeData.Banner">
					<a href="#" @tap="link(item)">
						<img :src="item.ImageUrl || 'static/img/banner.png'" />
					</a>
				</div>
				<div class="mui-slider-item mui-slider-item-duplicate">
					<a href="#">
						<img :src="homeData.Banner[0]?homeData.Banner[0].ImageUrl:'static/img/banner.png'" />
					</a>
				</div>
			</div>
			<div class="mui-slider-indicator" v-show="sliderData.length">
				<div class="mui-indicator" :class="{'mui-active':i==0}" v-for="(item,i) in homeData.Banner"></div>
			</div>
		</div>
		<router-link :to="{name:'info'}" tag="div" class="info-box border-1px" v-if="show">
			<div class="mui-table-view-cell">
				<i class="iconfont icon-lingdang"></i>
				<router-link v-if="homeData.News" :to="{name:'infoDetail',query:{id:homeData.News.Id}}" class="text" tag="span">{{homeData.News.Title}}</router-link>
				<router-link :to="{name:'info'}" tag="div" class="right">
					<span>更多</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</router-link>
			</div>
		</router-link>
		<div class="message-box" v-if="show">
			<router-link :to="{name:'security'}" tag="div" class="item mui-table-view-cell">
				<i class="iconfont icon-anquan"></i>
				<p>安全保障</p>
			</router-link>
			<router-link :to="{name:'information'}" tag="div" class="item mui-table-view-cell">
				<i class="iconfont icon-yunyingbaobiao"></i>
				<p>信息披露</p>
			</router-link>
			<router-link :to="{name:'manage'}" tag="div" class="item mui-table-view-cell">
				<i class="iconfont icon-iconfontpaixingbang"></i>
				<p>运营数据</p>
			</router-link>
			<div class="item mui-table-view-cell" @click="toPayCalendar">
				<i class="iconfont icon-rili"></i>
				<p>回款日历</p>
			</div>
		</div>
		<div class="beginner-box" v-if="show">
			<div class="year">
				<h2>{{homeData.NoviceLoan.Rate}}<i>%</i></h2>
				<p>年利率</p>
			</div>
			<div class="item-box">
				<div class="item">
					<h3>{{homeData.NoviceLoan.LoanTerm}}</h3>
					<p>出借期限</p>
				</div>
				<div class="item">
					<h3>{{homeData.NoviceLoan.Amount}}</h3>
					<p>体验金额</p>
				</div>
				<div class="item">
					<h3>{{homeData.NoviceLoan.Profit}}</h3>
					<p>预计收益</p>
				</div>
			</div>
			<div class="btn-box">
				<router-link :to="{name:'beginner',query:{
						rate:homeData.NoviceLoan.Rate,
						term:homeData.NoviceLoan.LoanTerm,
						profit:homeData.NoviceLoan.Profit
						}}" tag="div">
					<button class="mui-btn mui-btn-primary mui-btn-block">立即领取</button>
				</router-link>
			</div>
			<div class="label">新手专享</div>
		</div>
		<div class="tender-box" v-if="show">
			<div class="tender">
				<div class="mui-table-view-cell" @click="toDetail">
					<div class="title-box border-1px">
						<h2>{{loan.Name}}</h2>
						<div class="btn-box">
							<button class="mui-btn mui-btn-warning mui-btn-outlined">{{loan.RiskLevel}}</button>
							<button class="mui-btn mui-btn-warning mui-btn-outlined">{{refundWays(loan.RefundWays)}}</button>
							<button class="mui-btn" :class="{'mui-btn-grey':loan.State!=6,'mui-btn-warning':loan.State==6}">{{statusDesc(loan.State)}}</button>
							<!-- 6-可加入 7-撤标中 8-流标 9-已结束 10-放款中 11-还款中 12-还款完成-->
						</div>
					</div>
					<div class="main">
						<!--class='gray'-->
						<div class="item">
							<h3 v-html="getLoanRate(loan.Rate,loan.RaiseRate)">{{homeData.Loan.MinRate}}~<b class='big'>{{homeData.Loan.MaxRate}}</b>%</h3>
							<span>年利率</span>
						</div>
						<div class="item">
							<p>{{getTerm(loan.LoanTerm,loan.LoanTermUnit)}}</p>
							<span>借款期限</span>
						</div>
						<div class="item">
							<p>{{loan.SurplusAmount}}</p>
							<span>可投金额</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sliderData: [1, 2],
				loading: null,
				show: false,
				homeData: {
					Banner: [{}],
					NoviceLoan: {},
					News: {},
					Loan: {}
				},
				loan: {
					"Rate": 0,
					"RaiseRate": 0,
					"LoanTerm": 1,
					"LoanTermUnit": 2,
					"SurplusAmount": 0,
					"RefundWays": 2,
					"RiskLevel": "AA",
					"State": 6,
					"Name": ''
				},
				riskLevel: 0
			}
		},
		created: function() {
			this.loading = this.sui.wait(true, '正在加载');
			this.sui.request("Home/FirstPage", {
				updateTime: "",
				channel: 2
			}, "get", (data) => {
				if(data) {
					if(data.IsPass) {
						this.homeData = JSON.parse(JSON.stringify(data.ReturnObject));
						this.homeData.NoviceLoan.Rate = this.homeData.NoviceLoan.Rate.toFixed(1);
						this.homeData.NoviceLoan.LoanTerm = this.getTerm(this.homeData.NoviceLoan.LoanTerm, this.homeData.NoviceLoan.LoanTermUnit);
						this.homeData.NoviceLoan.Amount = this.sui.rmoney(this.homeData.NoviceLoan.Amount);
						this.homeData.NoviceLoan.Profit = this.sui.rmoney(this.homeData.NoviceLoan.Profit);
						this.loan = data.ReturnObject.Loan;
						this.riskLevel = data.ReturnObject.RiskLevel;
						this.$nextTick(() => {
							mui(".mui-slider").slider({
								interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
							});
						})
					} else {
						mui.toast(data.Desc);
					}
				}
				this.loading = this.sui.closewait(this.loading);
				this.show = true;
			})
		},
		mounted: function() {
			this.$nextTick(() => {
				mui(".mui-slider").slider();
			})
		},
		beforeDestroy: function() {
			clearInterval(this.inTime);
			this.loading = this.sui.closewait(this.loading);
		},
		methods: {
			//新手标详情
			toDetail() {
				if(this.sui.isLogin() && this.riskLevel == 0) {
					this.$router.push({
						name: "riskTest"
					})
				} else {
					this.$router.push({
						name: "investDetail",
						query: {
							id: this.loan.Id,
							type: this.loan.LoanType,
							title: this.loan.Name
						}
					})
				}
			},
			//banner跳转
			link(data) {
				var para = JSON.parse(data.ParamJson);
				if(data.ImageType == 1) {
					return;
				} else if(data.ImageType == 2) {
					//借款类型 Type：1-房易融 2-月账户 3-年账户
					this.$router.push({
						name: "investDetail",
						query: {
							id: para.BusinessId,
							type: para.Type
						}
					})
				} else if(data.ImageType == 3) {
					this.$router.push({
						name: "infoDetail",
						query: {
							id: para.BusinessId
						}
					})
				} else if(data.ImageType == 4 || data.ImageType == 5) {
					window.location.href = data.ImagePageUrl;
				}
			},
			getLoanRate(rate, raise) {
				return '<b class="big">'+(parseFloat(rate)+parseFloat(raise)).toFixed(1)+'</b>%';
//				var raiseRate = Math.floor(raise);
//				if(raiseRate <= 0) {
//					return '<b class="big">' + rate + '</b><i>%</i>';
//				} else {
//					return '<b class="big">' + rate + '</b>+' + raise + '<i>%</i>';
//				}
			},
			toPayCalendar() {
				if(this.sui.isLogin()) {
					this.$router.push({
						name: "payCalendar"
					})
				} else {
					this.$router.push({
						name: "login",
						query: {
							redirect: "home"
						}
					})
				}

			},
			term(min, unit, max) {
				return this.getTerm(min, unit, max)
			},
			getTerm(min, unit, max) {
				var result = "";
				//1-天 2-月 3-年 4-小时
				var termUnit = "天";
				switch(unit) {
					case 2:
						termUnit = "个月";
						break;
					case 3:
						termUnit = "年";
						break;
					case 4:
						termUnit = "小时";
						break;
					default:
						break;
				}
				if(!max) {
					result = min + termUnit;
				} else {
					if(min == max)
						result = min + termUnit;
					else
						result = min + "~" + max + termUnit;
				}
				return result;
			},
			amount(val) {
				return this.sui.rmoney(val);
			},
			refundWays(value) {
				//还款方式：1-到期还本付息 2-等额本息 3-先息后本
				return ["到期还本付息", "等额本息", "先息后本"][value - 1];
			},
			statusDesc(status) {
				//状态： 6-可加入 7-撤标中 8-流标 9-已结束 10-放款中 11-还款中 12-还款完成
				return ["可加入", "撤标中", "借款失败", "已结束", "已结束", "还款中", "已结清"][status - 6];
			}
		}
	}
</script>

<style lang="scss">
	.home {
		/*-webkit-user-select: none;
		-webkit-touch-callout: none;*/
		width: 100%;
		padding-bottom: 50px;
		background: #f7f7f9;
		overflow: auto;
		/*mui-slider公共start*/
		.mui-slider-indicator {
			.mui-indicator {
				box-shadow: none !important;
				background: #e5e5e5;
			}
			.mui-active {
				background-color: #1e82d2 !important;
				box-shadow: none !important;
			}
		}
		/*mui-slider公共end*/
		.info-box {
			font-size: 0;
			background: #FFFFFF;
			@include border-1px(#E3E3EA);
			.mui-table-view-cell {
				display: flex;
				height: 40px;
				line-height: 40px;
				padding: 0 80px 0 15px;
				background: #FFFFFF !important;
				.iconfont {
					display: inline-block;
					vertical-align: middle;
					margin-right: 10px;
					font-size: 20px;
					color: #999999;
				}
				.text {
					flex: 1;
					display: inline-block;
					vertical-align: middle;
					font-size: 12px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				.right {
					position: absolute;
					top: 0;
					right: 18px;
					padding-left: 15px;
					span {
						display: inline-block;
						vertical-align: middle;
						font-size: 12px;
						color: #999999;
					}
					.mui-icon {
						display: inline-block;
						vertical-align: middle;
						color: #999999;
					}
				}
			}
		}
		.message-box {
			display: flex;
			margin-bottom: 10px;
			background: #fff;
			.item {
				padding: 18px 0 11px;
				flex: 1;
				text-align: center;
				.iconfont {
					font-size: 24px;
					color: #1e82d2;
				}
				p {
					font-size: 14px;
					margin-top: 14px;
					color: #2c2c2c;
				}
			}
			.mui-table-view-cell {
				&:after {
					display: none;
				}
			}
		}
		.beginner-box {
			position: relative;
			margin: 0 10px 10px;
			background-color: #ffffff;
			border-radius: 6px;
			p {
				margin-top: 14px;
				color: #999999;
				font-size: 14px;
				text-align: center;
			}
			.year {
				padding: 24px 0;
				text-align: center;
				h2 {
					font-size: 30px;
					color: #ff6c00;
					i {
						font-size: 14px;
					}
				}
			}
			.item-box {
				display: flex;
				.item {
					flex: 1;
					text-align: center;
					h3 {
						color: #2c2c2c;
						font-size: 14px;
					}
				}
			}
			.btn-box {
				padding: 24px 30px;
			}
			.label {
				position: absolute;
				top: 0;
				left: 15px;
				width: 80px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				color: #FFFFFF;
				font-size: 14px;
				background-color: #ffa200;
				border-radius: 0px 0px 10px 10px;
			}
		}
		.tender-box {
			padding: 0 10px 10px;
			@import "src/common/scss/tender.scss";
		}
	}
</style>