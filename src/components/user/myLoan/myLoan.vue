<template>
	<div class="myLoan">
		<div class="tabs border-1px">
			<ul>
				<li :class="{'active':currentIndex === 0}" @tap="tabItem(0)">借款记录</li>
				<li :class="{'active':currentIndex === 1}" @tap="tabItem(1)">还款记录</li>
				<!--<li :class="{'active':currentIndex === 2}">还款日历</li>-->
				<li @tap="toCal">还款日历</li>
			</ul>
		</div>
		<div class="mui-scroll-wrapper mui-content" id="pullrefresh" style="top: 45px;" ref="pullrefresh" :class="{bottom50:currentIndex === 0}">
			<div class="mui-scroll">
				<div class="list-box">
					<ul v-show="currentIndex === 0" class="loan">
						<li v-for="item in loan.list" @tap="investDetail(item.Id,item.LoanType,item.Name)">
							<div class="mui-table-view-cell">
								<div class="title border-1px">
									<h2>{{item.Name}}</h2>
									<span class="status">{{getState(item.State)}}</span>
								</div>
								<div class="main">
									<div>借款金额：<span>{{getAmount(item.Amount)}}</span></div>
									<div>借款利率：<span>{{getRate(item.Rate)}}%</span></div>
									<div>借款期限：<span>{{getTerm(item.LoanTerm,item.LoanTermUnit)}}</span></div>
									<div>借款用途：<span>{{item.Purpose}}</span></div>
									<div>借款时间：<span>{{getDate(item.Uptime)}}</span></div>
									<div>管理费率：<span>{{getFeeRate(item.ManFeeRate,item.ManFeeMethod)}}</span></div>
								</div>
							</div>
						</li>
						<!--<li>
							<div class="mui-table-view-cell">
								<div class="title border-1px">
									<h2>1</h2>
									<span class="status">2</span>
								</div>
								<div class="main">
									<div>借款金额：<span>3</span></div>
									<div>借款利率：<span>4</span></div>
									<div>借款期限：<span>5</span></div>
									<div>借款用途：<span>6</span></div>
									<div>借款时间：<span>7</span></div>
									<div>管理费率：<span>8</span></div>
								</div>
							</div>
						</li>-->
					</ul>
					<ul v-show="currentIndex === 1" class="also">
						<li  class="mui-table-view-cell" :class="{normal:item.State!=1 && item.State!=5 && item.State!=7}" @tap="refundDetail(item.LoanId)" v-for="item in refund.list">
							<div class="title border-1px">
								<div class="checkbox-box mui-hidden" v-if="0">
									<input type="checkbox" class="checkbox" />
								</div>
								<h2 style="height: 44px;line-height: 38px;">{{item.LoanName}}</h2>
								<button class="mui-btn mui-btn-primary mui-small-btn mui-pull-right" type="button" @tap.stop="refundDetail(item.LoanId)" v-if="(item.State==1 || item.State==5 || item.State==7) && item.IsOper">还款</button>
							</div>
							<div class="main">
								<div>本金：<span>{{item.BenJin}}</span></div>
								<div>还款总额：<span>{{item.CurTotalAmount}}</span></div>
								<div>利息：<span>{{item.Interest}}</span></div>
								<div>期数：<span>第{{item.CurrentPeriod}}期</span></div>
								<div>还款时间：<span>{{item.RefundDate}}</span></div>
								<div>状态：<span>{{item.RefundState}}</span></div>
							</div>
						</li>
						<!--<li class="normal">
							<div class="mui-table-view-cell">
								<div class="title border-1px">
									<div class="checkbox-box" v-if="0">
										<input type="checkbox" />
									</div>
									<h2 style="height: 44px;line-height: 44px;">安居贷-66171103</h2>
								</div>
								<div class="main">
									<div>本金：<span>200000.00</span></div>
									<div>还款总额：<span>200000.00</span></div>
									<div>利息：<span>15200.00</span></div>
									<div>期数：<span>24个月</span></div>
									<div>还款时间：<span>2017-10-16</span></div>
									<div>状态：<span>已还款</span></div>
								</div>
							</div>
						</li>-->
					</ul>
				</div>
			</div>
		</div>
		<div class="btn-box loan-btn" v-show="currentIndex === 0">
			<router-link tag="button" class="mui-btn mui-btn-primary mui-btn-block" :to="{name:'loanApply'}">
				我要借款
			</router-link>
		</div>
		<div class="btn-box also-btn" v-show="currentIndex === 1" v-if="0">
			<div class="input-box">
				<label for="all">
					<input class="checkbox" type="checkbox" name="all" />全选
				</label>
			</div>
			<button class="mui-btn mui-btn-primary mui-btn-block" href="#dialog-box" @tap="show">还款</button>
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
		<tips v-show="isTips"></tips>
	</div>
</template>

