<template>
	<div class="user">
		<div class="head-box">
			<div class="background">
				<img src="./user-bg.png" width="100%" />
				<div class="wave">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="150">
						<g fill="rgba(255,255,255,0.03)">
							<path d="M 0 70 Q 75 39, 150 70 T 300 70 T 450 70 T 600 70 T 750 70  T 900 70  T 1050 70 T 1200 70 T 1350 70 V 150 H 0 V 0"></path>
							<animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-300" dur="8s" repeatCount="indefinite"></animateTransform>
						</g>
						<g fill="rgba(255,255,255,0.045)">
							<path d="M 0 70 Q 87.5 47, 175 70 T 350 70 T 525 70 T 700 70 T 875 70 T 1050 70 T 1225 70 T 1400 70  T 1575 70  V 150 H 0 V 0"></path>
							<animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-350" dur="16s" repeatCount="indefinite"></animateTransform>
						</g>
						<g fill="rgba(255,255,255,0.057)" transform="translate(-903.868 0)">
							<path d="M 0 70 Q 135 36, 270 70 T 540 70 T 810 70 T 1080 70 T 1350 70 T 1620 70  V 150 H 0 V 0" transform="translate(-38.232284367796474, 0)"></path>
							<animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-540" dur="10s" repeatCount="indefinite"></animateTransform>
						</g>
					</svg>
				</div>
			</div>
			<div class="avatar-box" @click="link('myData')" tag="div">
				<div class="avatar">
					<img :src="userData.Photo || 'static/img/my-logo.png'" width="100%" />
				</div>
				<p class="text">{{userData.UserName||"请登录"}}</p>
			</div>
		</div>
		<div class="money-box">
			<p class="money">账户余额：<i>{{userData.AvailAmount||"0.00"}}</i></p>
			<div class="btn-box">
				<button class="mui-btn mui-btn-primary" @click="link('recharge')">充值</button>
				<button class="mui-btn mui-btn-primary mui-btn-outlined" @click="link('withdraw')">提现</button>
			</div>
		</div>
		<div class="list-box">
			<ul class="mui-table-view">

				<li class="mui-table-view-cell" @click="link('payCalendar')">
					<i class="iconfont icon-riliriqi2"></i>
					<span class="text">回款日历</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="link('myTransfer')">
					<i class="iconfont icon-zhuanrang-"></i>
					<span class="text">我的转让</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="link('coupon')">
					<i class="iconfont icon-quanqia"></i>
					<span class="text">我的卡券</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<!--<li class="mui-table-view-cell" @click="link('autoTender')">
					<i class="iconfont icon-toubiao"></i>
					<span class="text">自动投标</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>-->
				<li class="mui-table-view-cell" @click="link('myLoan')">
					<i class="iconfont icon-jiekuan"></i>
					<span class="text">我的借款</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
			</ul>
		</div>
		<div class="list-box">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" @click="link('recording',0)">
					<i class="iconfont icon-zijinjihua"></i>
					<span class="text">资金明细</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="link('recording',1)">
					<i class="iconfont icon-chongzhi"></i>
					<span class="text">充值记录</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="link('recording',2)">
					<i class="iconfont icon-tixian"></i>
					<span class="text">提现记录</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="link('ace')">
					<i class="iconfont icon-xing"></i>
					<span class="text">邀请奖励</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<!--<li class="mui-table-view-cell" @click="link('')">
					<i class="iconfont icon-shouyi"></i>
					<span class="text">生利宝</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>-->
			</ul>
		</div>
		<div class="list-box">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" :class="{msg:userData.MsgNum>0}" @click="link('message')">
					<i class="iconfont icon-xiaoxi"></i>
					<span class="text">消息</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="link('set',userData.IsSetBankPassword)">
					<i class="iconfont icon-shezhi"></i>
					<span class="text">设置</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
				<li class="mui-table-view-cell" @click="link('more')">
					<i class="iconfont icon-gengduo"></i>
					<span class="text">更多</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
			</ul>
		</div>
			<!--弹层 start -->
		 <div class="black_overlay"  :class="{'mui-hidden':mask}"></div>
		  <div class="mask_content" :class="{'mui-hidden':mask}">
		    <img  src="./bankBanner.png" class="mask-banner"/>
		    <div class="mask-content">
		    	<div class="bank-tips">开通银行存管账户，让您的资金更安全</div>
		        <div class="bank-process mui-popup-inner">
		            <div class="process">
		                <img src="./imgAuth.png" />
		                <span>开户</span>
		            </div>
		            <div class="process">
		                <img src="./imgPwd.png" />
		                <span>设置交易密码</span>
		            </div>
		            <div class="process">
		                <img src="./imgSafety.png" />
		                <span>授权</span>
		            </div>
		            <div class="process">
		                <img src="./imgCard.png" />
		                <span>绑卡</span>
		            </div>
		            <div class="process-line"></div>
		        </div>
                 <div class="mui-popup-buttons">
                 	<span class="mui-popup-button"  @tap="opening(1)">个人开户</span>
                 	<span class="mui-popup-button mui-popup-button-bold" @tap="opening(2)">企业开户</span>
                 </div>
		    </div>
		    <span class="mui-icon  mui-icon mui-icon-closeempty" @tap="closeMask"></span>
		</div>
		<!--弹层 end-->
	</div>
