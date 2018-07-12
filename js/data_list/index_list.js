//*******Hong********//// 首页数据列表
//var url='http://192.168.1.206/cgyyg1.0';//临时用

//var flag_time=1;

index_list();
function index_list(){
	
	$.ajax({  
		type:'post',  
		url:''+urlPost+'/Index/homePage',  
		data:{
			user_token:user
			
			},  
		cache:false,  
		dataType:'json', 
		beforeSend: function(){
			//$(".loading").html("<img src='images/loading.gif'/><br>正在加载中..."); 
			$(".loading").show();
			},
		success:function(data){ 
		     var code=data['code'];
			 var info=data['info'];
			 var host=data['host'];
			 if(code!=200){
				tanchuan_0(info,'error','确定'); 
				
			 }
			 
			 //轮播图
			 var slide=data['slide'];
			 var slideStr='';
			 for(i=0;i<slide.length;i++){
				var slide_url=slide[i]['url'];
				var slide_path=host+slide[i]['path'];
				slideStr+='<li><a href="'+slide_url+'"><img src="'+slide_path+'"/></a></li>';
			 }
			 if(slide.length<=0){
				 $("#slides").html('暂无轮播大图');
				 }else{
					 $("#slides").html(slideStr);
					 }
			 
			 //调用轮播图插件
			 $('.flexslider').flexslider({
				animation: "slide",
				slideshow: true,
				directionNav: false,
				animationLoop: true,
				slideshowSpeed: 3000, 
			  });
			  //轮播图结束
			  //最新揭晓---一共三条数据
			  //获取三个时间，用于倒计时
			   //如果last_attend_time>=hourTime，，就用 waitTime， 如果last_attend_time<hourTime,就用nextWaitTime
			   var nextWaitTime=data['nextWaitTime'];
			   var hourTime=data['hourTime'];
			   var waitTime=data['waitTime'];
			   /*var nextWaitTime=4;
			   var hourTime=1456821739;
			   var waitTime=5;*/
			   var glo_countDownTime;
			   var glo_countDownTime_2;
			   var flagTime_1=0;
			   var flagTime_2=0;
			 
			  var waitProduct=data['waitProduct'];
			  
			 // var user=announced['user'];
			  var new_publishStr='';
			  for(i=0;i<waitProduct.length;i++){
				  var lottery_id=waitProduct[i]['lottery_id'];
				  var pid=waitProduct[i]['pid'];
				  var attend_count=waitProduct[i]['attend_count'];
				  var need_count=waitProduct[i]['need_count'];
				  var attend_limit=waitProduct[i]['attend_limit'];
				  var title=waitProduct[i]['title'];
				  var path=host+waitProduct[i]['path'];//商品图片路径
				  var max_attend_limit=waitProduct[i]['max_attend_limit'];
				  var last_attend_time=waitProduct[i]['last_attend_time'];
				  var goods_link=pid+'&'+'lottery_id='+lottery_id;//赋值链接地址
				  //构建DOM结构
				  new_publishStr+='<div class="col-md-4 col-sm-4 col-xs-4 new-publish-list text-center">';
				  
				  new_publishStr+='<a href="8_goods-ing-adving.html?pid='+goods_link+'">';
				  new_publishStr+='<div class="limit_height">';
				  new_publishStr+='<img src="'+path+'">';
				  new_publishStr+='</div>';
                  new_publishStr+='</a>';
				  
                  //new_publishStr+='</a>';  
				   
                  //new_publishStr+='<p class="fz_12px margin-t-5">恭喜用户';
                  //new_publishStr+='<a href="8_goods-ing-adving.html" class="text-red">'++'</a>获得';   
                  //new_publishStr+='</p>';
				  if(last_attend_time<=hourTime){
						glo_countDownTime=waitTime;
						new_publishStr+='<div class="fz_12px"><em class="cutDowm_em">倒计时：</em><p class="cutDown" id="'+lottery_id+'" data_lottery="'+pid+'"><span class="hour_show_1"></span><span class="no-background text-white" style="width: 20px;">:</span><span class="minute_show_1"></span><span class="no-background text-white" style="width: 20px;">:</span><span class="second_show_1"></span></p></div>'; 
						flagTime_1=1;
						}else{
							glo_countDownTime_2=nextWaitTime;
							new_publishStr+='<div class="fz_12px"><em class="cutDowm_em">倒计时：</em><p class="cutDown" id="'+lottery_id+'" data_lottery="'+pid+'"><span class="hour_show_2"></span><span class="no-background text-white" style="width: 20px;">:</span><span class="minute_show_2"></span><span class="no-background text-white" style="width: 20px;">:</span><span class="second_show_2"></span></p></div>'; 
							 flagTime_2=1;
							} 
				
				  
				  
				  
                  new_publishStr+='</div>';
              
				  
			  }
			  //写入DOM结构
			  if(waitProduct.length<=0){
				  var no_publishStr='';
				  for(i=0;i<3;i++){
					  no_publishStr+='<div class="col-md-4 col-sm-4 col-xs-4 new-publish-list text-center">';
					  no_publishStr+='<img src="images/noList.gif">';
					  no_publishStr+='</div>'; 
				  }
				  
				  $("#new_publish").html(no_publishStr);
				   
				  }else{
					  $("#new_publish").html(new_publishStr);
					  }
			  
			  //最新揭晓结束
			  //最热商品
			  var hotProduct=data['hotProduct'];
			  var hotProductStr='';
			  for(i=0;i<hotProduct.length;i++){
				  var lottery_id=hotProduct[i]['lottery_id'];
				  var pid=hotProduct[i]['pid'];
				  var need_count=hotProduct[i]['need_count'];
				  var attend_count=hotProduct[i]['attend_count'];
				  var attend_limit=hotProduct[i]['attend_limit'];
				  var max_attend_limit=hotProduct[i]['max_attend_limit'];
				  var title=hotProduct[i]['title'];
				  var path=host+hotProduct[i]['path'];
				  //进度条
				  if(need_count<1){
					  progress=0;
				   }else{
					  progress=(attend_count/need_count)*100;
					   }
				  var remain=need_count-attend_count;
				  
				  var goods_link=pid+'&'+'lottery_id='+lottery_id;//赋值链接地址
				  //最热商品列表结构拼接
				  hotProductStr+='<div class="productList_item position-re">';
				  hotProductStr+='<div class="goodsBox">';
				  hotProductStr+='<a href="3_goods-ing.html?pid='+goods_link+'" class="display-b img_a margin-b-5"><img src="'+path+'"></a>';
                       
                  hotProductStr+='<p class="nomargin"><a href="3_goods-ing.html?pid='+goods_link+'" class="display-b pContent">'+title+'</a></p>';          
                  hotProductStr+='<div class="padding-l-r-0 clearfix">';   
                  hotProductStr+='<p class="Surplus nomargin">剩余<span class="text-red">'+remain+'</span>人次</p>';      
                  hotProductStr+='<div class="progress productList-progress indexProgress pull-left">';        
                  hotProductStr+='<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress+'%">';     
				  hotProductStr+='<span class="sr-only">'+progress+'%</span>';   
                  hotProductStr+='</div>';         
                  hotProductStr+='</div>';         
                  hotProductStr+='<div onclick="addShopping('+pid+','+lottery_id+',$(this))" class="car pull-left position-ab" class="car pull-left position-ab" data-trigger="click" data-placement="top" title="加入成功" data-container="body">';             
                  hotProductStr+='<span class="icon-shopping-cart icon-car"></span>';          
                  hotProductStr+='</div>';        
                  hotProductStr+='</div>';   
				       
                  hotProductStr+='</div>';         
                  hotProductStr+='</div>';             
				  
			  }
			  //把建立的结构插入DOM中
			  
			  if(hotProduct.length<=0){
				  $("#productList").html('暂无商品数据');
				  $(".loadingMore").hide();
				  }else{
					  $("#productList").html(hotProductStr);
					  $(".loadingMore").show();
					  }
			  
			  //waitTime倒计时
			  //alert(glo_countDownTime_2);
			 ///////////////////////////////********** 两个倒计时******************////////////
			 
			 var intDiff_1 = parseInt(glo_countDownTime);//倒计时总秒数量
			  function timer_1(intDiff_1){
				  var time_down=setInterval(function(){
				  var day=0,
					  hour=0,
					  minute=0,
					  second=0;//时间默认值		
				  if(intDiff_1 > 0){
					  day = Math.floor(intDiff_1 / (60 * 60 * 24));
					  hour = Math.floor(intDiff_1 / (60 * 60)) - (day * 24);
					  //hour = Math.floor(intDiff / (60 * 60));
					  minute = Math.floor(intDiff_1 / 60) - (day * 24 * 60) - (hour * 60);
					  //minute = Math.floor(intDiff / 60) - (hour * 60);
					  second = Math.floor(intDiff_1) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
					  //second = Math.floor(intDiff)- (hour * 60 * 60) - (minute * 60);
				  }
				  if(hour <= 9) hour= '0' + hour;
				  if (minute <= 9) minute = '0' + minute;
				  if (second <= 9) second = '0' + second;
				$('.hour_show_1').html(hour);
				  $('.minute_show_1').html(minute);
				  $('.second_show_1').html(second);
					 
				
				  intDiff_1--;
				  if(intDiff_1 <-1){
					  
					  clearInterval(time_down); 
					  checkCutTime();
					   
				  }
				   
				  
				  //
				  }, 1000);
				  
			  } 
			   
			   if(waitProduct.length>0 && flagTime_1==1){
				
				timer_1(intDiff_1);//倒计时
						 
			   }  
				
			  var intDiff_2 = parseInt(glo_countDownTime_2);//倒计时总秒数量
			  
			  function timer_2(intDiff_2){
				  var time_down=setInterval(function(){
				  var day=0,
					  hour=0,
					  minute=0,
					  second=0;//时间默认值		
				  if(intDiff_2 > 0){
					  day = Math.floor(intDiff_2 / (60 * 60 * 24));
					  hour = Math.floor(intDiff_2 / (60 * 60)) - (day * 24);
					  //hour = Math.floor(intDiff / (60 * 60));
					  minute = Math.floor(intDiff_2 / 60) - (day * 24 * 60) - (hour * 60);
					  //minute = Math.floor(intDiff / 60) - (hour * 60);
					  second = Math.floor(intDiff_2) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
					  //second = Math.floor(intDiff)- (hour * 60 * 60) - (minute * 60);
				  }
				  if(hour <= 9) hour= '0' + hour;
				  if (minute <= 9) minute = '0' + minute;
				  if (second <= 9) second = '0' + second;
				  //$('#day_show').html(day+"天");
				  $('.hour_show_2').html(hour);
				   $('.minute_show_2').html(minute);
				   $('.second_show_2').html(second);  
				  intDiff_2--;
				  if(intDiff_2 <-1){
					 clearInterval(time_down);
					 checkCutTime();//调用开奖结果
					  
				  }
				  
				  //
				  }, 1000);
				 
				  
			  }  
			  
			   if(waitProduct.length>0 && flagTime_2==1){
				   
				 timer_2(intDiff_2);//倒计时
				 
			   } 
			/*倒计时结束*/ 
			//瀑布流布局
			/*$('#productList').BlocksIt({
				numOfCol: 2,
				offsetX: 8,
				offsetY: 8
			});*/
		
		
		//window resize
		/*var currentWidth = 800;
		$(window).resize(function() {
			var winWidth = $(window).width();
			var conWidth;
			if(winWidth <= 800) {
				conWidth = 350;
				col = 2
			}else {
				conWidth = 360;
				col = 2;
			}
			
			if(conWidth != currentWidth) {
				currentWidth = conWidth;
				$('#productList').width(conWidth);
				$('#productList').BlocksIt({
					numOfCol: col,
					offsetX: 8,
					offsetY: 8
				});
			}
		}); */
		      //当图片过小时居中显示,,页面加载完后才获取图片的尺寸
			  
			 $(window).load(function(){
				 //热门
				 $.each($(".img_a"),function(){
					 
				   var img_a=$(this).height();
				   var img_a_w=$(this).width();
				   var img_a_img=$(this).find("img").height();
				   var img_a_img_w=$(this).find("img").width();
				   
				   if(img_a>img_a_img){
					 
					  var p_img = (img_a-img_a_img)/2; 
					  var p_img_w = (img_a_w-img_a_img_w)/2; 
					  $(this).find("img").css("padding",""+p_img+"px "+p_img_w+"px");
				   }else{
					 
					  var p_img = -((img_a_img-img_a)/2); 
					  var p_img_w = -((img_a_img_w-img_a_w)/2); 
					  $(this).find("img").css("margin",""+p_img+"px "+p_img_w+"px");
				   }
			   
			   });
			   //最新揭晓
			   $.each($(".limit_height"),function(){
					
				   var img_a=$(this).height();
				   var img_a_w=$(this).width();
				   var img_a_img=$(this).find("img").height();
				   var img_a_img_w=$(this).find("img").width();
				   
				   if(img_a>img_a_img){
					 
					  var p_img = (img_a-img_a_img)/2; 
					  var p_img_w = (img_a_w-img_a_img_w)/2; 
					  $(this).find("img").css("padding",""+p_img+"px "+p_img_w+"px");
				   }else{
					 
					  var p_img = -((img_a_img-img_a)/2); 
					  var p_img_w = -((img_a_img_w-img_a_w)/2); 
					  $(this).find("img").css("margin",""+p_img+"px "+p_img_w+"px");
				   }
			   
			   });
			   
			 });
			 ////加入购物车提示
			  
			
			  
			  
			  /*$(document).click(function () {
				  $('.atip').tooltip('hide');
			  })*/
		      
		
			  $(".loading").hide();
		 },error:function(XMLHttpRequest, textStatus, errorThrown) {
			  tanchuan_0(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus,'error','确定'); 
		 }
	 });
}
//setTimeout("tiptext();",2000);

	  