<script>
	import tips from "@/common/components/tips/tips"
	export default {
		data() {
			return {
				currentIndex: 0,
				isMasking: false,
				isLoad: true,
				loan: {
					//借款记录
					pageIndex: 1,
					list: []
				},
				refund: {
					//还款记录
					pageIndex: 1,
					list: []
				},
				loopPullDown: null,
				isTips: false,
				refundId:null,
				availBal:0,
				refundAmt:0
			}
		},
		mounted: function() {
			this.$nextTick(() => {
				for(var i = mui.hooks.inits.length - 1, item; i >= 0; i--) {
					item = mui.hooks.inits[i];
					if(item.name == "pullrefresh") {
						item.repeat = true;
					}
				}

				mui.init({
					pullRefresh: {
						container: '#pullrefresh',
						down: {
							callback: this.pullDownRefresh
						},
						up: {
							callback: this.pullupRefresh
						}
					}
				});

				setTimeout(() => {
					var pull = mui('#pullrefresh').pullRefresh();
					pull && pull.pulldownLoading();
				}, 200);
			})

		},
		activated: function() {
			this.$nextTick(() => {
				this.isMasking=false;
				var pull = mui('#pullrefresh').pullRefresh();
				pull && pull.pulldownLoading();
			})
		},
		methods: {
			 investDetail:function(id,type,name){
	    	   this.$router.push({
						name: "investDetail",
						query: {
							id: id,
							type: type,
							title: name
						}
					})
		    },
		    refundDetail:function(loanId){
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
			    					//mui("#dialog-box").popover('toggle');
			    					this.pullDownRefresh();
			    				}else{
			    					mui.toast(data.Desc);
			    				}
			    			}
			    		});
			    	//}else{
			    		//mui.toast('请选择需要还款的项目');
			    	//}
			    },
			toCal() {
				if(!this.isLoad) {
					this.$router.push({
						name: "repayCalendar"
					})
				} else {
					mui.toast("请稍候...")
				}
			},
			show() {
				this.isMasking = true;
			},
			hide() {
				this.isMasking = false;
			},
			tabItem(i) {
				//i = 子组件传参,切换选项卡
				if(this.isLoad) {
					mui.toast("请稍候...")
					return;
				}
				if(this.currentIndex == i) {
					mui('#pullrefresh').pullRefresh().scrollTo(0, 0, 200);
					return;
				} else {
					mui('#pullrefresh').pullRefresh().scrollTo(0, 0, 0);
				}

				this.isTips = false;
				this.currentIndex = i;

				var page = [this.loan.pageIndex, this.refund.pageIndex][i];
				if(page == 1) {
					//等于第一页说明没有数据，先禁用上拉加载，再调用下拉刷新,以防上拉加载字样闪烁。
					mui('#pullrefresh').pullRefresh().disablePullupToRefresh();
					mui('#pullrefresh').pullRefresh().pulldownLoading();
				} else {
					setTimeout(() => {
						//避免上拉加载字样出现太快
						//重新启用上拉加载。
						var pull = mui('#pullrefresh').pullRefresh();
						if(pull) {
							pull.enablePullupToRefresh();
							pull.refresh(true);
						}
					}, 200);
				}

			},
			pullupRefresh() {
				//上拉加载
				var tabIndex = this.currentIndex;
				var postUrl = ["Loan/LoanRecord", "Refund/RepaymentList"][tabIndex];
				var pageIndex = [this.loan.pageIndex, this.refund.pageIndex][tabIndex];
				this.sui.request(postUrl, {
					pageIndex: pageIndex
				}, "get", (data) => {
					var pull = mui('#pullrefresh').pullRefresh();
					var refresh = false;
					if(data) {
						if(data.IsPass) {
							if(data.ReturnList && data.ReturnList.length) {
								if(tabIndex == 0) {
									this.loan.list = this.loan.list.concat(data.ReturnList);
									this.loan.pageIndex++;
								} else {
									this.refund.list = this.refund.list.concat(data.ReturnList);
									this.refund.pageIndex++;
								}
							} else {
								refresh = true;
							}
						} else {
							mui.toast(data.Desc);
						}
					}
					pull && pull.endPullupToRefresh(refresh);
				})
			},
			pullDownRefresh() {
				//下拉刷新
				this.isLoad = true;
				var tabIndex = this.currentIndex;
				clearTimeout(this.loopPullDown);
				var postUrl = ["Loan/LoanRecord", "Refund/RepaymentList"][tabIndex];

				this.sui.request(postUrl, {
					pageIndex: 1
				}, 'get', (data) => {
					var pull = mui('#pullrefresh').pullRefresh();
					pull && pull.endPulldownToRefresh();
					if(data) {
						if(data.IsPass) {
							if(data.ReturnList && data.ReturnList.length) {
								if(tabIndex == 0) {
									this.loan.list = data.ReturnList;
									this.loan.pageIndex = 2;
								} else {
									this.refund.list = data.ReturnList;
									this.refund.pageIndex = 2;
								}
								this.isTips = false;
								this.loopPullDown = setTimeout(() => { //重新启用上拉加载
									pull && pull.enablePullupToRefresh();
									pull && pull.refresh(true);
								}, 1000);
							} else {
								//禁用上拉加载
								if(tabIndex == 0) {
									this.loan.list = [];
								} else {
									this.refund.list = [];
								}
								pull && pull.disablePullupToRefresh();
								this.isTips = true;
							}
						} else {
							mui.toast(data.Desc);
						}
					}
					this.$nextTick(() => {
						this.isLoad = false;
					})
				})
			},
			//格式化函数：
			getAmount(value) {
				return this.sui.rmoney(value);
			},
			getState(value) {
				//6-可加入 7-撤标中 8-流标 9-已结束 10-放款中 11-还款中 12-还款完成
				return ["可加入", "撤标中", "流标", "已结束", "已结束", "还款中", "已还完"][status - 6];
			},
			getRate(value) {
				//利率
				return value ? value.toFixed(1) : '0.0';
			},
			getTerm(term, unit) {
				//借款期限 1-天 2-月 3-年 4-小时
				return term + ["天", "个月", "年", "小时"][unit - 1];
			},
			getDate(value) {
				return value ? this.sui.formatDate('y-m-d', value) : "-";
			},
			getFeeRate(rate, method) {
				//管理费收取方式：1-一次性，2-分期
				return method == 2 ? rate.toFixed(1) + "%/期" : rate.toFixed(1) + "%";
			}
		},
		components: {
			tips
		},
		beforeDestroy() {
			this.loading = this.sui.closewait(this.loading);
		}
	}
