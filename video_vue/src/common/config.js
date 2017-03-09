/**
 * Created by jiaaobo on 16/11/18.
 */
import Vue from 'vue';
import Filter from "./filter";
import 'whatwg-fetch'
import Util from  "util";


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

//引入UI框架
Vue.use(ElementUI);

//开启debug模式
Vue.config.debug = true;

//导入过滤器
Filter();

//事件总栈
var bus = new Vue();

window.getEventBus = function(){
  return bus;
};


/**
  * 环境检查
  * @param localEnv
*/
var checkCurrentEnv = function (localEnv, rt) {
  var SERVER = {
    url: {
      teacher : "/teacher/web"
    },
    env: ""
  };

  var root = "";

  if(typeof window != 'undefined'){
    root = window.location.origin;
  }
  else{
    root = rt;
  }

  var env, localEnv, port,dot;
  if (localEnv) {
    env = localEnv == "formal" ? "" : localEnv;
  }
  else {
    localEnv = "dev";
    //当前加载环境 dev：开发环境 test：测试环境 "": 生产环境或本地  pre 预发布
    env = root.indexOf("localhost") != -1 ? localEnv : root.indexOf("dev") != -1 ? "dev" : root.indexOf("test")  != -1 ? "test" : root.indexOf("pre") != -1 ? "pre" : "";
  }

  //当前4000 走预发布
  if(env == "" && window.location.port == "4000"){
    env = "pre";
  }

  SERVER.env = env;
  //端口检查
  for (var obj in SERVER.url) {
    var envTemp = env == "" ? "" : (env + ".");
    var port = envTemp != '' ? '' : ":10000";
    //服务地址
    SERVER.url[obj] = "http://" +envTemp+ "imzhiliao.com"+port+ SERVER.url[obj];
  }
  return SERVER;
}

//环境检测
//当前加载环境 dev：开发环境 test：测试环境 "": 生产环境或本地  pre 预发布
let SERVER = checkCurrentEnv("dev");

//服务器地址
window.SERVER_PATH = SERVER;

console.log('当前服务器地址....',SERVER);












