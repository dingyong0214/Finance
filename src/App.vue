<template>
	<div id="app">
		<!--<keep-alive :include="['myTransfer','home']">
		</keep-alive>-->
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
		
		<div class="nav" v-show="$route.meta.nav=='home'||$route.meta.nav=='investment'||$route.meta.nav=='assets'||$route.meta.nav=='user'">
			<div>
				<router-link to="/home">
					<i class="iconfont" :class="{'icon-shouye-sel-':$route.meta.nav=='home','icon-shouye-nor-':$route.meta.nav!='home'}"></i>
					<span>首页</span>
				</router-link>
			</div>
			<div>
				<router-link to="/investment">
					<i class="iconfont" :class="{'icon-touzi-sel':$route.meta.nav=='investment','icon-touzi-nor':$route.meta.nav!='investment'}"></i>
					<span>出借</span>
				</router-link>
			</div>
			<div>
				<router-link to="/assets">
					<i class="iconfont" :class="{'icon-zichan-sel-':$route.meta.nav=='assets','icon-zichan':$route.meta.nav!='assets'}"></i>
					<span>资产</span>
				</router-link>
			</div>
			<div>
				<router-link to="/user">
					<i class="iconfont" :class="{'icon-wode-sel-':$route.meta.nav=='user','icon-wode1':$route.meta.nav!='user'}"></i>
					<span>我的</span>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style lang="scss">
	.nav {
		position: fixed;
		bottom: 0;
		display: flex;
		width: 100%;
		height: 50px;
		background: #FFFFFF;
		-webkit-box-shadow: 0 0 1px rgba(0, 0, 0, .85);
		box-shadow: 0 0 1px rgba(0, 0, 0, .85);
		div {
			flex: 1;
			text-align: center;
			a {
				display: block;
				width: 100%;
				height: 100%;
				font-size: 14px;
				color: rgb(77, 85, 93);
				&.router-link-active {
					color: #1e82d2;
				}
				.iconfont {
					padding: 8px 0 5px;
					display: block;
					font-size: 18px;
				}
				span {
					font-size: 10px;
				}
			}
			.active {
				color: rgb(240, 20, 20);
			}
		}
	}
</style>