/**
 * Created by Hong on 2016/3/22.
 */
//取出存储中的用户token
var user_token= window.localStorage.user_token;
var pid=GetQueryString('pid');
var lottery_id=GetQueryString('lottery_id');
//查看我的参与码
$.ajax({
    type: 'get',
    url: '' + urlPost + '/Ipad/viewcode',
    data: {
        user_token:user_token,
        pid:pid,
        lottery_id:lottery_id
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
        var info=data['info'];
        if (code != 200) {

            if (code == 520)
            {
                //用户没有绑定手机
                swal({
                    title: "",
                    text: '您还没有绑定手机。',
                    html: true,
                    type: "error",
                    confirmButtonText: "确定",
                    confirmButtonColor: "#ff4800",
                }, function () {
                    //设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
                    setTimeout(function () {
                        window.location.href = "28-my-data-3_1.html";
                    }, 500);
                });
                return;

            }
            else if(code == 517)
            {
                //用户未登录

                swal({
                    title: "",
                    text: '您还没有登录。',
                    html: true,
                    type: "error",
                    confirmButtonText: "确定",
                    confirmButtonColor: "#ff4800",
                }, function () {
                    //设置一个定时器点击后500毫秒跳转，解决跳转页面时的闪问题
                    setTimeout(function () {
                        window.location.href = "34-Land.html";
                    }, 500);
                });
                return;
            }

            return;
        }
        if(info=='无相关记录'){
            $("#ma_count").html('0');
            $("#ma_percnt").html('0%');
            $("#meiri_ma_count").html('0个');
            $("#weixin_ma_count").html('0个');
            $("#attend_ma_count").html('0个');
            return;
        }
        var num = data['num']; //参与码数量
        var ratio = data['ratio']; //百分比，打败了多少人
        //来源
        var sourse=data['source'];
        var sourse_1=sourse['1'];//每日领取的数量
        var sourse_2=sourse['2'];//分享微信的数量
        var sourse_3=sourse['3'];//参与云购的数量
        $("#ma_count").html(num);
        $("#ma_percnt").html(ratio);
        $("#meiri_ma_count").html(''+sourse_1+'个');
        $("#weixin_ma_count").html(''+sourse_2+'个');
        $("#attend_ma_count").html(''+sourse_3+'个');

        //参与码列表
        var items = data['items'];
        var luckyCodeStr='';
        for(i=0;i<items.length;i++){
            var code_create_time=items[i]['create_time'];//参与时间
            var lucky_code=items[i]['lucky_code'];//参与码
            var my_trueAttendCode='';
            var s=lucky_code.split(',');//把startCode分离出来，然后以分号连接成一个新数字
            for(var j = 0;j<s.length;j++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
                //把startCode分离出来，然后以分号连接成一个新数字
                my_trueAttendCode+='<span class="display-ib padding-r-8">'+(Number(s[j]))+'</span>';
            }
            //时间戳格式化
            //参与时间
            var  time_attend= code_create_time;
            var newDate_attend = new Date();
            newDate_attend.setTime(time_attend * 1000);
            var my_create_time_attend=newDate_attend.format('yyyy-MM-dd hh:mm:ss');
            luckyCodeStr+='<p class="text-gray nomargin fz_12px">'+my_create_time_attend+'</p>';//创建时间
            luckyCodeStr+='<p class="nomargin">'+my_trueAttendCode+'</p>';//幸运码,弹出框中的
        }

        $("#my_code_group").html(luckyCodeStr);


    }






});