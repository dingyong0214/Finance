<template>
	<div class="withdraw">
		<div class="money-box">
			<router-link :to="{name:'text', query: { type: 1 }}" class="iconfont icon-wenhao" tag="i"></router-link>
			<p class="line border-1px">可提现金额：{{getAmount(money)}}</p>
			<p class="last">提现金额</p>
			<div class="input-box">
				<input type="text" value="" placeholder="请输入提现金额" @input="watchInput" v-model="withdraw.Amount" />
			</div>
		</div>
		<div class="type-box">
			<div class="type">
				<span>提现方式</span>
				<div class="checkbox-box">
					<div class="checkbox">
						<input class="radio" name="radio" type="radio" value="2" @change="countFee" v-model="withdraw.WithdrawKind">
						<label for="radio">一般提现</label>
					</div>
					<div class="checkbox">
						<input class="radio" name="radio" type="radio" value="3" @change="countFee" v-model="withdraw.WithdrawKind">
						<label for="radio">即时提现</label>
					</div>
				</div>
			</div>
		</div>
		<div class="fee">
			提现手续费：<span>{{getAmount(fee)}}</span>
		</div>
		<div class="btn-box">
			<button class="mui-btn mui-btn-primary mui-btn-block" @tap="sendRecharge">提现</button>
		</div>
		<div class="prompt">
			<p>温馨提示</p>
			<p>身份认证、账户托管开通、提现银行卡均设置成功后，才能进行提现操作。</p>
		</div>
		<!--<div id="huifu" v-html="huifu"></div>-->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//huifu: "",
				money: null,
				minAmount: null, //最小提现金额
				withdrawMoney: null, //提现金额
				fee: 0, //提现手续费
				withdraw: {
					Amount: null,
					WithdrawKind: 2,
					Channel: 2,
				},
				loading: null
			}
		},
		created: function() {
			this.loading = this.sui.wait(true, '正在加载');
			this.sui.request('Account/CanWithdrawAmount', {}, 'get', (data) => {
				this.loading = this.sui.closewait(this.loading);
				if(data) {
					if(data.IsPass) {
						this.money = data.ReturnObject;
						this.minAmount = data.ReturnObject2;
					} else {
						mui.toast(data.Desc)
					}
				}

			})
		},
		beforeDestroy: function() {
			this.loading = this.sui.closewait(this.loading);
		},
		methods: {
			watchInput() {
				//监听提现输入框
				clearInterval(this.withdrawMoney);
				this.withdrawMoney = setTimeout(this.countFee, 800)
			},
			countFee() {
				//获取提现手续费

				if(this.sui.IsNullOrEmpty(this.withdraw.Amount)) {
					this.fee = 0;
					return;
				} else if(!this.withdraw.Amount.isFloat()) {
					this.fee = 0;
					return;
				} else if(this.withdraw.Amount < this.minAmount) {
					this.fee = 0;
					return;
				} else if(this.withdraw.Amount > this.money) {
					this.fee = 0;
					return;
				}

				this.loading = this.sui.wait(true, '请稍候...');
				this.sui.request('Account/CountFee', {
					amount: this.withdraw.Amount,
					kind: this.withdraw.WithdrawKind
				}, 'get', (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						if(data.IsPass) {
							this.fee = data.ReturnObject;
						} else {
							mui.toast(data.Desc)
						}
					}
				})
			},
			sendRecharge() {
				if(this.sui.IsNullOrEmpty(this.withdraw.Amount)) {
					mui.toast("请输入提现金额");
					return false;
				} else if(!this.withdraw.Amount.isFloat()) {
					mui.toast("金额格式有误，最多可输入两位小数");
					return false;
				} else if(this.withdraw.Amount < this.minAmount) {
					mui.toast("提现金额不能小于" + this.minAmount + "(最小提现金额)元");
					return false;
				} else if(this.withdraw.Amount > this.money) {
					mui.toast("提现金额不能大于可提现金额");
					return false;
				}

				this.loading = this.sui.wait(true, '请稍候...');
				this.sui.request('Account/Withdraw', this.withdraw, 'post', (data) => {
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
				return value ? this.sui.rmoney(value) : '0';
			}
		}
	}
</script>

<style lang="scss">
	.withdraw {
		.money-box {
			margin: 22px 0 12px;
			background: #fff;
			.iconfont {
				padding: 5px;
				position: absolute;
				top: 30px;
				right: 15px;
				font-size: 20px;
				color: #2c2c2c;
				z-index: 10;
			}
			.line {
				@include border-1px(#E3E3EA);
			}
			.input-box {
				input {
					font-size: 20px;
					border: none;
					padding: 30px 15px;
					color: #000000;
					margin-bottom: 0;
					color: #2c2c2c;
				}
			}
			p {
				padding: 15px;
				color: #2c2c2c;
				&.last {
					padding-bottom: 0;
				}
			}
		}
		.type-box {
			position: relative;
			margin: 10px 0;
			background: #FFFFFF;
			span {
				display: inline-block;
				vertical-align: middle;
				margin-right: 25px;
				font-size: 16px;
				white-space: nowrap;
			}
			.type {
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
			}
		}
		.fee {
			margin-bottom: 35px;
			padding: 15px;
			color: #2c2c2c;
			background-color: #ffffff;
			span {
				color: #1e82d2;
			}
		}
		.btn-box {
			padding: 0 15px;
		}
		.prompt {
			padding: 34px 15px 0;
			font-size: 14px;
			p {
				margin-bottom: 10px;
				line-height: 22px;
			}
		}
	}
</style>