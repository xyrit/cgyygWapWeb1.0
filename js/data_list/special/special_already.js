/**
 * Created by Hong on 2016/3/23.
 */

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
            var start_code=items['start_code'];
            var lottery_code=Number(items['lottery_code']); //开奖幸运码
            for(i=0;i<pics.length;i++){
                var pic_path=pics[i];
                picListr+='<li><img src="'+pic_path+'"/></li>';
            }
            var link=pid+'&'+'lottery_id='+lottery_id;
            glo_link=link;

            //获奖用户信息
            var userinfo=data['items']['userinfo'];
            var nickname=userinfo['nickname'];
            var face=userinfo['face'];
            var uid_other=userinfo['uid'];
            var attend_ip=userinfo['attend_ip'];
            var lucky_code=userinfo['lucky_code'];
            var create_time=userinfo['create_time'];//用户的参与时间
            var ip_address=userinfo['ip_address'];
            var attend_count=userinfo['attend_count'];

            var lottery_time=data['items']['lottery_time'];//开奖时间
            var uid_link=uid_other+'&'+'nickname='+escape(nickname);//当未登录或者查看他人的参与或者晒单或者中奖记录时 浏览器传递的参数（昵称需要编码传递）
            //参与时间
            var  time_attend= lottery_time;
            var newDate_attend = new Date();
            newDate_attend.setTime(time_attend * 1000);
            var new_lottery_time=newDate_attend.format('yyyy-MM-dd hh:mm:ss');
            /*start 获奖用户的参与码，点击模态框弹出**/
            var attend_info=data['items']['attend_info'];
            var luckyCodeStr='';
            for(j=0;j<attend_info.length;j++){
                var create_time=attend_info[j]['create_time']; //参与时间
                var lucky_code_alert=attend_info[j]['lucky_code']; //中奖用户的参与码。可能有多个的情况，需要切割
                //参与时间
                var  time_attend= create_time;
                var newDate_attend = new Date();
                newDate_attend.setTime(time_attend * 1000);
                var my_create_time_attend=newDate_attend.format('yyyy-MM-dd hh:mm:ss');

                var my_trueAttendCode='';
                var s=lucky_code_alert.split(',');//把startCode分离出来，然后以分号连接成一个新数字
                for(var k = 0;k<s.length;k++){//在循环里面不能定义两个相同的变量，i和J 不能两个I
                    //把startCode分离出来，然后以分号连接成一个新数字
                    if(lottery_code==(Number(s[k]))){
                        my_trueAttendCode+='<span class="display-ib padding-r-8 text-danger">'+(Number(s[k]))+'</span>';
                    }else{
                        my_trueAttendCode+='<span class="display-ib padding-r-8">'+(Number(s[k]))+'</span>';
                    }

                    // my_trueAttendCode+='<span class="display-ib padding-r-8">'+(glo_startCode+Number(s[j]))+'</span>';
                }
                luckyCodeStr+='<p class="text-gray2">'+my_create_time_attend+'</p>';//创建时间
                luckyCodeStr+='<p class="word-break margin-r_8">'+my_trueAttendCode+'</p>';//幸运码,弹出框中的
            }
            $("#myAttend_count2").html('本期共参与了<span class="text-danger">'+attend_count+'</span>人次');
            $("#luckyCode").html(luckyCodeStr);
            /*end 获奖用户的参与码，点击模态框弹出**/

            //填充数据
            $("#slides").html(picListr);//轮播图
            $("#title").html(title+'<span class="text-red">（'+parameters+'）</span>');//标题
            $("#lotteryCode").html(lottery_code);
            /*start 获奖用户的信息*/
            if(face==''){
               // $("#userImg").html('<img src="images/default1.png" class="userImg img_publish"/>');
                if(typeof(uid) == "undefined"||uid!=uid_other){
                    $("#userImg").html('<a href="35-personal-other.html?uid='+uid_link+'"><img src="images/default1.png" /></a>');
                }else{
                    $("#userImg").html('<a href="35-personal.html"><img src="images/default1.png" /></a>');

                }
            }
            else{
                if(typeof(uid) == "undefined"||uid!=uid_other){
                    $("#userImg").html('<a href="35-personal-other.html?uid='+uid_link+'"><img src="'+face+'" class="userImg img_publish"/></a>');
                }else{
                    $("#userImg").html('<a href="35-personal.html"><img src="'+face+'" class="userImg img_publish"/></a>');

                }
                //$("#userImg").html('<img src="'+face+'"/>');
            }
            if(typeof(uid) == "undefined"||uid!=uid_other)
            {
                $("#prizer").html('获奖者：<a class="text-red" href="35-personal-other.html?uid='+uid_link+'">'+nickname+'</a><span>（'+ip_address+'）</span>');
            }
            else
            {
                $("#prizer").html('获奖者：<a class="text-red" href="35-personal.html">'+nickname+'</a><span>（'+attend_ip+'）</span>');
            }

            $("#userId").html('用户ID：'+uid_other+'（唯一不变标识）');
            $("#attendCount").html(attend_count);
            /*end 获奖用户的信息*/

            $("#price_old").html('￥'+price+'');
            $("#attend_count").html(attend_count);

            $("#publishTime").html('揭晓时间：'+new_lottery_time+'');
            //跳转
            $("#details_link").attr("href","special_maShang_tuwen.html");
            //往期揭晓
            $("#BeforePublishList").attr("href","special_maShang_pastannounce.html?pid="+pid+"");
            //查看计算详情
            $("#rcorners5").attr("href","special_maShang-calculation.html?lottery_id="+lottery_id+"");
            //查看我的幸运码
            $("#myCode_link").attr("href","special_maShang_myCode.html?pid="+link+"");


        }
    });
}
