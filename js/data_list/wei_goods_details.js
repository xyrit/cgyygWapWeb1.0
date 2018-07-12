//*******Hong****/ /未揭晓详情（进行中）
//获取浏览器地址传递过来的变量参数
//var url='http://192.168.1.206/cgyyg1.0';//临时用
var pid = GetQueryString("pid");
var lottery_id = GetQueryString("lottery_id");

var glo_a_pageCount;//把获得的参与页码总数 定义为全局变量
var flag=GetQueryString("flag");//判断是否要弹出窗口
var glo_startCode;//开始码
getGoodsList();
function getGoodsList(){
	$.ajax({  
		type:'post',  
		url:''+urlPost+'/Index/productWapByDetail',  
		data:{
		   pid:pid,
		   uid:uid,//用户ID，非必须，需要登陆后 读取本地存储中的 用户id字段
		   lotteryId:lottery_id,
		   a_pageIndex:0,
		   a_pageSize:10,
		   p_pageIndex:0,
		   p_pageSize:1
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
			  // tanchuan_2(info); 
			  tanchuan_0(info,'error','确定');
		    }
			
			
			/******* start 跳转三个不同状态 //判断商品状态     0已开奖    1 开奖中    2  未开奖***********/
			var pid = GetQueryString("pid");
			
			var lottery_id = GetQueryString("lottery_id");
		   if(data['detail']['product'][0]['product_status']==1)//等待揭晓
		    {
			  window.location.href="8_goods-ing-adving.html?pid="+pid+"&lottery_id="+lottery_id+"";
			}
		    else if(data['detail']['product'][0]['product_status']==0)//已经揭晓
			{
			  window.location.href="6_goods-ing-adv.html?pid="+pid+"&lottery_id="+lottery_id+"";	
			}
			
			
			var host=data['host'];
			var pic_host=data['pic_host'];//用户头像和晒单等需要上传才显示的图片地址前缀
			var startCode=data['startCode'];
			glo_startCode=startCode;//开始码全局变量
			var a_pageCount=data['a_pageCount'];//参与记录的页码总数
			glo_a_pageCount=a_pageCount;
			var product=data['detail']['product'][0];
			var category=product['category'];//分类名称
			var pid=product['pid'];//商品ID
			var lottery_id=product['lottery_id'];//期号ID
			var need_count=product['need_count'];//总需参与人次
			var attend_count=product['attend_count'];//已经参与人次
			var attend_limit=product['attend_limit'];//最低购买/参与人次，用于加入购物车按钮
			var max_attend_limit=product['max_attend_limit'];//最大购买/参与人次，购买人次不能大于此数字，用于加入购物车按钮
			var title=product['title'];//商品标题
			var pics=product['pics'];//商品图片ID，在这里用不上
			var content=product['content'];//商品内容
			var parameters=product['parameters'];//商品副标题
			var picList=data['detail']['pics'];
			var picListr='';
			for(i=0;i<picList.length;i++){
				var path=host+picList[i]['path'];
				picListr+='<li><img src="'+path+'"/></li>';
			}
			//我的参与码--如果我有参与了-----采用弹出框的方式
			var luckyCode=data['luckyCode'];
			var luckyCodeStr='';
			var attend_count_Count=0;
			for(i=0;i<luckyCode.length;i++){
				var attend_count=Number(luckyCode[i]['attend_count']);
				attend_count_Count+=attend_count;//赋值给全局变量
				//参与码要分割
				/*var lucky_code=luckyCode[i]['lucky_code'];
				var create_time=luckyCode[i]['create_time'];
				
				var trueAttendCode='';//把startCode分离出来，然后以分号连接成一个新数字，这个是全部幸运码
			    			    
				var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
				for(var j = 0;j<s.length;j++){
					//在循环里面不能定义两个相同的变量，i和J 不能两个I
				   //trueAttendLucky_code+=(startCode+Number(s[j]))+'，';
				   trueAttendCode+='<span class="display-ib padding-r-8">'+(startCode+Number(s[j]))+'</span>';
				   
					 
				}//把startCode分离出来，然后以分号连接成一个新数字
				trueAttendCode=trueAttendCode.substring(0,trueAttendCode.length-1);//去掉最后一个分号
				
				luckyCodeStr+='<p class="text-gray2 margin-b-5">'+create_time+'</p>';//创建时间
				luckyCodeStr+='<p class="word-break nomargin margin-r_8">'+trueAttendCode+'</p>';//幸运码,弹出框中的*/
			}
			
			//弹出占卜弹出--开始 2016-2-18
			var pic_first=picList[0]['path'];
			if(flag==1){
				
				/* center modal 模态框居中*/
				/*function centerModals(){
					$('.modal').each(function(i){
						var $clone = $(this).clone().css('display', 'block').appendTo('body');   
						var top = Math.round(($clone.height() - $clone.find('.modal-dialog').height()) / 2);
						top = top > 0 ? top : 0;
						$clone.remove();
						$(this).find('.modal-dialog').css("margin-top", top);
					});
				}
				$('.modal').on('show.bs.modal', centerModals);
				$(window).on('resize', centerModals);*/
				
				
				$("#goodsPic").html('<img src="'+host+pic_first+'"/>');
				$("#myModal2").modal("toggle");
				
			 }
		   //弹出占卜弹出--结束
			
			
			
			
			//进度条
			if(need_count<1){
				progress=0;
			 }else{
				progress=(attend_count/need_count)*100;
				 }
			var remain=need_count-attend_count;
			//*****填充数据******//
			$("#slides").html(picListr);//轮播图
			$("#title").html(title+parameters);
			$(".lottery_id").html('期号：'+lottery_id+'');
			//构建进度条结构
			var progressStr='';
			progressStr+='<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress+'%"><span class="sr-only">'+progress+'% Complete (warning)</span></div>';
			$("#progress").html(progressStr);	
            $("#attend_count").html(attend_count);   
			$("#need_count").html(need_count);   
			$("#remain").html(remain); 
			
			//立即参与和加入购物车调用函数
			$("#rcorners2").attr("onClick","addShopping2("+pid+","+lottery_id+");");
			$("#add_to_cart").attr("onClick","addShopping("+pid+","+lottery_id+",$(this));");  
			//弹出框中立即参与
			$("#nowAdd2").attr("onClick","addShopping2("+pid+","+lottery_id+");");
			         
             //*********填充数据结束***************///             
			//调用轮播图插件
			 $('.flexslider').flexslider({
				animation: "slide",
				slideshow: true,
				directionNav: false,
				animationLoop: true,
				slideshowSpeed: 3000, 
			  });
			//点击图文详情后跳转
			var goods_link=pid+'&'+'lottery_id='+lottery_id;//赋值链接地址
			$("#details_link").attr('href','4_goods-ing-img.html?pid='+goods_link+'');
			//点击往期揭晓跳转
			$("#BeforePublishList").attr('href','5_goods-ing-pastannounce.html?pid='+goods_link+'');
			//点击晒单分享跳转
			$("#dis_share").attr('href','11_details_sun.html?pid='+goods_link+'');
			//我的参与码---弹出框
			if(luckyCode.length<=0){
			   $("#myAttend").html('您还没有参与本期商品哦！');
			}else{
				//参与次数
				$("#attend_count_Count").html(attend_count_Count);
				//$("#myAttend_count2").html('我一共参与了<span class="text-red">'+attend_count_Count+'</span>人次');
				//$("#myAttend").html();
				//$("#luckyCode").html(luckyCodeStr);
				//点击弹出层按钮---------我参与的，传我自己的uid
			    $("#alertList2").attr("onClick","alertList("+uid+","+lottery_id+");");
				}
			
			//参与记录
			var attendList=data['attendList'];
			var attendListStr='';
			for(i=0;i<attendList.length;i++){
				var nickname=attendList[i]['nickname'];
				var path=attendList[i]['path'];//用户头像,需要判断是否有头像，是否是第三方登录
				var uid_other=attendList[i]['uid'];
				var attend_count=attendList[i]['attend_count'];
				var lucky_code=attendList[i]['lucky_code'];//参与码
				var create_time=attendList[i]['create_time'];
				var attend_ip=attendList[i]['attend_ip'];
				var ip_address=attendList[i]['ip_address'];
				var attend_device=attendList[i]['attend_device'];
				var uid_link=uid_other+'&'+'nickname='+escape(nickname);//当未登录或者查看他人的参与或者晒单或者中奖记录时 浏览器传递的参数（昵称需要编码传递）
				
				//构建结构
				attendListStr+='<li>';
				attendListStr+='<div class="clearfix open-content">';
				attendListStr+='<div class="avatar">';
				//判断中奖用户是不是自己并且是否有头像
				var p = picHostUrl(pic_host,path);//此函数定义在common.js函数中
				if(typeof(uid) == "undefined"||uid!=uid_other){
					attendListStr+='<a href="35-personal-other.html?uid='+uid_link+'">'; 
					attendListStr+='<img width="35" height="35" src="'+p+'" alt="" class="userImg">';
					attendListStr+='</a>';
					
				  }else{
					  attendListStr+='<a href="35-personal.html">'; 
					  attendListStr+='<img width="35" height="35" src="'+p+'" alt="" class="userImg">';
					  attendListStr+='</a>';
				  } 
                /*attendListStr+='<a href="#">';                   
                attendListStr+='<img width="35" height="35" src="images/tx.png" alt="">';                   
                attendListStr+='</a>'; */  
				                     
                attendListStr+='</div>';                            
                attendListStr+='<div class="text">';                               
                attendListStr+='<p style="margin-bottom:5px;" class="nickname nomargin">'; 
				  
				//点击昵称跳转到相应的个人中心页面
				if(typeof(uid) == "undefined"||uid!=uid_other){
					attendListStr+='<a href="35-personal-other.html?uid='+uid_link+'" class="nickname-nc">';            
					attendListStr+=''+nickname+'';                     
					attendListStr+='</a>';
					
				  }else{
					  
					  attendListStr+='<a href="35-personal.html" class="nickname-nc">';            
					  attendListStr+=''+nickname+'';                     
					  attendListStr+='</a>';
				  }  
				                          
               // attendListStr+='<a href="#" class="nickname-nc">'+nickname+'</a>';   
				                         
                attendListStr+='<span>（'+ip_address+'）</span>';                         
                attendListStr+='</p>';                                
                attendListStr+='<p style="margin-bottom:5px;">参与了<span class="text-red">'+attend_count+'</span>人次<span class="padding-l-r-5">'+create_time+'</span></p>';                
				attendListStr+='</div>'; 
				attendListStr+='</div>';               
                attendListStr+='</li>';                            
                                   
                                
		    }
			
			if(attendList.length<=0){
				$("#attendList").html('<li class="text-center">还没有参与记录哦，快快参与吧</li>');
				$(".loadingMore").hide();
				}else{
					$("#attendList").html(attendListStr);
					}
			if(a_pageCount<=1){
			   $(".loadingMore").hide();
			}else{
			   $(".loadingMore").show();
			}
			$(".loading").hide();
		},error:function(XMLHttpRequest, textStatus, errorThrown) {
			//tanchuan_2(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus); 
			tanchuan_0(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus,'error','确定');
		}
	});
}

