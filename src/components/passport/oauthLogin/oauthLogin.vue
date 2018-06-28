<template>
	<div class="oauthLogin">
		<div class="avatar-box">
			<img :src="pic" />
		</div>
		<p class="name">{{userName}}</p>
		<p class="description">{{loginWay}}</p>
		<div class="btn-box">
			<button class="mui-btn mui-btn-primary mui-btn-block" @tap="btnNew">关联新账号</button>
			<button class="mui-btn  mui-btn-block" @tap="btnHas">关联已有账号</button>
		</div>
		<div class="bg"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				loading: null,
				pic: "static/img/my-logo.png",
				userName: "请稍候...",
				loginWay: "尚未关联前海领投账号"
			}
		},
		created: function() {
			var way = ['QQ', '微信', '支付宝'][this.$route.query.PageType - 1] || "";
			this.loginWay = '您的' + way + '尚未关联前海领投账号';

			this.loading = this.sui.wait(true, '正在加载...');
			this.sui.request("Passport/GetThird", {
				key: this.$route.query.Key
			}, "get", (data) => {
				this.loading = this.sui.closewait(this.loading);
				if(data) {
					if(data.IsPass) {
						this.pic = data.Photo || "static/img/my-logo.png";
						this.userName = data.NickName;
					} else {
						mui.toast(data.Desc);
					}
				}
			})
		},
		mounted: function() {
			this.$nextTick(function() {
				//				this.pic = localStorage.getItem('qhlead_userPic') || "static/img/my-logo.png";
				//				this.form.mobile = localStorage.getItem('qhlead_userMobile') || "";
			})
		},
		methods: {
			btnNew() {
				this.$router.push({
					name: "regStart",
					query: {
						Key: this.$route.query.Key,
						PageType: this.$route.query.PageType
					}
				})
			},
			btnHas() {
				this.$router.push({
					name: "loginBind",
					query: {
						Key: this.$route.query.Key,
						PageType: this.$route.query.PageType
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.oauthLogin {
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
		.name,
		.description {
			text-align: center;
		}
		.name {
			font-size: 17px;
			padding: 14px 0 12px;
			color: #000;
		}
		.description {
			padding-bottom: 35px;
			color: #888;
			font-size: 14px;
		}
		.btn-box {
			.mui-btn {
				margin-bottom: 25px;
				font-size: 18px;
				&:last-child {
					margin-bottom: 0;
				}
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