<template>
	<div class="manage">
		<!--<tabs @switch="tabItem" :tabName="tabName" :currentIndex="currentIndex"></tabs>-->
		<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted border-1px">
			<div class="mui-scroll">
				<a class="mui-control-item" @tap="setTab(0)" :class="{'mui-active':currentIndex == 0}">
					交易数据
				</a>
				<a class="mui-control-item" @tap="setTab(1)" :class="{'mui-active':currentIndex == 1}">
					产品数据
				</a>
				<a class="mui-control-item" @tap="setTab(2)" :class="{'mui-active':currentIndex == 2}">
					风控数据
				</a>
				<a class="mui-control-item" @tap="setTab(3)" :class="{'mui-active':currentIndex == 3}">
					平台交易集中度
				</a>
				<a class="mui-control-item" @tap="setTab(4)" :class="{'mui-active':currentIndex == 4}">
					用户数据
				</a>
			</div>
		</div>
		<div class="trading" v-show="currentIndex==0">
			<div class="banner">
				<img src="./banner.jpg" />
				<div class="text-box">
					<h2>{{model.Timestamp}}</h2>
					<p>平台运营时间</p>
				</div>
			</div>
			<div class="money-wrapper border-1px">
				<div class="money-box">
					<div class="money">
						<p>{{format(model.TradeTotalAmount)}}</p>
						<span>累计交易总额</span>
					</div>
					<div class="money">
						<p>{{model.LoanNum}}</p>
						<span>借贷余额笔数</span>
					</div>
					<div class="money">
						<p>{{format(model.PaidBenjin)}}</p>
						<span>已还本金</span>
					</div>
				</div>
				<div class="money-box">
					<div class="money">
						<p>{{model.TradeTotalNum}}</p>
						<span>累计交易笔数</span>
					</div>
					<div class="money">
						<p>{{format(model.InterestBal)}}</p>
						<span>利息余额</span>
					</div>
					<div class="money">
						<p>{{format(model.LoanBal)}}</p>
						<span>借贷余额</span>
					</div>
				</div>
			</div>
			<div class="chart-wrapper">
				<div class="chart-box chart-blue">
					<div class="echarts-box" ref="bidMoney"></div>
					<div class="time" @tap="showPicker('TradeTotalAmount')">
						{{model.TradeTotalAmountY}}
						<i class="iconfont icon-xia-copy"></i>
					</div>
				</div>
				<div class="chart-box chart-orange">
					<div class="echarts-box" ref="frequency"></div>
					<div class="time" @tap="showPicker('TradeTotalNum')">
						{{model.TradeTotalNumY}}
						<i class="iconfont icon-xia-copy"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="product" v-show="currentIndex==1">
			<div class="chart-wrapper">
				<div class="chart-box chart-blue" ref="itemType">

				</div>
				<div class="chart-box chart-orange" ref="itemTerm">

				</div>
				<div class="chart-box chart-purple" ref="tender">

				</div>
			</div>
		</div>
		<div class="riskControl" v-show="currentIndex==2">
			<div class="item-box">
				<div class="item">
					<p class="val">{{format(model.HisYuqiAmount)}}</p>
					<p class="name">历史逾期金额</p>
				</div>
				<div class="item">
					<p class="val">{{model.HisAmountYuqiRate+"%"}}</p>
					<p class="name">历史金额逾期率</p>
				</div>
			</div>
			<div class="item-box">
				<div class="item">
					<p class="val">{{format(model.DaiChangAmount)}}</p>
					<p class="name">累计代偿金额</p>
				</div>
				<div class="item">
					<p class="val">{{model.DaiChangNum}}</p>
					<p class="name">累计代偿笔数</p>
				</div>
			</div>
			<div class="item-box">
				<div class="item">
					<p class="val">{{format(model.YuqiAmount)}}</p>
					<p class="name">逾期金额</p>
				</div>
				<div class="item">
					<p class="val">{{model.YuqiAmountRate}}%</p>
					<p class="name">逾期金额比例</p>
				</div>
			</div>
			<div class="item-box">
				<div class="item">
					<p class="val">{{format(model.YuqiLess90Amount)}}</p>
					<p class="name">逾期90天（含）以下金额</p>
				</div>
				<div class="item">
					<p class="val">{{format(model.YuqiOver90Amount)}}</p>
					<p class="name">逾期90天（不含）以上金额</p>
				</div>
			</div>
			<div class="item-box">
				<div class="item">
					<p class="val">{{model.YuqiNum}}</p>
					<p class="name">逾期笔数</p>
				</div>
				<div class="item">
					<p class="val">{{model.YuqiNumRate}}%</p>
					<p class="name">逾期笔数比例</p>
				</div>
			</div>
			<div class="item-box">
				<div class="item">
					<p class="val">{{model.YuqiLess90Num}}</p>
					<p class="name">逾期90天（含）以下笔数</p>
				</div>
				<div class="item">
					<p class="val">{{model.YuqiOver90Num}}</p>
					<p class="name">逾期90天（不含）以上笔数</p>
				</div>
			</div>
		</div>
		<div class="centralized" v-show="currentIndex==3">
			<div class="round-box">
				<div class="round-top" ref="roundTop"></div>
			</div>
			<div class="tab-title">
				<span :class="{active:centralizedIndex==0}" @tap="subTab(0)">出借人TOP10</span>
				<span :class="{active:centralizedIndex==1}" @tap="subTab(1)">借款人TOP10</span>
			</div>
			<div class="table-box">
				<div class="table-title">
					<span>用户名</span>
					<span>出借金额</span>
					<span>占比</span>
				</div>
				<table class="table">
					<tr v-for="item in centralizedList">
						<td>{{item.name}}</td>
						<td>{{item.money}}</td>
						<td>{{item.scale}}%</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="userData" v-show="currentIndex==4">
			<div class="loanData">
				<ul>
					<li>
						<span class="name">累计出借人数量</span>
						<span class="val">{{model.LendTotalNum}}</span>
					</li>
					<li>
						<span class="name">人均累计出借金额</span>
						<span class="val">{{format(model.PerLendAmount)}}</span>
					</li>
					<li>
						<span class="name">累计借款人数量</span>
						<span class="val">{{model.BorrowerTotalNum}}</span>
					</li>
					<li>
						<span class="name">人均累计借款金额</span>
						<span class="val">{{format(model.PerLoanTotalAmount)}}</span>
					</li>
					<li>
						<span class="name">当前出借人数量</span>
						<span class="val">{{model.CurrentLenderNum}}</span>
					</li>
					<li>
						<span class="name">最大单户出借余额占比(%)</span>
						<span class="val">{{model.SingleLendMaxBal}}</span>
					</li>
					<li>
						<span class="name">最大十户出借余额余额占比(%)</span>
						<span class="val">{{model.TenLenderBalRate}}</span>
					</li>
					<li>
						<span class="name">当前借款人数量</span>
						<span class="val">{{model.CurrentBorrowerNum}}</span>
					</li>
					<li>
						<span class="name">最大单一借款人待还金额占比(%)</span>
						<span class="val">{{model.SingleBorrowerMaxAmount}}</span>
					</li>
					<li>
						<span class="name">前十大借款人待还金额占比（%）</span>
						<span class="val">{{model.TenBorrowerAmountRate}}</span>
					</li>
				</ul>
			</div>
			<div class="chart-wrapper quantity">
				<div class="chart-box chart-blue">
					<div class="echarts-box" ref="investor"></div>
					<div class="time" @tap="showPicker('LenderNum')">
						{{model.LenderNumY}}
						<i class="iconfont icon-xia-copy"></i>
					</div>
				</div>
				<div class="chart-box chart-purple">
					<div class="echarts-box" ref="loan"></div>
					<div class="time" @tap="showPicker('BorrowerNum')">
						{{model.BorrowerNumY}}
						<i class="iconfont icon-xia-copy"></i>
					</div>
				</div>
			</div>
			<div class="chart-wrapper defaultPd">
				<div class="chart-box chart-orange" ref="investQuantity">

				</div>
				<div class="chart-box chart-blue" ref="loanQuantity">

				</div>
			</div>
			<div class="chart-wrapper defaultPd chart-round-box">
				<div class="chart-round" ref="investAge"></div>
				<div class="chart-round" ref="loanAge"></div>
			</div>
		</div>
		<div class="bg"></div>
	</div>
