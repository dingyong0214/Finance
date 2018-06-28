<template>
	<div class="unbindCardCallBack">
		
	</div>
</template>

<script>
	export default {
		name: 'unbindCardCallBack',
		data() {
			return {
			}
		},
		methods: {
            plusReady:function(seqNo){
				this.loading = this.sui.wait(true, '正在解绑...');
				this.sui.request('User/CustomerUntie',{businessSeqNo:seqNo,busiTradeType:"B02"}, "post",(data) =>{		
					this.loading = this.sui.closewait(this.loading);
					if(data){
						if(data.IsPass){	
							mui.alert('解绑成功',() => {
						     	this.$router.push({
									name: "bankCard"
								 });
						    },'div');
					    }else{
					      mui.toast(data.Desc);
					    }	
					}
				});	
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