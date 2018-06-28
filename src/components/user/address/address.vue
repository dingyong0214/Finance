<template>
	<div class="address">
		<ul>
			<li v-for="(item,i) in list">
				<div class="content border-1px">
					<div class="user-box">
						<span class="name">{{item.ShouHuoRen}}</span>
						<span class="tel">{{item.Phone}}</span>
					</div>
					<p>{{item.Area}}{{item.Address}}</p>
				</div>
				<div class="operate">
					<label>
						<input class="checkbox" @change="setDefault(item,i)" type="checkbox" v-model="item.IsDefault" :disabled="item.IsDefault" value="" /> <!--:checked="item.IsDefault"-->
						<!--<i class="iconfont icon-gou1" :class="{round:1}"></i>-->
						<span>默认地址</span>
					</label>
					<div class="right">
						<router-link :to="{name:'editAddress',query:{type:1,id:item.Id,title:'编辑地址'}}" class="edit">
							<i class="mui-icon mui-icon-compose"></i>
							<span>编辑</span>
						</router-link>
						<a class="delete" @tap="del(item)">
							<i class="mui-icon mui-icon-trash"></i>
							<span>删除</span>
						</a>
					</div>
				</div>
			</li>
		</ul>
		<router-link :to="{name:'editAddress',query:{type:0,title:'添加地址'}}" tag="button" class="mui-btn mui-btn-primary mui-btn-block">
			添加新地址
		</router-link>
		<tips v-show="isTips"></tips>
	</div>
</template>

<script>
	import tips from "@/common/components/tips/tips"

	export default {
		data() {
			return {
				list: [],
				loading: null,
				isTips: false
			}
		},
		created: function() {
			this.loading = this.sui.wait(true, '正在加载');
			this.sui.request('User/GetAddressList', {}, "get", (data) => {
				this.loading = this.sui.closewait(this.loading);
				if(data) {
					if(data.IsPass) {
						if(data.ReturnList.length) {
							this.list = data.ReturnList;
						} else {
							this.isTips = true;
						}
					}
				}
			})
		},
		beforeDestroy: function() {
			mui.closePopups();
		},
		methods: {
			setDefault(item, i) {
				//设置默认地址
				this.loading = this.sui.wait(true, '请稍候');
				this.sui.request("User/SetDefaultAddress", {
					id: item.Id
				}, "get", (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						if(data.IsPass) {
							this.list.forEach(item => item.IsDefault = false);
							this.list.unshift(this.list.splice(this.list.indexOf(item), 1)[0]);
							item.IsDefault = true;
							mui.toast("设置成功");
						} else {
							mui.toast(data.Desc)
						}
					}
				})
			},
			del(item) {
				//删除地址
				mui.confirm('', '是否删除地址？', (e) => {
					if(e.index == 1) {
						this.sui.request('User/DelAddress', {
							id: item.Id
						}, "get", (data) => {
							if(data) {
								if(data.IsPass) {
									this.list.splice(this.list.indexOf(item), 1);
									mui.toast('删除成功');
								} else {
									mui.toast(data.Desc)
								}
							}
						})
					}
				})
			}
		},
		components: {
			tips
		}
	}
</script>

<style lang="scss">
	.address {
		padding-bottom: 50px;
		ul {
			>li {
				margin-bottom: 10px;
				background: #FFFFFF;
				.content {
					padding: 15px;
					@include border-1px(#d9d9d9);
					.user-box {
						position: relative;
						margin-bottom: 12px;
						color: #2c2c2c;
						font-size: 0;
						>span {
							display: inline-block;
							font-size: 16px;
							&.name {
								margin-right: 20px;
							}
							&.default {
								position: absolute;
								right: 0;
								top: 0;
								color: #00aaee;
							}
						}
					}
					>p {
						color: #2c2c2c;
						line-height: 18px;
						font-size: 14px;
					}
				}
				.operate {
					position: relative;
					padding: 0 15px;
					height: 39px;
					line-height: 38px;
					font-size: 0;
					.right {
						position: absolute;
						top: 0;
						right: 15px;
						span {
							&:active {
								opacity: 0.5;
							}
						}
						.edit {
							margin-right: 20px;
						}
					}
					label,
					a {
						display: inline-block;
						vertical-align: middle;
						font-size: 0;
						line-height: 39px;
						color: #2c2c2c;
						input {
							margin-bottom: -3px;
							&:checked:disabled {
								opacity: 1 !important;
							}
						}
						i {
							display: inline-block;
							vertical-align: top;
							margin-right: 3px;
							line-height: inherit;
							&.iconfont {
								margin-right: 6px;
								font-size: 20px;
								color: #1e82d2;
							}
						}
						span {
							display: inline-block;
							height: 39px;
							line-height: 41px;
							vertical-align: bottom;
							font-size: 15px;
						}
					}
					label {
						span {
							margin-left: 30px;
						}
					}
				}
			}
		}
		.mui-btn {
			position: fixed;
			bottom: 0;
			border-radius: 0;
			margin-bottom: 0;
		}
	}
</style>