// 搜索商品
$(function(){
	
  $("#btn_search").click(function(){
	  //对浏览器需要传的字符进行编码
	  //var search_input=escape($("#search_input").val());
	  
	  //$(this).attr("href","goods-search.html?search="+search_input+"");
	  
	  if($("#search_input").val()!=''){
		  var search_input=escape($("#search_input").val());
		  //$(this).attr("target","_blank");
		  $(this).attr("href","30-search-commodity.html?search="+search_input+"");
		  }else{
			  $(this).attr("href","javascript:;");
			  }
	 
  });
  $('#search_input').keydown(function(e){
	  var key = e.which;
	  if(key==13){
		 if($("#search_input").val()!=''){
			  var search_input=escape($("#search_input").val());
			  //location.href = "goods-search.html?search="+search_input+"";
		
			 // var tempwindow=window.open('_blank');//打开一个窗口，防止浏览器拦截，不兼容IE 
			 // tempwindow.location="goods-search.html?search="+search_input+"";
			  
			  //openwin("30-search-commodity.html?search="+search_input+"");
		  }
				  
	   }
	}); 
	//模拟一个A链接时间，防止浏览器拦截以及兼容IE
	/*function openwin(url) {
		
		var a = document.createElement("a");
		a.setAttribute("href", url);
		a.setAttribute("target", "_blank");
		a.setAttribute("id", "camnpr");
		document.body.appendChild(a);
		a.click();
		
	}*/

})