/*
 * 购物车列表
 * ajax 加载数据
 */
//发送ajax 请求购物车 数据
var goodsNum;//购物车总件商品
//判断是不是微信浏览器
var useragent = navigator.userAgent;
function goodsList(){
	$.ajax({
		type:"post",
		url:urlPost+"/Shopcart/index",
		data:{
			user_token:user
		},
		dataType:"json",//指定json类型 
		beforeSend: function(){
			$(".loading").show();
		},
		success:function(data){
			$(".loading").hide();
			if(!user){
					tanchuan_1('您没有登录,请先登录！','error','确定','banding_mobile.html');//跳转绑定手机页面
			}
			//请求失败不加载数据
			if(data['code']!=200){
				tanchuan_0(data['info'],'error','确定');
				return false;
			}
			var host		=data['host'];//图片地址前缀
			var cart 		= data['cart']['info'];//购物车数组
			goodsNum		= data['cart']['count'];//购物车数量
			$('#gouwuche_numfont').text(goodsNum);//显示购物车数量
			if(cart==''){
				$('#goodscart_List').append('<p style="text-align: center;line-height:50px;">您购物车没有参与记录哦！<a style="color:#0099FF" href="index.html">立即去购买</a></p>');
				$('#total').text(0);
				$('#sumFon').text(0);

				$('#rcorners3').css({
					'background':'#ABABAB',
					'border':'1px solid #ABABAB',
				})
				$('#submitGoods').removeAttr('onclick');//去掉a标签中的onclick事件
				$('.loadingMore').hide();
				return false;
			}
			
			//开始循环数据
			var goodsList='';
			for (var i=0;i<cart.length;i++) {
					 var id 			= cart[i]['id'];
					 var pid 			= cart[i]['goodid'];
					 var attend_count   = cart[i]['attend_count'];
					 var price 			= cart[i]['price'];//价格
					 var title 			= cart[i]['title'];//商品标题
					 var lottery_id 	= cart[i]['lottery_id'];//期号
					 var cover_id 		= cart[i]['cover_id'];
					 var path 			= cart[i]['path'];
					 var goodid 		= cart[i]['goodid'];
					 var buy_count 		= cart[i]['buy_count'];
					 var need_count 	= cart[i]['need_count'];
					 var remain_count 	= cart[i]['remain_count'];
		
		goodsList+='<div class="sp_cart row">';
		goodsList+='<div class="col-md-4 col-sm-4 col-xs-4 allgood-publis-list text-center">';
		goodsList+='<a href="3_goods-ing.html?pid='+pid+'&lottery_id='+lottery_id+'">';
		goodsList+='<img style="" class="img_publish" src="'+host+path+'">';
		goodsList+='</a>';
		goodsList+='</div>';
		goodsList+='<div class="col-md-8 col-sm-8 col-xs-8 allgood-publis-list_1 margin-l-r-0">';
		goodsList+='<a href="3_goods-ing.html?pid='+pid+'&lottery_id='+lottery_id+'"><p class="fz_15px">'+title+'</p>';
		goodsList+='</a>';
		goodsList+='<p class="sp_cart_number">';
		goodsList+='总需<span >'+need_count+'</span>';
		goodsList+='人次，剩余';
		goodsList+='<span id="need_count'+i+'" class="text-red">'+remain_count+'人次</span>';
		goodsList+='</p>';
		goodsList+='<div class="clearfix shp_pat position-re">';
		goodsList+='<span class="pull-left lg_30px">';
		goodsList+='参与:</span><div class="clearfix pull-left shp_c_icon">';
		goodsList+='<a href="javascript:;" onclick="red('+i+');" class="reduce position-re pull-left">-</a>';
		goodsList+='<input onblur="blurAdd('+i+');" id="num'+i+'" class="count-input pull-left" type="text" value="'+attend_count+'" class="count-input" style="boder-radius:0;-webkit-boder-radius:0;">';
		goodsList+='<a href="javascript:;" onclick="add('+i+');" class="add pull-left">+</a>';
		goodsList+='</div>';
		goodsList+='<span class="pull-left lg_30px">人次</span>';
		goodsList+='<a href="javascript:removGoods('+id+');">';
		goodsList+='<span class="position-ab icon-trash part_icon"></span>';
		goodsList+='</a>';
		goodsList+='</div></div>';
		goodsList+='<div class="sping_bg col-md-12 col-sm-12 col-xs-12">';
		goodsList+='<p class="fz_12px text-red text-center nomargin">';
		goodsList+='本期仅剩'+remain_count+'人次可参与，已自动为您调整';
		goodsList+='</p>';
		goodsList+='</div></div>';
			}
			$('#goodscart_List').append(goodsList);//插入dome
			$('#total').text(total());
			$('#sumFon').text(goodsNum);
		},
	});
}	

