<template>
	<div class="safetyCode">
		<ul class="input-box">
			<li class="border-1px">
				<i class="iconfont icon-shoujihao"></i>
				<input type="text" value="" placeholder="请输入手机号" v-model="form.Mobile" />
			</li>
			<li class="border-1px">
				<i class="iconfont icon-mima"></i>
				<input type="password" value="" placeholder="请输入登录密码" v-model="form.Password" />
			</li>
			<li class="border-1px">
				<i class="iconfont icon-yanzhengma"></i>
				<input maxlength="4" type="text" value="" placeholder="请输入验证码" v-model="form.SmsVerCode" />
				<button class="mui-btn mui-btn-primary" @tap="btnSend" :disabled="disabled">{{value}}</button>
			</li>
			<li class="border-1px">
				<i class="iconfont icon-mima"></i>
				<input type="password" value="" placeholder="请输入新的安全码" v-model="form.PayPassword" />
			</li>
		</ul>
		<button class="mui-btn mui-btn-primary mui-btn-block" @tap="btnSure">确定</button>
	</div>
</template>

<script>
	import { md5RandomCode } from '@/common/js/md5.min'

	export default {
		data() {
			return {
				isSend: 0, //验证码是否获取成功
				disabled: false, //按钮状态
				time: null, //按钮倒计时
				value: "获取验证码", //按钮文本
				form: { //表单
					Mobile: "",
					Password: "",
					SmsVerCode: "",
					PayPassword: ""
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				if(this.$route.query.isTips == 1) {
					mui.alert('为了保证资金安全，请设置您的安全码', function() {}, 'div');
				}
			})
		},
		methods: {
			btnSure() {
				//提交
				if(!this.isSend) {
					mui.toast('请获取手机验证码');
					return;
				} else if(this.sui.IsNullOrEmpty(this.form.Mobile)) {
					mui.toast('请输入手机号');
					return;
				} else if(!this.form.Mobile.isMobile()) {
					mui.toast('请输入正确的手机号');
					return;
				} else if(this.sui.IsNullOrEmpty(this.form.Password)) {
					mui.toast('请输入登录密码');
					return;
				} else if(this.sui.IsNullOrEmpty(this.form.SmsVerCode)) {
					mui.toast('请输入验证码');
					return;
				} else if(this.sui.IsNullOrEmpty(this.form.PayPassword)) {
					mui.toast('请输入新的安全码');
					return;
				}
				this.loading = this.sui.wait(true, '正在加载');
				this.sui.request('User/SetPayPwd', this.form, 'post', (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						var IsPass = data.IsPass;
						if(IsPass) {
							mui.toast("设置成功");
							if(this.$route.query.isRisk != 1) {
								this.$router.push({
									name: "riskTest",
									query: {
										first: 1,
										redirect: this.$route.query.redirect
									}
								})
							} else {
								this.$router.go(-1);
							}
						} else {
							mui.toast(data.Desc);
						}
					}
				});
			},
			btnSend() {
				//获取验证码
				if(this.sui.IsNullOrEmpty(this.form.Mobile)) {
					mui.toast('请输入手机号');
					return;
				} else if(!this.form.Mobile.isMobile()) {
					mui.toast('请输入正确的手机号码');
					return;
				} else if(this.sui.IsNullOrEmpty(this.form.Password)) {
					mui.toast('请输入登录密码');
					return;
				}

				this.value = "请稍候...";
				this.disabled = true;
				this.isSend = 0;
				this.sui.request('Passport/GetTime', {}, "get", (data) => {
					if(data) {
						if(data.IsPass) {
							this.sendCode(data.ReturnObject);
						} else {
							mui.toast(data.Desc);
						}
					}
				})

			},
			sendCode(code) {
				var postData = {
					Mobile: this.form.Mobile,
					RandomCode: md5RandomCode(code),
					BussinessType: 10,
					Channel: 2,
					CodeType: 0,
					LoginPwd: this.form.Password,
					ImageCode:"wx"
				};

				this.sui.request('Passport/GetLoginPhoneCode', postData, 'post', (data) => {
					if(data) {
						if(data.IsPass) {
							this.isSend = 1;
							var maxTime = 120;
							var t = setInterval(() => {
								if(maxTime >= 0) {
									this.value = maxTime + 's';
									maxTime--;
								} else {
									clearInterval(t);
									this.value = '获取验证码';
									this.disabled = false;
								}
							}, 1000)
						} else {
							mui.toast(data.Desc);
							this.value = '获取验证码';
							this.disabled = false;
						}
					} else {
						this.value = '获取验证码';
						this.disabled = false;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.safetyCode {
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		padding: 0 15px;
		background: #FFFFFF;
		z-index: 100;
		.input-box {
			margin-top: 30px;
			li {
				position: relative;
				margin-bottom: 15px;
				@include border-1px(#e5e5e5);
				.iconfont {
					position: absolute;
					top: 15px;
					margin: auto;
					left: 15px;
					font-size: 20px;
					color: #cccccc;
				}
				input {
					margin: 5px 0;
					padding-left: 50px;
					padding-right: 15px;
					font-size: 16px;
					border: none;
				}
				.mui-btn {
					position: absolute;
					top: 50%;
					right: 15px;
					transform: translate(0, -50%);
					width: 96px;
				}
			}
		}
		>.mui-btn {
			margin-top: 30px;
		}
	}
</style>