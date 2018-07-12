$('#userMobil').val(mobile);
/**修改收手机号码**/
$('#userMobil').blur(function(){
	
	var mobile = $('#userMobil').val();//手机号码
	var isMobile=/^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;//手机号码正则表达式
	if(mobile==''){
		tanchuan_0('手机号码不能为空！','error','确定');
		return false;
	}else if(!isMobile.test(mobile)){
		tanchuan_0('手机号码不正确！','error','确定');
		return false;
	}else{
		$('#Posyanzhen').css({
			'background':'#ff4800'
		})
	}
	
});

$('#Posyanzhen').click(function(){
	var mobile = $('#userMobil').val();//手机号码
	if(mobile==''){
		tanchuan_0('请先绑定手机号码','success','确定');
		return false;
	}
	$.ajax({
		type:"POST",
		url:urlPost+"/Verify/getVerify",
		data:{
			user_token:user,
			cellphone:mobile,
			type:3
		},
		dataType:'json',
		success:function(data){
			if(data['code']=='200'){
				tanchuan_0('发送成功！','success','确定');
				$('#Posyanzhen').css({
					'background':'#ccc',
				})
				$('#Posyanzhen').text('已发送');
				
			}else{
				tanchuan_0(data['info'],'error','确定');
				return;
			}
		}
	});
	
});
//发送新手机 验证码
$('#Posyanzhen2').click(function(){
	var mobile = $('#userMobil3').val();//手机号码
	if(mobile==''){
		return false;
	}
	$.ajax({
		type:"POST",
		url:urlPost+"/Verify/getVerify",
		data:{
			user_token:user,
			cellphone:mobile,
			type:3,
			status:1
		},
		dataType:'json',
		success:function(data){
			if(data['code']=='200'){
				tanchuan_0('发送成功！','success','确定');
				$('#Posyanzhen2').css({
					'background':'#ccc',
				})
				$('#Posyanzhen2').text('已发送');
				
			}else{
				tanchuan_0(data['info'],'error','确定');
				return;
			}
		}
	});
	
});
$('#mo_xiug').click(function(){
	var mobile = $('#userMobil').val();//手机号码
	var yanzhen_xg = $('#yanzhen_xg').val();//验证码
	var isMobile=/^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;//手机号码正则表达式
	if(yanzhen_xg==''){
		tanchuan_0('请发送验证码！','error','确定');
		return false;
	}else if(mobile==''){
		tanchuan_0('手机号码不能为空！','error','确定');
		return false;
	}else if(!isMobile.test(mobile)){
		tanchuan_0('手机号码不正确！','error','确定');
		return false;
	}else if(yanzhen_xg ==''){
		tanchuan_0('手机验证码不能为空！','error','确定');
		return false;
	}
		$.ajax({
		type:"POST",
		url:urlPost+"/Verify/checkVerify",
		data:{
			user_token:user,
			cellphone:mobile,
			type:3,
			verify:yanzhen_xg
		},
		dataType:'json',
		success:function(data){
			if(data['code']==200){
				$('.cheke_1').hide();
				$('.cheke_2').show();
				$('#mo_xiug').hide();
				$('#mo_xiug2').show();
				tanchuan_0('验证通过、请验证新手机！','success','确定');
			}else{
				tanchuan_0(data['info'],'error','确定');
				return;
			}
		}
	});
	return false;
});

$('#mo_xiug2').click(function(){
	var mobile = $('#userMobil3').val();//手机号码
	var yanzhen_xg = $('#yanzhen_xg2').val();//验证码
	var isMobile=/^(?:13\d|15\d|18\d)\d{5}(\d{3}|\*{3})$/;//手机号码正则表达式
	if(yanzhen_xg==''){
		tanchuan_0('请发送验证码！','error','确定');
		return false;
	}else if(mobile==''){
		tanchuan_0('手机号码不能为空！','error','确定');
		return false;
	}else if(!isMobile.test(mobile)){
		tanchuan_0('手机号码不正确！','error','确定');
		return false;
	}else if(yanzhen_xg ==''){
		tanchuan_0('手机验证码不能为空！','error','确定');
		return false;
	}
		$.ajax({
		type:"POST",
		url:urlPost+"/Verify/checkVerify",
		data:{
			user_token:user,
			cellphone:mobile,
			state:1,
			type:3,
			verify:yanzhen_xg
		},
		dataType:'json',
		success:function(data){
			if(data['code']==200){
				window.localStorage.mobile = mobile;//覆盖手机号码
				location.href="28-my-data.html";

			}else{
				tanchuan_0(data['info'],'error','确定');
				return;
			}
		}
	});
	return false;
});