/**
 * Created by jiaaobo on 16/7/29.
 */




var Platform = {
    
    checkMobile : function(){
        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            return {"type": "iOS"};
        }
        else if (navigator.userAgent.match(/Android/i)) {
            return {"type": "Android"};
        }
        else{
            return   {"type" : "other"};
        }
    },

    checkPlatform: function () {
        var ua = window.navigator.userAgent.toLowerCase();

        if (ua.indexOf("qq/") > -1) {
            return {"message": "qq下载请点击右上角在浏览器中打开", "type": "tx"}
        }
        else if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return {"message": "微信下载请点击右上角在浏览器中打开", "type": "tx"}
        }
        else{
            return   {"type" : "other"};
        }
    },

    checkX5 : function(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(!navigator.userAgent.match(/iPhone|iPad|iPod/i)){
            if (ua.match(/MicroMessenger/i) == 'micromessenger' || ua.indexOf("qq/") > -1) {
                return true;
            }
            else{
                return false;
            }
        }
        return false;

    },

    getAppVersion : function(){
        var ua = window.navigator.userAgent;
        let startIndex = ua.indexOf("AppName/Daydaybb");
        if(startIndex != -1){
            let daydaybbUa = ua.substring(startIndex,ua.length);
            if(daydaybbUa.indexOf("VersionName/") != -1){
                let version  = daydaybbUa.substring(daydaybbUa.indexOf("VersionName/"),daydaybbUa.indexOf(")"))
                    .split("\/")[1];
                return version;
            }
        }
        return "";
    }
};

module.exports = Platform;