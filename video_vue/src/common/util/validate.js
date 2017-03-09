
var Validate = {
    /**
     * 判断是否为手机
     * @param str 手机号
     * @returns {boolean}    true:是 ,false :不是
     */
    isPhone: function (str) {
        var reg = /^0?1[73458]\d{9}$/;
        return reg.test(str);
    },

  isStringEmpty(obj){
      if(obj === "" || obj === undefined){
        return true;
      }
    return false;
  },

  isLeapYear(year){
    return (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
  },

    /**
     * 检测空对象
     * @param value
     * @returns {boolean}
     */
    isEmptyObject(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    },
  isChinese(str) {
    var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
    return reg.test(str);
  }

}

module.exports  = Validate;
