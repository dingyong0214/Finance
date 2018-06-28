<template>
	<div class="investText">
		<!--id:0-月账户/年账户, !=0具体标 -->
		<!--status:0-项目详情，1-风控措施,2-风险评估,3-项目跟进-->
		<!--type:2-月账户，3-年账户-->

		<!--年月账户-项目介绍-->
		<p class="intro" v-if="id == 0 && type == 2 && status==0">
			“月账户”是受用户委托，授权系统自动投标、到期转让的智能出借工具。 “月账户”在用户认可的标的范围内，对符合要求的标的匹配优先自动投标， 并在出借到期后自动转让退出。匹配完成即进入锁定期。锁定期内， 用户已投项目按单个项目逐期结算应回本金和利息；锁定期结束后， 平台自动发起债权转让，转让成功后结算剩余本金和利息。
		</p>
		<p class="intro" v-if="id == 0 && type == 3 && status==0">
			“年账户”是前海领投为方便用户出借推出的标准化出借工具，用户加入年账户后，平台立即启动优先匹配投标，按用户认可的标的范围内，对符合要求的标的进行优先自动投标，提高了用户出借的速度和灵活度，及时盘活用户资金，更好的满足用户多样化的出借需求。此外，使用该工具所出借项目还适用于《前海领投质保计划书》。
		</p>

		<!--年月账户-风控措施-->
		<div class="measures" v-if="id == 0 && status==1">
			<h3>信用记录：</h3>
			<p>
				经人民银行征信系统查询债务人征信报告正常，债务人过往借款记录优良， 无借款逾期、拖欠本息记录。提供银行流水真实充足。
			</p>
			<h3>还款来源：</h3>
			<p>1.第一还款来源：借款人每月经营收入所得。</p>
			<p>2.第二还款来源：借款人该房产每月租金收入所得。</p>
			<h3>涉诉状况：</h3>
			<p>
				经全国法院被执行人信息查询系统、 全国法院失信被执行人名单信息公布与查询平台及互联网搜索，未发现借款人涉诉信息。
			</p>
			<h3>风控措施：</h3>
			<p>1.借款人已签定了相关的借款合同，手续合法有效。</p>
			<p>2.已进行实地考察周边地段的情况，核实该房产的市场价值、房产状况及租赁情况。</p>
			<p>3.已与借款人签署租赁权转移协议，如借款人不能按时还款，我司将强制收取租金以保证每月按时还款。</p>
		</div>

		<!--具体标-风控措施-->
		<div class="measures" v-if="id != 0 && status==1" v-html="content"></div>

		<!--具体标-风险评估-->
		<div class="measures" v-if="status==2" v-html="content"></div>

		<!--具体标-项目跟进-->
		<div class="measures" v-if="status==3" v-html="content"></div>

		<tips v-show="isTips"></tips>
	</div>
</template>

<script>
	import tips from "@/common/components/tips/tips"

	export default {
		name: 'investText',
		data() {
			return {
				id: "",
				type: "",
				status: "",
				loanId: "",
				content: "",
				loading: null,
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
			if(this.id != 0) {
				var postUrl = ['Loan/RiskControl', 'Loan/RiskEvaluation', 'Loan/Tracking'][this.status - 1];

				this.sui.request(postUrl, {
					loanId: this.type == 4 ? this.loanId : this.id
				}, "get", (data) => {
					if(this.loading) {
						this.loading = this.sui.closewait(this.loading);
					}
					if(data) {
						var IsPass = data.IsPass;
						if(IsPass) {
							if(data.ReturnObject) {
								this.content = data.ReturnObject;
							} else {
								this.isTips = true;
							}
						} else {
							mui.toast(data.Desc);
						}
					}
				});
			} else {
				if(this.loading) {
					this.loading = this.sui.closewait(this.loading);
				}
			}
		},
		beforeDestroy: function() {
			this.loading = this.sui.closewait(this.loading);
		},
		components: {
			tips
		}
	}
</script>

<style lang="scss">
	.investText {
		background: #f7f7f9;
		.intro {
			font-size: 14px;
			display: inline-block;
			padding: 25px 15px;
			line-height: 24px;
			color: #2c2c2c;
		}
		.measures {
			max-width: 100%;
			word-wrap: break-word !important;
			padding: 25px 15px;
			* {
				max-width: 100% !important;
			}
			p {
				line-height: 24px;
				font-size: 14px;
				color: #2c2c2c;
			}
			h3 {
				line-height: 24px;
				font-size: 14px;
				color: #2c2c2c;
				font-weight: bold;
			}
		}
	}
</style>