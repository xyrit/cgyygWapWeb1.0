/************Hong*************/// 分类检索商品
//var url='http://192.168.1.206/cgyyg1.0';//临时用
/*点击搜索按钮，跳到搜索页面*/
var defaultName=escape("华为P9");
$("#searchName").attr("href","30-search-commodity.html?search="+defaultName+"");
//获取分类菜单
$.ajax({  
	type:'post',  
	url:''+urlPost+'/Index/category',  
	data:{
	  
	   },  
	cache:false,  
	dataType:'json', 
	//timeout:60000, 
	beforeSend: function(){
		 
		 //$(".loading").show();
		},
	success:function(data){
		var code=data['code'];
		var info=data['info'];
		if(code!=200){
			$("#menuList").html('<li>获取菜单失败</li>');
	    }
		var host=data['host'];
		
		var category=data['category'];
		var categoryStr='';
		for(i=0;i<category.length;i++){
			var id=category[i]['id'];
			var name=category[i]['name'];
			var title=category[i]['title'];
			categoryStr+='<li><a href="javascript:;" id="'+id+'" class="category_a" onClick="category_click('+id+');">'+title+'</a></li>';
			
		}
		$("#menuList").html(categoryStr);
		$(".category_a").click(function(){
			$(this).addClass("active").parent().siblings().find(".category_a").removeClass("active");//选中当前添加样式
			var category_wenzi=$(this).text();
			$("#category_wenzi").html(category_wenzi);
		});
	},
	error:function(){
			
	}
});

//根据分类ID获取商品
//点击底部导航菜单的 所有商品 进来的时候传的ID是 0
var categoryId=0;
var pageIndex=0;
var types='hot';
var sort_str='desc';
var glo_pageCount;

