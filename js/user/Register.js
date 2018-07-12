//获得验证码 token
var verify_token ='';
var glo_invite_code;//邀请码
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
				yanzhen('#imgcaptchaBox');//调用验证码
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

//点击文字切换
$('#click_qhimg2').click(function(){
	captcha($("#imgcaptchaBox"));
});

	//点击切换验证码
function captcha(click_img){
	
	var url_img = urlPost+"/User/verify_code?verify_token="+verify_token+'&random='+Math.random();
	
	$(click_img).attr('src',url_img);
}
//验证手机号码
$('#Regmobile').blur(function(){
	mobileblur($(this),'#postverify');
});

var InterValObj;//timer变量，控制时间
var count = 120; //间隔函数，1秒执行
var curCount;//当前剩余秒数

function sendMessage() {
     var mobileblur = $('#Regmobile').val();//判断手机号码不能为空 必须格式正确 才发送验证码
		var postverify = $('#imgverify').val();
		if(mobileblur==''){
			tanchuan_0('请输入手机号码！','error','确定');
			return false;
		}
		if(postverify=='' ){
			tanchuan_0('请输入验证码！','error','确定');
			return false;
		}
		$.ajax({
			type:"post",
			url:urlPost+"/User/register_check",
			data:{
				session_id:verify_token,
				mobile:$('#Regmobile').val(),
				captcha:$('#imgverify').val()
			},
			dataType:'json',
		success:function(data){

			if(data['code']!=200){
				tanchuan_0(data['info'],'error','确定');
				captcha('#imgcaptchaBox');//重新生成验证码
				return false;
			}else{
				tanchuan_0('发送成功','success','确定');
				 curCount = count;
			     $("#postverify").attr("disabled", "true");
			     $("#postverify").val(curCount + "秒内重发");
			     InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
			}
		}
	});
     
    

}

function SetRemainTime() {
            if (curCount == 0) {                
                window.clearInterval(InterValObj);
                $("#postverify").removeAttr("disabled");
                $("#postverify").val("重新发送");
                $("#postverify").css({'background':'#ff4800'});
            }
            else {
                curCount--;
                $("#postverify").css({'background':'#A0A0A0'});
                $("#postverify").val(curCount + "秒内重发");
                
            }
        }
//提交验证手机不为空
$('#Register_mobile').click(function(){
		var Regmobile = $('#Regmobile').val();
		var imgverify = $('#imgverify').val();
		var Regverify = $('#Regverify').val();
		var invite_code = $('#invite_code').val();//邀请码
		if(Regmobile=='' || imgverify=='' || Regverify==''){
			tanchuan_0('请输入完整信息','error','确定');
			return false;
		}else{
			$.ajax({
				type:"post",
				url:urlPost+"/User/verify",
				data:{
					mobile:Regmobile,
					captcha:imgverify,
					verify:Regverify,
					session_id:verify_token
				},
				dataType:'json',
				success:function(data,zhauntai){
						if(data['code']==200){
							glo_invite_code=invite_code;//把邀请码赋值给全局变量
							var mobile_token = data['mobile_token'];
							$('#mobile_tokenMd5').val(mobile_token);
							tanchuan_0('验证通过！','success','确定');
						}else{
							tanchuan_0(data['info'],'error','确定');
							return false;
						}

						$('#Register_mobile').hide();
						//显示密码
						$('.textpass1').hide();
						$('.textpass2').show();
						$('#Register_mobile2').show();
						
				}
			});
		}

		return false; 
	});
	
//注册判断
function zhucecheke(){
		var Regmobile = $('#Regmobile').val();
		var Regpassword = $('#Regpassword').val();
		var Regrepassword = $('#Regrepassword').val();
		if(Regpassword=='' || Regrepassword==''){
			tanchuan_0('请输入完整信息！','error','确定');
			return false;
		}
		//var passReg=/^\w{6,20}$/;//6-20位字符
		
		if(Regpassword!=Regrepassword){
			tanchuan_0('两次密码不一致！','error','确定');
			return false;
		}
		if(Regpassword.length<6 || Regpassword.length>20){
			tanchuan_0('请输入6-20位密码！','error','确定');
			return false;
		}
		var token = $('#mobile_tokenMd5').val();
		$.ajax({
			type:"post",
			url:urlPost+"/User/register",
			data:{
				mobile_token:token,
				password:Regpassword,
				repassword:Regrepassword,
				invite_code:glo_invite_code
			},//传递数据
			dataType:'json',
			success:function(data){
				var user_token = data['user']['user_token'];//用户token
				if(data['code']=='200'){
					$('#mobile_tokenMd5').remove();
					//保存用户名
					localStorage.setItem("mobile", Regmobile);
					localStorage.setItem("user_token", user_token);//保存用户token 默认登录
					location.href="index.html";
				}else{
					tanchuan_0(data['info'],'error','确定');
					return false;
				}
				
			}
		});
		return false;
}

//enter键时调用登录函数
$("input").keypress(function(e) {
	if (e.which == 13) {
	   zhucecheke();
	}
});