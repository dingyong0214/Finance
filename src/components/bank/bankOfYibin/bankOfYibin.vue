<template>
	<div class="bankOfYibin">
		<img src="./banner.png"  class="banner"/>
		<div class="bank-line">
			<div  class="line-word">拥抱监管，安全合规</div>
		</div>
		<div class="bank-content">
            依据2016年8月24日由银监会、工信部、公安部、网信办联合公布的《网络借贷信息中介机构业务活动管理暂行办法》要求，需要互联网金融平台与银行业金融机构对接，对平台资金进行银行存管，具体做法是互联网金融平台在银行业金融机构开设独立账户，用于存放用户的交易资金，银行业金融机构根据用户的指令、合同内容，对用户的交易与资金流水进行划拨和簿记，以保障用户的资金安全。
            为了积极响应银行资金监管政策，保障出借人的资金安全，前海领投已与宜宾市商业银行合作并签署了银行存管协议。经过技术团队日夜兼程地开发，前海领投银行存管系统现已正式上线。
		</div>
		  <div class="bank-intro">
        <div class="intro">
            <img src="./logo-1.png" />
           <div class="bank-intro-content">
           	  <div class="i-title">资金隔离</div>
              <div class="i-content">平台与用户资金完全隔离，资金交易由宜宾市商业银行全程监管，杜绝资金池</div>
           </div>
        </div>
        <div class="intro">
            <img src="./logo-2.png" />
            <div class="bank-intro-content">
            <div class="i-title">信息真实</div>
            <div class="i-content"> 除平台严格风控外，加入银行信息核查，用户出借更添保障</div>
        </div>
        </div>
        <div class="intro">
            <img src="./logo-3.png" />
            <div class="bank-intro-content">
            <div class="i-title">交易安全</div>
            <div class="i-content">出借交易均由用户发起，并通过银行进行操作，保障借贷双方交易安全</div>
        </div>
        </div>
    </div>
   
    <div class="bank-proccess">
    	<div class="bank-line line2">
			<div  class="line-word word2">银行存管模式</div>
		</div>
        <img src="./background.png"  class="bg"/>
        <img src="./process.png" class="p-img" />
    </div>
     	<div class="bank-line line3">
			<div  class="line-word width">常见问题</div>
		</div>
	<ul class="bank-question">
        <li class="q-content">
            <span class="q-tit-1">
                <span class="q-circle"></span>
                银行存管上线后，用户资金有什么变化？
            </span>
            <span class="q-tit-2">
                用户资金由银行专门管理，只有用户本人才能操作账户上的资金，从根本上杜绝了用户资金被挪用的潜在风险。
            </span>
        </li>
        <li class="q-content">
            <span class="q-tit-1">
                <span class="q-circle"></span>
                银行存管上线后，提现会有什么影响？
            </span>
            <span class="q-tit-2">
                宜宾商业银行会在收到申请的当日受理，一般提现均为下一个工作日到账，到账时间遇双休日法定节假日顺延；即时提现，可当日到账。
            </span>
        </li>
        <li class="q-content">
            <span class="q-tit-1">
                <span class="q-circle"></span>
                银行存管上线后，用户需要做什么操作？
            </span>
            <span class="q-tit-2">
                新注册用户和老用户都需要开通银行存管账户，才能进行正常的充值、投资、提现等操作。
            </span>
        </li>
        <li class="q-content">
            <span class="q-tit-1">
                <span class="q-circle"></span>
                银行存管上线后，有哪些银行卡支持绑定？
            </span>
            <span class="q-tit-2">
                个人用户可以绑定最多五张银行卡，目前绑定快捷银行卡中，不支持快捷充值的银行包括招商银行、农业银行、民生银行、华夏银行；
            </span>
            <span class="q-tit-2 last">
                企业用户在银行存管开户时，必须输入一张对公的银行卡信息，且此银行卡不可解绑，企业用户只能使用这一张银行卡。
            </span>
        </li>
    </ul>
      <div class="bank-guide">
      	<router-link :to="{name:'helpList',query:{type:'bank'}}">操作指引>></router-link>
    </div>
    <div class="bank-nav">
        <img  src="./float.png"/>
        <div class="bank-b-content">
            <div class="bottom-1"> 开通银行存管账户，实现资金隔离，让流向更透明</div>
            <div class="bottom-2">（开通存管账户后才能正常充值、出借、提现哦）</div>
        </div>
        <a class="b-btn" @tap="href">马上开通</a>
