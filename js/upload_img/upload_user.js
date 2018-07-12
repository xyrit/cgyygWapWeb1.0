//获取头像
$.ajax({
	type:"POST",
	url:urlPost+"/ucenter/upPhoto",
	data:{
		user_token:user
	},
	dataType:'json',
	success:function(data){
		/**
		* 个人信息获取
		* 待续
		***/
		if(data['code']=='200'){
			var pic_host = data['pic_host'];//头像前缀
			var path	 = data['path'];//用户头像
			var p = picHostUrl(pic_host,path);//此函数定义在common.js函数中
			$('#usertouxiang').attr('src',p);
			$('#usertouxiang').attr('style','');
		}		
	}
});

//多图片文件上传开始
	  accessid = ''
	  accesskey = ''
	  host = ''
	  policyBase64 = ''
	  signature = ''
	  callbackbody = ''
	  filename = ''
	  key = ''
	  expire = 0
	  now = timestamp = Date.parse(new Date()) / 1000; 
	  
	  function send_request()
	  {
	  	 
		  var xmlhttp = null;
		  if (window.XMLHttpRequest)
		  {
			  xmlhttp=new XMLHttpRequest();
		  }
		  else if (window.ActiveXObject)
		  {
			  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		
		  if (xmlhttp!=null)
		  {
			  //phpUrl = upPicUrl+'/Application/Addons/upload/php/get.php?id='+uid+'&type=1&os=1'; //1是头像上传  2是晒单图片
			  phpUrl = 'http://test.cgyyg.com/cgyyg1.0/index.php/Home/Upload/get_file?id='+uid+'&type=1&os=1'; //1是头像上传  2是晒单图片
			  xmlhttp.open( "GET", phpUrl, false );
			  
			  xmlhttp.send( null );
			  return xmlhttp.responseText
		  }
		  else
		  {
			  alert("Your browser does not support XMLHTTP.");
		  }
	  };
	

  function get_signature()
	  {
		  //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
		  now = timestamp = Date.parse(new Date()) / 1000; 
		  console.log('get_signature ...');
		  console.log('expire:' + expire.toString());
		  console.log('now:', + now.toString())
		  if (expire < now + 3)
		  {
			  console.log('get new sign')
			  body = send_request()
			  var obj = eval ("(" + body + ")");
			  host = obj['host']
			  policyBase64 = obj['policy']
			  accessid = obj['accessid']
			  signature = obj['signature']
			  expire = parseInt(obj['expire'])
			  callbackbody = obj['callback'] 
			  key = obj['dir']
			  return true;
		  }
		  return false;
	  };


function set_upload_param(up)
	  {
		  var ret = get_signature()
		  //if (ret == true)
		 // {
			  new_multipart_params = {
			  	  'key' : key + Math.uuid()+'.jpg',//生成随机名称 保证唯一
				  //'key' : key + '${filename}',
				  'policy': policyBase64,
				  'OSSAccessKeyId': accessid, 
				  'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
				  'callback' : callbackbody,
				  'signature': signature,
			  };
	  
			  up.setOption({
				  'url': host,
				  'multipart_params': new_multipart_params
			  });
			  
	  
			  console.log('reset uploader')
			  //uploader.start();
		 // }
}
 
 //实例化一个文件上传函数
	  var uploader = new plupload.Uploader({
		  runtimes : 'html5,flash,silverlight,html4',
		  browse_button : 'selectfiles', 
		  container: document.getElementById('container'),
		  flash_swf_url : 'Moxie.swf',
		  silverlight_xap_url : 'Moxie.xap',
	  
		  url : 'http://oss-cn-shenzhen.aliyuncs.com',
		  
		  filters: {
				mime_types : [ //只允许上传图片文件
				  { title : "图片文件", extensions : "jpg,gif,png,jpeg" }
				],
				max_file_size : '6048kb', //最大只能上传400kb的文件
                //prevent_duplicates : true //不允许选取重复文件
			  },
		  init: {
			  PostInit: function() {
				  //document.getElementById('ossfile').innerHTML = '';
				  document.getElementById('postfiles').onclick = function() {
				  set_upload_param(uploader);
				  uploader.start();
				  return false;
				  };
			  },
	  
			  FilesAdded: function(up, files) {
				 
				  //只上传一张图片
				  // $.each(up.files, function (i, file) {
					 //  if (up.files.length <= 1) {
						//   return;
					 //  }
					 //  up.removeFile(file);
				  // }); 
				  var tishijin='';
				   for(var i = 0, len = files.length; i<len; i++){
						var file_name = files[i].name; //文件名
						//构造html来更新UI,构造图片列表
						
						tishijin+='';
					
						tishijin+='<div id="imgBox'+files[i].id+'" class="imgBox pull-left position-re">';
						tishijin+='<div id="' + files[i].id + '"><b></b>';
						

						tishijin+='<div class="progress upImages_progress" style="margin-bottom:0px;width:100%;height:20px;">';
						tishijin+='<div id="jdtiao" class="progress-bar" style="width: 0%"></div>';
						tishijin+='</div>'




						tishijin+='</div>';
						tishijin+='</div>';
						
					  $('#tishi_text').append(tishijin);
						!function(i){
							previewImage(files[i],function(imgsrc){
								$('#imgBox'+files[i].id+'').append('<img src="'+ imgsrc +'" />');
								//$('#file-'+files[i].id).append('<img src="'+ imgsrc +'" />');
								//document.getElementById('ossfile').innerHTML+='<img src="'+ imgsrc +'" />'
								
							})
						}(i);
					}
				  
			  },

			UploadProgress: function(up, file) {

					var jdtiao = document.getElementById('jdtiao');
				  var d = document.getElementById(file.id);
				  d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
				  
				  var prog = d.getElementsByTagName('div')[0];
				  var progBar = prog.getElementsByTagName('div')[0]
				  jdtiao.style.width= 100*file.percent+'px';
				  
				  jdtiao.setAttribute('aria-valuenow', file.percent);
			  },
	  
			  FileUploaded: function(up, file, info) {
				  console.log('uploaded')
				  console.log(info.status)
				  set_upload_param(up);
				  if (info.status == 200)
				  {
					  document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传成功';
					  $('#selectfiles').text('修改头像');
					  //图片上传成功之后显示用户上传的头像，从服务器获取
					  $.ajax({  
						type:'post',  
						url:urlPost+'/ucenter/upPhoto',  
						data:{
							user_token:user
							},  
						cache:false,  
						dataType:'json', 
						timeout:60000,
						success:function(data){
							  var code=data['code'];
							  var info=data['info'];
							  if(code!=200){
								  $("#ossfile").html(info);
							  }else{
									var pic_host=data['pic_host'];
									var path=data['path'];	
									$("#ossfile").html('<div class="imgBox2"><img src="'+pic_host+path+'"/></div>');	
									$("#selectfiles").text("修改头像");
							   }
									//window.localStorage.path = path;//用户头像
									//tanchuan_1('上传成功','success','确定','28-my-data_img.html');
									
						}
					});
				  }else{
						  document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
				  } 
			  },
	  
			  Error: function(up, err) {
			  	tanchuan_0('图片上传失败','error','确定');
			  }
		  }
	  });
	  
	  uploader.init();
	  
	  
	  $(document).on('click', 'a.delete_btn_2', function () {
                $(this).parent().parent().remove();
                var toremove = '';
                var id = $(this).attr("data-val");
                for (var i in uploader.files) {
                    if (uploader.files[i].id === id) {
                        toremove = i;
                    }
                }
                uploader.files.splice(toremove, 1);
            });
            
            
	   //定义一个图片预览 函数
	//定义一个图片预览 函数
	  function previewImage(file,callback){//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
			  if(!file || !/image\//.test(file.type)) return; //确保文件是图片
			  if(file.type=='image/gif'){//gif使用FileReader进行预览,因为mOxie.Image只支持jpg和png
				  var fr = new mOxie.FileReader();
				  fr.onload = function(){
					  callback(fr.result);
					  fr.destroy();
					  fr = null;
				  }
				  fr.readAsDataURL(file.getSource());
			  }else{
				  var preloader = new mOxie.Image();
				  preloader.onload = function() {
					  preloader.downsize( 160, 160 );//先压缩一下要预览的图片,宽200，高300
					  var imgsrc = preloader.type=='image/jpeg' ? preloader.getAsDataURL('image/jpeg',80) : preloader.getAsDataURL(); //得到图片src,实质为一个base64编码的数据
					  callback && callback(imgsrc); //callback传入的参数为预览图片的url
					  $('#ossfile img').attr('src','');
					  $('#ossfile img').css({'border':'1px solid #ccc'});
					  $('#ossfile img').attr('src',imgsrc);
					  preloader.destroy();
					  preloader = null;
				  };
				  preloader.load( file.getSource());
			  }	
  
		  }
