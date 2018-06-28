<template>
	<div class="openingAccount">
           <div class="bg">
           	 <img src="static/img/bankLogo.png" />
           </div>
           <div class="btn-wrap">
				<button type="button" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined"  @tap="btnOpening(1)">个人开户</button>
				<button type="button" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined mtop" @tap="btnOpening(2)">企业开户</button>	
			</div>
	</div>	
</template>

<script>
	export default {
		name: 'openingAccount',
		data() {
			return {
			}
		},
		methods: {
			btnOpening:function(type){
		    	if(type==1){
		    		this.$router.push({
						name: "personalOpening"
				   })
		    	}else{
		    		this.$router.push({
						name: "businessOpening"
			    	})
		    	}
		    }
		}
	}
</script>

<style lang="scss">
	.openingAccount{
		background: #FFFFFF;
		position: fixed;
		width: 100%;
		top: 0;
		bottom: 0;
		.bg{
			background: #1E81D2; 
			width: 100%;
			height: 150px;
		     display: -webkit-flex;
		    display: flex;
		    -webkit-align-items: center;
		    align-items: center;
		    -webkit-justify-content: center;
		    justify-content: center;
		}
		.bg img{width: 266px; }
		
		.btn-wrap{width: 100%; padding: 40px 30px;margin-top: 30px;}
		.mtop{margin-top: 30px;}
	}
</style>