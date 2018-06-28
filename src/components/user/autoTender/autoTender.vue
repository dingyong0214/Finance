<template>
	<div class="autoTender">
		<div class="ranking">
			<h2>{{model.SortNo>=0?model.SortNo:"暂无排名"}}</h2>
			<span>排名</span>
			<router-link :to="{name:'text', query: { type: 2 }}" class="iconfont icon-wenhao" tag="i"></router-link>
		</div>
		<ul class="mui-table-view">
			<div class="flag mui-table-view-cell">
				<span>是否开启</span>
				<!--<a>-->
				<div id="mySwitch" class="mui-switch mui-switch-mini mui-disabled" @tap="flag" :class="{'mui-active':isActive}">
					<div class="mui-switch-handle"></div>
				</div>
				<!--</a>-->
			</div>
		</ul>
		<ul class="mui-table-view">
			<li class="mui-table-view-cell">
				<span class="name">账户保留金额</span>
				<span class="val">{{getAmount(model.AccountBal)}}</span>
			</li>
			<li class="mui-table-view-cell">
				<span class="name">出借类型</span>
				<span class="val">{{loanType(model.LoanType)}}</span>
			</li>
			<li class="mui-table-view-cell">
				<span class="name">预期收益</span>
				<span class="val">8.0~12.0%</span>
			</li>
			<li class="mui-table-view-cell">
				<span class="name">出借期限</span>
				<span class="val">{{model.InvestTerm||0}}个月</span>
			</li>
			<li class="mui-table-view-cell">
				<span class="name">优惠券</span>
				<span class="val">{{getCoupon(model.Coupon)}}</span>
			</li>
		</ul>
		<div class="btn-box">
			<router-link tag="button" class="mui-btn mui-btn-primary mui-btn-block" :to="{name:'addAutoTender',query:{id:this.model.Id}}">
				修改投标设置
			</router-link>
		</div>

		<div class="mui-popover mui-popover-action mui-popover-bottom" :class="{'mui-active':isMasking}" style="display: block;">
			<div class="dialog">
				<div class="title border-1px">
					开启自动投标
					<i class="mui-icon mui-icon-closeempty" @tap="hide"></i>
				</div>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<input type="password" value="" placeholder="请输入安全码" v-model="postData.payPassword" id="safety" />
						<router-link :to="{name:'safetyCode'}" class="code">忘记安全码</router-link>
					</li>
				</ul>
				<div class="btn-box">
					<button class="mui-btn mui-btn-primary mui-btn-block" @tap="btnSwitch($event)">确定</button>
				</div>
			</div>
		</div>
		<transition name="fade">
			<div id="masking" v-show="isMasking" class="masking" @tap="hide"></div>
		</transition>
		<div id="huifu" v-html="huifu"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				huifu: "",
				postData: {
					isOpen: false,
					payPassword: null
				},
				isActive: false,
				isMasking: false,
				model: {},
				isStatus: {}
			}
		},
		created: function() {
			this.loading = this.sui.wait(true, '正在加载');
			this.sui.request("Invest/RuleList", {}, "get", (data) => {
				this.loading = this.sui.closewait(this.loading);
				if(data) {
					if(data.IsPass) {
						this.model = data.ReturnList[0];
						this.isStatus = data.ReturnObject;
						this.isActive = this.isStatus.IsOpenTender;
						if(!this.isStatus.IsRealAuth) {
							mui.confirm('您还没有实名认证，请先实名认证', '', ['取消', '立即实名'], (e) => {
								if(e.index == 1) {
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
								} else {
									if(!this.isBack) {
										this.$router.go(-1);
									}
								}
							})
							return;
						}

						if(!this.isStatus.IsOpenTenderPlan) {
							mui.confirm('您还没有授权自动投标计划，请先授权', '', ['立即授权', '取消'], (e) => {
								if(e.index == 0) {
									this.loading = this.sui.wait(true, '正在加载');
									this.sui.request('Invest/AutoTenderPlan', {}, 'get', (data) => {
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
								} else {
									if(!this.isBack) {
										this.$router.go(-1);
									}
								}
							});
						}
					} else {
						mui.toast(data.Desc);
					}
				}
			})
		},
		mounted: function() {
			this.$nextTick(() => {
				mui('.mui-switch')['switch']();
			})
		},
		beforeDestroy: function() {
			this.isBack = true;
			mui.closePopups()
		},
		methods: {
			btnSwitch(ev) {
				if(this.sui.IsNullOrEmpty(this.postData.payPassword)) {
					ev.detail.gesture.preventDefault(); //阻止默认事件
					mui.toast("请输入安全码");
				}
				this.loading = this.sui.wait(true, '请稍候...');
				this.sui.request('Invest/TenderSet', this.postData, "get", (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						if(data.IsPass) {
							this.postData.payPassword = "";
							this.isMasking = false;
							this.isActive = this.postData.isOpen;
							mui.toast('设置成功')
						} else {
							mui.toast(data.Desc)
						}
					}
				})

			},
			flag() {
				this.isMasking = true;
				this.isOpen();
			},
			hide() {
				this.isMasking = false;
				document.activeElement.blur();
				this.isOpen();
			},
			isOpen() {
				if(this.isActive) {
					this.postData.isOpen = false;
				} else {
					this.postData.isOpen = true;
				}
			},
			//格式化函数：
			getAmount(value) {
				return value ? this.sui.rmoney(value) : '0.00';
			},
			loanType(value) {
				//出借类型
				return value ? value.replace('1', '房易融').replace('2', '月账户').replace('3', '年账户') : '';
			},
			getCoupon(value) {
				//优惠券
				return value ? ['现金券', '红包', 'We券'][value - 1] : "";
			}
		}
	}
