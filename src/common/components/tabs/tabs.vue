<template>
	<div class="tabs border-1px">
		<ul>
			<li :class="{'active':type==1?currentIndex === index+1:currentIndex === index}" @tap="tabItem(index)" v-for="(item,index) in tabName">{{item.name}}</li>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			type: {
				//type: 1=出借列表
				type: Number,
				default: 0
			},
			tabName: {
				type: Array,
				default: []
			},
			currentIndex: {
				type: Number,
				default: 0
			}
		},
		methods: {
			tabItem(index) {
				if(this.type == 1) {
					this.$emit('switch', index + 1)
				} else {
					this.$emit('switch', index)
				}
			}
		}
	}
</script>

<style lang="scss">
	.tabs {
		width: 100%;
		padding: 0 25px;
		overflow: hidden;
		z-index: 100;
		background-color: #FFFFFF;
		@include border-1px(#E3E3EA);
		ul {
			display: flex;
			white-space: nowrap;
			li {
				flex: 1;
				padding: 15px 0;
				position: relative;
				display: inline-block;
				vertical-align: top;
				font-size: 15px;
				color: #2c2c2c;
				text-align: center;
				&.active {
					color: #1e82d2;
					&:after {
						content: '';
						position: absolute;
						left: 50%;
						transform: translateX(-50%);
						bottom: 0;
						width: 30px;
						height: 3px;
						background-color: #1e82d2;
					}
				}
				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
</style>