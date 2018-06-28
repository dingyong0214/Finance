<template>
	<div class="aceDesc">
		<div class="grade-desc">
			<h2>级别说明</h2>
			<div class="grade">
				<ul>
					<li class="item">
						<div class="head">
							<div class="avatar">
								<img src="static/img/1.png" />
							</div>
							<h3>新秀</h3>
						</div>
						<p>好友总待收本金＜20万，奖励年利率：0.36%</p>
					</li>
					<li class="item">
						<div class="head">
							<div class="avatar">
								<img src="static/img/2.png" />
							</div>
							<h3>少侠</h3>
						</div>
						<p>20万≤好友总待收本金＜100万，奖励年利率：0.72%</p>
					</li>
					<li class="item">
						<div class="head">
							<div class="avatar">
								<img src="static/img/3.png" />
							</div>
							<h3>大侠</h3>
						</div>
						<p>100万≤好友总待收本金＜300万，奖励年利率：0.78%</p>
					</li>
					<li class="item">
						<div class="head">
							<div class="avatar">
								<img src="static/img/4.png" />
							</div>
							<h3>掌门</h3>
						</div>
						<p>300万≤好友总待收本金＜500万，奖励年利率：0.84%</p>
					</li>
					<li class="item">
						<div class="head">
							<div class="avatar">
								<img src="static/img/5.png" />
							</div>
							<h3>宗师</h3>
						</div>
						<p>好友总待收本金和≥500万 奖励年利率：0.90%</p>
					</li>
				</ul>
			</div>

		</div>
		<div class="rule-desc">
			<h2>规则说明</h2>
			<ul>
				<li>1.只统计各邀请用户自注册日起一年内的待收本金，注册一年后此用户的待收本金不再计提奖励；</li>
				<li>2.好友总待收本金=好友A总待收本金+好友B总待收本金；</li>
				<li>3.每天凌晨2:00计算昨日奖励，发放的奖励用户需手动领取至用户余额，可用于提现或出借；</li>
				<li>4.当日奖励金额=好友总待收本金*奖励年利率/365；发放奖励金额小于0.01元，则记为0.00元；</li>
				<li>5.若发现用户恶意刷奖，前海领投有权拒绝发放奖励并取消该用户邀请好友资格；</li>
				<li>6.满天星功能邀请的用户统一升级为邀请好友。</li>
				<br/>
				<li>注：2017年11月6日之前推荐的好友，统计各邀请用户自注册日起两年内的待收本金；2017年11月6日之后推荐的好友，只统计各邀请用户自注册日起一年内的待收本金。平台所有邀请奖励金额的计算方式都按新规则进行。</li>
			</ul>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	.aceDesc {
		padding: 0 15px;
		background: #FFFFFF;
		h2 {
			position: relative;
			text-align: center;
			font-size: 15px;
			color: #2c2c2c;
			&:after {
				content: '';
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: -12px;
				width: 30px;
				height: 3px;
				background-color: #11bbff;
				border-radius: 3px;
			}
		}
		.grade-desc {
			padding-top: 24px;
			.grade {
				margin: 36px 0 34px;
				.item {
					margin-bottom: 10px;
					padding: 15px;
					box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.2);
					border-radius: 6px;
					.head {
						margin-bottom: 10px;
						font-size: 0;
						.avatar {
							display: inline-block;
							vertical-align: middle;
							width: 35px;
							height: 35px;
							img {
								width: 100%;
							}
						}
						h3 {
							margin-left: 15px;
							display: inline-block;
							vertical-align: middle;
							font-size: 15px;
						}
					}
					p {
						font-size: 14px;
						color: #4d4d4d;
					}
				}
			}
		}
		.rule-desc {
			padding-bottom: 20px;
			ul {
				margin-top: 35px;
			}
			li {
				color: #2c2c2c;
				font-size: 14px;
				line-height: 22px;
			}
		}
	}
</style>