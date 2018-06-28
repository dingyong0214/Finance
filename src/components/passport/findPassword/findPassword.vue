<template>
	<div class="findPassword">
		<ul class="input-box">
			<li class="border-1px">
				<i class="iconfont icon-shoujihao"></i>
				<input type="text" value="" placeholder="请输入手机号" v-model="form.Mobile" />
			</li>
			<li class="border-1px">
				<i class="iconfont icon-yanzhengma"></i>
				<input maxlength="4" type="text" value="" placeholder="请输入图形验证码" v-model="imageCode" />
				<img :src="imgCode"  @tap="getImgCode" class="imgCode"/>
			</li>
			<li class="border-1px">
				<i class="iconfont icon-yanzhengma"></i>
				<input maxlength="4" type="text" value="" placeholder="请输入验证码" v-model="form.SmsVerCode" />
				<button class="mui-btn mui-btn-primary" @tap="btnSend" :disabled="disabled">{{value}}</button>
			</li>
			<li class="border-1px">
				<i class="iconfont icon-mima"></i>
				<input type="password" value="" placeholder="请输入新密码" v-model="form.Password" />
			</li>
			<li class="border-1px">
				<i class="iconfont icon-mima"></i>
				<input type="password" value="" placeholder="请输入确认新密码" v-model="form.ConfirmPassword" />
			</li>
		</ul>
		<button class="mui-btn mui-btn-primary mui-btn-block" @tap="btnSure">确定</button>
		<div class="pwdtips">密码8~20位，由字母+数字和符号两种以上组合</div>
		<div class="bg"></div>
	</div>
</template>

<script>
	import { md5RandomCode } from '@/common/js/md5.min'

	export default {
		data() {
			return {
				w: null,
				value: "获取验证码",
				imgCode:this.sui.interfaceUrl()+"Passport/GetImageCode?"+this.sui.unique(),
				imageCode:"",
				disabled: false,
				isSend: false, //验证码是否发送
				form: { //表单
					Mobile: "",
					SmsVerCode: "",
					Password: "",
					ConfirmPassword: ""
				}
			}
		},
		methods: {
			//验证码时间
			CountDown() {
				if(this.maxTime == 0) {
					clearInterval(this.time);
					this.value = "获取验证码";
					this.disabled = false;
					this.isSend = false;
				} else {
					this.value = this.maxTime + "s";
					this.maxTime--;
				}
			},
			//获取服务器时间
			btnSend() {
				if(this.sui.IsNullOrEmpty(this.form.Mobile)) {
					mui.toast('请输入手机号');
					return;
				} else if(!this.form.Mobile.isMobile()) {
					mui.toast("请输入正确的手机号")
					return;
				}else if(this.sui.IsNullOrEmpty(this.imageCode)) {
					mui.toast("请输入图形验证码")
					return;
				}
				this.value = "请稍候...";
				this.disabled = true;
				this.isSend = true;
				this.sui.request('Passport/GetTime', {}, "get", (data) => {
					if(data) {
						if(data.IsPass) {
							this.sendCode(data.ReturnObject);
						} else {
							this.disabled = false;
							this.value = "获取验证码";
							this.getImgCode();
							mui.toast("获取验证码失败,请稍候再试");
						}
					} else {
						this.getImgCode();
						this.disabled = false;
						this.value = "获取验证码";
					}
				})
			},
			//获取验证码
			sendCode(txtYZM) {
				var postData = {
					"Mobile": this.form.Mobile,
					"CodeType": 1,
					"RandomCode": md5RandomCode(txtYZM),
					"BussinessType": 3,
					"Channel": 2,
					"ImageCode":this.imageCode,
					"slbCode":this.sui.getWeChatCode()
				}
				this.sui.request('Passport/GetMobileCode', postData, "post", (data) => {
					if(data) {
						if(data.IsPass) {
							this.maxTime = 120;
							this.time = setInterval(this.CountDown, 1000);
						} else {
							this.value = "获取验证码";
							this.disabled = false;
							this.getImgCode();
							mui.toast(data.Desc);
						}
					} else {
						this.value = "获取验证码";
						this.getImgCode();
						this.disabled = false;
					}
				});
			},
			btnSure() {
				if(!this.isSend) {
					mui.toast('请获取手机验证码');
					return;
				} else if(this.sui.IsNullOrEmpty(this.form.Mobile)) {
					mui.toast('请输入手机号');
					return;
				} else if(!this.form.Mobile.isMobile()) {
					mui.toast('请输入正确的手机号');
					return;
				} else if(this.sui.IsNullOrEmpty(this.form.SmsVerCode)) {
					mui.toast('请输入验证码');
					return;
				} else if(this.sui.IsNullOrEmpty(this.form.Password)) {
					mui.toast('请输入新密码');
					return;
				} else if(this.sui.IsNullOrEmpty(this.form.ConfirmPassword)) {
					mui.toast('请再次输入新密码');
					return;
				} else if(this.form.Password != this.form.ConfirmPassword) {
					mui.toast('两次密码输入不一致');
					return;
				}
				this.w = this.sui.wait(true, "请稍候");
				this.sui.request('Passport/Forget', this.form, "post", (data) => {
					if(data) {
						if(data.IsPass) {
							mui.toast("新密码设置成功");
							this.$router.go(-1);
						} else {
							mui.toast(data.Desc);
							this.getImgCode();
						}
					}
					this.sui.closewait(this.w, true);
				});
			},
			getImgCode(){
				this.imgCode=this.sui.interfaceUrl()+"Passport/GetImageCode?"+this.sui.unique();
			}
		}
	}
</script>

<style lang="scss">
	.findPassword {
		width: 100%;
		padding: 0 15px;
		background: #FFFFFF;
		 .bg {
			position: fixed;
			left: 0;
			bottom: 0;
			right: 0;
			top: 0;
			z-index: -1;
			background: #FFFFFF;
		}
		.input-box {
			margin-top: 30px;
			li {
				position: relative;
				margin-bottom: 25px;
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
					width: 96px;
					position: absolute;
					top: 50%;
					right: 15px;
					-webkit-transform: translate(0, -50%);
					-ms-transform: translate(0, -50%);
					transform: translate(0, -50%);
				}
				.imgCode{
						width: 90px;
						height: 25px;
						position: absolute;
						top: 10px;
						right: 15px;
					}
			}
		}
		.pwdtips{font-size: 13px;color: #B3B3B3;padding: 15px 0;}
	}
</style>