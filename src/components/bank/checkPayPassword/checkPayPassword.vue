<template>
	<div class="checkPayPassword">
		
	</div>
</template>

<script>
	export default {
		name: 'checkPayPassword',
		data() {
			return {
				page:"",
	        	pageUrl:""
			}
		},
		methods: {
		},
		created() {
			if(this.$route.query.pageUrl) {
			       location.href=this.$route.query.pageUrl;
			}
		},
		beforeDestroy() {
			this.loading = this.sui.closewait(this.loading);
		}
	}
	
</script>

<style>
</style>