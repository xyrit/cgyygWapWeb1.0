var url  = window.location.href;
//判断是不是微信浏览器
var useragent = navigator.userAgent;
//商品加入购物车
function addShopping(pid,lottery_id,obj){
	var attend_count = 1;//默认添加个数
	if(user){	
		if(pid!='' || lottery_id!=''){
			$.ajax({
				type:"post",
				url:urlPost+"/Shopcart/addItem",
				data:{
					attend_count:attend_count,
					lottery_id:lottery_id,
					id:pid,
					user_token:user
				},
			dataType:'json',
			success:function(data){
				if(data['code']==200){
					//tanchuan_0('加入购物车成功！','success','确定');
					goodsNum('#gouwuche_numfont2','#gouwuche_numfont');//请购物车数量
					tiptext(obj);
				}else if(!user){
					if(useragent.match(/MicroMessenger/i) == 'MicroMessenger'){
						tanchuan_1('您没有登录,请先登录！','error','确定','34-Land.html');//跳转登录注册
					}else{
						tanchuan_1('您没有登录,请先登录！','error','确定','banding_mobile.html');//跳转绑定手机页面
					}
				}
			}
		});
	 }
	}else{
		//window.location='banding_mobile.html';//跳转绑定手机页面
		if(useragent.match(/MicroMessenger/i) == 'MicroMessenger'){
			tanchuan_1('您没有绑定手机,请先绑定！','error','确定','banding_mobile.html');//跳转绑定手机页面
		}else{
			tanchuan_1('您没有登录,请先登录！','error','确定','34-Land.html');//跳转登录注册
		}
	}

}

//立即参与
function addShopping2(pid,lottery_id){
	var attend_count = 1;//默认添加个数
	if(user){
		if(pid!='' || lottery_id!=''){
		$.ajax({
			type:"post",
			url:urlPost+"/Shopcart/addItem",
			data:{
				attend_count:attend_count,
				lottery_id:lottery_id,
				id:pid,
				user_token:user
			},
			dataType:'json',
			success:function(data){
				if(data['code']==200){
					location.href="17-Shopping-Cart.html";
				}else{
					tanchuan_1(data['info'],'error','确定','34-Land.html'); 
				}
			}
		});
	  }
	}else{
		//window.location='banding_mobile.html';//跳转绑定手机页面
		if(useragent.match(/MicroMessenger/i) == 'MicroMessenger'){
			tanchuan_1('您没有绑定手机,请先绑定！','error','确定','banding_mobile.html');//跳转绑定手机页面
		}else{
			tanchuan_1('您没有登录,请先登录！','error','确定','34-Land.html');//跳转登录注册
		}
	}
	
}

//跟买
function addShopping3(pid,lottery_id){
	var attend_count = 1;//默认添加个数
	if(pid!='' || lottery_id!=''){
		$.ajax({
			type:"post",
			url:urlPost+"/Shopcart/addItem",
			data:{
				attend_count:attend_count,
				lottery_id:lottery_id,
				id:pid,
				user_token:user
			},
			dataType:'json',
			success:function(data){
				if(data['code']==200){
					location.href="17-Shopping-Cart.html";
				}else{
					tanchuan_0(data['info'],'error','确定');  
				}
			}
		});
	}
}
/*点击加入购物车后弹出提示*/
function tiptext(obj){
	obj.tooltip('toggle');
	//1秒后关闭
   setTimeout(function(){
	obj.tooltip('destroy');   
   },1000)
}