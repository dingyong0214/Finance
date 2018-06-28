<template>
	<div class="recharge">
		<div class="item-box">
			<ul>
				<li class="mui-table-view-cell">
					<span>账户余额</span>
					<span>{{getAmount(model.AvailBal)}}</span>
				</li>
				<li class="mui-table-view-cell">
					<span>充值金额</span>
					<input type="text" v-model="postData.Amount" placeholder="请输入充值金额" />
				</li>
			</ul>
		</div>
		<div class="item-box mui-hidden">
			<div class="item">
				<span>充值类型</span>
				<div class="checkbox-box">
					<div class="checkbox">
						<input name="radio" type="radio" class="radio" v-model="postData.RechargeKind" value="3">
						<label for="radio">网银充值</label>
					</div>
					<div class="checkbox">
						<input name="radio" type="radio" class="radio" v-model="postData.RechargeKind" value="1">
						<label for="radio">快捷充值</label>
					</div>
				</div>
			</div>
		</div>
		<div class="btn-box">
			<button class="mui-btn mui-btn-primary mui-btn-block" @tap="sendRecharge">充值</button>
		</div>
		<div class="prompt">
			<p>温馨提示</p>
			<p>1.您使用手机银行进行充值可能会收到不同银行的限制。如需大额充值建议登录前海领投官网进行操作。</p>
			<p>2.目前绑定快捷银行卡中，不支持快捷充值的银行包括招商银行、农业银行、民生银行、华夏银行。</p>
		</div>
		<!--<div id="huifu" v-html="huifu"></div>-->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//huifu: "",
				picker: null,
				loading: null,
				postData: {
					Amount: null,
					Channel: 2,
					//1-快捷充值，2-企业网银，3-个人网银
					RechargeKind: 1,
				},
				model: {
					OnlineBank: [], //个人网银
					QuickBank: [] //快捷充值
				}
			}
		},
		methods: {
			sendRecharge() {
				//充值
				if(this.sui.IsNullOrEmpty(this.postData.Amount)) {
					mui.toast("请输入充值金额");
					return;
				} else if(!this.postData.Amount.isFloat()) {
					mui.toast("金额格式有误，最多可输入两位小数");
					return;
				} else if(Number(this.postData.Amount) < Number(this.model.MinAmount)) {
					mui.toast("充值金额不能小于" + this.model.MinAmount + "(最小充值金额)元");
					return;
				}
				this.loading = this.sui.wait(true, '请稍候...');
				this.sui.request('Account/Recharge', this.postData, "post", (data) => {
				    this.loading = this.sui.closewait(this.loading);
					if(data) {
						if(data.IsPass) {
							location.href=data.ReturnObject;
							//this.huifu = data.ReturnObject;
							//this.$nextTick(() => {
								//document.getElementById('HuiFuForm').submit();
							//})
						} else {
							var sCode=data.StatusCode;
							if(sCode == 'S0014') {
								mui.confirm('您还没有开通银行存管账户，请先开通', '', ['取消', '立即开通'], (e) => {
									if(e.index == 1) {
										this.$router.push({
											name: "openingAccount"
								    	});
										/*
										this.loading = this.sui.wait(true, '正在加载');
										this.sui.request('User/RealAuth', {
											channel: 2
										}, 'get', (data) => {
											this.loading = this.sui.closewait(this.loading);
											if(data) {
												if(data.IsPass) {
													this.huifu = data.ReturnObject;
													this.$nextTick(() => {
														document.getElementById('HuiFuForm').submit();
													})
												}
											}
										})
										*/
									}
								});
							}else if(sCode=='S0052'){
								//设置交易密码
								mui.confirm('您还未设置宜宾银行交易密码，请先设置','',['取消','立即设置'],(e) =>{
				    				if(e.index==1){
				    					this.$router.push({
											name: "setPayPwd"
										});
				    				}
				    			},'div');
							}else if(sCode=='S2024'){
								//绑定银行卡
								mui.confirm('您还没有绑定银行卡，请先绑卡','',['取消','立即绑定'],(e) =>{
				    				if(e.index==1){
				    					 //先校验交易密码
			    	                     this.checkPayPwd("B01");
				    				}
				    			},'div');
							}else if(sCode=='S2032'){
								 mui.alert(data.Desc,() =>{
							    	this.$router.go(-1);
							    },'div');
					    	}else{
								mui.toast(data.Desc);
							}
						}
					}
				})
			},
			checkPayPwd(operType){
		    	this.loading = this.sui.wait(true, '请稍候...');
		    	var postData={operType:operType};
		    	this.sui.request('User/CheckPayPassword', postData,"get",(data) =>{
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						var IsPass = data.IsPass;
						if(IsPass) {
							 location.href=data.ReturnObject;
						} else {
							mui.toast(data.Desc);
						}
					} 
				});
		    },
			//格式化函数：
			getAmount(value) {
				return value >= 0 ? this.sui.rmoney(value) : null;
			}
		},
		created: function() {
			this.loading = this.sui.wait(true, '正在加载');

			this.sui.request('Account/RechargeInfo', {}, 'get', (data) => {
				this.loading = this.sui.closewait(this.loading);
				if(data) {
					if(data.IsPass) {
						this.model = data.ReturnObject;
						this.picker = new mui.PopPicker();
					} else {
						mui.toast(data.Desc)
					}
				}
			})
		},
		beforeDestroy: function() {
			this.loading = this.sui.closewait(this.loading);
			this.picker.dispose();
			this.picker = null;
		}
	}
</script>

<style lang="scss">
	.recharge {
		.item-box,
		.bank-box {
			position: relative;
			margin-top: 20px;
			background: #FFFFFF;
			.tip {
				position: absolute;
				left: 15px;
				top: 54px;
				font-size: 14px;
				line-height: 15px;
			}
			span {
				display: inline-block;
				vertical-align: middle;
				margin-right: 25px;
				font-size: 16px;
				white-space: nowrap;
			}
			.mui-table-view-cell {
				display: flex;
				position: relative;
				padding: 0 15px;
				height: 44px;
				line-height: 44px;
				font-size: 0;
				input {
					flex: 1;
					padding-left: 0;
					margin: 0;
					height: 100%;
					color: #2c2c2c;
					border: none;
					font-size: 16px;
				}
			}
			.item {
				display: flex;
				padding: 0 15px;
				height: 44px;
				line-height: 44px;
				font-size: 0;
				.checkbox-box {
					flex: 1;
					display: flex;
					white-space: nowrap;
					.checkbox {
						flex: 1;
						position: relative;
						display: inline-block;
						vertical-align: middle;
						height: 100%;
						font-size: 0;
						&:last-child {
							margin-right: 0;
						}
						label {
							margin-left: 30px;
							display: inline-block;
							vertical-align: middle;
							font-size: 16px;
						}
					}
				}
				.mui-icon {
					position: absolute;
					line-height: 44px;
					right: 18px;
					color: #999999;
				}
			}
		}
		.item-box {
			.mui-table-view-cell {
				background: #FFFFFF !important;
			}
		}
		.btn-box {
			margin: 50px 0 44px;
			padding: 0 15px;
		}
		.prompt {
			padding: 0 15px;
			font-size: 14px;
			p {
				margin-bottom: 10px;
				line-height: 22px;
			}
		}
	}
</style>