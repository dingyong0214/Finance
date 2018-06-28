<template>
	<div class="text-wrapper">
		<div v-if="type==1">
			<b>提现手续费：</b>
			<p>  1. 一般提现：优先提现15天前充值的金额。若15天前充值的金额大于或等于提现金额，则每月可免费提现3笔，超过3笔后，提现金额≤5万则收2元/笔，提现金额>5万则收10元/笔；15天内充值的金额如要提现不免费，按提现金额的2‰收取，最低2元/笔。</p>
			<p>2. 即时提现：按提现金额的2‰收取，最低2元/笔。</p>
			<br />
				<b>提现限额：</b>
				<p>									
					1. 最小提现金额为100元； 
				</p>
				<p>									
					2.工作日前一日20:30至工作日17:15，单笔提现申请无上限；非工作时间17:15-20:30，单笔提现上限额度为5万元；
				</p>
				<p >
					3.非工作日全天(除了工作日前一日的20:30-24:00)，单笔提现上限额度为50万元。 
				</p>
				<br />
				<b>到账时间：</b>
				<p>
					具体提现到账时间请查看【帮助中心】—【账户管理】—【提现】板块；
				</p>					
				<br />
				<b>其他</b>
				<p>1. 银行存管开户、交易密码、提现银行卡均设置成功后，方可进行提现操作；</p>
				<p>2. 提现必须为银行借记卡，不支持存折、信用卡提现；当日个人网银充值和快捷充值金额需要第二日起可取现；</p>
				<p>3. 平台对调整收费规则保留最终解释权；</p>
				<p>4、用户在提现过程中，如有疑问请拨打前海领投客服热线400-660-5027。</p>
			<div class="bg"></div>
		</div>

		<div v-if="type==2">
			<p>1.账户余额>=100元才能启动自动投标；</p>
			<p>2.自动投标功能设置中若没有设置预留金额，系统将默认用户账户内全部可用余额用于自动投标。</p>
			<p>3.自动投标排序规则如下：</p>
			<p>a ) 投标顺序按照开启自动投标的时间先后进行排序；</p>
			<p>b ) 自动投标触发后，投标成功的规则将自动排到队尾，进行重新排队，未投到标的规则排名自动前进相应位数。只要您未能投到标，排名将始终保持前进。</p>
			<div class="bg"></div>
		</div>

		<div v-if="type==3">
			<p>1、出让债权的金额为债权人持有的一笔债权的剩余本金，债权人可原价、折价或溢价转让，折价金额最多为剩余本金*1%，溢价金额最多为当期应收利息；</p>
			<p>2、按转让人的债权持有期不同，对应不同的转让费率。</p>
			<div class="transfer-table-box">
				<table class="transfer-table">
					<tr>
						<td>持有期</td>
						<td>费率</td>
					</tr>
					<tr>
						<td>1个月&lt;N≤2个月</td>
						<td>0.5%</td>
					</tr>
					<tr>
						<td>2个月&lt;N≤6个月</td>
						<td>0.3%</td>
					</tr>
					<tr>
						<td>N>6个月</td>
						<td>0.1%</td>
					</tr>
				</table>
			</div>
			<p>3、实际到账金额=剩余本金±折溢价-转让手续费；</p>
			<p>4、未转成功的部分，转让人继续持有。</p>
			<div class="bg"></div>
		</div>

		<div v-if="type==4">
			<p>1.折益率=折益价/剩余本金</p>
			<p>2.实际到账金额=剩余本金±折溢价-转让手续费</p>
			<div class="bg"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'investText',
		data() {
			return {
				type: -1
			}
		},
		created: function() {
			//1=提现，2=自动投标规则，3=转让规则，4=立即转让(帮助)
			this.type = this.$route.query.type;
		}
	}
</script>

<style lang="scss">
	.text-wrapper {
		padding: 15px;
		.bg {
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			z-index: -1;
			background: #FFFFFF;
		}
		b {
			display: block;
			font-weight: bold;
			margin: 15px 0 6px;
			font-size: 15px;
		}
		p {
			line-height: 30px;
			font-size: 14px;
			color: #2c2c2c;
			text-align: justify;
		}
		.transfer-table-box {
			padding: 10px 0;
			.transfer-table {
				width: 100%;
				text-align: center;
				table-layout: fixed;
				td {
					padding: 10px 0;
					font-size: 12px;
					border: 1px solid #e5e5e5;
				}
			}
		}
	}
</style>