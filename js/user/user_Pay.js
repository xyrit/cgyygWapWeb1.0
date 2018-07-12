var pageSize =10;//每页显示数量
var pageIndex= 0;//第几页
var glo_pageCount;//总页数
//充值记录
function user_pay(pageSize,pageindex){
		$.ajax({
		type:"post",
		url:urlPost+"/ucenter/moneyRecords",
		data:{
			user_token:user,
			pageSize:pageSize,
			pageIndex:pageindex,
			soso:0
		},
		dataType:'json',
		success:function(data){
			var list = data['list'];
			if(list==''){
				$('#userpayList').append('<p class="text_centen">您没有充值记录哦！</p>');
				$('.jiazaiNum').hide();
				return false;
			}
			var pageCount = data['pageCount'];//当前总页数
			glo_pageCount=pageCount;
			var payBox='';
			for (var i=0;i<list.length;i++) {
				var charge_type   = list[i]['charge_type'];//充值通道，1代表微信
				var money 		  = list[i]['money'];//充值金额
				var charge_number = list[i]['charge_number'];//交易号
				var status 		  = list[i]['status'];//状态，1代表已充值
				var create_time     = list[i]['create_time'];//充值时间
				
				if(status==1){
					status='成功';
				}else{
					status='失败';
				}
				var timestamp_3 = create_time;
				var newDate_3 = new Date();
				newDate_3.setTime(timestamp_3 * 1000);
				var newLottery_time_3=newDate_3.format('yyyy-MM-dd hh:mm:ss');
				
				payBox+='<tr>';
				payBox+='<td>'+charge_number+'</td>';
				payBox+='<td>'+money+'/'+status+'</td>';
                payBox+='<td>'+newLottery_time_3+'</td>';
               	payBox+='</tr>';
			}
			$('#userpayList').append(payBox);
		},
	});
}
user_pay(pageSize,pageIndex);

var g=0;
$('.jiazaiNum').click(function(){
	g++;
	if(g > glo_pageCount-1){
		tanchuan_0('已经没有内容啦！','error','确定');
		return;
	}
	user_pay(pageSize,g);
});