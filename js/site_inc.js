$('#element_id').cxSelect({
	  url: 'js/cityData.min.json',               // 如果服务器不支持 .json 类型文件，请将文件改为 .js 文件
	  selects: ['province', 'city', 'area'],  // 数组格式，请注意顺序
	  nodata: 'none'
	});
	/**切换验证码**/
$('#click_yanzhenimg').click(function(){
	captcha('.imgcaptchaBox');
});
if(mobile){
	$('#dizhi_mobile').val('已绑定手机：'+mobile);
	$('#dizhi_mobile').css({'border':'none','text-indent':'0','padding':'0','box-shadow':'none'});
	$('#dizhi_mobile').css('background','none');
}

/*获取收获地址*/
	if(!user==''){
	$.ajax({
		type:"POST",
		url:urlPost+"/Address/addressList",
		data:{
			user_token:user
		},
		dataType:"json",//指定json类型 
		success:function(data){
        var code=data['code'];
        var info=data['info'];
        if(code!=200){
        	tanchuan_0(info,'error','确定');
        	return false;
        }
        var address_num=data['address_num'];
	    	var remain=data['remain'];
	      var address=data['address'];
        var addressStr='';
		for (var i=0;i<address.length;i++) {
			var id 		  	= address[i]['id'];//id
			var realname  = address[i]['realname'];//姓名
			var cellphone = address[i]['cellphone'];//手机
			var province  = address[i]['province'];//省份
			var city	    = address[i]['city'];//城市
			var area 	    = address[i]['area'];//区域
			var addressy  = address[i]['address'];//详细地址
			var status    = address[i]['status'];//默认地址
			
				addressStr+='<a href="28-my-data-4-1.html?id='+id+'" class="position-ab icon-edit icta posi_img" style="">';
				addressStr+='<span style="color:#fff;font-size:12px;text-indent: -9999px;">'+id+'</span>';
				addressStr+='</a>';
				addressStr+='<div class="add_name"><span class="userName">'+realname+'</span>';
				addressStr+='&nbsp;&nbsp;<span class="userMobile">'+cellphone+'</span>';
				addressStr+='</div><div class="lg_22px add_add row">';
				addressStr+='<span class="province padding-l-r-1">'+province+'</span>';
				addressStr+='<span class="city padding-l-r-1">'+city+'</span>';
				addressStr+='<span class="area padding-l-r-1">'+area+'</span>';
				addressStr+='<span class="address padding-l-r-1">'+addressy+'</span>';
				addressStr+='</div><div class="checkbox position-re add_add_foot">';
				addressStr+='<label>';

			if(status==1){
				
				addressStr+='<input type="radio" name="optionsRadios" class="optionsRadios2" onclick="Default('+id+')" value="option2">设置默认地址</label>';
			
			}else{

				addressStr+='<input type="radio" checked="checked" name="optionsRadios" class="optionsRadios2" onclick="Default('+id+')" value="option2">设置默认地址</label>';
			}
				addressStr+='<a href="javascript:removeDizhi('+id+');" class="position-ab icta posi_img" style="right:10px;font-size:12px;color:#3C5EE0;right:7px">删除';
				addressStr+='<span style="color:#fff;font-size:12px;text-indent: -9999px;">'+id+'</span>';
				addressStr+='</a></div>';
		}
		$('#keep').text(address_num);
		$('#gpcekeep').text(remain);
		$('#dizhi_List').append(addressStr);
		
		}
	});
	}
var InterValObj;//timer变量，控制时间
var count = 120; //间隔函数，1秒执行
var curCount;//当前剩余秒数

function SetRemainTime() {
            if (curCount == 0) {                
                window.clearInterval(InterValObj);
                $("#postverify_site").removeAttr("disabled");
                $("#postverify_site").text("重新发送");
                $("#postverify_site").css({'background':'#ff4800'});
            }
            else {
                $("#postverify_site").css({'background':'#A0A0A0'});
                $("#postverify_site").text(curCount + "秒内重发");
                curCount--;
                
            }
        }

