<template>
	<div class="modifyOauth">
		<div class="avatar-box">
			<img :src="pic" />
		</div>
		<p class="name">{{userName}}</p>
		<p class="description">需要更换绑定吗?</p>
		<div class="btn-box">
			<button class="mui-btn mui-btn-primary mui-btn-block" @tap="btnChange">确认更换</button>
			<button class="mui-btn  mui-btn-block" @tap="btnUnChange">保持原有绑定</button>
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
				userName: "",
				loginWay: ""
			}
		},
		created: function() {
			var way = ['QQ', '微信', '支付宝'][this.$route.PageType - 1] || "";
			this.loginWay = ' 前海领投账号已有绑定的' + way + '，需要更换吗? ';

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
						mui.toast(IsPass);
					}
				}
			})
		},
		mounted: function() {
			//			this.$nextTick(function() {
			//				this.pic = localStorage.getItem('qhlead_userPic') || "static/img/my-logo.png";
			//			})
		},
		methods: {
			btnChange() {
				this.loading = this.sui.wait(true, '请稍后...');
				this.sui.request('Passport/UpdateBind', {
					key: this.$route.query.Key
				}, 'get', (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						if(data.IsPass) {
							mui.toast('更换成功');
							this.$router.push({
								name: "user"
							})
						} else {
							mui.toast(data.Desc);
						}
					}
				})
			},
			btnUnChange() {
				this.$router.push({
					name: "user"
				})
			}
		}
	}
</script>

<style lang="scss">
	.modifyOauth {
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