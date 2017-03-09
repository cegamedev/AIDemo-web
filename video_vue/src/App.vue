<template>
  <section>
    <header-main  :userinfo="userinfo"/>
        <div id="containerMain" class="container container-pd-top" :class="{'w-container-sm' : !isBanner}" >
          <!-- 路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
        </div>
    <footer-main />
  </section>
</template>

<script>
import FooterMain from "./common/component/footer";
import headerMain from "./common/component/header";
import API  from "api";
import Util  from "util";
export default {

   data(){
    return {
      userinfo : '',
      isBanner : false,
    }
  },



  beforeCreate : function(){
    console.log("before..");
  },

  created : function(){

      //更新用户信息
      this.userinfo = Util.Storage.getLgObj('userInfo');

      //接受监听
      window.getEventBus().$on("onUserInfo",(type,msg)=>{
          this.getUserInfo();
      });

       //接受监听
      window.getEventBus().$on("onUserInfo",(type,msg)=>{
          this.getUserInfo();
      });

      //变更banner
      window.getEventBus().$on("onRouterChangeBanner",(b)=>{
            this.isBanner = b;
      });


  },

   beforeDestroy : function(){
    window.getEventBus().$off("onUserInfo");
     window.getEventBus().$off("onRouterChangeBanner");
     window.getEventBus().$off("userInfoChange");
  },

  methods : {
    getUserInfo : function(){
      API.User.getUserInfo()
        .then(res=>{
             this.userinfo = res.bizData;
             Util.Storage.setLgObj("userInfo",res.bizData);

        });
    }
  },
  computed : {
      getNeedBanner : function(){
      console.log(window.isNeedBanner);
        return !window.isNeedBanner || false;
      }
  },

  components: {
    headerMain,
    FooterMain
  }
}
</script>

<style lang="sass">
  @import "./lib/reset/h5_light.css";
  @import "./common/skin/template.scss";
</style>
