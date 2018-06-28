<template>
	<div class="infoDetail">
		<h2 class="title border-1px">
			{{infoDTL.Title}}
			<router-link :to="{name:'home'}" tag="i" class="iconfont icon-shouye-nor-"></router-link>
		</h2>
		<div class="time">{{infoDTL.InsertTime}}</div>
		<div class="main" v-html="infoDTL.Content"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				infoDTL: {}
			}
		},
		created: function() {
			this.loading = this.sui.wait(true, '正在加载');
			this.sui.request('Home/NewsDetail', {
				newsId: this.$route.query.id
			}, "get", (data) => {
				this.loading = this.sui.closewait(this.loading);
				if(data) {
					if(data.IsPass) {
						this.infoDTL = JSON.parse(JSON.stringify(data.ReturnObject));
					} else {
						mui.toast(data.Desc)
					}
				}
			})
		},
		mounted: function() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.infoDetail {
		background: #FFFFFF;
		word-wrap: break-word !important;
		*{
			max-width: 100% !important;
		}
		table{
			width: 100% !important;
		}
		.title {
			position: relative;
			padding: 17px 50px;
			text-align: center;
			background: #FFFFFF;
			color: #333333;
			font-weight: bold;
			font-size: 16px;
			line-height: initial;
			@include border-1px(#E3E3EA);
			.iconfont {
				position: absolute;
				right: 0;
				top: 0;
				padding: 15px;
			}
		}
		.time {
			padding: 10px 15px;
			text-align: right;
			font-size: 12px;
			color: #CCCCCC;
			background-color: #fff;
		}
		.main {
			padding: 20px;
			word-wrap: break-word;
			img {
				max-width: 100%;
				display: block;
				margin: 0 auto;
			}
			p {
				line-height: initial;
				color: initial;
			}
		}
	}
</style>