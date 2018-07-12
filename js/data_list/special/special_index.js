/**
 * Created by Hong on 2016/3/21.
 */
//获取浏览器当前的地址，存下来，给微信SDK调用
var url_link= window.location.href;

window.localStorage.url_link  = url_link;//微信SDK地址调用

/*var useragent = navigator.userAgent;*/

//定义新全局token，本地账户登录存储的token和微信等登录的token字段已经不一样，需要判断
//var new_token;

var glo_user; //微信登录地址栏返回的

//判断用户有没有绑定手机需要用到的用户token！

var wx_flag=0; //0为已经绑定手机号。1为未绑定

//微信浏览器打开，获取用户token信息
/*var ua = navigator.userAgent.toLowerCase();
if(ua.match(/MicroMessenger/i)=="micromessenger") {
    var user 	  = window.localStorage.token;//用户token
    glo_user=user;
    if(user){
        weixin_info(user);
    }

}*/
//第三方登录和微信登录是一样的，都需要从地址栏获取token 调用接口获得用户token
var user 	  = window.localStorage.token;//用户token
//取出存储中的用户token
var user_token= window.localStorage.user_token;


if(user){
    weixin_info(user);
}
else
{
    //调用微信授权地址
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
          if (document.all) {var o = document.createElement('a'); o.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc10af3f90aced41f&redirect_uri=http://www.cgyyg.com/cgyyg1.0/wap.php/OtherLogin/oauth&response_type=code&scope=snsapi_userinfo&state=12&url_type=12&#wechat_redirect'; document.body.appendChild(o); o.click(); } else {window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc10af3f90aced41f&redirect_uri=http://www.cgyyg.com/cgyyg1.0/wap.php/OtherLogin/oauth&response_type=code&scope=snsapi_userinfo&state=12&url_type=12&#wechat_redirect'; }

    }

}
//获取微信登录的用户信息
function weixin_info(user_wx){

    $.ajax({
        type: 'post',
        url: '' + urlPost + '/User/getInfo',
        data: {
            token:user_wx
        },
        cache: false,
        dataType: 'json',
        async: false,  //同步执行
        beforeSend: function () {

        },
        success: function (data) {
            var wx_token=data['user']['user_token'];
            //存储得到的用户token值
            //window.localStorage.wx_token_sp  = wx_token;//微信SDK标题调用
           // new_token=wx_token;
            if(wx_token==0){
                //$("#get_lotteryBtn").attr("disabled","disabled");
                wx_flag=1;
                /*swal({
                    title: "",
                    text: '您还没有绑定手机。',
                    html: true,
                    type: "error",
                    confirmButtonText:"确定",
                    confirmButtonColor: "#ff4800",
                },function(){
                    //设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
                    setTimeout(function(){
                        window.location.href="28-my-data-3_1.html";
                    }, 500);
                });*/


                return;

            }
            window.localStorage.user_token = wx_token;//用户唯一标识

           // getLottery_get();

        },
    })

}

getGoodsList();
var glo_link;
var glo_lottery_id; //检查是否需要跳转使用的期号
var glo_pid; //检查是否需要跳转使用的商品id
function getGoodsList() {
    $.ajax({
        type: 'get',
        url: '' + urlPost + '/Ipad/product',
        data: {

        },
        cache: false,
        dataType: 'json',
        async:false,  //同步执行
        //timeout:60000,
        beforeSend: function () {
            //$(".loading").html("<img src='images/loading.gif'/><br>正在加载中...");
            $(".loading").show();
        },
        success: function (data) {
            var code = data['code'];
            var info = data['info'];
            if (code != 200) {

               // tanchuan_0(info, 'error', '确定');
            }
            //获取商品字段
            var host=data['host'];

            var items=data['items'];

            var pid=items['pid'];//商品pid
            glo_pid=pid;
            var lottery_id=items['lottery_id'];//商品期号
            glo_lottery_id=lottery_id;
            var attend_count=items['attend_count'];//商品参与总数
            var closing_time=items['closing_time'];//
            var price=items['price'];//商品价格
            var title=items['title'];//商品标题
            window.localStorage.title  = title;//微信SDK标题调用
            var content=items['content'];//商品内容

            window.localStorage.content  = content;//商品内容，商品详情页需要调用

            var parameters=items['parameters'];//商品副标题、
            var countdown=items['countdown'];//倒计时
            var pics=items['pics'];//商品图片列表
            var pics_first=items['pics'][0];//微信SDK调用第一张图片
            window.localStorage.pics_first  = pics_first;//微信SDK标题调用
            var picListr='';
            for(i=0;i<pics.length;i++){
                var pic_path=pics[i];
                picListr+='<li><img src="'+pic_path+'"/></li>';
            }

            var link=pid+'&'+'lottery_id='+lottery_id;
            glo_link=link;

            //填充数据
            $("#slides").html(picListr);//轮播图
            $("#title").html(title+'<span class="text-red">（'+parameters+'）</span>');//标题

            $("#price_old").html('￥'+price+'');
            $("#attend_count").html(attend_count);
            //跳转
            $("#details_link").attr("href","special_maShang_tuwen.html");
            //往期揭晓
            $("#BeforePublishList").attr("href","special_maShang_pastannounce.html?pid="+pid+"");

            //开启倒计时
            timer_1(countdown);

        }
    });
}
/**检查是否已经参与，是否跳转页面 start**/

