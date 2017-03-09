<template>
  <div class="c-left-nav">

    <ul class="c-nav-list">
      <li>
        <router-link href="javascript:void(0)" :to="{'path' : '/user/info'}">
          <div class="c-user-info">
            <span class="ib c-user-info-img bg-img-clip"  :style="{backgroundImage : `url(${getImgUrl})`}"></span>
            <span class="user-name text-color">{{userinfo.userName}}老师</span>
          </div>
        </router-link>
      </li>
      <li v-for="(nav,index) in navList" :class="{'active' : nav.active}" >
        <router-link  :to="{'path' : nav.navUrl}">
          <i class="iconfont" :class="[nav.navIcon]"></i>
          <span class="nav-name">{{nav.navName}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  import Util from "util";
  export default{
    props : ['navActive'],
    data(){
      return {
        userinfo  : '',
        navList  : [
          {
            'navName' : "我的课程",
            'navIcon' : 'icon-plan-seq',
            'navUrl'  : '/user/userCourse',
             navId     : 1,
          },
           {
            'navName' : "全园课程计划",
            'navIcon' : 'icon-book',
            'navUrl'  : '/course/groupCoursePlan',
            navId     : 2

          },
            {
            'navName' : "我的课程计划",
            'navIcon' : 'icon-book',
            'navUrl'  : '/course/userCoursePlan',
            navId     : 3

          },
            {
            'navName' : "老师管理",
            'navIcon' : 'icon-teacher',
            'navUrl'  : '/teacher/list',
             navId     : 4

          },
           {
            'navName' : "学习排名",
            'navIcon' : 'icon-rank',
            'navUrl'  : '/user/rank',
            navId     : 5
          },
           {
            'navName' : "我的收藏",
            'navIcon' : 'icon-heart',
            'navUrl'  : '/user/fav',
            navId     : 6
          },
           {
            'navName' : "我的账户",
            'navIcon' : 'icon-account',
            'navUrl'  : '/user/account',
            navId     : 7
          }
        ]
      }
    },

     beforeDestroy : function(){
        window.getEventBus().$off("userInfoChange");
     },

    mounted: function () {

       let list = this.navList.map(nav=>{
          if(nav.navId == this.navActive ){
              nav.active = true;
          }
          else{
              nav.active = false;
          }
          return nav;
      });
      this.navList  = list;
      this.userinfo =  Util.Storage.getLgObj("userInfo");


      window.getEventBus().$on("userInfoChange",(userInfo)=>{
            this.userinfo = userInfo;
      });


    },
    methods: {

    },
    computed: {
      getImgUrl : function(){
        return this.userinfo.portrait;
      }
    },
    components: {
    }
  }
</script>
