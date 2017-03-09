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
  name: "userCoursePlanPage",
  data(){
    return {
      pageIndex: 1,
      pageSize: 8,
      totalCount: 0,
      pageIdx: 1,
      pageSz: 8,
      totalCt: 0,
      tabList: [
        {
          name: "learning",
          desc: "学习中"

        },
        {
          name: "finish",
          desc: "已完成"
        }
      ],
      tabSelect: '',
      learningPlanList: [],
      finishPlanList: []
    }
  },

  created: function () {
    this.doRefresh();
    this.doFinishRefresh();
  },

  mounted: function () {

  },
  methods: {
    //学习中
    doRefresh: function () {
      let data = {
        type: 0,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };

      API.Course.myAllCoursePlans(data)
        .then((res) => {
          let result = res.bizData;
          if (result) {
            this.learningPlanList = result.rows;
            this.totalCount = result.records;
          }

        });
    },
//已完成
    doFinishRefresh: function () {
      let data2 = {
        type: 1,
        pageIndex: this.pageIdx,
        pageSize: this.pageSz
      };

      API.Course.myAllCoursePlans(data2)
        .then((res) => {
          let result = res.bizData;
          if (result) {
            this.finishPlanList = result.rows;
            this.totalCt = result.records;
          }
        });
    },
    goToPlay: function (num, obj, index) {
      if (!obj) {
        return;
      }
      let id = '';
      if (num === 1) {//学习中
        id = (obj.allCourse && obj.allCourse.length > 0 )? obj.allCourse[0].id : '';
      } else if (num === 2) {//已完成
        id = (obj.allCourse && obj.allCourse.length > 0 )? obj.allCourse[obj.allCourse.length - 1].id : '';
      }
      //TODO 进入播放课程页
      // window.getRouter().push({
      //   path : `/course/coursePlanDetail/${obj.id}`
      // });
      console.log(id);
    },

    onSelectTab: function () {

    },
    pageChangeHandler: function (data) {
      this.pageIdx = data;
      this.doFinishRefresh();
    },

    pageChange: function (data) {
      this.pageIndex = data;
      this.doRefresh();
    }

  },
  computed: {

  },
  components: {
    leftNav,
    tabBar,
    paging
  }
}
