var page = 0;//第几页
var pageSize = 6;//显示条数
var glo_pageNum1;//总页数
function usertuijian(page,pageSize,loweruid){
	$.ajax({
		type:"post",
		url:urlPost+"/Commission/commissionList",
		data:{
			user_token:user,
			pageIndex:page,
			pageSize:pageSize,
			loweruid:loweruid
		},
		beforeSend: function(){
			$(".loading").show();
		},
		dataType:'json',
		success:function(data){
			$(".loading").hide();
			var list_list = data['list']['list'];//总数组
			var pagecount = data['list']['pagecount'];//总页数
			glo_pageNum1=pagecount;
			if(glo_pageNum1<=1){
					$('#jiazai_font').hide();
				}
			var count = data['list']['count'];//总邀请好友
			var onecommission = data['list']['onecommission'];//一级
			var towcommission = data['list']['towcommission'];//二级
			var sumcommission = data['list']['sumcommission'];//总金额
			var commission	  = data['list']['commission'];//佣金
			if(onecommission==null){
				onecommission=0;
			}
			if(towcommission==null){
				towcommission=0;
			}
			if(sumcommission==null){
				sumcommission=0;
			}
			if(commission==null){
				commission=0;
			}
			$('#count_num').text(count);
			$('#onecommission').text(onecommission);
			$('#towcommission').text(towcommission);
			$('#sumcommission').text(sumcommission);
			if(list_list==''){
				$('#user_soulist').html('<p style="text-align: center;line-height:50px;">您暂时没有内容哦！</p>');
				return false;
			}
			var usersorlist = '';
			$.each(list_list, function(k,v) {
				var level = list_list[k]['level'];//级别
				var uid = list_list[k]['userInfo']['uid'];//uid
				var nickname = list_list[k]['userInfo']['nickname'];//名称
				var face = list_list[k]['userInfo']['face'];//头像
				var mobile = list_list[k]['userInfo']['mobile'];//手机
				var commission2 = list_list[k]['commission'];//佣金
				
				
			usersorlist+='<div class="tuijian_list">';
			usersorlist+='<div class="tuijian_left">';
			usersorlist+='<div class="img_border">';
			usersorlist+='<img src="'+face+'" width="100%"/>';
			usersorlist+='</div>';
			usersorlist+='</div>';
			
			usersorlist+='<div class="tuijian_right">';
				usersorlist+='<p class="tuijian_font">'+nickname+'<span class="font_666">(ID:'+uid+')</span></p>';
				usersorlist+='<p class="tuijian_font">手机号码：'+mobile+'</p>';
				usersorlist+='<p class="tuijian_font">级别：<span class="red">一级</span></p>';
				usersorlist+='<p class="tuijian_font">推荐人获得佣金：<span class="red">'+commission2+'</span></p>';
			usersorlist+='</div>';
		
		usersorlist+='</div>';
			});
			$('#user_soulist').html(usersorlist);
		}
	});
}
usertuijian(page,pageSize,'');
/**加载更多**/
var i=0;
function addList(){
	i++;
	if(i > glo_pageNum1-1){
		$('#jiazai_font').text('没有更多了！');
		return;
	}
	usertuijian(i,pageSize);
}

//搜索好友id
function sousuo(){
	var user_idInput = $('.user_idInput').val();
	usertuijian(page,pageSize,user_idInput);
}
