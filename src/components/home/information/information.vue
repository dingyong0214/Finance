<template>
	<div class="information">
		<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted border-1px">
			<div class="mui-scroll">
				<a class="mui-control-item" @tap="setTab(0)" :class="{'mui-active':currentIndex == 0}">
					合规之路
				</a>
				<a class="mui-control-item" @tap="setTab(1)" :class="{'mui-active':currentIndex == 1}">
					公司介绍
				</a>
				<a class="mui-control-item" @tap="setTab(2)" :class="{'mui-active':currentIndex == 2}">
					产品介绍
				</a>
				<a class="mui-control-item" @tap="setTab(3)" :class="{'mui-active':currentIndex == 3}">
					组织信息
				</a>
				<a class="mui-control-item" @tap="setTab(4)" :class="{'mui-active':currentIndex == 4}">
					备案信息
				</a>
				<a class="mui-control-item" @tap="setTab(5)" :class="{'mui-active':currentIndex == 5}">
					风险控制
				</a>
				<a class="mui-control-item" @tap="setTab(6)" :class="{'mui-active':currentIndex == 6}">
					律所护航
				</a>
				<a class="mui-control-item" @tap="setTab(7)" :class="{'mui-active':currentIndex == 7}">
					媒体报道
				</a>
			</div>
		</div>
		<div class="mui-slider-item mui-control-content" v-if="currentIndex == 0">
			<div class="Introduction">
				<h2 class="title">合规之路</h2>
				<p> 2016年8月24日，银监会、工业和信息化部、公安部、国家互联网信息办公室联合发布了《网络借贷信息中介机构业务活动管理暂行办法》，互联网金融行业从此迈向合规整改、良性发展轨道。作为一个严格自律的互联网金融信息服务平台，前海领投积极拥抱监管，遵循法律法规，从平台风控、管理、技术、流程等层面进行着全方位的步伐调整。目前行业正在进入备案冲刺阶段，前海领投合规项目正在有序推进中。</p>
				<p class="compliance-pdf">
					<a href="http://res.qhlead.com/PDF/网络借贷信息中介机构业务活动管理暂行办法.pdf">《网络借贷信息中介机构业务活动管理暂行办法》</a>
				</p>
			</div>
			<div class="course process">
				<h2 class="title">合规进程</h2>
				<div class="process-title">银行存管</div>
				<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="line"></div>
					<div class="mui-scroll">
						<div class="course-detail">
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>可存管银行调查</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>银行对接沟通</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>筛选银行</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>资料对接</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>签署协议</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>技术研发</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>开发测试</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>完成上线</p>
							</div>
						</div>
					</div>
				</div>
				<div class="dotted"></div>
				<div class="process-title">三级等保测评</div>
				<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="line"></div>
					<div class="mui-scroll">
						<div class="course-detail">
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>准备阶段</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>方案编制阶段</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>现场测评阶段</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>报告编制阶段</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>初步整改和复核阶段</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled gray"></span>
								<p>完成公安网监备案</p>
							</div>
						</div>
					</div>
				</div>
				<div class="dotted"></div>
				<div class="process-title">金融办备案</div>
				<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="line"></div>
					<div class="mui-scroll">
						<div class="course-detail">
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>备案细则出台</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>自查完成</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>金融办委托亚太会计师事务所场检</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>出具合规整改告知书</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>合规整改</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled gray"></span>
								<p>提交资料</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled gray"></span>
								<p>等待审核</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled gray"></span>
								<p>备案登记</p>
							</div>
						</div>
					</div>
				</div>
				<div class="dotted"></div>
				<div class="process-title">ICP认证</div>
				<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="line"></div>
					<div class="mui-scroll">
						<div class="course-detail">
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled active"></span>
								<p>准备阶段</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled gray"></span>
								<p>准备资料</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled gray"></span>
								<p>等待审核</p>
							</div>
							<div class="item">
								<span class="mui-icon mui-icon-checkbox-filled gray"></span>
								<p>领取证书</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="fee-box" style="padding-top:25px ;">
				<table class="table">
					<tr>
						<th style="width: 220px;">合规标准</th>
						<th>前海领投合规进度</th>
					</tr>
					<tr>
						<td>ICP 经营许可证</td>
						<td>进行中</td>
					</tr>
					<tr>
						<td>信息系统安全等级保护测评及备案</td>
						<td>进行中</td>
					</tr>
					<tr>
						<td>账户与资金管理规范</td>
						<td>进行中</td>
					</tr>
					<tr>
						<td>费用收取规范</td>
						<td>完成</td>
					</tr>

					<tr>
						<td>出借人网贷知识普及和风险教育</td>
						<td>完成</td>
					</tr>
					<tr>
						<td>出借人风险承受能力评估制度、措施</td>
						<td>完成</td>
					</tr>
					<tr>
						<td>完善的网络安全设施和技术安全</td>
						<td>进行中</td>
					</tr>
					<tr>
						<td>电子签章</td>
						<td>完成</td>
					</tr>
					<tr>
						<td>对出借人进行实名注册</td>
						<td>完成</td>
					</tr>
					<tr>
						<td>记录并保存网络借贷业务活动数据和资料</td>
						<td>完成</td>
					</tr>
					<tr>
						<td>防范欺诈规章制度</td>
						<td>完成</td>
					</tr>
					<tr>
						<td>妥善保管出借人与借款人的资料和交易信息</td>
						<td>完成</td>
					</tr>
					<tr>
						<td>履行客户身份识别和交易记录保存等</td>
						<td>完成</td>
					</tr>
					<tr>
						<td>出借人可获取的渠道提示网贷风险和禁止性行为</td>
						<td>完成</td>
					</tr>

					<tr>
						<td>出借人与借款人信息采集、处理及使用的合法性和安全性要求</td>
						<td>完成</td>
					</tr>
					<tr>
						<td>真实、合法、充分的信息披露</td>
						<td>完成</td>
					</tr>
					<tr>
						<td>银行存管</td>
						<td>进行中</td>
					</tr>
					<tr>
						<td>年月账户下线</td>
						<td>完成</td>
					</tr>
					<tr>
						<td>符合低频次债权转让要求</td>
						<td>完成</td>
					</tr>
					<tr>
						<td>律师事务所出具的法律意见书</td>
						<td>进行中</td>
					</tr>
					<tr>
						<td>会计师事务所出具的审计报告</td>
						<td>进行中</td>
					</tr>
					<tr>
						<td>履行网络借贷备案手续</td>
						<td>2018年4-6月</td>
					</tr>
				</table>
			</div>
		</div>

		<div class="mui-slider-item mui-control-content" v-if="currentIndex == 1">
			<div class="Introduction">
				<h2 class="title">公司介绍</h2>
				<p> 深圳市前海领投互联网金融服务有限公司公司成立于2014年7月，注册资金1000万， 是一家专注于为企业融资和个人出借提供信息服务的互联网金融服务平台。 主要以租金贷、业主贷、安居贷等服务为主，是一家创新、稳健、高效的新金融服务平台。</p>
				<p>2015年荣获深圳市互联网金融商会“创会会员单位”和网贷互联“优秀单位”等荣誉。 公司通过专业风险管理方法与金融科技相结合，按照“规范化、系统化、人性化”的服务标准， 为客户提供最为稳健合适的出借方案。</p>
				<p>公司致力于成为全国领先的住房金融综合服务提供商，促进互联网金融和现代科技的便利性，有效规避出借风险， 合理规划出借者的资金配置，成为一家有爱有温度的互联网金融公司。</p>
			</div>
			<div class="mission">
					<h2 class="title">使命愿景</h2>
					<div class="mui-slider">
						<div class="mui-slider-group mui-slider-loop">
							<!-- 额外增加的一个节点-->
							<div class="mui-slider-item mui-slider-item-duplicate">
								<div class="mui-slider-item1">
									<div class="box">
										<div class="name-box">
											<img src="./senseofworth.png" />
											<span>价值观</span>
										</div>
										<p class="main">
											高效、创新、稳健、尽责
										</p>
									</div>
								</div>
							</div>
							<!-- 第一张 -->
							<div class="mui-slider-item">
								<div class="mui-slider-item1 ">
									<div class="box">
										<div class="name-box">
											<img src="./mission-1.png" />
											<span>使命</span>
										</div>
										<p class="main">
											让信用传递价值，共建信用型社会
										</p>
									</div>
									<div class="box">
										<div class="name-box">
											<img src="./mission-2.png" />
											<span>愿景</span>
										</div>
										<p class="main">
											将信用守护到底，构建阳光、透明的金融平台
										</p>
									</div>
								</div>
									
							</div>
							<!-- 第二张 -->
							<div class="mui-slider-item">
                                   <div class="mui-slider-item1">
                                   	 <div class="box">
										<div class="name-box">
											<img src="./senseofworth.png" />
											<span>价值观</span>
										</div>
										<p class="main">
											高效、创新、稳健、尽责
										</p>
									 </div>
                                   </div>
							</div>
							<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
							<div class="mui-slider-item mui-slider-item-duplicate">
								<div class="mui-slider-item1">
									<div class="box">
										<div class="name-box">
											<img src="./mission-1.png" />
											<span>使命</span>
										</div>
										<p class="main">
											让信用传递价值，共建信用型社会
										</p>
									</div>
									<div class="box">
										<div class="name-box">
											<img src="./mission-2.png" />
											<span>愿景</span>
										</div>
										<p class="main">
											将信用守护到底，构建阳光、透明的金融平台
										</p>
									</div>
								</div>
									
							</div>
						</div>
						<div class="mui-slider-indicator">
							<div class="mui-indicator mui-active"></div>
							<div class="mui-indicator"></div>
						</div>
					</div>
			</div>
			<div class="course">
				<h2 class="title">发展历程</h2>
				<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<div class="course-detail">
							<div class="item">
								<h5>2018年04月</h5>
								<p>两网一端3.0隆重上线</p>
							</div>
							<div class="item">
								<h5>2017年12月</h5>
								<p>移动端APP2.0隆重上线</p>
							</div>
							<div class="item">
								<h5>2017年05月</h5>
								<p>交易额突破6个亿</p>
							</div>
							<div class="item">
								<h5>2017年01月</h5>
								<p>交易额突破5个亿</p>
							</div>
							<div class="item">
								<h5>2016年08月</h5>
								<p>前海领投移动端app正式上线</p>
							</div>
							<div class="item">
								<h5>2016年07月</h5>
								<p>交易额突破3个亿</p>
							</div>
							<div class="item">
								<h5>2015年12月</h5>
								<p>交易额突破1个亿</p>
							</div>
							<div class="item">
								<h5>2015年09月</h5>
								<p>加入深圳市互联网金融商会</p>
							</div>
							<div class="item">
								<h5>2014年12月</h5>
								<p>前海领投网站正式上线</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="zizhi">
				<h2 class="title">公司资质</h2>
				<div class="img-box" style="width: 42%">
					<img src="./zizhi-1.png" />
				</div>
				<div class="img-box" style="width: 58%;">
					<img src="./zizhi-2.png" />
				</div>
			</div>
			<div class="honor">
				<h2 class="title">公司荣誉</h2>
				<div class="img-box">
					<img src="./honnor-1.png" />
				</div>
				<div class="img-box">
					<img src="./honnor-2.png" />
				</div>
				<div class="img-box">
					<img src="./honnor-3.png" />
				</div>
				<div class="img-box">
					<img src="./honnor-4.png" />
				</div>
			</div>
			<div class="staff">
				<h2 class="title">员工风采</h2>
				<div class="img-box">
					<img src="./staff-1.png" />
				</div>
				<div class="img-box">
					<img src="./staff-2.png" />
				</div>
				<div class="img-box">
					<img src="./staff-3.png" />
				</div>
				<div class="img-box">
					<img src="./staff-4.png" />
				</div>
			</div>
		</div>
		<div class="mui-slider-item mui-control-content" v-if="currentIndex == 2">
			<div class="product">
				<div class="sort">
					<h2 class="title">产品分类</h2>
					<div class="mui-slider">
						<div class="mui-slider-group mui-slider-loop">
							<!-- 额外增加的一个节点-->
							<div class="mui-slider-item mui-slider-item-duplicate">
								<a href="#">
									<div class="contract-item">
										<!--<div class="sort-item">
											<img src="./sort-3.png" />
											<h3>领贷</h3>
											<p>有在抵押商品房借款</p>
										</div>-->
										<div class="sort-item">
											<img src="./sort-4.png" />
											<h3>安居贷</h3>
											<p>住房抵押借款</p>
										</div>
									</div>
								</a>
							</div>
							<!-- 第一张 -->
							<div class="mui-slider-item">
								<a href="#">
									<div class="contract-item">
										<div class="sort-item">
											<img src="./sort-1.png" />
											<h3>租金贷</h3>
											<p>有可出租物业借款</p>
										</div>
										<div class="sort-item">
											<img src="./sort-2.png" />
											<h3>业主贷</h3>
											<p>商品房借款</p>
										</div>
									</div>
								</a>
							</div>
							<!-- 第二张 -->
							<div class="mui-slider-item">
								<a href="#">
									<div class="contract-item">
										<!--<div class="sort-item">
											<img src="./sort-3.png" />
											<h3>领贷</h3>
											<p>有在抵押商品房借款</p>
										</div>-->
										<div class="sort-item">
											<img src="./sort-4.png" />
											<h3>安居贷</h3>
											<p>住房抵押借款</p>
										</div>
									</div>
								</a>
							</div>
							<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
							<div class="mui-slider-item mui-slider-item-duplicate">
								<a href="#">
									<div class="contract-item">
										<div class="sort-item">
											<img src="./sort-1.png" />
											<h3>租金贷</h3>
											<p>有可出租物业借款</p>
										</div>
										<div class="sort-item">
											<img src="./sort-2.png" />
											<h3>业主贷</h3>
											<p>商品房借款</p>
										</div>
									</div>
								</a>
							</div>
						</div>
						<div class="mui-slider-indicator">
							<div class="mui-indicator mui-active"></div>
							<div class="mui-indicator"></div>
						</div>
					</div>
				</div>
				<div class="mode">
					<h2 class="title">业务模式</h2>
					<img src="./mode.png" />
				</div>
				<div class="sort business">
					<h2 class="title">业务特点</h2>
					<div class="mui-slider">
						<div class="mui-slider-group mui-slider-loop">
							<!-- 额外增加的一个节点-->
							<div class="mui-slider-item mui-slider-item-duplicate">
								<a href="#">
									<div class="contract-item">
										<div class="sort-item">
											<div class="icon-box">
												<img src="./business-5.png" />
											</div>
											<h3>信息公开</h3>
											<p>全方位信息透明公开，充分披露借款人相关的借款信息、借款用途、信用状况等，有效帮助出借人筛选适合自己的出借项目。</p>
										</div>
										<div class="sort-item">
											<div class="icon-box">
												<img src="./business-6.png" />
											</div>
											<h3>法律保护</h3>
											<p>专业互联网金融律师团队提供全方位法律服务，为出借人提供专业法律支持。</p>
										</div>
									</div>
								</a>
							</div>
							<!-- 第一张 -->
							<div class="mui-slider-item">
								<a href="#">
									<div class="contract-item">
										<div class="sort-item">
											<div class="icon-box">
												<img src="./business-1.png" />
											</div>
											<h3>小额分散</h3>
											<p>出借项目的地域、行业非常分散；出借人出借单个项目的金额限制，帮助出借人有效分散风险。</p>
										</div>
										<div class="sort-item">
											<div class="icon-box">
												<img src="./business-2.png" />
											</div>
											<h3>只做不动产类</h3>
											<p>专注深圳地区不动产类业务，前中后360°层层把关。</p>
										</div>
									</div>
								</a>
							</div>
							<!-- 第二张 -->
							<div class="mui-slider-item">
								<a href="#">
									<div class="contract-item">
										<div class="sort-item">
											<div class="icon-box">
												<img src="./business-3.png" />
											</div>
											<h3>源头把控借款人</h3>
											<p>对接征信大数据，实地筛选优质借款项目，确保项目的真实性。</p>
										</div>
										<div class="sort-item">
											<div class="icon-box">
												<img src="./business-4.png" />
											</div>
											<h3>资金托管</h3>
											<p>采用第三方资金托管，用户资金与平台自有资金物理隔离，资金流动出借者清晰可监控。</p>
										</div>
									</div>
								</a>
							</div>
							<!-- 第三张 -->
							<div class="mui-slider-item">
								<a href="#">
									<div class="contract-item">
										<div class="sort-item">
											<div class="icon-box">
												<img src="./business-5.png" />
											</div>
											<h3>信息公开</h3>
											<p>全方位信息透明公开，充分披露借款人相关的借款信息、借款用途、信用状况等，有效帮助出借人筛选适合自己的出借项目。</p>
										</div>
										<div class="sort-item">
											<div class="icon-box">
												<img src="./business-6.png" />
											</div>
											<h3>法律保护</h3>
											<p>专业互联网金融律师团队提供全方位法律服务，为出借人提供专业法律支持。</p>
										</div>
									</div>
								</a>
							</div>
							<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
							<div class="mui-slider-item mui-slider-item-duplicate">
								<a href="#">
									<div class="contract-item">
										<div class="sort-item">
											<div class="icon-box">
												<img src="./business-1.png" />
											</div>
											<h3>小额分散</h3>
											<p>出借项目的地域、行业非常分散；出借人出借单个项目的金额限制，帮助出借人有效分散风险。</p>
										</div>
										<div class="sort-item">
											<div class="icon-box">
												<img src="./business-2.png" />
											</div>
											<h3>只做不动产类</h3>
											<p>专注深圳地区不动产类业务，前中后360°层层把关。</p>
										</div>
									</div>
								</a>
							</div>
						</div>
						<div class="mui-slider-indicator">
							<div class="mui-indicator mui-active"></div>
							<div class="mui-indicator"></div>
							<div class="mui-indicator"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="control">
				<h2 class="title">风控审查流程</h2>
				<div class="control-process">
					<div class="item-box">
						<div class="item">
							调查专员线下实地考察
						</div>
						<div class="item">
							第三方大数 据信用筛查
						</div>
						<div class="item">
							内部专业风 控审查
						</div>
						<div class="item">
							贷后追踪 管理
						</div>
					</div>
					<ul class="num-box">
						<li>01</li>
						<li>02</li>
						<li>03</li>
						<li>04</li>
					</ul>
				</div>
				<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<div class="process-detail">
							<div class="item">
								<h5>01</h5>
								<p>面签面审</p>
								<img src="./right.png" />
							</div>
							<div class="item">
								<h5>02</h5>
								<p>银行征信查询</p>
								<img src="./right.png" />
							</div>
							<div class="item">
								<h5>03</h5>
								<p>下户实地考察</p>
								<img src="./right.png" />
							</div>
							<div class="item">
								<h5>04</h5>
								<p>大数据甄别风险</p>
								<img src="./right.png" />
							</div>
							<div class="item">
								<h5>05</h5>
								<p>电核关联人</p>
								<img src="./right.png" />
							</div>
							<div class="item">
								<h5>06</h5>
								<p>项目创标放款</p>
								<img src="./right.png" />
							</div>
							<div class="item">
								<h5>07</h5>
								<p>风控终审</p>
								<img src="./right.png" />
							</div>
							<div class="item">
								<h5>08</h5>
								<p>风控复核</p>
								<img src="./right.png" />
							</div>
							<div class="item">
								<h5>09</h5>
								<p>贷后跟踪监管管理</p>
								<img src="./right.png" />
							</div>
							<div class="item">
								<h5>10</h5>
								<p>还款跟进催收</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="sort after">
				<h2 class="title">贷后管理</h2>
				<div class="mui-slider">
					<div class="mui-slider-group mui-slider-loop">
						<!-- 额外增加的一个节点-->
						<div class="mui-slider-item mui-slider-item-duplicate">
							<a href="#">
								<div class="contract-item">
									<div class="sort-item">
										<div class="icon-box">
											<img src="./after-3.png" />
										</div>
										<h3>法务催收</h3>
										<p>由业务、风控多部门联合向借款人催收。</p>
									</div>
									<div class="sort-item">
										<div class="icon-box">
											<img src="./after-4.png" />
										</div>
										<h3>资产保全</h3>
										<p>客户因故出现逾期反复催收无果后，启动资产保全并收回房屋租赁权。</p>
									</div>
								</div>
							</a>
						</div>
						<!-- 第一张 -->
						<div class="mui-slider-item">
							<a href="#">
								<div class="contract-item">
									<div class="sort-item">
										<div class="icon-box">
											<img src="./after-1.png" />
										</div>
										<h3>电话通知</h3>
										<p>当出现逾期时，电催组会对客户，进行电话还款提醒。</p>
									</div>
									<div class="sort-item">
										<div class="icon-box">
											<img src="./after-2.png" />
										</div>
										<h3>上门通知</h3>
										<p>到客户的工作单位和居住地址约见客户，了解客户的情况，跟客户协商逾期处理方案。</p>
									</div>
								</div>
							</a>
						</div>
						<!-- 第二张 -->
						<div class="mui-slider-item">
							<a href="#">
								<div class="contract-item">
									<div class="sort-item">
										<div class="icon-box">
											<img src="./after-3.png" />
										</div>
										<h3>法务催收</h3>
										<p>由渠道、业务、风控多部门联合向借款人催收。</p>
									</div>
									<div class="sort-item">
										<div class="icon-box">
											<img src="./after-4.png" />
										</div>
										<h3>资产保全</h3>
										<p>客户因故出现逾期反复催收无果后，启动资产保全并收回房屋租赁权。</p>
									</div>
								</div>
							</a>
						</div>
						<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
						<div class="mui-slider-item mui-slider-item-duplicate">
							<a href="#">
								<div class="contract-item">
									<div class="sort-item">
										<div class="icon-box">
											<img src="./after-1.png" />
										</div>
										<h3>电话通知</h3>
										<p>当出现逾期时，电催组会对客户，进行电话还款提醒。</p>
									</div>
									<div class="sort-item">
										<div class="icon-box">
											<img src="./after-2.png" />
										</div>
										<h3>上门通知</h3>
										<p>到客户的工作单位和居住地址约见客户，了解客户的情况，跟客户协商逾期处理方案。</p>
									</div>
								</div>
							</a>
						</div>
					</div>
					<div class="mui-slider-indicator">
						<div class="mui-indicator mui-active"></div>
						<div class="mui-indicator"></div>
					</div>
				</div>
			</div>
			<div class="fee-box" id="fee" ref="fee">
				<h2 class="title">收费标准</h2>
				<table class="table">
					<tr>
						<th colspan="2">业务类型</th>
						<th style="width: 200px;">资费标准</th>
					</tr>
					<tr>
						<td colspan="2">用户注册</td>
						<td>免费</td>
					</tr>
					<tr>
						<td colspan="2">开通存管账户</td>
						<td>免费</td>
					</tr>
					<tr>
						<td rowspan="2">出借</td>
						<td>房易融项目</td>
						<td>免费</td>
					</tr>
					<tr>
						<td>债权转让项目</td>
						<td>免费</td>
					</tr>
					<tr>
						<td colspan="2">回款到账</td>
						<td>免费</td>
					</tr>
					<tr>
						<td colspan="2">债权转让</td>
						<td>
							<div>1、债权持有期1个月＜N≤2个月时，按按实际成交的债权本金的 0.5% 收取服务费用；</div>
							<div>2、债权持有期2个月＜N≤6个月时，按按实际成交的债权本金的 0.3% 收取服务费用；</div>
							<div>3、债权持有期N＞6个月时，按按实际成交的债权本金的 0.1% 收取服务费用；</div>
						</td>
					</tr>
					<tr>
						<td colspan="2">充值</td>
						<td>免费</td>
					</tr>
					<tr>
						<td rowspan="2">提现</td>
						<td>一般提现</td>
						<td>
						<div>1、若15天前充值的金额大于或等于提现金额，则每月可免费提现3笔，超过3笔后，提现金额≤5万则收2元/笔，提现金额>5万则收10元/笔；</div>
						<div>2、15天内充值的金额如要提现不免费，按提现金额的2‰收取，最低2元/笔。</div>
                        </td>
					</tr>
					<tr>
						<td>即时提现<br />（T+0）</td>
						<td>按提现金额的2‰收取，最低2元/笔。</td>
					</tr>
					<tr>
						<td colspan="2">借款人收费</td>
						<td>前海领投对借款人收费不超过借款金额的1%/月</td>
					</tr>
				</table>
			</div>
		</div>
		<div class="mui-slider-item mui-control-content" v-if="currentIndex == 3">
			<div class="tissue-box">
				<div class="business">
					<h2 class="title">工商信息</h2>
					<table class="table">
						<tr>
							<th>平台名称</th>
							<th>深圳市前海领投互联网金融服务有限公司</th>
						</tr>
						<tr>
							<td class="name">统一社会信用代码</td>
							<td>91440300311861641C</td>
						</tr>
						<tr>
							<td class="name">法定代表人</td>
							<td>许杰鑫</td>
						</tr>
						<tr>
							<td class="name">注册资本（万元）</td>
							<td>1000</td>
						</tr>
						<tr>
							<td class="name">实缴注册资本（万元）</td>
							<td>1000</td>
						</tr>
						<tr>
							<td class="name">注册地址</td>
							<td>深圳市前海深港合作区前湾一路1号A栋201室（入驻:深圳市前海商务秘书有限公司）</td>
						</tr>
						<tr>
							<td class="name">办公地址</td>
							<td>深圳市福田区中康路卓越城1期3座7层704-705（地铁上梅林站A口）</td>
						</tr>
						<tr>
							<td class="name">法人机构注册地代码</td>
							<td>44033</td>
						</tr>
						<tr>
							<td class="name">成立时间</td>
							<td>2014-07-30</td>
						</tr>
						<tr>
							<td class="name">经营期限</td>
							<td>永续经营</td>
						</tr>
						<tr>
							<td class="name">经营状态</td>
							<td>开业（存续）</td>
						</tr>
						<tr>
							<td class="name">平台上线运营时间</td>
							<td>2014-12-23</td>
						</tr>
						<tr>
							<td class="name">经营范围</td>
							<td>出借咨询、依托互联网技术手段提供金融中介服务（根据法律、行政法规、国务院决定等规定需要审批的， 依法取得相关审批文件后方可经营）</td>
						</tr>
						<tr>
							<td class="name">董事</td>
							<td>许杰鑫</td>
						</tr>
						<tr>
							<td class="name">监事</td>
							<td>林伟星</td>
						</tr>
						<tr>
							<td class="name">实际控制人</td>
							<td>许杰鑫</td>
						</tr>
					</table>
				</div>
				<div class="structure">
					<h2 class="title">组织架构</h2>
					<img src="./structure.png" width="100%" />
				</div>
				<div class="personnel">
					<h2 class="title">从业人员</h2>
					<p>截至2018年4月末。前海领投从业人员数量37人，其中正式员工37人， 从年龄结构看，30周岁以下员工25人，30（含）到40周岁员工12人，40周岁（含）以上员工0人， 从学历结构看，研究生及以上员工3人，本科学历员工15人，大专学历员工19人。</p>
				</div>
				<div class="partner">
					<h2 class="title">股东信息</h2>
					<ul>
						<li>
							<img src="./partner-1.png" />
							<p class="text">许杰鑫 占股比例：<span>90%</span></p>
						</li>
						<li>
							<img src="./partner-2.png" />
							<p class="text">林伟星 占股比例：<span>10%</span></p>
						</li>
					</ul>
				</div>
				<div class="team">
					<h2 class="title">管理团队</h2>
					<div class="mui-slider">
						<div class="mui-slider-group mui-slider-loop">
							<!-- 额外增加的一个节点-->
							<div class="mui-slider-item mui-slider-item-duplicate">
								<a href="#">
									<div class="team-item">
										<div class="team-title">
											<div class="avatar-box">
												<img src="./team-7.png" />
											</div>
											<div class="name-box">
												<p class="name">曾波</p>
												<p class="job">研发运营总监</p>
											</div>
										</div>
										<div class="team-main">
											<p>计算机科学与技术学士学位，10余年产品研发和管理经验，在研发团队建设和人员培养等方面有着丰富经验； 对互联网技术及架构、新金融业务的形态、客户成长体系建设和产品用户体验设计具有较为丰富的经验， 同时熟悉金融科技的智能化体系建设，能根据实际情况全方位制定平台研发管理的计划与决策；</p>
											<p>2017年加入前海领投，主要负责网站技术研发、产品需求把控与安全维护，网站运营工作。</p>
										</div>
									</div>
								</a>
							</div>
							<!-- 第一张 -->
							<div class="mui-slider-item">
								<a href="#">
									<div class="team-item">
										<div class="team-title">
											<div class="avatar-box">
												<img src="./team-1.png" />
											</div>
											<div class="name-box">
												<p class="name">许杰鑫</p>
												<p class="job">执行董事兼总经理</p>
											</div>
										</div>
										<div class="team-main">
											<p>毕业于西南大学金融系，清华大学研究生在读，现任深圳市潮汕青年商会副会长；</p>
											<p>2007年起担任深圳市卓晋非融资性担保公司 总经理；</p>
											<p>2014年7月创立深圳市前海领投互联网金融服务有限公司；</p>
											<p>入行11年，经手项目累计超过200亿，具有专业的金融行业知识及丰富的金融管理经验，致力于多元化金融服务的研究。</p>
											<p>主要负责制订公司整体战略规划，拟定公司的经营发展策略，把控企业发展机会与风险控制。</p>
										</div>
									</div>
								</a>
							</div>
							<!-- 第二张 -->
							<div class="mui-slider-item">
								<a href="#">
									<div class="team-item">
										<div class="team-title">
											<div class="avatar-box">
												<img src="./team-2.png" />
											</div>
											<div class="name-box">
												<p class="name">林伟星</p>
												<p class="job">公司监事</p>
											</div>
										</div>
										<div class="team-main">
											<p>毕业于英国MiddleSex大学，商业信息技术硕士学位；</p>
											<p>11年从业经验，对公司整体经营方针及战略方向筹划、制定及实施监督，全局业务开展管理、人才引进、薪酬福利安排，核心团队的组建，公司的对外沟通等方面有着丰富经验。</p>
											<p>主要负责监督并协助执行董事执行公司的战略规划。</p>
										</div>
									</div>
								</a>
							</div>
							<!-- 第三张 -->
							<!--<div class="mui-slider-item">
								<a href="#">
									<div class="team-item">
										<div class="team-title">
											<div class="avatar-box">
												<img src="./team-3.png" />
											</div>
											<div class="name-box">
												<p class="name">吴晖</p>
												<p class="job">联席总经理</p>
											</div>
										</div>
										<div class="team-main">
											<p>毕业于西南大学，管理学、理学双学士；</p>
											<p>深圳市排放权交易所首批注册交易员，注册基金从业资格；</p>
											<p>精通小额借款、银行信贷、担保融资等业务流程、产品体系和风控管理，拥有丰富的实战经验及独特见解；擅长整合优势资源创新商业模式，在互金业态、企业量化管理、营销策划等方面有深入的研究，著有《中科智基本法》； </p>
											<p>主要负责公司发展战略和经营计划的执行，督导公司各项工作。</p>
										</div>
									</div>
								</a>
							</div>-->
							<!-- 第四张 -->
							<div class="mui-slider-item">
								<a href="#">
									<div class="team-item">
										<div class="team-title">
											<div class="avatar-box">
												<img src="./team-4.png" />
											</div>
											<div class="name-box">
												<p class="name">雷啸</p>
												<p class="job">业务负责人</p>
											</div>
										</div>
										<div class="team-main">
											<p>毕业于乌克兰哈尔科夫国立大学金融硕士研究生学位；</p>
											<p>8年金融领域业务经验，对于金融市场的开发和研究、实施公司发展策略并制定业务发展计划、业务团队建设和管理等方面有着丰富经验；</p>
											<p>2011年加入宁波银行深圳分行，任零售公司部业务经理职位，之后在多家金融机构负责金融业务、市场开发及风控工作；</p>
											<p>2017年加入前海领投。主要负责对外市场开发和业务扩展。</p>
										</div>
									</div>
								</a>
							</div>
							<!-- 第五张 -->
							<div class="mui-slider-item">
								<a href="#">
									<div class="team-item">
										<div class="team-title">
											<div class="avatar-box">
												<img src="./team-5.png" />
											</div>
											<div class="name-box">
												<p class="name">段莉</p>
												<p class="job">财务负责人</p>
											</div>
										</div>
										<div class="team-main">
											<p>毕业于西安交通大学财院会计学士学位；</p>
											<p>10余年企业财务领域经验，对于企业会计核算的各项规章制度、财务管理及内部控制等方面有着丰富经验；</p>
											<p>2016年加入深圳天格产业地产出借发展有限公司，任财务主管职位，并负责财务管理及内部控制的工作；</p>
											<p>2018年加入前海领投。主要负责平台财务管理和内部控制。</p>
										</div>
									</div>
								</a>
							</div>
							<!-- 第六张 -->
							<div class="mui-slider-item">
								<a href="#">
									<div class="team-item">
										<div class="team-title">
											<div class="avatar-box">
												<img src="./team-6.png" />
											</div>
											<div class="name-box">
												<p class="name">余锦初</p>
												<p class="job">风控及法务负责人</p>
											</div>
										</div>
										<div class="team-main">
											<p>毕业于深圳新安职业学院计算机专业；</p>
											<p>10余年金融风控合规领域经验，对于在风险管理体系建设、金融产品设计、风险计量、定价和合规审查等方面有着丰富经验；</p>
											<p>擅长金融风控模型的建设，对债权风控管理、贷后风险跟踪控制有丰富的经验，并对行业合规规范、法务治理有深入的研究；</p>
											<p>2014年加入前海领投。主要负责平台风控管理、合规审查及法务工作。</p>
										</div>
									</div>
								</a>
							</div>
							<!-- 第七张 -->
							<div class="mui-slider-item">
								<a href="#">
									<div class="team-item">
										<div class="team-title">
											<div class="avatar-box">
												<img src="./team-7.png" />
											</div>
											<div class="name-box">
												<p class="name">曾波</p>
												<p class="job">研发运营总监</p>
											</div>
										</div>
										<div class="team-main">
											<p>计算机科学与技术学士学位，10余年产品研发和管理经验，在研发团队建设和人员培养等方面有着丰富经验； 对互联网技术及架构、新金融业务的形态、客户成长体系建设和产品用户体验设计具有较为丰富的经验， 同时熟悉金融科技的智能化体系建设，能根据实际情况全方位制定平台研发管理的计划与决策；</p>
											<p>2017年加入前海领投，主要负责网站技术研发、产品需求把控与安全维护，网站运营工作。</p>
										</div>
									</div>
								</a>
							</div>
							<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
							<div class="mui-slider-item mui-slider-item-duplicate">
								<a href="#">
									<div class="team-item">
										<div class="team-title">
											<div class="avatar-box">
												<img src="./team-1.png" />
											</div>
											<div class="name-box">
												<p class="name">许杰鑫</p>
												<p class="job">执行董事兼总经理</p>
											</div>
										</div>
										<div class="team-main">
											<p>毕业于西南大学金融系，清华大学研究生在读，现任深圳市潮汕青年商会副会长；</p>
											<p>2007年起担任深圳市卓晋非融资性担保公司 总经理；</p>
											<p>2014年7月创立深圳市前海领投互联网金融服务有限公司；</p>
											<p>入行11年，经手项目累计超过200亿，具有专业的金融行业知识及丰富的金融管理经验，致力于多元化金融服务的研究。</p>
											<p>主要负责制订公司整体战略规划，拟定公司的经营发展策略，把控企业发展机会与风险控制。</p>
										</div>
									</div>
								</a>
							</div>
						</div>
						<div class="mui-slider-indicator">
							<div class="mui-indicator mui-active"></div>
							<div class="mui-indicator"></div>
							<div class="mui-indicator"></div>
							<div class="mui-indicator"></div>
							<div class="mui-indicator"></div>
							<div class="mui-indicator"></div>
							<div class="mui-indicator"></div>
						</div>
					</div>

				</div>
				<div class="branches">
					<h2 class="title">分支机构</h2>
					<p>暂无分支机构</p>
				</div>
				<div class="contact">
					<h2 class="title">联系我们</h2>
					<ul class="text-box">
						<li>
							<p class="name">客服电话</p>
							<p class="val">400-660-5027</p>
						</li>
						<li>
							<p class="name">电子邮箱</p>
							<p class="val">kf@qhlead.com</p>
						</li>
						<li>
							<p class="name">地址</p>
							<p class="val">深圳市福田区中康路卓越城1期3座7层704-705</p>
							<p class="val">（地铁上梅林站A口）</p>
						</li>
					</ul>
					<div class="ewm-box">
						<div class="ewm">
							<div class="img-wrapper">
								<img src="./wxewm.png" />
							</div>
							<p>关注微信</p>
						</div>
						<div class="ewm">
							<div class="img-wrapper">
								<img src="./appewm.png" />
							</div>
							<p>手机APP下载</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mui-slider-item mui-control-content" v-if="currentIndex == 4">
			<div class="record-box">
				<div class="record">
					<h2 class="title">备案信息</h2>
					<div class="text-box">
						<h3>电信业务经营许可证</h3>
						<p>正按原深圳《深圳市网络借贷信息中介机构备案登记管理办法（征求意见稿）》指导意见要求申请办理</p>
					</div>
					<div class="text-box">
						<h3>资金存管银行：</h3>
						<p> <a class="knowMore"> 宜宾市商业银行</a></p>
					</div>
					<div class="text-box">
						<h3>存管签约时间：</h3>
						<p>2018年4月</p>
					</div>
					<div class="text-box">
						<h3>全量业务存管上线时间：</h3>
						<p>2018年6月</p>
					</div>
					<div class="text-box">
						<h3>公安机关核发的网站备案图标及编号</h3>
						<p>
							<!--<img src="./beianbgs.png" />-->
							<p>正在进行中</p>
							<!--<span class="beianbgs" onclick="window.location.href='http://www.miitbeian.gov.cn/publish/query/indexFirst.action'">粤ICP备14063074号-1</span>-->
						</p>
					</div>
					<div class="text-box">
						<h3>在地方金融监管部门的备案登记信息</h3>
						<p>正在积极向相关政府部门申请备案</p>
					</div>
					<div class="text-box">
						<h3>信息安全测评认证</h3>
						<p>正在测评中</p>
					</div>
				</div>
				<div class="audit">
					<h2 class="title">备案信息</h2>
					<p>正在积极筹备审计报告中</p>
				</div>
				<div class="promise">
					<h2 class="title">承诺函</h2>
					<div class="img-box">
						<img src="./promise.png" />
					</div>
				</div>
				<div class="compliance">
					<h2 class="title">合规报告</h2>
					<p>正在积极筹备合规报告中</p>
				</div>
				<div class="contract">
					<h2 class="title">合同范本</h2>
					<div class="mui-slider">
						<div class="mui-slider-group mui-slider-loop">
							<!-- 额外增加的一个节点-->
							<div class="mui-slider-item mui-slider-item-duplicate">
								<a href="#">
									<div class="contract-item">
										<router-link :to="{name:'Authorize'}" tag="button" class="mui-btn mui-btn-primary mui-btn-outlined">电子签章授权委托书</router-link>
									</div>
								</a>
							</div>
							<!-- 第一张 -->
							<div class="mui-slider-item">
								<a href="#">
									<div class="contract-item">
										<router-link :to="{name:'regProtocol'}" tag="button" class="mui-btn mui-btn-primary mui-btn-outlined">注册协议</router-link>
										<router-link :to="{name:'loanContract'}" tag="button" class="mui-btn mui-btn-primary mui-btn-outlined">融资借款合同</router-link>
										<router-link :to="{name:'transferProtocol'}" tag="button" class="mui-btn mui-btn-primary mui-btn-outlined">债权转让协议</router-link>
										<!--<router-link :to="{name:'monthProtocol'}" tag="button" class="mui-btn mui-btn-primary mui-btn-outlined">月账户出借协议</router-link>-->
									</div>
								</a>
							</div>
							<!-- 第二张 -->
							<div class="mui-slider-item">
								<a href="#">
									<div class="contract-item">
										<!--<router-link :to="{name:'yearProtocol'}" tag="button" class="mui-btn mui-btn-primary mui-btn-outlined">年账户出借协议</router-link>-->
										<router-link :to="{name:'riskNote'}" tag="button" class="mui-btn mui-btn-primary mui-btn-outlined">风险提示书</router-link>
										<router-link :to="{name:'Authorize'}" tag="button" class="mui-btn mui-btn-primary mui-btn-outlined">电子签章授权委托书</router-link>
									</div>
								</a>
							</div>
							<!-- 第三张 -->
							<!--<div class="mui-slider-item">
								<a href="#">
									<div class="contract-item">
										<router-link :to="{name:'Authorize'}" tag="button" class="mui-btn mui-btn-primary mui-btn-outlined">电子签章授权委托书</router-link>
									</div>
								</a>
							</div>-->
							<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
							<div class="mui-slider-item mui-slider-item-duplicate">
								<a href="#">
									<div class="contract-item">
										<router-link :to="{name:'regProtocol'}" tag="button" class="mui-btn mui-btn-primary mui-btn-outlined">注册协议</router-link>
										<router-link :to="{name:'loanContract'}" tag="button" class="mui-btn mui-btn-primary mui-btn-outlined">融资借款合同</router-link>
										<router-link :to="{name:'monthProtocol'}" tag="button" class="mui-btn mui-btn-primary mui-btn-outlined">月账户出借协议</router-link>
									</div>
								</a>
							</div>
						</div>
						<div class="mui-slider-indicator">
							<div class="mui-indicator mui-active"></div>
							<div class="mui-indicator"></div>
							<div class="mui-indicator"></div>
						</div>
					</div>
				</div>
				<div class="matter">
					<h2 class="title">重大事项</h2>
					<table class="table">
						<tr>
							<td>公司减资、合并、分立、解散或申请破产</td>
							<td>无</td>
						</tr>
						<tr>
							<td>公司依法进入破产程序</td>
							<td>无</td>
						</tr>
						<tr>
							<td>公司被责令停业、整顿、关闭</td>
							<td>无</td>
						</tr>
						<tr>
							<td>公司涉及重大诉讼、仲裁，或涉嫌违法违规被有权机关调查，或受到刑事处罚、重大行政处罚</td>
							<td>无</td>
						</tr>
						<tr>
							<td>公司法定代表人、持股5%以上的股东、实际控制人、主要负责人、董事、监事、高级管理人员的变更情况</td>
							<td class="bold">
								<a href="http://res.qhlead.com/PDF/从业机构重大事项.pdf">2016年04月26日 变更信息</a>
							</td>
						</tr>
						<tr>
							<td>公司法定代表人、实际控制人、主要负责人、董事、监事、 高级管理人员涉及重大诉讼、仲裁，或涉嫌违法违纪被有权机关调查， 或受到刑事处罚、重大行政处罚，或被采取强制措施</td>
							<td>无</td>
						</tr>
						<tr>
							<td>公司主要或者全部业务陷入停顿</td>
							<td>无</td>
						</tr>
						<tr>
							<td>存在欺诈、损害出借人利益等其他影响网络借贷信息中介机构经营活动的重大事项</td>
							<td>无</td>
						</tr>
					</table>
				</div>
				<div class="channel">
					<h2 class="title">官方渠道</h2>
					<p>平台网址：
						<a class="www" href="http://www.qhlead.com">www.qhlead.com</a>
					</p>
					<p>IP地 址：120.78.31.135</p>
					<div class="ewm-box">
						<div class="img-box">
							<img src="./appewm.png" />
						</div>
						<p>前海领投APP二维码</p>
					</div>
					<div class="ewm-box">
						<div class="img-box">
							<img src="./wxewm.png" />
						</div>
						<p>前海领投微信二维码</p>
					</div>
				</div>
			</div>
		</div>
		<div class="mui-slider-item mui-control-content" v-if="currentIndex == 5">
			<div class="risk-box">
				<div class="risk">
					<h2 class="title">风险控制</h2>
					<img src="./risk-icon1.png" width="160" />
					<h5>风险架构</h5>
					<p>前海领投建立了完善的风险架构，同时针对不同类型的产品特点和风险特征分别建立了相对应的产品管理制度和项目贷前、贷中、贷后的管理制度和风险评估流程，防范欺诈风险和信用风险。</p>
					<p>在产品设计上，前海领投专注于个人小额信贷交易撮合，借款金额为2-20万元之间，通过小额、分散降低违约关联性，建立项目库的系统安全，控制集中度风险。</p>
				</div>
				<div class="process">
					<h2 class="title">审批流程</h2>
					<ul class="process-num">
						<li>
							<div class="num-box">
								<span class="num">01</span>
								<div class="round-wrapper">
									<div class="round-dashed"></div>
								</div>
								<div class="round"></div>
							</div>
							<div class="main">
								<h6>质检</h6>
								<p class="text">对借款人申请资料的完整性、真实性和准入条件进行质检，确保基础合规性。</p>
							</div>
						</li>
						<li>
							<div class="num-box">
								<span class="num">02</span>
								<div class="round-wrapper">
									<div class="round-dashed"></div>
								</div>
								<div class="round"></div>
							</div>
							<div class="main">
								<h6>审查</h6>
								<p class="text">通过从多个数据源调取并验证借款人个人信息、征信信息、消费行为信息、 社交信息等多信息维度，包括但不限于涉诉、工商税务情况、多头借贷查询、 反欺诈调查、黑名单排查等，对借款人的信用风险、欺诈风险以及产品风险进行全面评估。</p>
							</div>
						</li>
						<li>
							<div class="num-box">
								<span class="num">03</span>
								<div class="round-wrapper">
									<div class="round-dashed"></div>
								</div>
								<div class="round"></div>
							</div>
							<div class="main">
								<h6>实地勘察</h6>
								<p class="text">专业调查人员对借款人房产、居所及经营所在地等场所进行实地勘察， 对融资项目及参与主体实现立体化多层级的数据采集，以确保项目及融资需求真实、 合法和融资项目参与主体有稳定、可信的还款能力，最终为风险把控提供可信依据。</p>
							</div>
						</li>
						<li>
							<div class="num-box">
								<span class="num">04</span>
								<div class="round-wrapper">
									<div class="round-dashed"></div>
								</div>
								<div class="round"></div>
							</div>
							<div class="main">
								<h6>复核</h6>
								<p class="text">复核岗对借款人整体资质及偿还能力、借款人历史信用及当前负债、 标的物当前情况及市场总值进行再次评判，检查风控点的完整性。</p>
							</div>
						</li>
						<li>
							<div class="num-box">
								<span class="num">05</span>
								<div class="round-wrapper">
									<div class="round-dashed"></div>
								</div>
								<div class="round"></div>
							</div>
							<div class="main">
								<h6>终审</h6>
								<p class="text">将完整的资料及信审报告递交终审有权人，由终审有权人对项目进行最终审查和评判。</p>
							</div>
						</li>
					</ul>
				</div>
				<div class="warning">
					<h2 class="title">风险预警</h2>
					<ul class="text-list">
						<li>
							<div class="num-box">
								<img src="./warning-1.png" />
							</div>
							<div class="main">
								<h6>日常风险预警管理</h6>
								<p class="text">通过贷后五级分类定级预警，日常监控借款人诉讼、房产、负债等变动，定期电话或实地回访等方式，在借款人逾期前掌握借款人情况，提前做出应对措施，加大追回款项的可能性。同时监控平台各类资金的流入、流出，跟踪护城河计划储备资金的变化，每日对外披露，定时对各类资产质量进行分析，及时掌握各类资产质量变化情况，采取相关应对措施。</p>
							</div>
						</li>
						<li class="right">
							<div class="main">
								<h6>项目约定还款日前</h6>
								<p class="text">通过短信、电话等方式提醒借款人及时还款。</p>
							</div>
							<div class="num-box">
								<img src="./warning-2.png" />
							</div>
						</li>
						<li>
							<div class="num-box">
								<img src="./warning-3.png" />
							</div>
							<div class="main">
								<h6>项目逾期-早期</h6>
								<p class="text">积极配合合作渠道进行电话、短信、信函等催收，并做好相应的逾期管理。</p>
							</div>
						</li>
						<li class="right">
							<div class="main">
								<h6>项目逾期-后期</h6>
								<p class="text">准备逾期项目证明、资金流向等资料，协助相关方面进行法律诉讼追偿逾期款项或委托第三方专业机构进行实地外访与催收。</p>
							</div>
							<div class="num-box">
								<img src="./warning-4.png" />
							</div>
						</li>
					</ul>
				</div>
				<div class="legal">
					<h2 class="title">法律援助</h2>
					<img src="./legal.png" width="160" />
					<p>前海领投与广东省诚公律师事务所合作建立“P2P法律援助平台”，专项用于为前海领投平台上非自担风险融资项目提供法律支持，如非自担风险项目中的任一融资项目发生争议事项需提起诉讼或仲裁程序解决争议的，前海领投将为出借人聘请专业律师代表出借人处理相关法律争议，协助出借人追讨违约债权，以保护相关出借人的权益。前海领投承诺，如因支付法律援助费用，均有前海领投拨付款项承担。</p>
				</div>
			</div>
		</div>
		<div class="mui-slider-item mui-control-content" v-if="currentIndex == 6">
			<div class="law">
				<div class="office">
					<h2 class="title">广东诚公律师事务所</h2>
					<p>广东诚公律师事务所成立于1994年2月，是经国家司法行政机关批准设立的深圳市首批合伙制律师事务所之一。2004年即被深圳市商标评审机构授予“深圳知名品牌”称号。诚公秉承“诚信、公正、为客户提供一流法律服务”的理念，以其精湛的技术、认真负责的态度和一个个成功案例，赢得了广大客户的长期信赖。</p>
				</div>
				<div class="convoy">
					<h2 class="title">广东诚公律师事务所为平台的所有融资项目提供全面的法律护航</h2>
					<ul class="text-list">
						<li>
							<div class="num-box">
								<img src="./convoy-1.png" />
							</div>
							<div class="main">
								<h6>合规审查</h6>
								<p class="text">保障出借人在前海领投操作的合法性、合规性。</p>
							</div>
						</li>
						<li class="right">
							<div class="main">
								<h6>风控支持</h6>
								<p class="text">监督审核前海领投对平台所有项目的风控审查工作。</p>
							</div>
							<div class="num-box">
								<img src="./convoy-2.png" />
							</div>
						</li>
						<li>
							<div class="num-box">
								<img src="./convoy-3.png" />
							</div>
							<div class="main">
								<h6>合同保障</h6>
								<p class="text">审核前海领投主营业务合同及平台制度，制定严格充分保护出借人利益的合同条款。</p>
							</div>
						</li>
						<li class="right">
							<div class="main">
								<h6>法律援助</h6>
								<p class="text">协助前海领投和出借人进行出借后管理，当出借项目发生争议须通过法律程序解决时，为平台和出借人提供一流法律援助服务确保出借人利益。</p>
							</div>
							<div class="num-box">
								<img src="./convoy-4.png" />
							</div>
						</li>
					</ul>
				</div>
				<div class="law-item">
					<h2 class="title">法律法规</h2>
					<ul>
						<li @click="link(1)">《关于出借人通过前海领投平台获得的出借收益的合法性》</li>
						<li @click="link(2)">《关于电子合同的合法性》</li>
						<li @click="link(3)">《关于前海领投平台提供居间撮合服务的合法性》</li>
						<li @click="link(4)">《关于在前海领投平台上网络借贷关系的合法性》</li>
						<li @click="link(5)">《合法经营》</li>
					</ul>
				</div>
				<div class="file">
					<h2 class="title">政策文件</h2>
					<button onclick="window.location.href='http://res.qhlead.com/PDF/《最高人民法院关于审理民间借贷案件适用法律若干问题的规定》.pdf'" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">《最高人民法院关于审理民间借<br/>贷案件适用法律若干问题的规定》</button>
					<button onclick="window.location.href='http://res.qhlead.com/PDF/《中华人民共和国反洗钱法》.pdf'" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">《中华人民共和国反洗钱法》</button>
					<button onclick="window.location.href='http://res.qhlead.com/PDF/《中华人民共和国电子签名法》.pdf'" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">《中华人民共和国电子签名法》</button>
					<button onclick="window.location.href='http://res.qhlead.com/PDF/《中华共和国合同法》.pdf'" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">《中华共和国合同法》</button>
					<button onclick="window.location.href='http://res.qhlead.com/PDF/《网络借贷资金存管业务指引》.pdf'" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">《网络借贷资金存管业务指引》</button>
					<button onclick="window.location.href='http://res.qhlead.com/PDF/《网络借贷信息中介机构业务活动管理暂行办法》.pdf'" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">《网络借贷信息中介机构业务活动管理暂行办法》</button>
					<button onclick="window.location.href='http://res.qhlead.com/PDF/《关于促进互联网金融健康发展的指导意见》.pdf'" class="mui-btn mui-btn-primary mui-btn-block mui-btn-outlined">《关于促进互联网金融健康发展的指导意见》</button>
				</div>
			</div>
		</div>
		<div class="mui-slider-item mui-control-content" v-if="currentIndex == 7">
			<div class="media">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell" v-for="item in mediaList" @tap="toDetail(item.Id)">
						<h3>{{item.Title}}</h3>
						<span class="time">{{item.UpdateTime}}</span>
						<i class="mui-icon mui-icon-arrowright"></i>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				type: 0,
				currentIndex: 0,
				mediaList: []
			}
		},
		activated() {
			let type = parseInt(this.$route.query.type);
			let intoView = this.$route.query.intoView;
			if(type) {
				this.setTab(type);
			}
			if(intoView == "fee") {
				this.$nextTick(() => {
					var top = this.$refs.fee.offsetTop;
					window.scrollTo(0, top);
				})
			}
		},
		mounted() {
			this.$nextTick(() => {
				var deceleration = mui.os.ios ? 0.003 : 0.0009;
				mui.init();
				mui('.mui-scroll-wrapper').scroll({
					bounce: false,
					indicators: true, //是否显示滚动条
					deceleration: 0.0009
				});
			})
		},
		methods: {
			setTab(i) {
				this.currentIndex = i;
				//				mui.init();
				//				var deceleration = mui.os.ios ? 0.003 : 0.0009;
				//				mui('.mui-scroll-wrapper').scroll({
				//					bounce: false,
				//					indicators: true, //是否显示滚动条
				//					deceleration: deceleration
				//				});

				if(this.currentIndex == 7) {
					this.sui.request('Home/NewsList', {
						type: 4,
						pageIndex: 1
					}, 'get', (data) => {
						//console.log(data);
						if(data) {
							if(data.IsPass) {
								this.mediaList = data.ReturnList
							}
						}
					})
				}
			},
			link(type) {
				this.$router.push({
					name: "legislation",
					query: {
						type: type
					}
				})
			},
			toDetail(infoId) {
				//资讯详情
				this.$router.push({
					name: "infoDetail",
					query: {
						id: infoId
					}
				})
			}
		},
		watch: {
			currentIndex() {
				window.scroll(0, 0);
				this.$nextTick(() => {
					mui(".mui-slider").slider();
					mui('.mui-scroll-wrapper').scroll();
				})
			}
		}
	}
