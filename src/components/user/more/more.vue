<template>
	<div class="more">
		<div class="logo-box">
			<img src="./logo.png" width="50%"/>
		</div>
		<div class="list-box">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<router-link :to="{name:'help'}" tag="div">
						<span class="text">帮助中心</span>
						<i class="mui-icon mui-icon-arrowright"></i>
					</router-link>
				</li>
				<li class="mui-table-view-cell">
					<router-link :to="{name:'contactUs'}" tag="div">
						<span class="text">联系我们</span>
						<i class="mui-icon mui-icon-arrowright"></i>
					</router-link>
				</li>
				<li class="mui-table-view-cell">
					<router-link :to="{name:'information'}" tag="div">
						<span class="text">关于我们</span>
						<i class="mui-icon mui-icon-arrowright"></i>
					</router-link>
				</li>
				<li class="mui-table-view-cell">
					<router-link :to="{name:'opinion'}" tag="div">
						<span class="text">意见反馈</span>
						<i class="mui-icon mui-icon-arrowright"></i>
					</router-link>
				</li>
			</ul>
		</div>	
	</div>
</template>

<script>
</script>

<style lang="scss">
	.more{
		position: fixed;
		width: 100%;
		top: 0;
		bottom: 0;
		background: #f7f7f9;
		z-index: 100;
		.logo-box{
			margin-top: 110px;
			text-align: center;
		}
		.list-box{
			margin-top: 90px;
			.mui-table-view{
				.mui-table-view-cell{
					position: relative;
					padding: 0 15px;
					height: 44px;
					line-height: 44px;
					font-size: 0;
					.text{
						font-size: 16px;
					}
					.mui-icon{
						position: absolute;
						line-height: 44px;
						right: 18px;
						color: #999999;;
					}
				}
			}
		}
	}
</style>