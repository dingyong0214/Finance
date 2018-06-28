<template>
	<div class="loanApply">
		<h2>10秒钟登记，急速获取借款</h2>
		<ul>
			<li class="mui-table-view-cell default-bg">
				<span class="text">姓名：</span>
				<input type="text" value="" placeholder="请输入您的称呼" v-model="applyForm.Name" />
			</li>
			<li class="mui-table-view-cell default-bg">
				<span class="text">手机号：</span>
				<input maxlength="11" type="text" value="" placeholder="请输入您的电话号码" v-model="applyForm.Phone" />
			</li>
			<!--<li class="mui-table-view-cell default-bg">
				<span class="text">工作类型</span>
				<span class="text">自雇人士（1.09%/月）</span>
				<i class="mui-icon mui-icon-arrowright"></i>
			</li>-->
		</ul>
		<div class="btn-box">
			<button class="mui-btn mui-btn-primary mui-btn-block" @tap="btnApply">立即申请</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				applyForm: {
					Name: "",
					Phone: ""
				}
			}
		},
		methods: {
			btnApply: function() {
				//提交申请
				if(this.sui.IsNullOrEmpty(this.applyForm.Name)) {
					mui.toast('请输入姓名');
					return;
				} else if(this.sui.IsNullOrEmpty(this.applyForm.Phone)) {
					mui.toast('请输入手机号码');
					return;
				} else if(!this.applyForm.Phone.isMobile()) {
					mui.toast('请输入正确的手机号');
					return;
				}
				this.loading = this.sui.wait(true, '请稍候...');
				this.sui.post('Loan/LoanApply', this.applyForm, (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						var IsPass = data.IsPass;
						if(IsPass) {
							mui.toast('您的申请已提交成功，我们会尽快与您联系');
							this.$router.go(-1);
						} else {
							mui.toast(data.Desc);
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.loanApply {
		position: fixed;
		width: 100%;
		top: 0;
		bottom: 0;
		background: #FFFFFF;
		z-index: 100;
		>h2 {
			padding: 50px 0;
			text-align: center;
			font-size: 20px;
			color: #2c2c2c;
		}
		ul {
			.mui-table-view-cell {
				margin-bottom: 20px;
				display: flex;
				position: relative;
				padding: 0 15px;
				height: 44px;
				line-height: 44px;
				font-size: 0;
				&.default-bg {
					background: #FFFFFF !important;
				}
				&:last-child:after {
					height: 1px;
				}
				.text {
					display: inline-block;
					vertical-align: top;
					margin-right: 10px;
					font-size: 16px;
				}
				.mui-icon {
					position: absolute;
					line-height: 44px;
					top: 0;
					right: 18px;
					color: #999999;
					/*background: #FFFFFF;*/
				}
				input {
					flex: 1;
					padding-left: 0;
					margin: 0;
					height: 100%;
					color: #2c2c2c;
					border: none;
					font-size: 16px;
				}
			}
		}
		.btn-box {
			margin-top: 44px;
			padding: 0 15px;
		}
	}
</style>