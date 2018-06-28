<template>
	<div class="setLoginPassword">
		<ul class="input-box">
			<li class="border-1px">
				<i class="iconfont icon-mima"></i>
				<input type="password" value="" placeholder="请输入原登录密码" v-model="form.OldPassword" />
			</li>
			<li class="border-1px">
				<i class="iconfont icon-mima"></i>
				<input type="password" value="" placeholder="请输入新登录密码" v-model="form.NewPassword" />
			</li>
			<li class="border-1px">
				<i class="iconfont icon-mima"></i>
				<input type="password" value="" placeholder="请确认新登录密码" v-model="form.ConfirmPassword" />
			</li>
		</ul>
		<button class="mui-btn mui-btn-primary mui-btn-block" @tap="modify">提交修改</button>
		<div class="bg"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					OldPassword: "",
					NewPassword: "",
					ConfirmPassword: "",
				}
			}
		},
		methods: {
			modify() {
				if(this.sui.IsNullOrEmpty(this.form.OldPassword)) {
					mui.toast("请输入原登录密码");
					return;
				} else if(this.sui.IsNullOrEmpty(this.form.NewPassword)) {
					mui.toast("请输入新登录密码");
					return;
				} else if(this.sui.IsNullOrEmpty(this.form.ConfirmPassword)) {
					mui.toast("请再次输入新登录密码");
					return;
				} else if(this.form.NewPassword.trim() != this.form.ConfirmPassword.trim()) {
					mui.toast("新密码和确认密码不一致");
					return;
				}
				this.sui.request("User/ModifyPwd", this.form, "post", (data) => {
					if(data) {
						if(data.IsPass) {
							mui.toast('修改成功');
							this.$router.go(-1);
						} else {
							mui.toast(data.Desc);
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.setLoginPassword {
		padding: 30px 15px;
		background: #FFFFFF;
		.input-box {
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
					height: initial;
					padding-left: 50px;
					padding-right: 15px;
					font-size: 16px;
					border: none;
				}
				.mui-btn {
					position: absolute;
					top: 50%;
					right: 15px;
					-webkit-transform: translate(0, -50%);
					-ms-transform: translate(0, -50%);
					transform: translate(0, -50%);
				}
			}
		}
		.bg {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			z-index: -1;
			background: #FFFFFF;
		}
	}
</style>