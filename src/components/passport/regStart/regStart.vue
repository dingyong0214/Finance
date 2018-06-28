<template>
	<div class="regStart">
		<div class="bg">
			<img src="./reg.png" />
		</div>
		<div class="btn-wrap">
			<button type="button" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined" @tap="btnReg(1)">我要出借</button>
			<button type="button" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined mtop" @tap="btnReg(2)">我要借款</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				mobile: "",
				Key: ""
			}
		},
		created: function() {
			this.mobile = this.$route.query.m || "";
			this.Key = this.$route.query.Key || "";
		},
		methods: {
			btnReg: function(kind) {
				this.$router.push({
					name: "register",
					query: {
						m: this.mobile,
						Key: this.Key,
						userKind: kind
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.regStart {
		background: #FFFFFF;
		position: fixed;
		width: 100%;
		top: 0;
		bottom: 0;
		.bg {
			background: #1E81D2;
			width: 100%;
			height: 160px;
			display: -webkit-flex;
			display: flex;
			-webkit-align-items: center;
			align-items: center;
			-webkit-justify-content: center;
			justify-content: center;
			img {
				width: 150px;
			}
		}
		.btn-wrap {
			width: 100%;
			padding: 40px 30px;
			margin-top: 30px;
		}
		.mtop {
			margin-top: 30px;
		}
	}
</style>