/************Hong***************///已经揭晓和等待揭晓中的查看计算结果规则
//获取浏览器地址传递过来的变量参数
//var url='http://192.168.1.206/cgyyg1.0';//临时用

var lastAttendTime = GetQueryString("lastAttendTime");//截止用户最后参与时间

$.ajax({  
		type:'post',  
		url:''+urlPost+'/Index/wapCountList',  
		data:{
		   lastAttendTime:lastAttendTime,
		   //data:'ss'
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
			
			var countList=data['countList'];
			var countListStr='';
			for(i=0;i<countList.length;i++){
				var lottery_id=countList[i]['lottery_id'];
				var pid=countList[i]['pid'];
				var uid=countList[i]['uid'];
				var attend_count=countList[i]['attend_count'];
				var create_time=countList[i]['create_time'];
				var create_date_time=countList[i]['create_date_time'];
				var sfm_time=countList[i]['sfm_time'];
				var title=countList[i]['title'];
				var nickname=countList[i]['nickname'];
				countListStr+='<tr>';
				countListStr+='<td>'+create_date_time+'<span class="text-red"> → '+sfm_time+'</span></td>';
                countListStr+='<td>'+nickname+'</td>';                  
                countListStr+='</tr>';                  
                               
				
			}
			$("#result_list").html(countListStr);
			//取本地存储中的总时间
			var total_time = window.sessionStorage.total_time;//总时间
			var last_attend_date_time = window.sessionStorage.last_attend_date_time;//用户截止参与时间
			var hour_lottery = window.sessionStorage.hour_lottery;//时时彩中奖号码
			var hour_lottery_id = window.sessionStorage.hour_lottery_id//时时彩期号
			var lottery_code = window.sessionStorage.lottery_code;//橙果中奖号码
			
			$("#totalTime").html(total_time);
			$("#last_attendTime").html(last_attend_date_time);
			
			
			
			
			if(hour_lottery=='0'){
				$("#hour_code").html('?');
				$("#hour_code").nextAll().remove();
				$("#lottery_code").html('?');
			}else{
				$("#hour_code").html(hour_lottery);
				$("#hour_lottery").html(hour_lottery_id);
				$("#lottery_code").html(lottery_code);
			}
			
		},error:function(XMLHttpRequest, textStatus, errorThrown) {
			 tanchuan_0(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus,'error','确定'); 
		}
});