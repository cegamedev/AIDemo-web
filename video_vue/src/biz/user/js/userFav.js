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
  name: "userFavPage",
  data(){
    return {
      pageIndex: 1,
      pageSize: 12,
      totalCount: 0,
      favList: []
    }
  },

  created: function () {

  },

  mounted: function () {
    this.doRefresh();
  },
  methods: {
    doRefresh: function () {
      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      API.User.pageMyCollection(data)
        .then( (res) => {
          let result = res.bizData;
          if (result) {
            this.favList = result.rows;
            this.totalCount = result.records;
          }
        }, (err) => {

        });
    },

    goToCourse: function (index, row) {
      console.log(row.id);
    },

    pageChange: function (data) {
      if (!data) {
        return;
      }
      this.pageIndex = data;
      this.doRefresh();
      console.log('page change...' + data);
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
