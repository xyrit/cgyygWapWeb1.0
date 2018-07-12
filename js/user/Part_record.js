var goodslist;//全局变量

var goodslist1;//全局变量 待揭晓

var goodslist2;//全局变量 已结揭晓

var glo_startCode;//幸运码前缀

var glo_pageNum0;//进行中总页码
var glo_pageNum1;//待揭晓总页码
var glo_pageNum2;//已揭晓总页码
var pageSize = 10;
var isFirst0 = true;
var isFirst1 = true;
var isFirst2 = true;
function canyujilu(pege,zhauntai){
	if(isFirst0){
	$.ajax({
		type:"post",
		url:urlPost+"/Attend/attendDetail",
		data:{
			user_token:user,
			pageSize:pageSize,
			pageIndex:pege,
			state:0,
			soso:0,
		},
		dataType:'json',
		success:function(data){
			var list = data['list'];//参与记录数组
			var host = data['host'];//图片地址前缀
			goodslist=list;//赋值给全局变量
			var numFont		 = data['pageCount'];//页码总数
			glo_pageNum0	 =numFont;//赋值全局页码
			glo_startCode=data['startCode'];//幸运码前缀
			var canyuList='';
			var baifenbi = 0;
			if(numFont<=1){
				$('#loadingadd0').hide();
			}
			if(list==''){
				$('#canyujil_0').append('<p style="text-align: center;line-height:50px;">您暂时没有内容哦！</p>');
				$('#loadingadd0').hide();
				return false;
			}
			for (var i=0;i<list.length;i++) {
				var title 		 = data['list'][i]['title'];//商品名称
				var path 		 = data['list'][i]['path'];//商品图片
				var need_count   = data['list'][i]['need_count'];//总需人数
				var attend_count = data['list'][i]['attend_count'];//个人参与人数
				var attend_all 	 = data['list'][i]['attend_all'];//总参与人数
				var remain_count = data['list'][i]['remain_count'];//剩余人次
				var attend_all	 = data['list'][i]['attend_all'];
				var pid			 = data['list'][i]['pid'];//商品id
				var lottery_id	 = data['list'][i]['lottery_id'];//商品期号
				
				if(need_count<1){
					  baifenbi=0;
				   }else{
					  baifenbi=(attend_all/need_count)*100;
				}

				canyuList+='<div class="part_rec_content">';
				canyuList+='<div class="issue_content_publish row margin-l-r-0">';
				canyuList+='<div class="col-md-4 col-sm-4 col-xs-4 issue_content_publish_1 text-center">';
				canyuList+='<a href="3_goods-ing.html?pid='+pid+'&lottery_id='+lottery_id+'" style="display:block;margin-top:15px;">';
				canyuList+='<img class="img_publish" src="'+host+''+path+'">';
				canyuList+='</a>';
				canyuList+='</div>';
				canyuList+='<div class="col-md-8 col-sm-8 col-xs-8 padding-l-0">';
				canyuList+='<div class="content_nav">';
				canyuList+='<h1 class="content_nav_title fz_15px">';
				canyuList+='<a href="3_goods-ing.html?pid='+pid+'&lottery_id='+lottery_id+'">';
				canyuList+='<span class="title_number">'+title+'</span>';
				canyuList+='</a>';
				canyuList+='</h1>';
				canyuList+='<div class="progress commpdity-progress" >';
				canyuList+='<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: '+baifenbi+'%">';
				canyuList+='<span class="sr-only">90% Complete (warning)</span>';
				canyuList+='</div></div></div>';
				canyuList+='<div class="com_number row fz_12px">';
				canyuList+='<div class="col-md-4 col-sm-4 col-xs-4 com_number-list1 padding-r-0">';
				canyuList+='<p class="com_number_nb1">'+attend_all+'</p>';
				canyuList+='<p class="">已参与人次</p>';
				canyuList+='</div>';
				canyuList+='<div class="col-md-4 col-sm-4 col-xs-4 com_number-list2 text-center padding-r-0 padding-l-">';
				canyuList+='<p class="">'+need_count+'</p>';
				canyuList+='<p class="">总需人次</p></div>';
				canyuList+='<div class="col-md-4 col-sm-4 col-xs-4 com_number-list3 padding-l-0">';
				canyuList+='<p class="text-red  com_number_nb2">'+remain_count+'</p>';
				canyuList+='<p class="">剩余人次</p></div></div>';
				canyuList+='<div class="part_rec_number position-re">您参与：<span class="text-red">'+attend_count+'</span>';
				canyuList+='&nbsp;人次&nbsp;&nbsp;';
				
				canyuList+='<button class="btn btn-xs position-ab fz_14px cg_btn_sm" type="button" onclick="addShopping3('+pid+','+lottery_id+');" style="right:0;bottom:0;">立即参与</button>';
				canyuList+='<div><a class="text-blue" href="javascript:clickxinyun('+lottery_id+');" class="">查看幸运号</a></div>';
				canyuList+='</div>';
				
				canyuList+='</div>';
				canyuList+='</div>';
				canyuList+='</div>';
				
			}
			$('#canyujil_0').append(canyuList);

		}
	});
	isFirst0=false;
	}
}

