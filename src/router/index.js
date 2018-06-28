import Vue from 'vue'
import Router from 'vue-router'

//登录注册：
import login from '@/components/passport/login/login'
import regStart from '@/components/passport/regStart/regStart'
import register from '@/components/passport/register/register'
import findPassword from '@/components/passport/findPassword/findPassword'
//---第三方登录：
import loginBind from '@/components/passport/loginBind/loginBind'
import oauthLogin from '@/components/passport/oauthLogin/oauthLogin'
import modifyOauth from '@/components/passport/modifyOauth/modifyOauth'
import sureOauth from '@/components/passport/sureOauth/sureOauth'
//---中转页：
import auth from '@/common/components/auth/auth'

//首页：
import home from '@/components/home/home/home'
import beginner from '@/components/home/beginner/beginner'
import info from '@/components/home/info/info'
import infoDetail from '@/components/home/infoDetail/infoDetail'
import security from '@/components/home/security/security'
import information from '@/components/home/information/information'
import manage from '@/components/home/manage/manage'
import legislation from '@/components/home/legislation/legislation'

//出借：
import investment from '@/components/invest/investment/investment'
import investDetail from '@/components/invest/investDetail/investDetail'
import tenderList from '@/components/invest/tenderList/tenderList'
import investRecording from '@/components/invest/investRecording/investRecording'
import investText from '@/components/invest/investText/investText'
import investMsg from '@/components/invest/investMsg/investMsg'
import addInvest from '@/components/invest/addInvest/addInvest'

//资产：
import assets from '@/components/assets/assets/assets'
import assetsRecords from '@/components/assets/assetsRecords/assetsRecords'
import repayList from '@/components/assets/repayList/repayList'
import xieyi from '@/components/assets/xieyi/xieyi'

//用户中心：
import user from '@/components/user/user/user'
//---充值提现：
import recharge from '@/components/user/recharge/recharge'
import withdraw from '@/components/user/withdraw/withdraw'
//---回款日历
import payCalendar from '@/components/user/payCalendar/payCalendar'
import payCalendarDTL from '@/components/user/payCalendarDTL/payCalendarDTL'
//---我的转让
import myTransfer from '@/components/user/myTransfer/myTransfer'
import transfer from '@/components/user/transfer/transfer'
import transferDetail from '@/components/user/transferDetail/transferDetail'
//---我的卡券
import coupon from '@/components/user/coupon/coupon'
//---自动投标
import autoTender from '@/components/user/autoTender/autoTender'
import addAutoTender from '@/components/user/addAutoTender/addAutoTender'
//---我的借款
import myLoan from '@/components/user/myLoan/myLoan'
import loanApply from '@/components/user/loanApply/loanApply'
import repayCalendar from '@/components/user/repayCalendar/repayCalendar'
import repayCalendarDTL from '@/components/user/repayCalendarDTL/repayCalendarDTL'
import repayDetail from '@/components/user/repayDetail/repayDetail'

//---资金明细，充值记录，提现记录
import recording from '@/components/user/recording/recording'
//---邀请奖励
import ace from '@/components/user/ace/ace'
import aceDesc from '@/components/user/aceDesc/aceDesc'
import reward from '@/components/user/reward/reward'
import invite from '@/components/user/invite/invite'
//---消息
import message from '@/components/user/message/message'
import msgDetail from '@/components/user/msgDetail/msgDetail'
//---设置
import set from '@/components/user/set/set'
import setLoginPassword from '@/components/user/setLoginPassword/setLoginPassword'
import setTel from '@/components/user/setTel/setTel'
import safetyCode from '@/components/user/safetyCode/safetyCode'
import pushSms from '@/components/user/pushSms/pushSms'

//---个人资料
import myData from '@/components/user/myData/myData'
import address from '@/components/user/address/address'
import editAddress from '@/components/user/editAddress/editAddress'
import bankCard from '@/components/user/bankCard/bankCard'
import riskTest from '@/components/user/riskTest/riskTest'

//---更多
import more from '@/components/user/more/more'
import contactUs from '@/components/user/contactUs/contactUs'
//import about from '@/components/user/about/about'
import opinion from '@/components/user/opinion/opinion'

//---app下载页
import appDown from '@/components/user/appDown/appDown'

