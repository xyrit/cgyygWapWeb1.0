/****Hong******/  //往期揭晓记录
//获取浏览器地址传递过来的变量参数

var pid = GetQueryString("pid");


var page_index=0;
getBeforePublishList();
function getBeforePublishList(){
	$.ajax({  
		type:'get',
		url:'' + urlPost + '/Ipad/getListforPast',
		data:{
		   pid:pid,

		   },  
		cache:false,
		async:false,
		dataType:'json', 
		//timeout:60000, 
		beforeSend: function(){
			 //$(".loading").html("<img src='images/loading.gif'/><br>正在加载中...");  
			 $(".loading").show();
			},
		success:function(data){
			var code=data['code'];
		    var items=data['items'];

			var prizeListStr='';
			for(i=0;i<items.length;i++){
				var pid=items[i]['pid'];
				var lottery_id=items[i]['lottery_id'];
				var lucky_code=items[i]['lucky_code'];
				var lottery_time=items[i]['lottery_time'];
				var uid_other=items[i]['uid'];
				var attend_count=items[i]['attend_count'];
				var attend_ip=items[i]['attend_ip'];
				var ip_address=items[i]['ip_address'];
				var nickname=items[i]['nickname'];
				var face=items[i]['face'];
				var uid_link=uid_other+'&'+'nickname='+escape(nickname);//当未登录或者查看他人的参与或者晒单或者中奖记录时 浏览器传递的参数（昵称需要编码传递）
				//揭晓时间
				var timestamp_3 = lottery_time;
				var newDate_3 = new Date();
				newDate_3.setTime(timestamp_3 * 1000);
				var newLottery_time_3=newDate_3.format('yyyy-MM-dd hh:mm:ss');

				prizeListStr+='<div class="issue_content">';

				if(lottery_id==1)
				{    prizeListStr+='<a href="special_maShang_already.html?lottery_id='+lottery_id+'">';
					 prizeListStr+='<div class="issue_content_nav position-re padding-l-r-1">第一期';
					 prizeListStr+='<span class="icon-angle-right position-ab icon-right padding-l-r-1"></span>';
					 prizeListStr+='</div>';
					 prizeListStr+='</a>';
				}
				else if(lottery_id==2)
				{

					prizeListStr+='<a href="special_maShang_already.html?lottery_id='+lottery_id+'">';
					prizeListStr+='<div class="issue_content_nav position-re padding-l-r-1">第二期';
					prizeListStr+='<span class="icon-angle-right position-ab icon-right padding-l-r-1"></span>';
					prizeListStr+='</div>';
					prizeListStr+='</a>';
				}
				else if(lottery_id==3)
				{
					prizeListStr+='<a href="special_maShang_already.html?lottery_id='+lottery_id+'">';
					prizeListStr+='<div class="issue_content_nav position-re padding-l-r-1">第三期';
					prizeListStr+='<span class="icon-angle-right position-ab icon-right padding-l-r-1"></span>';
					prizeListStr+='</div>';
					prizeListStr+='</a>';
				}
				else if(lottery_id==4)
				{
					prizeListStr+='<a href="special_maShang_already.html?lottery_id='+lottery_id+'">';
					prizeListStr+='<div class="issue_content_nav position-re padding-l-r-1">第四期';
					prizeListStr+='<span class="icon-angle-right position-ab icon-right padding-l-r-1"></span>';
					prizeListStr+='</div>';
					prizeListStr+='</a>';
				}

				prizeListStr+='<div class="issue_content_publish row margin-l-r-0 flex_content">';
				prizeListStr+='<div class="col-md-3 col-sm-3 col-xs-3 issue_content_publish_1 text-center">';

				//prizeListStr+='<a href="javascript:;">';

				if(face==''){
					if(typeof(uid) == "undefined"||uid!=uid_other)
					{
						prizeListStr+='<a href="35-personal-other.html?uid='+uid_link+'"><img src="images/default1.png" alt="" class="userImg" style="width:100%"></a>';
					}else{
						prizeListStr+='<a href="35-personal.html"><img src="images/default1.png" alt="" class="userImg" style="width:100%"></a>';
					}

				}
				else{
					if(typeof(uid) == "undefined"||uid!=uid_other)
					{
						prizeListStr+='<a href="35-personal-other.html?uid='+uid_link+'"><img src="'+face+'" alt="" class="userImg" style="width:100%"></a>';
					}else{
						prizeListStr+='<a href="35-personal.html"><img src="'+face+'" alt="" class="userImg" style="width:100%"></a>';
					}

				}
				//prizeListStr+='</a>';

				prizeListStr+='</div>';
				prizeListStr+='<div class="col-md-9 col-sm-9 col-xs-9 padding-l-0">';
				//prizeListStr+='<h3 class="lg_22px fz_15px">'+0+'</h3>';

				prizeListStr+='<p class="lg_22px">获奖者：';

				if(typeof(uid) == "undefined"||uid!=uid_other)
				{
					prizeListStr+='<a href="35-personal-other.html?uid='+uid_link+'"><span class="text-red">'+nickname+'</span><span class="text-gray">（'+ip_address+'）</span></a>';
				}
				else
				{
					prizeListStr+='<a href="35-personal.html"><span class="text-red">'+nickname+'</span><span class="text-gray">（'+ip_address+'）</span></a>';
				}

				prizeListStr+='</p>';
				prizeListStr+='<p class="lg_22px">用户ID：'+uid_other+'<span class="text-gray">（唯一不变标识）</span></p>';
				prizeListStr+='<p class="lg_22px lottery_span">获奖幸运码：<span class="text-red">'+lucky_code+'</span></p>';
				prizeListStr+='<p class="lg_22px">本期参与：<span class="text-red">'+attend_count+'</span>人次</p>';
				prizeListStr+='<p class="lg_22px">揭晓时间：'+newLottery_time_3+'</p>';
				prizeListStr+='</div>';
				prizeListStr+='</div>';
				prizeListStr+='</div>';


			}


			//*****填充数据******//
			if(items.length<=0){
				 $("#beforePublishList").html('<p class="text-center">暂无数据</p>');
				}else{
					$("#beforePublishList").html(prizeListStr);
				}

             //*********填充数据结束***************///             
			$(".loading").hide();
			
		},error:function(XMLHttpRequest, textStatus, errorThrown) {

			tanchuan_0(XMLHttpRequest.status+'--'+XMLHttpRequest.readyState+'--'+textStatus,'error','确定');
		}
	});
}