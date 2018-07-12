/**********Hong**************///////////////查看他人的晒单列表
//从浏览器获取传递过来的参数
var uid_other=GetQueryString("uid");
var nickname=GetQueryString("nickname");//传递用户昵称，查看他人的
nickname=decodeURI(nickname);

var pageIndex=0;
var soso=0;
var loadFlag=0;//当loadFlag=1时 是加载更多，0的时候 是第一次调用，需要显示正在加载中，函数中则是追加
getdisList(pageIndex);
function getdisList(pageIndex){
	$.ajax({  
		type:'post',  
		url:''+urlPost+'/Display/orderRecord',  
		data:{
		   uid:uid_other,
		   pageIndex:pageIndex,
		   pageSize:10,
		   state:1,//1为已经晒单
		   soso:soso
		   },  
		cache:false,  
		dataType:'json',
		timeout:60000,
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
			 glo_startCode=startCode;
			 var pageCount=data['pageCount'];//页码总数
			 glo_pageCount=pageCount;
			 
			 var dis_list=data['list'];
			 var dis_listStr='';
			 for(i=0;i<dis_list.length;i++){
				 var id=dis_list[i]['id'];//晒单ID
				 var product=dis_list[i]['product'];//商品标题
				 var face=dis_list[i]['face'];//用户头像
				 var path=dis_list[i]['path'];//晒单的图片
				 var create_time=dis_list[i]['create_time'];//
				 var title=dis_list[i]['title'];//晒单标题
				 var description=dis_list[i]['description'];//晒单内容
				 var score=dis_list[i]['score'];//奖励积分
				 var uid_other=dis_list[i]['uid'];//
				 var nickname=dis_list[i]['nickname'];//
				 var status=dis_list[i]['status'];//
				 var lottery_id=dis_list[i]['lottery_id'];//
				 var pid=dis_list[i]['pid'];//
				 var goods_link=id+'&'+'lottery_id='+lottery_id;//赋值链接地址查看晒单详情，只用到ID 期号用不到
				 var uid_link=uid_other+'&'+'nickname='+escape(nickname);//当未登录或者查看他人的参与或者晒单或者中奖记录时 浏览器传递的参数（昵称需要编码传递）
				 //时间戳格式化
				  var timestamp_1 = create_time;
				  var newDate_1 = new Date();
				  newDate_1.setTime(timestamp_1 * 1000);
				  var newlottery_time=newDate_1.format('yyyy-MM-dd hh:mm:ss');
				 
				 //构建结构
				  dis_listStr+='<li>';
				  dis_listStr+='<div class="clearfix share-content">';            
				  dis_listStr+='<div class="avatar">'; 
				  
				  //判断中奖用户是不是自己并且是否有头像
				  var p = picHostUrl(pic_host,face);//此函数定义在common.js函数中
				  if(typeof(uid) == "undefined"||uid!=uid_other){
					  dis_listStr+='<a href="35-personal-other.html?uid='+uid_link+'">'; 
				      dis_listStr+='<img width="35" height="35" src="'+p+'" alt="" class="userImg">';
                      dis_listStr+='</a>';
					  
					}else{
						dis_listStr+='<a href="35-personal.html">'; 
				        dis_listStr+='<img width="35" height="35" src="'+p+'" alt="" class="userImg">';
                        dis_listStr+='</a>';
					} 
				  
                  dis_listStr+='</div>';            
                  dis_listStr+='<div class="text position-re">';                 
                  dis_listStr+='<div style="margin-bottom:5px;" class="nickname">';             
                  dis_listStr+='<div class="det_sun_content">';            
                  dis_listStr+='<a href="10_sun_details.html?id='+goods_link+'">';          
                  dis_listStr+='<p class="fz_15px lg_22px">'+title+'</p>';             
                  dis_listStr+='</a>';  
				  
				 //点击昵称跳转到相应的个人中心页面
				  if(typeof(uid) == "undefined"||uid!=uid_other){
					  dis_listStr+='<a href="35-personal-other.html?uid='+uid_link+'">';            
                      dis_listStr+='<p class="text-skyblue lg_22px">'+nickname+'</p>';                     
                      dis_listStr+='</a>';
					  
					}else{
						
						dis_listStr+='<a href="35-personal.html">';            
                        dis_listStr+='<p class="text-skyblue lg_22px">'+nickname+'</p>';                     
                        dis_listStr+='</a>';
					}  
					 
				    
				                            
                  dis_listStr+='<p class="lg_22px">'+newlottery_time+'</p>';                     
                  dis_listStr+='<a href="10_sun_details.html?id='+goods_link+'">';                         
                  dis_listStr+='<p class="lg_22px">';                         
                  dis_listStr+=''+description+'';                      
                  dis_listStr+='</p>';                      
                  dis_listStr+='</a>';                     
                  dis_listStr+='</div>';                          
                  dis_listStr+='<div class="sun_share_det">';                              
                  dis_listStr+='<a href="10_sun_details.html?id='+goods_link+'">'; 
				  //for(var j = 0;j<path.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
				       //var path_img=path[j];
				      // dis_listStr+='<img src="'+pic_host+path_img+'">';
					   dis_listStr+='<img src="'+pic_host+path[0]+'">';
				 // }
                                
                              
                  dis_listStr+='</a>';                 
                  dis_listStr+='</div>';                    
                     
				  dis_listStr+='</div>';
				  dis_listStr+='</div>';
				  dis_listStr+='</div>';
				  dis_listStr+='</li>';
			 }
			 
			 if(loadFlag_append=1){
				loadFlag_append=0;
				if(dis_list.length<=0){
				  $("#dis_list").html('<li class="text-center">暂无晒单</li>');
				  $(".share_det_content").css("border-left","none");
				  $(".loadingMore").hide();
				}else{
				  $("#dis_list").append(dis_listStr);
				  $(".loadingMore").show();
				  $(".loadingMore").html('点击加载更多');
				  }
			}else{
				
				if(dis_list.length<=0){
				  $("#dis_list").html('<li class="text-center">暂无晒单</li>');
				  $(".share_det_content").css("border-left","none");
				  $(".loadingMore").hide();
				}else{
					
					$("#dis_list").html(dis_listStr);
					$(".loadingMore").show();
					$(".loadingMore").html('点击加载更多');
					}
			}
			 if(pageCount<=1){
				 $(".loadingMore").hide();
			  }else{
				 $(".loadingMore").show();
			  }
			 
		},error:function(XMLHttpRequest, textStatus, errorThrown) {
			//tanchuan_2(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus); 
			tanchuan_0(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus,'error','确定');
		}
	});
}
//翻页，加载更多---也就是下一页
$(".loadingMore").attr("onClick","loadmoreGoods();");
var loadFlag_append=0;
function loadmoreGoods(){ 
    loadFlag=1;
	loadFlag_append=1;
    pageIndex=pageIndex+1;
	
	if(glo_pageCount-1<pageIndex){
		$(".loadingMore").html('没有更多内容了');
		return;
	}
	getdisList(pageIndex);
	
}