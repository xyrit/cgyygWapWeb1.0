/**********Hong***********////查看他人中奖记录
//从浏览器获取传递过来的参数
var uid_other=GetQueryString("uid");
var nickname=GetQueryString("nickname");//传递用户昵称，查看他人的
nickname=decodeURI(nickname);

var pageIndex=0;
var state=1;
var soso=0;
var glo_pageCount;
var loadFlag=0;//当loadFlag=1时 是加载更多，0的时候 是第一次调用，需要显示正在加载中，函数中则是追加
getLotteryList(pageIndex,state);
var glo_list;//定义弹出幸运码 数据的全局变量
var glo_attend_count;//某个用户参与总次数
var glo_startCode;

function getLotteryList(pageIndex,state){
	$.ajax({  
		type:'post',  
		url:''+urlPost+'/UcenterLottery/lotteryRecord',  
		data:{
		   uid:uid_other,
		   pageIndex:pageIndex,
		   pageSize:10,
		   state:state,//0 为虚拟商品,1为实物商品
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
			 
			 var list=data['list'];
			 
			 //glo_list[0].length;
			 glo_list=list;
			 //glo_list.add(list); //赋值给全局变量，弹出幸运码窗口用到
			 var lotteryStr='';
			 for(i=0;i<list.length;i++){
				 
				 var pid=list[i]['pid'];
				 var title=list[i]['title'];
				 var lottery_id=list[i]['lottery_id'];
				 var attend_count=list[i]['attend_count'];
				 glo_attend_count=attend_count;
				 var need_count=list[i]['need_count'];
				 var path=host+list[i]['path'];
				 var lottery_code=parseInt(startCode)+parseInt(list[i]['lottery_code']);//中奖号码
				// var uid_other=list[i]['uid'];
				// var nickname=list[i]['nickname'];
				 //var lottery_time=list[i]['lottery_time'];//开奖时间
				// var attend_all=list[i]['attend_all'];//此商品所有的参与次数
				// var time_code=list[i]['time_code'];//参与码
				// var remain_count=list[i]['remain_count'];//
				 
			     var apply_time=list[i]['apply_time'];//揭晓时间
				 var attend_time=list[i]['attend_time'];
				 
				 var goods_link=pid+'&'+'lottery_id='+lottery_id;//赋值链接地址
				 
				 lotteryStr+='<div class="winrec_content">';
				 lotteryStr+='<div class="winrec_content_publish row margin-l-r-0">';
				 lotteryStr+='<div class="col-md-4 col-sm-4 col-xs-4 winrec_content_publish_1 text-center">';
                 lotteryStr+='<a href="6_goods-ing-adv.html?pid='+goods_link+'">';   
                 lotteryStr+='<img class="img_publish" src="'+path+'">';          
                 lotteryStr+='</a>';              
                 lotteryStr+='</div>';                  
                 lotteryStr+='<div class="col-md-8 col-sm-8 col-xs-8">';             
                 lotteryStr+='<a href="6_goods-ing-adv.html?pid='+goods_link+'">';            
                 lotteryStr+='<p class="fz_15px lg_22px pContent">'+title+'</p>';          
                 lotteryStr+='</a>';               
                 lotteryStr+='<p class="lg_22px">总需参与：'+need_count+'人次</p>';                   
                 lotteryStr+='<p class="lg_22px">本期参与：'+attend_count+'人次</p>';               
                 lotteryStr+='<p class="lg_22px">获奖幸运码：<span class="text-red">'+lottery_code+'</span></p>';               
                 lotteryStr+='<p class="lg_22px">揭晓时间：'+apply_time+'</p>';                     
                 lotteryStr+='</div>';               
                 lotteryStr+='</div>';               
                 lotteryStr+='</div>';              
                        
				 
		     }
			 
			//填充数据
			//alert(loadFlag_append);
			if(loadFlag_append=1){
				loadFlag_append=0;
				if(list.length<=0){
				  $("#lotteryList").html('<p class="text-center margin-b-t-10">暂无中奖记录</p>');
				  $(".loadingMore").hide();
				}else{
				  $("#lotteryList").append(lotteryStr);
				  $(".loadingMore").show();
					$(".loadingMore").html('点击加载更多');
				  }
			}else{
				
				if(list.length<=0){
				  $("#lotteryList").html('<p class="text-center margin-b-t-10">暂无中奖记录</p>');
				  $(".loadingMore").hide();
				}else{
					
					$("#lotteryList").html(lotteryStr);
					$(".loadingMore").show();
					$(".loadingMore").html('点击加载更多');
					}
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
	getLotteryList(pageIndex,state);
	
}

$(".attend_btn").click(function(){
	//清空列表
	$("#lotteryList").html('');
	//重新写入loading动画
	$("#lotteryList").html('<div class="loading"></div>');
	$(".loading").show();
	loadFlag=0;//打开loading的标志
	var btn_type=$(this).attr("data-type");
	if(btn_type==0){
	  getLotteryList(0,0);
	  state=0;	
	  pageIndex=0;
	  $(this).addClass("active").siblings().removeClass("active");
	}else{
	  getLotteryList(0,1); 
	  state=1;
	  pageIndex=0;	
	  $(this).addClass("active").siblings().removeClass("active");
	}
});
//弹窗查看幸运码
/*function viewCode(i){
	
	var codeStr='';
	//在此循环参与记录的全局变量 循环幸运码和时间出来
  
	var luckyCodeStr='';
	for(k=0;k<glo_list[i]['time_code'].length;k++){
		var lucky_code=glo_list[i]['time_code'][k]['lucky_code'];
		var code_create_time=glo_list[i]['time_code'][k]['create_time'];
		var attend_count=glo_list[i]['attend_count'];
		
		//把startCode分离出来，然后以分号连接成一个新数字
		var my_trueAttendCode='';
		var my_trueAttendCode_2='';
		var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
		for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
		  //把startCode分离出来，然后以分号连接成一个新数字
		  // my_trueAttendCode+=(glo_startcode+Number(s[j]))+'，';
		   my_trueAttendCode+='<span class="display-ib padding-r-8">'+(glo_startCode+Number(s[j]))+'</span>';
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
		
	}
	$("#myModal").modal("toggle");
	$("#myAttend_count2").html('TA一共参与了<span class="text-red">'+glo_attend_count+'</span>人次');
	$("#luckyCode").html(luckyCodeStr);
	
}*/