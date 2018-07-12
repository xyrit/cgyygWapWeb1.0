/**
 * Created by Hong on 2016/3/21.
 */
/*******检查用户是否已经绑定手机和是否登录* start*********/
//取出存储中的用户token
var user_token= window.localStorage.user_token;
$.ajax({
    type: 'get',
    url: '' + urlPost + '/Ipad/checkuser',
    data: {
        user_token:user_token
    },
    cache: false,
    dataType: 'json',
    async: false,
    //timeout:60000,
    beforeSend: function () {

    },
    success: function (data) {
        var code = data['code'];
        var info = data['info'];
        if (code != 200) {


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
                        window.location.href="28-my-data-3_1.html";
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
            //tanchuan_0(info, 'error', '确定');
           // return;
        }
        //跳转去进行中页面
        //window.location.href="special_maShang_ing.html";
    }
});
/*******检查用户是否已经绑定手机和是否登录* end*********/
getGoodsList();
var glo_link;
var glo_lottery_id; //领取幸运码需要传字段
var glo_pid; //领取幸运码需要传字段
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

            $(".loading").show();
        },
        success: function (data) {
            var code = data['code'];
            var info = data['info'];
            if (code != 200) {
                // tanchuan_2(info);
                tanchuan_0(info, 'error', '确定');
                return;
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

            var content=items['content'];//商品内容

            window.localStorage.content  = content;//商品内容，商品详情页需要调用

            var parameters=items['parameters'];//商品副标题、
            var countdown=items['countdown'];//倒计时
            var pics=items['pics'];//商品图片列表
            var picListr='';
            for(i=0;i<pics.length;i++){
                var pic_path=pics[i];
                picListr+='<li><img src="'+pic_path+'"/></li>';
            }
            var link=pid+'&'+'lottery_id='+lottery_id;
            glo_link=link;

            //填充数据
            $("#slides").html(picListr);//轮播图
            if(lottery_id==1){
                $("#title").html('（第一期）'+title+'<span class="text-red">（'+parameters+'）</span>');//标题
            }else if(lottery_id==2){
                $("#title").html('（第二期）'+title+'<span class="text-red">（'+parameters+'）</span>');//标题
            }else if(lottery_id==3){
                $("#title").html('（第三期）'+title+'<span class="text-red">（'+parameters+'）</span>');//标题
            }else{
                $("#title").html('（第四期）'+title+'<span class="text-red">（'+parameters+'）</span>');//标题
            }


            $("#price_old").html('￥'+price+'');
            $("#attend_count").html(attend_count);
            //跳转
            $("#details_link").attr("href","special_maShang_tuwen.html");
            //往期揭晓
            $("#BeforePublishList").attr("href","special_maShang_pastannounce.html?pid="+pid+"");
            //查看我的幸运码
            $("#myCode_link").attr("href","special_maShang_myCode.html?pid="+link+"");
            //开启倒计时
            timer_1(countdown);

        }
    });
}

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
            //倒计时走完后--与服务器通信，发送数据给服务器，返回结果后才跳转到即将揭晓页面
           // window.location.href="special_maShang_soon.html?pid="+glo_link+"";
            getResult();
        }
    }, 1000);
}
//页面加载判断是否满足领取幸运码条件
var get_type=1;
/*getLottery_if(get_type);*/
function getLottery_if(get_type){
    $.ajax({
        type: 'get',
        url: '' + urlPost + '/Ipad/receive_code',
        data: {
            user_token:user_token,
            type:get_type,
            pid:glo_pid,
            lottery_id:glo_lottery_id
        },
        cache: false,
        dataType: 'json',
        async: true,  //异步执行
        //timeout:60000,
        beforeSend: function () {

            //$(".loading").show();
        },
        success: function (data) {
            var code = data['code'];
            var info = data['info'];
            if (code != 200) {
                // tanchuan_2(info);
               if(code==517){
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
                }else if(code==521){
                    if(get_type==1){
                        $("#share_get").attr("disabled","disabled");
                        $("#share_get").html('<img src="images/share_btn_2.png"/>已领取');
                    }else if(get_type==2){

                        $("#share_weixin").attr("disabled","disabled");
                    }else{

                    }
                }else if(code==523){
                    if(get_type==1){
                        $("#share_get").attr("disabled","disabled");
                        $("#share_get").html('<img src="images/share_btn_2.png"/>已领取');
                    }else if(get_type==2){

                        $("#share_weixin").attr("disabled","disabled");
                    }else{

                    }
                }
                else{
                    //tanchuan_0(info, 'error', '确定');
                }

                return;
            }
            //自动领取，按钮变成不可点击
            if(get_type==1){
                $("#share_get").attr("disabled","disabled");
                $("#share_get").html('<img src="images/share_btn_2.png"/>已领取');
            }else if(get_type==2){

                $("#share_weixin").attr("disabled","disabled");
            }else{

            }
            //领取成功后刷新当前页面
            window.location.reload();

        }
    });

}

//检查是否满足领取幸运码的条件

$.ajax({
    type: 'get',
    url: '' + urlPost + '/Ipad/check_recevie',
    data: {
        user_token:user_token,
        pid:glo_pid,
        lottery_id:glo_lottery_id
    },
    cache: false,
    dataType: 'json',
    async: false,  //同步执行
    //timeout:60000,
    beforeSend: function () {
        //$(".loading").show();
    },
    success: function (data) {
        var code = data['code'];
        var info = data['info'];

        if (code != 200) {

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
                        window.location.href="28-my-data-3_1.html";
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

            return;
        }

        var items=data['items'];
        //0 是不可领取  1 是可以领但是没有领  2已经领取了。微信只有0 2 。 没有1。
        var share_1=items['info']['1']; //每日领取
        var share_2=items['info']['2']; //微信分享
        var share_3=items['info']['3']; //参与领取

        var num=items['num']; //参与码数量
        var ratio=items['ratio']; //百分比，打败了多少人
        $("#ma_count").html(num);
        $("#ma_percnt").html(ratio);

        if(share_1==2){
            $("#share_get").attr("disabled","disabled");
            $("#share_get").html('<img src="images/share_btn_2.png"/>已领取');
        }
        if(share_1==1){
            $("#share_get").attr("onClick","getLottery_if(1);");
        }
        //判断微信分享领取
        if(share_2==2){
            //$("#share_weixin").attr("disabled","disabled");
            $("#share_weixin").html('<img src="images/share_btn_2.png"/>已分享');
            //已经领取
        }

        //判断参与领取
        if(share_3==0){
            //不可领取
            $("#share_attend").attr("onClick","window.location.href='index.html'");

        }else if(share_3==1){
            //可以领取
            $("#share_attend").html('<img src="images/share_btn_3.png"/>领取幸运码');
            $("#share_attend").attr("onClick","getLottery_if(3);");

        }
        else{
            //已经领取
            $("#share_attend").html('<img src="images/share_btn_3.png"/>已云购');
            $("#share_attend").attr("disabled","disabled");
        }



    }
});

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
            window.location.href="special_maShang_soon.html?lottery_id="+glo_lottery_id+"";
        }
    });
    //
}