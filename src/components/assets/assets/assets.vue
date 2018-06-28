<template>
	<div class="assets">
		<div class="card-box">
			<div class="img-bg">
				<img src="./background.png" width="100%" />
			</div>
			<div class="card">
				<div class="title">
					<i>￥</i>
					<span>资产总额</span>
					<h2 class="money">{{format(model.TotalAmount)}}</h2>
				</div>
				<div class="item-box">
					<div class="item">
						<span>账户余额</span>
						<p>{{format(model.AvailBal)}}</p>
					</div>
					<div class="item">
						<span>待收本息</span>
						<p>{{format(model.CapitalInterest)}}</p>
					</div>
					<div class="item">
						<span>冻结金额</span>
						<p>{{format(model.FreezeAmount)}}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="star-box">
			<div class="item-box">
				<div class="item">
					<span>待还金额</span>
					<p>{{format(model.RefundAmount)}}</p>
				</div>
				<div class="item">
					<span>未用红包</span>
					<p>{{format(model.HongBao)}}</p>
				</div>
				<div class="item">
					<span>未用We券</span>
					<p>{{model.RateCoupons}}</p>
				</div>
			</div>
		</div>
		<div class="money-wrapper">
			<div class="money-box">
				<div class="money">
					<span>累计出借金额</span>
					<p>{{format(model.TotalInvest)}}</p>
				</div>
				<div class="money">
					<span>待收本金</span>
					<p>{{format(model.DueInCapital)}}</p>
				</div>
				<div class="money">
					<span>待收利息</span>
					<p>{{format(model.DueInInterest)}}</p>
				</div>
			</div>
			<div class="money-box">
				<div class="money">
					<span>已赚利息</span>
					<p>{{format(model.EarnInterest)}}</p>
				</div>
				<div class="money">
					<span>已赚出借奖励</span>
					<p>{{format(model.EarnRaiseInterest)}}</p>
				</div>
				<div class="money">
					<span>待领奖励</span>
					<p>{{format(model.UnclaimedAward)}}</p>
				</div>
			</div>
		</div>
		<div class="link-box">
			<ul class="mui-table-view">
				<!--<router-link :to="{name:'assetsRecords',query:{type:2,title:'月账户'}}" tag="li" class="mui-table-view-cell">
					<span class="text">月账户</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</router-link>
				<router-link :to="{name:'assetsRecords',query:{type:3,title:'年账户'}}" tag="li" class="mui-table-view-cell">
					<span class="text">年账户</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</router-link>-->
				<router-link :to="{name:'assetsRecords',query:{type:1,title:'房易融'}}" tag="li" class="mui-table-view-cell">
					<span class="text">房易融</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</router-link>
				<router-link :to="{name:'myTransfer',params:{index:2}}" tag="li" class="mui-table-view-cell">
					<span class="text">债权转让</span>
					<i class="mui-icon mui-icon-arrowright"></i>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				model: {}
			}
		},
		created() {
			if(!this.sui.isLogin()) {
				return;
			}

			this.loading = this.sui.wait(true, '正在加载');
			this.sui.request('Account/FundSummary', {}, "get", (data) => {
				this.loading = this.sui.closewait(this.loading);
				if(data) {
					if(data.IsPass) {
						this.model = data.ReturnObject;
					} else {
						mui.toast(data.Desc);
					}
				}
			});
		},
		methods: {
			format(value) {
				var val = 0;
				if(value) {
					val = value
				}
				return this.sui.rmoney(val);
			}
		}
	}
</script>

