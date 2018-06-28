<template>
	<div class="businessOpening" >
               <div class="bg">
               	 <img src="static/img/bankLogo.png" />
               </div>
               <div class="login">
				<div class="input_list mui-input-row ">
					<span class="tit">公司名称</span>
					<input  type="text" placeholder="请输入公司名称" v-model="postData.companyName" />
				</div>
				<div class="input_list mui-input-row " >
					<span class="tit wid128" >统一社会信用编码</span>
					<input  type="text" class="wid54"  placeholder="请输入统一社会信用编码" v-model="postData.uniSocCreCode" />
				</div>
				<div class="input_list mui-input-row ">
					<span class="tit">住所</span>
					<input  type="text"  placeholder="请输入营业执照住所" v-model="postData.bizLicDomicile"/>
				</div>
				<div class="input_list mui-input-row ">
					<span class="tit">成立日期</span>
					<a class="mui-navigate-right" @tap="btnPicker">
						<input  type="text"  placeholder="请选择成立日期" readonly="readonly" v-model="postData.dateOfEst"/>
					</a>
				</div>
				<div class="input_list mui-input-row ">
					<span class="tit">法人姓名</span>
					<input  type="text"  placeholder="请输入法人姓名" v-model="postData.username"/>
				</div>
				<div class="input_list mui-input-row ">
					<span class="tit">身份证号</span>
					<input  type="text"  placeholder="请输入身份证号" v-model="postData.certNo"/>
				</div>
				<div class="input_list mui-input-row ">
					<span class="tit wid98">对公银行名称</span>
					<input  type="text" class="wid64"  placeholder="请输入对公银行名称" v-model="postData.corpAccBankNm"/>
				</div>
				<div class="input_list mui-input-row ">
					<span class="tit wid98" >对公银行行号</span>
					<input  type="text" class="wid64"  placeholder="请输入对公银行行号"  v-model="postData.corpAccBankNo"/>
				</div>
				<div class="input_list mui-input-row ">
					<span class="tit">对公账号</span>
					<input  type="text"  placeholder="请输入对公账号" v-model="postData.corpacc"/>
				</div>
				<div class="mui-input-row mui-checkbox mui-left">
					<label>我已阅读并同意</label>
					<input name="checkbox"  type="checkbox" v-model="postData.agree"/>
					<a @tap="btnAgree">《企业开户协议》</a><a @tap="btnRisk">《风险提示书》</a>
				</div>
				<div class="login_btn">
					<button type="button" class="mui-btn mui-btn-primary mui-btn-block" @tap="btnOpening" >立即开通</button>
				</div>
			</div>
		</div>		
</template>

<script>
		export default {
		name: 'businessOpening',
		data() {
			return {
				postData:{
					agree:true,
					username:"",
					certNo:"",
					ctype:"01",
					busiTradeType:"U04",
					companyName:"",
					uniSocCreCode:"",
					bizLicDomicile:"",
					dateOfEst:"",
					corpacc:"",
					corpAccBankNm:"",
					corpAccBankNo:""
				},
				picker:null
			}
		},
		methods: {
             btnOpening:function(){
				//企业开户
				if(!this.postData.agree) {
					mui.toast('请阅读并同意《企业开户协议》');
					return;
				}else if(this.sui.IsNullOrEmpty(this.postData.companyName)) {
					mui.toast('请输入公司名称');
					return;
				} else if(this.sui.IsNullOrEmpty(this.postData.uniSocCreCode)) {
					mui.toast('请输入统一社会信用编码');
					return;
				} else if(this.sui.IsNullOrEmpty(this.postData.bizLicDomicile)) {
					mui.toast('请输入营业执照住所');
					return;
				} else if(this.sui.IsNullOrEmpty(this.postData.dateOfEst)) {
					mui.toast('请选择成立日期');
					return;
				}else if(this.sui.IsNullOrEmpty(this.postData.username)) {
					mui.toast('请输入法人姓名');
					return;
				}else if(this.sui.IsNullOrEmpty(this.postData.certNo)) {
					mui.toast('请输入身份证号码');
					return;
				} else if(!this.sui.checkIdCard(this.postData.certNo)) {
					mui.toast('请输入正确的身份证号码');
					return;
				} else if(this.sui.IsNullOrEmpty(this.postData.corpAccBankNm)) {
					mui.toast('请输入对公银行名称');
					return;
				} else if(this.sui.IsNullOrEmpty(this.postData.corpAccBankNo)) {
					mui.toast('请输入对公银行行号');
					return;
				}  else if(this.sui.IsNullOrEmpty(this.postData.corpacc)) {
					mui.toast('请输入对公账号');
					return;
				} 
				this.loading = this.sui.wait(true, '请稍候...');
				this.sui.request('User/CustomerRegister', this.postData, "post", (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						var IsPass = data.IsPass;
						if(IsPass) {
						     this.$router.push({
								name: "openingSuccess"
							  });
						} else {
							mui.toast(data.Desc);
						}
					}
				})
			},
			btnPicker:function(){
				//日期选择器
				document.activeElement.blur();
			    this.picker.show(function(rs) {
			    	this.postData.dateOfEst=rs.t;
				});
			},
			btnAgree:function(){
				//个人开户协议
				this.$router.push({
						name: "openingProtocol"
				})
			},
			btnRisk:function(){
				//风险提示书
				this.$router.push({
						name: "riskNote"
				})
			}
		},
		created() {
			this.picker=new mui.DtPicker({"type":"date","beginYear":1980});
		},
		beforeDestroy() {
			this.loading = this.sui.closewait(this.loading);
			this.picker.dispose();
			this.picker = null;
		}
	}
</script>

<style lang="scss">
	.businessOpening{
		background: #FFFFFF;
		padding-bottom: 30px;
	
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
	
	.wid128{width: 128px !important;}
	.wid54{width: 54% !important;}
	.wid98{width: 98px !important;}
	.wid64{width: 64% !important;}
	
	}

</style>