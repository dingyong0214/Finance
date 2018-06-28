<template>
	<div class="about">
		<div class="banner">
			<img src="./banner.png" width="100%" />
		</div>
		<div class="synopsis">
			<h2 class="title">领投简介</h2>
			<p>
				深圳市前海领投互联网金融服务有限公司于2014年7月在深圳前海注册成立，是一家创新、高效的新金融服务平台。公司通过专业风险管理方法与金融科技相结合，按照“规范化、系统化、人性化”的服务标准，为国民提供综合金融解决方案。前海领投致力于让更多人成为普惠金融的受益者，促进金融知识和工具的平民化和便利性，规避和降低风险，合理规划金融配置，让金融服务大众，使人人皆可财务自由。
			</p>
		</div>

		<div class="course">
			<h2 class="title">发展历程</h2>
			<ul>
				<li>
					<div class="dateActive">
						2017年
					</div>
					<span class="date">
							2017年1月
						</span>
					<span class="round"></span>
					<div class="text">
						交易额突破5个亿
					</div>
				</li>
				<li>
					<div class="dateActive">
						2016年
					</div>
					<span class="date">
							2016年8月
						</span>
					<span class="round"></span>
					<div class="text">
						前海领投移动端APP正式上线
					</div>
				</li>
				<li class="specli">
					<span class="date">
							2016年7月
						</span>
					<span class="round"></span>
					<div class="text">
						交易额突破3个亿
					</div>
				</li>
				<li class="specli">
					<span class="date">
							2016年6月
						</span>
					<span class="round"></span>
					<div class="text">
						创办深圳市互联网金融商会创会会员单位
					</div>
				</li>
				<li>
					<div class="dateActive">
						2015年
					</div>
					<span class="date">
							2015年12月
						</span>
					<span class="round"></span>
					<div class="text">
						交易额突破1个亿
					</div>
				</li>
				<li class="specli">
					<span class="date">
							2015年11月
						</span>
					<span class="round"></span>
					<div class="text">
						快捷投标功能正式上线
					</div>
				</li>
				<li class="specli">
					<span class="date">
							2015年8月
						</span>
					<span class="round"></span>
					<div class="text">
						受邀参加深圳首届"侨交会"
					</div>
				</li>
				<li class="specli">
					<span class="date">
							2015年4月
						</span>
					<span class="round"></span>
					<div class="text">
						升级为免费模式
					</div>
				</li>
				<li class="specli">
					<span class="date">
							2015年2月
						</span>
					<span class="round"></span>
					<div class="text">
						各种认证系统上线
					</div>
				</li>
				<li>
					<div class="dateActive">
						2014年
					</div>
					<span class="date">
							2014年12月
						</span>
					<span class="round"></span>
					<div class="text">
						网站上线，前海领投正式成立
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	.about {
		.banner {
			font-size: 0;
		}
		.title {
			padding: 25px 0;
			font-size: 18px;
			color: #2c2c2c;
			text-align: center;
		}
		.synopsis {
			padding: 0 15px;
			background: #ffffff;
			margin-bottom: 7px;
			p {
				padding-bottom: 25px;
				color: #2c2c2c;
				font-size: 14px;
				line-height: 26px;
			}
		}
		.course {
			padding: 0 15px 30px;
			background: #ffffff;
			ul {
				padding-top: 15px;
				padding-bottom: 22px;
				font-size: 0;
				li {
					position: relative;
					margin-bottom: 37px;
					height: 24px;
					line-height: 24px;
					&.specli {
						padding-left: 81px;
					}
					div {
						display: inline-block;
						vertical-align: middle;
						line-height: 24px;
						line-height: 24px;
						&.dateActive {
							vertical-align: middle;
							margin-right: 10px;
							padding: 0 15px 0 17px;
							border-radius: 20px;
							text-align: center;
							font-size: 12px;
							color: #FFFFFF;
							background-color: #1e82d2;
						}
						&.text {
							position: absolute;
							top: 50%;
							transform: translate(0, -50%);
							padding: 0 8px;
							font-size: 12px;
							border-radius: 8px;
							border-top-left-radius: 0;
							background: #f4f4f4;
							color: #787878;
						}
					}
					.date {
						display: inline-block;
						vertical-align: middle;
						min-width: 67px;
						text-align: right;
						font-size: 10px;
						color: #787878;
					}
					.round {
						position: relative;
						margin: 0 15px;
						display: inline-block;
						vertical-align: middle;
						width: 12px;
						height: 12px;
						border-radius: 50%;
						background: #00aaee;
						&:after {
							content: "";
							position: absolute;
							left: 50%;
							-webkit-transform: translate(-50%, 0);
							transform: translate(-50%, 0);
							top: -24px;
							width: 1px;
							height: 61px;
							background: #00aaee;
						}
					}
				}
			}
		}
	}
</style>