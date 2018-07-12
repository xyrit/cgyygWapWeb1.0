$('#element_id').cxSelect({
    url: 'js/cityData.min.json',               // 如果服务器不支持 .json 类型文件，请将文件改为 .js 文件
    selects: ['province', 'city', 'area'],  // 数组格式，请注意顺序
    nodata: 'none'
  });
$('#dizhi_mobile2').val(mobile);//绑定手机号码

if(mobile){
  $('#dizhi_mobile2').val('已绑定手机：'+mobile);
  $('#dizhi_mobile2').css({'border':'none','text-indent':'0','padding':'0','box-shadow':'none'});
  $('#dizhi_mobile2').css('background','none');
}
  var id = GetQueryString('id');
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
	}
	});

var InterValObj;//timer变量，控制时间
var count = 120; //间隔函数，1秒执行
var curCount;//当前剩余秒数

function SetRemainTime() {
            if (curCount == 0) {                
                window.clearInterval(InterValObj);
                $("#dizhiverify_site").removeAttr("disabled");
                $("#dizhiverify_site").text("重新发送");
                $("#dizhiverify_site").css({'background':'#ff4800'});
            }
            else {
                $("#dizhiverify_site").css({'background':'#A0A0A0'});
                $("#dizhiverify_site").text(curCount + "秒内重发");
                curCount--;
                
            }
        }
 //获取当前地址信息       
if(user){
  $.ajax({
    type:"POST",
    url:urlPost+"/Address/addressList",
    data:{
      user_token:user,
      addressid:id
    },
    dataType:"json",//指定json类型 
    success:function(data){
        var code=data['code'];
        var info=data['info'];
        if(code!=200){
          tanchuan_0(info,'error','确定');
          return false;
        }

        var address=data['address'];

          var realname  = address[0]['realname'];//姓名
          var cellphone = address[0]['cellphone'];//手机
          var province  = address[0]['province'];//省份
          var addressy  = address[0]['address'];//详细地址
     
        $('#dizhi_name').val(realname);//姓名
        $('#dizhi_mobile').val(cellphone);//手机号码
        $('#xdizhi_test').val(addressy);//详细地址
        $('.province').val(province);//省份
   }
  });
}

//发送验证码
$('#dizhiverify_site').click(function(){

	var dizhi_mobile =$('#dizhi_mobile2').val();
	var province     = $('#element_id select').val();//省份
	var city    	 = $('#city').val();//城市
	if(province==''){
		tanchuan_0('请填写收货地址','error','确定');
				return false;
	}
	if(city==''){
		tanchuan_0('请填写城市','error','确定');
		return false;
	}
    $.ajax({
      type:'post',
      url:urlPost+'/Verify/getVerify',
      data:{
        user_token:user,
        cellphone:mobile,
        type:5
      },
      dataType:'json',
      success:function(data){
          if(data['code']==200){
            tanchuan_0('验证码发送成功','success','确定');
			curCount = count;
			     $("#dizhiverify_site").attr("disabled", "true");
			     $("#dizhiverify_site").text(curCount + "秒内重发");
			     InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
          }
      }
    });
});
//提交修改
$('#dizhicheki_xiugai').click(function(){
    var dizhi_mobile = $('#dizhi_mobile').val();//手机号码
    var province     = $('#element_id select').val();//省份
    var city         = $('#city').val();//城市
    var areay        = $('#area').val();//城区
    var xdizhi_test  = $('#xdizhi_test').val();//详细地址
    var dizhi_name   = $('#dizhi_name').val();
    var dizhi_verify = $('#dizhi_verify').val();
    
    if(province==''){
      tanchuan_0('请填写收货地址','error','确定');
        return false;
      }
      if(city==''){
        tanchuan_0('请填写城市','error','确定');
        return false;
      }
      
      if(dizhi_name=='' || dizhi_mobile=='' || xdizhi_test=='' || dizhi_verify==''){
        tanchuan_0('请填写完整信息','error','确定');
        return false;
      }
    $.ajax({
      type:"POST",
      url:urlPost+"/Address/addressSave",
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
        id:id
      },
      dataType:'json',
      success:function(data){
        if(data['code']=='200'){
          tanchuan_1('修改成功!','success','确定','28-my-data-4.html');
        }else{
          tanchuan_0(data['info'],'error','确定');
        }
      }
    });
});