if(user){
		goodsList();//调用请求购物车数据函数	
	}else{
		//window.location='banding_mobile.html';//跳转绑定手机页面
	if(useragent.match(/MicroMessenger/i) == 'MicroMessenger'){
			tanchuan_1('您没有绑定手机,请先绑定！','error','确定','banding_mobile.html');//跳转绑定手机页面
	}else{
			tanchuan_1('您没有登录,请先登录！','error','确定','34-Land.html');//跳转登录注册
	}
}

/**删除购物车商品**/
function removGoods(obj){
	swal({
			title: '是否删除此商品！',
			type: 'error',
			showCancelButton: true,
			confirmButtonColor: "#ff4800",
			confirmButtonText: '确定',//成功按钮
			cancelButtonText:'取消',
			//closeOnConfirm: false 
		},function(){
			$.ajax({
		type:"post",
		url:urlPost+"/Shopcart/delItem",
		data:{
			user_token:user,
			id:obj
		},
		dataType:"json",
		success:function(data){
			if(data['code']==200){
				$('#goodscart_List').html('');//清空当前购物车列表
				goodsList();//调用请求购物车数据函数
				//window.location.reload();//刷新当前页面

			}else{
				tanchuan_0(data['info'],'error','确定');
			}
		}
	  });
	});
		
}
/*合计金额*/
function total(){
	var num=0;
	var d = $('#goodscart_List input');
	$.each(d,function(i){
		num+=+$(this).val();//相加
	})
	$('#total').text(parseInt(num));//改变总金额
	$('#gouwuche_numfont').text(parseInt(goodsNum));//菜单购物车数量赋值
	return parseInt(num);
}
/*增加一件商品*/
function add(i){
	var numInput = '#num'+i;
	var numFont = $(numInput).val();
	numFont++;
	var count = '#need_count'+i;//定义剩余人数
	
	var need_countVal = parseInt($(count).text());//参与人数
	
	if(numFont>need_countVal){
		tanchuan_0('您参与次数不能超过总需要人数！','error','确定');
		//$(num).val(need_countVal);
		return false;
	}
	$(numInput).val(parseInt(numFont));
	total();//调用统计金额函数
}

/*减少一件商品*/
function red(i){
	var numInput = '#num'+i;
	var numFont = parseInt($(numInput).val());
	numFont--;
	if(numFont<1){//当数量小于1的时候
		numFont=1;//设置默认为1
	}
	$(numInput).val(numFont);//赋值给input 
	total();//调用统计金额函数
}

/*输入数量*/
function blurAdd(i){
	var num = '#num'+i;
	var numFont    = $(num).val();//获取输入的数量值
	var count = '#need_count'+i;//定义总需人数
	var need_countVal = parseInt($(count).text());//参与人数 

	if(!isNaN(numFont)){
		 if(numFont>need_countVal){
		tanchuan_0('您参与次数不能超过总需要人数！','error','确定');
		$(num).val(need_countVal);
		total();//计算合计金额
		return false;
		}
		parseInt($(num).val());
		total();//计算合计金额
	}else{
		tanchuan_0('数量必须为数字！','error','确定');
		$(num).val(1);
		total();//计算合计金额
	}
}
/*提交购物车*/
function submitGoods(){
	var postdata =Array();//定义空数组
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
			var cart 		= data['cart']['info'];//购物车数组
			var goodsNum	= data['cart']['total'];//购物车数量
			
			//开始循环数据
			for (var i=0;i<cart.length;i++) {
					 var num = $('#num'+i+'').val();
					 var id 			= cart[i]['id'];
					 var lottery_id 	= cart[i]['lottery_id'];
					 var attend_count   = cart[i]['attend_count'];
					 var price 			= cart[i]['price'];//价格
					 var title 			= cart[i]['title'];//商品标题
					 var lottery_id 	= cart[i]['lottery_id'];//幸运id
					 var cover_id 		= cart[i]['cover_id'];
					 var path 			= cart[i]['path'];
					 var goodid 		= cart[i]['goodid'];
					 var buy_count 		= cart[i]['buy_count'];
					 var need_count 	= cart[i]['need_count'];
					 var remain_count 	= cart[i]['remain_count'];
					 
					 postdata[i] ={id:""+id+"",attend_count:""+num+""};//组装json数据 
				}
				var r = "{\"list\"" + ":" + $.toJSON(postdata)+"}";//转换json
			$.ajax({
						type:"post",
						url:urlPost+"/Shopcart/changeNum",
						data:{
							user_token:user,
							content:r
						},
						dataType:'json',
						success:function(data){
							if(data['code']==200){
								window.location.href='18-confirm.html';
							}else{
								tanchuan_0(data['info'],'error','确定');//提交失败 返回提示
							}
						}
						
					});
		}
	});
	return false;
}

