<template>
  <div class="c-header-section" id="headerMain" name="headerMain">
    <div class="c-header">
      <div class="c-h-logo" v-on:click="loginBtnClick()"></div>
      <div class="c-h-txt">
        <span class="c-h-t" style="width:40px;" v-on:click="navClick('/home/index')">首页</span>
        <span class="c-h-t" v-on:click="navClick('/course/courseList')">全部课程</span>
        <span class="c-h-t" v-on:click="navClick('/course/userCoursePlan')" >课程计划</span>
        <span class="c-h-t" v-on:click="navClick('')" style="opacity:0;">关于名师</span>
        <div style="clear:both;"></div>
      </div>
      <div class="c-c-h-search">
        <div class="c-c-h-s-box">
          <input class="c-c-h-s-input" placeholder="搜索课程" v-model="searchKey" v-on:keyup.enter="searchBtnClick(searchKey)" />
          <div class="c-c-h-s-btn" v-on:click="searchBtnClick(searchKey)"></div>
        </div>
      </div>

      <div class="c-c-h-help">
            <div class="j-teacher-txt c-c-h-h-t1" v-if="!userinfo" v-on:click="loginBtnClick()">
              登录
            </div>
            <slot v-if="userinfo">
              <div @click="userBtnClick()">
                <div><img v-bind:src="userinfo.portrait" class="c-c-h-h-y"  v-show="userinfo.portrait" width="100%"></div>
                <div class="j-teacher-txt c-c-h-h-t1" v-if="userinfo">
                  {{userinfo.userName}}老师
                  <div class="c-teacher-logout" v-if="teacherLogout" v-on:click="loginBtnClick()">退出</div>
                </div>
                <div class="c-c-h-h-x"></div>
              </div>
            </slot>
            <div class="c-c-h-h-s"></div>
            <div class="c-c-h-h-t2"><a href="javascript:void(0)" v-on:click="helpBtnClick()">帮助</a></div>
            <div style="clear:both;"></div>

      </div>


      <div class="j-h-wx c-h-wx">
        <img class="j-h-wxmg c-h-wxmg" src="../../resources/images/c-h-wxmg.png">
      </div>
      <div style="clear:both;"></div>
    </div>

    <!--<div class="c-h-section">-->
      <!--<div class="c-h-logo" v-on:click="logoBtnClick()"></div>-->
      <!--<div class="c-h-txt">-->
        <!--<span class="c-h-t" style="width:40px;" v-on:click="topMClick('index.html')">首页</span>-->
        <!--<span class="c-h-t" v-on:click="topMClick('selectthree.html?from=menuBtn')">全部课程</span>-->
        <!--<span class="c-h-t" v-on:click="topMClick('')" style="opacity:0;">课程计划</span>-->
        <!--<span class="c-h-t" v-on:click="topMClick('')" style="opacity:0;">关于名师</span>-->
        <!--<div style="clear:both;"></div>-->
      <!--</div>-->
      <!--<div class="c-h-search-index">-->
        <!--<div class="c-h-s-box">-->
          <!--<input class="c-h-s-input" placeholder="搜索课程" v-model="searchKey" v-on:keyup.enter="searchBtnClick(searchKey)" />-->
          <!--<div class="c-h-s-btn" v-on:click="searchBtnClick(searchKey)"></div>-->
        <!--</div>-->
        <!--<div class="c-h-s-keys">-->
          <!--<span class="c-h-s-k" v-on:click="searchBtnClick('游戏')">游戏</span>-->
          <!--<span class="c-h-s-k" v-on:click="searchBtnClick('艺术')">艺术</span>-->
          <!--<span class="c-h-s-k" v-on:click="searchBtnClick('应彩云')">应彩云</span>-->
        <!--</div>-->
      <!--</div>-->

      <!--<div class="c-h-help-index">-->
        <!--<template v-if="userinfo!=''">-->
          <!--<div class="c-h-h-y" >-->
            <!--<img v-bind:src="userinfo.portrait" v-show="userinfo.portrait" width="100%">-->
          <!--</div>-->
          <!--<div class="j-teacher-txt c-h-h-t1">-->
            <!--{{userinfo.userName}}老师-->
            <!--<div class="c-teacher-logout" v-if="teacherLogout" v-on:click="logoutBtnClick()">退出</div>-->
          <!--</div>-->
          <!--<div class="c-h-h-x"></div>-->
        <!--</template>-->
        <!--<template v-if="userinfo==''">-->
          <!--<div class="c-h-h-t1" v-on:click="loginBtnClick()">登录</div>-->
        <!--</template>-->

        <!--<div class="c-h-h-s"></div>-->
        <!--<div class="c-h-h-t2"><a v-on:click="helpBtnClick()">帮助</a></div>-->
        <!--<div style="clear:both;"></div>-->
      <!--</div>-->

      <!--<div class="j-h-wx c-h-wx">-->
        <!--<img class="j-h-wxmg c-h-wxmg" src="../../resources/images/c-h-wxmg.png">-->
      <!--</div>-->
      <!--<div style="clear:both;"></div>-->
    <!--</div>-->
  </div>
</template>
<style>
</style>
<script>
  export default {
  name: "headerMain",
  props : ['userinfo'],
  created : function(){
  },
  methods : {
    loginBtnClick : function(){
      this.navClick(`/home/index`);
        window.getRouter().push({
          path : `/home/index`
        });
    },
    helpBtnClick : function(){
     this.navClick(`/help/index`);
    },

    navClick : function(path){
      window.getRouter().push(path);
    },
     userBtnClick : function(){
      this.navClick(`/user/info`);
    }
  },
  data(){
    return {
    }
  },

  components: {

  }
}

</script>
