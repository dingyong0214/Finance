<template>
	<div class="investMsg">
		<!--status: 1-融资信息,2-房产信息,3-借款人信息-->

		<!--融资信息-->
		<ul class="msg" v-if="status == 1" v-show="show">
			<li>
				<span class="name">项目名称</span>
				<p class="val">{{model.Name}}</p>
			</li>
			<li>
				<span class="name">项目简介</span>
				<p class="val">{{reHtml(model.Description)}}</p>
			</li>
			<li>
				<span class="name">借款金额</span>
				<p class="val">{{getAmount(model.Amount)}}</p>
			</li>
			<li>
				<span class="name">借款用途</span>
				<p class="val">{{model.Purpose}}</p>
			</li>
			<li>
				<span class="name">还款方式</span>
				<p class="val">{{refundWays(model.RefundWays)}}</p>
			</li>
			<li>
				<span class="name">还款来源</span>
				<p class="val">{{model.PaymentSource}}</p>
			</li>
			<li>
				<span class="name">服务说明</span>
				<p class="val">
					<router-link :to="{name:'riskNote'}" class="xieyi-name">《风险提示书》</router-link>
					<!--<router-link :to="{name:'monthProtocol'}" v-if="type==2" class="xieyi-name">《月账户出借协议》</router-link>
					<router-link :to="{name:'yearProtocol'}" v-if="type==3" class="xieyi-name">《年账户出借协议》</router-link>-->
					<router-link :to="{name:'loanContract'}" class="xieyi-name">《融资借款合同》</router-link>
					<router-link :to="{name:'transferProtocol'}" v-if="type==4" class="xieyi-name">《债权转让协议》</router-link>
				</p>
			</li>
		</ul>

		<!--房产信息-->
		<ul class="house" v-if="status == 2" v-show="show">
			<li v-for="model in houseList">
				<h2>房产1</h2>
				<ul class="main">
					<li>
						<span class="name">购买时间：</span>
						<p class="val">{{getDate(model.BuyDate)}}</p>
					</li>
					<li>
						<span class="name">房产面积：</span>
						<p class="val">{{model.Mianji}}</p>
					</li>
					<li>
						<span class="name">购买金额：</span>
						<p class="val">{{getAmount(model.BuyAmount)}}</p>
					</li>
					<li>
						<span class="name">房产年限：</span>
						<p class="val">{{model.AgeLimit}}年</p>
					</li>
					<li>
						<span class="name">是否装修：</span>
						<p class="val">{{model.IsZhuangxiu?"已装修":"未装修"}}</p>
					</li>
					<li>
						<span class="name">是否有房贷：</span>
						<p class="val">{{model.HasLoan?"有":"无"}}</p>
					</li>
					<li>
						<span class="name">房贷金额：</span>
						<p class="val">{{getAmount(model.LoanAmount)}}</p>
					</li>
					<li>
						<span class="name">房贷期限：</span>
						<p class="val">{{model.LoanYears}}年</p>
					</li>
				</ul>
			</li>
		</ul>

		<!--借款人信息-->
		<ul class="msg" v-if="status == 3" v-show="show">
			<li>
				<span class="name">姓名</span>
				<p class="val">{{model.Name}}</p>
			</li>
			<li>
				<span class="name">性别</span>
				<p class="val">{{model.Sex}}</p>
			</li>
			<li>
				<span class="name">年龄</span>
				<p class="val">{{model.Age}}</p>
			</li>
			<li>
				<span class="name">工作性质</span>
				<p class="val">{{model.Job}}</p>
			</li>
			<li>
				<span class="name">借款人收入</span>
				<p class="val">{{model.Income}}</p>
			</li>
			<li>
				<span class="name">当前负债</span>
				<p class="val">{{model.CurrentDebt}}</p>
			</li>
			<li>
				<span class="name">平台历史逾期次数</span>
				<p class="val">{{model.OverdueTimes}}</p>
			</li>
			<li>
				<span class="name">平台历史逾期金额</span>
				<p class="val">{{model.HistoryOverdue}}</p>
			</li>
			<li>
				<span class="name">平台当前逾期金额</span>
				<p class="val">{{model.CurrentOverdue}}</p>
			</li>
			<li>
				<span class="name">涉诉情况</span>
				<p class="val">{{model.Lawsuits}}</p>
			</li>
			<li>
				<span class="name">受行政处罚情况</span>
				<p class="val">{{model.Chufa}}</p>
			</li>
			<li>
				<span class="name">在其他网络借贷平台借款情况</span>
				<p class="val">{{model.BorrowCase}}</p>
			</li>
			<li>
				<span class="name">近6个月征信报告中的逾期情况</span>
				<p class="val">{{model.OverdueDesc}}</p>
			</li>
			<li>
				<span class="name">审核信息</span>
				<div class="attest-box">
					<div class="attest" v-show="model.IsRealAuth">
						<i class="mui-icon iconfont icon-gou1"></i>
						<span class="val">身份认证</span>
					</div>
					<div class="attest" v-show="model.IsMobileAuth">
						<i class="mui-icon iconfont icon-gou1"></i>
						<span class="val">手机认证</span>
					</div>
					<div class="attest" v-show="model.IsSpotAuth">
						<i class="mui-icon iconfont icon-gou1"></i>
						<span class="val">实地认证</span>
					</div>
				</div>
			</li>
		</ul>

		<tips v-show="isTips"></tips>
	</div>
