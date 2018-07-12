/***********Hong**************/////最新揭晓商品列表
//var url='http://192.168.1.206/cgyyg1.0';//临时用

var pageIndex=0;
new_listPublish(pageIndex);

//var endtime;//每一页的最后一条数据的参与时间
var glo_pageCount;
var loadFlag=0;//当loadFlag=1时 是加载更多，0的时候 是第一次调用，需要显示正在加载中，函数中则是追加
function new_listPublish(pageIndex,endtime){
	
	$.ajax({  
		type:'post',  
		url:''+urlPost+'/Index/newAnnounced',  
		data:{
			pageIndex:pageIndex,
			pageSize:20,
			endtime:endtime,
			},  
		cache:false,  
		dataType:'json', 
		beforeSend: function(){
			if(loadFlag==0){
				$(".loading").show();
				}
			},
		success:function(data){ 
		     var code=data['code'];
			 var info=data['info'];
			 if(code!=200){
				tanchuan_0(info,'error','确定'); 
				
			 }
			 
			 var host=data['host'];
			 var pic_host=data['pic_host'];
			 var startCode=data['startCode'];
			 var pageCount=data['pageCount'];//页码总数
			 glo_pageCount=pageCount;
			 var list=data['list'];
			 var new_list='';
			 if(list.length>0){
				var last_lottery_time=list[list.length-1]['lottery_time'];
			    window.sessionStorage.endtime  = last_lottery_time;//每一页的最后一条数据的参与时间 
			 }
			 
			 
			// alert(endtime);
			 //console.log(last_lottery_time);
			 for(i=0;i<list.length;i++){
				 var lottery_code=parseInt(startCode)+parseInt(list[i]['lottery_code']);
				 
				 var lottery_id=list[i]['lottery_id'];
				 var pid=list[i]['pid'];
				 var need_count=list[i]['need_count'];
				 var attend_count=list[i]['attend_count'];
				 var attend_limit=list[i]['attend_limit'];
				 var max_attend_limit=list[i]['max_attend_limit'];
				 var title=list[i]['title'];
				 var path=host+list[i]['path'];
				 var nickname=list[i]['nickname'];
				 var uid_other=list[i]['uid'];
				 var upath=list[i]['upath'];
				 var lottery_time=list[i]['lottery_time'];
				 var goods_link=pid+'&'+'lottery_id='+lottery_id;//赋值链接地址
				 var uid_link=uid_other+'&'+'nickname='+escape(nickname);//当未登录或者查看他人的参与或者晒单或者中奖记录时 浏览器传递的参数（昵称需要编码传递）
				 //时间戳格式化
				  var timestamp_1 = lottery_time;
				  var newDate_1 = new Date();
				  newDate_1.setTime(timestamp_1 * 1000);
				  var newlottery_time=newDate_1.format('yyyy-MM-dd hh:mm:ss');
				 //构建结构
				 new_list+='<div class="news-productlist1 productList_item">';
				 new_list+='<div class="clearfix padding-l-r-5" style="width:100%">';
				 new_list+='<a href="6_goods-ing-adv.html?pid='+goods_link+'" class="display-b img_a margin-b-5"><img src="'+path+'" alt=""></a>';
                 new_list+='<p class="fz_15px pContent lg_22px"><a href="6_goods-ing-adv.html?pid='+goods_link+'">'+title+'</a></p>';
                 new_list+='<p class="lg_22px">获奖者：';
				 if(typeof(uid) == "undefined"||uid!=uid_other){         
				     new_list+='<a href="35-personal-other.html?uid='+uid_link+'" class="text-red">'+nickname+'</a>';    
				  }else{
					  new_list+='<a href="35-personal.html" class="text-red">'+nickname+'</a>';
					  }
				 
                 new_list+='</p>';   
                 new_list+='<p class="lg_22px">本期参与：<span class="text-red">'+attend_count+'</span>人次</p>';         
                 new_list+='<p class="lg_22px">获奖幸运码：<span class="text-red">'+lottery_code+'</span></p>';       
                 new_list+='<p class="lg_22px">揭晓时间：'+newlottery_time+'</p>';    
				 new_list+='</div>';    
                 new_list+='</div>';   
				 
		     }
			 //填充数据
			 if(pageCount<=1){
				 $(".loadingMore").hide();
			  }else{
				 $(".loadingMore").show();
			  }
			 if(list.length<=0){
				$("#new_list").html('<li class="text-center">暂无商品</li>');
				
				$(".loadingMore").hide();
			 }else{
				 $("#new_list").append(new_list);
				 
			 }
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
//翻页，加载更多---也就是下一页
$(".loadingMore").attr("onClick","loadmoreGoods();");

function loadmoreGoods(){ 
    
    loadFlag=1;
    pageIndex=pageIndex+1;
	
	if(glo_pageCount-1<pageIndex){
		$(".loadingMore").html('没有更多内容了');
		return;
	}
	var endtime = window.sessionStorage.endtime;//总时间
	new_listPublish(pageIndex,endtime);
	
}