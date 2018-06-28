<template>
	<div class="security">
		<div class="banner">
			<img src="./banner.png" width="100%" />
		</div>
		<div class="bank-box">
			<h2 class="title">银行存管上线 , 资金安全有保障</h2>
			<p class="text">
				前海领投携手宜宾商业银行，成功上线银行存管系统，银行对用户资金进行独立管理与监督，平台无法触碰，实现平台资金与用户资金隔离。
				<!--<a class="knowBank" >了解银行存管>></a>-->
				<router-link :to="{name:'bankOfYibin',query: { app: app }}" class="knowBank" >了解银行存管>></router-link>
			</p>
			<div class="bot">
				<div class="icon-box">
					<img src="./logo.png" />
				</div>
				<div class="hand">
					<img src="./hand.png" />
				</div>
				<div class="icon-box">
					<img src="./house.png" />
				</div>
			</div>
		</div>
		<div class="manage-risk">
			<h2 class="title">坚持小额分散原则，有效管理风险</h2>
			<div id="slider" class="mui-slider">
				<div class="mui-slider-group mui-slider-loop">
					<!-- 额外增加的一个节点-->
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a href="#">
							<div class="risk-item">
								<img src="./risk-4.png" />
								<h3 style="margin: 16px 0;">合作机构额度分散</h3>
								<p>前海领投优选业务渠道合作机构，每个经过前海领投审核的机构均给予谨慎管理，确保每个机构的出借项目总额度也遵循额度分散的原则。</p>
							</div>
						</a>
					</div>
					<!-- 第一张 -->
					<div class="mui-slider-item">
						<a href="#">
							<div class="risk-item">
								<img src="./risk-1.png" />
								<h3>定位优质资金需求群体</h3>
								<p>经10余年的业务实践和风控沉淀，前海领投紧紧围绕有房一族群体，着重于有房一族群体的资信能力强、财务多样化、收入和家庭稳定、金融需求旺盛等特征，不断提升筛选优质客户和服务客户的能力，构建优质客户库。</p>
							</div>
						</a>
					</div>
					<!-- 第二张 -->
					<div class="mui-slider-item">
						<a href="#">
							<div class="risk-item">
								<img src="./risk-2.png" />
								<h3 style="margin: 18px 0;">严选优质出借项目</h3>
								<p>前海领投只选择优质出借项目，最大程度降低和分散逾期风险，保证合作机构具备完整有效的实时代偿能力；单笔项目金额不超过20万元。</p>
							</div>
						</a>
					</div>
					<!-- 第三张 -->
					<div class="mui-slider-item">
						<a href="#">
							<div class="risk-item">
								<img src="./risk-3.png" />
								<h3 style="margin: 19px 0;">借款人特征分散</h3>
								<p>前海领投的借款人所在地域、所处行业非常分散，能强有力抵抗平台系统性风险。</p>
							</div>
						</a>
					</div>
					<!-- 第四张 -->
					<div class="mui-slider-item">
						<a href="#">
							<div class="risk-item">
								<img src="./risk-4.png" />
								<h3 style="margin: 16px 0;">合作机构额度分散</h3>
								<p>前海领投优选业务渠道合作机构，每个经过前海领投审核的机构均给予谨慎管理，确保每个机构的出借项目总额度也遵循额度分散的原则。</p>
							</div>
						</a>
					</div>
					<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a href="#">
							<div class="risk-item">
								<img src="./risk-1.png" />
								<h3>定位优质资金需求群体</h3>
								<p>经10余年的业务实践和风控沉淀，前海领投紧紧围绕有房一族群体，着重于有房一族群体的资信能力强、财务多样化、收入和家庭稳定、金融需求旺盛等特征，不断提升筛选优质客户和服务客户的能力，构建优质客户库。</p>
							</div>
						</a>
					</div>
				</div>
				<div class="mui-slider-indicator">
					<div class="mui-indicator mui-active"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
				</div>
			</div>
		</div>
		<div class="money-box">
			<h2 class="title">资金管理</h2>
			<p class="text">前海领投严守平台规范。平台不设资金池，对接汇付天下资金管理系统，实现真正第三方资金管理与结算。用户资金只存在于第三方支付（汇付天下）的管理账户里，与平台有效隔离，保证安全。</p>
			<p>汇付天下优势：中国支付清算协会常务理事单位、中国互联网金融协会理事单位。</p>
		</div>
		<div class="info-box">
			<h2 class="title">信息安全</h2>
			<div class="main">
				<div class="img-box">
					<img src="./san.png" />
				</div>
				<div class="text-box">
					<h4>高标准网站安全等级，全面保护用户信息安全</h4>
					<p class="text">前海领投根据公安部信息安全等级保护的要求，按照国家信息安全等级保护三级标准认证标准打造网站平台。</p>
				</div>
			</div>
			<div id="slider" class="mui-slider">
				<div class="mui-slider-group mui-slider-loop">
					<!-- 额外增加的一个节点-->
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a href="#">
							<div class="risk-item">
								<span class="num">04</span>
								<img src="./info-4.png" />
								<h3>用户敏感数据加密</h3>
								<p>平台用户所有隐私数据均加密存储，防止用户重要隐私数据的泄露。</p>
							</div>
						</a>
					</div>
					<!-- 第一张 -->
					<div class="mui-slider-item">
						<a href="#">
							<div class="risk-item">
								<span class="num">01</span>
								<img src="./info-1.png" />
								<h3>3层安全防护体系</h3>
								<p>数据库3层安全防护体系采用DDOS防护、IP白名单配置、数据库攻击防护保障数据库安全。</p>
							</div>
						</a>
					</div>
					<!-- 第二张 -->
					<div class="mui-slider-item">
						<a href="#">
							<div class="risk-item">
								<span class="num">02</span>
								<img src="./info-2.png" />
								<h3 style="margin: 18px 0;">7*24小时云监控 </h3>
								<p>对服务器、数据库以及各种服务、站点进行7*24小时监控，保障运行平稳。</p>
							</div>
						</a>
					</div>
					<!-- 第三张 -->
					<div class="mui-slider-item">
						<a href="#">
							<div class="risk-item">
								<span class="num">03</span>
								<img src="./info-3.png" />
								<h3 style="margin: 19px 0;">数据传输加密</h3>
								<p>采用国际标准的SSL安全加密，保障交易信息在传输过程中的安全性。</p>
							</div>
						</a>
					</div>
					<!-- 第四张 -->
					<div class="mui-slider-item">
						<a href="#">
							<div class="risk-item">
								<span class="num">04</span>
								<img src="./info-4.png" width="35px" />
								<h3>用户敏感数据加密</h3>
								<p>平台用户所有隐私数据均加密存储，防止用户重要隐私数据的泄露。</p>
							</div>
						</a>
					</div>
					<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a href="#">
							<div class="risk-item">
								<span class="num">01</span>
								<img src="./info-1.png" />
								<h3>3层安全防护体系</h3>
								<p>数据库3层安全防护体系采用DDOS防护、IP白名单配置、数据库攻击防护保障数据库安全。</p>
							</div>
						</a>
					</div>
				</div>
				<div class="mui-slider-indicator">
					<div class="mui-indicator mui-active"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
				</div>
			</div>
		</div>
		<div class="contract">
			<h2 class="title">电子合同</h2>
			<p>前海领投携手第三方电子合同签约服务平台e签宝，为出借人提供中立、公证、可信、安全、合法合规的电子合同服务，那么出借人在前海领投出借后即可直接在线签订合同并盖章。前海领投签署的每一份电子版合同或协议都将经过技术加密，并存储在国家认证的CA机构，无法被他人篡改，其法律效力就等同于手写签名或盖章的纸质合同或协议，从而保证了出借人的利益，让出借人消除因合同有效性而带来的资金安全问题的疑虑。</p>
			<p>出借人在前海领投交易成功后，会收到签有电子签章的电子合同（PDF格式），此时出借人可自行验证出借合同和签章的真伪，不用担心交易作假。</p>
			<p>验证电子合同有效性，请登录
				<a href="https://www.tsign.cn/verify/verify.html">https://www.tsign.cn/verify/verify.html</a>随时查询。</p>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				app:false
			}
		},
		mounted() {
			this.$nextTick(() => {
				mui(".mui-slider").slider();
			})
		},
		created() {
			 if(this.$route.query.app) {
				this.app=this.$route.query.app;
			}
		}
	}
