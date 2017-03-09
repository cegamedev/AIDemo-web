/**
 * Created by jiaaobo on 16/5/20.
 */

var Location = {





    /**
     * ratio 宽高比
     * @param ratio
     */
    ratioElementForWindow(ratio,width){
        var w = width || document.body.clientWidth;
        return {
            w :  w,
            h : parseFloat((w / ratio).toFixed(2))
        }
    },

    scrollTo(className,diff,isNotRoot,contentName){
        let container = document.querySelector(className);
        diff = diff || 0;
        if(!container) return;
        if(!isNotRoot){
            document.body.scrollTop = container.offsetTop + diff;
        }
        else{
          container.scrollTop = container.scrollHeight;
        }
    },
    getParams: function () {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    },

    //编码uri
    encodeParam: function (paramList) {
        var baseUrl = "";
        for (var i = 0; i < paramList.length; i++) {
            var value = paramList[i].value;
            if (i == 0) {
                baseUrl += "?" + paramList[i].key + "=" + encodeURI(value);
            }
            else {
                value = paramList[i].value;
                baseUrl += "&" + paramList[i].key + "=" + encodeURI(value);
            }
        }
        return baseUrl;
    },

    getParamByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        {
            return null
        }
    },

    getHashParamByName: function (name) {
      let queIndex = window.location.hash.indexOf("?");
      if(queIndex!= -1){
        let s = window.location.hash.substring(queIndex);
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = s.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        {
          return null
        }
      }
      return null;
  },

    /**
     * @description 等待几秒后 刷新页面
     * @param time
     *            等待毫秒数
     */
    reloadPage: function (time) {
        var fn = function () {
            window.location = window.location;
        };
        if (!time) {
            time = 0;
        }
        setTimeout(fn, time)
    },

    /**
     * @description 等待几秒 跳转页面
     * @param url
     *            跳转路径
     * @param time
     *            等待毫秒数
     */
    jumpPage: function (url, time) {
        var fn = function () {
            window.location.href = url;
        };
        if (!time) {
            time = 0;
        }
        setTimeout(fn, time)
    }

}

module.exports = Location;
