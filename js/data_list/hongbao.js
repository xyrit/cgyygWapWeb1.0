// 红包专题
/*if(typeof(user) == "undefined") {
	swal({
		title: "",
		text: '您还没有登录。',
		html: true,
		type: "error",
		confirmButtonText:"确定",
		confirmButtonColor: "#ff4800",
	},function(){
		//设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
		setTimeout(function(){
		  window.location.href="34-Land.html"  
		}, 500);
	});
	
}*/
var user 	  = window.localStorage.token;//用户token
//取出存储中的用户token
var user_token= window.localStorage.user_token;
if(user) {
	weixin_info(user);
}
else
{
	//调用微信授权地址
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		if (document.all) {var o = document.createElement('a'); o.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc10af3f90aced41f&redirect_uri=http://www.cgyyg.com/cgyyg1.0/wap.php/OtherLogin/oauth&response_type=code&scope=snsapi_userinfo&state=12&url_type=12&#wechat_redirect'; document.body.appendChild(o); o.click(); } else {window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc10af3f90aced41f&redirect_uri=http://www.cgyyg.com/cgyyg1.0/wap.php/OtherLogin/oauth&response_type=code&scope=snsapi_userinfo&state=12&url_type=12&#wechat_redirect'; }

	}
	else{
		hong_total(user_token);
		hong_list(user_token);
	}


}
//获取微信登录的用户信息
function weixin_info(user_wx){

	$.ajax({
		type: 'post',
		url: '' + urlPost + '/User/getInfo',
		data: {
			token:user_wx
		},
		cache: false,
		dataType: 'json',
		async: false,  //同步执行
		beforeSend: function () {

		},
		success: function (data) {
			var wx_token=data['user']['user_token'];
			//存储得到的用户token值
			//window.localStorage.wx_token_sp  = wx_token;//微信SDK标题调用
			// new_token=wx_token;
			if(wx_token==0){
				//$("#get_lotteryBtn").attr("disabled","disabled");
				wx_flag=1;
				swal({
				 title: "",
				 text: '您还没有绑定手机。',
				 html: true,
				 type: "error",
				 confirmButtonText:"确定",
				 confirmButtonColor: "#ff4800",
				 },function(){
				 //设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
				 setTimeout(function(){
				 window.location.href="banding_mobile.html";
				 }, 500);
				 });


				return;

			}
			window.localStorage.user_token = wx_token;//用户唯一标识
			hong_total(wx_token);
			hong_list(wx_token);
			// getLottery_get();

		},
	})

}

function hong_total(user_token){
	$.ajax({  
			  type:'get',  
			  url:''+urlPost+'/Eevent/amount',  
			  data:{
				  user_token:user_token
				  },  
			  cache:false,  
			  dataType:'json',  
			  beforeSend:function(){
				 
			  },
			  success:function(data){  
				  var code=data['code'];
				  var info=data['info'];
				  if(code!=200){
					 
					  if(code==517){//如果有未登录提示，则跳到首页
					       swal({
								title: "",
								text: ''+info+'',
								html: true,
								type: "error",
								confirmButtonText:"确定",
								confirmButtonColor: "#ff4800",
							},function(){
								
								//window.location.href="index.html"  
								//设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
								setTimeout(function(){
								  window.location.href="34-Land.html"  
								}, 500);
							});
						  
					  }
					  return
				  }
				  var total_money=data['total_money'];
				  $("#total_money").html(total_money);
				  
			 },error: function(){
				 
			 }
	});
}
//读取充值列表

