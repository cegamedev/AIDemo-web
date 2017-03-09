/**
 * Created by jiaaobo on 16/11/29.
 */
import Util from "util";
import API  from "api";
import constant from "const";
import leftNav from "../../../common/component/leftNav";
import tabBar from "../../../common/component/tabBar";
import editTeachers from "../view/editTeachers";
import paging from "../../../common/component/paging";

export default{
  name: "coursePlanDetailPage",
  data(){

    let courseTypeId = this.$route.params.courseTypeId;
    console.log("courseTypeId -- ", courseTypeId);
    return {

      courseList : [],
      oneCourseType : "",
      lectures : [],
      selectTeacher : '',

      coursePage: {
        pageIndex : 1,
        filterValue : '',
        lectureId  :'',
        courseTypeId :courseTypeId || '',
        pageSize : 10,
        total : 0,
        orderBy : "new"
      }
    }
  },

  mounted: function () {
    this.getCourse(true);
    this.getOneCourseType(this.coursePage.courseTypeId);
    this.getLecturesByCourseTypeId(this.coursePage.courseTypeId);
    $(document).on('scroll',this.onScroll);
  },

  beforeDestroy : function(){
    $(document).off('scroll',this.onScroll);
  },
  methods: {

    threeSearchClick : function(courseTypeId,octcName){
      var from = "全部课程 > 领域课程 > "+this.oneCourseType.name+" > "+octcName;
      //window.location.href = "selectthree.html?courseTypeId=" + courseTypeId+"&from="+encodeURIComponent(from);

    },
    lctNewClick : function(){},

    lctHotClick : function(){

    },
    lctAllClick : function(){

    },
    lctItemClick : function(){

    },



    coursesClick : function(){

    },

    onPageChange : function(index){
      this.coursePage.pageIndex = index;
      this.getCourse(false);
    },

    onSelectOrder : function(val){
      this.coursePage.orderBy = val;
      this.getCourse(true);
    },

    onSelectTeacher : function(index){
      this.selectTeacher = this.lectures[index];
      this.coursePage.lectureId = this.selectTeacher.id;
      this.getCourse(true);
    },

    goAnchor(selector) {
      if(!selector){
        document.body.scrollTop = 0;
        return;
      }
      var anchor = this.$el.querySelector(selector)
      document.body.scrollTop = anchor.offsetTop
    },

    onScroll : function(){
        var scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        var jclt = parseFloat($(".j-ct1-left").css("top"));
        $(".j-ct1-left").css("top", (30 + scrollT) + "px");
    },
    getCourse : function(isFirst){
      this.isCourseTypeLoading = true;
      if(isFirst){
        this.coursePage.pageIndex = 1;
      }
      API.Course.getCourseMutiContion(this.coursePage)
        .then(res=>{
          if(isFirst){
            this.coursePage.total = res.bizData.records;
          }
          this.courseList = res.bizData.rows;

          this.isCourseTypeLoading = false;
        },(err)=>{
          this.isCourseTypeLoading = false;
        });
    },

    getOneCourseType : function(id){
      API.Course.getOneCourseType(id)
        .then(res=>{
          this.oneCourseType = res.bizData;
        });
    },

    getLecturesByCourseTypeId : function(id){
      API.Lecture.getLecturesByCourseTypeId(id)
        .then(res=>{
          let obj  =  {
            name : '所有老师',
            id : ''
          };
          this.lectures = res.bizData;
          this.lectures.unshift(obj);
          console.log( this.lectures);
          this.selectTeacher =  this.lectures[0];
        });
    }

  },
  computed: {

  },
  components: {
    leftNav,
    tabBar,
    paging,
    editTeachers
  }
}
