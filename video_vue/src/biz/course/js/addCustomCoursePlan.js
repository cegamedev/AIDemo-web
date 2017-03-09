/**
 * Created by jiaaobo on 16/11/29.
 */
import Util from "util";
import API  from "api";
import constant from "const";
import paging from "../../../common/component/paging";
import loadingBtn from "../../../common/component/loadingBtn";

export default{
  name: "addCoursePlanPage",
  data(){
    return {
      courseList: [],
      teacherList : [],


      saveLoading : false,
      courseTypeFirstList : [],
      courseTypeSecondList : [],
      courseTypeThirdList : [],
      selectCourseType : [],

      coursePlanName : '',

      selectCourseFirst : "",
      selectCourseSecond : "",
      selectCourseThird : "",

      isCourseTypeLoading : false,

      //当前table
      courseTable : [],
      //数据源
      courseTableDataSource : [],

      currentTable : '',

      coursePage: {
        pageIndex : 1,
        filterValue : '',
        lectureId  :'',
        courseTypeId :'',
        pageSize : 20,
        total : 0,
        orderBy : "new"
      }
    }
  },

  mounted: function () {


    //有编辑请打开
    // let coursePlanId = this.$route.params.coursePlanId;
    // if(!coursePlanId){
    //   Util.UI.toast("coursePlanId 未传递!");
    //   return;
    // }
    // this.getCourseTableByPlanId();

    this.getCourse(true);
    this.getAllLectures();
    this.getCourseTypes();
    this.initCourseTable();

  },
  methods: {

    //初始化课程表
    initCourseTable : function(){
      this.courseTablePage = {
        pageIndex : 1,
        pageSize  : 5
      };
      this.searchCourseTable(this.courseTablePage.pageIndex,this.courseTablePage.pageSize);
    },

    selectdCourseItem : function(course,week,index){
      //当前选中的
      this.selectedWeek = week;
      this.selectedCourse = course;

      this.courseTable.forEach((w)=>{
          w.courses.forEach((c)=>{
            if(c.active)
               c.active = false;
          });
      });
      course.active = true;
      this.updateCourseStatus(course);
    },

    onSaveCoursePlan : function(){

      if(!this.coursePlanName){
        Util.UI.toast("请输入课程计划名称!");
        return;
      }

      this.saveLoading = true;

      let course = [];
      this.getSelectedWeek(this.courseTableDataSource).forEach((w)=>{
        w.courses.forEach((c)=>{
          if(c.id)
            course.push({courseId : c.id, week : w.week,courseName : c.courseName})
        });
      });

      let data = {
        coursePlanName : this.coursePlanName,
        course : course
      };

      console.log(data);

      API.Course.addCoursePlan(data)
        .then(res=>{
          Util.UI.toast("添加成功!");
          this.saveLoading = false;
        },err=>{
          this.saveLoading = false;
        });
    },







    //更新左侧课程状态 add replace
    updateCourseStatus : function(course){
      let status = 'add';

      if(!course){
        this.courseList = this.courseList.map((c)=>{
          c.opStatus = '';
          return c;
        });
        return;
      }

      //当前是否有内容
      if(course.courseName){
         status = 'replace';
      }

      if(status == 'add'){
        this.courseList = this.courseList.map((c)=>{
          c.opStatus = 'add';
          return c;
        });
      }
      else{
        this.courseList = this.courseList.map((c)=>{
          if(c.id == course.id){
            c.opStatus = 'cancel';
          }
          else{
            c.opStatus = 'replace';
          }
          return c;
        });
      }
    },

    onAddCourse : function(course){
      if(this.selectedWeek){
        let index = this.selectedWeek.courses.indexOf(this.selectedCourse);
        this.selectedCourse.courseName = course.courseName;
        this.selectedCourse.id = course.id;
        this.needRepeat();
        this.selectedWeek.courses.splice(index,1,this.selectedCourse);
        this.updateCourseStatus(this.selectedCourse);

      }

    },
    onRemoveCourse : function(course){
      if(this.selectedWeek){
        let index = this.selectedWeek.courses.indexOf(this.selectedCourse);
        this.selectedCourse.courseName = '';
        this.selectedCourse.id = '';
        this.selectedWeek.courses.splice(index,1,this.selectedCourse);
        this.updateCourseStatus(this.selectedCourse);

      }
    },


    needRepeat : function(){
      let num = 0;
      this.courseTableDataSource.forEach((week)=>{
        num += week.courses.filter((c)=>{
          return c.courseName === this.selectedCourse.courseName}
        ).length;
      });
      console.log(num);
      if(num > 1){
        this.selectedCourse.needRepeat = true;
      }
    },

    onUpdateWeek : function(type){
      if(type == 'next'){
        this.courseTablePage.pageIndex++;
      }
      else{
        this.courseTablePage.pageIndex--;
        if(this.courseTablePage.pageIndex <=0){
          this.courseTablePage.pageIndex = 1;
        }
      }
      this.searchCourseTable(this.courseTablePage.pageIndex,this.courseTablePage.pageSize)
    },


    resetTable : function(){
      this.selectedCourse = '';
      this.courseTable.forEach((w)=>{
        w.courses.forEach((c)=>{
          if(c.active)
             c.active = false;
        });
      });
      this.updateCourseStatus(this.selectedCourse);
    },

    onUpdateCourseTable : function(type){
      this.courseTable.forEach((w)=>{
        if(type == 'add'){
          this.createCourse(w,1);
        }
        else{
          w.courses.pop();
        }
      });
      this.resetTable();
      setTimeout(()=>{
        //滚动底部
        Util.Location.scrollTo("#addTable",0,true);
      },200);

    },

    //选择最热or最新
    onSelectOrder : function(command){
      this.coursePage.orderBy = command;
      this.getCourse(true);
    },

    //模糊查询
    onInputSearchCourse : function(){
      this.getCourse(true);
    },

    //首个选择
    onCoursePlanTypeFirstChange : function(value){
      console.log("first   ",value);
      if(Util.Validate.isStringEmpty(value)){
          this.courseTypeSecondList = [];
          this.coursePage.courseTypeId = '';
          this.courseTypeSecondList  = [];
          this.courseTypeThirdList = [];
      }
      else{
        let selected = this.courseTypeFirstList[value];
        this.coursePage.courseTypeId =  selected.id;
        if(selected.childs && selected.childs.length > 0){
          this.courseTypeSecondList = selected.childs;
        }
      }

      this.selectCourseSecond = '';
      this.selectCourseThird = '';
      this.getCourse(true);
    },

    //其次选择
    onCoursePlanTypeSecondChange : function(value){
      console.log("second   ",value);
      if(!Util.Validate.isStringEmpty(value)){
        this.coursePage.courseTypeId =  this.courseTypeSecondList[value].id;
        this.getCourseTypeById(this.coursePage.courseTypeId);
      }
      else{
        this.coursePage.courseTypeId = this.courseTypeFirstList[this.selectCourseFirst].id;
        this.courseTypeThirdList = [];
      }

      this.getCourse(true);
    },

    //最后选择
    onCoursePlanTypeThirdChange : function(value){
      console.log("3   ",value);
      if(!Util.Validate.isStringEmpty(value)){
        this.coursePage.courseTypeId =  this.courseTypeThirdList[value].id;
      }
      else {
        this.coursePage.courseTypeId = this.courseTypeSecondList[this.selectCourseSecond].id;
      }
      this.getCourse(true);
    },

    searchCourseTable : function(index,size){
      console.log("search...");
      let offset = (index - 1) *   size;
      let lastIndex = offset + size;
      //超出
      if(lastIndex > this.courseTableDataSource.length){
        this.createPage(this.courseTableDataSource,5,5);
      }

      this.courseTable = this.courseTableDataSource.slice(offset,lastIndex);
      console.log(this.courseTable);
      this.resetTable();
    },

    createPage : function(weeks,weekNum,courseNum){
       let wk = this.createWeek(weeks,weekNum);
       wk.forEach((w)=>{
            this.createCourse(w,courseNum);
        });
      return wk;
    },

    //创建一行课程
    createCourse : function(week,num){
        num = num || 5;
        for(var j=0;j<num;j++){
          let col = {
            courseName  : '',
            active : false
          }
          week.courses.push(col);
        }
        return week;
    },

    //创建一组周
    createWeek : function(weeks,num){
      weeks = weeks || [];
      for(var i=0;i<num;i++){
        let row = {
          week : this.getLastWeek(weeks) + 1,
          courses : []
        };
        weeks.push(row);
      }
      return weeks;
    },

    getLastWeek : function(weeks){
      if(weeks.length > 0)
        return weeks[weeks.length -1].week;
      else
        return 0;
    },

    getAllLectures : function(){
      API.Lecture.getAllLectures()
        .then(res=>{
          this.teacherList = res.bizData;
        },(err)=>{
        });
    },

    getCourseTypeById : function(id){
      API.Course.getOneCourseType(id)
        .then(res=> {
          this.courseTypeThirdList = res.bizData.childs || [];
        },(err)=>{});
    },

    getCourseTypes : function(){
      API.Course.getCourseTypes()
        .then(res=> {
          this.courseTypeFirstList = res.bizData;
        },(err)=>{ });
    },



    getSelectedWeek : function(list){
      return list.filter((c)=>{
          for(var i=0;i<c.courses.length;i++){
              let obj = c.courses[i];
              if(obj.id){
                return true;
              }
          }
        return false;
      });
    },



    //获得左侧课程
    getCourse : function(isFirst){
      this.isCourseTypeLoading = true;

      // this.resetTable();

      if(isFirst){
        this.coursePage.pageIndex = 1;
      }
      API.Course.getCourseMutiContion(this.coursePage)
        .then(res=>{
          if(isFirst){
            this.coursePage.total = res.bizData.records;
          }
          this.courseList = res.bizData.rows;

          console.log('asd-> ',this.getSelectedWeek(this.courseTable));

          if(this.selectedCourse){
            this.updateCourseStatus(this.selectedCourse);
          }



          this.isCourseTypeLoading = false;
        },(err)=>{
          this.isCourseTypeLoading = false;
        });
    },

    //获得右侧课程表
    getCourseTableByPlanId : function(){
      API.Course.getCourseTableByPlanId()
        .then(res=>{
          this.courseTable = res.bizData;
        });
    },

    pageChange : function(index){
      this.coursePage.pageIndex = index;
      this.getCourse(false);
    },

  },
  computed: {
    hasPrePage(){
      if(this.courseTable.length > 0  && this.courseTable[0].week == 1){
        return false;
      }
      return true;
    }
  },
  components: {
    paging,
    loadingBtn
  }
}
