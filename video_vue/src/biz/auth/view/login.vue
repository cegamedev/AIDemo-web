<template>
  <section id="loginPage">


    <div class="c-ct1-logo"></div>
    <div class="c-ct1-box">
      <div class="c-ct1b-left"></div>
      <div class="c-ct1b-right">
        <div class="c-ct1br-title">欢迎登录</div>
        <div class="c-ct1br-in">
          <div class="c-ct1bri-icon1"></div>
          <input class="c-ct1bri-input" type="text" placeholder="请输入您的用户名" v-model="account" />
          <div style="clear:both;"></div>
        </div>
        <div class="c-ct1br-in">
          <div class="c-ct1bri-icon2"></div>
          <input class="c-ct1bri-input" type="password" placeholder="请输入您的密码" v-model="pwd" />
          <div style="clear:both;"></div>
        </div>
        <div class="c-ct1br-txt">
          <div class="c-ct1br-tl">
            <el-checkbox class="login-check" v-model="isAuto"></el-checkbox>
            <span class="c-ct1brtl-s1">记住密码</span>
            <div style="clear:both;"></div>
          </div>
          <div class="c-ct1br-tr" v-on:click="forgetPwdBtnClick()">忘记密码</div>
          <div style="clear:both;"></div>
        </div>
        <div class="c-ct1br-subbtn" v-on:click="loginBtnClick()">登录</div>
      </div>
      <div style="clear:both;"></div>
    </div>



  </section>
</template>
<style scoped lang="scss">
    @import "../css/login";
</style>
<script type="text/javascript" src="../js/login.js"></script>
