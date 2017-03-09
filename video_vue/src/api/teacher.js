/**
 * Created by jiaaobo on 17/2/16.
 */
/**
 * Created by jiaaobo on 17/2/16.
 */
import {Net} from "util";

export default class  {

  /**
   * pc端园长添加老师账号
   */
  static addTeacherAccount(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/teacher/addTeacherAccount",{},data);
  }



  static addOrUpdateTeacherAccount(isAdd,data){
    if(isAdd)
      return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/teacher/addTeacherAccount",{},data);
    else
      return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/teacher/updateTeacherAccount",{},data);

  }

  /**
   * pc端园长修改老师账号
   */
  static updateTeacherAccount(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/teacher/updateTeacherAccount",{},data);
  }

  /**
   * pc端园长删除老师账号
   */
  static delTeacherAccount(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/teacher/delTeacherAccount",{},data);
  }

  /**
   * pc端获取老师账号列表
   */
  static getTeacherList(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/teacher/pageTeacher",{},data);
  }

  /**
   * pc端园长重置老师账号的密码
   */
  static resetTeacherPassword(id){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/teacher/resetTeacherPassword",{},{id : id});
  }

  /**
   * 获取参加课程计划的的老师
   */
  static getPlanTeacherList(id){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/getTeachersByPlanId",{},{coursePlanId : id});
  }
  /**
   * 给用户分配课程计划
   */
  static assignCoursePlan4User(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/assignCoursePlan4User",{},data);
  }
  /**
   * 获取该用户所属学校的班级列表
   */
  static getClassesByUser(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/user/getClassesByUser",{},data);
  }
  /**
   * 获取该学校的职位列表
   */
  static getPositionList(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/position/getPositions",{},data);
  }

}