function hong_list(user_token){
	$.ajax({  
			  type:'get',  
			  url:''+urlPost+'/Eevent/getRedDetails',  
			  data:{
				  user_token:user_token
				  },  
			  cache:false,  
			  dataType:'json',  
			  beforeSend:function(){
				  $(".loading").show();
				  //$(".loading").html("<img src='images/loding.gif'/><br>正在加载中...");
			  },
			  success:function(data){  
				  var code=data['code'];
				  var info=data['info'];
				  if(code!=200){
					 
					  if(code==517){//如果有未登录提示，则跳到首页
					       swal({
								title: "",
								text: ''+info+'',
								html: true,
								type: "error",
								confirmButtonText:"确定",
								confirmButtonColor: "#ff4800",
							},function(){
								
								//window.location.href="index.html"  
								//设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
								setTimeout(function(){
								  window.location.href="34-Land.html"  
								}, 500);
							});
						  
					  }
					  return
				  }
				  //red1 int 类型 表示领取条件为 新注册用户 	0，表示不可领取，1，表示可以领取，2，表示已领取
				  //red2 int 表示领取条件为 累计充值20元 	同上
				  //red3 int 表示领取条件为 累计充值50元 	同上
				  //red4 int 表示领取条件为 累计充值100元 	同上
				  //red5 int 表示领取条件为 累计充值200元 	同上
				  //red6 int 表示领取条件为 累计充值500元 	同上
				  //red7 int 表示领取条件为 累计充值1000元 	同上
				  var items=data['items'];
				   var red1= items['red1'];
				   var red2= items['red2'];
				   var red3= items['red3'];
				   var red4= items['red4'];
				   var red5= items['red5'];
				   var red6= items['red6'];
				   var red7= items['red7'];
				   //等级对应
				   var red1_1='新注册用户';
				   var red2_1='累计充值20元';
				   var red3_1='累计充值50元';
				   var red4_1='累计充值100元';
				   var red5_1='累计充值200元';
				   var red6_1='累计充值500元';
				   var red7_1='累计充值1000元';
				   //自定义领取红包金额
				  var red_num1='1元';
				  var red_num2='2元';
				  var red_num3='3元';
				  var red_num4='5元';
				  var red_num5='10元';
				  var  red_num6='30元';
				  var red_num7='50元';
				   
				   
				   //结构
				   var redStr='';
				   //red1
				   redStr+='<tr>';
				   redStr+='<td><p style="margin:0 auto;">'+red1_1+'</p></td>';
				   redStr+='<td><p style="margin:0 auto;">'+red_num1+'</p></td>';
				   if(red1==0){
					   redStr+='<td><p style="margin:0 auto;"><button type="button" class="btn cg-btn-danger hong_btn2" disabled>领取奖励</button></p></td>';  
				   }else if(red1==1){
					   redStr+='<td><p style="margin:0 auto;"><button type="button" class="btn cg-btn-danger hong_btn2" onClick="getred(1,$(this));">领取奖励</button></p></td>';  
				   }else{
					  redStr+='<td><div style="margin:0 auto;"><img src="images/hong_ok.png"/> 已领取</div></td>';   
				   }
                    
                   redStr+='</tr>';   
				   //red2
				   redStr+='<tr>';
				   redStr+='<td><p style="margin:0 auto;">'+red2_1+'</p></td>';
				   redStr+='<td><p style="margin:0 auto;">'+red_num2+'</p></td>';
                   if(red2==0){
					   redStr+='<td><p style="margin:0 auto;"><button type="button" class="btn cg-btn-danger hong_btn2" disabled>领取奖励</button></p></td>';  
				   }else if(red2==1){
					   redStr+='<td><p style="margin:0 auto;"><button type="button" class="btn cg-btn-danger hong_btn2" onClick="getred(2,$(this));">领取奖励</button></p></td>';  
				   }else{
					  redStr+='<td><div style="margin:0 auto;"><img src="images/hong_ok.png"/> 已领取</div></td>';   
				   }
                   redStr+='</tr>';
				   //red3
				   redStr+='<tr>';
				   redStr+='<td><p style="margin:0 auto;">'+red3_1+'</p></td>';
				   redStr+='<td><p style="margin:0 auto;">'+red_num3+'</p></td>';
                   if(red3==0){
					   redStr+='<td><p style="margin:0 auto;"><button type="button" class="btn cg-btn-danger hong_btn2" disabled>领取奖励</button></p></td>';  
				   }else if(red3==1){
					   redStr+='<td><p style="margin:0 auto;"><button type="button" class="btn cg-btn-danger hong_btn2" onClick="getred(3,$(this));">领取奖励</button></p></td>';  
				   }else{
					  redStr+='<td><div style="margin:0 auto;"><img src="images/hong_ok.png"/> 已领取</div></td>';   
				   }
                   redStr+='</tr>';
				   //red4
				   redStr+='<tr>';
				   redStr+='<td><p style="margin:0 auto;">'+red4_1+'</p></td>';
				   redStr+='<td><p style="margin:0 auto;">'+red_num4+'</p></td>';
                   if(red4==0){
					   redStr+='<td><p style="margin:0 auto;"><button type="button" class="btn cg-btn-danger hong_btn2" disabled>领取奖励</button></p></td>';  
				   }else if(red4==1){
					   redStr+='<td><p style="margin:0 auto;"><button type="button" class="btn cg-btn-danger hong_btn2" onClick="getred(4,$(this));">领取奖励</button></p></td>';  
				   }else{
					  redStr+='<td><div style="margin:0 auto;"><img src="images/hong_ok.png"/> 已领取</div></td>';   
				   } 
                   redStr+='</tr>';
				   //red5
				   redStr+='<tr>';
				   redStr+='<td><p style="margin:0 auto;">'+red5_1+'</p></td>';
				   redStr+='<td><p style="margin:0 auto;">'+red_num5+'</p></td>';
                   if(red5==0){
					   redStr+='<td><p style="margin:0 auto;"><button type="button" class="btn cg-btn-danger hong_btn2" disabled>领取奖励</button></p></td>';  
				   }else if(red5==1){
					   redStr+='<td><p style="margin:0 auto;"><button type="button" class="btn cg-btn-danger hong_btn2" onClick="getred(5,$(this));">领取奖励</button></p></td>';  
				   }else{
					  redStr+='<td><div style="margin:0 auto;"><img src="images/hong_ok.png"/> 已领取</div></td>';   
				   } 
                   redStr+='</tr>';
				   //red6
				   redStr+='<tr>';
				   redStr+='<td><p style="margin:0 auto;">'+red6_1+'</p></td>';
				   redStr+='<td><p style="margin:0 auto;">'+red_num6+'</p></td>';
                   if(red6==0){
					   redStr+='<td><p style="margin:0 auto;"><button type="button" class="btn cg-btn-danger hong_btn2" disabled>领取奖励</button></p></td>';  
				   }else if(red6==1){
					   redStr+='<td><p style="margin:0 auto;"><button type="button" class="btn cg-btn-danger hong_btn2" onClick="getred(6,$(this));">领取奖励</button></p></td>';  
				   }else{
					  redStr+='<td><div style="margin:0 auto;"><img src="images/hong_ok.png"/> 已领取</div></td>';   
				   }   
                   redStr+='</tr>';
				   //red7
				   redStr+='<tr>';
				   redStr+='<td><p style="margin:0 auto;">'+red7_1+'</p></td>';
				   redStr+='<td><p style="margin:0 auto;">'+red_num7+'</p></td>';
                   if(red7==0){
					   redStr+='<td><p style="margin:0 auto;"><button type="button" class="btn cg-btn-danger hong_btn2" disabled>领取奖励</button></p></td>';  
				   }else if(red7==1){
					   redStr+='<td><p style="margin:0 auto;"><button type="button" class="btn cg-btn-danger hong_btn2" onClick="getred(7,$(this));">领取奖励</button></p></td>';  
				   }else{
					  redStr+='<td><div><img src="images/hong_ok.png"/> 已领取</div></td>';
				   }
                   redStr+='</tr>';
                      
                   $("#hong_list").html(redStr); 
				   
				  
				  $(".loading").hide();
			 },error: function(){
				 
			 }
	});
}

function getred(red_type,obj){
	
	$.ajax({  
			type:'get',  
			url:''+urlPost+'/Eevent/getred',  
			data:{
				user_token:user_token,
				type:'red'+red_type
				},  
			cache:false,  
			dataType:'json',  
			beforeSend:function(){
				
				obj.text("领取中...");
			},
			success:function(data){  
				var code=data['code'];
				var info=data['info'];
				if(code!=200){
					
					if(code==517){//如果有未登录提示，则跳到首页
						 swal({
							  title: "",
							  text: ''+info+'',
							  html: true,
							  type: "error",
							  confirmButtonText:"确定",
							  confirmButtonColor: "#ff4800",
						  },function(){
							  
							  //window.location.href="index.html"  
							  //设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
							  setTimeout(function(){
								window.location.href="34-Land.html"  
							  }, 500);
						  });

					}
					else{
						swal({
							title: "",
							text: ''+info+'',
							html: true,
							type: "error",
							confirmButtonText:"确定",
							confirmButtonColor: "#ff4800",
						});
					}
					return
				}
				
				obj.hide();
				var btnNode='<div><img src="images/hong_ok.png"/> 已领取</div>';
				obj.parent().append(btnNode);
				
				
			}
	});
};