/**晒单**/
var pageSize = 5;//每页显示条数
var page = 0;//显示第0页
var gol_mysun;//已晒单总页数
var page_num;//未晒单总页数
var pacth_user;//用户头像
//获取头像
$.ajax({
	type:"POST",
	url:urlPost+"/ucenter/upPhoto",
	data:{
		user_token:user
	},
	dataType:'json',
	success:function(data){
		/**
		 * 个人信息获取
		 * 待续
		 * **/
		if(data['code']=='200'){
			var pic_host = data['pic_host'];//头像前缀
			var path	 = data['path'];//用户头像
			pacth_user= picHostUrl(pic_host,path);//此函数定义在common.js函数中
			
		}
		
	}
})

/*点击切换晒单*/
$('#shaidanClick a').click(function(){
	var _index = $(this).index();
	$('.share_det_content').eq(_index).show().siblings('.share_det_content').hide();
	$(this).addClass('part_title_active').siblings().removeClass('part_title_active');
});
//请求已晒单记录
function userMysun(page,state){
	$.ajax({
		type:"post",
		url:urlPost+"/Display/orderRecord",
		data:{
			user_token:user,
			pageSize:pageSize,
			pageIndex:page,
			state:state,
			soso:0,
		},
		dataType:'json',
		success:function(data){
			var page_numPost = data['pageCount'];//一共有多少页
			gol_mysun=page_numPost;//把一共多少页赋值给全局变量
			var list = data['list'];//晒单记录数组
			if(gol_mysun==1){
				$('.yishai').hide();//隐藏加载更多
			}
			if(list==''){
				$('#shaidanBox').append('<p style="text-align: center;line-height:50px;">您暂时没有晒单记录！</p>');
				$('.yishai').hide();
				return false;
			}

			var pic_host = data['pic_host'];//晒单地址图片前缀
			var shaidanDiv='';//结构
			var shaidaiImg='';//晒单图片

			for (var i=0;i<list.length;i++) {
				
				var id 		    = list[i]['id'];//晒单id
				var title 		= list[i]['title'];//标题
				var description = list[i]['description'];//内容
				var uid 		= list[i]['uid'];//用户id
				var nickname 	= list[i]['nickname'];//用户名称
				var lottery_id  = list[i]['lottery_id'];//期号
				var pid 		= list[i]['pid'];//商品id
				var create_time = list[i]['create_time'];//晒单时间

				var face		= list[i]['face'];//用户头像
				var facecheke   = picHostUrl(pic_host,face);
				
				if(create_time==0){
					create_time='无';
				}else{
					var timestamp_3 = create_time;
					var newDate_3 	= new Date();
					newDate_3.setTime(timestamp_3 * 1000);
					var newLottery_time_3=newDate_3.format('yyyy-MM-dd hh:mm:ss');
				}
				
				
				
				var path		= list[i]['path'];//晒单图片
				
				var url  		= '35-personal.html';
				//var url 		= encodeURI(encodeURI(url));//名称转码
				var pic_host_user	= 'http://img.cgyyg.com';

				
				
				shaidanDiv+='<li><div class="clearfix share-content">';
				shaidanDiv+='<div class="avatar"><a href="'+url+'">';
				shaidanDiv+='<img class="userImg" width="35" height="35" src="'+facecheke+'" alt="头像">';
				shaidanDiv+='</a></div><div class="text position-re">';
				shaidanDiv+='<div style="margin-bottom:5px;" class="nickname">';
				shaidanDiv+='<div class="det_sun_content">';
				
				shaidanDiv+='<a href="10_sun_details.html?id='+id+'">';
				shaidanDiv+='<p class="fz_15px lg_22px">'+title+'</p>';
				shaidanDiv+='</a>';

			
				shaidanDiv+='<p class="text-skyblue lg_22px">';
				shaidanDiv+='<a style="color:#428bca" href="'+url+'">'+nickname+'</a>&nbsp;&nbsp;';
				shaidanDiv+='</p>';
	

				shaidanDiv+='<p class="lg_22px" style="color:#999">'+newLottery_time_3+'</p>';
				shaidanDiv+='<a href="10_sun_details.html?id='+id+'">';
				shaidanDiv+='<p class="lg_22px">'+description+'</p>';
				shaidanDiv+='</a></div><div class="sun_share_det">';
				shaidanDiv+='<a href="10_sun_details.html?id='+id+'">';

				
				if(path.length==0){
					shaidanDiv+='<p>暂无晒单图片</p>';
				}else{
					// for (var j=0;j<path.length;j++) {
						var pathImg=path[0];
					shaidanDiv+='<img src="'+pic_host+''+pathImg+'"/>';
					//}
				}
				shaidanDiv+='</a>';
				shaidanDiv+='</div></div></div></div></li>';
			}
			$('#shaidanBox').append(shaidanDiv);
		}
	});
}
userMysun(0,1);//调用已晒单列表

var d=0;
//加载 未晒单记录 下一页
function pageloda_1(){
	d++;
	if(d > gol_mysun-1){
		$('.yishai').text('没有更多了！');
		return;
	}
	userMysun(d,1);
}



