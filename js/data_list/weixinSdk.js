/**
 * Created by Hong on 2016/3/18.
 */
/*

 */

//http://local.cgyyg.com/cgyyg1.0/wap.php/Ipad/getsign

var title=window.localStorage.title; //调用活动主页存下来的标题
var url_link=window.localStorage.url_link; //调用活动主页存下来的浏览器地址
var pics_first=window.localStorage.pics_first; //调用活动主页存下来的商品第一张图片
var param=encodeURIComponent(location.href.split('#')[0]);



$.getJSON(""+urlPost+"/Ipad/getsign?url="+param+"",function(result){
    //获取配置参数
    if(result.status==1){
        getShare(result.info);
    }
});

function getShare(conf){
    wx.config({
        debug: false,
        appId: conf.appId,
        timestamp:conf.timestamp,
        nonceStr: conf.noncestr,
        signature: conf.signature,
        jsApiList: [
            //需要调用的函数列表
            //分享到朋友圈
            //分享到朋友
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ]
    });
    wx.ready(function () {

        /*wx.checkJsApi({
            jsApiList: [
                'getNetworkType',
                'previewImage'
            ],
            success: function (res) {
                alert(JSON.stringify(res));
            }
        });*/

        //分享到朋友圈

        wx.onMenuShareTimeline({
            title: ''+title+'',
            link: ''+weixin_url+'/m/special_maShang_index.html',
            imgUrl: ''+pics_first+'',
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回

            },
            success: function (res) {
                //分享成功执行的事件
                var get_type=2;
                getLottery_if(get_type);
                $(".share_bg").hide();
            },
            cancel: function (res) {
                //用户取消分享

            },
            fail: function (res) {
                //alert(JSON.stringify(res));
                swal({
                    title: "",
                    text: '分享失败',
                    html: true,
                    type: "error",
                    confirmButtonText:"确定",
                    confirmButtonColor: "#ff4800",
                });
            }
        });
        //分享到朋友
        wx.onMenuShareAppMessage({
            title: ''+title+'',
            link: ''+weixin_url+'/m/special_maShang_index.html',
            imgUrl: ''+pics_first+'',
            desc: '',
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回

            },
            success: function (res) {
                var get_type=2;
                getLottery_if(get_type);
            },
            cancel: function (res) {

            },
            fail: function (res) {
                //alert(JSON.stringify(res));
                swal({
                    title: "",
                    text: '分享失败',
                    html: true,
                    type: "error",
                    confirmButtonText:"确定",
                    confirmButtonColor: "#ff4800",
                });
            }
        });
    });
}