<!--        <router-link :to="{name:'openingAccount'}" class="b-btn">马上开通</router-link>-->
    </div>
	</div>
</template>

<script>
		export default {
		data(){
			return{
				//app:false
			}
		},
		created() {
			/*
			 if(this.$route.query.app) {
				this.app=this.$route.query.app;
			}
			*/
		},
		methods:{
			href(){
				 location.href=this.sui.weChat()+ "#/bank/openingAccount?app=qhlead&webview=1";
			}
		}
	}
</script>

<style lang="scss">
	.bankOfYibin{
		background: #FFFFFF;
		min-height: 100%;
		.banner{width: 100%;}
		.bank-line{
			position: relative;
			height: 1px;
			width: 80%;
			left: 10%;
			background: #4D268C;
			margin-top: 45px;
			.line-word{
				background: #FFFFFF;
				color:#4D268C;
				position: absolute;
				font-size: 18px;
				font-weight: bold;
				width: 210px;
				top: -9px;
				left: 50%;
				text-align: center;
				margin-left: -110px;
			}
		}
		.bank-content{
			padding: 30px 12px;
			line-height: 22px;
			font-size: 14px;
		}
		
	.bank-intro{
	     width:100%;
	    position:relative;
	    padding: 0 12px;
    }
   .intro{
	    text-align:center;
	    position:relative;
	    z-index:10;
	    padding: 25px 0;
	    border-top: 1px dashed #E5E5E5;
	   img{
	    	width: 120px;
	    	display: inline-block;
	    	vertical-align: middle;
	    }
    .bank-intro-content{
    	display: inline-block;
    	width: 60%;
    	text-align: left;
    	vertical-align: middle;
    	
    }
    @media screen and (max-width: 374px){
		.bank-intro-content{
		   width: 56%;
		}
	}
}

.i-title{
    font-weight:bold;
    line-height:25px;
    padding-bottom:5px
}
.i-content {
    line-height: 20px;
    font-size: 14px;
}
.bank-proccess{
    position:relative;
    margin-top: -40px;
   .bg{
    	width: 100%;
    	display: block;
    }
    .p-img{
	    position:absolute;
	    width:90%;
	    top:90px;
	    left: 5%;
	}
	.line2{
		background: #FFFFFF !important;
		top: 45px;
		width: 70% !important;
		left: 15% !important;
	}
	.word2{
		color: #FFFFFF !important;
		background: #472181 !important;
		font-size: 17px !important;
		width: 160px !important;
		margin-left: -80px !important;
		font-weight: 500 !important;
		top: -8px !important;
	   }	
   }
   .line3{
     	width: 60% !important;
		left: 20% !important;
   }
   .width{
   	width: 120px !important;
   	margin-left: -60px !important;
   }
	.bank-question{
	    width:100%;
	    padding: 12px;
	}
	.q-content {
	    display: block;
	    border-bottom: 1px solid #E5E5E5;
	    padding-bottom:25px;
	    padding-top:5px;
	    font-size: 14px;
	}
	.q-tit-1 {
	    padding: 22px 0 12px 0;
	    display:inline-block;

	}
	.q-circle {
	    width: 8px;
	    height: 8px;
	    border-radius: 4px;
	    display: inline-block;
	    background: #4D268C;
	    margin-right:4px;
	}
	.q-tit-2{
	    color:#999;
	    display:block;
	    font-size:14px;
	    line-height: 20px;
	}
	.q-tit-2.last{
	    padding-top:12px
	}
	.bank-nav{
		position:relative;

		img{
			width:100%;
			display: block;
		}
	}
	.bank-b-content{
		padding: 0 12px;
	    position:absolute;
	    color:#FFFFFF;
	    z-index:10;
	    top: 50%;
	    margin-top: -16px;
	    font-size:12px;
	}
	 @media screen and (max-width: 374px){
		.bank-b-content{
		   width: 74%;
		   line-height: 18px;
		}
		.bottom-2{
			display: none;
		}
	}
	.bottom-2 {
	 padding-top: 6px;
	}
	.b-btn {
	    position: absolute;
	    display: block;
	    width: 70px;
	    height: 26px;
	    background: #FFD304;
	    border-radius: 13px;
	    color: #FFFFFF;
	    text-align: center;
	    line-height: 26px;
	    top: 50%;
	    margin-top: -13px;
	    right:15px;
	    font-size: 12px;

	}
	.bank-guide{
    text-align:center;
    padding:10px 15px 20px 15px;
}
    .bank-guide a {
        color: #4D268C;
        font-size:15px
    }
}
	
</style>