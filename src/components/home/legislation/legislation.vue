<template>
	<div class="legislation">
		<div v-if="type==1">   <!--v-if="type==1"--> 
			<h2 class="title">关于出借人通过前海领投平台获得的出借收益的合法性</h2>
			<p>《法释〔2015〕18号最高人民法院关于审理民间借贷案件适用法律若干问题的规定》第二十六条:“借贷双方约定的利率未超过年利率24%，出借人请求借款人按照约定的利率支付利息的，人民法院应予支持。”前海领投的出借收益未超过24%，为合法利息收益，受到法律保护。</p>
		</div>
		<div v-if="type==2">
			<h2 class="title">关于电子合同的合法性</h2>
			<p>根据《合同法》和《电子签名法》的规定，当事人可以采用合同书、信件和数据电文（包括电报、电传、传真、电子数据交换和电子邮件）等形式订立合同，并通过以电子形式所含、所附用于识别签名人身份并表明签名人认可其中内容的数据电文等电子签名方式进行签署，当事人不能仅因合同采用电子签名、数据电文的形式就否定其法律效力。</p>
		</div>
		<div v-if="type==3">
			<h2 class="title">关于前海领投平台提供居间撮合服务的合法性</h2>
			<p>《合同法》第23章关于“居间合同”的规定，特别是第424条规定的“居间合同是居间人向委托人报告订立合同的机会或者提供订立合同的媒介服务，委托人支付报酬的合同”。前海领投作为合法设立的中介服务机构，为民间借贷提供撮合服务，使借贷双方形成借贷关系并收取相关报酬的居间服务有着明确的法律基础。</p>
		</div>
		<div v-if="type==4">
			<h2 class="title">关于在前海领投平台上网络借贷关系的合法性</h2>
			<p>《合同法》第196条：“借款合同是出借人向借款人借款，到期返还借款并支付利息的合同”。《合同法》允许自然人等普通民事主体之间发生借贷关系，并允许出借方到期可以收回本金和符合法律规定的利息。</p>
		</div>
		<div v-if="type==5">
			<h2 class="title">合法经营</h2>
			<p>前海领投聘用了广东诚公律师事务所作为公司的常年法律顾问。 前海领投所有业务活动以及相关合同和协议均咨询广东诚公律师事务所，确保其符合相关法律法规， 前海领投合法守信经营，让前海领投的用户权益受国家法律保护。</p>
		</div>
		<div class="bg"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				type: -1
			}
		},
		created: function() {
			this.type = this.$route.query.type;
		}
	}
</script>

<style lang="scss">
	.legislation {
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
		.title{
			padding: 10px 0 15px;
			font-size: 16px;
			line-height: 20px;
			font-weight: bold;
			text-align: center;
		}
		p {
			margin-bottom: 10px;
			line-height: 25px;
			font-size: 14px;
			color: #2c2c2c;
			text-align: justify;
		}
	}
</style>