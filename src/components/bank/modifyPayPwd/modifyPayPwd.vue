<template>
	<div class="modifyPayPwd">
		
	</div>
</template>

<script>
	export default {
		name: 'modifyPayPwd',
		data() {
			return {
			}
		},
		methods: {
            plusReady:function(){
				this.loading = this.sui.wait(true, '请稍候...');
				this.sui.request('User/SetPayPassword', {tradeType:2}, "get", (data) => {
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
			this.plusReady();
		},
		beforeDestroy() {
			this.loading = this.sui.closewait(this.loading);
		}
	}
</script>

<style>
</style>