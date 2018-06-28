<template>
	<div class="xieyi">
		<div class="contract" v-for="item in arr">
			<h2>{{item.name}}</h2>
			<span class="date">{{getDate(item.time)}}</span>
			<a class="btn" :href="item.fileUrl">查看</a>
		</div>
		<tips v-show="isTips"></tips>
	</div>
</template>

<script>
	import tips from "@/common/components/tips/tips"

	export default {
		data() {
			return {
				arr: [],
				isTips: false
			}
		},
		created: function() {
			this.sui.request("Invest/ContractList", {
				loanId: this.$route.query.loanId,
				tenderDetailId: this.$route.query.detailId
			}, "get", (data) => {
				if(data) {
					if(data.IsPass) {
						var list = [];
						if(data.ReturnList && data.ReturnList.length > 0) {
							for(var i = 0, item; item = data.ReturnList[i++];) {
								list.push({
									"name": item.MainName,
									"fileUrl": item.ContractUrl,
									"time": item.InsertTime
								});
								if(!this.sui.IsNullOrEmpty(item.AttachmentName1) && !this.sui.IsNullOrEmpty(item.AttachmentAddress1)) {
									list.push({
										"name": item.AttachmentName1,
										"fileUrl": item.AttachmentAddress1,
										"time": item.InsertTime
									});
								}
								if(!this.sui.IsNullOrEmpty(item.AttachmentName2) && !this.sui.IsNullOrEmpty(item.AttachmentAddress2)) {
									list.push({
										"name": item.AttachmentName2,
										"fileUrl": item.AttachmentAddress2,
										"time": item.InsertTime
									});
								}
							}
							this.arr = list;
						} else {
							this.isTips = true;
						}
					} else {
						mui.toast(data.Desc);
					}
				}
			})
		},
		methods: {
			getDate(date) {
				return this.sui.formatDate('y-m-d h:i:s', date);
			}
		},
		components: {
			tips
		}
	}
</script>

<style lang="scss">
	.xieyi {
		padding: 10px;
		.contract {
			position: relative;
			margin-bottom: 10px;
			padding: 15px;
			background: #FFFFFF;
			border-radius: 6px;
			h2 {
				margin-bottom: 18px;
				font-size: 15px;
				color: #2c2c2c;
			}
			.date {
				font-size: 12px;
				color: #999999;
			}
			.btn {
				position: absolute;
				right: 15px;
				top: 50%;
				transform: translateY(-50%);
				font-size: 15px;
				color: #1e82d2;
			}
		}
	}
</style>