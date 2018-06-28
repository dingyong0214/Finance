<template>
	<div class="myData">
		<div class="head-box">
			<div class="mui-table-view-cell default-bg">
				<div class="avatar-box">
					<img :src="model.Photo || 'static/img/my-logo.png'" width="100%" />
				</div>
				<span>{{model.UserName}}</span>
			</div>
		</div>
		<ul class="mui-table-view">
			<!--<li class="mui-table-view-cell">
				<router-link :to="{name:'share'}" tag="div">
					<span class="text">我的二维码</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</router-link>
			</li>-->
			<li class="mui-table-view-cell" @tap="realAuth">
				<span class="text">银行存管开户</span>
				<span class="realAuth" v-if="!loading">{{model.IsRealAuth?'已开户':'未开户'}}</span>
				<i class="mui-icon mui-icon-arrowright"></i>
			</li>
		</ul>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell">
				<router-link :to="{name:'bankCard'}" tag="div">
					<span class="text">银行卡管理</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</router-link>
			</li>
			<li class="mui-table-view-cell">
				<router-link :to="{name:'address'}" tag="div">
					<span class="text">地址管理</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</router-link>
			</li>
		</ul>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell">
				<router-link :to="{name:'riskTest'}" tag="div">
					<span class="text">风险测评</span>
					<b class="result">{{model.RiskRating}}</b>
					<i class="mui-icon mui-icon-arrowright"></i>
				</router-link>
			</li>
		</ul>
		<!--<div id="huifu" v-html="huifu"></div>-->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: null,
				html: "",
				//huifu: "",
				model: {}
			}
		},
		created() {
			this.loading = this.sui.wait(true, '正在加载');
			this.sui.request("User/UserCenter", {}, "get", (data) => {
				this.loading = this.sui.closewait(this.loading);
				if(data) {
					if(data.IsPass) {
						this.model = data.ReturnObject;
					} else {
						mui.toast(data.Desc);
					}
				}
			})
		},
		beforeDestroy() {
			this.loading = this.sui.closewait(this.loading);
		},
		methods: {
			realAuth() {
				//this.loading = this.sui.wait(true, '正在加载');
				if(!this.model.IsRealAuth) {
					this.$router.push({
						name: "openingAccount"
				   })
					/*
					this.sui.request('User/RealAuth', {
						channel: 2
					}, 'get', (data) => {
						this.loading = this.sui.closewait(this.loading);
						if(data) {
							if(data.IsPass) {
								this.huifu = data.ReturnObject;
								this.$nextTick(() => {
									document.getElementById('HuiFuForm').submit();
								})
							}
						}
					})
					*/
				} else {
					mui.toast('您已开通银行存管账户');
					/*
					this.sui.request('User/LoginHuiFu', {
						channel: 2
					}, 'get', (data) => {
						this.loading = this.sui.closewait(this.loading);
						if(data) {
							if(data.IsPass) {
								this.huifu = data.ReturnObject;
								this.$nextTick(() => {
									document.getElementById('HuiFuForm').submit();
								})
							}
						}
					})
					*/
				}
			}
		}
	}
</script>

<style lang="scss">
	.myData {
		.head-box {
			position: relative;
			background: #FFFFFF;
			.mui-table-view-cell {
				padding: 19px 15px;
				&.default-bg {
					background: #FFFFFF !important;
				}
				.avatar-box {
					display: inline-block;
					vertical-align: middle;
					margin-right: 20px;
					width: 64px;
					height: 64px;
					border: solid 1px #d9d9d9;
					border-radius: 50%;
					overflow: hidden;
				}
				>span {
					display: inline-block;
					vertical-align: middle;
					color: #2c2c2c;
					font-size: 18px;
				}
				.mui-icon {
					position: absolute;
					right: 22px;
					top: 50%;
					transform: translate(0, -50%);
					color: #999999;
				}
			}
		}
		.mui-table-view {
			margin-top: 10px;
			.mui-table-view-cell {
				position: relative;
				padding: 0 15px;
				height: 44px;
				line-height: 44px;
				font-size: 0;
				.text {
					font-size: 16px;
				}
				.result,
				.realAuth {
					position: absolute;
					line-height: 44px;
					right: 50px;
					color: #999999;
					font-size: 14px;
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