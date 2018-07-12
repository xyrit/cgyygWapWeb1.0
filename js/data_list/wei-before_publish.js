/****Hong******/  //未揭晓详情----往期揭晓记录
//获取浏览器地址传递过来的变量参数
//var url='http://192.168.1.206/cgyyg1.0';//临时用
var pid = GetQueryString("pid");
var lottery_id = GetQueryString("lottery_id");

var page_index=0;
getBeforePublishList();
function getBeforePublishList(){
	$.ajax({  
		type:'post',  
		url:''+urlPost+'/Index/productPast',  
		data:{
		   pid:pid,
		  // lotteryId:lottery_id,
		   p_pageIndex:page_index,
		   p_pageSize:10,
		   },  
		cache:false,  
		dataType:'json', 
		//timeout:60000, 
		beforeSend: function(){
			 //$(".loading").html("<img src='images/loading.gif'/><br>正在加载中...");  
			 $(".loading").show();
			},
		success:function(data){
			var code=data['code'];
		    var info=data['info'];
		    
		    if(code!=200){
			   tanchuan_0(info,'error','确定'); 
		    }
			var host=data['host'];//商品图片地址前缀
			var pic_host=data['pic_host'];//头像和晒单等需要上传显示的图片的地址前缀
			var startCode=data['startCode'];//开始码
			var prizeList=data['prize']['prizeList'];//中奖商品内容
			var prizeUser=data['prize']['prizeUser'];//中奖用户信息
			var prizeListStr='';
			for(i=0;i<prizeList.length;i++){
				var lottery_id=prizeList[i]['lottery_id'];
				var pid=prizeList[i]['pid'];
				var title=prizeList[i]['title'];
				var lottery_code=parseInt(startCode)+parseInt(prizeList[i]['lottery_code']);//需要转化为数字类型
				var need_count=prizeList[i]['need_count'];
				var hour_lottery=prizeList[i]['hour_lottery'];
				var total_time=prizeList[i]['total_time'];
				var lottery_time=prizeList[i]['lottery_time'];
				var last_attend_time=prizeList[i]['last_attend_time'];
				var attend_count=prizeList[i]['attend_count'];
				var create_time=prizeList[i]['create_time'];
				var lucky_code=prizeList[i]['lucky_code'];//参与码
				var ip_address=prizeList[i]['ip_address'];//
				//用户信息
				var uid_other=prizeUser[i]['uid'];
				var nickname=prizeUser[i]['nickname'];
				var path=prizeUser[i]['path'];//用户头像,,,到时候这里需要做个默认头像以及是否是查看个人的还是他人的
				var uid_link=uid_other+'&'+'nickname='+escape(nickname);//当未登录或者查看他人的参与或者晒单或者中奖记录时 浏览器传递的参数（昵称需要编码传递）
				var pin_link=pid+'&'+'lottery_id='+lottery_id;
				//构建结构
				prizeListStr+='<div class="issue_content">';
				prizeListStr+='<a href="6_goods-ing-adv.html?pid='+pin_link+'">';
                prizeListStr+='<div class="issue_content_nav position-re padding-l-r-1">期号：'+lottery_id+'';  
                prizeListStr+='<span class="icon-angle-right position-ab icon-right padding-l-r-1"></span>';        
                prizeListStr+='</div>';            
                prizeListStr+='</a>';      
                prizeListStr+='<div class="issue_content_publish row margin-l-r-0 flex_content">';     
                prizeListStr+='<div class="col-md-3 col-sm-3 col-xs-3 issue_content_publish_1 text-center">';     
				 
				//判断中奖用户是不是自己并且是否有头像
				var p = picHostUrl(pic_host,path);//此函数定义在common.js函数中
				if(typeof(uid) == "undefined"||uid!=uid_other){
					prizeListStr+='<a href="35-personal-other.html?uid='+uid_link+'">'; 
					prizeListStr+='<img src="'+p+'" alt="" class="userImg" style="width:100%">';
					prizeListStr+='</a>';
					
				  }else{
					  prizeListStr+='<a href="35-personal.html">'; 
					  prizeListStr+='<img src="'+p+'" alt="" class="userImg" style="width:100%">';
					  prizeListStr+='</a>';
				  } 
				  
                /*prizeListStr+='<a href="36-persona_ck.html">';       
                prizeListStr+='<img class="img_publish" src="'+path+'">';            
                prizeListStr+='</a>'; */
				               
                prizeListStr+='</div>';              
                prizeListStr+='<div class="col-md-9 col-sm-9 col-xs-9 padding-l-0">';        
                prizeListStr+='<h3 class="lg_22px fz_15px">'+title+'</h3>';  
				       
                prizeListStr+='<p class="lg_22px">获奖者：';  
				 
				//点击昵称跳转到相应的个人中心页面
				if(typeof(uid) == "undefined"||uid!=uid_other){
					
					prizeListStr+='<a href="35-personal-other.html?uid='+uid_link+'"><span class="text-red">'+nickname+'</span><span class="text-gray">（'+ip_address+'）</span></a>';
					
				  }else{
					 
					  prizeListStr+='<a href="35-personal.html"><span class="text-red">'+nickname+'</span><span class="text-gray">（'+ip_address+'）</span></a>';
				  }  
				           
               // prizeListStr+='<a href="36-persona_ck.html"><span class="text-skyblue">'+nickname+'</span><span class="text-gray">（'+ip_address+'）</span></a>';  
				             
                prizeListStr+='</p>';      
				prizeListStr+='<p class="lg_22px">用户ID：'+uid_other+'<span class="text-gray">（唯一不变标识）</span></p>';         
                prizeListStr+='<p class="lg_22px lottery_span">获奖幸运码：<span class="text-red">'+lottery_code+'</span></p>';                
                prizeListStr+='<p class="lg_22px">本期参与：<span class="text-red">'+attend_count+'</span>人次</p>';            
                prizeListStr+='<p class="lg_22px">揭晓时间：'+lottery_time+'</p>';              
                prizeListStr+='</div>';
				prizeListStr+='</div>';
				prizeListStr+='</div>';           
                
			}
			
			//最新一期正在揭晓中，点击跳到等待揭晓
			
			var tprizeList=data['tprizeList'];
			var tprizeListStr='';
			for(i=0;i<tprizeList.length;i++){
				var tprize_lotteryId=tprizeList[i]['lottery_id'];
				var pidLink=pid+'&'+'lottery_id='+tprize_lotteryId;
				tprizeListStr+='<a href="8_goods-ing-adving.html?pid='+pidLink+'" class="goods_iss">';
				tprizeListStr+='<span class="padding-l-r-1">期号：'+tprize_lotteryId+'<span class="text-red" style="padding-left:5px;">正在揭晓中...</span></span>';
				tprizeListStr+='<span class="icon-angle-right position-ab icon-right padding-l-r-1"></span>';
                tprizeListStr+='</a>';  
                
			}
			if(tprizeList.length>0){
			   $("#new_lotteryList").html(tprizeListStr);
			}
			
			
			
			//*****填充数据******//
			if(prizeList.length<=0){
				 $("#beforePublishList").html('<p class="text-center">暂无数据</p>');
				}else{
					$("#beforePublishList").html(prizeListStr);
				}
			
             //*********填充数据结束***************///             
			$(".loading").hide();
			
		},error:function(XMLHttpRequest, textStatus, errorThrown) {
			//tanchuan_2(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus); 
			tanchuan_0(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus,'error','确定');
		}
	});
}