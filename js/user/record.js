/*中奖记录*/
var page = 6;//每页显示条数
var state = 1;//0 为虚拟商品,1为实物商品
var pageIndex = 0;//显示第几页
function userRecord(page,pageIndex,state){
	$.ajax({
	type:"post",
	url:urlPost+"/UcenterLottery/lotteryRecord",
	data:{
		user_token:user,
		pageSize:page,//每页显示条数
		pageIndex:pageIndex,//第几页
		state:state,
		soso:0
	},
	dataType:'json',
	beforeSend:function(){
		$('.loading').show();
	},
	success:function(data){
		if(data['code']==200){
			$('.loading').hide();
			var userRecordList = data['list'];//中奖记录数组
			if(userRecordList==''){
				$('#userRourt').append('<p style="text-align: center;line-height:50px;">您暂时没有中奖记录</p>');
				return false;
			}
			var path_host = data['host'];//图片地址前缀
			var RecordListDiv='';
			for(var i=0;i<userRecordList.length;i++){
				
				var title 		= userRecordList[i]['title'];//商品名称
				var id 			= userRecordList[i]['id'];//id
				var path  		= userRecordList[i]['path'];//商品图片
				var need_count  = userRecordList[i]['need_count'];//总需人次
				var lottery_id  = userRecordList[i]['lottery_id'];//期号
				var lottery_code= userRecordList[i]['lottery_code'];//中奖的幸运码
				var apply_time  = userRecordList[i]['apply_time'];//揭晓时间
				var status		= userRecordList[i]['status'];//物流状态
				var express_name= userRecordList[i]['express_name'];//物流公司名称
				var express_number = userRecordList[i]['express_number'];//物流单号
				var pid  		= userRecordList[i]['pid'];//商品id
				var attend_count=userRecordList[i]['attend_count'];//本期参与人次
				
				if(express_name==null){
					express_name='暂无';
				}
				if(express_number==null){
					express_number='暂无';
				}
				
					RecordListDiv+='<div class="winrec_content">';
					RecordListDiv+='<div class="winrec_content_publish row margin-l-r-0"><div class="col-md-4 col-sm-4 col-xs-4 winrec_content_publish_1 text-center">';
					RecordListDiv+='<a href="3_goods-ing.html?pid='+pid+'&lottery_id='+lottery_id+'">';
					RecordListDiv+='<img class="img_publish" src="'+path_host+'/'+path+'">';
					RecordListDiv+='</a>';
					RecordListDiv+='</div><div class="col-md-8 col-sm-8 col-xs-8">';
					RecordListDiv+='<a href="#"><p class="fz_15px lg_22px pContent" >'+title+'</p>';
					RecordListDiv+='</a>';
					RecordListDiv+='<p class="lg_22px">';
					RecordListDiv+='总需参与：<span style="color: #ff4800;">'+need_count+'</span>';
					RecordListDiv+='&nbsp;人次</p>';
					RecordListDiv+='<p class="lg_22px">';
					RecordListDiv+='本期参与：<span style="color: #ff4800;">'+attend_count+'</span>';
					RecordListDiv+='&nbsp;人次      </p>';
					RecordListDiv+='<p class="lg_22px">揭晓时间：'+apply_time+'</p>';
					RecordListDiv+='<p class="lg_22px">物流信息：<span class="text-red">'+express_name+'</p>';
					RecordListDiv+='<p class="lg_22px">物流单号：<span class="text-red">'+express_number+'</p>';
					if(status==1){
						status='未发货';
						RecordListDiv+='<button disabled="disabled" style="background:#FB4700;width:190px;" type="button" class="querenbutton btn btn-primary btn-sm confirm fz_14px">'+status+'</button>';
					}else if(status==3){
						status='已签收';
						RecordListDiv+='<button disabled="disabled" style="background:#00B907;width:190px;" type="button" class="querenbutton btn btn-primary btn-sm confirm fz_14px">'+status+'</button>';
					}else if(status==5){
						status='换货中';
						RecordListDiv+='<button disabled="disabled" disabled="disabled" style="background:#FB4700;width:190px;" type="button" class="querenbutton btn btn-primary btn-sm confirm fz_14px">'+status+'</button>';
					}else if(status==2){
						status='确认收货';
						RecordListDiv+='<button onclick="confirmation('+pid+','+lottery_id+','+id+');" style="background:#FB4700;width:190px;" type="button" class="querenbutton btn btn-primary btn-sm confirm fz_14px">'+status+'</button>';
					}else if(status==6){
						status='已拒绝';
						RecordListDiv+='<button disabled="disabled" style="background:#FB4700;width:190px;" type="button" class="querenbutton btn btn-primary btn-sm confirm fz_14px">'+status+'</button>';
					}
					RecordListDiv+='</div></div></div>';	
				
			}
			
			$('#userRourt').append(RecordListDiv);
			
		}else{
			tanchuan_0(data['info']);//错误提示
		}
		
	},
});

}

//判断是不是微信浏览器
var useragent = navigator.userAgent;

//判断用户有没有登陆！
	if(user){
		userRecord(page,pageIndex,state);//调用查询中奖记录函数
	}else{
		//window.location='banding_mobile.html';//跳转绑定手机页面
		if(useragent.match(/MicroMessenger/i) == 'MicroMessenger'){
			tanchuan_1('您没有绑定手机,请先绑定！','error','确定','banding_mobile.html');//跳转绑定手机页面
		}else{
			tanchuan_1('您没有登录,请先登录！','error','确定','34-Land.html');//跳转登录注册
		}
	}


/**确认收货**/
function confirmation(pid,lottery_id,id){
	
	swal({
			title:'您确定收到货了吗？',
			type:'warning',
			showCancelButton: true,
			confirmButtonColor: "#ff4800",
			confirmButtonText: '确认',
			cancelButtonText:'取消',//取消按钮 
			closeOnConfirm: false 
		},function(){
			$.ajax({
				type:"post",
				url:urlPost+"/UcenterLottery/delivery",
				data:{
					user_token:user,
					pid:pid,
					lottery_id:lottery_id,
					id:id
				},
				dataType:'json',
				success:function(data){
					if(data['code']==200){
						//tanchuan_0('收货成功！','success','确定');
						location=location;
					}else{
						tanchuan_0(data['info']);
					}
				}
			})
	});
}