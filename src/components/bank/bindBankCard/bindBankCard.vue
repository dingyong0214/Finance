<template>
	<div class="bindBankCard">
		
	</div>
</template>

<script>
	export default {
		name: 'bindBankCard',
		data() {
			return {
			}
		},
		methods: {
            plusReady:function(businessSeqNo){
				this.loading = this.sui.wait(true, '请稍候...');
				this.sui.request('User/BindBankcard', {waterNo:businessSeqNo}, "get", (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						var IsPass = data.IsPass;
						if(IsPass) {
							 location.href=data.ReturnObject;
						} else {
							mui.toast(data.Desc);
						}
					}
				})
			}
		},
		created() {
			if(this.$route.query.businessSeqNo) {
				this.plusReady(this.$route.query.businessSeqNo);
			}
		},
		beforeDestroy() {
			this.loading = this.sui.closewait(this.loading);
		}
	}
	
</script>

<style>
</style>