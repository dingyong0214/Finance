<template>
	<div class="calendar">
		<div class="title">
			<h2 @tap="showPicker">{{getDate}}<i class="iconfont icon-xia-copy"></i></h2>
			<span class="mui-icon mui-icon-arrowleft" @tap="upOrDown(0)"></span>
			<span class="mui-icon mui-icon-arrowright" @tap="upOrDown(1)"></span>
		</div>
		<ul class="cal-head">
			<li>日</li>
			<li>一</li>
			<li>二</li>
			<li>三</li>
			<li>四</li>
			<li>五</li>
			<li>六</li>
		</ul>
		<ul class="cal-body">
			<li v-for="n in getDay"></li>
			<li @click="link(item,index)" v-for="(item,index) in dateList">
				<span :class="{today:isToday(index+1),abnormal:item==3,normal:item==1,overdue:item==4&&url=='repayCalendarDTL'}">{{index+1}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			url: {
				type: String
			},
			dateList: {
				type: Array,
				default() {
					return [];
				}
			},
			CurrentDate: {
				type: String,
				default: ""
			},
			Today: {
				type: String
			}
		},
		data() {
			return {
				picker: null
			}
		},
		methods: {
			showPicker() {
				//弹出日期选择器
				this.picker.show((item) => {
					this.$emit('picker', item);
				});
			},
			upOrDown(i) {
				this.$emit('switchDate', i);
			},
			link(state, index) {
				if(state != 2) {
					var d = this.sui.formatDate('y-m', this.CurrentDate) + "-" + (index + 1);
					this.$router.push({
						name: this.url,
						query: {
							oDate: d
						}
					})
				}
			},
			isToday(index) {
				//判断当前日期
				var active = false;
				if(this.sui.formatDate('y-m', this.CurrentDate) == this.sui.formatDate('y-m', this.Today) && index == this.sui.formatDate('d', this.Today)) {
					active = true;
				}
				return active;
			},

		},
		computed: {
			getDay() {
				//获取当月第一天，得出1号是星期几，以此循环
				var week = 0;
				if(this.CurrentDate) {
					week = new Date(this.sui.formatDate('y-m', this.CurrentDate)).getDay();
				}
				return week;
			},
			getDate() {
				//格式化日期
				return this.sui.formatDate('y年m月', this.CurrentDate);
			}
		},
		created: function() {

		},
		mounted: function() {
			this.$nextTick(() => {
				this.picker = new mui.DtPicker({
					"type": "month"
				});
			})
		},
		beforeDestroy: function() {
			this.picker.dispose();
			this.picker = null;
		}
	}
</script>

<style lang="scss">
	.calendar {
		background: #FFFFFF;
		overflow: hidden;
		.title {
			position: relative;
			padding: 20px 0 25px;
			text-align: center;
			h2 {
				position: relative;
				display: inline-block;
				vertical-align: top;
				font-size: 16px;
				color: #2c2c2c;
				i {
					position: absolute;
					right: -18px;
					top: 50%;
					transform: translateY(-50%);
					font-size: 12px;
					color: #666666;
				}
			}
			.mui-icon {
				position: absolute;
				color: #999999;
				top: 15px;
				font-size: 25px !important;
				&:active {
					opacity: 0.5;
				}
			}
			.mui-icon-arrowleft {
				left: 25px;
			}
			.mui-icon-arrowright {
				right: 25px;
			}
		}
		ul {
			overflow: hidden;
			li {
				float: left;
				display: inline-block;
				width: 14.28%;
				color: #999999;
				margin-bottom: 20px;
				height: 27px;
				line-height: 27px;
				text-align: center;
				font-size: 14px;
				span {
					display: inline-block;
					border-radius: 50%;
					width: 27px;
					height: 27px;
					&.today {
						color: #FFFFFF;
						background-color: #1e82d2;
					}
					&.abnormal {
						color: #FFFFFF;
						background-color: #cbcbcb;
					}
					&.normal {
						color: #FFFFFF;
						background-color: #ff6600;
					}
					&.overdue {
						color: #FFFFFF;
						background-color: #f53f3f;
					}
				}
			}
		}
	}
</style>