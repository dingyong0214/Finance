<template>
	<div class="repayCalendarDTL">
		<ul class="head">
			<li>
				<p>待还总额</p>
				<span>{{format(model.TotalAmount)}}</span>
			</li>
			<li>
				<p>还款日期</p>
				<span>{{getDate(this.$route.query.oDate)}}</span>
			</li>
		</ul>
		<div class="list-box">
			<ul>
				<!--还款状态：1-待还 2-还款中 3-已还 4-提前还款 5-逾期 6-逾期还款 7-垫付 -->
				<li v-for="item in model.RefundPlan" :class="{normal:item.State!=1 && item.State!=5 && item.State!=7}" @tap="refundDetail(item.LoanId)">
					<div class="title border-1px">
						<label v-if="0">
							<input class="checkbox" type="checkbox" />
						</label>
						<h2>{{item.Name}}</h2>
						<span v-if="item.State!=1 && item.State!=5 && item.State!=7">{{getState(item.State)}}</span>
						<button class="mui-btn mui-btn-primary mui-small-btn mui-pull-right" type="button" @tap.stop="refundDetail(item.LoanId)" v-if="item.State==1 || item.State==5 || item.State==7">还款</button>
					</div>
					<div class="main">
						<p>待还总额：<span>{{format(item.TotalAmount)}}</span></p>
						<p>期数：<span>第{{item.CurrentPeriod}}期</span></p>
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
		
		<div id="dialog-box" class="mui-popover mui-popover-action mui-popover-bottom"  :class="{'mui-active':isMasking}">
			<div class="dialog">
				<div class="title border-1px">
					还款
					<i class="mui-icon mui-icon-closeempty" @tap="hide"></i>
				</div>
				<div class="repay-money">
					<h2>{{getAmount(refundAmt)}}</h2>
					<span>还款金额</span>
				</div>
				<div class="money border-1px">
					<span class="name">账户余额：</span>
					<span class="val">{{getAmount(availBal ) }}</span>
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
				currDate: this.$route.query.oDate,
				model: {
					RefundPlan: []
				},
				availBal:0,
		    	refundAmt:0,
		    	refundId:null,
		    	isMasking:false,
			}
		},
		created() {
			this.init();
		},
		beforeDestroy() {
			this.loading = this.sui.closewait(this.loading);
		},
		methods: {
			init(){
				this.sui.request("Refund/CurrentRefundPlan", {
					currDate: this.currDate
				}, "get", (data) => {
					if(data) {
						if(data.IsPass) {
							this.model = data.ReturnObject;
						} else {
							mui.toast(data.Desc);
						}
					}
				})
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
		    refundDetail(loanId){
		    	 this.$router.push({
						name: "repayDetail",
						query: {
							loanId: loanId
						}
					})
		    },
		   btnRefund(refundId){
		    	//还款
		    	//if(vm.checkedIds.length){
		    		//此版本不做还款功能，暂时隐藏
		    		this.refundId=refundId;
		    		this.loading = this.sui.wait(true, '请稍候...');
		    		this.sui.request('Refund/RefundAmount',{refundIds:refundId},"get",(data)=>{
		    			this.loading = this.sui.closewait(this.loading);
		    			if(data){
		    				if(data.IsPass){
		    					this.availBal=data.ReturnObject||0;
		    					this.refundAmt=data.ReturnObject2||0;
		    					this.isMasking=true;
		    					//mui("#dialog-box").popover('toggle');
		    				}else{
		    					mui.toast(data.Desc);
		    				}
		    			}
		    		});
		    	//}else{
		    		//mui.toast('请选择需要还款的项目');
		    	//}
		    },
		    btnSure(){
		    	//if(vm.checkedIds.length){
		    		//此版本不做还款功能，暂时隐藏
		    		if(this.availBal<=0 || this.availBal<this.refundAmt){
		    			mui.toast('账户余额不足，请先充值');
		    			return;
		    		}
		    		this.loading = this.sui.wait(true, '请稍候...');
		    		this.sui.request('Refund/SaveUserRefund',{RefundIds:this.refundId},'post',(data)=>{
		    			this.loading = this.sui.closewait(this.loading);
		    			if(data){
		    				if(data.IsPass){
		    					//还款成功处理
		    					mui.toast('还款成功');
		    					this.isMasking=false;
		    					this.init();
		    					//mui("#dialog-box").popover('toggle');
		    					
		    				}else{
		    					mui.toast(data.Desc);
		    				}
		    			}
		    		});
		    	//}else{
		    		//mui.toast('请选择需要还款的项目');
		    	//}
		    },
			getAmount(value) {
				return this.sui.rmoney(value);
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
				return ["待还", "还款中", "已还", "提前还款", "逾期", "逾期还款", "垫付"][value - 1];
			}
		}
	}
</script>

<style lang="scss">
	.repayCalendarDTL {
		padding-top: 100px;
		/*padding: 100px 0 50px;*/
		.mui-small-btn {
		  width: 49px;
		  height: 26px;
		  line-height: 26px;
		  padding: 0;
		  text-align: center;
		  font-size: 14px;
		  margin-top: -5px;
		}
		.head {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			display: flex;
			padding: 25px 0;
			background-color: #1e82d2;
			z-index: 100;
			li {
				position: relative;
				flex: 1;
				text-align: center;
				color: #FFFFFF;
				font-size: 16px;
				p {
					margin-bottom: 18px;
					color: #FFFFFF;
				}
				&:after {
					content: '';
					position: absolute;
					right: -1px;
					top: 3px;
					bottom: 3px;
					width: 1px;
					border-left: 1px solid #FFFFFF;
					@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio:1.5) {
						transform: scaleX(0.7);
						-webkit-transform: scaleX(0.7);
					}
					@media (-webkit-min-device-pixel-ratio:2),
					(min-device-pixel-ratio:2) {
						transform: scaleX(0.5);
						-webkit-transform: scaleX(0.5);
					}
					@media (-webkit-min-device-pixel-ratio:3),
					(min-device-pixel-ratio:3) {
						-webkit-transform: scaleX(.35);
						transform: scaleX(.35);
					}
				}
				&:last-child {
					@include border-none()
				}
			}
		}
		.list-box {
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