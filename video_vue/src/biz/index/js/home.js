/**
 * Created by jiaaobo on 16/11/29.
 */
import Util from "util";
import API  from "api";
import constant from "const";
import Swiper from 'swiper';

export default{
  name: "homePage",
  data(){
    return {
      'userinfo': '',
      'banners': '',
      'adverts': '',
      'schoolCourseInfo': '',
      'lectures': '',
      'courseMutiContion': '',
      'searchKey': '',
      'courseTypes': '',
      'teacherLogout': false
    }
  },

  mounted: function () {

    //获取课程类型
    API.Course.getCourseTypes()
      .then(res=> {
        this.courseTypes = res.bizData;
      });

    API.Banner.getBanners()
      .then(res=> {
        this.banners = res.bizData;
      });

    API.User.getSchoolCourseInfo()
      .then(res=> {
        this.schoolCourseInfo = res.bizData;
      });

    API.Banner.getAdverts()
      .then(res=> {
        this.adverts = res.bizData;
      });

    API.Lecture.getTop4Lectures()
      .then(res=> {
        this.lectures = res.bizData;
      });

    let courseMutiContionParams = {
      'pageIndex': 1,
      'pageSize': 10,
      'filterValue': '',
      'lectureId': '',
      'courseTypeId': ''
    };

    API.Course.getCourseMutiContion(courseMutiContionParams)
      .then(res=> {
        this.courseMutiContion = res.bizData;
      });

  },
  methods: {

    searchBtnClick: function(key) {
      var self = this;
      window.location.href = "selectthree.html?key=" + key + "&from=searchBtn";;
    },
    logoutBtnClick: function() {
      localStorage.setItem('token', '');
      window.location.href = "login.html";
    },
    leftMenuBtnClick: function(courseTypeId) {
      window.getRouter().push(`/course/courseTypeInfo/${courseTypeId}`);
    },
    logoBtnClick: function() {
      window.location.href = "index.html";
    },
    loginBtnClick: function() {
      window.location.href = "login.html";
    },
    coursesClick: function(courseId) {
      window.location.href = "coursesInfo.html?courseId=" + courseId;
    },
    moreCourseClick: function() {
      window.location.href = "selectthree.html";
    }

  },
  computed: {},
  components: {}
}



setTimeout(function() {
  if ($(".jIndexSwp1").find(".swiper-slide").length == 1) {
    $(".jSwpPag1").hide();
    var imgel = $(".jIndexSwp1").find(".swiper-slide").find("img");
    var datasrc = imgel.attr("data-src");
    imgel.attr("src", datasrc);
    $(".jIndexSwp1").find(".swiper-lazy-preloader").hide();
  }
  if ($(".jIndexSwp1").find(".swiper-slide").length > 1) {
    var swiper = new Swiper('.jIndexSwp1', {
      pagination: '.jSwpPag1',
      paginationClickable: true,
      // Disable preloading of all images
      preloadImages: false,
      // Enable lazy loading
      lazyLoading: true,
      autoplay: 3000,
      onTransitionEnd: function(swiper) {
        var bgc = ["rgb(41,166,252)", "rgb(204,233,241)", "rgb(248,182,42)", "rgb(255,245,234)", "#171B3D"];
        console.log(swiper.activeIndex)
        $(".j-ct-bottom").css("background", bgc[swiper.activeIndex]);
      }
    });
  }
}, 1000);

setTimeout(function() {

  // if ($(".jIndexSwp2").find(".swiper-slide").length == 1) {
  // 	$(".jSwpPag2").hide();
  // }
  // if ($(".jIndexSwp2").find(".swiper-slide").length > 1) {
  // 	var swiper = new Swiper('.jIndexSwp2', {
  // 		pagination: '.jSwpPag2',
  // 		paginationClickable: true,
  // 		autoplay: 1000
  // 	});
  // }
  var swiper = new Swiper('.jIndexSwp2', {
    pagination: '.jSwpPag2',
    paginationClickable: true,
    autoplay: 2000
  });


}, 1000);

setTimeout(function() {

  var swiper = new Swiper('.jIndexSwp3', {
    pagination: '.jSwpPag3',
    paginationClickable: true,
    autoplay: 3000
  });

}, 1000);

$(".j-h-wx").mouseover(function() {
  $(".j-h-wxmg").show();
});
$(".j-h-wx").mouseout(function() {
  $(".j-h-wxmg").hide();
});

// $(document).on('mouseover', ".j-teacher-txt", function() {
//   vu.$data.teacherLogout = true;
// });
// $(document).on('mouseleave', ".j-teacher-txt", function() {
//   vu.$data.teacherLogout = false;
// });

$(document).on('click', ".j-banner-a", function() {
  var url = $(this).attr("target-href");
  if (url) {
    window.location.href = url;
  }
});
