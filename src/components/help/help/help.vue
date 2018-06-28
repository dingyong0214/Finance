<template>
	<div class="help">
		<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
			<div class="mui-scroll">
				<ul class="item-box">
					<li class="item" @tap="switching(0)">
						<div class="img-box">
							<img src="./help-1.png" />
						</div>
						<p class="title">新手指南</p>
					</li>
					<li class="item" @tap="switching(1)">
						<div class="img-box">
							<img src="./help-2.png" />
						</div>
						<p class="title">账户管理</p>
					</li>
					<li class="item" @tap="switching(2)">
						<div class="img-box">
							<img src="./help-3.png" />
						</div>
						<p class="title">出借说明</p>
					</li>
					<li class="item" @tap="switching(5)">
						<div class="img-box">
							<img src="./help-6.png" />
						</div>
						<p class="title">还款说明</p>
					</li>
					<li class="item" @tap="switching(3)">
						<div class="img-box">
							<img src="./help-4.png" />
						</div>
						<p class="title">会员中心</p>
					</li>
					<li class="item" @tap="switching(4)">
						<div class="img-box">
							<img src="./help-5.png" />
						</div>
						<p class="title">其他问题</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="help-tab" v-show="currentIndex==0">
			<h2 class="title">新手指南</h2>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" @tap="link('safety')">
					<span class="text">关于前海领投</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="href('security')">
					<span class="text">安全保障</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="href('information',2)">
					<span class="text">产品介绍</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="href('information',2,'fee')">
					<span class="text">资费标准</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
			</ul>
		</div>
		<div class="help-tab" v-show="currentIndex==1">
			<h2 class="title">账户管理</h2>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" @click="link('reg')">
					<span class="text">注册</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="link('bank')">
					<span class="text">存管开户</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell mui-hidden" @click="link('real')">
					<span class="text">实名认证</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell mui-hidden" @click="link('funds')">
					<span class="text">资金管理账户</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="link('recharge')">
					<span class="text">绑卡充值</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="link('withdraw')">
					<span class="text">提现</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="link('passWord')">
					<span class="text">密码问题</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell mui-hidden" @click="link('safetyCode')">
					<span class="text">安全码</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="link('verification')">
					<span class="text">验证码</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
			</ul>
		</div>
		<div class="help-tab" v-show="currentIndex==2">
			<h2 class="title">出借说明</h2>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" @click="link('invest')">
					<span class="text">出借与回款</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<!--<li class="mui-table-view-cell" @click="link('acc')">
					<span class="text">年月账户</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>-->
				<li class="mui-table-view-cell" @click="link('transfer')">
					<span class="text">债权转让</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<!--<li class="mui-table-view-cell" @click="link('autoTender')">
					<span class="text">自动投标</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>-->
				<li class="mui-table-view-cell" @click="link('risk')">
					<span class="text">风险评估</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="link('riskLevel')">
					<span class="text">项目风险级别</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
			</ul>
		</div>
		<div class="help-tab" v-show="currentIndex==5">
			<h2 class="title">还款说明</h2>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" @click="link('rNormal')">
					<span class="text">正常还款</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="link('rOverdue')">
					<span class="text">逾期还款</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
			</ul>
		</div>
		<div class="help-tab" v-show="currentIndex==3">
			<h2 class="title">会员中心</h2>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" @click="link('coupon')">
					<span class="text">优惠券</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="link('invite')">
					<span class="text">邀请有奖</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
			</ul>
		</div>
		<div class="help-tab" v-show="currentIndex==4">
			<h2 class="title">其他问题</h2>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" @click="link('noun')">
					<span class="text">名词解释</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<router-link :to="{name:'riskNote'}" class="mui-table-view-cell" tag="li">
					<span class="text">风险揭示</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0
			}
		},
		mounted() {
			this.$nextTick(() => {
				mui('.mui-scroll-wrapper').scroll();
			})
		},
		methods: {
			switching(i) {
				this.currentIndex = i;
			},
			link(type) {
				this.$router.push({
					name: "helpList",
					query: {
						type: type
					}
				})
			},
			href(url, type, intoView) {
				this.$router.push({
					name: url,
					query: {
						type: type,
						intoView: intoView
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.help {
		.mui-scroll-wrapper {
			background: #FFFFFF;
		}
		.mui-segmented-control.mui-scroll-wrapper {
			height: 116px;
		}
		.item-box {
			padding: 20px 12px;
			display: flex;
			justify-content: space-around;
			width: 100%;
		}
		.item {
			margin-right: 33px;
			text-align: center;
			&:last-child {
				margin-right: 0;
			}
			.img-box {
				margin: 0 auto;
				width: 50px;
				height: 50px;
				border-radius: 50%;
				box-shadow: 0px 0px 10px 0px rgba(17, 187, 255, 0.1);
				img {
					width: 100%;
				}
			}
			.title {
				margin-top: 10px;
				color: #232323;
				font-size: 14px;
			}
		}
		.help-tab {
			margin-top: 25px;
			.title {
				margin-bottom: 15px;
				padding: 0 15px;
				color: #1e82d2;
				font-size: 15px;
				&:before {
					content: '';
					display: inline-block;
					vertical-align: top;
					margin-right: 10px;
					width: 5px;
					height: 15px;
					background-color: #1e82d2;
				}
			}
			.mui-table-view-cell {
				position: relative;
				padding: 0 15px;
				height: 44px;
				line-height: 44px;
				font-size: 0;
				overflow: initial;
				&:last-child {
					@include border-none();
				}
				.text {
					display: inline-block;
					vertical-align: top;
					font-size: 15px;
					line-height: 45px;
				}
				.mui-icon {
					position: absolute;
					line-height: 44px;
					right: 18px;
					color: #999999;
				}
			}
		}
	}
</style>