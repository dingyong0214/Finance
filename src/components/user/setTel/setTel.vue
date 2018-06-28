<template>
	<div class="setTel">
		<ul class="input-box" v-show="!next">
			<li class="border-1px">
				<i class="iconfont icon-shoujihao"></i>
				<input maxlength="11" type="text" value="" placeholder="请输入原手机号" v-model="old.Mobile" />
			</li>
			<li class="border-1px">
				<i class="iconfont icon-yanzhengma"></i>
				<input maxlength="4" type="text" value="" placeholder="请输入验证码" v-model="old.code" />
				<button class="mui-btn mui-btn-primary" @tap="getCode" :disabled="disabled">{{value}}</button>
			</li>
		</ul>
		<ul class="input-box" v-show="next">
			<li class="border-1px">
				<i class="iconfont icon-shoujihao"></i>
				<input maxlength="11" type="text" value="" placeholder="请输入新的手机号码" v-model="newForm.Mobile" />
			</li>
			<li class="border-1px">
				<i class="iconfont icon-yanzhengma"></i>
				<input maxlength="4" type="text" value="" placeholder="请输入图形验证码" v-model="imageCode" />
				<img :src="imgCode"  @tap="getImgCode" class="imgCode"/>
			</li>
			<li class="border-1px">
				<i class="iconfont icon-yanzhengma"></i>
				<input maxlength="4" type="text" value="" placeholder="请输入验证码" v-model="newForm.SmsVerCode" />
				<button class="mui-btn mui-btn-primary" @tap="getCode" :disabled="disabled">{{value}}</button>
			</li>
		</ul>
		<button class="mui-btn mui-btn-primary mui-btn-block" @click="submit($event)">下一步</button>
	</div>
</template>

<script>
	import { md5RandomCode } from '@/common/js/md5.min'

	export default {
		data() {
			return {
				next: 0,
				value: "获取验证码",
				disabled: false,
				isSend: true,
				timer: null, //定时器
				imgCode:this.sui.interfaceUrl()+"Passport/GetImageCode?"+this.sui.unique(),
				imageCode:"",
				old: {
					Mobile: '',
					code: ''
				},
				newForm: {
					Mobile: "",
					SmsVerCode: "",
					EncryptString: ""
				}
			};
		},
		methods: {
			getCode() {
				//先获取服务器时间
				if(this.sui.IsNullOrEmpty(this.old.Mobile)) {
					mui.toast("请输入手机号码");
					return;
				} else if(!this.old.Mobile.isMobile()) {
					mui.toast('请输入正确的手机号码');
					return;
				}else if(this.sui.IsNullOrEmpty(this.imageCode) && this.next) {
					mui.toast("请输入图形验证码");
					return;
				}


				this.isSend = true;
				this.disabled = true;
				this.value = '请稍候...';
				this.sui.request('Passport/GetTime', {}, 'get', (data) => {
					if(data) {
						if(data.IsPass) {
							this.sendCode(data.ReturnObject);
						} else {
							if(this.next){
								this.getImgCode();
							}
							mui.toast(data.Desc);
						}
					}
				})
			},
			sendCode(code) {
				var postData = {
					Mobile: [this.old.Mobile, this.newForm.Mobile][this.next],
					RandomCode: md5RandomCode(code),
					BussinessType: [9, 4][this.next],
					Channel: 2,
					CodeType: 0,
					ImageCode:"wx"
				};
				if(this.next){
					postData.ImageCode=this.imageCode;
					postData.slbCode=this.sui.getWeChatCode();
				}
				var postUrl = ['Passport/GetLoginPhoneCode', 'Passport/GetPhoneCode'][this.next];
				this.sui.request(postUrl, postData, "post", (data) => {
					if(data) {
						if(data.IsPass) {
							this.isSend = false;
							var maxTime = 120;
							this.timer = setInterval(() => {
								if(maxTime <= 0) {
									clearInterval(this.timer);
									this.value = '获取验证码';
									this.disabled = false;
								} else {
									maxTime--;
									this.value = maxTime + 's'
								}
							}, 1000)
						} else {
							if(this.next){
								this.getImgCode();
							}
							mui.toast(data.Desc);
							this.value = '获取验证码';
							this.disabled = false;
						}
					} else {
						if(this.next){
								this.getImgCode();
							}
						this.value = '获取验证码';
						this.disabled = false;
					}
				})
			},
			submit(ev) {
				if(this.next == 0) {
					if(this.sui.IsNullOrEmpty(this.old.Mobile)) {
						mui.toast("请输入原手机号码");
						return;
					} else if(!this.old.Mobile.isMobile()) {
						mui.toast('请输入正确的手机号码');
						return;
					} else if(this.isSend) {
						mui.toast('请获取验证码');
						return;
					} else if(this.sui.IsNullOrEmpty(this.old.code)) {
						mui.toast('请输入验证码')
						return;
					}

					this.sui.post('User/ValidateMobile', {
						code: this.old.code
					}, (data) => {
						if(data) {
							if(data.IsPass) {
								this.newForm.EncryptString = data.ReturnObject;
								clearInterval(this.timer);
								this.value = '获取验证码';
								this.isSend = true;
								this.disabled = false;
								this.next = 1;
								ev.target.innerHTML = '提交';
							} else {
								mui.toast(data.Desc);
							}
						}
					})
				} else {

					if(this.sui.IsNullOrEmpty(this.newForm.Mobile)) {
						mui.toast("请输入新手机号码");
						return;
					} else if(!this.newForm.Mobile.isMobile()) {
						mui.toast('请输入正确的手机号码');
						return;
					} else if(this.isSend) {
						mui.toast('请获取验证码');
						return;
					} else if(this.sui.IsNullOrEmpty(this.newForm.SmsVerCode)) {
						mui.toast('请输入验证码');
						return;
					} else if(this.sui.IsNullOrEmpty(this.newForm.EncryptString)) {
						mui.toast("参数错误，请退出重试");
						return;
					}

					this.sui.request('User/ModifyMobile', this.newForm, "post", (data) => {
						if(data) {
							if(data.IsPass) {
								mui.toast('更换新手机号成功');
								this.$router.go(-1);
							} else {
							  if(this.next){
								this.getImgCode();
							   }
								mui.toast(data.Desc);
							}
						}
					})
				}
			},
			getImgCode(){
				this.imgCode=this.sui.interfaceUrl()+"Passport/GetImageCode?"+this.sui.unique();
			}
		}
	}
</script>

<style lang="scss">
	.setTel {
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
					height: initial;
					font-size: 16px;
					border: none;
				}
				.mui-btn {
					position: absolute;
					top: 50%;
					right: 15px;
					min-width: 96px;
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
	}
</style>