</template>

<script>
	export default {
		name: 'user',
		data() {
			return {
				userData: {},
				mask:true
			}
		},
		methods: {
			link(url, type) {
				if(url == "more" || this.sui.isLogin()) {
					if(url=="recharge" || url=="withdraw"){
						if(!this.userData.IsRealAuth){
				    		this.mask=false;
				    		return;
				    	}else if(!this.userData.IsSetBankPassword){
							//设置交易密码
							mui.confirm('您还未设置宜宾银行交易密码，请先设置','',['取消','立即设置'],(e) =>{
				    				if(e.index==1){
				    					this.$router.push({
											name: "setPayPwd"
										});
				    				}
				    			},'div');
			    			return;
						}else if(!this.userData.IsBandCard){
							//绑定银行卡
							mui.confirm('您还没有绑定银行卡，请先绑卡','',['取消','立即绑定'],(e) =>{
				    				if(e.index==1){
				    					 //先校验交易密码
			    	                     this.checkPayPwd("B01");
				    				}
				    			},'div');
			    			return;
						}
					}
					this.$router.push({
						name: url,
						query: {
							type: type
						}
					})
				} else {
					this.$router.push({
						name: "login"
					})
				}
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
		    closeMask(){
		    	this.mask=true;
		    },
		    opening(type){
		    	if(type==1){
		    		this.$router.push({
						name: "personalOpening"
					})
		    	}else{
		    		this.$router.push({
						name: "businessOpening"
					})
		    	}
		    	this.closeMask();
		    }
		},
		created() {
			if(this.$route.query.token) {
				this.sui.setToken(this.$route.query.token);
			}
			this.loading = this.sui.wait(true, '正在加载');
			this.sui.request('User/UserCenter', {}, "get", (data) => {
				this.loading = this.sui.closewait(this.loading);
				if(data) {
					if(data.IsPass) {
						data.ReturnObject.AvailAmount = this.sui.rmoney(data.ReturnObject.AvailAmount);
						this.userData = data.ReturnObject;
						if(!data.ReturnObject.IsRealAuth && this.sui.isLogin()){
				    		this.mask=false;
				    	}
						localStorage.setItem('qhlead_userPic', data.ReturnObject.Photo || "");
					}
				}
			})
		},
		beforeDestroy() {
			this.loading = this.sui.closewait(this.loading);
		}
	}
</script>

<style lang="scss">
	.user {
		padding-bottom: 50px;
		background: #f7f7f9;
		.head-box {
			position: relative;
			.background {
				width: 100%;
				overflow: hidden;
				font-size: 0;
				.wave {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
				}
			}
			.avatar-box {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				text-align: center;
				.avatar {
					display: inline-block;
					width: 75px;
					height: 75px;
					border-radius: 50%;
					overflow: hidden;
					background: #ebf6ff;
				}
				.text {
					margin-top: 18px;
					font-size: 14px;
					color: #f6f6f8;
				}
			}
		}
		.money-box {
			position: relative;
			margin-bottom: 10px;
			padding: 0 15px;
			height: 44px;
			line-height: 44px;
			background-color: #ffffff;
			font-size: 0;
			.money {
				display: inline-block;
				line-height: 46px;
				color: #333333;
				font-size: 14px;
				i {
					font-style: normal;
				}
			}
			.btn-box {
				position: absolute;
				right: 15px;
				top: 0;
				button {
					padding: 0;
					margin-left: 15px;
					vertical-align: middle;
					width: 50px;
					height: 28px;
					line-height: 28px;
				}
			}
		}
		.list-box {
			padding-bottom: 10px;
			.mui-table-view {
				.mui-table-view-cell {
					position: relative;
					padding: 0 15px;
					height: 44px;
					line-height: 44px;
					font-size: 0;
					overflow: initial;
					&:last-child {
						@include border-none();
					}
					&.msg {
						&:before {
							content: '';
							display: block;
							position: absolute;
							right: 45px;
							top: 50%;
							transform: translateY(-50%);
							width: 10px;
							height: 10px;
							border-radius: 50%;
							background-color: #ff3535;
						}
					}
					>div {
						height: 100%;
						overflow: hidden;
					}
					.iconfont {
						display: inline-block;
						vertical-align: top;
						margin-right: 15px;
						font-size: 20px;
						&.icon-zijinjihua {
							color: #ff7e00;
						}
						&.icon-chongzhi,
						&.icon-tixian,
						&.icon-bangzhu,
						&.icon-shezhi,
						&.icon-gengduo,
						&.icon-jiekuan,
						&.icon-toubiao,
						&.icon-riliriqi2,
						&.icon-zhuanrang-,
						&.icon-xiaoxi {
							color: #1e82d2;
						}
						&.icon-quanqia {
							color: #ff9c00;
						}
						&.icon-xing {
							color: #ff3535;
						}
						&.icon-shouyi {
							color: #00c305;
						}
					}
					.text {
						display: inline-block;
						vertical-align: top;
						font-size: 16px;
						line-height: 45px;
					}
					.mui-icon {
						position: absolute;
						line-height: 44px;
						right: 18px;
						color: #999999;
					}
				}
			}
		}
		/*遮罩层css*/
		.black_overlay {
		    position: fixed;
		    z-index: 998;
		    width: 100%;
		    height: 100%;
		    top: 0;
		    left: 0;
		    background: rgba(0,0,0,.3);
		}
		.mask_content {
		    position: fixed;
		    top: 50%;
		    left: 50%;
		    width: 320px;
		    height: 364px;
		    margin-top: -182px;
		    margin-left: -160px;
		    border-radius: 18px;
		    z-index: 1002;
		    overflow: hidden;
		    line-height: 18px;
		  .mask-banner {
		    display: block;
		    width: 100%;
		} 
		.mask_content .title {
		    text-align: center;
		    font-size: 18px;
		    font-weight: bold;
		    padding: 35px 0;
		    color: #4d4d4d;
		}
		
		 .mask-content {
		    height: 194px;
		    text-align: center;
		    font-size: 14px;
		    color: #4d4d4d;
		    background: #FFFFFF
		}
		.bank-process{position:relative;display: flex;display: -webkit-flex;display: -webkit-box;padding: 0 10px 18px 0;}
		
		
		.process{
		   width: 25%;
		   white-space: nowrap;
		    position:relative;
		    z-index:2
		}
		.process img{
			width: 54px;
		}
		.process span{
		    display: block;
		    font-size:12px;
		    color:#4d4d4d
		
		}
		.process-line {
		     position: absolute;
		     height: 1px;
		     background: #E9E9E9;
		     width:230px;
		      left: 35px;
		      top:27px
		  }
		.bank-tips{
			color: #999999 ;
			padding: 20px 0 15px 0 ;
			background: #FFFFFF

		}
		.mui-icon.mui-icon-closeempty{
		    position:absolute;
		    top:2px;
		    right:2px;
		    color: #FFFFFF;
		    font-size: 2.6em;
		}
		.mui-icon.mui-icon-closeempty:active{
			opacity: .5;
		}
		.mui-popup-button{color: #0077FE !important;}
		.mui-popup-button:active{opacity: .5;}
		.mui-popup-button-bold{font-weight: normal !important;}
	 }
	}
</style>