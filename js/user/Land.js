//获得验证码 token
var verify_token = '';
function yanzhenToken(){
	$.ajax({
		type:"post",
		url:urlPost+"/User/verify_token",
		data:{},
		dataType:'json',
		success:function(data){
			verify_token = data['encrypt_key'];//验证码token
			//window.localStorage.encrypt_key = encrypt_key;//保存验证码token
			if(data['code']==200){
				yanzhen('#imgcaptchaBox2');//调用验证码
				yanzhen('.imgcaptchaBox');//调用验证码
			}
		}
	});
	
}
yanzhenToken();
//图形验证码
function yanzhen(yanzhenma){
	var url_img = urlPost+"/User/verify_code?session_id="+verify_token+'&random='+Math.random();
	$(yanzhenma).attr("src",url_img);
}

//图片验证码
//yanzhen('#imgcaptchaBox2');

//点击文字切换
$('#click_qhimg').click(function(){
	captcha($("#imgcaptchaBox2"));
});
	//点击切换验证码
function captcha(click_img){
	
	var url_img = urlPost+"/User/verify_code?session_id="+verify_token+'&random='+Math.random();
	
	$(click_img).attr('src',url_img);
}
//登陆验证
var load = GetQueryString('load');
function loginche(){
	var user = $('#user').val();
	var pass = $('#pass').val();
	var verify = $('#imgverify2').val();
	var isMobile=/^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;//手机号码正则表达式
	//用户名检测
	if(user ==''){
		tanchuan_0('请输入手机号码！','error','确定');
		return false;
	}else if(!isMobile.test(user)){
	       tanchuan_0('手机号码不正确！','error','确定');
	        return false; 
	} 
	//密码检测
	if(pass ==''){
		tanchuan_0('请输入密码！','error','确定');
		return false;
	}
	//验证码
	if(verify==''){
		tanchuan_0('请输入验证码！','error','确定');
		return false;
	}
	$.ajax({
			type:"post",
			url:urlPost+"/User/login",
			data:{
				mobile:$('#user').val(),
				password:$.md5($('#pass').val()),
				captcha:$('#imgverify2').val(),
				session_id:verify_token,
				load:load
				},//手机号码
				dataType:'json',
				success:function(data){
					if(data['code']!=200){
						tanchuan_0(data['info'],'error','确定');
						captcha('#imgcaptchaBox2');//重新生成验证码
						return false;
					}else{
						// 存储用户信息 待续
						var user_token 	= data['user']['user_token'];//user_token
						var uid 		= data['user']['uid'];//uid
						var nickname 	= data['user']['nickname'];//名称
						window.localStorage.user_token = user_token;//用户唯一标识
						window.localStorage.uid 	   = uid;//uid
						window.localStorage.nickname   = nickname;//名称
						var load 	= data['user']['load'];//判断类型
						var ucenter_url 	= data['user']['ucenter_url'];//跳转地址
						if(load==0){
							window.localStorage.ucenter_url = ucenter_url;//加载地址
							location.href="index.html";
						}else{
							location.href=ucenter_url;
						}
						
						
					}
				}
			});	
	return false;
}
//enter键时调用登录函数
$("input").keypress(function(e) {
	if (e.which == 13) {
	   loginche();
	}
});
