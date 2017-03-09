/**
 * Created by jiaaobo on 17/2/16.
 */


import {Net} from "util";

export default class  {

  /**
   * 获取名师信息
   */
  static getLectures(){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/lecture/getLectures",{},{});
  }

  /**
   * 所有老师
   */
  static getAllLectures(data){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/lecture/getAllLectures",{},data);
  }
  /**
   * 获取某个课程类型下的明师信息
   */
  static getLecturesByCourseTypeId(id){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/lecture/getLecturesByCourseTypeId",{},{courseTypeId : id});
  }


  static getTop4Lectures(){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/lecture/getTop4Lectures",{},{});
  }



}
