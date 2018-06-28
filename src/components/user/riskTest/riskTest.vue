<template>
	<div class="riskTest">
		<ul>
			<li>
				<h2 class="title">1、您的年龄？</h2>
				<div class="item">
					<input class="radio" type="radio" name="0" value="A" v-model="riskArr[0]" />
					<label>A、超过60岁</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="0" value="B" v-model="riskArr[0]" />
					<label>B、51-60岁</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="0" value="C" v-model="riskArr[0]" />
					<label>C、18-30岁</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="0" value="D" v-model="riskArr[0]" />
					<label>D、31-40岁</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="0" value="E" v-model="riskArr[0]" />
					<label>E、41-50岁</label>
				</div>
			</li>
			<li>
				<h2 class="title">2、您的家庭年收入为（税后折合人民币）？</h2>
				<div class="item">
					<input class="radio" type="radio" name="1" value="A" v-model="riskArr[1]" />
					<label>A、10万以下</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="1" value="B" v-model="riskArr[1]" />
					<label>B、10-30万</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="1" value="C" v-model="riskArr[1]" />
					<label>C、30-100万</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="1" value="D" v-model="riskArr[1]" />
					<label>D、100万以上</label>
				</div>
			</li>
			<li>
				<h2 class="title">3、您会将您收入中的百分之多少用于出借？</h2>
				<div class="item">
					<input class="radio" type="radio" name="2" value="A" v-model="riskArr[2]" />
					<label>A、10%以下</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="2" value="B" v-model="riskArr[2]" />
					<label>B、10%-25%</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="2" value="C" v-model="riskArr[2]" />
					<label>C、25%-50%</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="2" value="D" v-model="riskArr[2]" />
					<label>D、50%以上</label>
				</div>
			</li>
			<li>
				<h2 class="title">4、以下哪项最能说明您的出借经验？</h2>
				<div class="item">
					<input class="radio" type="radio" name="3" value="A" v-model="riskArr[3]" />
					<label>A、除存款、国债外，几乎不出借其他金融产品</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="3" value="B" v-model="riskArr[3]" />
					<label>B、除存款、国债外，偶尔出借于信托、股票、基金、P2P等产品</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="3" value="C" v-model="riskArr[3]" />
					<label>C、资产均匀分布于存款、国债、银行理财产品、信托、股票、基金、P2P等产品</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="3" value="D" v-model="riskArr[3]" />
					<label>D、大部分出借于信托、股票、基金、P2P、金融衍生产品等产品，较少出借于存款、国债</label>
				</div>
			</li>
			<li>
				<h2 class="title">5、您有多少年出借信托、股票、基金、P2P、金融衍生产品等产品的经验？</h2>
				<div class="item">
					<input class="radio" type="radio" name="4" value="A" v-model="riskArr[4]" />
					<label>A、少于1年</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="4" value="B" v-model="riskArr[4]" />
					<label>B、1至5年</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="4" value="C" v-model="riskArr[4]" />
					<label>C、5至10年</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="4" value="D" v-model="riskArr[4]" />
					<label>D、10年以上</label>
				</div>
			</li>
			<li>
				<h2 class="title">6、您是如何理解风险的：</h2>
				<div class="item">
					<input class="radio" type="radio" name="5" value="A" v-model="riskArr[5]" />
					<label>A、风险就是损失</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="5" value="B" v-model="riskArr[5]" />
					<label>B、风险代表不确定性，可能会带来收益，也可能带来损失</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="5" value="C" v-model="riskArr[5]" />
					<label>C、风险代表机会，可能带来收益</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="5" value="D" v-model="riskArr[5]" />
					<label>D、风险代表巨大的额外收益机会</label>
				</div>
			</li>
			<li>
				<h2 class="title">7、以下哪项最符合您的出借态度？</h2>
				<div class="item">
					<input class="radio" type="radio" name="6" value="A" v-model="riskArr[6]" />
					<label>A、保障本金无损失，即使出借收益率较低</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="6" value="B" v-model="riskArr[6]" />
					<label>B、若能略高于保本类产品的收益，可以承受本金 10%以内的损失</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="6" value="C" v-model="riskArr[6]" />
					<label>C、若能有较高出借回报，可以承受本金 30%以内的损失</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="6" value="D" v-model="riskArr[6]" />
					<label>D、只要能取得高收益，即使本金损失超过 50%，亦可以承受</label>
				</div>
			</li>
			<li>
				<h2 class="title">8、您对P2P出借希望达到的年收益率水平？</h2>
				<div class="item">
					<input class="radio" type="radio" name="7" value="A" v-model="riskArr[7]" />
					<label>A、7%～10%</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="7" value="B" v-model="riskArr[7]" />
					<label>B、10%～15%</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="7" value="C" v-model="riskArr[7]" />
					<label>C、15%～20%</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="7" value="D" v-model="riskArr[7]" />
					<label>D、20%以上</label>
				</div>
			</li>
			<li>
				<h2 class="title">9、出借一家P2P平台，您的主要决策是来自于？</h2>
				<div class="item">
					<input class="radio" type="radio" name="8" value="A" v-model="riskArr[8]" />
					<label>A、主要取决于平台背景、管理团队、信息披露、资金安全等方面</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="8" value="B" v-model="riskArr[8]" />
					<label>B、媒体广告</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="8" value="C" v-model="riskArr[8]" />
					<label>C、不会考虑太多，主要依赖亲朋好友推荐</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="8" value="D" v-model="riskArr[8]" />
					<label>D、收益高、期限短</label>
				</div>
			</li>
			<li>
				<h2 class="title">10、您目前出借了多少家P2P平台？</h2>
				<div class="item">
					<input class="radio" type="radio" name="9" value="A" v-model="riskArr[9]" />
					<label>A、0-3家</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="9" value="B" v-model="riskArr[9]" />
					<label>B、4-8家</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="9" value="C" v-model="riskArr[9]" />
					<label>C、8-12家</label>
				</div>
				<div class="item">
					<input class="radio" type="radio" name="9" value="D" v-model="riskArr[9]" />
					<label>D、12家以上</label>
				</div>
			</li>
		</ul>
		<div class="btn-box">
			<button class="mui-btn mui-btn-primary mui-btn-block" @tap="test">查看结果</button>
		</div>

		<div class="dialog-box" v-show="dialog">
			<div class="dialog">
				<h2 class="title">您属于<span>{{getType(type)}}</span>出借者</h2>
				<p class="main">{{getExplain(type)}}</p>
				<div class="btn-box">
					<button class="mui-btn mui-btn-primary mui-btn-block" @click="link">确认</button>
					<button class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined" @tap="restart">重新测评</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				type: -1,
				dialog: false,
				riskArr: ["", "", "", "", "", "", "", "", "", ""]
			}
		},
		mounted() {
			this.$nextTick(() => {
				//1=登录，安全码  2=出借详情
				this.first = this.$route.query.first;
				if(this.first == 1 || this.first == 2) {
					mui.alert('按国家互联网金融监管有关规定，需您完成以下“风险测评”。测评完成，即可进行下一步操作。', function() {}, 'div');
				}
			})
		},
		methods: {
			test() {
				for(var i = 0; i < this.riskArr.length; i++) {
					if(this.riskArr[i] == "") {
						mui.toast('请选择风险测评第' + (i + 1) + '题');
						return
					}
				}
				this.loading = this.sui.wait(true, '正在加载');
				this.sui.request("User/RiskType", {
					options: this.riskArr.join(',')
				}, "get", (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						if(data.IsPass) {
							this.type = data.ReturnObject;
							this.dialog = true;
							var type = ["保守型", "稳健型", "积极型"][this.type - 1];
						} else {
							mui.toast(data.Desc)
						}
					}
				})
			},
			restart() {
				this.riskArr = ["", "", "", "", "", "", "", "", "", ""];
				this.dialog = false;
			},
			link() {
				if(this.first == 1) {
					let redirect = this.$route.query.redirect;
					if(redirect) {
						this.$router.push({
							name: redirect
						})
					}else{
						this.$router.push({
							name: 'user'
						})
					}
				} else {
					this.$router.go(-1);
				}
			},
			getType(value) {
				//1-保守型 2-稳健型 3-积极型 4-激进型
				return ["保守型", "稳健型", "积极型"][value - 1];
			},
			getExplain(value) {
				return [
					'您的风险承担能力水平比较低，您关注资产的安全性远超于资产的收益性，所以低风险 、高流动性的出借品种比较适合您，这类出借的收益相对偏低。建议您可将不超过可支配收入的10%的资金出借于P2P理财等风险偏高项目，在控制风险的同时适当提高收益。注：以上建议仅供参考，不构成任何收益保证。',
					'您有比较有限的风险承受能力，对出借收益比较敏感，期望通过短期、持续、渐进的出借获得高于定期存款的回报。较低等级风险的产品比较适合您。建议您可将不超过可支配收入的20%资金出借于p2p理财等风险偏高项目，适当回避风险的同时保证收益。注：以上建议仅供参考，不构成任何收益保证。',
					'您有中高的风险承受能力，愿意承担可预见的出借风险去获取更多的收益。中高等级的风险出借品种比较适合您。建议您可将不超过可支配收入的40%的资金出借于P2P理财等风险偏高项目，以一定可预见的风险承担超额收益。注：以上建议仅供参考，不构成任何收益保证。'
				][value - 1];
			}
		}
	}