</template>

<script>
	import echarts from "echarts"

	import tabs from "@/common/components/tabs/tabs"
	export default {
		data() {
			return {
				model: {},
				year: 0,
				productState: false,
				UserDataState: false,
				currentIndex: 0,
				tabName: [{
						name: '交易数据'
					},
					{
						name: '产品数据'
					},
					{
						name: '用户数据'
					}
				],
				BorrowerNums: [],
				LenderNums: [],
				TradeTotalAmounts: [],
				TradeTotalNums: [],
				ageList: [],
				sexList: [],
				amountList: [],
				projectTerm: [],
				returnList: [],

				centralizedList: [],
				centralizedIndex: 0,
				centralizedState: false
			}
		},
		created() {
			this.loading = this.sui.wait(true, '正在加载');
			this.sui.request("Home/TransactionData", {}, "get", (data) => {
				this.loading = this.sui.closewait(this.loading);
				if(data) {
					if(data.IsPass) {
						this.model = data.ReturnObject;
						this.model.Timestamp = data.Timestamp;
						this.$set(this.model, "TradeTotalAmountY", data.Year);
						this.$set(this.model, "TradeTotalNumY", data.Year);
						this.$set(this.model, "LenderNumY", data.Year);
						this.$set(this.model, "BorrowerNumY", data.Year);
						this.year = data.Year;
						data.ReturnList.forEach((item) => {
							this.TradeTotalAmounts.push(item.TradeTotalAmount); //交易总额
							this.TradeTotalNums.push(item.TradeTotalNum); //交易笔数
							this.LenderNums.push(item.LenderNum); //出借人数量
							this.BorrowerNums.push(item.BorrowerNum); //借款人数量
						})

						this.ageList = this.setData(1, data.AgeList);
						this.sexList = this.setData(1, data.SexList);
						this.$nextTick(() => {
							if(this.currentIndex == 0) {
								this.picker = new mui.PopPicker();
								this.setECharts(this.$refs.bidMoney, {
									type: 1,
									color: "#11bbff",
									title: `${this.year}年直投金额`,
									data: this.TradeTotalAmounts
								});
								this.setECharts(this.$refs.frequency, {
									type: 1,
									color: "#fb814d",
									title: `${this.year}年交易笔数`,
									data: this.TradeTotalNums
								});
							}
						})
					}
				}
			})
		},
		mounted() {
			this.$nextTick(() => {
				var deceleration = mui.os.ios ? 0.003 : 0.0009;
				mui.init();
				mui('.mui-scroll-wrapper').scroll({
					bounce: false,
					indicators: true, //是否显示滚动条
					deceleration: deceleration
				});
			})
		},
		beforeDestroy: function() {
			this.picker.dispose();
			this.picker = null;
		},
		methods: {
			setTab(i) {
				this.currentIndex = i;
				this.$nextTick(() => {
					if(this.currentIndex == 1) {
						this.productInit();
					} else if(this.currentIndex == 3) {
						this.centralizedInit(0);
					} else if(this.currentIndex == 4) {
						this.userInit();
					}
				})
			},
			subTab(type) {
				this.centralizedState = false;
				this.centralizedIndex = type;
				this.centralizedInit(type);
			},
			productInit() {
				if(!this.productState) {
					this.loading = this.sui.wait(true, '正在加载');
					this.sui.request('Home/ProductData', {}, 'get', (data) => {
						this.loading = this.sui.closewait(this.loading);
						if(data) {
							if(data.IsPass) {
								this.amountList = this.setData(2, data.AmountList);
								this.projectTerm = this.setData(2, data.ProjectTerm);
								this.returnList = this.setData(2, data.ReturnList);
								this.productState = true;

								//dom, config, type, color, title, xAxisData, scroll, data
								this.setECharts(this.$refs.itemType, {
									type: 2,
									color: "#11bbff",
									title: "项目类型",
									xAxisData: this.returnList[0],
									data: this.returnList[1]
								});
								this.setECharts(this.$refs.itemTerm, {
									type: 2,
									color: "#fb814d",
									title: "项目期限",
									xAxisData: this.projectTerm[0],
									data: this.projectTerm[1]
								});
								this.setECharts(this.$refs.tender, {
									type: 2,
									color: "#a155ff",
									title: "单笔投标金额",
									xAxisData: this.amountList[0],
									scroll: true,
									data: this.amountList[1]
								});
							}
						}
					})
				}
			},
			centralizedInit(type) {
				if(!this.centralizedState) {
					this.loading = this.sui.wait(true, '正在加载');
					this.sui.request('Home/TradeFocusData', {
						rankType: type
					}, 'get', (data) => {
						this.loading = this.sui.closewait(this.loading);
						if(data) {
							if(data.IsPass && data.ReturnList) {
								let oList = [];
								data.ReturnList.forEach((item) => {
									let arr = item.split(':');
									oList.push({
										name: arr[0],
										money: arr[1],
										scale: arr[2]
									})
								})
								this.centralizedList = oList;

								let scale = 0;
								let other = 0;
								this.centralizedList.forEach((item) => {
									scale += Number(item.scale);
								})
								scale = scale.toFixed(0);
								other = 100 - scale;
								echarts.dispose(this.$refs.roundTop);
								this.setECharts(this.$refs.roundTop, {
									type: 4,
									color: ['#10bbff', '#a4e8ff'],
									title: [`${type==0?"出借人":"借款人"}TOP10: ${scale}%`, `其他: ${other}%`],
									data: [Number(scale), other]
								})
								this.centralizedState = true;
							}
						}
					})
				}
			},
			userInit() {
				if(!this.UserDataState) {
					this.setECharts(this.$refs.investor, {
						type: 1,
						color: "#11bbff",
						title: `${this.year}年出借人数量`,
						data: this.LenderNums
					})
					this.setECharts(this.$refs.loan, {
						type: 1,
						color: "#a155ff",
						title: `${this.year}年借款人数量`,
						data: this.BorrowerNums
					})

					this.setECharts(this.$refs.investQuantity, {
						type: 2,
						color: "#fb814d",
						title: "出借人年龄分布",
						xAxisData: ["90后", "80后", "70后", "60后"],
						data: this.ageList[1]
					})
					this.setECharts(this.$refs.loanQuantity, {
						type: 2,
						color: "#11bbff",
						title: "借款人年龄分布",
						xAxisData: ["90后", "80后", "70后", "60后"],
						data: this.ageList[0]
					})

					this.setECharts(this.$refs.investAge, {
						type: 3,
						color: ['#10bbff', '#A4E8FF'],
						title: ["男性出借人", "女性出借人"],
						data: this.sexList[1]
					})
					this.setECharts(this.$refs.loanAge, {
						type: 3,
						color: ['#fed0bd', '#fb814d'],
						title: ["男性借款人", "女性借款人"],
						data: this.sexList[0]
					})
					
					this.UserDataState = true;
				}
			},
			setECharts(dom, config) {
				//dom, config:{type, color, title, xAxisData, scroll, data}
				let options;
				if(config.type == 1) {
					options = {
						title: {
							text: config.title,
							textStyle: {
								color: config.color,
								fontSize: 12
							},
							left: "center",
							top: 10
						},
						grid: {
							top: 40,
							left: 60,
							bottom: 30,
							right: 20
						},
						dataZoom: [{
							type: 'inside',
							start: 0, //这里是判断当前该显示的区域  start增加多少 ，end相应增加多少
							end: 55
						}],
						tooltip: {
							formatter: '{b}<br/>交易金额: {c}'
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', ''],
							axisLine: {
								lineStyle: {
									color: "#f2f2f2"
								}
							},
							axisTick: {
								show: false
							},
							axisLabel: {
								color: "#2c2c2c"
							}
						},
						yAxis: {
							splitNumber: 3,
							axisLabel: {
								textStyle: {
									color: "#2c2c2c"
								},
								formatter: function(val) {
									if(val > 10000) {
										return val / 10000 + '万'
									}
									return val
								}
							},
							axisLine: {
								lineStyle: {
									width: 0.5,
									color: "#f2f2f2"
								}
							},
							axisTick: {
								show: false
							},
							splitLine: {
								lineStyle: {
									width: 0.5,
									color: "#f2f2f2"
								}
							}
						},
						series: [{
							data: config.data,
							type: 'line',
							areaStyle: {},
							smooth: true,
							itemStyle: {
								color: config.color
							},
							lineStyle: {
								color: config.color,
								width: 0.5
							},
							areaStyle: {
								color: config.color,
								opacity: 0.5
							}
						}]
					}
				} else if(config.type == 2) {
					options = {
						title: {
							text: config.title,
							textStyle: {
								color: config.color,
								fontSize: 12
							},
							left: "center",
							top: 10
						},
						legend: {
							data: [{
								name: '出借人年龄分布'
							}]
						},
						grid: {
							top: 55,
							left: 40,
							bottom: 30,
							right: 20
						},
						dataZoom: [{
							type: 'inside',
							start: 0, //这里是判断当前该显示的区域  start增加多少 ，end相应增加多少
							end: config.scroll ? 55 : 85
						}],
						xAxis: {
							data: config.xAxisData,
							axisLine: {
								lineStyle: {
									color: "#f2f2f2"
								}
							},
							axisTick: {
								show: false
							},
							axisLabel: {
								color: "#2c2c2c"
							}
						},
						yAxis: {
							name: "单位（%）",
							maxInterval: 100,
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								lineStyle: {
									color: "#f2f2f2"
								}
							}
						},
						series: [{
							type: 'bar',
							//						name:"出借人年龄分布",
							data: config.data,
							barWidth: "35%",
							itemStyle: {
								color: config.color
							}
						}],
						tooltip: {
							formatter: '{b}: {c}%'
						}
					}
				} else if(config.type == 3) {
					options = {
						tooltip: {
							trigger: 'item',
							confine: true,
							formatter: "{b}: {c} ({d}%)"
						},
						color: config.color,
						legend: {
							bottom: 0,
							textStyle: {
								color: '#787878'
							}
						},
						series: [{
							type: 'pie',
							radius: ['50%', '70%'],
							avoidLabelOverlap: false,
							center: ['50%', '40%'],
							label: {
								normal: {
									show: false,
									position: 'center'
								},
								emphasis: {
									show: true,
									textStyle: {
										fontSize: '12',
									}
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data: [{
									value: config.data[0],
									name: config.title[0]
								},
								{
									value: config.data[1],
									name: config.title[1]
								}
							]
						}]
					}
				} else if(config.type == 4) {
					options = {
						tooltip: {
							trigger: 'item',
							confine: true,
							formatter: "{b}: {c} ({d}%)"
						},
						color: config.color,
						legend: {
							orient: "vertical",
							right: 15,
							top: "middle",
							textStyle: {
								color: '#787878'
							}
						},
						series: [{
							type: 'pie',
							radius: ['55%', '70%'],
							avoidLabelOverlap: false,
							center: [120, '50%'],
							label: {
								normal: {
									show: false,
									position: 'center'
								},
								verticalAlign: "middle",
								emphasis: {
									show: true,
									textStyle: {
										fontSize: '12',
									}
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data: [{
									value: config.data[0],
									name: config.title[0]
								},
								{
									value: config.data[1],
									name: config.title[1]
								}
							]
						}]
					}
				}
				
				echarts.dispose(dom);
				let oECharts = echarts.init(dom);
				oECharts.setOption(options, true);
			},
			setData(type, arr) {
				//type: 1-环形图数据,2-柱状图数据
				if(type === 1) {
					let list = [];
					arr.forEach((item, i) => {
						let arr1 = item.split(":");
						list[i] = [];
						for(let j = 0; j < arr1.length; j++) {
							list[i].push(arr1[j]);
						}
					})
					list.reverse()
					return list;
				} else if(type === 2) {
					let list = [
						[],
						[]
					];
					arr.forEach((item, i) => {
						let arr1 = item.split(":");
						list[0].push(arr1[0]);
						list[1].push(arr1[1]);
					})
					return list;
				}
			},
			showPicker(okey) {
				let arr = [];
				let len = this.year - 2016;
				for(let i = 0; i < len + 1; i++) {
					let data = 2016 + i;
					arr.push({
						v: data,
						t: data
					})
				}
				this.picker.setData(arr);

				//共用一个picker，需每次显示都置为当前年选项。
				this.picker.pickers[0].setSelectedIndex(len, 0);

				this.picker.show((item) => {
					this.loading = this.sui.closewait(this.loading);
					this.sui.request("Home/TradeData", {
						year: item[0].v
					}, "get", (data) => {
						this.loading = this.sui.closewait(this.loading);
						this[okey + "s"] = [];  //清空当前数组
						this.model[okey + "Y"] = item[0].v;  //修改当前select时间
						
						data.ReturnList.forEach((item) => {
							this[okey + "s"].push(item[okey]);
						})

						if(okey == "TradeTotalAmount") {
							this.setECharts(this.$refs.bidMoney, {
								type: 1,
								color: "#11bbff",
								title: `${item[0].v}年直投金额`,
								data: this.TradeTotalAmounts
							});
						} else if(okey == "TradeTotalNum") {
							this.setECharts(this.$refs.frequency, {
								type: 1,
								color: "#fb814d",
								title: `${item[0].v}年交易笔数`,
								data: this.TradeTotalNums
							});
						} else if(okey == "LenderNum") {
							this.setECharts(this.$refs.investor, {
								type: 1,
								color: "#11bbff",
								title: `${item[0].v}年出借人数量`,
								data: this.LenderNums
							})
						} else if(okey == "BorrowerNum") {
							this.setECharts(this.$refs.loan, {
								type: 1,
								color: "#a155ff",
								title: `${item[0].v}年借款人数量`,
								data: this.BorrowerNums
							})
						}
					})
				});
			},
			format(value) {
				var val = 0;
				if(value) {
					val = value
				}
				return this.sui.rmoney(val);
			}
		},
		components: {
			tabs
		}
	}
</script>

<style lang="scss">
	.manage {
		padding-top: 44px;
		background: #FFFFFF;
		>.mui-scroll-wrapper {
			position: fixed !important;
			top: 0;
			height: 44px;
			background: #FFFFFF;
			z-index: 100;
			transition: all;
			@include border-1px(#E3E3EA);
			.mui-scroll {
				height: 44px;
			}
			.mui-control-item {
				box-sizing: border-box;
				height: 44px;
				line-height: 44px;
				color: #999999;
				font-size: 15px;
			}
			.mui-active {
				position: relative;
				border-bottom: none !important;
				color: #1e82d2 !important;
				&:before {
					content: '';
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					width: 30px;
					height: 3px;
					background: #1e82d2;
				}
			}
		}
		.chart-wrapper {
			position: relative;
			padding: 30px 15px 1px;
			.chart-box {
				position: relative;
				margin-bottom: 20px;
				height: 165px;
				border-radius: 10px;
				&.chart-blue {
					@include border-box-1px(#11bbff, 20px);
					box-shadow: 0px 0px 15px 0px rgba(17, 187, 255, 0.2);
				}
				&.chart-orange {
					@include border-box-1px(#fb814d, 20px);
					box-shadow: 0px 0px 15px 0px rgba(251, 129, 77, 0.2);
				}
				&.chart-purple {
					@include border-box-1px(#a155ff, 20px);
					box-shadow: 0px 0px 15px 0px rgba(251, 129, 77, 0.2);
				}
			}
			.time {
				box-sizing: border-box;
				padding-left: 5px;
				position: absolute !important;
				top: 10px;
				right: 10px;
				width: 55px;
				height: 25px;
				line-height: 25px;
				/*border-radius: 3px;*/
				color: #4d4d4d;
				/*border: solid 1px #e5e5e5;*/
				font-size: 12px;
				.iconfont {
					position: absolute;
					right: 5px;
					top: 50%;
					transform: translateY(-50%);
					color: #999999;
					font-size: 10px;
				}
				@include border-box-1px(#e5e5e5, 3px)
			}
			.echarts-box {
				width: 100%;
				height: 100%;
			}
		}
		.trading {
			.banner {
				position: relative;
				font-size: 0;
				img {
					width: 100%;
				}
				.text-box {
					display: flex;
					justify-content: center;
					flex-direction: column;
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					text-align: center;
					h2 {
						margin-bottom: 20px;
						font-size: 28px;
						color: #ffffff;
					}
					p {
						font-size: 15px;
						color: #ffffff;
					}
				}
			}
			.money-wrapper {
				position: relative;
				padding: 28px 0;
				&::after {
					content: ' ';
					position: absolute;
					right: 0;
					bottom: -1px;
					left: 0;
					height: 1px;
					border-top: 1px dashed #E5E5E5;
				}
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
							margin-top: 15px;
							display: inline-block;
							vertical-align: middle;
							width: 100%;
							text-align: center;
							font-size: 12px;
							white-space: nowrap;
							color: #999999;
							min-width: 101px;
						}
						p {
							text-align: center;
							font-size: 16px;
							color: #2c2c2c;
						}
					}
				}
			}
		}
		.product {
			.chart-box {
				height: 185px;
			}
		}
		.riskControl {
			padding: 0 15px;
			.item-box {
				position: relative;
				padding: 27px 0;
				display: flex;
				&:last-child {
					&::after {
						display: none;
					}
				}
				&::after {
					content: ' ';
					position: absolute;
					right: 0;
					bottom: -1px;
					left: 0;
					height: 1px;
					border-top: 1px dashed #E5E5E5;
				}
				.item {
					flex: 1;
					text-align: center;
					font-size: 14px;
					.val {
						margin-bottom: 15px;
						color: #2c2c2c;
					}
					.name {
						padding: 0 5px;
						color: #999999;
					}
				}
			}
		}
		.centralized {
			.round-box {
				padding: 29px 0;
				.round-top {
					/*width: 129px;
					height: 129px;*/
					height: 217px;
				}
			}
			.tab-title {
				margin-bottom: 30px;
				text-align: center;
				span {
					position: relative;
					display: inline-block;
					vertical-align: top;
					margin-right: 33px;
					font-size: 12px;
					&.active {
						color: #11bbff;
						&::after {
							content: '';
							display: block;
							position: absolute;
							bottom: -10px;
							left: 50%;
							transform: translateX(-50%);
							width: 30px;
							height: 3px;
							border-radius: 2px;
							background: #11bbff;
						}
					}
					&:last-child {
						margin-right: 0;
					}
				}
			}
			.table-box {
				padding: 0 15px 30px;
				.table-title {
					display: flex;
					border-top-left-radius: 9px;
					border-top-right-radius: 9px;
					background: #11bbff;
					box-shadow: 0px 0px 10px 0px rgba(17, 187, 255, 0.2);
					span {
						flex: 1;
						height: 35px;
						line-height: 35px;
						font-size: 12px;
						text-align: center;
						color: #FFFFFF;
					}
				}
				.table {
					width: 100%;
					border-bottom-left-radius: 9px;
					border-bottom-right-radius: 9px;
					box-shadow: 0px 0px 15px 0px rgba(17, 187, 255, 0.2);
					tr {
						display: flex;
					}
					td {
						height: 35px;
						line-height: 35px;
						text-align: center;
						font-size: 12px;
						flex: 1;
					}
				}
			}
		}
		.userData {
			padding: 30px 15px 0;
			.chart-wrapper {
				padding: 30px 0;
				&.defaultPd {
					padding: 0
				}
			}
			.chart-round-box {
				font-size: 0;
			}
			.chart-round {
				padding-bottom: 15px;
				display: inline-block;
				vertical-align: top;
				width: 50%;
				height: 230px;
			}
			.loanData {
				margin-bottom: 30px;
				padding: 20px 15px 5px;
				box-shadow: 1px 1px 10px 0px rgba(153, 153, 153, 0.3);
				border-radius: 6px;
				li {
					margin-bottom: 15px;
					overflow: hidden;
				}
				span {
					font-size: 12px;
				}
				.name {
					float: left;
					color: #999999;
				}
				.val {
					float: right;
					color: #2c2c2c;
				}
			}
			.quantity {
				padding: 30px 0;
				position: relative;
				&::before {
					content: "";
					position: absolute;
					width: 200%;
					height: 200%;
					border-top: 1px dashed #e5e5e5;
					border-bottom: 1px dashed #e5e5e5;
					-webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scale(0.5, 0.5);
					transform: scale(0.5, 0.5);
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
					left: 0;
					top: 0;
				}
				.chart-purple {
					margin-bottom: 0;
				}
				.chart-box {
					height: 185px;
				}
			}
		}
		.bg {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: #FFFFFF;
			z-index: -1;
		}
	}
</style>