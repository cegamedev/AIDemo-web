/**
 * Created by jiaaobo on 17/2/16.
 */
import {Net} from "util";

export default class  {

  /**
   * 登录
   */
  static login(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/login/login",{},data);
  }

  /**
   * 修改密码发送验证码
   */
  static sendCode(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/login/sendCode",{},data);
  }

  /**
   * 校验验证码
   */
  static validateCode(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/login/validateCode",{},data);
  }

  /**
   * 修改密码
   */
  static updatePassword(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/login/updatePassword",{},data);
  }



}
