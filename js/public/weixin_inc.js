//获取微信用户token
var token =GetQueryString('token');
if(token){
	window.localStorage.token = token;//用户信息凭证
}
/**取出微信用户信息**/
function  Requesting(){
		$.ajax({
			type:"post",
			url:urlPost+"/User/getInfo",
			data:{
				token:token
			},
			async: false,
			dataType:'json',
			success:function(data){
				if(data['code']==200){
					// var nickname   = data['user']['nickname'];//微信名称
					// var path 	   = data['user']['path'];//微信头像地址		
					// var uid 	   = data['user']['uid'];//用户uid
					var user_token = data['user']['user_token'];//用户 usertoken 令牌
					//var mobile     = data['user']['mobile'];//用户 手机号码
					/*保存用户信息*/
					if(user_token){
						window.localStorage.user_token = user_token;//用户唯一标识
					}
					
					// window.localStorage.nickname   = nickname;//微信名称
					// window.localStorage.uid   	   = uid;//用户uid
					// window.localStorage.path   	   = path;//微信头像地址
					// window.localStorage.mobile     = mobile;//用户手机
					/*取出数据 赋值变量
					var user 	 = window.localStorage.user;//用户唯一标识
					var nickname = window.localStorage.nickname;//微信名称
					var uid      = window.localStorage.uid;//用户uid
					var path     = window.localStorage.path;//微信头像地址
					*/
				}
			}
		});
	}
if(token!=null){//获取token 不为空的情况下 获取微信个人信息
	Requesting();//获取微信个人信息
}
var user = window.localStorage.user_token;