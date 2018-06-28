<template>
	<div class="auth">

	</div>
</template>

<script>
	export default {
		data() {
			return {
				code: "",
				state: ""
			}
		},
		methods: {
			getWeParam() {
				let href = window.location.href;
				href = href.replace('https://m.qhlead.com/', '').replace('?', '').replace('#/auth', '');
				let arr = href.split("&"); //[code=xxx,state=xxx]
				let codeArr = arr[0].split("="); //[code,xxx]
				let stateArr = arr[1].split("="); //[state,xxx]
				if(codeArr.indexOf("code") != -1) { //判断微信是否相反传参，如果是则相反赋值
					this.code = codeArr[1];
					this.state = stateArr[1];
				} else {
					this.code = stateArr[1];
					this.state = codeArr[1];
				}
			}
		},
		created: function() {
			this.getWeParam();
			if(this.code && this.state) {
				this.sui.post("Passport/GetWechatOpenId", {
					code: this.code,
					state: this.state
				}, (data) => {
					if(data) {
						if(data.IsPass) {
							if(data.IsBind) {
								this.$router.push({
									name: "user",
									query: {
										token: data.Token
									}
								})
							} else {
								this.$router.push({
									name: "oauthLogin",
									query: {
										Key: data.Key,
										PageType: 2
									}
								})
							}
						} else {
							if(data.Desc.indexOf('字典') == -1) {
								mui.toast(data.Desc);
							}
							this.$router.push({
								name: "login"
							})
						}
					} else {
						this.$router.push({
							name: "login"
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>