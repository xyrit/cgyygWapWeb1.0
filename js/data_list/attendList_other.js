/**************Hong**************//////查看他人的参与记录
//从浏览器获取传递过来的参数
var uid_other_liu=GetQueryString("uid");
var nickname=GetQueryString("nickname");//传递用户昵称，查看他人的
nickname=decodeURI(nickname);

var pageIndex=0;
var state=0;
var soso=0;
var glo_pageCount;
var loadFlag=0;//当loadFlag=1时 是加载更多，0的时候 是第一次调用，需要显示正在加载中，函数中则是追加
getAttendList(pageIndex,state);
//var glo_list;//定义弹出幸运码 数据的全局变量
//var glo_attend_count;//某个用户参与总次数
var glo_startCode;
var glo_ready_lotteryCode;//传递全局变量，开奖码与查看参与码接口中的参与码对比，标红参与码中的开奖码
function getAttendList(pageIndex,state){
	$.ajax({  
		type:'post',  
		url:''+urlPost+'/Attend/attendDetail',  
		data:{
		   uid:uid_other_liu,
		   pageIndex:pageIndex,
		   pageSize:10,
		   state:state,
		   soso:soso
		   },  
		cache:false, 
		async:false, 
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
			 
			 var list=data['list'];
			 
			 //glo_list[0].length;
			 glo_list=list;
			 //glo_list.add(list); //赋值给全局变量，弹出幸运码窗口用到
			 
			 
			 
			 var attendStr='';
			 for(i=0;i<list.length;i++){
				 
				 var pid=list[i]['pid'];
				 var title=list[i]['title'];
				 var lottery_id=list[i]['lottery_id'];
				 var attend_count=list[i]['attend_count'];
				 //glo_attend_count=attend_count;
				 var need_count=list[i]['need_count'];
				 var path=host+list[i]['path'];
				 var lottery_code=parseInt(startCode)+parseInt(list[i]['lottery_code']);//中奖号码
				 glo_ready_lotteryCode=lottery_code;

				 var uid_other=list[i]['lp_uid'];//中奖用户ID
				 var uid_other_2=list[i]['uid'];//中奖用户ID
				 var nickname=list[i]['nickname'];
				 var lottery_time=list[i]['lottery_time'];//开奖时间
				 var attend_all=list[i]['attend_all'];//此商品所有的参与次数
				 var time_code=list[i]['time_code'];//参与码
				 var remain_count=list[i]['remain_count'];//
				 var lp_attend_count=list[i]['lp_attend_count'];//获奖者的参与次数
				 //时间戳格式化
				  var timestamp_1 = lottery_time;
				  var newDate_1 = new Date();
				  newDate_1.setTime(timestamp_1 * 1000);
				  var newlottery_time=newDate_1.format('yyyy-MM-dd hh:mm:ss');
				  
				  
				 
				  //进度条
				  if(need_count<1){
					  progress=0;
				   }else{
					  progress=(attend_all/need_count)*100;
					   }
				  var remain=need_count-attend_all;
				  
				  var goods_link=pid+'&'+'lottery_id='+lottery_id;//赋值链接地址
				  var uid_link=uid_other+'&'+'nickname='+escape(nickname);//当未登录或者查看他人的参与或者晒单或者中奖记录时 浏览器传递的参数（昵称需要编码传递）
				  //解析 幸运码-----弹出框  幸运码
				  /*var luckyCodeStr='';
				  for(k=0;k<time_code.length;k++){
					  var lucky_code=time_code[k]['lucky_code'];
					  var code_create_time=time_code[k]['create_time'];
					  
					  //把startCode分离出来，然后以分号连接成一个新数字
					  var my_trueAttendCode='';
					  //var my_trueAttendCode_2='';
					  //alert(lucky_code);
					  var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
					  for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
						//把startCode分离出来，然后以分号连接成一个新数字
						// my_trueAttendCode+=(glo_startcode+Number(s[j]))+'，';
						 my_trueAttendCode+='<span class="display-ib padding-r-8">'+(startCode+Number(s[j]))+'</span>';
					  }
					  my_trueAttendCode=my_trueAttendCode.substring(0,my_trueAttendCode.length-1);//去掉最后一个分号
					  //时间戳格式化
					  //参与时间
					  var  time_attend= code_create_time;
					  var newDate_attend = new Date();
					  newDate_attend.setTime(time_attend * 1000);
					  var my_create_time_attend=newDate_attend.format('yyyy-MM-dd hh:mm:ss');
					  
					  luckyCodeStr+='<p class="text-gray2">'+my_create_time_attend+'</p>';//创建时间
					  luckyCodeStr+='<p class="word-break margin-r_8">'+my_trueAttendCode+'</p>';//幸运码,弹出框中的
					  
				  }*/
				  //弹出框的标题，，参与了多少人次
				 /* var alert_attendCount='TA一共参与了<span class="text-red">'+attend_count+'</span>人次'*/
				  
				  
				 //构建进行和等待中的结构
				 if(state==0||state==1){
					 //如果是进行中和等待揭晓的用此结构
					 attendStr+='<div class="issue_content_publish row margin-l-r-0 winrec_content">';
				 
					 attendStr+='<div class="col-md-4 col-sm-4 col-xs-4 issue_content_publish_1 text-center">';
					 if(state==0){
						 attendStr+='<a href="3_goods-ing.html?pid='+goods_link+'">';
					     attendStr+='<img class="img_publish" src="'+path+'">';            
					     attendStr+='</a>';
					 }else{
						 attendStr+='<a href="8_goods-ing-adving?pid='+goods_link+'">';
					     attendStr+='<img class="img_publish" src="'+path+'">';            
					     attendStr+='</a>'; 
					 }
					    
					          
					 attendStr+='</div>';                 
					 attendStr+='<div class="col-md-8 col-sm-8 col-xs-8 padding-l-0">';              
					 attendStr+='<div class="content_nav">';             
					 attendStr+='<h1 class="content_nav_title fz_15px nomargin">';  
					  
					 if(state==0){
						 attendStr+='<a href="3_goods-ing.html?pid='+goods_link+'">';                   
					     attendStr+='<span class="title_number">'+title+'</span>';                   
					     attendStr+='</a>';
					 }else{
						 attendStr+='<a href="8_goods-ing-adving?pid='+goods_link+'">';                   
					     attendStr+='<span class="title_number">'+title+'</span>';                   
					     attendStr+='</a>';
					 }           
					   
					                  
					 attendStr+='</h1>';                     
					 attendStr+='<div class="progress commpdity-progress">';                         
					 attendStr+='<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress+'%">';                                
					 attendStr+='<span class="sr-only">60% Complete (warning)</span>';                            
					 attendStr+='</div>';                    
					 attendStr+='</div>';                    
					 attendStr+='</div>';                         
					 
					 attendStr+='<div class="com_number row fz_12px">';                               
					 attendStr+='<div class="col-md-4 col-sm-4 col-xs-4 com_number-list1 padding-r-0">';                           
					 attendStr+='<p class="com_number_nb1">'+attend_all+'</p>';                   
					 attendStr+='<p class="">已参与人次</p>';                 
					 attendStr+='</div>';                
					 attendStr+='<div class="col-md-4 col-sm-4 col-xs-4 com_number-list2 text-center padding-r-0 padding-l-0">';                        
					 attendStr+='<p class="">'+need_count+'</p>';                                
					 attendStr+='<p class="">总需人次</p>';                       
					 attendStr+='</div>';    
					 attendStr+='<div class="col-md-4 col-sm-4 col-xs-4 com_number-list3 padding-l-0">';                      
					 attendStr+='<p class="text-red  com_number_nb2">'+remain+'</p>';                                
					 attendStr+='<p class="">剩余人次</p>';                                  
					 attendStr+='</div>';                         
					 attendStr+='</div>';                                
					 attendStr+='<div class="part_rec_number position-re">';       
					 attendStr+='参与人次：<span class="text-red">'+attend_count+'</span>人次';                                
					 //attendStr+='<a href="javascript:;" class="padding-l-r-5" onClick="viewCode($(this));">查看幸运号</a>'; 
					 
				 }
				 
				   
				 
				 if(state==0){
					attendStr+='<button class="btn-xs cg_btn_sm position-ab fz_14px" type="button" onclick="addShopping2('+pid+','+lottery_id+');" style="right:0;bottom:0;">跟买</button>';  
				 }
				 if(state==1){
					 //等待揭晓用此字段
					attendStr+='<span class="text-red">正在揭晓...</span>';  
				 }            
                 
				 if(state==0||state==1){
					//如果是进行中和等待揭晓的用此结构
					attendStr+='<div><a class="text-blue" href="javascript:;" onClick="alertList('+uid_other_2+','+lottery_id+');">查看幸运号</a></div>';
					attendStr+='</div>';      
                    attendStr+='</div>';  
					
					//隐藏弹出框需要的数据和结构开始
					  /*attendStr+='<div id="alert_data" style="display:none">';
					  attendStr+=''+luckyCodeStr+'';
					  attendStr+='</div>';
					  attendStr+='<p class="nomargin" id="alert_title" style="display:none">';
					  attendStr+=''+alert_attendCount+'';
					  attendStr+='</p>';*/
					  //隐藏弹出框需要的数据和结构结束
					                  
                    attendStr+='</div>';
				 }
				 
				 if(state==2){
					  //已经揭晓用此结构 
					  attendStr+='<div class="winrec_content">';
					  attendStr+='<div class="winrec_content_publish row margin-l-r-0">';
					  
                      attendStr+='<div class="col-md-4 col-sm-4 col-xs-4 winrec_content_publish_1 text-center">';
					  
					 // var p = picHostUrl(pic_host,path);//此函数定义在common.js函数中
					 /* if(typeof(uid) == "undefined"||uid!=uid_other){
						  attendStr+='<a href="35-personal-other.html?uid='+uid_link+'">'; 
						  attendStr+='<img src="'+p+'" alt="" class="img_publish">';
						  attendStr+='</a>';
						  
						}else{
							attendStr+='<a href="35-personal.html">'; 
							attendStr+='<img src="'+p+'" alt="" class="img_publish">';
							attendStr+='</a>';
						}  */
					  
					  
                      attendStr+='<a href="6_goods-ing-adv.html?pid='+goods_link+'">';   
                      attendStr+='<img class="img_publish" src="'+path+'">';          
                      attendStr+='</a>';   
					  
					             
                      attendStr+='</div>';   
					     
                      attendStr+='<div class="col-md-8 col-sm-8 col-xs-8">';   
                      attendStr+='<a href="">';   
                      attendStr+='<p class="fz_15px lg_22px pContent">'+title+'</p>';        
                      attendStr+='</a>';  

					  if(typeof(uid) == "undefined"||uid!=uid_other){

						  attendStr+='<p class="lg_22px fz_12px"><span class="text-gray">获得者：</span>';
						  attendStr+='<a href="35-personal-other.html?uid='+uid_link+'">'; 
						  attendStr+='<span class="text-blue">'+nickname+'<span class="text-gray">（共参与'+lp_attend_count+'人次）</span></span>';
						  attendStr+='</a>';
						  attendStr+='</p>';
						  
						}else{

							attendStr+='<p class="lg_22px fz_12px"><span class="text-gray">获得者：</span>';
							attendStr+='<a href="35-personal.html">'; 
							attendStr+='<span class="text-blue">'+nickname+'<span class="text-gray">（共参与'+lp_attend_count+'人次）</span></span>';
							attendStr+='</a>';
							attendStr+='</p>';
						}
					             
                      //attendStr+='<p class="lg_22px">获得者：'+nickname+'</p>';     
					     
                      //attendStr+='<p class="lg_22px">用户ID：'+uid_other+'</p>';

					  //attendStr+='<a href="javascript:;" class="seenumber padding-l-r-5" onClick="viewCode($(this));">查看号码</a>';

					  
                      attendStr+='<p class="lg_22px fz_12px"><span class="text-gray">幸运号码：</span><span class="text-red">'+lottery_code+'</span></p>';
					  attendStr+='<p class="lg_22px text-gray fz_12px">揭晓时间：'+newlottery_time+'</p>';

					 attendStr+='<p class="lg_22px fz_12px" style="display:inline;">本期参与：<span class="text-red">'+attend_count+'</span>人次</p>';
					 attendStr+='<a href="javascript:;" class="seenumber padding-l-r-5 fz_12px text-blue" onClick="alertList('+uid_other+','+lottery_id+');">查看号码</a>';
                      attendStr+='</div>';  
					   
					  //隐藏弹出框需要的数据和结构开始
					  /*attendStr+='<div id="alert_data" style="display:none">';
					  attendStr+=''+luckyCodeStr+'';
					  attendStr+='</div>';
					  
					  attendStr+='<p class="nomargin" id="alert_title" style="display:none">';
					  attendStr+=''+alert_attendCount+'';
					  attendStr+='</p>';*/
					  //隐藏弹出框需要的数据和结构结束
					   
					  attendStr+='</div>';    
                      attendStr+='</div>';         
          
					
				 } 
                                        
                        
				 
		     }
			 
			//填充数据
			//alert(loadFlag_append);
			if(loadFlag_append=1){
				loadFlag_append=0;
				if(list.length<=0){
				  $("#attendList").html('<p class="text-center margin-b-t-10">暂无参与记录</p>');
				  $(".loadingMore").hide();
				}else{
				  $("#attendList").append(attendStr);
				  $(".loadingMore").show();
				  $(".loadingMore").html('点击加载更多');
				  }
			}else{
				
				if(list.length<=0){
				  $("#attendList").html('<p class="text-center margin-b-t-10">暂无参与记录</p>');
				  $(".loadingMore").hide();
				}else{
					
					$("#attendList").html(attendStr);
					$(".loadingMore").show();
					$(".loadingMore").html('加载更多');
					}
			}
			if(pageCount<=1){
				 $(".loadingMore").hide();
			  }else{
				 $(".loadingMore").show();
			  }	
			
			//$("#attendList").html(attendStr); 
			
			$(".loading").hide(); 
			 
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
	getAttendList(pageIndex,state);
	
}

$(".attend_btn").click(function(){
	//清空列表
	$("#attendList").html('');
	$("#luckyCode").html('');
	//重新写入loading动画
	$("#attendList").html('<div class="loading"></div>');
	$(".loading").show();
	loadFlag=0;//打开loading的标志
	var btn_type=$(this).attr("data-type");
	if(btn_type==0){
	  
	  getAttendList(0,0);
	  state=0;	
	  pageIndex=0;
	  $(this).addClass("active").siblings().removeClass("active");
	}else if(btn_type==1){
	  
	  getAttendList(0,1); 
	  state=1;	
	  pageIndex=0;	
	  $(this).addClass("active").siblings().removeClass("active");
	}else{
	  	
	  getAttendList(0,2); 
	  state=2;
	  pageIndex=0;	
	  $(this).addClass("active").siblings().removeClass("active");
	}
});
//弹窗查看幸运码
/*function viewCode(obj){
	
	var alert_data=obj.parent().parent().parent().find("#alert_data").html();
	var alert_title=obj.parent().parent().parent().find("#alert_title").html();
	
	$("#myAttend_count2").html(alert_title);
	$("#luckyCode").html(alert_data);
	$("#myModal").modal("toggle");
	
}*/

function alertList(uid_other_liu,lottery_id){
	//uid_other_liu  lottery_id是函数调用传递过来的  和浏览器传递无关

  $.ajax({  
			type:'post',  
			url:''+urlPost+'/Attend/getAttendInfo',  
			data:{
				uid:uid_other_liu,
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
					  // my_trueAttendCode+=(glo_startcode+Number(s[j]))+'，';
						if(glo_ready_lotteryCode==(glo_startCode+Number(s[j]))){
							my_trueAttendCode+='<span class="display-ib padding-r-8 text-danger">'+(glo_startCode+Number(s[j]))+'</span>';
						}else{
							my_trueAttendCode+='<span class="display-ib padding-r-8">'+(glo_startCode+Number(s[j]))+'</span>';
						}
					   //my_trueAttendCode+='<span class="display-ib padding-r-8">'+(glo_startCode+Number(s[j]))+'</span>';
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
			   
			  $("#myAttend_count2").html('TA一共参与了<span class="text-danger">'+list_num+'</span>人次');
			  $("#luckyCode").html(luckyCodeStr);

			   
		  }
		  
  });
  
  $("#myModal").modal("toggle"); 
  
}
