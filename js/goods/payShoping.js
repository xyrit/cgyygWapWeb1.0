var cart;//商品全局变量
var user_account;//个人金额全局变量
var shijimoni = 0;//定义第三方支付金额变量
var usermoni = -1;//设置为不使用余额支付 全局变量
//发送ajax 请求购物车 数据
function payGoodsList(){
	$.ajax({
		type:"post",
		url:urlPost+"/Shopcart/index",
		data:{
			user_token:user
		},
		dataType:"json",//指定json类型 
		success:function(data){
			//请求失败不加载数据
			if(data['code']!=200){
				tanchuan_0(data['info'],'error','确定');
				return false;
			}
			 cart 		= data['cart']['info'];//购物车数组
			var goodsNum= data['cart']['total'];//购物车数量
			var host	= data['host'];//图片地址前缀
			//开始循环数据
			var payList='';//定义一个字符串
			var num = 0;
			for (var i=0;i<cart.length;i++){
					 var id 			= cart[i]['id'];
					 var lottery_id 	= cart[i]['lottery_id'];
					 var attend_count   = cart[i]['attend_count'];
					 var price 			= cart[i]['price'];//价格
					 var title			= cart[i]['title'];//商品标题
					 var lottery_id 	= cart[i]['lottery_id'];//幸运id
					 var cover_id 		= cart[i]['cover_id'];
					 var path 			= cart[i]['path'];
					 var pid 			= cart[i]['goodid'];
					 var buy_count 		= cart[i]['buy_count'];
					 var need_count 	= cart[i]['need_count'];
					 var remain_count 	= cart[i]['remain_count'];

				payList+='<div class="issue position-re row">';
				payList+='<div class="goodsImg">';
				payList+='<a href="3_goods-ing.html?pid='+pid+'&lottery_id='+lottery_id+'">';
				payList+='<img src="'+host+'/'+path+'"/>';
				payList+='<span style="width: 70%;height:35px;overflow: hidden;" class="padding-l-r-1 lg_20px">'+title+'</span>';
				payList+='<span class="position-ab issue_nm padding-l-r-1"><span class="text-red">'+attend_count+'</span>&nbsp;人次</span></a>';
				payList+='</div><div class="goodstite"></div></div>';
				num+=+attend_count;
			}

			$('#payShopingList').append(payList);//插入dome	
			$('#payNumtext').text(num);//总金额

		//请求用户余额
			$.ajax({
				type:"post",
				url:urlPost+"/ucenter/MyAccount",
				data:{
					user_token:user
				},
				dataType:'json',
				success:function(data){
					if(data['code']==200){
						user_account=parseInt(data['list']['account']);
						$('#userAccount').text(user_account);//个人金额
						if($('#userAccount').text()==0){
							$('#userAccount').text('0');//个人金额
							$('#goodsMoney').text(num);//赋值给第三方支付
							$('#inlineCheckbox1').attr('disabled','true' );//余额为0禁止余额支付按钮
						}else if(parseInt(user_account)>=parseInt(num)){//用户余额大于商品余额
							$('#goodsMoney').text(0);//清空第三方支付约
							$('#inlineCheckbox1').prop("checked",true);//设置默认 勾选约支付
							payType=-1;
							usermoni=user_account;
						}else{
							if(parseInt(user_account)<parseInt(num)){
								$('#inlineCheckbox1').prop("checked",true);//勾选约支付按钮
								shijimoni=num-user_account;//计算 商品总金额 -用户实际余额 = 第三方支付余额
								$('#goodsMoney').text(shijimoni);//赋值到第三方支付余额表单
								usermoni=user_account;
							}
							payType=0;
						}
					}
				}
			});	
		},
	});
}
payGoodsList();//获取购物车信息 
$('#inlineCheckbox1').click(function(){
	
	var payNumtext = parseInt($('#payNumtext').text());//商品总金额
	var userAccount = parseInt($('#userAccount').text());//用户账户余额

	if($(this).is(':checked')){
		usermoni=user_account;//把用户余额传过去
		$('#goodsMoney').text(shijimoni);//赋值给第三方支付金额
	}else{
		usermoni=-1;//用余额支付 =-1 为第三方支付
		$('#goodsMoney').text(payNumtext);//恢复商品金额
	}
	if(parseInt(payNumtext)>parseInt(userAccount)){
		shijimoni=payNumtext-userAccount;//如果商品金额大于用户金额的时候 则把商品金额-用户金额 赋值给第三方支付金额
		//usermoni=-1;//第三方支付
	}
});
//提交付款
//var j=0;

function payMoney(){
	var payType = 0;
	var gdmoniy = $('#payNumtext').text();//第三方支付余额
	var payMoney = $('#goodsMoney').text();//
	var shoparray = [];
	var postdata =[];
		if(payMoney>0){//如果第三方支付余额大于0 设置为1 为第三方支付
			payType=1;
			//usermoni=-1;//第三方支付
		}
		$.ajax({
		type:"post",
		url:urlPost+"/Shopcart/index",
		data:{
			user_token:user
		},
		dataType:"json",//指定json类型 
		success:function(data){
			//请求失败不加载数据
			if(data['code']!=200){
				tanchuan_0(data['info'],'error','确定');
				return false;
			}
		//验证商品参与信息是否有效 
		 	for (var i=0;i<cart.length;i++) {
			 	 var id 			= cart[i]['id'];//购物车id
				 var lottery_id 	= cart[i]['lottery_id'];//期货id
				 var pid			= cart[i]['goodid'];//商品id
				 var attend_count   = cart[i]['attend_count'];//参与次数
				 var name 			= cart[i]['title'];//商品名称
		
				postdata[i] = {id:""+id+"",lottery_id:""+lottery_id+"",pid:""+pid+"",attend_count:""+attend_count+"",name:""+name+""};//组装json数据
		 	}
		 	var r = "{\"list\"" + ":" + $.toJSON(postdata)+"}";//转换json	 
			$.ajax({
					type:"post",
					url:urlPost+"/Lottery/validateAttend",
					data:{
						user_token:user,
						money:gdmoniy,
						payMoney:payMoney,
						balance:usermoni,
						payType:payType,
						attendDevice:'移动网站',
						content:r
					},
					dataType:'json',
					success:function(data){
						var pay_token = data['pay_token'];//支付令牌
						if(typeof(pay_token)=='undefined'){
							//alert('余额支付');
							addgoodsPay(gdmoniy,payMoney,usermoni,payType,r);
						}else{
							//alert('第三方支付');
							location.href =''+urlPost+'/YunPay/payfor?pay_token='+pay_token+'';

						}
					}
		    	});		 	
		
		  }
		});
}
//添加参与记录
function addgoodsPay(gdmoniy,payMoney,usermoni,payType,r){
	$.ajax({
			type:"post",
			url:urlPost+"/Lottery/addAttendLottery",
			data:{
				user_token:user,
				money:gdmoniy,
				payMoney:payMoney,
				balance:usermoni,
				payType:payType,
				attendDevice:'移动网站',
				content:r
			},
			dataType:'json',
			success:function(data){
				if(data['code']==200){
					location.href="19-result.html";
				}else{
					tanchuan_0(data['info'],'error','确定');
				}
			}
	});		
}