</script>

<style lang="scss">
	.myLoan {
	 .mui-small-btn {
		  width: 49px;
		  height: 26px;
		  line-height: 26px;
		  padding: 0;
		  text-align: center;
		  font-size: 14px;
		  margin-top: -3px;
		}
		.bottom50{bottom: 50px !important;}
		padding: 45px 0 0;
		.tabs {
			position: fixed !important;
			left: 0;
			top: 0;
			width: 100%;
			padding: 0 25px;
			overflow: hidden;
			z-index: 100;
			background-color: #FFFFFF;
			@include border-1px(#E3E3EA);
			ul {
				display: flex;
				white-space: nowrap;
				li {
					flex: 1;
					padding: 15px 0;
					position: relative;
					display: inline-block;
					vertical-align: top;
					font-size: 15px;
					color: #2c2c2c;
					text-align: center;
					&.active {
						color: #1e82d2;
						&:after {
							content: '';
							position: absolute;
							left: 50%;
							transform: translateX(-50%);
							bottom: 0;
							width: 30px;
							height: 3px;
							background-color: #1e82d2;
						}
					}
					&:last-child {
						margin-right: 0;
					}
				}
			}
		}
		.loan {
			.title {
				padding: 15px 0;
			}
		}
		.also {
			.title {
				.checkbox-box {
					display: inline-block;
					vertical-align: middle;
					margin-right: 5px;
					width: 24px;
					height: 44px;
					line-height: 44px;
					text-align: center;
				}
				h2 {
					/*height: 44px;
					line-height: 48px;*/
				}
			}
			li {
				/*padding: 0 15px;*/
				border-radius: 6px;
			}
		}
		.list-box {
			ul {
				padding: 15px;
				li {
					position: relative;
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
					.mui-table-view-cell {
						padding: 0 15px;
						border-radius: 6px;
					}
					.mui-btn {
						position: absolute;
						right: 15px;
						top: 8px;
						&.btn-gray {
							color: #FFFFFF;
							border-color: #cdcdcd;
							background-color: #cdcdcd;
						}
					}
					.title {
						@include border-1px(#e5e5e5);
						h2 {
							display: inline-block;
							vertical-align: middle;
							font-size: 16px;
							color: #2c2c2c;
						}
					}
					.main {
						margin-top: 15px;
						>div {
							margin-bottom: 15px;
							display: inline-block;
							vertical-align: top;
							width: 50%;
							font-size: 12px;
							color: #999999;
						}
						span {
							color: #2c2c2c;
						}
					}
					.status {
						position: absolute;
						right: 0;
						top: 15px;
						font-size: 14px;
					}
				}
			}
		}
		.btn-box {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			.mui-btn {
				border-radius: 0;
				margin-bottom: 0;
			}
		}
		.loan-btn {
			display: block;
		}
		.also-btn {
			display: flex;
			background: #FFFFFF;
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
			.mui-btn {
				width: 134px;
			}
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
	/*
	.mui-backdrop {
		display: none;
	}
*/
</style>