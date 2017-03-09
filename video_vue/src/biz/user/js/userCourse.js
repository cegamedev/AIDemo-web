/**
 * Created by jiaaobo on 16/11/29.
 */
import Util from "util";
import API  from "api";
import constant from "const";
import leftNav from "../../../common/component/leftNav";
import tabBar from "../../../common/component/tabBar";
import paging from "../../../common/component/paging";
export default{
  name: "userCoursePage",
  data(){
    return {
      tabList : [
        {
          name : "mb",
          desc : "学习目标"

        },
        {
          name : "history",
          desc : "播放历史"
        }
      ],
      tabSelect : '',
      dialogUserCourseVisible : false,

      //课程表
      weekList : [],
      //学习目标
      learnTarget : '',
      //播放历史
      playHistoryList  : [],

      //开始日期
      startWeek : 0,

      currentDate : '',
      isLoadingCourse : true,


      playHistoryPage : {
        pageIndex : 1,
        pageSize : 3,
        total : 0
      }
    }
  },

  mounted: function () {


  },
  methods: {

    pageChange : function(index){
      this.playHistoryPage.pageIndex = index;
      this.getMyLearnHistory(true);
    },

    //监听显示课程表
    onShowCourse : function(){
      this.dialogUserCourseVisible = true;
      this.getMyCourseTable();

    },

    //监听翻页日期
    onNextOrPreWeek : function(type){
      if(type == 'pre'){
        this.startWeek = this.weekList[0].weekIndex  - 5;
      }
      else{
        this.startWeek = this.weekList[this.weekList.length - 1].weekIndex + 1;
      }
      this.getMyCourseTable();
    },

    onSelectTab : function(a){
      if(this.tabSelect.name == 'mb'){
        this.getLearningTarget();
      }
      else{
        this.getMyLearnHistory(true);
      }
    },

    getMyLearnHistory : function(isFirst){

      API.Course.getMyLearnHistory(this.playHistoryPage)
        .then(res=>{
            if(isFirst){
              this.playHistoryPage.total = res.bizData.records;
            }
           this.playHistoryList = res.bizData.rows;
        },(err)=>{
        });

    },

    getMyCourseTable : function(){
      this.isLoadingCourse = true;
      let data = {type : 1, startWeek : this.startWeek};
      API.Course.getMyCourseTable(data)
        .then(res=>{
          this.currentDate = res.ts;
          this.weekList = res.bizData;
          this.startWeek =  this.weekList[0].weekIndex;
          console.log(this.startWeek);
          this.isLoadingCourse = false;
        },(err)=>{
          this.isLoadingCourse = false;
        });
    },

    getLearningTarget : function(){
      //获得学习目标
      API.Course.getMyUncompleteCourseEnd7()
        .then(res=>{
          this.learnTarget = res.bizData;
        });
    },

    getDay : function(day){
      let index = day.indexOf("-");
      return day.substring(index+1)
    }
  },
  computed: {
    getFirstDay : function(){
      if(this.weekList.length > 0)
          return this.weekList[0].firstDay;
    },
    getLastDay : function(){
      if(this.weekList.length > 0)
        return this.weekList[this.weekList.length -1].lastDay;
    },

    getEndWeek : function(){
      if(this.weekList.length > 0)
        return this.weekList[this.weekList.length -1].weekIndex == 52;
    },
    getCurrentDate : function(){
      if(this.currentDate){
        let obj =  Util.Format.getDateTime(this.currentDate);
        return `${obj.y}年${obj.M}月${obj.d}日`
      }
    }
  },
  components: {
    leftNav,
    tabBar,
    paging
  }
}
