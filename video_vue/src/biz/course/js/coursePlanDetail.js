/**
 * Created by jiaaobo on 16/11/29.
 */
import Util from "util";
import API  from "api";
import constant from "const";
import leftNav from "../../../common/component/leftNav";
import tabBar from "../../../common/component/tabBar";
import editTeachers from "../view/editTeachers";

export default{
  name: "coursePlanDetailPage",
  data(){
    return {
      coursePlan : '',
      teacherLearnList : [],
      dialogAllCourseVisible : false,
      dialogTeacherVisible: false,
      showTeacherList: false
    }
  },

  mounted: function () {
    this.coursePlanId = this.$route.params.coursePlanId;
    console.log("当前id -- ", this.coursePlanId);
    this.getCoursePlan(this.coursePlanId);
    this.getTeacherLearnInfoByPlanId(this.coursePlanId);
  },
  methods: {
    getCoursePlan : function(coursePlanId){
      //获得未完成的集体课程
      API.Course.oneCoursePlan(coursePlanId)
        .then(res=>{
            this.coursePlan = res.bizData;
        });

    },
    onShowAllCourse : function(){
      this.dialogAllCourseVisible = true;
    },
    getTeacherLearnInfoByPlanId : function(coursePlanId){
      API.Course.getTeacherLearnInfoByPlanId(coursePlanId)
        .then(res=>{
            this.teacherLearnList = res.bizData;
        });

    },
    onSelectTab : function(){
    },
    editTeachers: function () {
      this.changeTeacherFlag(true);
    },
    changeTeacherFlag: function (flag) {
      if (typeof flag === 'undefined') {
        return;
      }
      this.dialogTeacherVisible = flag;
      this.showTeacherList = flag;
    },

    teacherDialogClose: function () {
      this.changeTeacherFlag(false);
    },
    teacherDialogCallBack: function (data) {
      this.changeTeacherFlag(false);
      this.getTeacherLearnInfoByPlanId(this.coursePlanId);
    }
  },
  computed: {
    getPlanId: function () {
      return this.$route.params.coursePlanId;
    }
  },
  components: {
    leftNav,
    tabBar,
    editTeachers
  }
}
