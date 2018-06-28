<template>
	<div class="bankCard">
		<ul>
			<li class="mui-table-view-cell" v-for="item in list">
				<div class="mui-slider-right mui-disabled">
					<a class="mui-btn mui-btn-primary" @tap="defaultCard(item.Id,$event)">默认</a>
					<a class="mui-btn mui-btn-red" @tap="del($event,item)">解绑</a>
				</div>
				<div class="mui-slider-handle">
					<svg class="icon" aria-hidden="true">
						<use :xlink:href="getBank(item.BankCode)"></use>
					</svg>
					<div class="content">
						<div class="name">
							<h2>{{item.BankName}}</h2>
							<div v-show="item.DefaultFlag==1" class="default">默认</div>
						</div>
						<p>{{item.CardNo}}</p>
					</div>
				</div>
			</li>
		</ul>
		<tips v-show="isTips"></tips>
		<button class="mui-btn mui-btn-primary mui-btn-block" @tap="addBank" v-show="canBind">绑定银行卡</button>
		<!--<div id="huifu" v-html="huifu"></div>-->
	</div>
</template>

<script>
	import tips from "@/common/components/tips/tips"

	export default {
		data() {
			return {
				list: [],
				isRealAuth: false,
				canBind:false,
				isSetBankPwd:false,
				isTips: false,
				loading: null,
				//huifu: "",
				iconObj: {
					"ICBC": "gongshangyinhang",
					"ABC": "zhongguonongyeyinhang",
					"CMB": "zhaoshangyinhang",
					"CCB": "jiansheyinhang",
					"BCCB ": "yinhang-beijingyinhang-",
					"BJRCB ": "changyonglogo09",
					"BOC": "104100000004",
					"BOCOM": "jiaotongyinhang",
					"CMBC": "minshengyinhang",
					"BOS": "shanghai",
					"CBHB": "bohaiyinhang",
					"CEB": "guangdayinhang",
					"CIB": "xingyeyinhang",
					"CITIC": "zhongxinyinhang",
					"CZB": "yinhang-zheshangyinhang-",
					"GDB": "guangfayinhang",
					"HKBEA": "dongyayinhang-",
					"HXB": "huaxiayinhang",
					"NJCB": "changyonglogo20",
					"PINGAN": "pinganyinhang",
					"PSBC": "youzhengyinhang",
					"SDB": "shenzhenfazhanyinhang-",
					"SPDB": "pufayinhang",
					"SRCB": "shanghainongshangyinhang",
    		        "YINLIAN":"yinlian"
				}
			}
		},
		created: function() {
		    this.init();
		},
		beforeDestroy: function() {
			this.loading = this.sui.closewait(this.loading);
			mui.closePopups();
		},
		methods: {
			init(){
					this.loading = this.sui.wait(true, '正在加载');
					this.sui.request("User/BankCardList ", {}, "get", (data) => {
						this.loading = this.sui.closewait(this.loading);
						if(data) {
							if(data.IsPass) {
								this.isRealAuth = data.ReturnObject.IsRealAuth;
			    				this.canBind=data.ReturnObject.AuthType==2?false:true;
			    				this.isSetBankPwd=data.ReturnObject.IsSetBankPassword || false;
			    				var leng=data.ReturnList.length;
								if(leng) {
									if(leng>=5){
										this.canBind=false;
									}
									this.list = JSON.parse(JSON.stringify(data.ReturnList));
									this.list.forEach((item) => {
										item.CardNo = this.formatCard(item.CardNo);
									})
								} else {
									this.isTips = true;
								}
							} else {
								mui.toast(data.Desc)
							}
						}
					})
			},
			//获取银行icon
			getBank(BankCode) {
				return '#icon-' + this.iconObj[BankCode];
			},
			addBank() {
				if(!this.isRealAuth) {
					mui.confirm('您还没有开通银行存管账户，请先开通', '', ['取消', '立即开通'], (e) => {
						if(e.index == 1) {
							 this.$router.push({
								name: "openingAccount"
							 });
						}
					});
					return;
				}else if(!this.isSetBankPwd) {
					mui.confirm('您还未设置宜宾银行交易密码，请先设置', '', ['取消', '立即设置'], (e) => {
						if(e.index == 1) {
							 this.$router.push({
									name: "setPayPwd"
							});
						}
					});
					return;
				}
				this.checkPayPwd("B01");
			},
			del(event, item) {
				var mli = event.target.parentNode.parentNode;
		    	if(!this.canBind){
		    		mui.toast('企业用户暂不能解绑银行卡');
					setTimeout(function() {
						mui.swipeoutClose(mli);
					}, 0);
		    		return;
		    	}
				//删除银行卡
				mui.confirm('', '确认解绑该银行卡吗？', (e) => {
					if(e.index == 1) {
						this.checkPayPwd("B02",item.CardNo);
					}else{
						setTimeout(function() {
							mui.swipeoutClose(mli);
						}, 0);
					}
				})
			},
			 defaultCard:function(cardId,event){
		    	var mli = event.target.parentNode.parentNode;
				mui.confirm('', '确认要将该银行卡设为默认卡吗？', (e) => {
					if(e.index == 1) {
						this.loading = this.sui.wait(true, '请稍候...');
						this.sui.request('User/SetDefaultBankCard', {id:cardId},"get",(data) =>{
							this.loading = this.sui.closewait(this.loading);
							if(data) {
								var IsPass = data.IsPass;
								if(IsPass) {
									  mui.toast("设置成功");
									  setTimeout(()=> {
										mui.swipeoutClose(mli);
										this.init();
									}, 0);
								} else {
									mui.toast(data.Desc);
								}
							} 
					});
					}else{
						setTimeout(()=> {
							mui.swipeoutClose(mli);
						}, 0);
					}
				})
		    },
			checkPayPwd(operType,cardNo){
		    	this.loading = this.sui.wait(true, '请稍候...');
		    	var postData={operType:operType};
		    	if(operType=="B02"){
		    		postData.cardNo=cardNo;
		    	}
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
			formatCard(Card) {
				//格式化银行卡号
				return Card.replace(/^\d{12}/, '•••• •••• •••• ');
			}
		},
		components: {
			tips
		}
	}
</script>

<style lang="scss">
	.bankCard {
		padding-bottom: 50px;
		ul {
			padding: 10px;
			li {
				position: relative;
				margin-bottom: 10px;
				padding: 20px;
				border-radius: 6px;
				background: #FFFFFF;
				.mui-slider-right {
					.mui-btn {
						padding: 0 20px;
					}
				}
				.mui-slider-handle {
					>div {
						display: inline-block;
						vertical-align: top;
					}
					/*.iconfont {
						margin-right: 18px;
						font-size: 40px;
						color: #067e69;
					}*/
					.content {
						.name {
							margin-bottom: 15px;
							position: relative;
							h2 {
								font-size: 16px;
							}
							.default {
								position: absolute;
								top: -2px;
								right: -44px;
								width: 44px;
								height: 18px;
								line-height: 17px;
								text-align: center;
								font-size: 12px;
								color: #1e82d2;
								border-radius: 25px;
								border: solid 1px #1e82d2;
							}
						}
						p {
							font-size: 16px;
							color: #2c2c2c;
						}
					}
				}
				&:after {
					display: none;
				}
			}
		}
		.mui-btn {
			position: fixed;
			bottom: 0;
			border-radius: 0;
			margin-bottom: 0;
		}
		.icon {
			margin-right: 18px;
			width: 45px;
			height: 45px;
		}
	}
</style>