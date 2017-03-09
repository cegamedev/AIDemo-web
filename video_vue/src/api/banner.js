/**
 * Created by jiaaobo on 17/2/16.
 */


import {Net} from "util";

export default class  {
  /**
   * 获取顶部轮播图
   */
  static getBanners(){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/banner/getBanners",{},{});
  }

  /**
   * 获取广告
   */
  static getAdverts(){
    return Net.postCicadaJSON(window.SERVER_PATH.url.teacher+"/banner/getAdverts",{},{});
  }



}
