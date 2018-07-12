
var user = window.localStorage.user_token;
// var path = window.localStorage.path;//取出头像地址
// var mobile = window.localStorage.mobile;//取出头手机号码

//判断是不是微信浏览器
var useragent = navigator.userAgent;
function setWeixin(){
	if(useragent.match(/MicroMessenger/i) == 'MicroMessenger'){
		/*取出数据 */
		//var user 	 = window.localStorage.user_token;//用户唯一标识
		var nickname = window.localStorage.nickname;//微信名称
		var uid      = window.localStorage.uid;//用户uid
		var path     = window.localStorage.path;//微信头像地址

		if(path!='' || nickname!='' ||user!='' ){
			$('#user_path').attr('src',path);//替换微信头像
			$('#nickname').text(nickname);//替换名称
		}
	}
}
//setWeixin();

//判断用户有没有登陆！
	if(user){
		userIno();//取出用户信息
	}else{
		//window.location='banding_mobile.html';//跳转绑定手机页面
		if(useragent.match(/MicroMessenger/i) == 'MicroMessenger'){
			
			tanchuan_1('您没有绑定手机,请先绑定！','error','确定','banding_mobile.html');//跳转绑定手机页面
		}else{
			tanchuan_1('您没有登录,请先登录！','error','确定','34-Land.html');//跳转登录注册
		}
	}

//获取个人信息
function userIno(){
	$.ajax({
			type:"POST",
			url:urlPost+"/ucenter/userInfo",
			data:{
				user_token:user
			},
			dataType:'json',
			success:function(data){
				/**
				 * 个人信息获取
				 * 待续
				 * **/
				 
				if(data['code']==517){
					localStorage.clear();
					if(useragent.match(/MicroMessenger/i) == 'MicroMessenger'){
						tanchuan_1('您没有登录,请先登录！','error','确定','banding_mobile.html');//跳转绑定手机页面
					}else{
						tanchuan_1('您没有登录,请先登录！','error','确定','34-Land.html');//跳转登录注册
					}
				}
				if(data['code']!=200){
					localStorage.clear();
					tanchuan_0(data['info'],'error','确定');
					return;
				}
				var nickname = data['list']['nickname'];//用户名称
				var mobile 	 = data['list']['mobile'];//手机号码
				var uid   	 = data['list']['uid'];//用户id
				var account  = data['list']['account'];//用户余额
				var face	 = data['list']['face'];//用户头像
				var phost	 = data['list']['phost'];//头像地址前缀
				if(face){
					var p = picHostUrl(phost,face);//此函数定义在common.js函数中
					$('#user_path').attr('src',p);
					$('#sltIMG').attr('src',p);
				}
				window.localStorage.nickname = nickname;//保存用户名称
				window.localStorage.mobile = mobile;//保存手机
				window.localStorage.uid = uid;//保存用户id
				window.localStorage.account = account;//保存用户余额
				
				$('#nickname').text(nickname);//设置新的用户名
				
				//设置余额
				var account = window.localStorage.account;
				$('#account').text(parseInt(account));
				
			}
		});	
}
