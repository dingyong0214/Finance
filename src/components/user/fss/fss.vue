<template>
	<div class="fss">
		<div class="header">
			<div class="bold">
				<h2>289654.00</h2>
				<p>生利宝余额</p>
			</div>
			<div class="item-box">
				<div class="item">
					<p>最近收益</p>
					<h3>20025.00</h3>
				</div>
				<div class="item">
					<p>累计收益</p>
					<h3>28888.00</h3>
				</div>
				<div class="item">
					<p>近7天年化利率</p>
					<h3>8.0%</h3>
				</div>
			</div>
			<i class="iconfont icon-wenhao"></i>
		</div>
		<ul class="fss-list">
			<li class="border-1px">
				<div class="money-box">
					<p class="money">+20000.00</p>
					<p class="status">转入</p>
				</div>
				<div class="date-box">
					<span class="date">2017-10-12&nbsp;&nbsp;09:12</span>
				</div>
			</li>
			<li class="border-1px">
				<div class="money-box">
					<p class="money">+20000.00</p>
					<p class="status">转入</p>
				</div>
				<div class="date-box">
					<span class="date">2017-10-12&nbsp;&nbsp;09:12</span>
				</div>
			</li>
			<li class="border-1px">
				<div class="money-box">
					<p class="money">+20000.00</p>
					<p class="status">转入</p>
				</div>
				<div class="date-box">
					<span class="date">2017-10-12&nbsp;&nbsp;09:12</span>
				</div>
			</li>
			<li class="border-1px">
				<div class="money-box">
					<p class="money">+20000.00</p>
					<p class="status">转入</p>
				</div>
				<div class="date-box">
					<span class="date">2017-10-12&nbsp;&nbsp;09:12</span>
				</div>
			</li>
			<li class="border-1px">
				<div class="money-box">
					<p class="money">+20000.00</p>
					<p class="status">转入</p>
				</div>
				<div class="date-box">
					<span class="date">2017-10-12&nbsp;&nbsp;09:12</span>
				</div>
			</li>
			<li class="border-1px">
				<div class="money-box">
					<p class="money">+20000.00</p>
					<p class="status">转入</p>
				</div>
				<div class="date-box">
					<span class="date">2017-10-12&nbsp;&nbsp;09:12</span>
				</div>
			</li>
			<li class="border-1px">
				<div class="money-box">
					<p class="money">+20000.00</p>
					<p class="status">转入</p>
				</div>
				<div class="date-box">
					<span class="date">2017-10-12&nbsp;&nbsp;09:12</span>
				</div>
			</li>
			<li class="border-1px">
				<div class="money-box">
					<p class="money">+20000.00</p>
					<p class="status">转入</p>
				</div>
				<div class="date-box">
					<span class="date">2017-10-12&nbsp;&nbsp;09:12</span>
				</div>
			</li>
		</ul>
		<div class="btn-box">
			<router-link :to="{name:'fssOperating'}" tag="div">
				<button class="mui-btn">转出</button>
			</router-link>
			<router-link :to="{name:'fssOperating'}" tag="div">
				<button class="mui-btn mui-btn-primary">转入</button>
			</router-link>
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	.fss {
		padding-bottom: 50px;
		.header {
			padding-bottom: 25px;
			background-color: #ff6600;
			p {
				color: #ffc59f;
				font-size: 14px;
				text-align: center;
			}
			.bold {
				padding: 25px 0 34px;
				text-align: center;
				h2 {
					font-size: 30px;
					color: #ffffff;
					margin-bottom: 20px;
				}
			}
			.item-box {
				display: flex;
				.item {
					flex: 1;
					text-align: center;
					p {
						margin-bottom: 15px;
					}
					h3 {
						color: #ffffff;
						font-size: 14px;
					}
				}
			}
			.iconfont {
				position: absolute;
				font-size: 20px;
				color: #fff;
				z-index: 10;
				top: 15px;
				right: 15px;
			}
		}
		.fss-list {
			padding-left: 15px;
			background: #FFFFFF;
			li {
				position: relative;
				padding: 18px 15px 18px 0;
				@include border-1px(#e5e5e5);
				p {
					font-size: 16px;
					color: #2c2c2c;
				}
				.money-box {
					.money {
						margin-bottom: 18px;
					}
				}
				.date-box {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 15px;
					font-size: 14px;
					color: #999999;
				}
			}
		}
		.btn-box {
			display: flex;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			-webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .85);
			box-shadow: 0 0 1px rgba(0, 0, 0, .85);
			>div {
				flex: 1;
				.mui-btn {
					width: 100%;
					padding: 15px 0;
					border: none;
					border-radius: 0;
					font-size: 18px;
				}
			}
		}
	}
</style>