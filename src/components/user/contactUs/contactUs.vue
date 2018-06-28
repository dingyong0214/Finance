<template>
	<div class="contactUs">
		<div class="list-box">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<span class="text">客服热线：</span>
					<i>400-660-5027</i>
				</li>
				<li class="mui-table-view-cell">
					<span class="text">微信公众号：</span>
					<i>qianhailingtou</i>
				</li>
				<li class="mui-table-view-cell">
					<span class="text">新浪微博：</span>
					<i>前海领投</i>
				</li>
				<li class="mui-table-view-cell">
					<span class="text">地址：</span>
					<p><span>深圳市福田区中康路卓越城1期3座7层704-705室</span></p>
				</li>
			</ul>
		</div>	
	</div>
</template>

<script>
</script>

<style lang="scss">
	.contactUs{
		position: fixed;
		width: 100%;
		top: 0;
		bottom: 0;
		background: #f7f7f9;
		z-index: 100;
		.list-box{
			margin-top: 10px;
			.mui-table-view{
				.mui-table-view-cell{
					display: flex;
					position: relative;
					padding: 0 15px;
					height: 44px;
					line-height: 44px;
					font-size: 0;
					background: #FFFFFF !important;
					&:last-child{
						padding: 15px;
						height: auto;
						line-height: initial;
					}
					.text{
						font-size: 16px;
					}
					i{
						position: absolute;
						line-height: 44px;
						right: 18px;
						color: #999999;;
						font-size: 16px;
					}
					p{
						flex: 1;
						display: inline-block;
						text-align: right;
						font-size: 16px;
						span{
							display: inline-block;
							text-align: justify;
						}
					}
				}
			}
		}
	}
</style>