</template>

<script>
	import tips from "@/common/components/tips/tips"

	export default {
		data() {
			return {
				id: "",
				type: "",
				status: "",
				loanId: "",
				loading: null,
				show: false,
				model: {},
				houseList: [],
				isTips: false
			}
		},
		created: function() {
			document.title = this.$route.query.title;
			this.loading = this.sui.wait(true, '正在加载');

			this.id = this.$route.query.id;
			this.type = this.$route.query.type;
			this.loanId = this.$route.query.loanId;
			this.status = this.$route.query.status;
			var postUrl = ['Loan/LoanInfo', 'Loan/LoanUserHouse', 'Loan/LoanUser'][this.status - 1];
			this.sui.request(postUrl, {
				loanId: this.type == 4 ? this.loanId : this.id
			}, "get", (data) => {
				if(this.loading) {
					this.loading = this.sui.closewait(this.loading);
				}
				if(data) {
					if(data.IsPass) {
						if(this.status == 2) {
							if(data.ReturnList && data.ReturnList.length) {
								this.houseList = data.ReturnList;
							} else {
								this.isTips = true;
							}
						} else {
							if(data.ReturnObject) {
								this.model = data.ReturnObject;
							} else {
								this.isTips = true;
							}
						}
						this.show = true;
					} else {
						mui.toast(data.Desc);
					}
				}
			})
		},
		beforeDestroy: function() {
			this.loading = this.sui.closewait(this.loading);
		},
		methods: {
			//格式化函数:
			getAmount(value) {
				return value ? this.sui.rmoney(value) : '';
			},
			refundWays(value) {
				// 还款方式：1-到期还本付息 2-等额本息 3-先息后本
				return [
					'到期还本付息。借款金额为X，年利率为Y，借款期限为Z月，则应还总利息计算公式为：X×Y/12×Z，应还本金为X。',
					' 等额本息。 借款金额为X，年利率为Y，借款期限为Z月，月还款本息和T，则第一个月应还利息计算公式为：X×Y/360*30,第二个月应还利息计算公式为：（X-(T-第一个月应还利息））×Y/360*30，各月以此类推，应还总利息计算公式为：第一个月应还利息+第二个月应还利息+…第Z个月的应还利息。应还本金为X。每月按30天算，不足一个自然月按实际天数算。',
					'先息后本。借款金额为X，年利率为Y，借款期限为Z月，则每月应还利息计算公式为：X×Y/12，应还总利息计算公式为：X×Y/12×Z，应还本金为X。'
				][value - 1];
			},
			getDate(d) {
				return d ? this.sui.formatDate('y-m-d', d) : '';
			},
			reHtml(content) {
				//去除全部的html标签
				return content ? content.replace(/<\s?[^>]*>/gi, "") : "";
			}
		},
		components: {
			tips
		}
	}
</script>

<style lang="scss">
	.investMsg {
		padding: 15px;
		.msg {
			li {
				font-size: 0;
				.name,
				.val {
					display: inline-block;
					vertical-align: top;
					line-height: 16px;
				}
				.name {
					margin-right: 15px;
					margin-bottom: 12px;
					color: #999999;
					font-size: 14px;
				}
				.val {
					margin-bottom: 12px;
					color: #2c2c2c;
					font-size: 14px;
					text-align: justify;
					.xieyi-name {
						margin-bottom: 7px;
						display: block;
					}
				}
				.attest-box {
					.attest {
						margin-right: 20px;
						display: inline-block;
						vertical-align: top;
						.mui-icon {
							color: #57d900;
							margin-right: 5px;
							margin-bottom: -1px;
							font-size: 18px;
						}
					}
				}
			}
		}
		.house {
			>li {
				margin-bottom: 15px;
				padding: 0 10px 15px;
				background: #FFFFFF;
				border-radius: 6px;
				h2 {
					padding: 15px 0 11px;
					border-bottom: solid 1px #e5e5e5;
				}
				.main {
					font-size: 0;
					>li {
						margin-top: 15px;
						display: inline-block;
						vertical-align: top;
						width: 50%;
						.name,
						.val {
							display: inline-block;
							vertical-align: top;
							line-height: 16px;
							font-size: 12px;
						}
						.name {
							color: #999999;
						}
						.val {
							color: #2c2c2c;
						}
					}
				}
			}
		}
	}
</style>