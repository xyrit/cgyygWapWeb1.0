//获得验证码 token
var verify_token ='';
var Formobile; //手机号码
function yanzhenToken(){
	$.ajax({
		type:"post",
		url:urlPost+"/User/verify_token",
		data:{},
		dataType:'json',
		success:function(data){
			verify_token= data['encrypt_key'];//验证码token
			//window.localStorage.encrypt_key = encrypt_key;//保存验证码token
			if(data['code']==200){
				yanzhen('#ForimgcaptchaBox');//调用验证码
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
$('#Forclick_qhimg2').click(function(){
	captcha($("#ForimgcaptchaBox"));
});

	//点击切换验证码
function captcha(click_img){
	
	var url_img = urlPost+"/User/verify_code?session_id="+verify_token+'&random='+Math.random();
	
	$(click_img).attr('src',url_img);
}

//验证手机号码
$('#ForRegmobile').blur(function(){
	mobileblur($(this),'#Forpostverify');
});

var InterValObj;//timer变量，控制时间
var count = 120; //间隔函数，1秒执行
var curCount;//当前剩余秒数

function sendMessage() {
     var mobileblur = $('#Formobile').val();//判断手机号码不能为空 必须格式正确 才发送验证码
		var postverify = $('#Forimgverify').val();
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
			url:urlPost+"/Verify/getVerify",
			data:{
				cellphone:$('#Formobile').val(),
				state:1,
				captcha:$('#Forimgverify').val(),
				session_id:verify_token,
				type:2
			},
			dataType:'json',
		success:function(data){
			if(data['code']!=200){
				tanchuan_0(data['info'],'error','确定');
				captcha('#ForimgcaptchaBox');//重新生成验证码
			}else{
				tanchuan_0('发送成功','success','确定');
				 curCount = count;
			     $("#Forpostverify").attr("disabled", "true");
			     $("#Forpostverify").val(curCount + "秒内输入验证码");
			     InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
			}
		}
	});
}
function SetRemainTime() {
            if (curCount == 0) {                
                window.clearInterval(InterValObj);
                $("#Forpostverify").removeAttr("disabled");
                $("#Forpostverify").val("重新发送");
                $("#Forpostverify").css({'background':'#ff4800'});
            }
            else {
                curCount--;
                $("#Forpostverify").css({'background':'#A0A0A0'});
                $("#Forpostverify").val(curCount + "秒内输入验证码");
                
            }
        }



//提交验证手机不为空
$('#ForRegister_mobile').click(function(){
	Formobile = $('#Formobile').val();
			$.ajax({
				type:"post",
				url:urlPost+"/Verify/checkVerify",
				data:{
					cellphone:Formobile,
					status:1,
					captcha:$('#Forimgverify').val(),
					session_id:verify_token,
					type:2,
					verify:$('#ForRegverify').val()
				},
				dataType:'json',
				success:function(data,zhauntai){
						if(data['code']==200){
							var mobile_token = data['mobile_token'];
							$('#Formobile_tokenMd5').val(mobile_token);
							tanchuan_0('验证通过请输入密码！','success','确定');
						}else{
							tanchuan_0(data['info'],'error','确定');
							return false;
						}
						$('#zhaopasschek').hide();
						$('#ForRegister_mobile').hide();
						//显示密码
						$('#zhaopasswod').show();	
				}
			});
		return false; 
	});
//密码判断
$('#ForRegister').click(function(){
		var Regmobile = $('#hidemobile').val();
		var Regpassword = $('#Forpassword').val();
		var Regrepassword = $('#Forrepassword').val();
		if(Regpassword=='' || Regrepassword==''){
			tanchuan_0('请输入完整信息！','error','确定');
			return false;
		}
		if(Regpassword.length < 6 ||  Regpassword.length > 20){
			tanchuan_0('请输入6-20位密码！','error','确定');
			return false;
		}
		if(Regpassword!=Regrepassword){
			tanchuan_0('两次密码不一致！','error','确定');
			return false;
		}
		$.ajax({
			type:"post",
			url:urlPost+"/ucenter/upPassword",
			data:{
				cellphone:Formobile,
				newpassword:$.md5(Regpassword),
				renewpassword:$.md5(Regrepassword),
				status:1
			},
			dataType:'json',
			success:function(data){
				if(data['code']=='200'){
					tanchuan_1('修改成功！','success','确定','34-Land.html');
				}else{
					tanchuan_0(data['info'],'error','确定');
					return false;
				}
			}
		});
		return false;
});