<template>
	<div class="businessAuth">
           <div class="bg">
           	 <img src="static/img/bankLogo.png" />
           	 <router-link :to="{name:'authExplain'}" class="iconfont icon-wenhao" tag="i"></router-link>
           </div>
           <div class="login">
			<div class="input_list mui-input-row ">
				<span class="tit wid96">开通授权业务</span>
				<input  type="text"  class="wid65" placeholder="请选择授权业务" readonly="readonly" value="授权投标、还款"/>
			</div>
			<div class="input_list mui-input-row ">
				<span class="tit">授权期限</span>
				<input  type="text"  placeholder="请选择授权期限"  readonly="readonly" value="2038年12月30日"/>
			</div>
			<div class="input_list mui-input-row ">
				<span class="tit wid92">授权金额(元)</span>
				<input  type="text" class="wid67"  placeholder="请输入授权金额"   v-model="postData.authAmount"/>
			</div>
			<div class="mui-input-row mui-checkbox mui-left">
				<label>我已阅读并同意</label>
				<input name="checkbox"  type="checkbox" v-model="postData.agree"/>
				<a @tap="btnRisk">《风险提示书》</a>
			</div>
			<div class="login_btn">
				<button type="button" class="mui-btn mui-btn-primary mui-btn-block" @tap="checkPayPassword">确定</button>
			</div>
		</div>
	</div>	
</template>

<script>
	export default {
		name: 'businessAuth',
		data() {
			return {
				postData:{
					agree:true,
					busiTradeType:"B04",
					authAmount: localStorage.getItem("qhlead_wx_authAmt") ||  "1000000",
					authTime:"2038-12-30",
					businessSeqNo:""
				}
			}
		},
		methods: {
			checkPayPassword:function(){
				//校验交易密码
				if(!this.postData.agree) {
					mui.toast('请阅读并同意《风险提示书》');
					return;
				}else if(this.sui.IsNullOrEmpty(this.postData.authAmount)){
					mui.toast('请输入授权金额');
					return;
				}else if(!this.postData.authAmount.isFloat()){
					mui.toast('请输入正确的授权金额,允许保留两位小数');
					return;
				}else if(parseFloat(this.postData.authAmount)<200000){
					mui.toast('授权金额不能低于200,000.00');
					return;
				}
				localStorage.setItem("qhlead_wx_authAmt",this.postData.authAmount);
				this.loading = this.sui.wait(true, '请稍候...');
				this.sui.request('User/CheckPayPassword', {operType:"B04",authority:'T99',authtime:this.postData.authTime}, "get", (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						var IsPass = data.IsPass;
						if(IsPass) {
							/*
							this.$router.push({
								name: "checkPayPassword",
								query: {
									page: "auth",
									pageUrl:data.ReturnObject
								}
							 });
							 */
							 location.href=data.ReturnObject;
						} else {
							mui.toast(data.Desc);
						}
					} 
				});
			},
			btnAuth:function(){
				//业务授权
				this.loading = this.sui.wait(true, '正在处理...');
				this.sui.request('User/SignOrRevokeAgreement', this.postData,"post", (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						var IsPass = data.IsPass;
						if(IsPass) {
						     mui.alert('授权成功',() => {
						     	this.$router.push({
									name: "user"
								 });
						    },'div');
						} else {
							mui.toast(data.Desc);
						}
					} 
				});
			},
			btnRisk:function(){
				//风险提示书
				this.$router.push({
						name: "riskNote"
				})
			}
		},
		created() {
			 if(this.$route.query.businessSeqNo) {
				this.postData.businessSeqNo=this.$route.query.businessSeqNo;
				this.btnAuth();
			}
		},
		beforeDestroy() {
			this.loading = this.sui.closewait(this.loading);
		}
	}
	
</script>

<style lang="scss">
	.businessAuth{
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
		    position: relative;
		    .icon-wenhao{position: absolute;top: 12px; right: 12px;z-index: 10; font-size: 17px;color: #FFFFFF;}
		     .icon-wenhao:active{opacity: .5;}
		}
		.bg img{width: 266px; }
		
		input::-webkit-input-placeholder{
		  color: #cbcbcb;
		  font-size: 16px;
		}
		
		.input_list{
			height: 50px;
			margin-bottom: 10px;
			position: relative;
		}
		.input_list:after{
		
			 content: "  "; 
			 position: absolute; 
			 width: 100%;
			 height: 1px;
			  border-bottom:1px solid #D3D3D3;
			  left: 0;
			  bottom: 0;
			 -webkit-transform: scaleY(.4);transform:scaleY(.4);
		}
		.input_list input{
			border:0 none;
			width: 75%;
			height: 49px;
		   color:#2C2C2C;
		   font-size: 16px;
		}
		.login{
			width:100%;
			padding:0 15px;
			margin-top: 30px;
		}
		
		.tit{width:65px;display: inline-block;color:#2C2C2C}
		.login_btn{
			display:block;
			height:50px;
			width:100%;
			margin-top:26px;
			
		}
		.mui-checkbox a {
		  color: #1E81D2;
		  font-size: 14px;
		  display: inline-block;
		}
		.mui-checkbox a:active {
		  opacity: .5;
		}
		.mui-checkbox label {
		  width: 124px !important;
		  padding-left: 26px !important;
		  font-size: 14px;
		  color: #A6A6A6;
		  height: 30px;
		  line-height: 22px;
		  padding-top: 12px !important;
		  padding-right: 0 !important;
		    padding-bottom: 20px;
		}
		.mui-checkbox input[type=checkbox]:before{font-size: 22px;}
		.mui-checkbox input[type=checkbox] {
			  left: 0 !important;
			  top:12px;
			
		  }
		
		.wid96{width: 96px !important;}
		.wid65{width: 65% !important;}
		.wid92{width: 92px !important;}
		.wid67{width: 66% !important;}
		
  }
</style>