getCateGoods(categoryId,pageIndex,types,sort_str)
function getCateGoods(categoryId,pageIndex,types,sort_str){
	$.ajax({  
		type:'post',  
		url:''+urlPost+'/Index/categoryById',  
		data:{
		   id:categoryId,
		   pageIndex:pageIndex,
		   pageSize:10,
		   type:types,
		   h_sort:sort_str
		},  
		cache:false,  
		dataType:'json', 
		//timeout:60000, 
		beforeSend: function(){
			 $(".loading").show();
			},
		success:function(data){
			var code=data['code'];
			var info=data['info'];
			if(code!=200){
				tanchuan_0(info,'error','确定');
			}
			var host=data['host'];
			var total=data['total'];//商品总数
			var pageCount=data['pageCount'];//页码总数
			glo_pageCount=pageCount;
			var list=data['list'];
			var listStr='';
			for(i=0;i<list.length;i++){
				var lottery_id=list[i]['lottery_id'];
				var pid=list[i]['pid'];
				var need_count=list[i]['need_count'];
				var attend_count=list[i]['attend_count'];
				var attend_limit=list[i]['attend_limit'];
				var max_attend_limit=list[i]['max_attend_limit'];
				var title=list[i]['title'];
				var path=host+list[i]['path'];
				//进度条
				if(need_count<1){
					progress=0;
				 }else{
					progress=(attend_count/need_count)*100;
					 }
				var remain=need_count-attend_count;
				
				var goods_link=pid+'&'+'lottery_id='+lottery_id;//赋值链接地址
				//构建结构
				listStr+='<div class="allgood-publish row">';
				listStr+='<div class="col-md-4 col-sm-4 col-xs-4 allgood-publis-list text-center">';
                listStr+='<a href="3_goods-ing.html?pid='+goods_link+'"><img class="img_publish" src="'+path+'"></a>';    
                listStr+='</div>';        
                listStr+='<div class="col-md-8 col-sm-8 col-xs-8 allgood-publis-list_1 margin-l-r-0 position-re">';     
                listStr+='<a href="3_goods-ing.html?pid='+goods_link+'"><p class="cate_title fz_15px">'+title+'</p></a>';     
                listStr+='<div class="progress productList-progress indexProgress allgood" style="height:4px;">';        
                listStr+='<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress+'%">';           
                listStr+='<span class="sr-only">'+progress+'%</span>';          
                listStr+='</div>';                 
                listStr+='</div>';           
                listStr+='<p class="number fz_14px">总需'+need_count+'人次<span class="number_1 position-re">剩余<span class="text-red">'+remain+'</span>人次</span></p>';   
				//listStr+='<div class="allgood_car pull-left position-ab">';   
				listStr+='<div onclick="addShopping('+pid+','+lottery_id+',$(this))" class="allgood_car pull-left position-ab" data-trigger="click" data-placement="top" title="加入成功" data-container="body">';   
                listStr+='<span class="icon-shopping-cart icon-allgood_car"></span>';            
                listStr+='</div>';                 
                listStr+='</div>';        
                listStr+='</div>';             
                    
            
			}
			//$("#goodsList").html(listStr);
			
			if(loadFlag==1){
				  loadFlag=0;
				  
				  if(list.length<=0){
				  $("#goodsList").html('<p class="text-center padding-t-b-8">暂无商品数据</p>');
				  $(".loadingMore").hide();
				  }else{
					  
					  $("#goodsList").append(listStr);
					  }
			  }else{
				 
				  if(list.length<=0){
				     $("#goodsList").html('<p class="text-center padding-t-b-8">暂无商品数据</p>');
				  }else{
					  $(".loading").show();
					  $("#goodsList").html(listStr);
					  }
			  }	
			  if(pageCount<=1){
				 $(".loadingMore").hide();
			  }else{
				 $(".loadingMore").show();
			  }
			
			$(".loading").hide();
		},
		error:function(){
			tanchuan_2('获取数据失败');	
		}
	});
	
}
//点击获取总需人次等的不同类别下的排序按钮，取得它们的值，并赋值给全局变量
//type 排序字段(hot 热度  new 新品  price 总需人次  fast 剩余人次)
$(".orderList_item").click(function(){
	
   $(this).addClass("active").siblings().removeClass("active");	//添加当前样式
   var new_type=$(this).attr("data-type");//分类类型
   var orderList_id=$(this).attr("id");//按钮的ID号码
   types =new_type;//赋值全局变量，分类类型
   //按照总需人次排序
   if(orderList_id=='sort_price'){
	   
	   //如果总需人次的排序是desc，则把它的排序改为asc
		 
	     var sort_this=$(this).attr("data-sort");
	     if(sort_this=='desc'){
			getCateGoods(categoryId,0,types,sort_this);
			$("#sort_price").attr("data-sort","asc");
			
			sort_str=sort_this;//赋值全局变量
			$("span.icon-angle-up").css("color","#333");	
			$("span.icon-angle-down").css("color","#ff4800");
		 }else{
			 getCateGoods(categoryId,0,types,sort_this);
			 $("#sort_price").attr("data-sort","desc");
			 sort_str=sort_this;//赋值全局变量
			 $("span.icon-angle-down").css("color","#333");
			 $("span.icon-angle-up").css("color","#ff4800");
			 }
			 
	   }else{
			 //非总需人次的分类，统一排序为降序
			 getCateGoods(categoryId,0,types,'desc');
			 $("span.icon-angle-up").css("color","#333");	
			 $("span.icon-angle-down").css("color","#333");
		}
});
//翻页，加载更多---也就是下一页
$(".loadingMore").attr("onClick","loadmoreGoods();");
var loadFlag=0;//当loadFlag=1时 是加载更多，getGoodsList（）函数中则是追加，而不是覆盖
function loadmoreGoods(){ 
    loadFlag=1;
    pageIndex=pageIndex+1;
	
	if(glo_pageCount-1<pageIndex){
		$(".loadingMore").html('没有更多内容了');
		return;
	}

	getCateGoods(categoryId,pageIndex,types,sort_str);
	
}		
//点击下拉菜单进行商品分类检索
function category_click(id){
	getCateGoods(id,pageIndex,types,sort_str);
	categoryId=id;
}