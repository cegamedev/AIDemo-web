/**
 * Created by jiaaobo on 16/11/28.
 */
import Vue from 'vue';


Date.prototype.Format = function(fmt)
{
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
};

module.exports = function(){

  Vue.filter('f_date', function(value, format) {

    if (!value) {
      return 0;
    }

    switch (format) {
      case 's_to_i':
        return parseInt(value/60);
        break;
      case 'yy-mm-dd':
        return getMyDate(value, 'y') + '-' + getMyDate(value, 'm') + '-' + getMyDate(value, 'd');
        break;
      case 'yy-mm-dd h:i':
        return getMyDate(value, 'y') + '-' + getMyDate(value, 'm') + '-' + getMyDate(value, 'd') + ' ' + getMyDate(value, 'h') + ':' + getMyDate(value, 'i');
        break;
      case 'yy.mm.dd h:i':
        return getMyDate(value, 'y') + '.' + getMyDate(value, 'm') + '.' + getMyDate(value, 'd') + ' ' + getMyDate(value, 'h') + ':' + getMyDate(value, 'i');
        break;
      case 'yy-mm-dd h:i:s':
        return getMyDate(value, 'y') + '-' + getMyDate(value, 'm') + '-' + getMyDate(value, 'd') + ' ' + getMyDate(value, 'h') + ':' + getMyDate(value, 'i') + ':' + getMyDate(value, 's');
        break;
    }

    function getMyDate(str, format) {
      var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime = '';
      switch (format) {
        case 'y':
          oTime = oYear;
          break;
        case 'm':
          oTime = getzf(oMonth);
          break;
        case 'd':
          oTime = getzf(oDay);
          break;
        case 'h':
          oTime = getzf(oHour);
          break;
        case 'i':
          oTime = getzf(oMin);
          break;
        case 's':
          oTime = getzf(oSen);
          break;
      }
      return oTime;
    };
    //补0操作
    function getzf(num) {
      if (parseInt(num) < 10) {
        num = '0' + num;
      }
      return num;
    }

  });

  Vue.filter('f_substr', function(value, len, isDot) {

    if (!value) {
      return;
    }

    var valuestr = "";

    if (value.length > len) {
      valuestr = value.substr(0, len);
      if (isDot) {
        valuestr += "...";
      }
    } else {
      valuestr = value;
    }

    return valuestr;

  });

  Vue.filter('userType', function(value) {
    switch (value) {
      case 1:
        return '管理员';
        break;
      case 2:
        return '老师';
        break;
      default:
        return '未知';
    }
  });
  Vue.filter('f_selcolor', function(value) {

    var colorno = '';

    switch (value) {
      case 'KIDCARE':
        colorno = '1';
        break;
      case 'PRIMARY':
        colorno = '2';
        break;
      case 'SMALL':
        colorno = '3';
        break;
      case 'UNKNOWN':
        colorno = '4';
        break;
    }

    return colorno;


  });

  Vue.filter('f_min', function(value) {
    if (!value) {
      return 0;
    }
    var pat = /^[0-9]*$/;
    if (!pat.exec(value)) {
      return 0;
    }
    if (parseInt(value) < 60) {
      return '小于1';
    } else {
      return parseFloat(value/60).toFixed(1);
    }
  });

  Vue.filter('f_rank', function (value) {
    if (!value) {
      return '0小时';
    }
    var pat = /^[0-9]*$/;
    if (!pat.exec(value)) {
      return '0小时';
    }
    var time = parseInt(value);
    if (time < 60) {
      return '不到1分钟';
    } else if (time >= 60 && time < 60 * 60) {
      return Math.round(time / 60) + '分钟';
    } else {
      return Math.round(time / 3600) + '小时';
    }
  });
}
