<template>
	<div class="ace" v-show="show">
		<div class="header">
			<div class="avatar-box">
				<img :src="imgArr[model.Level-1]" width="100%" />
			</div>
			<div class="item-box">
				<div class="item">
					<p>{{model.InvestNum}}</p>
					<span>已出借人数</span>
				</div>
				<div class="item">
					<p>{{model.TotalNum}}</p>
					<span>总邀请人数</span>
				</div>
				<div class="item">
					<p>{{model.Award}}</p>
					<span>已入账奖励</span>
				</div>
			</div>
			<router-link :to="{name:'aceDesc'}" class="iconfont icon-wenhao" tag="i"></router-link>
		</div>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell default-bg">
				<span class="text">待领取奖励：<span class="reward">{{getAmount(model.UnclaimedAward)}}</span></span>
				<span class="right" v-show="model.UnclaimedAward>0" @tap="receive">立即领取</span>
			</li>
			<li class="mui-table-view-cell">
				<router-link :to="{name:'reward'}" tag="div">
					<span class="text">我的奖励</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</router-link>
			</li>
			<li class="mui-table-view-cell">
				<router-link :to="{name:'invite'}" tag="div">
					<span class="text">邀请明细</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</router-link>
			</li>
		</ul>
		<!--<div class="btn-box">
			<button class="mui-btn mui-btn-primary mui-btn-block">邀请好友</button>
		</div>-->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				model: {},
				loading: null,
				show: false
			}
		},
		methods: {
			receive() {
				this.loading = this.sui.wait(true, '请稍候');
				this.sui.request('Account/ReceiveRewards', {}, 'post', (data) => {
					if(this.loading) {
						this.loading = this.sui.closewait(this.loading);
					}
					if(data) {
						if(data.IsPass) {
							mui.toast('领取成功');
							this.getStart();
						} else {
							mui.toast(data.Desc)
						}
					}
				})
			},
			getAmount(value) {
				return value ? sui.rmoney(value) : '0.00';
			},
			getStart() {
				this.sui.request('Account/StarSummary', {}, "get", (data) => {
					this.loading = this.sui.closewait(this.loading);
					this.show = true;
					if(data) {
						if(data.IsPass) {
							this.model = data.ReturnObject;
						} else {
							mui.toast(data.Desc)
						}
					}
				})
			}
		},
		created: function() {
			this.loading = this.sui.wait(true, '正在加载');
			this.imgArr = ['static/img/1.png', 'static/img/2.png', 'static/img/3.png', 'static/img/4.png', 'static/img/5.png']
			this.getStart();
		},
		beforeDestroy: function() {
			this.loading = this.sui.closewait(this.loading);
		}
	}
</script>

<style lang="scss">
	.ace {
		.header {
			position: relative;
			margin-bottom: 10px;
			padding: 24px 0;
			background: #ffffff;
			.avatar-box {
				width: 80px;
				overflow: hidden;
				margin: 0 auto 24px;
			}
			.item-box {
				display: flex;
				.item {
					flex: 1;
					text-align: center;
					p {
						margin-bottom: 15px;
						font-size: 15px;
						color: #2c2c2c;
					}
					span {
						font-size: 12px;
						color: #999999;
					}
				}
			}
			.iconfont {
				padding: 10px;
				position: absolute;
				top: 5px;
				right: 5px;
				font-size: 20px;
			}
		}
		.mui-table-view {
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
				&.default-bg {
					background: #FFFFFF !important;
				}
				>div {
					height: 100%;
					overflow: hidden;
				}
				.text {
					display: inline-block;
					vertical-align: top;
					font-size: 16px;
					line-height: 45px;
				}
				.mui-icon,
				.right {
					position: absolute;
					line-height: 44px;
					right: 18px;
					color: #999999;
				}
				.right {
					color: #ff6c00;
					font-size: 15px;
					&:active {
						opacity: 0.7;
					}
				}
				.reward {
					color: #1e82d2;
				}
			}
		}
		.btn-box {
			margin-top: 30px;
			padding: 0 15px;
		}
	}
</style>