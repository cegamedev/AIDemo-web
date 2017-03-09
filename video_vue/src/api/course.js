/**
 * Created by jiaaobo on 17/2/16.
 */


import {Net} from "util";

export default class  {

  /**
   * 多条件获取课程列表
   */
  static getCourseMutiContion(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/getCourseMutiContion",{},data);
  }


  /**
   * 根据课程类型获取课程计划
   * @param courseTypeId
   */
  static getLecturesByCourseTypeId(courseTypeId){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/getCoursePlansByCourseType",{},{courseTypeId : courseTypeId});
  }

  /**
   * 获取一个课程的信息
   * @param courseId
   */
  static getOneCourseDetail(courseId){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/getOneCourseDetail",{},{courseId : courseId});
  }


  /**
   * 分页获取课程计划
   * @param courseId
   */
  static getCoursePlansMutiContion(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/getCoursePlansMutiContion",{},data);
  }

  /**
   * 点击开始观看时，请求服务端
   * 这个接口主要是服务端要记录每一个视频的播放次数）
   * @param courseId
   */
  static viewRecord(courseId){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/viewRecord  ",{},{courseId : courseId});
  }

  /**
   * 学习记录（每两分钟上报一次）
   * @param courseId
   */
  static learnRecord(courseId){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/learnRecord  ",{},{courseId : courseId});
  }


  /**
   * 获取视频上次播放的时间点
   * @param courseId
   */
  static getLastLearnTime(courseId){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/getLastLearnTime  ",{},{courseId : courseId});
  }


  /**
   * 获取一个课程计划的信息（包括该课程计划下的课程信息）
   * @param coursePlanId
   */
  static oneCoursePlan(coursePlanId){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/oneCoursePlan  ",{},{coursePlanId : coursePlanId});
  }

  /**
   * 取课程计划的老师学习情况
   * @param coursePlanId
   */
  static getTeacherLearnInfoByPlanId(coursePlanId){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/getTeacherLearnInfoByPlanId  ",{},{coursePlanId : coursePlanId});
  }


  /**
   * 给用户分配课程计划
   * @param coursePlanId
   */
  static assignCoursePlan4User(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/assignCoursePlan4User  ",{},data);
  }


  /**
   * 根据一个课程获取该课程所属计划下的所有课程
   * @param courseId
   */
  static getCoursePlanByCourseId(courseId){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/getCoursePlanByCourseId  ",{},{courseId : courseId});
  }


  /**
   * 获取我的课表
   * @param courseId
   */
  static getMyCourseTable(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/getMyCourseTable  ",{},data);
  }

  /**
   * 获取课程类型
   * @param
   */
  static getCourseTypes(){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/getCourseTypes  ",{},{});
  }


  /**
   * 获取某个课程类型的信息
   * @param
   */
  static getOneCourseType(courseTypeId){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/getOneCourseType  ",{},{courseTypeId : courseTypeId});
  }


  /**
   * 获取该用户所属学校的班级列表
   * @param
   */
  static getClassesByUser(courseTypeId){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/getClassesByUser  ",{},{});
  }




  /**
   * 获取我的课程计划
   * @param
   */
  static myAllCoursePlans(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/myAllCoursePlans",{},data);
  }


  /**
   * 我的播放历史
   * @param
   */
  static getMyLearnHistory(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/getMyLearnHistory",{},data);
  }


  /**
   * 观看历史
   * @param
   */
  static getMyUncompleteCourseEnd7(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/getMyUncompleteCourseEnd7",{},data);
  }


  /**
   * pc端园获取全园学习中的未完成的自主学习课程计划
   */
  static allSchoolUnCompleteCoursePlans(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/allSchoolUnCompleteCoursePlans",{},data);
  }

  /**
   * 获取全园已完成的自主学习课程计划
   * @param data
   */
  static allSchoolCompleteCoursePlans(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/allSchoolCompleteCoursePlans",{},data);
  }

  /**
   * 获取全园集体课程
   * @param data
   */
  static allSchoolTeamCourse(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/allSchoolTeamCourse",{},data);
  }

  /**
   * 添加、取消课程到集体课程
   * @param data
   */
  static andOrCancelTeamCourse(id,type){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/andOrCancelTeamCourse",{},{courseId : id, action : type});
  }

  /**
   * 获取全园学习老师总数(包括全园本周完成目标)
   * @param data
   */
  static getSchoolLearnTeacherMap(){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/getSchoolLearnTeacherMap",{},{});
  }


  /**
   * 添加课程计划
   * @param data
   */
  static addCoursePlan(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/course/addCoursePlan",{},data);
  }

}