//---帮助中心
import help from '@/components/help/help/help'
import helpList from '@/components/help/helpList/helpList'
import helpCont from '@/components/help/helpCont/helpCont'

//import share from '@/components/user/share/share'
import text from '@/components/user/text/text'

//协议
import Authorize from '@/common/components/xieyi/Authorize'
import loanContract from '@/common/components/xieyi/loanContract'
import monthProtocol from '@/common/components/xieyi/monthProtocol'
import regProtocol from '@/common/components/xieyi/regProtocol'
import riskNote from '@/common/components/xieyi/riskNote'
import transferProtocol from '@/common/components/xieyi/transferProtocol'
import yearProtocol from '@/common/components/xieyi/yearProtocol'

//银行存管
import personalOpening from '@/components/bank/personalOpening/personalOpening'
import businessOpening from '@/components/bank/businessOpening/businessOpening'
import businessAuth from '@/components/bank/businessAuth/businessAuth'
import authExplain from '@/components/bank/authExplain/authExplain'
import bindBankCard from '@/components/bank/bindBankCard/bindBankCard'
import tradePwd from '@/components/bank/tradePwd/tradePwd'
import setPayPwd from '@/components/bank/setPayPwd/setPayPwd'
import resetPayPwd from '@/components/bank/resetPayPwd/resetPayPwd'
import openingSuccess from '@/components/bank/openingSuccess/openingSuccess'
import openingAccount from '@/components/bank/openingAccount/openingAccount'
import modifyPayPwd from '@/components/bank/modifyPayPwd/modifyPayPwd'
import checkPayPassword from '@/components/bank/checkPayPassword/checkPayPassword'
import unbindCardCallBack from '@/components/bank/unbindCardCallBack/unbindCardCallBack'
import openingProtocol from '@/components/bank/openingProtocol/openingProtocol'
import notice from '@/components/bank/notice/notice'
import bankOfYibin from '@/components/bank/bankOfYibin/bankOfYibin'

Vue.use(Router)

