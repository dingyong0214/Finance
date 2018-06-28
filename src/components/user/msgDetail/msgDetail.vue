<template>
	<div class="msgDetail">
		<div class="title">
			<h2>{{model.Title || ""}}</h2>
			<span>{{formatDate(model.InsertTime)}}</span>
		</div>
		<p class="main" v-html="model.Content"></p>
		<div class="bg"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				model: {}
			}
		},
		created: function() {
			let a = {
				Content: "<a>asdasd</a>"
			}
			this.model = a;
			this.sui.request('User/MessageDetail', {
				msgId: this.$route.query.id
			}, 'get', (data) => {
				if(data) {
					if(data.IsPass) {

					} else {
						mui.toast(data.Desc);
					}
				}
			})
		},
		mounted() {
			this.$nextTick(() => {
				mui('body').on('tap', 'a', function() {
					//消息类型：1-标详情 2--自动投标 3-回款 4-还款提醒  5-优惠券提醒 6-提现 7-资讯
					var param = JSON.parse(this.model.Parameters);
					switch(this.model.MessageType) {
						case 1:
							this.$router.push({
								name: "investDetail",
								query: {
									id: param.BusinessId,
									type: param.BusinessType,
									title: param.BusinessName
								}
							})
							break;
						case 2:
							if(param.BusinessType == 4) {
								this.$router.push({
									name: "myTransfer",
									params: {
										index: 2
									}
								})
							} else {
								this.$router.push({
									name: "assetsRecords",
									query: {
										type: param.BusinessType
									}
								})
							}
							break;
						case 3:
							this.$router.push({
								name: "payCalendar"
							})
							break;
						case 4:
							this.$router.push({
								name: "repayCalendar"
							})
							break;
						case 5:
							this.$router.push({
								name: "coupon",
								query: {
									type: param.BusinessType
								}
							})
							break;
						case 6:
							this.$router.push({
								name: "recording",
								query: {
									type: 2
								}
							})
							break;
						case 7:
							this.$router.push({
								name: "infoDetail",
								query: {
									newsId: param.BusinessId
								}
							})
							break;
					}
				});
			})
		},
		methods: {
			formatDate(value) {
				return value ? this.sui.formatDate('y-m-d h:i:s', value) : "";
			}
		}
	}
</script>

<style lang="scss">
	.msgDetail {
		position: relative;
		background: #FFFFFF;
		padding: 15px;
		.bg {
			position: fixed;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			z-index: -1;
			background: #FFFFFF;
		}
		.title {
			h2 {
				width: 100%;
				margin-bottom: 15px;
				font-size: 15px;
				color: #2c2c2c;
			}
			span {
				font-size: 14px;
				color: #999999;
			}
		}
		.main {
			margin-top: 20px;
			line-height: 25px;
			color: #2c2c2c;
			font-size: 14px;
			text-align: justify;
			* {
				max-width: 100% !important;
			}
			span {
				color: #1e82d2;
			}
		}
	}
</style>