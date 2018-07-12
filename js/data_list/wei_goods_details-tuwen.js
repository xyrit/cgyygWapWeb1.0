//*******Hong****/ /未揭晓详情（进行中）--图文详情
//获取浏览器地址传递过来的变量参数
//var url='http://192.168.1.206/cgyyg1.0';//临时用
var pid = GetQueryString("pid");
var lottery_id = GetQueryString("lottery_id");
 
getGoodsList();
function getGoodsList(){
	$.ajax({  
		type:'post',  
		url:''+urlPost+'/Index/productInfo',  
		data:{
		   pid:pid,
		   lotteryId:lottery_id,
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
			var host=data['host'];
			var content=data['detail']['content'][0]['content'];//商品内容
			//*****填充数据******//
			$("#content").html(content);//图文详情
             //*********填充数据结束***************///             
			
			$(".loading").hide();
		},error:function(XMLHttpRequest, textStatus, errorThrown) {
			//tanchuan_2(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus); 
			tanchuan_0(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus,'error','确定');
		}
	});
}