//参与记录的翻页功能
var index_attend=0;
function attendList(index_attend){
	//index_attend_b=index_attend;
	$.ajax({  
		type:'post',  
		url:''+urlPost+'/Index/attendListById',  
		data:{
		   lotteryId:lottery_id,
		   pageIndex:index_attend,
		   pageSize:10,
		   },  
		cache:false,  
		dataType:'json',
		timeout:60000,
		beforeSend: function(){
			//$(".loading").html("<img src='images/loding.gif'/><br>正在加载中...");
			$(".loading").show();
			},	  
		success:function(data){
			 var code=data['code'];
			 var info=data['info'];
			 
			 if(code!=200){
			    //tanchuan_2(info);
				tanchuan_0(info,'error','确定');
			 }
			 var host=data['host'];
			 var pic_host=data['pic_host'];
	         var startCode=data['startCode'];
			 var attendList=data['attendList'];
			 var attendListStr='';
			 for(i=0;i<attendList.length;i++){
				  var nickname=attendList[i]['nickname'];
				  var path=attendList[i]['path'];//用户头像,需要判断是否有头像，是否是第三方登录
				  var uid_other=attendList[i]['uid'];
				  var attend_count=attendList[i]['attend_count'];
				  var lucky_code=attendList[i]['lucky_code'];//参与码
				  var create_time=attendList[i]['create_time'];
				  var attend_ip=attendList[i]['attend_ip'];
				  var ip_address=attendList[i]['ip_address'];
				  var attend_device=attendList[i]['attend_device'];
				  var uid_link=uid_other+'&'+'nickname='+escape(nickname);//当未登录或者查看他人的参与或者晒单或者中奖记录时 浏览器传递的参数（昵称需要编码传递）
				  //构建结构
				  attendListStr+='<li>';
				  attendListStr+='<div class="clearfix open-content">';
				  attendListStr+='<div class="avatar">';
				  
				  //判断中奖用户是不是自己并且是否有头像
				  var p = picHostUrl(pic_host,path);//此函数定义在common.js函数中
				  if(typeof(uid) == "undefined"||uid!=uid_other){
					  attendListStr+='<a href="35-personal-other.html?uid='+uid_link+'">'; 
					  attendListStr+='<img width="35" height="35" src="'+p+'" alt="" class="userImg">';
					  attendListStr+='</a>';
					  
					}else{
						attendListStr+='<a href="35-personal.html">'; 
						attendListStr+='<img width="35" height="35" src="'+p+'" alt="" class="userImg">';
						attendListStr+='</a>';
					} 
				  /*attendListStr+='<a href="#">';                   
				  attendListStr+='<img width="35" height="35" src="images/tx.png" alt="">';                   
				  attendListStr+='</a>';*/    
				                      
				  attendListStr+='</div>';                            
				  attendListStr+='<div class="text">';                               
				  attendListStr+='<p style="margin-bottom:5px;" class="nickname nomargin">';  
				   
				  //点击昵称跳转到相应的个人中心页面
				  if(typeof(uid) == "undefined"||uid!=uid_other){
					  attendListStr+='<a href="35-personal-other.html?uid='+uid_link+'" class="nickname-nc">';            
					  attendListStr+=''+nickname+'';                     
					  attendListStr+='</a>';
					  
					}else{
						
						attendListStr+='<a href="35-personal.html" class="nickname-nc">';            
						attendListStr+=''+nickname+'';                     
						attendListStr+='</a>';
					}                           
				 // attendListStr+='<a href="#" class="nickname-nc">'+nickname+'</a>';  
				                            
				  attendListStr+='<span>（'+ip_address+'）</span>';                         
				  attendListStr+='</p>';                                
				  attendListStr+='<p style="margin-bottom:5px;">参与了<span class="text-red">'+attend_count+'</span>人次<span class="padding-l-r-5">'+create_time+'</span></p>';                
				  attendListStr+='</div>'; 
				  attendListStr+='</div>';               
				  attendListStr+='</li>';
			 }
			 $("#attendList").append(attendListStr);
			 $(".loading").hide();
		},error:function(XMLHttpRequest, textStatus, errorThrown) {
			//tanchuan_2(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus); 
			tanchuan_0(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus,'error','确定');
		}
   });
}
//翻页，加载更多---也就是下一页
$(".loadingMore").attr("onClick","loadmoreGoods();");
function loadmoreGoods(){ 
    index_attend=index_attend+1;
	if(glo_a_pageCount-1<index_attend){
		$(".loadingMore").html('没有更多内容了');
		return;
	}
    attendList(index_attend);
	
}
//弹窗查看参与码
function alertList(uid_other,lottery_id){
 
  $.ajax({  
			type:'post',  
			url:''+urlPost+'/Attend/getAttendInfo',  
			data:{
				uid:uid_other,
				lottery_id:lottery_id,
				
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				/*$(".loading").html("<img src='images/loding.gif'/><br>正在加载中..."); */
			},
			success:function(data){  
			   
				var code=data['code'];
				var info=data['info'];
				if(code!=200){
					swal({
						title: "",
						text: ''+info+'<a href="javaScript:;" class="text-danger" onClick="window.location.reload();">点击重新加载</a>',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					});
					return;
				}
			   var list=data['list'];	
			   var list_num=data['sum'];//总共参与的人次
			   var luckyCodeStr='';
			   for(i=0;i<list.length;i++){
				   var id=list[i]['id'];//参与序号
				   var code_create_time=list[i]['create_time'];//参与时间
				   var lucky_code=list[i]['lucky_code'];//参与码
				   var my_trueAttendCode='';
				   var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
					for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
					  //把startCode分离出来，然后以分号连接成一个新数字
					   my_trueAttendCode+='<span class="display-ib padding-r-8">'+(glo_startCode+Number(s[j]))+'</span>';
					}
					
				   //时间戳格式化
				  //参与时间
				  var  time_attend= code_create_time;
				  var newDate_attend = new Date();
				  newDate_attend.setTime(time_attend * 1000);
				  var my_create_time_attend=newDate_attend.format('yyyy-MM-dd hh:mm:ss');	
				  luckyCodeStr+='<p class="text-gray2">'+my_create_time_attend+'</p>';//创建时间
				  luckyCodeStr+='<p class="word-break margin-r_8">'+my_trueAttendCode+'</p>';//幸运码,弹出框中的
			   }
			   
			  $("#myAttend_count2").html('本期共参与了<span class="text-danger">'+list_num+'</span>人次');
			  $("#luckyCode").html(luckyCodeStr);

			   
		  }
		  
  });
  
  $("#myModal").modal("toggle"); 
  
}
//jeki -----------------------
goodsNum('#gouwuche_numfont2');//请购物车数量