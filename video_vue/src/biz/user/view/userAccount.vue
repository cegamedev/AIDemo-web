  <template>
  <section id="userInfoPage" class="fix">

    <left-nav  navActive="7"/>

    <div class="c-right-content">

      <tab-bar  :tabList="tabList" v-model="tabSelect"  v-on:input="onSelectTab()" />

      <section class="template-block">

        <form method="post" name="baseForm" class="base-form"  novalidate>


          <div class="form-group">
            <label class="ib">原密码</label>
            <div class="ib">
              <input type="password"  v-model="oldPassword" placeholder="请输入原密码" class="input-w-lg input-base" require/>
            </div>
          </div>

          <div class="form-group">
            <label class="ib">新密码</label>
            <div class="ib">
              <input type="password"  v-model="newPassword" placeholder="请输入新密码" class="input-w-lg input-base" require/>
            </div>
          </div>

          <div class="form-group">
            <label class="ib">确认新密码</label>
            <div class="ib">
              <input type="password"  v-model="repeatPassword" placeholder="请重复输入新密码" class="input-w-lg input-base" require/>
            </div>
          </div>

          <div class="form-group">
            <label class="ib">&nbsp;</label>
            <div class="ib text-gray-color font-12">
              <span class="user-tips">*</span> 请确保新密码与旧密码不同.<br/>
              <span class="user-tips">*</span> 密码必须是6-12位
            </div>
          </div>

          <div class="text-center">

            <loading-btn  :onLdClick="updatePwd" clz="btn btn-primary btn-md btn-w-md font-16 btn-radius" :isLoading="isBtnUpdateLoading || false">
              确定
            </loading-btn>

          </div>

        </form>


      </section>



    </div>

  </section>
</template>
<style scoped lang="scss">
  @import "../css/userAccount";
</style>
<script type="text/javascript" src="../js/userAccount.js"></script>
