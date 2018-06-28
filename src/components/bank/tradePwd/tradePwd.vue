<template>
	<div class="tradePwd" >
		<div class="tips" v-text="tips"></div>
		    <ul class="mui-table-view">
				<li class="mui-table-view-cell"  @tap="btnModify">
					<a class="mui-navigate-right">
				       <div class="mui-ellipsis pad1">我记得原交易密码</div>
					</a>
				</li>
			</ul>
			<ul class="mui-table-view top14">
			  <li class="mui-table-view-cell"  @tap="btnReset">
					<a class="mui-navigate-right">
				       <div class="mui-ellipsis pad1">我忘记交易密码了</div>
					</a>
				</li>
			</ul>
	</div>
</template>

<script>
	export default {
		name: 'personalOpening',
		data() {
			return {
				tips:""
			}
		},
		methods: {
			btnModify(){
				this.setTradePwd(2);
				/*
				this.$router.push({
						name: "modifyPayPwd"
				})
				*/
			},
			btnReset(){
				/*
				this.$router.push({
						name: "resetPayPwd"
				})
				*/
				this.setTradePwd(3);
			},
			setTradePwd(type){
				this.loading = this.sui.wait(true, '请稍候...');
				this.sui.request('User/SetPayPassword', {tradeType:type}, "get", (data) => {
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
			var $this=this;
			$this.$nextTick(function () {
	    		var name=localStorage.getItem('qhlead_userMobile')||"";
	    		if($this.sui.IsNullOrEmpty(name)){
	    			$this.tips="你正在重置宜宾银行交易密码";
	    		}else{
	    			$this.tips="你正在为"+$this.sui.formatMobile(name)+"重置交易密码";
	    		}
	    	});
		},
		beforeDestroy() {
			this.loading = this.sui.closewait(this.loading);
		}
	}
</script>

<style lang="scss">
	.tradePwd{
		font-size: 15px;
	 .top14{
	      margin-top: 14px;
	 }
	 .tips{
		 padding: 15px 14px 14px 14px;
		}
		.pad1{color: #222222;}
     }
</style>