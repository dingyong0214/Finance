<template>
	<div class="repayDetail" :class="{'repayDetail-p50':navBar}">
		<div class="list-box">
			<div class="item-box">
			  <ul>
			  <li @tap="investDetail(model.LoanId,model.LoanType,model.LoanName)">
			  		<div class="title border-1px">
					<h2>{{model.LoanName}}</h2>
				</div>
				<div class="main">
					<p>借款本金：<span>{{format(model.LoanAmount)}}</span></p>
					<p>待还总额：<span>{{format(model.DaiHuanTotal)}}</span></p>
					<p>贷款期数：<span>{{model.Period}}个月</span></p>
					<p>借款日期：<span>{{getDate(model.LoanDate)}}</span></p>
					<p>最后还款日期：<span>{{getDate(model.NextRefundDate)}}</span></p>
					<p>提前还款手续费：<span>{{format(model.TiQianFee)}}</span></p>
					<p>罚息：<span>{{format(model.FaXi)}}</span></p>
	
				</div>
			  </li>
			  </ul>
		</div>
			<ul>
				<!--还款状态：1-待还 2-还款中 3-已还 4-提前还款 5-逾期 6-逾期还款 7-垫付 -->
				<li class="" v-for="item in model.RefundDetailList" :class="{normal:item.State!=1 && item.State!=5 && item.State!=7}" @tap="investDetail(model.LoanId,model.LoanType,model.LoanName)">
					<div class="title border-1px">
						<label v-if="0">
							<input class="checkbox" type="checkbox" />
						</label>
						<h2>第{{item.Period}}期</h2>
					</div>
					<div class="main">
						<p>待还总额：<span>{{format(item.DaiHuan)}}</span></p>
						<p>状态：<span>{{getState(item.State)}}</span></p>
					</div>
				</li>

				<!--<li>
					<div class="title border-1px">
						<label v-if="0">
							<input class="checkbox" type="checkbox" />
						</label>
						<h2>安居贷-66171103</h2>
						<span>已还款</span>
					</div>
					<div class="main">
						<p>待还总额：<span>200000.00</span></p>
						<p>期数：<span>第2期</span></p>
					</div>
				</li>-->
			</ul>
		</div>
		<div class="btn-box also-btn" v-if="0">
			<div class="input-box">
				<label for="all">
					<input class="checkbox" type="checkbox" name="all" />全选
				</label>
			</div>
			<router-link tag='button' class="mui-btn mui-btn-primary mui-btn-block" :to="{name:''}">
				还款
			</router-link>
		</div>
		  <nav class="mui-bar mui-bar-tab "  v-show="navBar">
	        <button class="mui-btn mui-btn-block mui-btn-rightbottom"  @tap="btnRefund(1)" v-if="model.IsReturn" :class="{'mui-btn-primary':!model.IsAll}">还当期</button>
	        <button class="mui-btn mui-btn-block mui-btn-rightbottom mui-btn-primary" @tap="btnRefund(2)"  v-if="model.IsAll">全部还清</button>
		</nav>
		<div id="dialog-box" class="mui-popover mui-popover-action mui-popover-bottom"  :class="{'mui-active':isMasking}">
			<div class="dialog">
				<div class="title border-1px">
					{{refundTitle}}
					<i class="mui-icon mui-icon-closeempty" @tap="hide"></i>
				</div>
				<div class="repay-money">
					<h2>{{format(refundAmt)}}</h2>
					<span>还款金额</span>
				</div>
				<div class="money border-1px">
					<span class="name">账户余额：</span>
					<span class="val">{{format(availBal ) }}</span>
					<router-link :to="{name:'recharge'}" >去充值</router-link>
				</div>
				<div class="btn-box">
					<button class="mui-btn mui-btn-primary mui-btn-block" @tap="btnSure">确定</button>
				</div>
			</div>
		</div>
		<transition name="fade">
			<div id="masking" v-show="isMasking" class="masking" @tap="hide"></div>
		</transition>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				model: {
					RefundDetailList: []
				},
				availBal:0,
		    	refundAmt:0,
		    	loanId:null,
		    	isMasking:false,
		    	navBar:false,
		    	operType:1, //操作类型 1.还当期 2.还全部 
		    	refundTitle:"还当期"
			}
		},
		created() {
			this.loanId = this.$route.query.loanId;
			this.init();
		},
		beforeDestroy() {
			this.loading = this.sui.closewait(this.loading);
		},
		methods: {
			init(){
				this.sui.request("Refund/RefundPlanDetail", {
					loanId: this.loanId
				}, "get", (data) => {
					if(data) {
						if(data.IsPass) {
						   var obj=data.ReturnObject;
		    			   this.model=obj;
		    			   if(obj.AllRefundAmount>0 || obj.IsReturn || obj.IsAll){
		    			   	  this.navBar=true;
		    			   }
						} else {
							mui.toast(data.Desc);
						}
					}
				})
			},
			 isAuth(){
		    	mui.confirm('您尚未进行业务授权，授权确认方可进行下一步操作。',' ',['取消','立即授权'],(e)=>{
					if(e.index==1){
						this.$router.push({
							name: "businessAuth"
						});
					}
				},'div');
		    },
		   btnRefund(type){
			   	if(!this.model.IsAuth){
		    		this.isAuth();
		    		return;
		    	}
		    	//还款
		    		this.refundTitle=["还当期","全部还清"][type-1];
			    	this.operType=type;
			    	this.refundAmt=[this.model.CurrentRefundAmount,this.model.AllRefundAmount][type-1];
		    		this.loading = this.sui.wait(true, '请稍候...');
		    		this.sui.request('User/UserCenter',{},"get",(data)=>{
		    			this.loading = this.sui.closewait(this.loading);
		    			if(data){
		    				if(data.IsPass){
		    					this.availBal=data.ReturnObject.AvailAmount ||0;
		    					this.isMasking=true;
		    					//mui("#dialog-box").popover('toggle');
		    				}else{
		    					mui.toast(data.Desc);
		    				}
		    			}
		    		});
		    },
		    btnSure(){
		    		if(this.availBal<=0 || this.availBal<this.refundAmt){
		    			mui.toast('账户余额不足，请先充值');
		    			return;
		    		}
		    		this.loading = this.sui.wait(true, '请稍候...');
		    		this.sui.request('Refund/SaveUserRefund',{LoanId:this.loanId,OperType:this.operType},'post',(data)=>{
		    			this.loading = this.sui.closewait(this.loading);
		    			if(data){
		    				if(data.IsPass){
		    					//还款成功处理
		    					mui.toast('还款成功');
		    					this.isMasking=false;
		    					this.init();
		    					//mui("#dialog-box").popover('toggle');
		    					
		    				}else{
		    					if(data.StatusCode=='S1034'){
									this.isAuth();
								}else{
									mui.toast(data.Desc);
								}
		    				}
		    			}
		    		});
		    },
		    investDetail(id,type,name){
	    	   this.$router.push({
						name: "investDetail",
						query: {
							id: id,
							type: type,
							title: name
						}
					})
		    },
			show() {
				this.isMasking = true;
			},
			hide() {
				this.isMasking = false;
			},
			format(value) {
				return value ? this.sui.rmoney(value) : '0.00';
			},
			getDate(value) {
				//格式化日期
				return value ? this.sui.formatDate('y-m-d', value) : "-";
			},
			getState(value) {
				//还款状态：1-待还 2-还款中 3-已还 4-提前还款 5-逾期 6-逾期还款 7-垫付
				return ["待还款", "还款中", "已还款", "提前还款", "逾期", "逾期还款", "垫付"][value - 1];
			}
		}
	}