var m=0;
canyujilu(m,0);//调用进行中 获取列表函数

//加载更多
function pageloda(){
	m++;
	if(m > glo_pageNum0-1){
		$('#loadingadd0').text('没有更多了！');
		return;
	}
	isFirst0=true;
	canyujilu(m,0);
}

//查看幸运码
function clickxinyun(lottery_id){
	var luckyCodeStr='';
	$.ajax({
		type:"post",
		url:urlPost+"/Attend/getAttendInfo",
		data:{
			uid:uid,
			lottery_id:lottery_id
		},
		dataType:'json',
		success:function(data){
			var attendCode0 = data['list'];
			
		for (var k=0;k<attendCode0.length;k++) {
					var lucky_code=attendCode0[k]['lucky_code'];//幸运码
					
					var create_time=attendCode0[k]['create_time'];//时间
					
					var trueAttendCode='';//把startCode分离出来，然后以分号连接成一个新数字

					var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
				
				for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I

				trueAttendCode+='<span class="display-ib padding-r-8">'+(glo_startCode+Number(s[j]))+'</span>';	   
				}
				//把startCode分离出来，然后以分号连接成一个新数字
				trueAttendCode=trueAttendCode.substring(0,trueAttendCode.length-1);//去掉最后一个分号
				var timestamp_3 = create_time;
				var newDate_3 = new Date();
				newDate_3.setTime(timestamp_3 * 1000);
				var newLottery_time_3=newDate_3.format('yyyy-MM-dd hh:mm:ss');
				
				luckyCodeStr+='<p class="text-gray2 margin-b-5">'+newLottery_time_3+'</p>';//创建时间
				luckyCodeStr+='<p class="word-break nomargin margin-r_8">'+trueAttendCode+'</p>';//幸运码,弹出框中的
		}
			$('#myModal').modal('toggle');
			$('#luckyCode').html(luckyCodeStr);
		}	
	});
}

var g=0;
/**参与记录切换**/
function canyuListh(o){
	$('.part_rec_List').eq(o).show().siblings('.part_rec_List').hide();
	$('#clickcanyujl a').eq(o).show().siblings('a').hide();
	$('#navclick a').eq(o).addClass('part_title_active').siblings().removeClass('part_title_active');	
	if(o==1){
		jiexiaojilu(g,1);//即将揭晓记录
	}else if(o==2){
		jiexiaojilu_3(d,2);//即将揭晓记录
	}
}