//请求未晒单记录
var weishaidan;
function userMysun2(page,state){
	$.ajax({
		type:"post",
		url:urlPost+"/Display/orderRecord",
		data:{
			user_token:user,
			pageSize:pageSize,
			pageIndex:page,
			state:state,
			soso:0,
		},
		dataType:'json',
		success:function(data){
			var page_numPost = data['pageCount'];//一共有多少页
			page_num=page_numPost;//把一共多少页赋值给全局变量
			var list = data['list'];//晒单记录数组
			var pic_host = data['pic_host'];//晒单地址图片前缀
			var shaidanDiv='';//结构
			var shaidaiImg=[];//晒单图片
			var startCode=data['startCode'];//中奖前缀
			var host = data['host'];
			if(page_num==1){
				$('.weishai').hide();//隐藏加载更多
			}
			if(list==''){
				$('#shaidanBox2').append('<p style="text-align: center;line-height:50px;">您暂时没有晒单记录！</p>');
				$('.weishai').hide();
				return false;
			}
			
			for (var i=0;i<list.length;i++) {
				var title 		= list[i]['title'];//标题
				var uid 		= list[i]['uid'];//用户id
				var attend_time = list[i]['attend_time'];//揭晓时间
				var lottery_code= parseInt(startCode)+parseInt(list[i]['lottery_code']);//中奖码
				var pid 		= list[i]['pid'];//商品id
				var need_count  = list[i]['need_count'];//总需次数
				var attend_count= list[i]['attend_count'];//参与人次
				var path		= list[i]['path'];
				var lottery_id  = list[i]['lottery_id'];
				var timestamp_3 = attend_time;
				var newDate_3   = new Date();
				newDate_3.setTime(timestamp_3 * 1000);
				var newLottery_time_3=newDate_3.format('yyyy-MM-dd hh:mm:ss');
				var status      = list[i]['status'];//晒单状态
				var path	    = list[i]['path'];//晒单图片
				var id	=list[i]['id'];//晒单id

				
				for (var j=0;j<path.length;j++) {
					var pathImg=path[j];
					weishaidan=pathImg;
				}
				shaidanDiv+='<div class="row">';
				shaidanDiv+='<div class="part_rec_content">';
				shaidanDiv+='<div class="issue_content_publish row margin-l-r-0">';
				shaidanDiv+='<div class="col-md-4 col-sm-4 col-xs-4 issue_content_publish_1 text-center">';
				shaidanDiv+='<a href="6_goods-ing-adv.html?pid='+pid+'&lottery_id='+lottery_id+'" style="display:block;margin-top:15px;">';
				shaidanDiv+='<img class="img_publish" src="'+host+''+weishaidan+'"/>';
				shaidanDiv+='</a>';
				shaidanDiv+='</div>';
				shaidanDiv+='<div class="col-md-8 col-sm-8 col-xs-8">';
				shaidanDiv+='<div class="content_nav">';
				shaidanDiv+='<h1 class="content_nav_title fz_15px" style="padding: 0;margin: 0;">';
				shaidanDiv+='<a href="6_goods-ing-adv.html?pid='+pid+'&lottery_id='+lottery_id+'"><span class="title_number">'+title+'</span></a>';
				shaidanDiv+='</h1>';
				shaidanDiv+='</div>';
				shaidanDiv+='<div class="jiexiaofont part_rec_number position-re" style="font-size: 12px;">总需参与：<span class="text-red">'+need_count+'</span>&nbsp;人次&nbsp;&nbsp;</div>';
				shaidanDiv+='<div class="jiexiaofont part_rec_number position-re" style="font-size: 12px;">本期参与：<span class="text-red">'+attend_count+'</span>&nbsp;人次&nbsp;&nbsp;';
				if(status==0){
					status='去晒单';
					shaidanDiv+='<a href="23-m-want-sun.html?id='+id+'" style="width:70px;color:#fff;" class="btn btn-primary btn-sm buy position-ab fz_14px">'+status+'</a>';
				}else if(status==3){
					status='审核中';
					shaidanDiv+='<a href="javascript:;" style="width:70px;background:#ccc;color:#fff" class="btn btn-primary btn-sm buy position-ab fz_14px">'+status+'</a>';
				}else if(status==2){
					status='重新晒单';
					shaidanDiv+='<a href="23-m-want-sun.html?id='+id+'" style="width:70px;color:#fff" class="btn btn-primary btn-sm buy position-ab fz_14px">'+status+'</a>';
				}
				
				shaidanDiv+='</div>';
				shaidanDiv+='<div class="jiexiaofont part_rec_number position-re" style="font-size: 12px;">获奖幸运码：';
				shaidanDiv+='<span class="text-red">'+lottery_code+'</span>&nbsp;';
				shaidanDiv+='</div>';
				shaidanDiv+='<div class="jiexiaofont part_rec_number position-re" style="font-size: 12px;">';
				shaidanDiv+='揭晓时间：<span class="text-red">'+newLottery_time_3+'</span>&nbsp;&nbsp;&nbsp;</div>';
				shaidanDiv+='</div></div></div></div>';
			
			}
			$('#shaidanBox2').append(shaidanDiv);
			
		}
	});
}
userMysun2(0,0);//调用已晒单列表
var m=0;
//加载 未晒单记录 下一页
function pageloda_2(){
	m++;
	if(m > page_num-1){
		$('.weishai').text('没有更多了！');
		return;
	}
	userMysun2(m,0);
}