/********Hong**********/ //查看他人中心，解析浏览器传递过来的昵称，UID，头像
//从浏览器获取传递过来的参数
var uid_other=GetQueryString("uid");
var nickname=GetQueryString("nickname");//传递用户昵称，查看他人的
nickname=decodeURI(nickname);

$("#nickname").html(nickname);
var uid_link=uid_other+'&'+'nickname='+escape(nickname);//当未登录或者查看他人的参与或者晒单或者中奖记录时 浏览器传递的参数（昵称需要编码传递）

//从服务器获得他人的个人信息,读取用户头像
$.ajax({
	type:'post',
	url:''+urlPost+'/Ucenter/getOtherInfo',
	data:{
		uid:uid_other
		},  
	cache:false,  
	dataType:'json', 
	beforeSend: function(){
		//$(".loading").show();
		},
	success:function(data){ 
		 var code=data['code'];
		 var info=data['info'];
		 var host=data['host'];
		 var pic_host=data['pic_host'];
		 if(code!=200){
			tanchuan_0(info,'error','确定'); 
		 }
		 var nickname_other=data['list']['nickname'];//他人的
		 var sex_other=data['list']['sex'];//他人的性别
		 var face_other=data['list']['face'];//他人的头像
		 var p=picHostUrl(pic_host,face_other);
		 $("#user_path").attr("src",""+p+"");
    }
	
});


$("#attendList_other").attr('href','21-Part_record-other.html?uid='+uid_link+'');//查看他人的参与记录
$("#lotteryList_other").attr('href','22-win-record-other.html?uid='+uid_link+'');//查看他人的中奖记录
$("#dissList_other").attr('href','24-mysun-other.html?uid='+uid_link+'');//查看他人的晒单记录
