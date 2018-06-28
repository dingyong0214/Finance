<template>
	<div class="fssOperating">
		<div class="input-box">
			<input type="text" value="" placeholder="请输入转入生利宝金额"/>
		</div>
		<div class="date-box">
			<span class="name">收益到账日期：</span>
			<span class="date">2017-10-23</span>
			<span class="text">日期说明</span>
		</div>
		<div class="xieyi">
			<i class="iconfont icon-gou1 active"></i>
			<p class="text">同意生利宝使用协议和国泰基金服协议</p>
		</div>
		<div class="btn-box">
			<button class="mui-btn mui-btn-primary mui-btn-block">转入</button>			
		</div>
	</div>
</template>

<script>
</script>

<style lang="scss">
	.fssOperating{
		position: fixed;
		width: 100%;
		top: 0;
		bottom: 0;
		background: #f7f7f9;
		z-index: 100;
		.input-box{
			input{
				padding: 30px 15px;
				border: none;
				font-size: 16px;
			}
		}
		.date-box{
			position: relative;
			padding: 15px;
			background: #FFFFFF;
			>span{
				font-size: 16px;
				&.name{
					color: #2c2c2c;
				}
				&.date{
					color: #1e82d2;
				}
				&.text{
					position: absolute;
					right: 15px;
					top: 50%;
					transform: translateY(-50%);
					color: #999999;
				}				
			}
		}
		.xieyi{
			margin: 20px 0 25px;
			padding: 0 15px;
			.iconfont{
				margin-right: 6px;
				display: inline-block;
				vertical-align: middle;
				font-size: 18px;
				&.active{
					color: #1e82d2;
				}
			}
			.text{
				display: inline-block;
				vertical-align: middle;
				font-size: 14px;
				color: #2c2c2c;
			}
		}
		.btn-box{
			padding: 0 15px;
		}
	}
</style>