//初始化页码，排序等的变量----点击翻页，排序
var types='hot';
var sort_str='desc';
//page_index最大值为3
var page_index=0;

function getGoodsList(page_index,types,sort_str){
	$.ajax({  
	  type:'post',  
	  url:''+urlPost+'/Index/homegoods',  
	  data:{
		  pageIndex:page_index,
		  pageSize:10,
		  type:types,
		  h_sort:sort_str
		  },  
	  cache:false,  
	  dataType:'json',  
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
		 var host=data['host'];
		 //分类翻页等执行后获得的数据
		 var category=data['category'];
		 var hotProductStr='';
		 for(i=0;i<category.length;i++){
			var lottery_id=category[i]['lottery_id'];
			var pid=category[i]['pid'];
			var need_count=category[i]['need_count'];
			var attend_count=category[i]['attend_count'];
			var attend_limit=category[i]['attend_limit'];
			var max_attend_limit=category[i]['max_attend_limit'];
			var title=category[i]['title'];
			var path=host+category[i]['path'];
			//进度条
			if(need_count<1){
				progress=0;
			 }else{
				progress=(attend_count/need_count)*100;
				 }
			var remain=need_count-attend_count;
			
			var goods_link=pid+'&'+'lottery_id='+lottery_id;//赋值链接地址
			//最热商品列表结构拼接
			hotProductStr+='<div class="productList_item position-re">';
			
			hotProductStr+='<div class="goodsBox">';
			hotProductStr+='<a href="3_goods-ing.html?pid='+goods_link+'" class="display-b img_a margin-b-5"><img src="'+path+'"></a>';
				 
			hotProductStr+='<p class="nomargin"><a href="3_goods-ing.html?pid='+goods_link+'" class="display-b pContent">'+title+'</a></p>';          
			hotProductStr+='<div class="padding-l-r-0 clearfix">';   
			hotProductStr+='<p class="Surplus nomargin">剩余<span class="text-red">'+remain+'</span>人次</p>';     
			 
			hotProductStr+='<div class="progress productList-progress indexProgress pull-left">';        
			hotProductStr+='<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress+'%">';     
			hotProductStr+='<span class="sr-only">'+progress+'% Complete (warning)</span>';       
			hotProductStr+='</div>'; 
			hotProductStr+='</div>'; 
			         
			//hotProductStr+='<div onclick="addShopping('+pid+','+lottery_id+')" class="car pull-left position-ab" data-toggle="tooltip" data-placement="top" title="加入成功">';    
			
			hotProductStr+='<div onclick="addShopping('+pid+','+lottery_id+',$(this))" class="car pull-left position-ab" data-trigger="click" data-placement="top" title="加入成功" data-container="body">';  
			         
			hotProductStr+='<span class="icon-shopping-cart icon-car"></span>';          
			hotProductStr+='</div>';   
			     
			hotProductStr+='</div>';        
			hotProductStr+='</div>';         
			hotProductStr+='</div>'; 
		  }
		  //把建立的结构插入DOM中
		 
		  if(loadFlag==1){
			  loadFlag=0;
			  
			  if(category.length<=0){
			  $("#productList").html('暂无商品数据');
			  }else{
				 
				  $("#productList").append(hotProductStr);
				  }
		  }else{
			 
			  if(category.length<=0){
			  $("#productList").html('暂无商品数据');
			  }else{
				  $(".loading").show();
				  $("#productList").html(hotProductStr);
				  }
		  }	 
		  
		  //瀑布流布局
			/*$('#productList').BlocksIt({
				numOfCol: 2,
				offsetX: 8,
				offsetY: 8
			}); */
			   //当图片过小时居中显示,,页面加载完后才获取图片的尺寸
			 $(window).load(function(){
				 $.each($(".img_a"),function(){
				   var img_a=$(this).height();
				   var img_a_w=$(this).width();
				   var img_a_img=$(this).find("img").height();
				   var img_a_img_w=$(this).find("img").width();
				   
				   if(img_a>img_a_img){
					 
					  var p_img = (img_a-img_a_img)/2; 
					  var p_img_w = (img_a_w-img_a_img_w)/2; 
					  $(this).find("img").css("padding",""+p_img+"px "+p_img_w+"px");
				   }else{
					 
					  var p_img = -((img_a_img-img_a)/2); 
					  var p_img_w = -((img_a_img_w-img_a_w)/2); 
					  $(this).find("img").css("margin",""+p_img+"px "+p_img_w+"px");
				   }
			   
			   });
			 });
		  $(".loading").hide(); 
		  
	  },error:function(XMLHttpRequest, textStatus, errorThrown) {
		  tanchuan_0(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus,'error','确定'); 
	  }
	});
		
}
//点击获取总需人次等的不同类别下的排序按钮，取得它们的值，并赋值给全局变量
//type 排序字段(hot 热度  new 新品  price 总需人次  fast 剩余人次)
$(".orderList_item").click(function(){
	
   $(this).addClass("active").siblings().removeClass("active");	//添加当前样式
   var new_type=$(this).attr("data-type");//分类类型
   var orderList_id=$(this).attr("id");//按钮的ID号码
   types =new_type;//赋值全局变量，分类类型
   //按照总需人次排序
   if(orderList_id=='sort_price'){
	   //如果总需人次的排序是desc，则把它的排序改为asc
		 /*if(sort_str=='desc'){
			getGoodsList(0,types,'desc');
			sort_str='asc';//赋值全局变量
			$("span.icon-angle-up").css("color","#333");	
			$("span.icon-angle-down").css("color","#ff4800");
		 }else{
			 getGoodsList(0,types,'asc');
			 sort_str='desc';//赋值全局变量
			 $("span.icon-angle-down").css("color","#333");
			 $("span.icon-angle-up").css("color","#ff4800");
			 }*/
		 var sort_this=$(this).attr("data-sort");
	     if(sort_this=='desc'){
			getGoodsList(0,types,sort_this);
			$("#sort_price").attr("data-sort","asc");
			
			sort_str=sort_this;//赋值全局变量
			$("span.icon-angle-up").css("color","#333");	
			$("span.icon-angle-down").css("color","#ff4800");
		 }else{
			 getGoodsList(0,types,sort_this);
			 $("#sort_price").attr("data-sort","desc");
			 sort_str=sort_this;//赋值全局变量
			 $("span.icon-angle-down").css("color","#333");
			 $("span.icon-angle-up").css("color","#ff4800");
			 }	 
	   }else{
			 //非总需人次的分类，统一排序为降序
			 getGoodsList(0,types,'desc');
			 $("span.icon-angle-up").css("color","#333");	
			 $("span.icon-angle-down").css("color","#333");
		}
});
//翻页，加载更多---也就是下一页
$(".loadingMore").attr("onClick","loadmoreGoods();");
var loadFlag=0;//当loadFlag=1时 是加载更多，getGoodsList（）函数中则是追加，而不是覆盖
function loadmoreGoods(){ 
    loadFlag=1;
    page_index=page_index+1;
	
	if(page_index>3){
		$(".loadingMore").html('没有更多内容了');
		return;
	}
    getGoodsList(page_index,types,sort_str);
	
}
//检查哪个商品的倒计时走完了
function checkCutTime(){
	
	$(".cutDown").each(function(){
		
		var c= $(this);
		
		var isZero=$(this).children().text();
		var lotteryId=$(this).attr("id");

		//return;
	    if(isZero=='00:00:00'){
			
			$.ajax({  
				  type:'post',  
				  url:''+urlPost+'/Index/Onelottery',  
				  data:{
					  lotteryId:lotteryId,
					  },  
				  cache:false,  
				  dataType:'json', 
				  async:false, 
				  beforeSend: function(){
					   $(".loading").show();
					  },
				  success:function(data){ 
					 var code=data['code'];
					 var info=data['info'];
					 
					 if(code!=200){
						 tanchuan_0(info,'error','确定');
					 }
					 var host=data['host'];
					 var pic_host=data['pic_host'];
					 var userInfo=data['userInfo'];

					 if(typeof(userInfo['uid'])!='undefined'){	 
						 var uid_other=userInfo['uid'];
					     var nickname=userInfo['nickname'];
					     var path=userInfo['path'];
						 var uid_link=uid_other+'&'+'nickname='+escape(nickname);//当未登录或者查看他人的参与或者晒单或者中奖记录时 浏览器传递的参数（昵称需要编码传递）
						 if(typeof(uid) == "undefined"||uid!=uid_other){
					        var new_publishStr='恭喜：<a href="35-personal-other.html?uid='+uid_link+'" class="text-red padding-r-3">'+nickname+'</a>获得';
						 }
						 else{
							var new_publishStr='恭喜：<a href="35-personal.html" class="text-red padding-r-33">'+nickname+'</a>获得';
						 }
						 c.prev().remove();
						 c.html(new_publishStr);
						 
						  var pid_link=c.parent().prev().attr("href");
						  //把已经揭晓的地址赋值进去，组成新的href 
						  var link_str = '6_goods-ing-adv.' + pid_link.split('.')[1];
						  c.parent().prev().attr("href",""+link_str+"");
						  
						   
						 
					 }else{
						 
						 c.html('获取超时');
						
					 }
					
					 
					 
				 },
				  error:function(XMLHttpRequest, textStatus, errorThrown) {
			        tanchuan_0(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus,'error','确定'); 
		         }
						
			});
		
		
		}else{

		}
		
	});
	
}