if(wx_flag==0||user_token)
{
    //取出存储中的用户token
   // var user_token= window.localStorage.user_token;
    $.ajax({
        type: 'get',
        url: '' + urlPost + '/Ipad/check_recevie',
        data: {
            user_token:user_token,
            pid:glo_pid,
            lottery_id:glo_lottery_id,
            ctype:1
        },
        cache: false,
        dataType: 'json',
        async: false,  //同步执行
        beforeSend: function () {

        },
        success: function (data) {
            var tiao=data['tiao'];
            if(tiao==1){
                window.location.href="special_maShang_ing.html";
            }

        }
    });
}




/**检查是否已经参与，是否跳转页面 end**/
//倒计时
function timer_1(intDiff_1){
    var SetTime= setInterval(function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff_1 > 0){
            day = Math.floor(intDiff_1 / (60 * 60 * 24));
            hour = Math.floor(intDiff_1 / (60 * 60)) - (day * 24);
            //hour = Math.floor(intDiff / (60 * 60));
            minute = Math.floor(intDiff_1 / 60) - (day * 24 * 60) - (hour * 60);
            //minute = Math.floor(intDiff / 60) - (hour * 60);
            second = Math.floor(intDiff_1) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
            //second = Math.floor(intDiff)- (hour * 60 * 60) - (minute * 60);
        }
        if(day <= 9) day= '0' + day;
        if(hour <= 9) hour= '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;

        $('.day_show_1').html('<s></s>'+day);
        $('.hour_show_1').html('<s id="h"></s>'+hour);
        $('.minute_show_1').html('<s></s>'+minute);
        $('.second_show_1').html('<s></s>'+second);

        intDiff_1--;
        if(intDiff_1 <-1){
            clearInterval(SetTime);
            getResult();
            window.location.href="special_maShang_soon.html?pid="+glo_link+"";
        }
    }, 1000);
}

function getLottery(){

    if(wx_flag==1){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {

            window.location='banding_mobile.html';//跳转绑定手机页面
        }else{

            window.location='34-Land.html';
        }
    }
    else
    {
        getLottery_get();
    }

}

function getLottery_get(){
    $.ajax({
        type: 'get',
        url: '' + urlPost + '/Ipad/checkuser',
        data: {
            user_token:user_token
        },
        cache: false,
        dataType: 'json',
        async: true,  //异步执行

        beforeSend: function () {

        },
        success: function (data) {
            var code = data['code'];
            var info = data['info'];
            if (code != 200) {
                // tanchuan_2(info);

                if(code==520){
                    //用户没有绑定手机
                     swal({
                     title: "",
                     text: '您还没有绑定手机。',
                     html: true,
                     type: "error",
                     confirmButtonText:"确定",
                     confirmButtonColor: "#ff4800",
                     },function(){
                     //设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
                     setTimeout(function(){
                     window.location.href="banding_mobile.html";
                     }, 500);
                     });
                    return;

                }else if(code==517){
                    //用户未登录

                    swal({
                     title: "",
                     text: '您还没有登录。',
                     html: true,
                     type: "error",
                     confirmButtonText:"确定",
                     confirmButtonColor: "#ff4800",
                     },function(){
                     //设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
                     setTimeout(function(){
                     window.location.href="34-Land.html";
                     }, 500);
                     });
                    return;
                }
                tanchuan_0(info, 'error', '确定');
                return;
            }
            //跳转去进行中页面
            window.location.href="special_maShang_ing.html";
        }
    });
}

function getResult(){
    //倒计时走完后--与服务器通信，发送数据给服务器，返回结果后才跳转到即将揭晓页面

    $.ajax({
        type: 'get',
        url: '' + urlPost + '/Ipad/getResult',
        data: {
            lottery_id:glo_lottery_id
        },
        cache: false,
        dataType: 'json',
        async: false,  //同步执行
        beforeSend: function () {

        },
        success: function (data) {
            window.location.href="special_maShang_ing.html";
        }
    });

}