/**发送手机验证码**/
$('#postverify_site').click(function(){
		var dizhi_mobile = $('#dizhi_mobile').val();//手机号码
		var province     = $('#element_id select').val();//省份
		var city    	 = $('#city').val();//城市
		var areay        = $('#area').val();//城区
		if(province==''){
			tanchuan_0('请填写收货地址','error','确定');
				return false;
			}
			if(city==''){
				tanchuan_0('请填写城市','error','确定');
				return false;
			}
			if(dizhi_mobile==''){
				tanchuan_0('请先绑定手机号码!','error','确定');
				return false;
			}
	
		$.ajax({
			type:"post",
			url:urlPost+"/Verify/getVerify",
			data:{
				user_token:user,
				cellphone:mobile,
				type:4
			},
			dataType:'json',
			success:function(data){
				if(data['code']==200){
					curCount = count;
			     $("#postverify_site").attr("disabled", "true");
			     $("#postverify_site").text(curCount + "内重发");
			     InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
				}else{
					tanchuan_0(data['info'],'error','确定');
					return false;
				}
			},
		});
		return false;
});

/**添加收货地址**/
$('#dizhicheki').click(function(){
		var dizhi_verify = $('#dizhi_verify').val();
		var dizhi_name = $('#dizhi_name').val();//姓名
		var dizhi_mobile = $('#dizhi_mobile2').val();//手机号码
		var province     = $('#element_id select').val();//省份
		var city    	 = $('#city').val();//城市
		var areay        = $('#area').val();//城区
		var xdizhi_test  = $('#xdizhi_test').val();//详细地址
		if(province==''){
				tanchuan_0('请填写收货地址!','error','确定');
				return false;
			}
			if(city==''){
				tanchuan_0('请填写城市!','error','确定');
				return false;
			}
			
			if(dizhi_name=='' || dizhi_mobile=='' || xdizhi_test=='' || dizhi_verify==''){
				tanchuan_0('请填写完整信息!','error','确定');
				return false;
			}
			var poach =/^1[3|4|5|7|8]\d{9}$/;
			if(!poach.test(dizhi_mobile)){
				tanchuan_0('手机号码不正确!','error','确定');
				return false;
			}
		$.ajax({
			type:"post",
			url:urlPost+"/Address/addressAdd",
			data:{
				user_token:user,
				realname:dizhi_name,
				province:province,
				city:city,
				area:areay,
				address:xdizhi_test,
				cellphone:mobile,
				telephone:dizhi_mobile,
				verify:dizhi_verify,
				type:4
			},
			dataType:'json',
			success:function(data){

				if(data['code']=='200'){
					$('#element_id').hide();
					tanchuan_1('添加成功!','success','确定','28-my-data-4.html');
				}else{
					tanchuan_0(data['info'],'error','确定');
				}
			}
		});
		
	return false;
});


/*添加收获地址*/
$('#adddizhi').click(function(){
	if($('#keep').text()>=3){
		tanchuan_0('您最多保存3条地址信息！','error','确定');
		return false;
	}else{
		toggle('#element_id');
	}
});
/**删除收获地址**/
function removeDizhi(obj){
		var id = obj;
		if(id!==''){
			swal({
			      title: '您确认要删除吗？',
			      type: 'error',
			      showCancelButton: true,
			      confirmButtonColor: "#ff4800",
			      confirmButtonText: '确定',//成功按钮
			      cancelButtonText:'取消',//取消按钮 
			      closeOnConfirm: false 
			    },function(){
			     $.ajax({
					type:"post",
					url:urlPost+"/Address/addressDel",
					data:{
						id:id,
						user_token:user
					},
					dataType:'json',
					success:function(data){
						if(data['code']==200){
							tanchuan_1('删除成功！','success','确定','28-my-data-4.html');
						}
					},
				});
			});
		}
	}
/*设置默认地址*/
function Default(obj){
	var id = obj;
	if(id!=''){
		$.ajax({
			type:"post",
				url:urlPost+"/Address/addressSet",
				data:{
					id:id,
					user_token:user
				},
				dataType:'json',
				success:function(data){
					if(data['code']==200){
						tanchuan_0('设置默认地址成功！','success','确定');
					}
				},
		});
	}
}