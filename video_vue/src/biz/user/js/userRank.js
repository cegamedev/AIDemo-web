/**
 * Created by jiaaobo on 16/11/29.
 */
import Util from "util";
import API  from "api";
import constant from "const";
import leftNav from "../../../common/component/leftNav";
import tabBar from "../../../common/component/tabBar";
import { MessageBox } from 'element-ui';

export default{
  name: "userRankPage",
  data(){
    return {
      rankList: [],
      myRank: '',
      currentUser: '',
      isLoadingCourse: false,
      userInfo: ''
    }
  },

  created: function () {
    this.userInfo = Util.Storage.getLgObj('userInfo');
    this.getTeacherRankList();
  },

  mounted: function () {

  },
  methods: {
    getTeacherRankList: function () {
      this.isLoadingCourse = true;
      API.User.getTeacherRank()
        .then((res) => {
          let result = res.bizData;
          this.isLoadingCourse = false;
          if (result) {
            this.myRank = {
              rank: result.myRank,
              distance: result.distance
            };
            this.rankList = result.userRanks;
          }
        }, (err) => {
          this.isLoadingCourse = false;
        });
    },

    about: function () {
      Util.UI.alert('根据老师们学习总时长进行排名，因为系统更新存在延时，如果数据没有更新，请耐心等待哦', '提示')
        .then(() => {

        }).catch((err) => {

      });
    }

  },
  computed: {

  },
  components: {
    leftNav,
    tabBar
  }
}
