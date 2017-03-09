/**
 * Created by jiaaobo on 16/11/29.
 */
import Util from "util";
import API  from "api";
import constant from "const";
import leftNav from "../../../common/component/leftNav";
import tabBar from "../../../common/component/tabBar";
import LoadingText from "../../../common/component/loadingText";

export default{
  name: "groupCoursePlanPage",
  data(){
    return {
      schoolInfo : "",
      tabList : [
        {
          name : "user",
          desc : "自主学习课程"

        },
        {
          name : "group",
          desc : "集体课程"
        }
      ],

      tabSelect : '',
      dialogUserCourseVisible : false,
      unCompleteCoursePlans : [],
      completeCoursePlans : [],
      allSchoolCoursePlans : []

    }
  },

  mounted: function () {

    API.Course.getSchoolLearnTeacherMap()
      .then(res=>{
        this.schoolInfo = res.bizData;
      });

  },
  methods: {

    onForwardCoursePlanDetail : function(obj){
      window.getRouter().push({
        path : `/course/coursePlanDetail/${obj.id}`
      });
    },

    onRemoveCoursePlan : function(index,obj){
      Util.UI.confirm('确认将该课程从集体课程中移除?','提示')
        .then(res=>{
          console.log("删除");
          obj.isDeleteLoading = true;
          API.Course.andOrCancelTeamCourse(obj.id,2)
            .then(res=>{
              Util.UI.toast("删除成功!");
              this.getAllSchoolTeamCourse();
              obj.isDeleteLoading = false;
            },(err)=>{
              obj.isDeleteLoading = false;
            });

        },(e)=>{});

    },

    getAllSchoolTeamCourse : function(){
      let page = {
        pageIndex : 1,
        pageSize : 9999
      };

      API.Course.allSchoolTeamCourse(page)
        .then(res=>{
          this.allSchoolCoursePlans = res.bizData.rows.map((r)=>{
            r.isDeleteLoading = false;
            return r;
          });
        });
    },

    getSchoolCoursePlan : function(){
      let page = {
        pageIndex : 1,
        pageSize : 9999
      };

      //获得未完成的集体课程
      API.Course.allSchoolUnCompleteCoursePlans(page)
        .then(res=>{
          this.unCompleteCoursePlans = res.bizData.rows;
        });

      //获得已完成的集体课程
      API.Course.allSchoolCompleteCoursePlans(page)
        .then(res=>{
          this.completeCoursePlans = res.bizData.rows;
        });
    },

    onSelectTab : function(){
      if(this.tabSelect.name == 'user'){
        this.getSchoolCoursePlan();
      }
      else{
        this.getAllSchoolTeamCourse();
      }
    }
  },
  computed: {

  },
  components: {
    leftNav,
    tabBar,
    LoadingText
  }
}
