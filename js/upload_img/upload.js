

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
			 // phpUrl = urlPost+'/Home/ucenter/upPhoto';
			  phpUrl = upPicUrl+'/Addons/upload/php/get.php?id='+userID+'&type=1';
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
		  if (ret == true)
		  {
			  new_multipart_params = {
				  'key' : key + '${filename}',
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
		  }
	  }
	  //实例化一个文件上传函数
	  var uploader = new plupload.Uploader({
		  runtimes : 'html5,flash,silverlight,html4',
		  browse_button : 'selectfiles', 
		  container: document.getElementById('container'),
		  flash_swf_url : 'js/upload_img/js/Moxie.swf',
		  silverlight_xap_url : 'js/upload_img/js/Moxie.xap',
	  
		  url : 'http://oss-cn-shenzhen.aliyuncs.com',
		  
		  filters: {
				mime_types : [ //只允许上传图片文件
				  { title : "图片文件", extensions : "jpg,gif,png" }
				],
				max_file_size : '1000kb', //最大只能上传400kb的文件
                prevent_duplicates : true //不允许选取重复文件
			  },
		  init: {
			  PostInit: function() {
				  document.getElementById('ossfile').innerHTML = '';
				  document.getElementById('postfiles').onclick = function() {
				  set_upload_param(uploader);
				  uploader.start();
				  return false;
				  };
			  },
	  
			  FilesAdded: function(up, files) {
				 
				  
				  /*plupload.each(files, function(file) {
					  document.getElementById('ossfile').innerHTML += '<div class="imgBox">'
					  +'<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
					  +'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
					  +'</div>';
					  +'</div>';
					  
				  });*/
				  for(var i = 0, len = files.length; i<len; i++){
						var file_name = files[i].name; //文件名
						//构造html来更新UI,构造图片列表
						
						// var html = '<li id="file-' + files[i].id +'"><p class="file-name">' + file_name + '</p><p class="progress"></p></li>';
						// $(html).appendTo('#file-list');
						document.getElementById('ossfile').innerHTML += '<div id="imgBox'+files[i].id+'" class="imgBox pull-left position-re">'
						+'<div id="' + files[i].id + '"><p class="nomargin imgSize">' + files[i].name + ' (' + plupload.formatSize(files[i].size) + ')</p><b></b>'
						+'<div class="progress upImages_progress"><div class="progress-bar" style="width: 0%"></div></div>'
						+'</div>'
						+'<a href="javascript:;" class="margin-r-5 position-ab delete_btn_2" style="right:-5px;top:0px">'
						+'<span class="glyphicon glyphicon-trash"></span>';
						+'</a>'
						+'</div>';
						
					  
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
				  var d = document.getElementById(file.id);
				  d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
				  
				  var prog = d.getElementsByTagName('div')[0];
				  var progBar = prog.getElementsByTagName('div')[0]
				  progBar.style.width= 2*file.percent+'px';
				  progBar.setAttribute('aria-valuenow', file.percent);
			  },
	  
			  FileUploaded: function(up, file, info) {
				  console.log('uploaded')
				  console.log(info.status)
				  set_upload_param(up);
				  if (info.status == 200)
				  {
					  document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'success';
				  }
				  else
				  {
					  document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
				  } 
			  },
	  
			  Error: function(up, err) {
				  set_upload_param(up);
				  document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
			  }
		  }
	  });
	  
	  uploader.init();
	  
	  
	  /*$(document).on('click', 'a.delete_btn_2', function () {
                $(this).parent().remove();
                var toremove = '';
                var id = $(this).attr("data-val");
                for (var i in uploader.files) {
                    if (uploader.files[i].id === id) {
                        toremove = i;
                    }
                }
                uploader.files.splice(toremove, 1);
            });*/
	  
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
					  preloader.destroy();
					  preloader = null;
				  };
				  preloader.load( file.getSource() );
			  }	
			  
			$(".imgBox").hover(function(){
			
			  $(this).addClass("hover_deleteBtn");
			  },function(){
				  $(this).removeClass("hover_deleteBtn");
				  });  
			  
		  }
		  //多图片文件上传结束