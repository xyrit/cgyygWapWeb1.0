/***********Hong**************///// 根据搜索字段获取商品
//var url='http://192.168.1.206/cgyyg1.0';//临时用
var searchStr=GetQueryString("search");
//获取浏览器URL地址传过来的值并解码
var searchStr=decodeURI(searchStr);

//填充搜索框
$("#search_input").val(searchStr);
$("#searchName").html('“'+searchStr+'”');  
var searchIndex=0;
var glo_pageCount;
var loadFlag=0;//当loadFlag=1时 是加载更多，0的时候 是第一次调用，需要显示正在加载中，函数中则是追加
searchList(searchIndex);
function searchList(searchIndex){
   
	$.ajax({  
		  type:'post',  
		  url:''+urlPost+'/Index/searchByName',  
		  data:{
			  name:searchStr,
			  pageIndex:searchIndex,
			  pageSize:10
			  },  
		  cache:false,  
		  dataType:'json',  
		  beforeSend:function(){
			  if(loadFlag==0){
				$(".loading").show();
				}
		  },
		  success:function(data){  
		     var code=data['code'];
			 var info=data['info'];
			 if(code!=200){
				tanchuan_0(info,'error','确定'); 
				
			 }
			 var host=data['host'];
			 var sTotal=data['sTotal'];//搜索到的商品总数
			 var pageCount=data['pageCount'];//搜索到的页码总数
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
				 //构建结构
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
				  listStr+='<div class="col-md-8 col-sm-8 col-xs-8 allgood-publis-list_1 margin-l-r-0">';     
				  listStr+='<a href="3_goods-ing.html?pid='+goods_link+'"><p class="cate_title fz_15px">'+title+'</p></a>';     
				  listStr+='<div class="progress productList-progress indexProgress allgood pull-left" style="height:4px;">';        
				  listStr+='<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="'+progress+'" aria-valuemin="0" aria-valuemax="100" style="width: '+progress+'%">';
				  listStr+='<span class="sr-only">'+progress+'% Complete (warning)</span>';          
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
			 
			 /*数据填充*/
			 $("#searchCount").html(sTotal);
			 if(list.length<=0){
				  $("#goodsList").html('<p class="text-center margin-t-15">暂无商品数据</p>');
				  $(".loadingMore").hide();
				  $('#sou_shop').hide();//隐藏立即参与按钮
				  }else{
					 
					  $("#goodsList").append(listStr);
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
//翻页，加载更多---也就是下一页
$(".loadingMore").attr("onClick","loadmoreGoods();");
//var loadFlag=0;//当loadFlag=1时 是加载更多，getGoodsList（）函数中则是追加，而不是覆盖
function loadmoreGoods(){ 
    loadFlag=1;
    searchIndex=searchIndex+1;
	
	if(glo_pageCount-1<searchIndex){
		$(".loadingMore").html('没有更多内容了');
		return;
	}

	searchList(searchIndex);
	
}	
//当点击推荐列表的时候
$(".searchText").click(function(){
   var searchText=$(this).text();	
   $("#search_input").val(searchText);
   searchText=escape(searchText);
   $(this).attr("href","30-search-commodity.html?search="+searchText+"");
   //searchList(0);
})		
			