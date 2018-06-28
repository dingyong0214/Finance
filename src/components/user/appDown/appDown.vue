<template>
	<div class="appDown">
		<div class="cont">
			<img class="logo" src="./logo.png" />
			<h1 class="name">前海领投APP</h1>
			<button class="mui-btn mui-btn-primary mui-btn-outlined mui-btn-block" onclick="window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=io.dcloud.H528FA023'">
				立即下载
			</button>
		</div>
		<img class="background" src="./bg-2.png" />
	</div>
</template>

<script>
</script>

<style lang="scss">
	.appDown {
		max-width: 640px;
		margin: 0 auto;
		padding: 0 15px;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
		background: url(bg-1.png) no-repeat center top/100% #FFFFFF;
		text-align: center;
		.cont {
			width: 100%;
			position: relative;
			z-index: 10;
		}
		.logo {
			margin-top: 55px;
			width: 85px;
		}
		.name {
			margin: 20px 0 30px;
			color: #1e82d2;
			font-weight: bold;
			font-size: 18px;
		}
		.background {
			width: 100%;
			position: absolute;
			bottom: 0;
			left: 0;
			z-index: 1;
		}
	}
</style>