</script>

<style lang="scss">
	.repayDetail-p50{
		padding-bottom: 50px;
	}
	.repayDetail {
		.mui-small-btn {
		  width: 49px;
		  height: 26px;
		  line-height: 26px;
		  padding: 0;
		  text-align: center;
		  font-size: 14px;
		  margin-top: -5px;
		}
		.mui-bar-tab{  
				display: flex !important;
			  }
			.mui-bar-tab ~ .mui-content.calendardt {
			  padding-bottom: 0px;
			}
			
			.mui-bar-tab ~ .mui-content.pdstyle {
			  padding-bottom: 50px !important;
			}
			
			.mui-bar .mui-btn-block.mui-btn-rightbottom {
			  border-radius: 0 !important;
			  padding: 14px 0 !important;
			  flex: 1;
			  top: 0;
			  border: 0  !important;
			}
			.mui-btn:before{
				border: 0 ;
				 border-radius: 0 !important;
			}
			.btnCenter{
				position: relative;
			}
			.btnCenter:before{
			    border-left: 1px solid #ccc !important;
			    border-right: 1px solid #ccc !important;
			}
		.list-box {
			.item-box{
				background: #FFFFFF;
				ul{
					padding: 0 !important;
					li {
						line-height: 24px;
						margin-bottom: 0 !important;
					}
				}
			}
			ul {
				padding: 15px;
				li {
					position: relative;
					padding: 15px 15px 0;
					margin-bottom: 15px;
					background: #FFFFFF;
					font-size: 0;
					border-radius: 6px;
					&.normal {
						h2,
						span,
						p {
							color: #999999 !important;
						}
						/*input {
							&:before {
								color: #999999 !important;
							}
						}*/
					}
					.title {
						padding-bottom: 15px;
						@include border-1px(#e5e5e5);
						h2 {
							display: inline-block;
							vertical-align: middle;
							font-size: 16px;
							color: #2c2c2c;
							/*padding-left: 28px;*/
						}
						label {
							position: absolute;
							bottom: 0;
							height: 44px;
							line-height: 44px;
							text-align: center;
						}
						span {
							position: absolute;
							right: 15px;
							top: 0;
							color: #2c2c2c;
							font-size: 15px;
						}
					}
					.main {
						padding: 15px 0;
						p {
							display: inline-block;
							vertical-align: top;
							width: 50%;
							font-size: 12px;
							color: #999999;
							span {
								color: #2c2c2c;
							}
						}
					}
				}
			}
		}
		.btn-box {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			display: flex;
			background: #FFFFFF;
			z-index: 100;
			.input-box {
				position: relative;
				flex: 1;
				padding-left: 30px;
				label {
					display: inline-block;
					vertical-align: middle;
					height: 100%;
					line-height: 50px;
					input {
						margin-top: -1px;
						margin-right: 5px;
					}
				}
			}
			/*.mui-btn {
				width: 134px ;
				border-radius: 0;
				margin-bottom: 0;
			}*/
		}
			/*遮罩层 start*/
		.masking {
			position: fixed;
			z-index: 998;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background-color: rgb(0, 0, 0);
			transition: all .4s ease;
			opacity: 0.5;
		}
		.fade-enter-active,
		.fade-leave-active {
			transition: opacity .3s
		}
		.fade-enter,
		.fade-leave-to {
			opacity: 0
		}
		/*遮罩层 end*/
		.dialog {
			background: #FFFFFF;
			.title {
				position: relative;
				height: 44px;
				line-height: 44px;
				text-align: center;
				font-size: 18px;
				color: #2c2c2c;
				@include border-1px(#e5e5e5);
				.mui-icon {
					position: absolute;
					right: 18px;
					color: #999999;
					font-size: 43px;
				}
			}
			.repay-money {
				padding: 28px 0 23px;
				color: #2c2c2c;
				text-align: center;
				h2 {
					margin-bottom: 15px;
					font-size: 30px;
				}
				span {
					font-size: 14px;
				}
			}
			.money {
				/*padding: 15px 0;*/
				margin: 0 15px;
				@include border-1px(#e5e5e5);
				span,
				a {
					display: inline-block;
					vertical-align: middle;
					padding: 15px 0;
				}
				a {
					float: right;
				}
			}
			.btn-box {
				padding: 35px 15px 25px;
				position: static;
			}
		}
	}
</style>