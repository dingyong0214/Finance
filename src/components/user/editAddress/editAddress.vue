<template>
	<div class="editAddress" v-show="show">
		<div class="list-box">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<span class="text">收货人：</span>
					<input type="text" v-model="model.ShouHuoRen" placeholder="请填写收货人姓名" />
				</li>
				<li class="mui-table-view-cell">
					<span class="text">手机号码：</span>
					<input type="text" maxlength="11" v-model="model.Phone" placeholder="请填写收货人手机号码" />
				</li>
				<li class="mui-table-view-cell" @tap.stop="pickerShow">
					<span class="text">所在地区：</span>
					<div class="address-text">
						{{model.Area}}
						<input type="text" v-model="model.AreaCode" placeholder="请选择省份/城市/地区" disable="disable" onfocus="this.blur()" />
					</div>
					<i class="mui-icon mui-icon-arrowright"></i>
				</li>
			</ul>
		</div>
		<div class="detail">
			<textarea v-model="model.Address" placeholder="请填写详细地址，不少于5个字"></textarea>
		</div>
		<div class="default">
			<span>设置为默认地址：</span>
			<div id="switch" class="mui-switch mui-switch-mini" @toggle="statusBtn" :class="{'mui-active':model.IsDefault}">
				<div class="mui-switch-handle"></div>
			</div>
		</div>
		<div class="btn-box">
			<button class="mui-btn mui-btn-primary mui-btn-block" @tap="save">保存</button>
		</div>
	</div>
</template>

<script>
	import { cityData } from "@/common/js/cityData.js"

	export default {
		data() {
			return {
				picker: null,
				loading: null,
				show: false,
				model: {
					ShouHuoRen: '',
					Phone: '',
					Address: '',
					IsDefault: true,
					Area: '',
					AreaCode: ''
				},
			}
		},
		created: function() {
			document.title = this.$route.query.title;
			this.loading = this.sui.wait(true, '正在加载');
			this.picker = new mui.PopPicker({
				layer: 3
			});
			this.picker.setData(cityData);

			//type=0 添加地址 type=1 编辑地址
			if(this.$route.query.type != 0) {
				this.sui.request("User/GetAddress", {
					id: this.$route.query.id
				}, "get", (data) => {
					this.model = data.ReturnObject;
					this.loading = this.sui.closewait(this.loading);
					this.show = true;
					let arr = data.ReturnObject2.split("^");
					if(arr.length >= 2) {
						this.picker.pickers[0].setSelectedValue(arr[1]);
					}
					if(arr.length >= 3) {
						setTimeout(() => {
							this.picker.pickers[1].setSelectedValue(arr[2]);
						}, 100)
					}
					if(arr.length >= 4) {
						setTimeout(() => {
							this.picker.pickers[2].setSelectedValue(arr[3]);
						}, 200)
					}
				})
			} else {
				this.loading = this.sui.closewait(this.loading);
				this.show = true;
			}
		},
		mounted: function() {
			this.$nextTick(() => {
				mui('.mui-switch')['switch']();
			})
		},
		beforeDestroy: function() {
			this.loading = this.sui.closewait(this.loading);
			this.picker.dispose();
			this.picker = null;
		},
		methods: {
			statusBtn(event) {
				if(event.detail.isActive) {
					this.model.IsDefault = true;
				} else {
					this.model.IsDefault = false;
				}
			},
			pickerShow() {
				//地址选择器显示
				document.activeElement.blur();
				setTimeout(() => {
					this.picker.show((items) => {
						this.model.Area = (items[0].t || "") + (items[1].t || "") + (items[2].t || "");
						this.model.AreaCode = items[2].v || items[1].v || items[0].v;
					})
				}, 280)
			},
			save() {
				//保存地址
				if(this.sui.IsNullOrEmpty(this.model.ShouHuoRen)) {
					mui.toast('请填写收货人姓名');
					return;
				} else if(this.sui.IsNullOrEmpty(this.model.Phone)) {
					mui.toast('请输入收货人手机号码');
					return;
				} else if(!this.model.Phone.isMobile()) {
					mui.toast("请输入正确的手机号码");
					return;
				} else if(this.sui.IsNullOrEmpty(this.model.Area)) {
					mui.toast('请选择所在省份/城市/地区');
					return;
				} else if(this.sui.IsNullOrEmpty(this.model.Address)) {
					mui.toast('详细地址不能为空');
					return;
				} else if(this.model.Address.length < 5) {
					mui.toast('详细地址不少于5个字');
					return;
				}

				this.loading = this.sui.wait(true, '请稍候');
				//type=0 添加地址 type=1 编辑地址
				this.sui.request('User/' + ['AddAddress', 'ModifyAddress'][this.$route.query.type], this.model, "post", (data) => {
					this.loading = this.sui.closewait(this.loading);
					if(data) {
						if(data.IsPass) {
							this.$router.go(-1);
							mui.toast('保存成功');
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
	.editAddress {
		.list-box {
			.mui-table-view {
				.mui-table-view-cell {
					display: flex;
					position: relative;
					padding: 0 15px;
					height: 44px;
					line-height: 44px;
					font-size: 0;
					background: #FFFFFF !important;
					.text {
						display: inline-block;
						vertical-align: top;
						width: 90px;
						flex: 0 0 90px;
						font-size: 16px;
					}
					.mui-icon {
						position: absolute;
						line-height: 44px;
						top: 0;
						right: 18px;
						color: #999999;
						background: #FFFFFF;
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
					.address-text {
						position: relative;
						flex: 1;
						font-size: 16px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						padding-right: 30px;
						input {
							position: absolute;
							top: 0;
							opacity: 0;
						}
					}
				}
			}
		}
		.detail {
			textarea {
				height: 84px;
				font-size: 16px;
				border: none;
			}
		}
		.default {
			position: relative;
			height: 48px;
			line-height: 48px;
			padding: 0 15px;
			font-size: 16px;
			background-color: #FFFFFF;
			span {
				color: #394659;
			}
			.mui-switch {
				position: absolute;
				right: 15px;
				top: 50%;
				margin-top: -15px;
			}
		}
		.btn-box {
			margin-top: 44px;
			padding: 0 15px;
		}
	}
</style>