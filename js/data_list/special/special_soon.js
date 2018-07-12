/**
 * Created by Hong on 2016/3/23.
 */
//取出存储中的用户token
var user_token= window.localStorage.user_token;
var lottery_id = GetQueryString('lottery_id');
getGoodsList_soon();
var glo_lottery_id;
var glo_pid;
function getGoodsList_soon() {
    $.ajax({
        type: 'get',
        url: '' + urlPost + '/Ipad/product',
        data: {
            lottery_id:lottery_id
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
            var countdown=items['countdown'];//已经截止时间倒计时
            var lotterytime=items['lotterytime'];//倒计时--距离开奖倒计时
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
            $("#title").html(title+'<span class="text-red">（'+parameters+'）</span>');//标题

            $("#price_old").html('￥'+price+'');
            $("#attend_count").html(attend_count);
            //跳转
            $("#details_link").attr("href","special_maShang_tuwen.html");
            //往期揭晓
            $("#BeforePublishList").attr("href","special_maShang_pastannounce.html?pid="+pid+"");
            //查看我的幸运码
            $("#myCode_link").attr("href","special_maShang_myCode.html?pid="+link+"");
            //查看计算详情
            $("#rcorners5").attr("href","special_maShang-calculation.html?lottery_id="+lottery_id+"");
            //开启倒计时
            timer_1(lotterytime);

        }
    });
}
//共有多少幸运码，打败多少人
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
        if (code == 200) {
            var items=data['items'];
            var num=items['num']; //参与码数量
            var ratio=items['ratio']; //百分比，打败了多少人
            $("#ma_count").html(num);
            $("#ma_percnt").html(ratio);
        }

    }
});
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

            getResult();
        }
    }, 1000);
}

function getResult(){
    //倒计时走完后--与服务器通信，发送数据给服务器，返回结果后才跳转到已经开奖页面

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
            window.location.href="special_maShang_already.html?lottery_id="+glo_lottery_id+"";
        }
    });
    //
}

