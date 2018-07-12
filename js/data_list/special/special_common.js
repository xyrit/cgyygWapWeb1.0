/**
 * Created by Hong on 2016/3/29.
 */
/******判断是否是微信登录*******/
function is_weixn(){

    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {

      /*  if (document.all) {var o = document.createElement('a'); o.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc10af3f90aced41f&redirect_uri=http://www.cgyyg.com/cgyyg1.0/wap.php/OtherLogin/oauth&response_type=code&scope=snsapi_userinfo&state=12&url_type=12&#wechat_redirect'; document.body.appendChild(o); o.click(); } else {window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc10af3f90aced41f&redirect_uri=http://www.cgyyg.com/cgyyg1.0/wap.php/OtherLogin/oauth&response_type=code&scope=snsapi_userinfo&state=12&url_type=12&#wechat_redirect'; }*/
        return true;
    } else {

        return false;
    }
}
is_weixn();