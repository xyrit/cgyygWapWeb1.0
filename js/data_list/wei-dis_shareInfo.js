/******HONG*****////晒单详情
//获取浏览器地址传递过来的变量参数
//var url='http://192.168.1.206/cgyyg1.0';//临时用
var id = GetQueryString("id");

$.ajax({  
		type:'post',  
		url:''+urlPost+'/Index/ordershareInfo',  
		data:{
		   Did:id,
		   
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
			    tanchuan_0(info,'error','确定');
			 }
			 var host=data['host'];
			 var pic_host=data['pic_host'];
			 var startCode=data['startCode'];
			 var uid_other=data['info']['list'][0]['uid'];
			 var lottery_code=startCode+parseInt(data['info']['list'][0]['lottery_code']);
			 var need_count=data['info']['list'][0]['need_count'];
			 var attend_count=data['info']['list'][0]['attend_count'];
			 var lottery_time=data['info']['list'][0]['lottery_time'];//开奖时间
			 var audit_time=data['info']['list'][0]['audit_time'];//审核时间，这里不需要
			 var lottery_id=data['info']['list'][0]['lottery_id'];
			 var title=data['info']['list'][0]['title'];
			 var description=data['info']['list'][0]['description'];
			 var pics=data['info']['list'][0]['pics'];
			 var apply_time=data['info']['list'][0]['apply_time'];//晒单时间
			 var nickname=data['info']['list'][0]['nickname'];
			 var path=data['info']['list'][0]['path'];
			 var attend_ip=data['info']['list'][0]['attend_ip'];
			 var ip_address=data['info']['list'][0]['ip_address'];
			 var s=pics.split(',');//遍历以逗号相隔的字符串---图片列表
			 var face=data['info']['list'][0]['face'];//用户头像
			 
			 var uid_link=uid_other+'&'+'nickname='+escape(nickname);//当未登录或者查看他人的参与或者晒单或者中奖记录时 浏览器传递的参数（昵称需要编码传递）
			 //时间戳格式化--开奖时间
			  var timestamp_1 = lottery_time;
			  var newDate_1 = new Date();
			  newDate_1.setTime(timestamp_1 * 1000);
			  var newlottery_time=newDate_1.format('yyyy-MM-dd hh:mm:ss');
			 
			 
			 //填充数据
			 var p = picHostUrl(pic_host,face);//此函数定义在common.js函数中
			 if(typeof(uid) == "undefined"||uid!=uid_other){
				
				$("#userImg").html('<a href="35-personal-other.html?uid='+uid_link+'"><img src="'+p+'" alt="" class="userImg img_publish"></a>');
				$("#userName").html('<a href="35-personal-other.html?uid='+uid_link+'" class="text-red">'+nickname+'</a>');
				
			  }else{
				  
				  $("#userImg").html('<a href="35-personal.html"><img src="'+p+'" alt="" class="userImg img_publish"></a>');
				  $("#userName").html('<a href="35-personal.html" class="text-red">'+nickname+'</a>');
			  }
			  
			 //$("#userImg").html('<a href=""><img class="img_publish userImg" src="'+p+'"></a>');
			 
			 
			 $("#userIp").html('('+attend_ip+')');
			 $("#userId").html(uid);
			 $("#lotteryId").html(lottery_id);
			 $("#lotteryCode").html(lottery_code);
			 $("#attendCount").html(attend_count);
			 $("#lotteryTime").html(newlottery_time);
			 $("#dis_title").html(title);
			 $("#dis_time").html(apply_time);
			 $("#dis_content").html(description);
			 //$("#dis_content").html(description);
			 var dis_listStr='';
			 for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I 
				   dis_listStr+='<img src="'+pic_host+s[j]+'">';         
				  }
			 $("#dis_img").html(dis_listStr);
		},error:function(XMLHttpRequest, textStatus, errorThrown) {
			//tanchuan_2(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus); 
			tanchuan_0(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus,'error','确定');
		}
});
