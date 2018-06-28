<template>
	<div class="login">
		<div class="avatar-box">
			<img :src="pic" />
		</div>
		<ul class="input-box">
			<li class="border-1px">
				<i class="iconfont icon-yonghu"></i>
				<input type="text" value="" placeholder="请输入用户名" v-model="form.mobile" @input="watchInput" />
			</li>
			<li class="border-1px">
				<i class="iconfont icon-mima"></i>
				<input type="password" autocomplete="off" value="" placeholder="请输入登录密码" v-model="form.password" />
			</li>
		</ul>
		<p class="forget-password">
			<router-link :to="{name:'findPassword'}">忘记密码？</router-link>
		</p>
		<div class="btn-box">
			<button class="mui-btn mui-btn-primary mui-btn-block" @tap="btnLogin">登录</button>
			<router-link :to="{name:'regStart'}" tag="button" class="mui-btn mui-btn-primary mui-btn-outlined mui-btn-block">注册</router-link>
			<!--<button class="mui-btn mui-btn-primary mui-btn-outlined mui-btn-block">注册</button>-->
		</div>
		<div class="footer-box">
			<div class="footer">
				<div class="associate-login">
					<div class="img-box" @tap="qqLogin">
						<img src="./qq.png" />
					</div>
					<div class="img-box" @tap="wxLogin">
						<img src="./wx.png" />
					</div>
				</div>
			</div>
		</div>
		<div class="bg"></div>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				loading: null,
				doLoop: null,
				pic: "",
				form: {
					mobile: "",
					password: "",
					keys: ""
				}
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.pic = localStorage.getItem('qhlead_userPic') || "static/img/my-logo.png";
				this.form.mobile = localStorage.getItem('qhlead_userMobile') || "";
			})
		},
		methods: {
			watchInput() {
				//监听提现输入框
				clearInterval(this.doLoop);
				this.doLoop = setTimeout(() => {
					if(this.form.mobile != (localStorage.getItem('qhlead_userMobile') || "")) {
						this.pic = "static/img/my-logo.png";
					} else {
						this.pic = localStorage.getItem('qhlead_userPic') || "static/img/my-logo.png";
					}
				}, 500)
			},
			qqLogin() {
				this.sui.request("Passport/QQLogin ", {
					//					returnUrl: ""
				}, 'get', (data) => {
					if(data) {
						if(data.IsPass) {
							window.location.href = data.url;
						} else {
							mui.toast(data.Desc);
						}
					}
				})
			},
			wxLogin() {
				this.sui.request("Passport/GetWechatLogin", {}, 'get', (data) => {
					if(data) {
						if(data.IsPass) {
							window.location.href = data.url;
						} else {
							mui.toast(data.Desc);
						}
					}
				})
			},
			btnLogin() {
				//登录
				if(this.sui.IsNullOrEmpty(this.form.mobile)) {
					mui.toast('请输入用户名');
					return;
				} else if(this.sui.IsNullOrEmpty(this.form.password)) {
					mui.toast('请输入密码');
					return;
				}

				this.loading = this.sui.wait(true, '登录中...');
				this.sui.post('Passport/Login', this.form, (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						var IsPass = data.IsPass;
						if(IsPass) {
							this.sui.setToken(data.ReturnObject.Token);
							localStorage.setItem('qhlead_userMobile', this.form.mobile);
							mui.toast("登录成功");
							let redirect = this.$route.query.redirect;
							 if(!data.ReturnObject.IsRisk) {
								this.$router.push({
									name: "riskTest",
									first: 1,
									redirect: redirect
								})
								return
							}

							if(redirect) {
								//location.href="#"+decodeURIComponent(redirect);
								this.$router.push({ 
									name: redirect
								})
								return
							} else {
								this.$router.push({
									name: "user"
								})
								return
							}

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
	.login {
		padding: 30px 15px 0;
		background: #FFFFFF;
		z-index: 100;
		.avatar-box {
			margin: 0 auto;
			overflow: hidden;
			border-radius: 50%;
			background-color: #ebf6ff;
			width: 75px;
			img {
				width: 100%;
			}
		}
		.input-box {
			margin-top: 30px;
			li {
				margin-bottom: 30px;
				@include border-1px(#e5e5e5);
				.iconfont {
					position: absolute;
					top: 10px;
					margin: auto;
					left: 15px;
					font-size: 20px;
					color: #cccccc;
				}
				input {
					margin: 0;
					padding-left: 50px;
					padding-right: 15px;
					font-size: 16px;
					border: none;
				}
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
		.btn-box {
			.mui-btn {
				margin-bottom: 25px;
				font-size: 16px;
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
		.footer-box {
			padding: 30px 0;
			width: 100%;
			text-align: center;
			background: #FFFFFF;
		}
		.footer {
			.associate-login {
				text-align: center;
				font-size: 0;
				.img-box {
					display: inline-block;
					vertical-align: top;
					width: 50px;
					height: 50px;
					margin-right: 60px;
					&:last-child {
						margin-right: 0;
					}
					img {
						width: 100%;
					}
				}
			}
		}
		.forget-password {
			padding: 15px 0;
			text-align: right;
			a {
				color: #999999;
				font-size: 14px;
			}
		}
		.bg {
			position: fixed;
			left: 0;
			bottom: 0;
			right: 0;
			top: 0;
			z-index: -1;
			background: #FFFFFF;
		}
	}
</style>