</script>

<style lang="scss">
	.information {
		padding-top: 44px;
		color: #2c2c2c;
		.compliance-pdf {
			padding: 20px 0 0 0;
			text-align: center;
		}
		.process-title {
			text-align: center;
			font-size: 13px;
			padding-bottom: 12px;
		}
		.process {
			.dotted {
				border: 1px dashed #F2F2F2;
				width: 100%;
				margin-top: 15px;
				margin-bottom: 22px;
			}
			.mui-segmented-control.mui-scroll-wrapper {
				padding: 5px;
				height: 110px !important;
				box-sizing: border-box;
				position: relative;
				.line {
					position: absolute;
					width: 100%;
					height: 1px;
					background: #DDDDDD;
					top: 55px;
					z-index: -1
				}
				;
			}
			.item {
				text-align: center !important;
				padding: 8px 12px !important;
				width: 130px !important;
				height: 96px !important;
				background: #FFFFFF;
				p {
					text-align: center !important;
					padding-bottom: 8px;
				}
			}
		}
		.mui-icon-checkbox-filled {
			border: none;
			font-size: 2.2em;
		}
		.active {
			color: #00C305;
		}
		.gray {
			color: #CBCBCB;
		}
		.title {
			margin-bottom: 35px;
			position: relative;
			font-size: 15px;
			text-align: center;
			font-weight: bold;
			&:before {
				content: '';
				position: absolute;
				bottom: -12px;
				left: 50%;
				transform: translateX(-50%);
				width: 30px;
				height: 3px;
				border-radius: 3px;
				background: #11bbff;
			}
		}
		.img-box {
			padding: 10px;
			display: inline-block;
			vertical-align: middle;
			img {
				width: 100%;
				vertical-align: middle;
				box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.3);
			}
		}
		.text-list {
			li {
				margin-bottom: 20px;
				padding: 15px 15px 15px 0;
				display: flex;
				background: #FFFFFF;
				border-radius: 10px;
				box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.2);
				&.right {
					padding: 15px 0 15px 15px;
				}
				.num-box {
					padding: 0 15px;
					flex: 0 0 92px;
					display: flex;
					align-items: center;
					img {
						width: 100%;
					}
				}
				.main {
					flex: 1;
					h6 {
						color: #232323;
						font-size: 13px;
						font-weight: bold;
					}
					.text {
						margin-top: 15px;
						font-size: 12px;
						line-height: 16px;
						color: #999999;
					}
				}
			}
		}
		.mui-slider {
			padding-bottom: 45px;
			.mui-slider-indicator {
				bottom: 12px;
				.mui-indicator {
					width: 8px;
					height: 8px;
					box-shadow: none !important;
					background: #e5e5e5;
				}
				.mui-active {
					background-color: #1e82d2 !important;
					box-shadow: none !important;
				}
			}
		}
		.mui-control-content {
			display: block;
		}
		/*mui头部导航样式修改 start*/
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
				font-size: 14px;
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
		/*mui导航样式修改 end*/
		/*公司介绍 start*/
		/*公司介绍*/
		.Introduction {
			margin-bottom: 10px;
			padding: 20px 15px 25px;
			background: #FFFFFF;
			p {
				font-size: 14px;
				line-height: 22px;
				color: #2C2C2C;
			}
		}
		/*使命愿景*/
		.mission {
			margin-bottom: 10px;
			padding: 25px 10px 8px;
			background: #FFFFFF;
			.mui-slider-item1 {
				padding: 3px 0;
				display: flex;
				justify-content: space-around;
				.box {
					width: 47%;
					padding: 20px 12px;
					font-size: 14px;
					display: inline-block;
					vertical-align: top;
					background-color: #ffffff;
					box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.1);
					border-radius: 6px;
					&:last-child {
						margin-right: 0;
					}
				}
			}
			.name-box {
				margin-bottom: 14px;
				text-align: center;
				img {
					margin-right: 10px;
					width: 20px;
					vertical-align: middle;
				}
				span {
					display: inline-block;
					vertical-align: middle;
					font-size: 14px;
				}
			}
			.main {
				font-size: 12px;
				line-height: 18px;
			}
		}
		/*发展历程*/
		.course {
			margin-bottom: 10px;
			padding: 24px 15px 20px;
			background: #FFFFFF;
			.mui-segmented-control.mui-scroll-wrapper {
				padding: 5px;
				height: 95px;
				box-sizing: border-box;
			}
			.course-detail {
				.item {
					margin-right: 10px;
					padding: 15px 8px 10px;
					box-sizing: border-box;
					display: inline-block;
					vertical-align: top;
					width: 100px;
					font-size: 12px;
					text-align: left;
					white-space: normal;
					border-radius: 6px;
					box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.1);
					h5 {
						margin-bottom: 12px;
						text-align: center;
						color: #11bbff;
					}
					p {
						color: #4d4d4d;
						text-align: justify;
						line-height: 18px;
					}
				}
			}
		}
		/*公司资质*/
		.zizhi {
			margin-bottom: 10px;
			padding: 24px 15px 30px;
			background: #FFFFFF;
			font-size: 0;
		}
		/*公司荣誉*/
		.honor {
			margin-bottom: 10px;
			padding: 24px 15px 30px;
			font-size: 0;
			background: #FFFFFF;
			.img-box {
				width: 50%;
			}
		}
		/*员工风采*/
		.staff {
			padding: 24px 15px 20px;
			font-size: 0;
			background: #FFFFFF;
			.img-box {
				width: 50%;
				img {
					border-radius: 2px;
				}
			}
		}
		/*公司介绍 end*/
		/*产品介绍 start*/
		.sort {
			margin-bottom: 10px;
			padding: 20px 15px 5px;
			background: #FFFFFF;
			.contract-item {
				padding: 3px 0;
				display: flex;
				justify-content: space-around;
			}
			.sort-item {
				width: 160px;
				padding: 20px 0;
				margin: 0 10px;
				border-radius: 6px;
				text-align: center;
				font-size: 14px;
				line-height: initial;
				background-color: #ffffff;
				box-shadow: 0px 0px 8px 0px rgba(153, 153, 153, 0.1);
				h3 {
					margin: 15px 0 10px;
					color: #2c2c2c;
				}
				p {
					padding: 0 10px;
					color: #999999;
				}
				img {
					width: 70px;
				}
				.icon-box {
					margin: 0 auto;
					padding: 12px;
					box-sizing: border-box;
					width: 54px;
					height: 54px;
					text-align: center;
					background-color: #ffffff;
					border-radius: 50%;
					box-shadow: 0px 0px 10px 0px rgba(62, 203, 255, 0.1);
					img {
						width: 100%;
					}
				}
			}
		}
		.mode {
			margin-bottom: 10px;
			padding: 20px 15px 20px;
			background: #FFFFFF;
			img {
				width: 100%;
			}
		}
		.control {
			margin-bottom: 10px;
			padding: 20px 15px 33px;
			background: #FFFFFF;
			.control-process {
				margin-bottom: 68px;
				padding: 23px 13px 28px;
				position: relative;
				background: #4aacff;
				box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.3);
				border-radius: 6px;
				&:after {
					content: '';
					position: absolute;
					bottom: -34px;
					box-sizing: border-box;
					height: 1px;
					left: 0;
					right: 0;
					border-bottom: 1px dashed #e5e5e5;
				}
				.item-box {
					position: relative;
					z-index: 10;
					border-top: 1px solid #ffffff;
					display: flex;
					justify-content: space-around;
					.item {
						width: 60px;
						text-align: center;
						color: #FFFFFF;
						font-size: 12px;
						line-height: 15px;
						&:before {
							content: '';
							margin: -4px auto 20px;
							display: block;
							width: 8px;
							height: 8px;
							border-radius: 50%;
							background-color: #ffffff;
						}
					}
				}
				.num-box {
					display: flex;
					justify-content: space-around;
					position: absolute;
					left: 15px;
					right: 12px;
					bottom: 15px;
					z-index: 1;
					li {
						width: 60px;
						text-align: center;
						font-size: 28px;
						color: #FFFFFF;
						opacity: 0.3;
						font-weight: bold;
					}
				}
			}
			.mui-segmented-control.mui-scroll-wrapper {
				height: 45px;
			}
			.process-detail {
				display: flex;
				justify-content: space-around;
				.item {
					margin-right: 50px;
					position: relative;
					text-align: center;
					&:last-child {
						margin-right: 0;
					}
					h5 {
						margin-bottom: 13px;
						font-size: 20px;
						color: #4aacff;
					}
					p {
						font-size: 12px;
					}
					img {
						position: absolute;
						right: -35px;
						top: 50%;
						width: 20px;
						transform: translateY(-50%);
					}
				}
			}
		}
		.fee-box {
			padding: 20px 15px 33px;
			background: #FFFFFF;
			.table {
				font-size: 12px;
				text-align: center;
				th {
					padding: 10px;
					background-color: #f2f2f2;
					border: 1px solid #f2f2f2;
				}
				td {
					padding: 10px 5px;
					line-height: 15px;
					border: 1px solid #e5e5e5;
					&.name {
						white-space: nowrap;
					}
				}
			}
		}
		/*产品介绍 end*/
		/*组织信息 start*/
		.tissue-box {
			.business {
				margin-bottom: 10px;
				padding: 20px 15px 24px;
				background: #FFFFFF;
				.table {
					/*width: 100%;*/
					font-size: 12px;
					text-align: center;
					th {
						padding: 10px;
						background-color: #f2f2f2;
						border: 1px solid #f2f2f2;
					}
					td {
						padding: 10px 5px;
						line-height: 15px;
						border: 1px solid #e5e5e5;
						&.name {
							white-space: nowrap;
						}
					}
				}
			}
			.structure {
				margin-bottom: 10px;
				padding: 20px 15px 24px;
				background: #FFFFFF;
			}
			.personnel {
				margin-bottom: 10px;
				padding: 20px 15px 24px;
				background: #FFFFFF;
				p {
					font-size: 14px;
					line-height: 20px;
					text-align: justify;
				}
			}
			.partner {
				margin-bottom: 10px;
				padding: 20px 15px 24px;
				background: #FFFFFF;
				ul {
					display: flex;
				}
				li {
					flex: 1;
					text-align: center;
					img {
						width: 80%;
						margin-bottom: 15px;
					}
				}
				.text {
					font-size: 14px;
					span {
						color: #11bbff;
					}
				}
			}
			.team {
				margin-bottom: 10px;
				padding: 20px 15px 24px;
				background: #FFFFFF;
				.mui-slider-item {
					padding: 0 15px;
				}
				.team-item {
					margin-top: 5px;
					padding: 20px;
					background-color: #ffffff;
					box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.1);
					border-radius: 6px;
					font-size: 0;
					.team-title {
						display: flex;
					}
					.avatar-box {
						display: inline-block;
						vertical-align: top;
						width: 70px;
						flex: 0 0 70px;
					}
					.name-box {
						flex: 1;
						margin-left: 20px;
						p {
							line-height: initial;
						}
						.name {
							margin-top: 10px;
							margin-bottom: 10px;
							color: #232323;
							font-size: 14px;
						}
						.job {
							font-size: 12px;
						}
					}
					.team-main {
						margin-top: 12px;
						p {
							font-size: 12px;
							color: #232323;
							line-height: 18px;
						}
					}
				}
			}
			.branches {
				margin-bottom: 10px;
				padding: 20px 15px 24px;
				background: #FFFFFF;
				text-align: center;
				font-size: 14px;
			}
			.contact {
				padding: 20px 0 24px;
				background: #FFFFFF;
				font-size: 14px;
				.text-box {
					text-align: center;
					li {
						margin-bottom: 23px;
					}
					.name {
						margin-bottom: 10px;
						color: #2c2c2c;
					}
					.val {
						line-height: 20px;
						color: #999999;
					}
					
				}
				.ewm-box {
					text-align: center;
					font-size: 0;
					.ewm {
						margin-right: 65px;
						display: inline-block;
						vertical-align: top;
						.img-wrapper {
							width: 90px;
							height: 90px;
							line-height: 90px;
							text-align: center;
							border-radius: 6px;
							box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.1);
							img {
								width: 100%;
							}
						}
						&:last-child {
							margin-right: 0;
						}
						p {
							margin-top: 15px;
							text-align: center;
							color: #2c2c2c;
							font-size: 14px;
						}
					}
				}
			}
		}
		/*组织信息 end*/
		/*备案信息 start*/
		.record-box {
			.record {
				margin-bottom: 10px;
				padding: 20px 15px 24px;
				text-align: center;
				background: #FFFFFF;
				.text-box {
					margin-bottom: 43px;
					&:last-child {
						margin-bottom: 0;
					}
					h3 {
						font-size: 14px;
						color: #2c2c2c;
					}
					p {
						margin-top: 13px;
						line-height: 18px;
						font-size: 13px;
						color: #999999;
					}
					img {
						width: 12px;
						vertical-align: middle;
					}
					.beianbgs {
						display: inline-block;
						vertical-align: middle;
						color: #11bbff;
					}
				}
			}
			.audit,
			.compliance {
				margin-bottom: 10px;
				padding: 20px 15px 24px;
				text-align: center;
				background: #FFFFFF;
				p {
					font-size: 14px;
					text-align: center;
					color: #999999;
				}
			}
			.promise {
				margin-bottom: 10px;
				padding: 20px 115px 24px;
				text-align: center;
				background: #FFFFFF;
			}
			.contract {
				margin-bottom: 10px;
				padding: 20px 15px 0;
				text-align: center;
				background: #FFFFFF;
				.contract-item {
					display: flex;
					justify-content: space-around;
				}
				.mui-btn {
					padding: 6px 5px;
					border-radius: 0;
				}
			}
			.matter {
				margin-bottom: 10px;
				padding: 20px 15px 24px;
				text-align: center;
				background: #FFFFFF;
				.table {
					box-sizing: border-box;
					width: 100%;
					font-size: 12px;
					text-align: center;
					td {
						padding: 10px 5px;
						line-height: 15px;
						border: 1px solid #e5e5e5;
					}
					.bold {
						min-width: 70px;
						color: #1e82d2;
					}
				}
			}
			.channel {
				padding: 20px 15px 24px;
				text-align: center;
				background: #FFFFFF;
				text-align: center;
				p {
					margin-top: 18px;
					font-size: 14px;
				}
				.www {
					color: #1e82d2;
				}
				.ewm-box {
					margin-top: 40px;
					.img-box {
						width: 40%;
						margin: 0 auto;
					}
				}
			}
		}
		/*备案信息 end*/
		/*风险控制 start*/
		.risk-box {
			.risk {
				margin-bottom: 10px;
				padding: 20px 15px 24px;
				background: #FFFFFF;
				font-size: 14px;
				text-align: center;
				h5 {
					margin: 12px 0;
					color: #2c2c2c;
				}
				p {
					line-height: 18px;
					text-align: left;
					color: #2c2c2c;
				}
			}
			.process {
				margin-bottom: 10px;
				padding: 20px 15px 24px;
				background: #FFFFFF;
				font-size: 14px;
				color: #2c2c2c;
				.process-num {
					padding-top: 15px;
					position: relative;
					&:before {
						content: '';
						position: absolute;
						top: 0;
						left: 35px;
						height: 100%;
						width: 1px;
						background: #11bbff;
					}
					li {
						display: flex;
						position: relative;
						margin-bottom: 35px;
						.num-box {
							position: relative;
							width: 37px;
							flex: 0 0 37px;
						}
						.num {
							color: #11bbff;
							font-size: 15px;
							font-weight: bold;
						}
						.round-wrapper {
							margin-left: 7px;
							position: relative;
							display: inline-block;
							vertical-align: top;
							width: 8px;
							height: 15px;
							overflow: hidden;
							.round-dashed {
								position: absolute;
								left: 0;
								top: 0;
								width: 15px;
								height: 15px;
								line-height: 11px;
								text-align: center;
								border-radius: 50%;
								border: 1px dashed #11bbff;
							}
						}
						.round {
							position: absolute;
							top: 4px;
							right: -2px;
							width: 7px;
							height: 7px;
							border-radius: 50%;
							background-color: #11bbff;
						}
						.main {
							flex: 1;
							margin-left: 18px;
							h6 {
								padding-top: 1px;
								font-size: 13px;
								color: #232323;
							}
							.text {
								font-size: 12px;
								line-height: 16px;
								margin-top: 10px;
								color: #999999;
							}
						}
					}
				}
			}
			.warning {
				margin-bottom: 10px;
				padding: 20px 15px 24px;
				background: #FFFFFF;
				color: #2c2c2c;
			}
			.legal {
				padding: 20px 15px 24px;
				background: #FFFFFF;
				font-size: 14px;
				color: #2c2c2c;
				text-align: center;
				p {
					line-height: 18px;
					text-align: left;
				}
			}
		}
		/*风险控制 end*/
		/*律所护航 start*/
		.law {
			.office {
				margin-bottom: 10px;
				padding: 20px 15px 24px;
				background: #FFFFFF;
				color: #2c2c2c;
				p {
					font-size: 13px;
					line-height: 18px;
				}
			}
			.convoy {
				margin-bottom: 10px;
				padding: 20px 15px 24px;
				background: #FFFFFF;
				color: #2c2c2c;
				.title {
					padding: 0 65px;
				}
				.num-box {
					flex: 0 0 70px;
					justify-content: center;
				}
			}
			.law-item {
				margin-bottom: 10px;
				padding: 20px 15px 1px;
				background: #FFFFFF;
				li {
					margin-bottom: 20px;
					color: #1e82d2;
					font-size: 13px;
					line-height: 16px;
				}
			}
			.file {
				padding: 20px 15px 1px;
				background: #FFFFFF;
				.mui-btn {
					font-size: 13px;
					border-radius: 0;
				}
			}
		}
		/*律所护航 end*/
		/*媒体报道 start*/
		.media {
			.mui-table-view-cell {
				padding-right: 50px;
				.mui-icon {
					position: absolute;
					top: 50%;
					right: 22px;
					transform: translateY(-50%);
					color: #999999;
					/*font-size: 22px;*/
				}
			}
			h3 {
				margin-bottom: 15px;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				color: #2c2c2c;
				font-size: 15px;
			}
			.time {
				color: #999999;
				font-size: 12px;
			}
		}
		/*媒体报道 end*/
		.knowMore{color: #007aff;}
	}
</style>