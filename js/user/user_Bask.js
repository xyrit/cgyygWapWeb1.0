var id = GetQueryString('id');//获取浏览器 get id 参数
	var imgNum;
	var glo_path_length=5;//图片个数

	//查看用户有没有晒单图片
	function chakan_img(id){
		$.ajax({
			type:"post",
			url:urlPost+"/Display/orderUp",
			data:{
				dpid:id
			},
			dataType:'json',
			success:function(data){
				if(data['order_info']!=null){
					var pic_host = data['pic_host'];//图片地址前缀
					var order_tite = data['order_info']['title'];
					var description= data['order_info']['description'];
					var path = data['order_info']['path'];
					var imaglist='';
					
					$('#order_tite').val(order_tite);//标题
					$('#textconder').val(description);//内容
					
					for (var i=0;i<path.length;i++){
						imaglist+='<div class="shaidan_img">';
						imaglist+='<img id="shaidan'+i+'" src="'+pic_host+''+path[i]+'" />';
						imaglist+='<a id="remoshaidan'+i+'" href="javascript:remoshaidan('+i+');">删除</a>';
						imaglist+='</div>';
					}
					imgNum=path.length;
					glo_path_length=glo_path_length-path.length;
					jisuanNum(imgNum);//计算还能上传多少个图片
					$('#ossfile').append(imaglist);
				}
			}
		});
	}
	var zong = $('#numtextimg').text();
	imgNum=zong;
	chakan_img(id);
	function jisuanNum(imgNum){
		if(imgNum<=5){
			var imgNumR = 5;
			var num = imgNumR-imgNum;
			$('#numtextimg').text(num);
		}else{
			$('#numtextimg').text(0);
		}
	}
	//删除图片
	function remoshaidan(i){
		var shaidan = $('#shaidan'+i+'');
		var imgsrc = shaidan.attr('src').substring(20);//截取/后面图片地址
		$.ajax({
			type:"post",
			url:urlPost+"/Display/pictureDel",
			data:{
				dpid:id,
				user_token:user,
				pic:imgsrc
			},
			dataType:'json',
			success:function(data){
				if(data['code']==200){
					imgNum=imgNum-1;
					jisuanNum(imgNum);//计算还能上传多少个图片
					glo_path_length-1;
					shaidan.parent().remove();
				}else{
					alert(data['info']);
				}
			}
		});
	}


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
			  phpUrl = upPicUrl+'/Application/Addons/upload/php/get.php?id='+id+'&type=2&os=1'; //1是头像上传  2是晒单图片
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
		 // }
	  }

	 	  //实例化一个文件上传函数
	  	  var uploader = new plupload.Uploader({

		  runtimes : 'html5,flash,silverlight,html4',
		  browse_button : 'selectfiles2', 
		  container: document.getElementById('container'),
		  flash_swf_url : 'js/upload_img/js/Moxie.swf',
		  silverlight_xap_url : 'js/upload_img/js/Moxie.xap',
	  		
		  url : 'http://oss-cn-shenzhen.aliyuncs.com',
		  
		  filters: {
				mime_types : [ //只允许上传图片文件
				  { title : "图片文件", extensions : "jpg,gif,png,jpeg" }
				],
				max_file_size : '6120kb', //最大只能上传5M的文件
                //prevent_duplicates : true //不允许选取重复文件
			  },
		  init: {
			  PostInit: function() {
				  document.getElementById('ossfile').innerHTML = '';
				  document.getElementById('postfiles2').onclick = function() {
				  set_upload_param(uploader);
				  uploader.start();
				  return false;
				  };
			  },
	 
			  FilesAdded: function(up, files) {

				var imaglistDiv='';
				  for(var i = 0, len = files.length; i<len; i++){
						
					if(uploader.files.length>glo_path_length){ // 最多上传5张图
							swal({
								title: "",
								text: '您最多上传5张图',
								html: true,
								type: "error",
								confirmButtonText:"确定",
								confirmButtonColor: "#ff4800",
							});
							return;
						}

						var file_name = files[i].name; //文件名
						
						imaglistDiv+='<div style="width:100%;margin-top:10px;" id="imgBox'+files[i].id+'" class="imgBox pull-left position-re">';
						
						imaglistDiv+='<div id="' + files[i].id + '">';

						imaglistDiv+='<b></b>'
						
						imaglistDiv+='<div class="progress upImages_progress" style="margin-bottom:0px;width:100%;height:15px;">';
						imaglistDiv+='<div class="progress-bar" style="width: 0%"></div>';
						imaglistDiv+='</div>'
						
						imaglistDiv+='</div>'
						
						imaglistDiv+='<a href="javascript:;" class="margin-r-5 position-ab delete_btn_2" style="right:-5px;top:0px">';
						imaglistDiv+='<span class="glyphicon glyphicon-trash"></span>';
						imaglistDiv+='</a>'
						
						imaglistDiv+='</div>';
						
					  $('#ossfile').append(imaglistDiv);
						!function(i){
							previewImage(files[i],function(imgsrc){
								$('#imgBox'+files[i].id+'').append('<img src="'+ imgsrc +'" />');

							})
						}(i);
					}
				  
			  },
			  
			  
			  UploadProgress: function(up, file) {
				  var d = document.getElementById(file.id);
				  d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
				  
				  var prog = d.getElementsByTagName('div')[0];
				  var progBar = prog.getElementsByTagName('div')[0]
				  progBar.style.width= 100*file.percent+'px';
				  progBar.setAttribute('aria-valuenow', file.percent);
			  },
	  
			  FileUploaded: function(up, file, info) {
				  console.log('uploaded')
				  console.log(info.status)
				  set_upload_param(up);
				  if (info.status == 200)
				  {
					  document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传成功';
				  }
				  else
				  {
					  document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
				  } 
			  },
			  Error: function(up, err) {
			  		swal({
						title: "",
						text: '上传失败,请更换一张图片',
						html: true,
						type: "error",
						confirmButtonText:"确定",
						confirmButtonColor: "#ff4800",
					});
					return;
			  }
		  }
	  });
  
	  uploader.init();
	  $(document).on('click', 'a.delete_btn_2', function () {

                $(this).parent().remove();
                var toremove = '';
                var id = $(this).attr("data-val");
                for (var i in uploader.files) {
                    if (uploader.files[i].id === id) {
                        toremove = i;
                    }
                }
				glo_path_length++;
				var num = $('#numtextimg').text();
				num++;
				$('#numtextimg').text(num);
				
                uploader.files.splice(toremove, 1);
            });
	  
	  //定义一个图片预览 函数
	  function previewImage(file,callback){//file为plupload事件监听函数参数中的file对象,callback为预览图片准备完成的回调函数
			  $('#ossfile').show();
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
				 
		 		var num = $('#numtextimg').text();//计算还能上传多少个图片
			  	var jisuan = num-1;
			  	if(jisuan<0){
					$('#numtextimg').text(0);

			  	}else{
			  		$('#numtextimg').text(jisuan);
			  	}
			  	
			  }
			  
			  
		  }
		  //多图片文件上传结束
		  
	/*提交申请*/
	$('#shaidanBut').click(function(){
		var usertite = $('.form-control').val();
		var textconder = $('#textconder').val();
		if(usertite =='' || textconder==''){
			tanchuan_0('请填写完整内容！');
		}else{
			$.ajax({
				type:"post",
				url:urlPost+"/Display/orderAdd",
				data:{
					user_token:user,
					id:id,
					title:usertite,
					description:textconder
				},
				dataType:'json',
				success:function(data){
					if(data['code']==200){
						tanchuan_1('晒单成功！','success','确定','24-mysun.html');
					}else{
						tanchuan_0(data['info'],'error','确定');
					}
				},
			});
		}
	});