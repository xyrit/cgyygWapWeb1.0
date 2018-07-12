/****************jeki开始***********************/
//获取用户信息 user_token
var user 	  = window.localStorage.user_token;//用户token
var nickname  = window.localStorage.nickname;//取出用户名
var mobile    = window.localStorage.mobile;//取出手机
var uid    	  = window.localStorage.uid;//用户id
var account   = window.localStorage.account;//用户余额
var path_user = window.localStorage.path_user;//用户头像

//全屏弹窗 不带回调参数 用于成功 或者报错！
/**
 * warning,警告
 * error 错误
 * success 成功
 * title  标题
 * zhuangtai  图标状态
 * butfont	按钮文字 确定 成功....
 * url	跳转地址 
 * **/
function tanchuan_0(title,zhuangtai,butfont){
	swal({
			title: title,
			type: zhuangtai,
			showCancelButton: false,
			confirmButtonColor: "#ff4800",
			confirmButtonText: butfont,
			//timer: 2000,
			closeOnConfirm: false 
		});
	//window.setTimeout("removetanchuan()",2000);
}
//全屏弹窗 带回调参数 用于成功之后跳转地址！
/**
 * warning,警告
 * error 错误
 * success 成功
 * title  标题
 * zhuangtai  图标状态
 * butfont	按钮文字 确定 成功....
 * url	跳转地址   
 * cancelButtonText:false;//取消按钮 
 * **/
function tanchuan_1(title,zhuangtai,butfont,url){
	swal({
			title: title,
			type: zhuangtai,
			showCancelButton: false,
			confirmButtonColor: "#ff4800",
			confirmButtonText: butfont,//成功按钮
			closeOnConfirm: false 
		},function(){
			location.href=url;
	});
}
//移除弹窗 显示
function removetanchuan(){
	$('.confirm').click();
}
    
//显示
function show(divBox){
	$(divBox).show(time);
}
//隐藏
function hide(divBox){
	$(divBox).show(time);
}
//切换显示 隐藏
function toggle(divBox){
	$(divBox).toggle();
}

//转换任意值为整数
function toInt(number) {
    return number*1 | 0 || 0;
}
//请求购物车数量 
function goodsNum(fontbox,fontbox2){
	var url  = window.location.href;
	$.ajax({
		type:"post",
		url:urlPost+"/Shopcart/listNum",
		data:{
			user_token:user
		},
		dataType:"json",//指定json类型 
		success:function(data){
			//判断是不是首页 加载
				if(url.indexOf('m')>-1) {
					if(data['code']!=200){
						return false;
					}
				}
	//			if(data['code']==517){//请求失败不加载数据
	//				tanchuan_1(data['info'],'error','确定','34-Land.html');
	//				return false;
	//			}
				if(data['code']!=200){
					tanchuan_0(data['info'],'error','确定');
					return false;
				}
				var Num			= data['total'];//购物车数量
				$(fontbox).text(Num);//商品详情页页面 显示购物车数量
				$(fontbox2).text(Num);//首页购物车数量
			}
	});
}	
/****************jeki结束***********************/

//***************Hong*************************//

//获取地址栏传过来参数
function GetQueryString(data)
{
     var reg = new RegExp("(^|&)"+ data +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
//把用户头像缩小，直接加在.jpg后面
var picScale='@!cg100';
//判断用户是否有头像，是否是第三方登录的头像
function picHostUrl(picHost,picPath){
	var picReg=/^http[\s\S]*$/;//判断图片图片是否包含http，包含的就是第三方登录的头像
	if(picPath==''){
		picPath='images/default1.png';
		return picPath;
	}
	if(!(picReg.test(picPath))){
		picPath=picHost+picPath+picScale;
		return picPath;
	}else{
		return picPath;
    }
	
    return 'images/default1.png';
}
//模态框 居中
/* center modal 模态框居中*/
function centerModals(){
	$('.modal').each(function(i){
		var $clone = $(this).clone().css('display', 'block').appendTo('body');   
		var top = Math.round(($clone.height() - $clone.find('.modal-dialog').height()) / 2);
		top = top > 0 ? top : 0;
		$clone.remove();
		$(this).find('.modal-dialog').css("margin-top", top);
	});
	$('.modal').on('show.bs.modal', centerModals);
}
/*$(window).on('resize', centerModals);*/

////////***********Hong*******************////////////
