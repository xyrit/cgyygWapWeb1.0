var goodslist;
	var glo_startCode;//前缀
	$.ajax({
		type:"post",
		url:urlPost+"/Lottery/attendLottery",
		data:{
			user_token:user
		},
		dataType:'json',
		success:function(data){
			var startCode = data['startCode'];//幸运码前缀
			glo_startCode=startCode;
			var list = data['list'];//参与记录数组
			goodslist=list;
			//判断参与记录是否为空
			if(data['list']==''){
				$('#tishi_text').show();
			}
	
			var hotProDIV='';
			
			var goodsNum = list.length;//参与商品个数
			for (var i=0;i<list.length;i++) {
				var name 		 = list[i]['attendCode']['name'];//商品名称
				var lottery_id 	 = list[i]['attendCode']['lottery_id'];//商品名称
				var attend_count = list[i]['attendCode']['attend_count'];//参与人次
				var attendCode 	 = list[i]['attendCode']['attendCode'];//幸运码
				var name 		 = list[i]['attendCode']['name'];//商品名称
				var pid = list[i]['attendCode']['pid']//商品pid
				var trueAttendCode='';//把startCode分离出来，然后以分号连接成一个新数字
				var pid_link=pid+'&'+'lottery_id='+''+lottery_id+'';

				var s=attendCode.split(',');//把startCode分离出来，然后以分号连接成一个新数字
			
			for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
				
				trueAttendCode+=(startCode+Number(s[j]))+'，';
			}//把startCode分离出来，然后以分号连接成一个新数字
			trueAttendCode=trueAttendCode.substring(0,trueAttendCode.length-1);//去掉最后一个分号
				hotProDIV+='<div class="Success-content row">';
				hotProDIV+='<p class="lg_22px"><a href="3_goods-ing.html?pid='+pid+'&lottery_id='+lottery_id+'" class="text-blue">'+name+'</a></p>';
				hotProDIV+='<p class="lg_22px">期号：'+lottery_id+'</p>';
				hotProDIV+='<p class="lg_22px">参与人次：<span class="hejinumcode">'+attend_count+'</span> &nbsp;&nbsp;</p>';
				hotProDIV+='<button onclick="clickxinyun('+i+');" type="button" class="btn btn-lg" style="padding:5px;margin-top:5px" data-toggle="modal">查看幸运码</button>';
				hotProDIV+='</div>';
			}
			$('#canyuPay').append(hotProDIV);
			$('#goodsopt').text(goodsNum);
			
		}
	});
	
	function clickxinyun(i){

			var attendCode 	 = goodslist[i]['attendCode']['attendCode'];//幸运码
			
			var trueAttendCode='';//把startCode分离出来，然后以分号连接成一个新数字
			
			var s=attendCode.split(',');//把startCode分离出来，然后以分号连接成一个新数字
			
			for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I

				trueAttendCode+='<span class="display-ib padding-r-8">'+(glo_startCode+Number(s[j]))+'</span>';		   
				
			}//把startCode分离出来，然后以分号连接成一个新数字
			
			trueAttendCode=trueAttendCode.substring(0,trueAttendCode.length-1);//去掉最后一个分号
	
		$('#myModal').modal('toggle');
		$('#ceshi').html(trueAttendCode);

	}