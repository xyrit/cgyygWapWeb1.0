//退出登录
function removeUser(){
	swal({
			title: '您确认退出账号吗？',
			type: 'warning',
			showCancelButton: true,
			cancelButtonText:'取消',//取消按钮
			confirmButtonColor: "#ff4800",
			confirmButtonText: '确认',
			closeOnConfirm: false 
		},function(){
			$.ajax({
				type:"post",
				url:urlPost+"/user/logout",
				data:{
					user_token:user
				},
				dataType:'json',
				success:function(data){
					if(data['code']=='200'){
						localStorage.clear();
						//tanchuan_1('退出成功！','success','确定','34-Land.html');
						location.href="34-Land.html";
					}else{
						tanchuan_0(data['info'],'error','确定');
					}
				}
				
			})
	});
}