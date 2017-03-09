/**
 * Created by jiaaobo on 17/2/16.
 */
import {Net} from "util";

export default class  {

  /**
   * 根据token获取用户的基本信息
   */
  static getUserInfo(){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/user/userInfo",{},{});
  }

  /**
   * 获取学校课程信息（首页右侧信息）
   */
  static getSchoolCourseInfo(){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/user/schoolCourseInfo",{},{});
  }
  /**
   * 获取该用户所属学校的班级列表
   */
  static getClassesByUser(){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/user/getClassesByUser",{},{});
  }

  /**
   * 获取参加计划课程的老师
   * @param
   */
  static getCoursePlanUsers(){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/user/getCoursePlanUsers  ",{},{});
  }

  /**
   * 修改用户信息
   * @param
   */
  static updateUserInfo(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/user/updateUserInfo",{},data);
  }

  /**
   * 获取排名
   * @param
   */
  static getTeacherRank(){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/getTeacherRank",{},{});
  }

  /**
   * 获取我的收藏
   * @param
   */
  static pageMyCollection(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/collect/pageMyCollection",{},data);
  }

  /**
   * 用户中心用户自己修改密码
   * @param
   */
  static updateUserPassword(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/user/updateUserPassword",{},data);
  }

}
