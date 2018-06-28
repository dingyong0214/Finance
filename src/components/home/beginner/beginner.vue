<template>
	<div class="beginner">
		<div class="background">
			<div class="invest-header">
				<div class="interest-box">
					<p class="interest">{{this.$route.query.rate}}<i>%</i></p>
					<span>年利率</span>
				</div>
				<ul class="text-box">
					<li class="border-1px">
						<p>{{this.$route.query.term}}</p>
						<p>出借期限</p>
					</li>
					<li class="border-1px">
						<p>{{this.$route.query.profit}}</p>
						<p>预计收益</p>
					</li>
				</ul>
			</div>
			<img src="./user-bg.png" width="100%" />
			<div class="wave">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="150">
					<g fill="rgba(255,255,255,0.03)">
						<path d="M 0 70 Q 75 39, 150 70 T 300 70 T 450 70 T 600 70 T 750 70  T 900 70  T 1050 70 T 1200 70 T 1350 70 V 150 H 0 V 0"></path>
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

		<div class="main" v-show="1">
			<div class="text-box">
				<p>本项目为虚拟标的，提供体验本金28,888.00元，每次所获利息直接划转至新手用户的汇付账号，专为本平台出借新手熟悉平台投标流程之用。</p>
				<p>体验本金28,888.00元在用户完成注册并实名认证后即可送出，并立即生效，一人一次机会使用体验本金，获取额外收益。</p>
				<p>新手体验标的项目借款期限为1天，1天后，用户获得体验本金出借的收益。若需提现收益，用户充值出借后方可进行取现。</p>
				<p>*每个真实项目都会充分披露借款人信息（身份证、房产证、委托书、公证书、银行审批书、担保信息），包括但不仅限于借款用途、征信、诉讼等信息。帮助出借人筛选适合自己的出借项目；并附上本平台风险管理的风控措施、关于借款人信用记录、还款来源等情况。"</p>
			</div>
		</div>
		<div class="btn-box">
			<button class="mui-btn mui-btn-primary mui-btn-block" :class="{'mui-btn-grey':notTender}" @tap="sendTender">出借</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				notTender: false
			}
		},
		created: function() {
			if(this.sui.isLogin()) {
				this.sui.request('Invest/IsTender', {}, "get", (data) => {
					if(data) {
						if(data.IsPass && data.ReturnObject) {
							this.notTender = true;
						}
					}
				}, true);
			}
		},
		methods: {
			sendTender() {
				if(!this.sui.isLogin()) {
					this.$router.push({
						name: "login"
					})
					return;
				}
				var w = this.sui.wait(true, '请稍候...');
				this.sui.request('Invest/SendNoviceTender', {
					channel: 2
				}, "get", (data) => {
					w = this.sui.closewait(w);
					if(data) {
						if(data.IsPass) {
							mui.toast('您已出借成功');
							this.notTender = true;
						} else {
							mui.toast(data.Desc);
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.beginner {
		width: 100%;
		background: #FFFFFF;
		padding-bottom: 70px;
		.invest-header {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.interest-box {
				text-align: center;
				margin-bottom: 23px;
				.interest {
					margin-bottom: 14px;
					color: #FFFFFF;
					font-size: 30px;
					i {
						font-size: 18px;
					}
				}
				span {
					color: #FFFFFF;
					font-size: 14px;
				}
				.schedule-box {
					margin-top: 33px;
					position: relative;
					width: 100%;
					height: 4px;
					background: rgba(255, 255, 255, 0.3);
					.schedule {
						position: absolute;
						left: 0;
						top: 0;
						height: 4px;
						border-radius: 2px;
						background: #FFFFFF;
					}
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
		.main {
			.text-box {
				padding: 20px 20px 0;
				p {
					padding-bottom: 20px;
					line-height: 20px;
					font-size: 14px;
					color: #2c2c2c;
				}
			}
		}
		.btn-box {
			padding: 0 15px;
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			background: #FFFFFF;
			-webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .85);
			box-shadow: 0 0 1px rgba(0, 0, 0, .85);
			.mui-btn {
				margin-top: 10px;
			}
		}
	}
</style>