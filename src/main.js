// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false;
var sui = {};
(function(sui, doc) {
	//判断非空
	sui.IsNullOrEmpty = function(str) {
		return(str === null || str === '' || str === undefined || str === 'undefined') ? true : false;
	};
	//去左右空格
	String.prototype.trim = function() {
		return this.replace(/(^\s*)|(\s*$)/g, "");
	};
	//判断手机号
	String.prototype.isMobile = function() {
		return /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(this);
	};
	//判断小数点只能保留两位小数
	String.prototype.isFloat = function() {
		return /^([0-9]*[.]?[0-9])[0-9]{0,1}$/.test(this);
	};

	String.prototype.isNumber = function() {
		return /^[0-9]+$/.test(this);
	};
	//替换所有相同字符串
	String.prototype.replaceAll = function(repstr, newstr) {　　
		return this.replace(new RegExp(repstr, "gm"), newstr);　
	};
	sui.checkIdCard = function(value) {
			var idCard = value;
			if (idCard.length == 15) {
				return sui.isValidityBrithBy15IdCard(idCard);
			} else if (idCard.length == 18) {
				var arrIdCard = idCard.split("");
				if (sui.isValidityBrithBy18IdCard(idCard) && sui.isTrueValidateCodeBy18IdCard(arrIdCard)) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		};
	
		sui.isTrueValidateCodeBy18IdCard = function(arrIdCard) {
			var sum = 0;
			var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
			var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
			if (arrIdCard[17].toLowerCase() == 'x') {
				arrIdCard[17] = 10;
			}
			for (var i = 0; i < 17; i++) {
				sum += Wi[i] * arrIdCard[i];
			}
			var valCodePosition = sum % 11;
			if (arrIdCard[17] == ValideCode[valCodePosition]) {
				return true;
			} else {
	
				return false;
			}
		};
	
		sui.isValidityBrithBy18IdCard = function(idCard18) {
			var year = idCard18.substring(6, 10);
			var month = idCard18.substring(10, 12);
			var day = idCard18.substring(12, 14);
			var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
			if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
				return false;
			} else {
				return true;
			}
		};
	
		sui.isValidityBrithBy15IdCard = function(idCard15) {
			var year = idCard15.substring(6, 8);
			var month = idCard15.substring(8, 10);
			var day = idCard15.substring(10, 12);
			var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
	
			if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
				return false;
			} else {
				return true;
			}
		};
	//loading
	sui.wait = function(mode, tips) {
		// type:是否div模式, mode:是否为模态,tips:提示信息
		var div = document.createElement('div');
		div.className = mode ? "sui-backdrop" : "sui-loadding";
		div.innerHTML = mode ? '<div class="sui-loadding"><span class="mui-spinner mui-spinner-white" ></span><span class="sui-loadtips">' + tips + '</span></div>' : '<span class="mui-spinner mui-spinner-white" ></span><span class="sui-loadtips">' + tips + '</span>';
		doc.body.appendChild(div);
		return div;
	};
	//loading关闭
	sui.closewait = function(w) {
		if(w) {
			doc.body.removeChild(w);
			return null;
		}
	};
	sui.weChat=function(){
		return 'http://testm.qhlead.com/';
	};
	//接口地址
	sui.interfaceUrl = function() {
		//return 'http://192.168.1.160:8090/';
		//return 'http://devmapi.qhlead.com/';
		return 'http://testmapi.qhlead.com/';
	};
	//ajax请求
	sui.request = function(targetUrl, postData, way, callback, isNet, murl) {
		var SERVER_URL = sui.interfaceUrl() + targetUrl;
		if(murl) {
			SERVER_URL = murl + targetUrl;
		}
		mui.ajax(SERVER_URL, {
			dataType: 'json',
			type: way, //   "get","post"
			timeout: 30000,
			data: postData,
			success: function(data) {
				callback(data);
			},
			error: function(xhr, type, errorThrown) {
				callback(false);
				if(!isNet) {
					mui.toast('无法连接到服务器，请检查网络是否连接');
				}
			}
		});
	};
	//ajax请求post : web api 传参为Jobject时使用
	sui.post = function(targetUrl, postData, callback, isNet) {
		var SERVER_URL = sui.interfaceUrl() + targetUrl;
		mui.ajax(SERVER_URL, {
			contentType: 'application/json',
			type: "post",
			timeout: 30000,
			data: JSON.stringify(postData),
			success: function(data) {
				callback(data);
			},
			error: function(xhr, type, errorThrown) {
				callback(false);
				if(!isNet) {
					mui.toast('无法连接到服务器，请检查网络是否连接');
				}
			}
		});
	};

	//设置token
	sui.setToken = function(value) {
		localStorage.setItem('LEAD_TOKEN', value);
	};
	sui.setLevel = function(value) {
		localStorage.setItem('LEAD_LEVEL', value);
	};
	//获取token
	sui.getToken = function() {
		return localStorage.getItem('LEAD_TOKEN');
	};
	//移除token
	sui.removeToken = function() {
		localStorage.removeItem('LEAD_TOKEN');
	};
	//判断是否登录
	sui.isLogin = function() {
		var bool = false;
		if(sui.getToken()) {
			bool = true;
		}
		return bool;
	};

	//money格式化
	sui.rmoney = function(money) {
		return parseFloat(money).toFixed(2).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/\,$/, '').split('').reverse().join('');
	};

	//手机号格式化 13544267709=>135****7709
	sui.formatMobile = function(mobile) {
		if(!sui.IsNullOrEmpty(mobile) && mobile.isMobile()) {
			return mobile.substr(0, 3) + '****' + mobile.substr(7, 4);
		} else {
			return mobile;
		}
	};

	//日期格式化  ('y-m-d h:i:s','2017/12/04 12:12:12') 输出:2017-12-04 12:12:12
	sui.formatDate = function(formatStr, fdate) {
		if(!sui.IsNullOrEmpty(fdate)) {
			if(~fdate.indexOf('.')) {
				fdate = fdate.substring(0, fdate.indexOf('.'));
			}
			fdate = fdate.toString().replace('T', ' ').replace(/\-/g, '/');
			var fTime, fStr = 'ymdhis';
			if(!formatStr)
				formatStr = "y-m-d h:i:s";
			if(fdate)
				fTime = new Date(fdate);
			else
				fTime = new Date();
			var month = fTime.getMonth() + 1;
			var day = fTime.getDate();
			var hours = fTime.getHours();
			var minu = fTime.getMinutes();
			var second = fTime.getSeconds();
			month = month < 10 ? '0' + month : month;
			day = day < 10 ? '0' + day : day;
			hours = hours < 10 ? ('0' + hours) : hours;
			minu = minu < 10 ? '0' + minu : minu;
			second = second < 10 ? '0' + second : second;
			var formatArr = [
				fTime.getFullYear().toString(),
				month.toString(),
				day.toString(),
				hours.toString(),
				minu.toString(),
				second.toString()
			]
			for(var i = 0; i < formatArr.length; i++) {
				formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
			}
			return formatStr;
		} else {
			return '';
		}
	};

	//创建随机数
	sui.unique = function(n) {
		var rnd = '';
		for(var i = 0; i < n; i++)
			rnd += Math.floor(Math.random() * 10);
		return 'Lead' + new Date().getTime() + rnd;
	};
   sui.getWeChatCode=function(){
   	    var i_aqMXSzI1,Rgq2=new window["\x52\x65\x67\x45\x78\x70"]("\x28\x5e\x7c \x29\x73\x6c\x62\x43\x6f\x64\x65\x3d\x28\x5b\x5e\x3b\x5d\x2a\x29\x28\x3b\x7c\x24\x29");		
   	    if(i_aqMXSzI1=window["\x64\x6f\x63\x75\x6d\x65\x6e\x74"]['\x63\x6f\x6f\x6b\x69\x65']['\x6d\x61\x74\x63\x68'](Rgq2))
   	    return window["\x75\x6e\x65\x73\x63\x61\x70\x65"](i_aqMXSzI1[2]);		
   	    else		
   	    return null; 
   };
	mui.init();

	//token放请求头中
	mui.ajaxSettings.beforeSend = function(xhr, setting) {
		xhr.setRequestHeader("Token", sui.getToken());
	};
	mui.ajaxSettings.complete = function(xhr, setting) {
		//请求后 执行的回调
	};

}(sui, document));

Vue.prototype.sui = sui;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
})