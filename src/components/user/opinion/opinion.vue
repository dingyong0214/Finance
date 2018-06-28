<template>
	<div class="opinion">
		<textarea cols="50" rows="7" placeholder="请输入您的意见反馈" v-model="opinion.AdviceDesc"></textarea>
		<button class="mui-btn mui-btn-primary mui-btn-block" @tap="submit">提交</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				opinion: {
					AdviceDesc: ""
				}
			}
		},
		methods: {
			submit() {
				if(this.sui.IsNullOrEmpty(this.opinion.AdviceDesc)) {
					mui.toast('请输入您的意见反馈');
					return;
				}
				this.sui.request('User/Feedback', this.opinion, 'post', (data) => {
					if(data) {
						if(data.IsPass) {
							mui.toast("提交成功");
							this.$router.go(-1);
						} else {
							mui.toast(data.Desc)
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.opinion {
		padding: 0 15px;
		textarea {
			display: block;
			margin: 24px 0 34px;
			width: 100%;
			height: 264px;
			border-radius: 6px;
			border: solid 1px #e5e5e5;
		}
	}
</style>