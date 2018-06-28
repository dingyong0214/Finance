<template>
	<div class="loginBind">
		<div class="avatar-box">
			<img :src="pic" />
		</div>
		<ul class="input-box">
			<li class="border-1px">
				<i class="iconfont icon-yonghu"></i>
				<input type="text" value="" placeholder="请输入用户名" v-model="form.mobile" />
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
		</div>
		<div class="bg"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: null,
				pic: "",
				form: {
					mobile: "",
					password: "",
					keys: ""
				}
			}
		},
		created: function() {
			this.form.keys = this.$route.query.Key;
		},
		mounted: function() {
			this.$nextTick(() => {
				this.pic = localStorage.getItem('qhlead_userPic') || "static/img/my-logo.png";
				this.form.mobile = localStorage.getItem('qhlead_userMobile') || "";
			})
		},
		methods: {
			btnLogin() {
				//登录
				if(this.sui.IsNullOrEmpty(this.form.mobile)) {
					mui.toast('请输入手机号');
					return;
				} else if(!this.form.mobile.isMobile()) {
					mui.toast('请输入正确的手机号');
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
							if(data.Desc.indexOf('已绑定') != -1) {
								this.$router.push({
									name: "modifyOauth",
									Key: this.form.keys,
									PageType: this.$route.query.PageType
								})
							} else {
								this.$router.push({
									name: "sureOauth",
									Key: this.form.keys,
									PageType: this.$route.query.PageType
								})
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
	.loginBind {
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