</script>

<style lang="scss">
	.riskTest {
		padding: 10px;
		li {
			padding: 15px;
			margin-bottom: 10px;
			background-color: #ffffff;
			border-radius: 6px;
			.title {
				font-size: 14px;
				line-height: 16px;
			}
			.item {
				position: relative;
				display: block;
				margin-top: 12px;
				label {
					display: inline-block;
					padding-left: 30px;
					font-size: 14px;
					line-height: 16px;
				}
				input {
					position: absolute;
					left: 0;
					top: 11px;
					display: inline-block;
					border: 0;
					outline: 0!important;
					background-color: transparent;
					-webkit-appearance: none;
					&:checked:before {
						content: '\e441';
						color: #007aff;
						font-size: 21px;
					}
					&:before {
						content: '\e411';
						font-family: Muiicons;
						font-size: 22px;
						font-weight: 400;
						line-height: 1;
						text-decoration: none;
						color: #aaa;
						border-radius: 0;
						background: 0 0;
						-webkit-font-smoothing: antialiased;
					}
				}
			}
		}
		.btn-box {
			margin-top: 20px;
		}
		.dialog-box {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(153, 153, 153, 0.7);
			.dialog {
				padding: 25px;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				width: 345px;
				background: #FFFFFF;
				border-radius: 6px;
				.title {
					font-size: 18px;
					text-align: center;
					span {
						color: #1e82d2;
					}
				}
				.main {
					margin: 22px 0 25px;
					font-size: 14px;
					line-height: 16px;
					color: #4d4d4d;
				}
				.btn-box {
					font-size: 0;
				}
				.mui-btn {
					margin: 0;
					padding: 0;
					margin-right: 15px;
					display: inline-block;
					vertical-align: top;
					width: 140px;
					height: 44px;
					line-height: 44px;
					font-size: 14px;
					&:last-child {
						margin-right: 0;
					}
				}
			}
		}
	}
</style>