<template>
	<div class="register">
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
				<button class="mui-btn mui-btn-primary" @tap="btnSend" :disabled="btnState">{{value}}</button>
			</li>
			<li class="border-1px">
				<i class="iconfont icon-mima"></i>
				<input type="password" value="" placeholder="请输入登录密码" v-model="form.Password" />
			</li>
			<li class="border-1px mui-hidden">
				<i class="iconfont icon-mima"></i>
				<input type="password" value="" placeholder="请输入安全码(不能与登录密码一致)"  />
			</li>
			<li class="border-1px">
				<i class="iconfont icon-yonghu"></i>
				<input type="text" value="" placeholder="请输入推荐人的手机号(选填)" v-model="form.TuiJianUser" />
			</li>
		</ul>
		<div class="pwdtips">密码8~20位，由字母+数字和符号两种以上组合</div>
		<div class="xieyi">
			<input type="checkbox" class="checkbox" value="" v-model="form.Agree" />
			<p class="text"><span>我已阅读并同意</span>
				<router-link :to="{name:'regProtocol'}">《注册协议》</router-link>
				<router-link :to="{name:'riskNote'}">《风险提示书》</router-link>
			</p>
		</div>
		<button class="mui-btn mui-btn-primary mui-btn-block" @tap="reg">注册</button>
		
		<p class="desc">市场有风险，出借需谨慎</p>
		<div class="bg"></div>
	</div>
</template>

<script>
	import { md5RandomCode } from '@/common/js/md5.min'

	export default {
		data() {
			return {
				w: null,
				isSend: 0, //验证码是否发送
				btnState: false, //按钮状态
				time: null, //按钮倒计时
				value: "获取验证码", //按钮文本
				imageCode:"",
				imgCode:this.sui.interfaceUrl()+"Passport/GetImageCode?"+this.sui.unique(),
				form: { //表单
					Mobile: "",
					SmsVerCode: "",
					Password: "",
					//PayPassword: "",
					Agree: true,
					Channel: 2,
					TuiJianUser: "",
					Key: "",
					UserKind: 1
				}
			}
		},
		created: function() {
			this.form.TuiJianUser = this.$route.query.m || "";
			this.form.Key = this.$route.query.Key || "";
			this.form.UserKind = this.$route.query.userKind || 1;
		},
		methods: {
			//验证码时间
			CountDown() {
				if(this.maxtime >= 0) {
					this.value = this.maxtime + 's';
					--this.maxtime;
				} else {
					clearInterval(this.time);
					this.value = '获取验证码';
					this.btnState = false;
				}
			},
			btnSend() {
				//获取服务器时间，发送验证码
				if(!this.form.Agree) {
					mui.toast('请阅读并同意前海领投《注册协议》');
					return;
				} else if(this.sui.IsNullOrEmpty(this.form.Mobile)) {
					mui.toast('请输入手机号');
					return;
				} else if(!this.form.Mobile.isMobile()) {
					mui.toast('请输入正确的手机号码');
					return;
				}else if(this.sui.IsNullOrEmpty(this.imageCode)) {
					mui.toast("请输入图形验证码")
					return;
				}
				this.isSend = 0;
				this.value = '请稍候...';
				this.btnState = true;

				this.sui.request('Passport/GetTime', {}, "get", (data) => {
					if(data) {
						var IsPass = data.IsPass;
						if(IsPass) {
							this.sendCode(data.ReturnObject);
						} else {
							this.getImgCode();
							mui.toast('获取验证码失败,请稍候再试');
							this.btnState = false;
							this.value = '获取验证码';
						}
					} else {
						this.getImgCode();
						this.btnState = false;
						this.value = '获取验证码';
					}
				});
			},
			sendCode: function(txtYZM) {
				//发送验证码
				var postData = {
					Mobile: this.form.Mobile,
					RandomCode: md5RandomCode(txtYZM),
					BussinessType: 1,
					Channel: 2,
					CodeType: 0,
					ImageCode:this.imageCode,
					slbCode:this.sui.getWeChatCode()
				};
				this.sui.request('Passport/GetMobileCode', postData, "post", (data) => {
					if(data) {
						var IsPass = data.IsPass;
						if(IsPass) {
							this.isSend = 1;
							this.btnState = true;
							this.maxtime = 120;
							this.time = setInterval(this.CountDown, 1000);
						} else {
							this.getImgCode();
							this.value = '获取验证码';
							this.btnState = false;
							mui.toast(data.Desc);
						}
					} else {
						this.getImgCode();
						this.value = '获取验证码';
						this.btnState = false;
					}
				});
			},
			reg: function() {
				//注册
				if(!this.form.Agree) {
					mui.toast('请阅读并同意前海领投《注册协议》');
					return;
				} else if(this.sui.IsNullOrEmpty(this.form.Mobile)) {
					mui.toast('请输入手机号');
					return;
				} else if(!this.form.Mobile.isMobile()) {
					mui.toast('请输入正确的手机号');
					return;
				} else if(!this.isSend) {
					mui.toast('请获取手机验证码');
					return;
				}else if(this.sui.IsNullOrEmpty(this.form.SmsVerCode)) {
					mui.toast('请输入验证码');
					return;
				} else if(this.sui.IsNullOrEmpty(this.form.Password)) {
					mui.toast('请输入登录密码，8~20位，由字母+数字和符号两种以上组合');
					return;
				} else if(!this.sui.IsNullOrEmpty(this.form.TuiJianUser) && !this.form.TuiJianUser.isMobile()) {
					mui.toast('请输入正确的推荐人手机号');
					return;
				}

				this.w = this.sui.wait(true, '正在注册...');
				this.sui.post('Passport/Reg', this.form, (data) => {
					if(data) {
						let IsPass = data.IsPass;
						if(IsPass) {
							if(!this.sui.IsNullOrEmpty(data.ReturnObject)) {
								this.sui.setToken(data.ReturnObject);
								localStorage.setItem('qhlead_userMobile', this.form.Mobile);
								this.$router.push({
									name: "user"
								})
							} else {
								this.$router.push({
									name: "login"
								})
							}
							mui.toast(data.Desc);
						} else {
							this.getImgCode();
							mui.toast(data.Desc);
						}
					}
					this.w = this.sui.closewait(this.w, true);
				});
			},
			getImgCode(){
				this.imgCode=this.sui.interfaceUrl()+"Passport/GetImageCode?"+this.sui.unique();
			}
		}
	}
</script>

<style lang="scss">

	.register {
		width: 100%;
		padding: 0 15px;
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
			/*margin-top: 30px;*/
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
				.imgCode{
						width: 90px;
						height: 25px;
						position: absolute;
						top: 10px;
						right: 15px;
					}
			}
		}
		.xieyi {
			position: relative;
			display: flex;
			margin-top: 25px;
			font-size: 0;
			input {
				margin-top: -2px;
			}
			.text {
				flex: 1;
				font-size: 14px;
				span {
					margin-left: 30px;
					display: inline-block;
					vertical-align: middle;
					line-height: 18px;
					color: #2c2c2c;
				}
				a {
					display: inline-block;
					vertical-align: middle;
				}
			}
		}
		>.mui-btn {
			margin-top: 30px;
		}
		.desc {
			text-align: center;
			width: 100%;
			color: #B3B3B3;
			font-size: 14px;
			padding-top: 4px;
			padding-bottom: 24px;
		}
		.pwdtips{font-size: 13px;color: #B3B3B3;padding: 5px 1px;}
	}
</style>