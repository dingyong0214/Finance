<template>
	<div class="openingSuccess">
               <div class="bg">
               	 <img src="static/img/bankLogo.png" />
               </div>
               <div class="login">
				<div class="success-box">
					<span class="mui-icon mui-icon-checkbox-filled"></span>
					<div class="title">存管账户开通成功</div>
					<div class="content">前海领投联手宜宾银行开通银行存管账户，让您的资金更安全</div>
				</div>
				<div class="login_btn">
					<button type="button" class="mui-btn mui-btn-primary mui-btn-block" @tap="btnPayPwd">设置交易密码</button>
					<div class="tips"> 为了账户安全，请跳转至宜宾银行存管设置交易密码</div>
				</div>
			</div>
		</div>		
</template>

<script>
	export default {
		name: 'personalOpening',
		data() {
		},
		methods: {
			btnPayPwd(){
				//设置交易密码
				this.$router.push({
						name: "setPayPwd"
				})
			}
		},
		created() {
		},
		beforeDestroy() {
		}
	}
</script>

<style lang="scss">
	.openingSuccess{
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
		
		
		.login{
			width:100%;
			padding:0 15px;
			margin-top: 35px;
		}
		
		.login_btn{
			display:block;
			height:50px;
			width:100%;
			margin-top:35px;
			
		}
		.success-box{text-align: center;}
		.mui-icon-checkbox-filled{
			font-size: 3.2em;
			color:#5CCE00
		}
		.title{
			padding-top: 15px;
		}
		.content{
			padding: 12px 38px;
			font-size: 14px;
		}
		.tips{
			color: #B5B5B5;
			font-size: 14px;
			text-align: center;
		}
	}
</style>