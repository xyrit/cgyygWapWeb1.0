/**********Hong*******///发现中的所有晒单列表

//所有晒单分享列表
//var url='http://192.168.1.206/cgyyg1.0';//临时用
var pageIndex=0;
dis_share(pageIndex);
var glo_pageCount;
function dis_share(pageIndex){
	$.ajax({  
		  type:'post',  
		  url:''+urlPost+'/Index/orderShare',  
		  data:{
			 pageIndex:pageIndex,
			 pageSize:10
			 },  
		  cache:false,  
		  dataType:'json', 
		  //timeout:60000, 
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
			  var dis_list=data['data']['list'];
			  var dis_sharecount=data['data']['sharecount']['sharecount'];//一共晒单分享用户的总数
			  var pageCount=data['pageCount'];//页码总数
			  glo_pageCount=pageCount;
			  var dis_listStr='';
			  for(i=0;i<dis_list.length;i++){
				 var audit_time=dis_list[i]['audit_time'];
				  var id=dis_list[i]['id'];
				  var lottery_id=dis_list[i]['lottery_id'];//用户头像,需要判断是否有头像，是否是第三方登录
				  var title=dis_list[i]['title'];
				  var description=dis_list[i]['description'];
				  var pics=dis_list[i]['pics'];//照片
				  var apply_time=dis_list[i]['apply_time'];
				  var uid_other=dis_list[i]['uid'];
				  var nickname=dis_list[i]['nickname'];
				  var path=dis_list[i]['path'];
				  var s=pics.split(',');//遍历以逗号相隔的字符串---图片列表
				  var goods_link=id+'&'+'lottery_id='+lottery_id;//赋值链接地址 
				  var uid_link=uid_other+'&'+'nickname='+escape(nickname);//当未登录或者查看他人的参与或者晒单或者中奖记录时 浏览器传递的参数（昵称需要编码传递）
				  //构建结构
				  dis_listStr+='<li>';
				  dis_listStr+='<div class="clearfix share-content">';            
				  dis_listStr+='<div class="avatar">'; 
				  
				  //判断中奖用户是不是自己并且是否有头像
				var p = picHostUrl(pic_host,path);//此函数定义在common.js函数中
				if(typeof(uid) == "undefined"||uid!=uid_other){
					dis_listStr+='<a href="35-personal-other.html?uid='+uid_link+'">'; 
					dis_listStr+='<img width="35" height="35" src="'+p+'" alt="" class="userImg">';
					dis_listStr+='</a>';
					
				  }else{
					  dis_listStr+='<a href="35-personal.html">'; 
					  dis_listStr+='<img width="35" height="35" src="'+p+'" alt="" class="userImg">';
					  dis_listStr+='</a>';
				  } 
				  
				 // dis_listStr+='<a href="36-persona_ck.html">'; 
				  //dis_listStr+='<img width="35" height="35" src="images/tx.png" alt="">';
				  //dis_listStr+='</a>';  
				          
				  dis_listStr+='</div>';            
				  dis_listStr+='<div class="text position-re">';                 
				  dis_listStr+='<div style="margin-bottom:5px;" class="nickname">';             
				  dis_listStr+='<div class="det_sun_content">';            
				  dis_listStr+='<a href="10_sun_details.html?id='+goods_link+'">';
				  dis_listStr+='<p class="fz_15px lg_22px">'+title+'</p>';             
				  dis_listStr+='</a>';    
				   
				  
					   
				  dis_listStr+='<p class="lg_22px">';   
				  if(typeof(uid) == "undefined"||uid!=uid_other){         
				     dis_listStr+='<a href="35-personal-other.html?uid='+uid_link+'" class="text-red">'+nickname+'</a>';    
				  }else{
					  dis_listStr+='<a href="35-personal.html" class="text-red">'+nickname+'</a>';
					  }
				  dis_listStr+='</p>';   
				  
				                           
				  dis_listStr+='<p class="lg_22px">'+apply_time+'</p>';                     
				  dis_listStr+='<a href="10_sun_details.html?id='+goods_link+'">';                         
				  dis_listStr+='<p class="lg_22px">';                         
				  dis_listStr+=''+description+'';                      
				  dis_listStr+='</p>';                      
				  dis_listStr+='</a>';                     
				  dis_listStr+='</div>';                          
				  dis_listStr+='<div class="sun_share_det">';                              
				  dis_listStr+='<a href="10_sun_details.html?id='+goods_link+'">'; 
				 // for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I 
					   dis_listStr+='<img src="'+pic_host+s[0]+'">';         
				 // }
								
				  //dis_listStr+='<img src="images/sun-1.jpg">';                 
				  dis_listStr+='</a>';                 
				  dis_listStr+='</div>';                    
				  /*dis_listStr+='<div class="share_icon">';                       
				  dis_listStr+='<a class="icon-heart inco1 fz_12px" href="#"><span style="padding-left:0.4em">577人羡慕嫉妒</span></a>';                  dis_listStr+='<a class="icon-comment inco2 fz_12px" href="#"><span style="padding-left:0.4em">29条评论</a>';
				  dis_listStr+='</div>'; */
				  dis_listStr+='</div>';              
				  dis_listStr+='</div>'; 
				  dis_listStr+='</div>';                 
				  dis_listStr+='</li>'; 
			  }
			  
			  if(pageCount<=1){
				 $(".loadingMore").hide();
			  }else{
				 $(".loadingMore").show();
			  }
			  
			   if(dis_list.length<=0){
				$("#dis_share_list").html('<li class="text-center">暂无用户晒单</li>');
				$(".share_det_content").css("border-left","none");
				$("#shareCount").html(0);
				$(".loadingMore").hide();
			 }else{
				 $("#shareCount").html(dis_sharecount);
				 $("#share_det_list").append(dis_listStr);
			 }
			 
			 
			 $(".loading").hide();
               			  
		  },error: function(XMLHttpRequest, textStatus, errorThrown) {
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
	dis_share(pageIndex);
	
}