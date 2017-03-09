import Vue from 'vue';
import VueRouter from  "vue-router";
//使用路由
Vue.use(VueRouter);

/**
 * 路由映射表
 * @type {*[]}
 */
const routes = [
  {
    path : "/index/home",
    component: require("../biz/index/view/home"),
    meta: { scrollToTop: true,requiresBanner : true}
  },
  {
    path : "/auth/login",
    component: require("../biz/auth/view/login"),
    meta: { scrollToTop: true }
  },
  {
    path : "/auth/forgetPwd",
    component: require("../biz/auth/view/forgetPwd"),
    meta: { scrollToTop: true }
  },
  {
    path : "/auth/resetPwd",
    component: require("../biz/auth/view/resetPassword"),
    meta: { scrollToTop: true }
  },
  {
    path : "/help/index",
    component: require("../biz/help/view/index"),
    meta: { scrollToTop: true }
  },

  //我的课程
  {
    path : "/user/userCourse",
    component: require("../biz/user/view/userCourse"),
    meta: { scrollToTop: true }
  },

  //我的课程计划
  {
    path : "/course/userCoursePlan",
    component: require("../biz/user/view/userCoursePlan"),
    meta: { scrollToTop: true }
  },
  //集体课程计划
  {
    path : "/course/groupCoursePlan",
    component: require("../biz/course/view/groupCoursePlan"),
    meta: { scrollToTop: true }
  },

  //我的排名
  {
    path : "/user/rank",
    component: require("../biz/user/view/userRank"),
    meta: { scrollToTop: true }
  },

  //课程分类介绍页面
  {
    path : "/course/courseTypeInfo/:courseTypeId",
    component: require("../biz/course/view/courseTypeInfo"),
    meta: { scrollToTop: true,requiresBanner : true }
  },

  //添加课程计划
  {
    path : "/course/addCoursePlan",
    component: require("../biz/course/view/addCustomCoursePlan"),
    meta: { scrollToTop: true }
  },

  //课程计划详情页面
  {
    path : "/course/coursePlanDetail/:coursePlanId",
    component: require("../biz/course/view/coursePlanDetail"),
    meta: { scrollToTop: true }
  },

  //我的收藏
  {
    path : "/user/fav",
    component: require("../biz/user/view/userFav"),
    meta: { scrollToTop: true }
  },

  //我的信息
  {
    path : "/user/info",
    component: require("../biz/user/view/userInfo"),
    meta: { scrollToTop: true }
  },
  {
    path : "/user/account",
    component: require("../biz/user/view/userAccount"),
    meta: { scrollToTop: true }
  },

  //老师管理
  {
    path : "/teacher/list",
    component: require("../biz/teacher/view/teacherList"),
    meta: { scrollToTop: true }
  },

  {
    path : "/uikit",
    component: require("../biz/test/uikit"),
    meta: { scrollToTop: true }
  },

  //默认路径
  {path: '*', redirect: '/index/home'}
];

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}

const router = new VueRouter({
  routes : routes,
  scrollBehavior
});


/**
 * 路由钩子
 */
router.beforeEach((to, from, next) => {
  console.log("before to..",to);
  console.log("before from..",from);
  let isNeedBanner = false;
  if (to.matched.some(record => record.meta.requiresBanner)) {
     console.log("通栏..");
      isNeedBanner  = true;
  }
  else{
    isNeedBanner = false;
  }

  // DOM 更新了
  Vue.nextTick(function () {
    window.getEventBus().$emit("onRouterChangeBanner",isNeedBanner);
  });

  next();
});


window.getRouter = function(){
  return router;
}

module.exports = {
  router : router
}
