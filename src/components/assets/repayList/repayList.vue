<template>
	<div class="repayList">

		<div class="background">
			<div class="repay-header" @tap="link">
				<div class="title-box">
					<p class="title">{{model.Name ||'加载中...'}}</p>
					<span>项目名称</span>
				</div>
				<ul class="text-box">
					<li>
						<p>{{model.Rate||'0.0'}}%</p>
						<p>年利率</p>
					</li>
					<li>
						<p>{{totalInterest}}</p>
						<p>出借奖励</p>
					</li>
				</ul>
				<a class="icon-box" @tap.stop="xieyi">
					<i class="iconfont icon-xiangguanxieyi"></i>
				</a>
			</div>
			<img src="./user-bg.png" width="100%" />
			<div class="wave">
				<svg xmlns="http://www.w3.org/1500/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="150">
					<g fill="rgba(255,255,255,0.03)">
						<path d="M 0 70 Q 75 39, 150 70 T 300 70 T 450 70 T 600 70 T 750 70  T 900 70  T 1050 70 T 1150 70 T 1350 70 V 150 H 0 V 0"></path>
						<animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-300" dur="8s" repeatCount="indefinite"></animateTransform>
					</g>
					<g fill="rgba(255,255,255,0.045)">
						<path d="M 0 70 Q 87.5 47, 175 70 T 350 70 T 525 70 T 700 70 T 875 70 T 1050 70 T 1225 70 T 1400 70  T 1575 70  V 150 H 0 V 0"></path>
						<animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-350" dur="16s" repeatCount="indefinite"></animateTransform>
					</g>
					<g fill="rgba(255,255,255,0.057)" transform="translate(-903.868 0)">
						<path d="M 0 70 Q 135 36, 270 70 T 540 70 T 810 70 T 1080 70 T 1350 70 T 1620 70  V 150 H 0 V 0" transform="translate(-38.232284367796474, 0)"></path>
						<animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-540" dur="10s" repeatCount="indefinite"></animateTransform>
					</g>
				</svg>
			</div>
		</div>

		<div class="list-box">
			<ul>
				<li :class="{normal:item.State==1}" v-for="item in model.ReceiptPlan">
					<h2>第{{item.CurrentPeriod}}期</h2>
					<div>
						{{item.State==3?"已收":"待收"}}总额：<span>{{getAmount(item.CapitalInterest)}}</span>
					</div>
					<div>本金：<span>{{getAmount(item.BenJin)}}</span></div>
					<div>还款日期：<span>{{getDate(item.ReceiptDate)}}</span></div>
					<div>状态：<span>{{getState(item.State)}}</span></div>
				</li>
				<!--<li :class="{normal:1}">
					<h2>第1期</h2>
					<div>待收总额：<span>20000.000</span></div>
					<div>本金：<span>20000.000</span></div>
					<div>还款日期：<span>2017-09-24</span></div>
					<div>状态：<span>已还款</span></div>
				</li>-->
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				model: {
					ReceiptPlan: []
				}
			}
		},
		created: function() {
			this.sui.request("Account/LoanReceiptPlan", {
				loanId: this.$route.query.loanId,
				tenderDetailId: this.$route.query.detailId
			}, "get", (data) => {
				if(data) {
					if(data.IsPass) {
						this.model = data.ReturnObject;
					} else {
						mui.toast(data.Desc);
					}
				}
			})
		},
		methods: {
			link() {
				this.$router.push({
					name: "investDetail",
					query: {
						id: this.$route.query.id,
						type: this.$route.query.type,
						title: this.model.Name
					}
				})
			},
			//跳转到协议页面
			xieyi() {
				this.$router.push({
					name: 'xieyi',
					query: {
						loanId: this.$route.query.loanId,
						detailId: this.$route.query.detailId
					}
				})
			},
			getAmount(value) {
				return this.sui.rmoney(value);
			},
			getDate(date) {
				return this.sui.formatDate('y-m-d', date);
			},
			getState(value) {
				//1-待回款 2-还款中 3-已回款 4-还款失败 5-已转让 6-待到期转让
				return ["未还款", "还款中", "已还款", "还款失败", "已转让", "待到期转让"][value - 1];
			}
		},
		computed: {
			totalInterest: function() {
				//总出借奖励
				var total = 0;
				for(var i = 0, item; item = this.model.ReceiptPlan[i++];) {
					//1-待收 2-还款中 3-已收 4-还款失败 5-已转让
					if(item.State != 5 && item.State != 6) {
						total += (item.State == 1 ? item.RaiseInterest : item.FactRaiseInterest);
					}
				}
				return this.sui.rmoney(total);
			}
		}
	}
</script>

<style lang="scss">
	.repayList {
		background: #f7f7f9;
		.repay-header {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 100;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.title-box {
				margin-bottom: 35px;
				text-align: center;
				.title {
					margin-bottom: 14px;
					font-size: 20px;
					color: #FFFFFF;
				}
				span {
					color: #FFFFFF;
					font-size: 14px;
				}
			}
			.text-box {
				display: flex;
				li {
					position: relative;
					flex: 1;
					text-align: center;
					p {
						color: #FFFFFF;
						font-size: 14px;
						&:first-child {
							margin-bottom: 14px;
						}
					}
					&:after {
						content: '';
						position: absolute;
						right: -1px;
						top: 3px;
						bottom: 3px;
						width: 1px;
						border-left: 1px solid #FFFFFF;
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
						@include border-none()
					}
				}
			}
			.icon-box {
				padding: 10px;
				position: absolute;
				top: 10px;
				right: 5px;
				.iconfont {
					font-size: 18px;
					color: #ffffff;
				}
			}
		}
		.background {
			position: relative;
			width: 100%;
			overflow: hidden;
			font-size: 0;
			.wave {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
			}
		}
		.list-box {
			ul {
				padding: 15px;
				li {
					padding: 15px 15px 0;
					margin-bottom: 15px;
					background: #FFFFFF;
					font-size: 0;
					border-radius: 6px;
					h2 {
						padding-bottom: 15px;
						font-size: 16px;
						color: #999999;
					}
					>div {
						margin-bottom: 15px;
						display: inline-block;
						vertical-align: top;
						width: 50%;
						font-size: 12px;
						color: #999999;
					}
					&.normal {
						h2 {
							color: #2c2c2c;
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