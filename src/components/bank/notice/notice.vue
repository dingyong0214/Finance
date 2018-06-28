<template>
	  <div  class="notice"> 
	  	<div class="bg"></div>
        <h1> 关于银行存管系统上线与停服的重要通知</h1>
        <div class="line"></div>
        <div class="container">
            <div class="dearAll">
                <div class="bold">亲爱的用户：</div>
                <div>为积极响应国家互联网金融管理办法有关规定，进一步提升用户资金安全，经前海领投与宜宾商业银行共同商议决定，平台将于2018年6月10日上线宜宾银行存管，期间预计停服4天，请您提前做好资金安排。</div>
            </div>
            <img src="./img.png" class="img" />
            <div class="proccess-1 colorFF9 size14 bold">一、时间安排（2018年6月7日--6月15日，时间如有变化，将另行通知）</div>
          <table class="table colorFFF size14">
                <tr>
                    <td>时间</td>
                    <td>安排事项</td>
                </tr>
                <tr>
                    <td>6月7日14点30分</td>
                    <td>关闭功能：注册、充值、发布债转</td>
                </tr>
                <tr>
                    <td>6月9日12点</td>
                    <td>关闭功能：出借、发布新标、提现</td>
                </tr>
                <tr>
                    <td>6月11日--6月14日（预计）</td>
                    <td>暂停所有服务，上线银行存管及数据迁移</td>
                </tr>
                <tr>
                    <td>6月15日（预计）</td>
                    <td>恢复正常服务</td>
                </tr>
            </table>
             <div class="colorFFF size14 lineheight padd22">对于正常还款日在6月7日--6月14日之间的借款用户，将统一在6月7号回款。</div>
             <div class="colorFF9 size14 bold lineheight padt35b20">二、银行存管事项</div>
            <div class="colorFFF size14 lineheight">1.存管上线后，需要您登录平台，开通宜宾商业银行资金存管账户并设置交易密码完成授权；</div>
            <div class="colorFFF size14 lineheight">2.存管网站目前仅支持大陆二代身份证，16周岁（精确到天）以下用户不支持开户；</div>
            <div class="colorFFF size14 lineheight">3.投资人必须进行风险测评，否则将不能进行投标操作，已测评的投资人可投标对应风险类型的标的；</div>
            <div class="colorFFF size14 lineheight">4.存管版APP升级：手机用户按APP内的提示升级到存管版。如无法更新，请前往前海领投PC官网扫描下载。</div>
            <div class="colorFFF size14 lineheight padt40">如有疑问，请联系客服：400-660-5027</div>
            <div class="colorFFF size14 lineheight pad30">深圳市前海领投互联网金融服务有限公司</div>
            <div class="colorFFF size14 lineheight right">2018年6月8日</div>
        </div>
     </div>
</template>

<script>
	
</script>

<style lang="scss">
	.notice{
		.bg{
			 width: 100%;
		      background: url("./background.png") no-repeat center;
		      background-size: 100% 100%;
			  position: fixed;
			  top: 0;
			  left: 0;
		     height: 100%;
		     z-index: -1;
		}
	   
	   h1 {
			    color: #FF9D3D;
			    font-size: 16px;
			    text-align: center;
			    padding: 35px 0 15px 0;
			    position: relative;
			}
			
			.line {
			    height: 2px;
			    border: 1px solid #FF9D3D;
			    background: #FF9D3D;
			    border-radius: 4px;
			    width: 50px;
			    margin: 0 auto
			}
	   .dearAll {
		    color: #FFFFFF;
		    font-size: 14px;
		    padding: 30px 0 20px 0;
		    line-height: 22px
		}
		.img{width: 90%;margin-left: 5%;}
		.size14 {
		    font-size: 14px
		}
		
		.colorFFF {
		    color: #FFFFFF !important;
		}
		
		.colorFF9 {
		    color: #FF9D3D !important;
		}
		
		.proccess-1 {
		    padding: 20px 0 ;
		    line-height: 22px;
		}
		.table {
    /*border:1px solid #FFFFFF;*/
    border-collapse: collapse;
    width: 100%;
}

    .table tr {
        text-align: center;
        height: 50px;
        width:100%;
        
    }

        .table tr td {
            border: 1px solid #FFFFFF;
            line-height: 20px;
            padding: 5px;
        }
        .container{
        	padding: 0 12px;
        }
        .padd22{
		    padding-top:20px;
		    padding-bottom: 20px;
		    border-bottom: 1px dashed #FFFFFF
		}
		.lineheight {
		    line-height: 20px
		}
		.padt35b20 {
		    padding: 20px 0;
		}
		.padt40 {
		    padding-top: 30px
		}
		.pad30 {
		    text-align: right;
		    padding-top: 30px
		}
		.right{
		    text-align:right;
		    padding-bottom: 20px;
		}
	}
	
</style>