</script>

<style lang="scss">
	.autoTender {
		padding-bottom: 50px;
		.ranking {
			position: relative;
			padding: 25px 0;
			background-color: #1e82d2;
			text-align: center;
			color: #FFFFFF;
			h2 {
				margin-bottom: 18px;
				font-size: 30px;
			}
			span {
				font-size: 14px;
			}
			.iconfont {
				padding: 5px;
				position: absolute;
				top: 15px;
				right: 15px;
				font-size: 20px;
			}
		}
		.flag {
			margin-bottom: 10px;
			>a {
				position: static;
			}
		}
		>.mui-table-view {
			.mui-table-view-cell {
				position: relative;
				padding: 0 15px;
				height: 44px;
				line-height: 44px;
				font-size: 0;
				font-size: 16px;
				background: #FFFFFF !important;
				.val {
					position: absolute;
					line-height: 44px;
					right: 18px;
					color: #999999;
				}
			}
		}
		>.btn-box {
			.mui-btn {
				position: fixed;
				bottom: 0;
				border-radius: 0;
				margin-bottom: 0;
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
			transition: opacity .5s
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
			>ul.mui-table-view {
				background: #fff;
				padding-left: 15px;
				overflow: initial;
				&:after,
				&:before {
					display: none;
				}
				.mui-table-view-cell {
					box-sizing: border-box;
					margin-top: 20px;
					padding: 0 15px 0 0;
					height: 53px;
					line-height: 53px;
					overflow: initial;
					background: #FFFFFF !important;
					input {
						color: #2c2c2c;
						border: none;
						margin: 0;
						padding: 0;
						height: initial;
						vertical-align: middle;
						font-size: 16px;
					}
					span {
						font-size: 16px;
						color: #2c2c2c;
						&.val {
							position: absolute;
							right: 15px;
						}
					}
					.code {
						position: absolute;
						right: 15px;
						top: 0;
					}
				}
			}
			.btn-box {
				padding: 25px 15px 25px;
			}
		}
	}
</style>