/**待揭晓**/
function jiexiaojilu(pege,zhauntai){
  if(isFirst1){
	$.ajax({
		type:"post",
		url:urlPost+"/Attend/attendDetail",
		data:{
			user_token:user,
			pageSize:pageSize,
			pageIndex:pege,
			state:zhauntai,
			soso:0,
		},
		beforeSend: function(){
			$(".loading").show();
		},
		dataType:'json',
		success:function(data){
			$(".loading").hide();
			var list = data['list'];//参与记录数组
			var host = data['host'];//图片地址前缀
			var numFont		 = data['pageCount'];//页码总数
			glo_pageNum1	 = numFont;//页码赋值给全局变量
			goodslist1=list;//赋值给全局变量
			glo_startCode=data['startCode'];//幸运码前缀
			var canyuList='';
			var baifenbi = 0;
			if(numFont<=1){
				$('#loadingadd1').hide();
			}
			if(list==''){
				$('#canyujil_1').append('<p style="text-align: center;line-height:50px;">您暂时没有内容哦！</p>');
				$('#loadingadd1').hide();
			}
			for (var i=0;i<list.length;i++) {
					var title 		 = data['list'][i]['title'];//商品名称
					var path 		 = data['list'][i]['path'];//商品图片
					var need_count   = data['list'][i]['need_count'];//总需人数
					var attend_count = data['list'][i]['attend_count'];//个人参与人数
					var attend_all 	 = data['list'][i]['attend_all'];//总参与人数
					var remain_count = data['list'][i]['remain_count'];//剩余人次
					var attend_all	 = data['list'][i]['attend_all'];
					var pid			 = data['list'][i]['pid'];//商品id
					var lottery_id	 = data['list'][i]['lottery_id'];//商品期号
					

				canyuList+='<div class="part_rec_content">';
				canyuList+='<div class="issue_content_publish row margin-l-r-0">';
				canyuList+='<div class="col-md-4 col-sm-4 col-xs-4 issue_content_publish_1 text-center">';
				canyuList+='<a href="3_goods-ing.html?pid='+pid+'&lottery_id='+lottery_id+'" style="display:block;margin-top:15px;">';
				canyuList+='<img class="img_publish" src="'+host+''+path+'">';
				canyuList+='</a>';
				canyuList+='</div>';
				canyuList+='<div class="col-md-8 col-sm-8 col-xs-8 padding-l-0">';
				canyuList+='<div class="content_nav">';
				canyuList+='<h1 class="content_nav_title fz_15px">';
				canyuList+='<a href="3_goods-ing.html?pid='+pid+'&lottery_id='+lottery_id+'">';
				canyuList+='<span class="title_number">'+title+'</span>';
				canyuList+='</a>';
				canyuList+='</h1>';
				canyuList+='<div class="progress commpdity-progress" >';
				canyuList+='<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%">';
				canyuList+='<span class="sr-only">90% Complete (warning)</span>';
				canyuList+='</div></div></div>';
				canyuList+='<div class="com_number row fz_12px">';
				canyuList+='<div class="col-md-4 col-sm-4 col-xs-4 com_number-list1 padding-r-0">';
				canyuList+='<p class="com_number_nb1">'+attend_all+'</p>';
				canyuList+='<p class="">已参与人次</p>';
				canyuList+='</div>';
				canyuList+='<div class="col-md-4 col-sm-4 col-xs-4 com_number-list2 text-center padding-r-0 padding-l-0">';
				canyuList+='<p class="">'+need_count+'</p>';
				canyuList+='<p class="">总需人次</p>';
				canyuList+='</div>';
				canyuList+='<div class="col-md-4 col-sm-4 col-xs-4 com_number-list3 padding-l-0">';
				canyuList+='<p class="text-red  com_number_nb2">'+remain_count+'</p>';
				canyuList+='<p class="">剩余人次</p>';
				canyuList+='</div></div>';
				canyuList+='<div class="part_rec_number position-re" style="font-size: 12px;">您参与：<span class="text-red">'+attend_count+'</span>';
				canyuList+='&nbsp;次&nbsp;&nbsp;<a href="javascript:clickxinyun('+lottery_id+');" style="color:#428BCA;" class="">查看幸运号</a>';
				canyuList+='<sapn style="margin-right: -8px;line-height: 9px;color:#ff4800" class="btn-sm buy position-ab fz_14px"  href="javascript:;">待揭晓</span>';
				canyuList+='</div></div></div></div>';
			}
			$('#canyujil_1').append(canyuList);
			
			
		}
	});
	isFirst1=false;
	}
}



//加载 即将揭晓记录 下一页
function pageloda_2(){
	g++;
	if(g > glo_pageNum1-1){
		$('#loadingadd1').text('没有更多了！');
		return;
	}
	isFirst1=true;
	jiexiaojilu(g,1);
}



/**已经揭晓**/
var lottery_code='';

