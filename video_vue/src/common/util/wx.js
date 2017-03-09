/**
 * Created by jiaaobo on 16/7/27.
 * 微信相关sdk
 */

import  wx from  "weixin-js-sdk";

var JSSDK = {


  /**
   * 获得位置
   *
   * @param type
   * @returns {Promise}
   */
  getLocation : function(type){
    return new Promise(function(resolve,reject){
      // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      let type = type || 'wgs84';
      wx.getLocation({
        type: type,
        success : function (res) {
          //res.latitude; // 纬度，浮点数，范围为90 ~ -90
          //res.longitude; // 经度，浮点数，范围为180 ~ -180。
          //res.speed; // 速度，以米/每秒计
          //res.accuracy; // 位置精度
          resolve(res);
        },
        cancel : function(res) {
          reject({state : 10002, desc : '用户拒绝授权获取地理位置'});
        },
        fail : function(){
          reject({state : 10001, desc : '获取失败'});
        }
      });

    });
  },

  openLocation : function(latitude,longitude){
    wx.openLocation({
      latitude: parseFloat(latitude), // 纬度，浮点数，范围为90 ~ -90
      longitude: parseFloat(longitude), // 经度，浮点数，范围为180 ~ -180。
      name: '', // 位置名
      address: '', // 地址详情说明
      scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
      infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
    });

  },

  /**
   * 选择图片
   * @param option
   * @returns {Promise}
     */
  chooseImage : function(option){
    option = option || {
        count : 9,
        // 可以指定是原图还是压缩图，默认二者都有
        sizeType: ['original', 'compressed'],
        // 可以指定来源是相册还是相机，默认二者都有
        sourceType: ['album', 'camera']};

    return new Promise(function(resolve,reject){
        wx.chooseImage({
          count: option.count,
          sizeType: option.sizeType,
          sourceType: option.sourceType,
          success: (res)=>{
            resolve(res);
          },
          fail : function(){
            reject({state : 10001, desc : '获取失败'});
          }
        });
    });
  },


  /**
   * 上传图片
   * @param option
   * @returns {Promise}
     */
  uploadImage : function(localId,option){

    option = option || {
        // 默认为1，显示进度提示
        isShowProgressTips : 1};

    return new Promise(function(resolve,reject){

        wx.uploadImage({
          localId : localId,
          isShowProgressTips: option.isShowProgressTips,
          success : function(res){
            resolve(res);
          },
          fail : function(){
            reject({state : 10001, desc : '获取位置失败'});
          }
        });

    });
  },


  toggleMenu : function(isShow,type){
    let spreadMenu;
    if(isShow){
      //传播
      if(type == "spread"){
        spreadMenu = [
          'menuItem:share:appMessage',
          'menuItem:share:timeline',
          'menuItem:share:qq',
          'menuItem:share:weiboApp',
          'menuItem:favorite',
          'menuItem:share:facebook',
          'menuItem:share:QZone'
        ];
      }
      wx.showMenuItems({menuList : spreadMenu});
    }
    else{
      wx.hideAllNonBaseMenuItem();
    }


  },

  recursionImage : function(localIds,option,callBack){
    option = option || {
        // 默认为1，显示进度提示
        isShowProgressTips : 1};
    var localId = localIds.pop();
    wx.uploadImage({
      localId : localId,
      isShowProgressTips: option.isShowProgressTips,
      success : function(res){
        let state = 1;

        if(localIds.length > 0){
          JSSDK.recursionImage(localIds,option,callBack);
          state = 0;
        }
        else{
          state = 1;
        }
        callBack(state,{localId : localId, serverId : res.serverId});
      }
    });
  },

  /**
   * 选择并且上传图片
   * @param option
   */
  chooseAndUploadImage : function(option){
    return new Promise(function(resolve,reject){
      JSSDK.chooseImage(option)
        .then(function(res){
          if(res.localIds.length  <= 0){
            resolve([]);
            return;
          }

          let result = [];
          JSSDK.recursionImage(res.localIds,option,function(state,obj){
            result.push(obj);

            if(state == 1){
              resolve(result);
            }
          });

        },function(err){
          reject(err);
        });
    });


  },
  previewImage : function (urls,index) {
    index = index || 0;
    wx.previewImage({
      current: urls[index], // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    });

  },

  wxPay : function(obj){
    return new Promise(function(resolve,reject){
      wx.chooseWXPay({
        timestamp: obj.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: obj.nonceStr, // 支付签名随机串，不长于 32 位
        package: obj.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: obj.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: obj.paySign, // 支付签名
        success: function (res) {
          // 支付成功后的回调函数
          resolve(res);
        },
        fail : function(res) {
          reject({state : 500, desc : res});
        },
        cancel:function(res){
          //支付取消
          reject({state : 10000, desc : res});
        }

      });

    });
  },

  sharePage  : function(shareData){
      wx.onMenuShareAppMessage(shareData);
      wx.onMenuShareTimeline(shareData);
      wx.onMenuShareQQ(shareData);
      wx.onMenuShareWeibo(shareData);
  },

  isWX :function(){
    var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    }
    return false;
  }
};

module.exports = JSSDK;
