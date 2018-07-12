$('.text-red').text(parseInt(account));//余额赋值
/**余额选中样式**/
	$('#ulOption li').click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			//$(this).children('a').css('border:','solid #ff4800');
			var find = $(this).find('a');
			$('#ulOption li a').removeClass('activeBoder');
			find.addClass('activeBoder');
			$('#qitamoni').val('');//清空其他金额	
	});
	/**充值金额 判断**/
	$('#qitamoni').focus(function() { 
		$('#ulOption li').removeClass('active');
		$('#ulOption li a').removeClass('activeBoder');
	}); 
	function chekice(){
		var  te = $('#ulOption li.active').hasClass("active");
		var money = $('#ulOption li.active a').text();//获取充值金额
		var qitamoni = $('#qitamoni').val();
		var payment = $('#payment input').val();
		
		//判断充值金额必须选择
		if(qitamoni==''){
			if(te==false){
			tanchuan_0('请选择充值金额！','error','确定');
				return false;
			}
		}else{
			money=$('#qitamoni').val();//把其他金额赋值给 money
		}
		/*
		 * 获取支付方式
		 * 1 为支付宝 
		 * 2 为微信支付
		 */
		$.ajax({
			type:"post",
			url:urlPost+"/ucenter/recharge",
			dataType:'json',
			data:{
				user_token:user,
				charge_type:1,
				money:money
			},
			success:function(data){
				var charge_token = data['charge_token'];
				if(charge_token!=''){
					window.location.href=''+urlPost+'/YunPay/charge?charge_token='+charge_token;
				}else{
					tanchuan_0(data['info']);
				}
				
			}
		});
		return false;
	}