function jiexiaojilu_3(pege,zhauntai){
	if(isFirst2){
	$.ajax({
		type:"post",
		url:urlPost+"/Attend/attendDetail",
		data:{
			user_token:user,
			pageSize:pageSize,
			pageIndex:pege,
			state:zhauntai,
			soso:0,
		},
		beforeSend: function(){
			$(".loading").show();
		},
		dataType:'json',
		success:function(data){
			$(".loading").hide();
			var list = data['list'];//参与记录数组
			var host = data['host'];//图片地址前缀
			goodslist2=list;//赋值给全局变量
			var numFont		 = data['pageCount'];//页码总数
			glo_pageNum2	 =numFont;//赋值全局页码
			glo_startCode=data['startCode'];//幸运码前缀
			if(numFont<=1){
				$('#loadingadd2').hide();
			}
			if(list==''){
				$('#canyujil_2').append('<p style="text-align: center;line-height:50px;">您暂时没有内容哦！</p>');
				$('#loadingadd2').hide();
			}
			var canyuList='';
			var baifenbi = 0;
			for (var i=0;i<list.length;i++) {
				var startCode	 = data['startCode'];//中奖码前缀
				var title 		 = data['list'][i]['title'];//商品名称
				var path 		 = data['list'][i]['path'];//商品图片

				var attend_count = data['list'][i]['attend_count'];//个人参与人数
				var attend_all 	 = data['list'][i]['attend_all'];//总参与人数
				
				var remain_count = data['list'][i]['remain_count'];//剩余人次
				var attend_all	 = data['list'][i]['attend_all'];
				var pid			 = data['list'][i]['pid'];//商品id
				var lottery_id	 = data['list'][i]['lottery_id'];//商品期号
				var nickname	 = data['list'][i]['nickname'];//中奖者姓名
				var lp_uid	     = data['list'][i]['lp_uid'];//中奖用户id
				var lottery_time = data['list'][i]['lottery_time'];//开奖时间
				var nickname	 = data['list'][i]['nickname'];//中奖者姓名
				lottery_code = parseInt(startCode)+parseInt(data['list'][i]['lottery_code']);//中奖码
				
				var timestamp_3 = lottery_time;
				var newDate_3 = new Date();
				newDate_3.setTime(timestamp_3 * 1000);
				var newLottery_time_3=newDate_3.format('yyyy-MM-dd hh:mm:ss');
				if(lp_uid==uid){
					var url  = '35-personal.html';
				}else{
					var url  = '35-personal-other.html?uid='+lp_uid+'&nickname='+nickname+'';
				}
				var url = encodeURI(encodeURI(url));//名称转码
				canyuList+='<div class="part_rec_content">';
				canyuList+='<div class="issue_content_publish row margin-l-r-0">';
				canyuList+='<div class="col-md-4 col-sm-4 col-xs-4 issue_content_publish_1 text-center">';
				canyuList+='<a href="6_goods-ing-adv.html?pid='+pid+'&lottery_id='+lottery_id+'" style="display:block;margin-top:15px;">';
				canyuList+='<img class="img_publish" src="'+host+''+path+'">';
				canyuList+='</a>';
				canyuList+='</div><div class="col-md-8 col-sm-8 col-xs-8">';
				canyuList+='<div class="content_nav">';
				canyuList+='<h1 class="content_nav_title fz_15px">';
				canyuList+='<a href="6_goods-ing-adv.html?pid='+pid+'&lottery_id='+lottery_id+'">';
				canyuList+='<span class="title_number">'+title+'</span>';
				canyuList+='</a>';
				canyuList+='</h1>';
				canyuList+='</div><div class="jiexiaofont part_rec_number position-re" style="font-size: 12px;">';
				canyuList+='<font class="text-gray">获奖者：</font><a href='+url+'><span style="color:#428BCA;">'+nickname+'</span></a>';
				canyuList+='&nbsp;&nbsp;&nbsp;</div>';
		
				canyuList+='<div class="jiexiaofont part_rec_number position-re" style="font-size: 12px;">';
				
				canyuList+='</div><div class="jiexiaofont part_rec_number position-re" style="font-size: 12px;">';
				canyuList+='<font class="text-gray">幸运号码：</font><span class="text-red">'+lottery_code+'</span>&nbsp;&nbsp;&nbsp;</div>';
				canyuList+='<font class="text-gray">揭晓时间：</font><span class="text-red">'+newLottery_time_3+'</span>';
				canyuList+='<div class="jiexiaofont part_rec_number position-re" style="font-size: 12px;">';
				canyuList+='本期参与：<span class="text-red">'+attend_count+'</span>';
				canyuList+='&nbsp;人次&nbsp;&nbsp;';
				canyuList+='<a style="color:#428BCA;" href="javascript:clickxinyun('+lottery_id+');" class="">查看号码</a>';
				
				canyuList+='&nbsp;&nbsp;&nbsp;</div></div></div></div>';
	}
			$('#canyujil_2').append(canyuList);
		}
	});
	isFirst2 = false;
	}
}
var d=0;
//加载 已揭晓记录 下一页
function pageloda_3(){
	d++;
	if(d > glo_pageNum2-1){
		$('#loadingadd2').text('没有更多了！');
		return;
	}
	isFirst2=true;
	jiexiaojilu_3(d,2);
}

