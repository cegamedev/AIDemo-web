<template>
  <section id="forgetPage">

    <div class="c-ct1-logo"></div>
    <div class="c-ct1-box">
      <div class="c-ct1b-left"></div>

      <div class="c-ct1b-right">
        <div class="c-ct1br-title">找回密码</div>
        <div class="c-ct1br-in1">
          <input class="c-ct1bri-input1" type="text" placeholder="请输入手机号" v-model="mobile" />
          <div style="clear:both;"></div>
        </div>
        <div class="c-ct1bri-send" v-show="mobile.length!=11">发送</div>
        <div class="c-ct1bri-send c-ct1bri-send-active" v-on:click="sendCodeClick()" v-show="mobile.length==11">发送</div>
        <div style="clear:both;"></div>
        <div class="c-ct1br-in">
          <input class="c-ct1bri-input" type="text" placeholder="请输入验证码" v-model="code" />
          <div style="clear:both;"></div>
        </div>
        <div class="c-ct1br-txt" style="opacity:0;">
          <div class="c-ct1br-tl">
            <div style="clear:both;"></div>
          </div>
          <div class="c-ct1br-tr">忘记密码</div>
          <div style="clear:both;"></div>
        </div>
        <div class="c-ct1br-subbtn" v-show="!code">下一步</div>
        <div class="c-ct1br-subbtn-active" v-on:click="nextBtnClick" v-show="code">下一步</div>
      </div>

      <!-- <div class="c-ct1b-right">
                <div class="c-ct1br-title">找回密码</div>
                <div class="c-ct1br-in">
                    <input class="c-ct1bri-input" type="text" placeholder="请输入您的用户名" v-model="account" />
                    <div style="clear:both;"></div>
                </div>
                <div class="c-ct1br-in">
                    <input class="c-ct1bri-input" type="password" placeholder="请输入您的密码" v-model="pwd" />
                    <div style="clear:both;"></div>
                </div>
                <div class="c-ct1br-txt" style="opacity:0;">
                    <div class="c-ct1br-tl">
                        <div style="clear:both;"></div>
                    </div>
                    <div class="c-ct1br-tr">忘记密码</div>
                    <div style="clear:both;"></div>
                </div>
                <div class="c-ct1br-subbtn" v-on:click="loginBtnClick">完成并登录</div>
            </div> -->

      <div style="clear:both;"></div>


  </section>
</template>
<style scoped lang="scss">
    @import "../css/forget";
</style>
<script type="text/javascript" src="../js/forget.js"></script>