const router = new Router({
	routes: [{
			path: '/',
			redirect: 'home',
			component: home
		},

		//首页
		{
			path: '/home',
			name: 'home',
			component: home,
			meta: {
				nav: 'home',
				title: '首页'
			}
		},
		{
			path: '/home/beginner',
			name: 'beginner',
			component: beginner,
			meta: {
				title: '新手专享标'
			}
		},
		{
			path: '/home/info',
			name: 'info',
			component: info,
			meta: {
				title: '资讯中心'
			}
		},
		{
			path: '/home/info/infoDetail',
			name: 'infoDetail',
			component: infoDetail,
			meta: {
				title: '资讯详情'
			}
		},
		{
			path: '/home/security',
			name: 'security',
			component: security,
			meta: {
				title: '安全保障'
			}
		},
		{
			path: '/home/manage',
			name: 'manage',
			component: manage,
			meta: {
				title: '运营数据'
			}
		},
		{
			path: '/home/legislation',
			name: 'legislation',
			component: legislation,
			meta: {
				title: '法律法规'
			}
		},
		{
			path: '/home/information',
			name: 'information',
			component: information,
			meta: {
				keepAlive: true,
				title: '信息披露'
			}
		},
		//出借
		{
			path: '/investment',
			name: 'investment',
			component: investment,
			meta: {
				nav: 'investment',
				keepAlive: true,
				title: '出借'
			}
		},
		{
			path: '/investment/tenderList',
			name: 'tenderList',
			component: tenderList,
			meta: {
				title: '标的列表'
			}
		},
		{
			path: '/investment/investRecording',
			name: 'investRecording',
			component: investRecording,
			//			meta: {
			//				authLogin: true
			//			}
		},
		{
			path: '/investment/investDetail',
			name: 'investDetail',
			component: investDetail
		},
		{
			path: '/investment/investText',
			name: 'investText',
			component: investText
		},
		{
			path: '/investment/investMsg',
			name: 'investMsg',
			component: investMsg
		},
		{
			path: '/investment/addInvest',
			name: 'addInvest',
			component: addInvest,
			meta: {
				title: '出借标的'
			}
		},

		//资产
		{
			path: '/assets',
			name: 'assets',
			component: assets,
			meta: {
				nav: 'assets',
				title: '资产'
			},
			beforeEnter: (to, from, next) => {
				if(localStorage.getItem('LEAD_TOKEN')) {
					next()
				} else {
					next({
						name: "login",
						query: {
							redirect: "assets"
						}
					})
				}
			}
		},
		{
			path: '/assets/assetsRecords',
			name: 'assetsRecords',
			component: assetsRecords
		},
		{
			path: '/assets/repayList',
			name: 'repayList',
			component: repayList,
			meta: {
				title: '收款计划'
			}
		},
		{
			path: '/assets/xieyi',
			name: 'xieyi',
			component: xieyi,
			meta: {
				title: '查看协议'
			}
		},

		//个人中心
		{
			path: '/user',
			name: 'user',
			component: user,
			meta: {
				nav: 'user',
				title: '我的'
			}
		},
		{
			path: '/user/recharge',
			name: 'recharge',
			component: recharge,
			meta: {
				title: '充值',
				authLogin: true
			}
		},
		{
			path: '/user/withdraw',
			name: 'withdraw',
			component: withdraw,
			meta: {
				title: '提现'
			}
		},
		{
			path: '/user/payCalendar',
			name: 'payCalendar',
			component: payCalendar,
			meta: {
				title: '回款日历',
				authLogin: true
			},
			//			beforeEnter: (to, from, next) => {
			//				if(localStorage.getItem('LEAD_TOKEN')) {
			//					next()
			//				} else {
			//					next({
			//						name: "login",
			//						query: {
			//							redirect: "home"
			//						}
			//					})
			//				}
			//			}
		},
		{
			path: '/user/payCalendarDTL',
			name: 'payCalendarDTL',
			component: payCalendarDTL,
			meta: {
				title: '回款日历详情'
			}
		},
		{
			path: '/user/myTransfer',
			name: 'myTransfer',
			component: myTransfer,
			meta: {
				keepAlive: true,
				authLogin: true,
				title: '我的转让'
			}
		},
		{
			path: '/user/myTransfer/transfer',
			name: 'transfer',
			component: transfer,
			meta: {
				title: '转让'
			}
		},
		{
			path: '/user/myTransfer/transferDetail',
			name: 'transferDetail',
			component: transferDetail,
			meta: {
				title: '转让详情',
				authLogin: true,
			}
		},
		{
			path: '/user/coupon',
			name: 'coupon',
			component: coupon,
			meta: {
				title: '我的卡券',
				authLogin: true,
			}
		},
		{
			path: '/user/autoTender',
			name: 'autoTender',
			component: autoTender,
			meta: {
				title: '自动投标'
			}
		},
		{
			path: '/user/autoTender/addAutoTender',
			name: 'addAutoTender',
			component: addAutoTender,
			meta: {
				title: '自动投标设置'
			}
		},
		{
			path: '/user/myLoan',
			name: 'myLoan',
			component: myLoan,
			meta: {
				keepAlive: true,
				title: '我的借款',
				authLogin: true
			}
		},
		{
			path: '/user/myLoan/loanApply',
			name: 'loanApply',
			component: loanApply,
			meta: {
				title: '我要借款',
				authLogin: true
			}
		},
		{
			path: '/user/myLoan/repayCalendar',
			name: 'repayCalendar',
			component: repayCalendar,
			meta: {
				title: '还款日历',
				authLogin: true
			}
		},
		{
			path: '/user/myLoan/repayCalendar/repayCalendarDTL',
			name: 'repayCalendarDTL',
			component: repayCalendarDTL,
			meta: {
				title: '还款日历详情',
				authLogin: true
			}
		},
		{
			path: '/user/myLoan/repayDetail',
			name: 'repayDetail',
			component: repayDetail,
			meta: {
				title: '还款详情',
				authLogin: true
			}
		},
		{
			path: '/user/recording',
			name: 'recording',
			component: recording
		},
		{
			path: '/user/ace',
			name: 'ace',
			component: ace,
			meta: {
				title: '邀请奖励'
			}
		},
		{
			path: '/user/ace/aceDesc',
			name: 'aceDesc',
			component: aceDesc,
			meta: {
				title: '说明'
			}
		},
		{
			path: '/user/ace/reward',
			name: 'reward',
			component: reward,
			meta: {
				title: '我的奖励'
			}
		},
		{
			path: '/user/ace/invite',
			name: 'invite',
			component: invite,
			meta: {
				title: '邀请明细',
				authLogin: true
			}
		},
		{
			path: '/user/message',
			name: 'message',
			component: message,
			meta: {
				title: '消息'
			}
		},
		{
			path: '/user/message/msgDetail',
			name: 'msgDetail',
			component: msgDetail,
			meta: {
				title: '消息详情'
			}
		},
		{
			path: '/user/set',
			name: 'set',
			component: set,
			meta: {
				title: '设置'
			}
		},
		{
			path: '/user/set/setLoginPassword',
			name: 'setLoginPassword',
			component: setLoginPassword,
			meta: {
				title: '登录密码'
			}
		},
		{
			path: '/user/set/setTel',
			name: 'setTel',
			component: setTel,
			meta: {
				title: '更换手机号',
				authLogin: true
			}
		},
		{
			path: '/user/set/safetyCode',
			name: 'safetyCode',
			component: safetyCode,
			meta: {
				title: '安全码'
			}
		},
		{
			path: '/user/set/pushSms',
			name: 'pushSms',
			component: pushSms,
			meta: {
				title: '短信消息设置'
			}
		},
		{
			path: '/user/set/myData',
			name: 'myData',
			component: myData,
			meta: {
				title: '个人资料',
				authLogin: true
			}
		},
		{
			path: '/user/set/myData/bankCard',
			name: 'bankCard',
			component: bankCard,
			meta: {
				title: '银行卡管理'
			}
		},
		{
			path: '/user/set/myData/address',
			name: 'address',
			component: address,
			meta: {
				title: '地址管理'
			}
		},
		{
			path: '/user/set/myData/editAddress',
			name: 'editAddress',
			component: editAddress
		},
		{
			path: '/user/set/myData/riskTest',
			name: 'riskTest',
			component: riskTest,
			meta: {
				title: '风险评测'
			}
		},
		{
			path: '/user/more',
			name: 'more',
			component: more,
			meta: {
				title: '更多'
			}
		},
		{
			path: '/user/more/opinion',
			name: 'opinion',
			component: opinion,
			meta: {
				title: '意见反馈'
			}
		},
		{
			path: '/user/more/contactUs',
			name: 'contactUs',
			component: contactUs,
			meta: {
				title: '联系我们'
			}
		},
		//		{
		//			path: '/user/more/about',
		//			name: 'about',
		//			component: about,
		//			meta: {
		//				title: '关于我们'
		//			}
		//		},
		{
			path: '/appDown',
			name: 'appDown',
			component: appDown,
			meta: {
				title: 'app下载'
			}
		},

		{
			path: '/help',
			name: 'help',
			component: help,
			meta: {
				title: '帮助中心',
				keepAlive: true
			}
		},
		{
			path: '/help/helpList',
			name: 'helpList',
			component: helpList,
			meta: {
				title: '帮助中心'
			}
		},
		{
			path: '/help/helpList/helpCont',
			name: 'helpCont',
			component: helpCont,
			meta: {
				title: '帮助中心'
			}
		},

		//登录，注册，找回密码
		{
			path: '/login',
			name: 'login',
			component: login,
			meta: {
				title: '登录'
			}
		},
		{
			path: '/regStart',
			name: 'regStart',
			component: regStart,
			meta: {
				title: '注册'
			}
		},
		{
			path: '/register',
			name: 'register',
			component: register,
			meta: {
				title: '注册'
			}
		},
		{
			path: '/findPassword',
			name: 'findPassword',
			component: findPassword,
			meta: {
				title: '忘记密码'
			}
		},
		{
			path: '/bank/authExplain',
			name: 'authExplain',
			component: authExplain,
			meta: {
				title: '授权说明'
			}
		},
		{
			path: '/bank/bindBankCard',
			name: 'bindBankCard',
			component: bindBankCard,
			meta: {
				title: '绑定银行卡',
				authLogin: true
			}
		},
		{
			path: '/bank/businessAuth',
			name: 'businessAuth',
			component: businessAuth,
			meta: {
				title: '业务授权',
				authLogin: true
			}
		},
		{
			path: '/bank/businessOpening',
			name: 'businessOpening',
			component: businessOpening,
			meta: {
				title: '企业开户',
				authLogin: true
			}
		},
		{
			path: '/bank/checkPayPassword',
			name: 'checkPayPassword',
			component: checkPayPassword,
			meta: {
				title: '验证交易密码',
				authLogin: true
			}
		},
		{
			path: '/bank/modifyPayPwd',
			name: 'modifyPayPwd',
			component: modifyPayPwd,
			meta: {
				title: '修改交易密码',
				authLogin: true
			}
		},
		{
			path: '/bank/openingAccount',
			name: 'openingAccount',
			component: openingAccount,
			meta: {
				title: '开通银行存管',
				authLogin: true
			}
		},
		{
			path: '/bank/openingSuccess',
			name: 'openingSuccess',
			component: openingSuccess,
			meta: {
				title: '开户成功'
			}
		},
		{
			path: '/bank/personalOpening',
			name: 'personalOpening',
			component: personalOpening,
			meta: {
				title: '个人开户',
				authLogin: true
			}
		},
		{
			path: '/bank/resetPayPwd',
			name: 'resetPayPwd',
			component: resetPayPwd,
			meta: {
				title: '重置交易密码',
				authLogin: true
			}
		},
		{
			path: '/bank/setPayPwd',
			name: 'setPayPwd',
			component: setPayPwd,
			meta: {
				title: '设置交易密码',
				authLogin: true
			}
		},
		{
			path: '/bank/tradePwd',
			name: 'tradePwd',
			component: tradePwd,
			meta: {
				title: '修改交易密码',
				authLogin: true
			}
		},
		{
			path: '/bank/unbindCardCallBack',
			name: 'unbindCardCallBack',
			component: unbindCardCallBack,
			meta: {
				title: '解绑银行卡',
				authLogin: true
			}
		},
		{
			path: '/bank/openingProtocol',
			name: 'openingProtocol',
			component: openingProtocol,
			meta: {
				title: '资金存管三方协议'
			}
		},
		{
			path: '/bank/bankOfYibin',
			name: 'bankOfYibin',
			component: bankOfYibin,
			meta: {
				title: '银行存管正式上线'
			}
		},
		{
			path: '/bank/notice',
			name: 'notice',
			component: notice,
			meta: {
				title: '银行存管暂停公告'
			}
		},
		//第三方微信登录:
		{
			path: '/loginBind',
			name: 'loginBind',
			component: loginBind
		},
		{
			path: '/oauthLogin',
			name: 'oauthLogin',
			component: oauthLogin
		},
		{
			path: '/modifyOauth',
			name: 'modifyOauth',
			component: modifyOauth
		},
		{
			path: '/sureOauth',
			name: 'sureOauth',
			component: sureOauth
		},
		{
			path: '/auth',
			name: 'auth',
			component: auth
		},

		//协议文本
		{
			path: '/text',
			name: 'text',
			component: text
		},
		{
			path: '/xieyi/Authorize',
			name: 'Authorize',
			component: Authorize
		},
		{
			path: '/xieyi/loanContract',
			name: 'loanContract',
			component: loanContract
		},
		{
			path: '/xieyi/monthProtocol',
			name: 'monthProtocol',
			component: monthProtocol
		},
		{
			path: '/xieyi/regProtocol',
			name: 'regProtocol',
			component: regProtocol
		},
		{
			path: '/xieyi/riskNote',
			name: 'riskNote',
			component: riskNote
		},
		{
			path: '/xieyi/transferProtocol',
			name: 'transferProtocol',
			component: transferProtocol
		},
		{
			path: '/xieyi/yearProtocol',
			name: 'yearProtocol',
			component: yearProtocol
		}
	],
	scrollBehavior(to, from, savedPosition) {
		if(savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
})

export default router

router.beforeEach((to, from, next) => {
	if(to.matched.some(record => record.meta.authLogin)) {
		if(localStorage.getItem('LEAD_TOKEN')) {
			next()
		} else {
			next({
				name: "login",
				query: {
					redirect: "user" //to.fullPath
				}
			})
		}
	}
	if(to.meta.title && to.meta.title !== 'undefined') {
		document.title = to.meta.title
	}
	next()
})