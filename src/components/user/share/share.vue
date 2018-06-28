<template>
	<div class="share">
		<img src="../../../../build/logo.png" />
		<p>扫一扫，推荐好友，领取奖励</p>
		<button class="mui-btn mui-btn-primary mui-btn-block">分享</button>
	</div>
</template>

<script>
</script>

<style lang="scss">
	.share {
		position: fixed;
		width: 100%;
		top: 0;
		bottom: 0;
		background: #FFFFFF;
		z-index: 100;
		text-align: center;
		img {
			margin-top: 110px;
			margin-bottom: 25px;
		}
		p {
			font-size: 14px;
			color: #2c2c2c;
		}
		.mui-btn {
			position: fixed;
			bottom: 0;
			border-radius: 0;
			margin-bottom: 0;
		}
	}
</style>