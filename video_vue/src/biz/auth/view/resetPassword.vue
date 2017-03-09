<template>
  <section id="resetPage">

    <div class="c-ct1-logo"></div>
    <div class="c-ct1-box">
      <div class="c-ct1b-left"></div>

      <div class="c-ct1b-right">
        <div class="c-ct1br-title">找回密码</div>
        <div class="c-ct1br-in">
          <input class="c-ct1bri-input" type="password" placeholder="请输入新密码" v-model="pwd" />
          <div style="clear:both;"></div>
        </div>
        <div class="c-ct1br-in">
          <input class="c-ct1bri-input" type="password" placeholder="请输入新密码" v-model="repwd" />
          <div style="clear:both;"></div>
        </div>
        <div class="c-ct1br-txt" style="opacity:0;">
          <div class="c-ct1br-tl">
            <div style="clear:both;"></div>
          </div>
          <div class="c-ct1br-tr">忘记密码</div>
          <div style="clear:both;"></div>
        </div>
        <div class="c-ct1br-subbtn" v-show="!pwd||!repwd">完成并登录</div>
        <div class="c-ct1br-subbtn-active" v-on:click="resetPwdBtnClick()" v-show="pwd&&repwd">完成并登录</div>
      </div>

      <div style="clear:both;"></div>
    </div>

  </section>
</template>
<style scoped lang="scss">
    @import "../css/resetPwd";
</style>
<script type="text/javascript" src="../js/resetPwd.js"></script>