<style lang="scss">
	.assets {
		padding-bottom: 50px;
		background: #f7f7f9;
		.card-box {
			position: relative;
			padding: 30px 15px 0;
			.img-bg {
				position: absolute;
				left: 0;
				top: 0;
				bottom: 0;
				width: 100%;
				background: #FFFFFF;
				img {
					max-height: 200px;
				}
			}
			.card {
				position: relative;
				padding: 20px 0;
				background: #FFFFFF;
				box-shadow: 0px 3px 20px 0px rgba(153, 153, 153, 0.3);
				border-radius: 12px;
				&:after,
				&:before {
					content: '';
					position: absolute;
					top: 50%;
					transform: translate(0, -50%);
					width: 19px;
					height: 19px;
					background: #1e82d2;
					border-radius: 50%;
				}
				&:after {
					right: -9px;
				}
				&:before {
					left: -9px;
				}
				.title {
					font-size: 0;
					text-align: center;
					i {
						display: inline-block;
						vertical-align: middle;
						width: 18px;
						height: 18px;
						line-height: 18px;
						text-align: center;
						color: #ffffff;
						font-size: 12px;
						border-radius: 50%;
						background-color: #1e82d2;
					}
					span {
						display: inline-block;
						vertical-align: middle;
						margin-left: 7px;
						font-size: 16px;
						color: #1e82d2;
					}
					.money {
						margin: 25px;
						color: #1e82d2;
						font-size: 24px;
					}
				}
				.item-box {
					display: flex;
					.item {
						flex: 1;
						text-align: center;
						span {
							font-size: 14px;
							color: #999999;
						}
						p {
							margin-top: 15px;
							font-size: 14px;
							color: #2c2c2c;
						}
					}
				}
			}
		}
		.star-box {
			background: #FFFFFF;
			margin-bottom: 10px;
			.item-box {
				display: flex;
				padding: 30px 0;
				.item {
					position: relative;
					flex: 1;
					text-align: center;
					&:after {
						content: '';
						position: absolute;
						right: -1px;
						top: 3px;
						bottom: 3px;
						width: 1px;
						border-left: 1px solid #e5e5e5;
						@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio:1.5) {
							transform: scaleX(0.7);
							-webkit-transform: scaleX(0.7);
						}
						@media (-webkit-min-device-pixel-ratio:2),
						(min-device-pixel-ratio:2) {
							transform: scaleX(0.5);
							-webkit-transform: scaleX(0.5);
						}
						@media (-webkit-min-device-pixel-ratio:3),
						(min-device-pixel-ratio:3) {
							-webkit-transform: scaleX(.35);
							transform: scaleX(.35);
						}
					}
					&:last-child {
						@include border-none()
					}
					span {
						font-size: 14px;
						color: #999999;
					}
					p {
						margin-top: 15px;
						font-size: 16px;
						color: #2c2c2c;
					}
				}
			}
		}
		.money-wrapper {
			margin-bottom: 10px;
			padding: 20px 15px;
			background: #FFFFFF;
			.money-box {
				display: flex;
				margin-bottom: 28px;
				&:last-child {
					margin-bottom: 0;
				}
				.money {
					display: inline-block;
					vertical-align: top;
					flex: 1;
					&:last-child {
						margin-right: 0;
					}
					span {
						display: inline-block;
						vertical-align: middle;
						width: 100%;
						text-align: center;
						font-size: 14px;
						white-space: nowrap;
						color: #999999;
						min-width: 101px;
						&:before {
							content: '';
							margin-top: -3px;
							margin-right: 5px;
							display: inline-block;
							vertical-align: middle;
							width: 8px;
							height: 8px;
							border-radius: 50%;
							background-color: #0093ee;
						}
					}
					p {
						margin-top: 15px;
						text-align: center;
						font-size: 16px;
						color: #2c2c2c;
					}
				}
			}
		}
		.link-box {
			margin-bottom: 10px;
			.mui-table-view {
				.mui-table-view-cell {
					position: relative;
					padding: 0 15px;
					height: 44px;
					line-height: 44px;
					font-size: 0;
					.text {
						display: inline-block;
						vertical-align: top;
						font-size: 16px;
						line-height: 46px;
					}
					.mui-icon {
						position: absolute;
						line-height: 44px;
						right: 18px;
						color: #999999;
					}
				}
			}
		}
	}
</style>