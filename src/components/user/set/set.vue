<template>
	<div class="set">
		<div class="list-box">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<router-link :to="{name:'myData'}" tag="div">
						<span class="text">个人资料</span>
						<i class="mui-icon mui-icon-arrowright"></i>
					</router-link>
				</li>
				<li class="mui-table-view-cell">
					<router-link :to="{name:'setLoginPassword'}" tag="div">
						<span class="text">登录密码</span>
						<i class="mui-icon mui-icon-arrowright"></i>
					</router-link>
				</li>
				<li class="mui-table-view-cell">
					<div @tap="setTradePwd">
						<span class="text">交易密码</span>
						<b class="safety">银行存管交易密码</b>
						<i class="mui-icon mui-icon-arrowright"></i>
					</div>
				</li>
				<li class="mui-table-view-cell">
					<router-link :to="{name:'businessAuth'}" tag="div">
						<span class="text">业务授权</span>
						<b class="safety">授权投标、还款</b>
						<i class="mui-icon mui-icon-arrowright"></i>
					</router-link>
				</li>
				<li class="mui-table-view-cell">
					<router-link :to="{name:'setTel'}" tag="div">
						<span class="text">更换手机号</span>
						<i class="mui-icon mui-icon-arrowright"></i>
					</router-link>
				</li>
			</ul>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<router-link :to="{name:'pushSms'}" tag="div">
						<span class="text">短信通知</span>
						<i class="mui-icon mui-icon-arrowright"></i>
						<!--<div id="switch" class="mui-switch mui-switch-mini">
						<div class="mui-switch-handle"></div>
					</div>-->
					</router-link>
				</li>
			</ul>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" style="text-align:center" @tap="exitLogin">
					<!--<router-link :to="{name:'setTel'}" tag="div">-->
					<span class="text">退出登录</span>
					<!--</router-link>-->
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				check: true,
				isSetPwd:false
			}
		},
		mounted: function() {
			this.$nextTick(() => {
				mui('.mui-switch')['switch']();
			})
		},
		methods: {
			clearCookie() {
				var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
				if(keys) {
					for(var i = keys.length; i--;)
						document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
				}
			},
			setTradePwd(){
				//:to="{name:isSetPwd?'tradePwd':'setPayPwd'}"
				if(this.isSetPwd){
					this.$router.push({
							name: "tradePwd"
						})
				}else{
					this.loading = this.sui.wait(true, '请稍候...');
					this.sui.request('User/SetPayPassword', {tradeType:1}, "get", (data) => {
						this.loading = this.sui.closewait(this.loading);
						if(data) {
							var IsPass = data.IsPass;
							if(IsPass) {
								 location.href=data.ReturnObject;
							} else {
								mui.toast(data.Desc);
							}
						}
					})
				}
			},
			//退出登录
			exitLogin() {
				mui.confirm('退出后将清除您的登录信息,\n确认退出吗?', ' ', ['取消', '确认'], (e) => {
					if(e.index == 1) {
						this.sui.removeToken()
						this.$router.push({
							name: "login"
						})
					}
				})

			}
		},
		created(){
			if(this.$route.query.type) {
				this.isSetPwd=this.$route.query.type;
			}
		},
		beforeDestroy() {
			this.loading = this.sui.closewait(this.loading);
		}
	}
</script>

<style lang="scss">
    
	.set {
		.list-box {
			padding-top: 10px;
			.mui-table-view {
				background-color: none !important;
				margin-bottom: 20px;
				.mui-table-view-cell {
					position: relative;
					padding: 0 15px;
					height: 44px;
					line-height: 44px;
					font-size: 0;
					&.default-bg {
						background: #FFFFFF !important;
					}
					.text {
						font-size: 16px;
					}
					.mui-icon {
						position: absolute;
						line-height: 44px;
						right: 18px;
						color: #999999;
					}
					.safety {
						position: absolute;
						line-height: 44px;
						right: 50px;
						color: #999999;
						font-size: 14px;
					}
				}
			}
			.mui-btn {
				font-size: 15px;
				border: none;
				border-radius: 0;
			}
		}
	}
</style>