</script>

<style lang="scss">
	.security {
		background: #F2F2F2;
		/*mui-slider公共start*/
		.mui-slider {
			padding-bottom: 30px;
		}
		.mui-slider-item {
			padding: 35px 15px 15px;
		}
		.mui-slider-indicator {
			bottom: 12px;
			.mui-indicator {
				width: 8px;
				height: 8px;
				box-shadow: none !important;
				background: #e5e5e5;
			}
			.mui-active {
				background-color: #1e82d2 !important;
				box-shadow: none !important;
			}
		}
		.risk-item {
			box-sizing: border-box;
			padding: 15px;
			background-color: #ffffff;
			border-radius: 6px;
			line-height: initial;
			color: #2c2c2c;
			text-align: center;
			h3 {
				margin: 13px 0;
				font-size: 14px;
			}
			p {
				font-size: 12px;
				line-height: 18px;
				text-align: left;
			}
		}
		/*mui-slider公共end*/
		.title {
			position: relative;
			text-align: center;
			color: #2c2c2c;
			font-size: 15px;
			font-weight: bold;
			&:after {
				content: '';
				display: block;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: -10px;
				width: 30px;
				height: 3px;
				border-radius: 3px;
				background-color: #11bbff;
			}
		}
		.banner {
			font-size: 0;
		}
		.bank-box {
			background: #FFFFFF;
			padding: 24px 15px;
			margin-bottom: 10px;
			.text {
				margin-top: 35px;
				font-size: 12px;
				line-height: 18px;
				color: #2c2c2c;
			}
			.bot {
				margin-top: 22px;
				text-align: center;
				img {
					width: 30px;
					vertical-align: middle;
				}
			}
			.icon-box {
				margin: 0 30px;
				display: inline-block;
				vertical-align: middle;
				width: 60px;
				height: 60px;
				line-height: 55px;
				text-align: center;
				box-shadow: 0px 0px 10px 0px rgba(17, 187, 255, 0.2);
				border: solid 1px #def6ff;
				border-radius: 50%;
			}
			.hand {
				display: inline-block;
				vertical-align: middle;
				width: 30px;
			}
		}
		.manage-risk {
			background: #FFFFFF;
			padding-top: 24px;
			margin-bottom: 10px;
			.risk-item {
				box-shadow: 0px 0px 10px 0px rgba(17, 187, 255, 0.2);
				img {
					width: 40px;
				}
			}
		}
		.money-box {
			background: #FFFFFF;
			padding: 24px 15px 24px;
			margin-bottom: 10px;
			.text {
				margin: 35px 0 15px;
			}
			p {
				font-size: 12px;
				line-height: 18px;
				color: #2c2c2c;
			}
		}
		.info-box {
			background: #FFFFFF;
			padding-top: 24px;
			margin-bottom: 10px;
			.main {
				margin-top: 35px;
				padding: 0 15px;
				display: flex;
				font-size: 0;
				.img-box {
					margin-right: 15px;
					display: inline-block;
					vertical-align: top;
					width: 75px;
					height: 75px;
					line-height: 75px;
					background-color: #ffffff;
					box-shadow: 0px 0px 10px 0px rgba(17, 187, 255, 0.2);
					border-radius: 6px;
					text-align: center;
					>img {
						width: 40px;
						vertical-align: middle;
					}
				}
				.text-box {
					flex: 1;
					h4 {
						font-size: 12px;
						font-weight: bold;
					}
					.text {
						margin-top: 10px;
						font-size: 12px;
						line-height: 18px;
					}
				}
			}
			.risk-item {
				position: relative;
				@include border-box-1px(#d2d2d2, 22px);
				.num{
					position: absolute;
					top: 15px;
					left: 15px;
					font-size: 24px;
					color: #cccccc;
				}
				img {
					width: 40px;
				}
			}
		}
		.contract {
			padding: 24px 15px 18px;
			background: #FFFFFF;
			.title {
				margin-bottom: 35px;
			}
			p {
				margin-bottom: 10px;
				font-size: 12px;
				color: #2c2c2c;
				text-align: justify;
				line-height: 18px;
				&:last-child {
					text-align: left;
				}
			}
			a {
				color: #11bbff;
			}
		}
		.knowBank{
			display: block;
			text-align: center;
			padding: 10px 10px 6px 10px;
		}
	}
</style>