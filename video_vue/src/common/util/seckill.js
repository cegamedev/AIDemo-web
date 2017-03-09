/**
 * 秒杀倒计时
 */
var TimerList = [];
let $interval   = setInterval;

/**
 * 创建一个timer
 */
var _createTimer = function (endDate,runningCallBack,endCallBack,onlyTimer,severDate) {
  console.log("创建 timer...");
  var id,currentTimer;
  if(onlyTimer){
    id = "__ca_"+ onlyTimer;
    //查看timer是否存在
    if(currentTimer = _getTimer(id)){
      //停止
      _clearTimer(id);
      console.log("停止timer>.");
      //删除
      TimerList.splice(TimerList.indexOf(currentTimer),1);
    }
  }
  else{
    id = "__ca_" + new Date().getTime();
  }

  let calc = severDate - new Date().getTime();
  console.log("服务端与前端时间差值",calc);

  //生成一个id
  var timer = $interval(_executeFunBridge(id,endDate,runningCallBack,endCallBack,calc), 1000);
  var obj = {id: id, timer: timer};
  TimerList.push(obj);
  console.log(TimerList.length);
  return obj;
};

var _executeFunBridge = function (id,endDate,runningCallBack,endCallBack,calc) {
  return function () {
    executeFun(id,endDate,runningCallBack,endCallBack,calc);
  }
};
var executeFun = function (id,ed,runningCallBack,endCallBack,calc) {
  var endDate = new Date(ed);
  var nowDate;
  if(!calc){
    nowDate = new Date();
  }
  else{
    nowDate = new Date(new Date().getTime() + calc);
    console.log(nowDate.getTime());
  }
  var tm = _getTimer(id);
  if (nowDate.getTime() >= ed) {
    console.log("时间已经过时!");
    if(tm){
      clearInterval(tm.timer);
      //_clearTimer(tm.id);
      endCallBack(nowDate.getTime());
    }
    return true;
  }

  var countDown = getTimerString(endDate.getTime() - nowDate.getTime());

  //消息
  if(countDown && runningCallBack){
    runningCallBack(countDown);
  }
};

var getTimerString = function (time) {
  var d,h,m,s;

  d = Math.floor(time / 86400000),
    h = Math.floor((time % 86400000) / 3600000),
    m = Math.floor(((time % 86400000) % 3600000) / 60000),
    s = Math.floor(((time % 86400000) % 3600000 % 60000) / 1000);
  if (time > 0){
    var str = "";
    if(d && d != 0){
      str += d + "天";
    }

    str += h < 10 ? ("0"+h) + ":" : h +":";
    str +=  m < 10 ? ("0"+m) + ":" : m +":";
    str +=  s < 10 ? ("0"+s) : s;
    return str;
  }
  else
    return "";
};

var _getTimerList = function () {
  return TimerList;
};

var _getTimer = function (id) {
  for(var i=0; i<TimerList.length;i++){
    var obj  = TimerList[i];
    if (obj.id == id){
      return obj;
    }
  }
};

var _clearTimer = function (id) {
  TimerList.forEach(function (timeObj) {
    if (timeObj.id == id){
      console.log("停止timer");
      clearInterval(timeObj.timer);
      //$interval.cancel(timeObj.timer);
      TimerList.splice(TimerList.indexOf(timeObj),1);
    }
  });
};


var _clearAll = function(){
  TimerList.forEach(function (timeObj) {
    if (timeObj){
      $interval.cancel(timeObj.timer);
      TimerList.splice(TimerList.indexOf(timeObj),1);
    }
  });
}

/**
 *  查询全部
 *  查询单个timer
 *  取消单个timer
 */
module.exports = {
  getTimerList: _getTimerList,
  getTimer: _getTimer,
  clearTimer: _clearTimer,
  createTimer: _createTimer,
  clearAll: _clearAll,
  getTimerString : getTimerString
}
