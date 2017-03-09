  <template>
  <section id="userInfoPage" class="fix">

    <left-nav  navActive=""/>

    <div class="c-right-content">

      <section class="template-block  user-base">

        <div class="user-info-bar">
          <h5 class="font-14 user-info-label">基本资料</h5>
        </div>

        <form method="post" name="baseForm" class="base-form"  novalidate>

          <div class="form-group">
            <label class="ib">头像</label>
            <div class="ib" @click="onUploadUserHead()">
              <span class="user-head bg-img-clip ib" :style="{backgroundImage : `url(${user.portrait})`}"></span>
            </div>
          </div>

          <div class="form-group">
            <label class="ib">姓名</label>
            <div class="ib">
              <input type="text"  v-model="user.userName" placeholder="请输入姓名" class="input-base" require/>
            </div>
          </div>

          <div class="form-group">
            <label class="ib">性别</label>
            <div class="ib">
              <el-select v-model="user.sex" placeholder="请选择" require>
                <el-option
                  v-for="item in ['男','女']"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="form-group">
            <label class="ib">生日</label>
            <div class="ib">
              <el-date-picker
                v-model="user.birthday"
                type="date"
                placeholder="选择日期"
                :picker-options="{}">
              </el-date-picker>
            </div>
          </div>

          <div class="form-group">
            <label class="ib">手机</label>
            <div class="ib text-gray-color">
              <span class="font-13">{{user.phone}}</span>
            </div>
          </div>

          <div class="text-center">

            <loading-btn  :onLdClick="onUpdateBaseUserInfo" clz="btn btn-primary btn-md btn-w-md font-16 btn-radius" :isLoading="isBtnUpdateLoading || false">
              保存
            </loading-btn>

          </div>

        </form>


      </section>



      <section class="template-block user-desc mt15">

        <div class="user-info-bar">
          <h5 class="font-14 user-info-label">详细资料</h5>
        </div>

        <form method="post" name="descForm" class="base-form"  novalidate>

          <div class="form-group">
            <label class="ib">学校</label>
            <div class="ib text-gray-color">
              <span class="font-13">{{user.schoolName}}</span>
            </div>
          </div>


          <div class="form-group">
            <label class="ib">身份</label>
            <div class="ib text-gray-color">
              <span class="font-13">{{user.userType | userType}}</span>
            </div>
          </div>

          <div class="form-group">
            <label class="ib">班级</label>
            <div class="ib text-gray-color">
              <el-select v-model="user.classCode" placeholder="请选择班级" require>
                <el-option
                  v-for="clazz in classList"
                  :label="clazz.className"
                  :value="clazz.classCode">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="text-center">
            <loading-btn  :onLdClick="onUpdateDescUserInfo" clz="btn btn-primary btn-md btn-w-md font-16 btn-radius" :isLoading="isBtnUpdateOtherLoading || false">
              保存
            </loading-btn>
          </div>

        </form>


      </section>


    </div>


    <!-- 上传头像 -->
   <upload-dialog  :showUpload="dialogUploadUserHeadVisible" uploadUrl="http://imzhiliao.com:10000/file/upload/savefile.shtml"  :onUploadSuccess="onUploadSuccess" />

  </section>
</template>
<style scoped lang="scss">
  @import "../css/userInfo";
</style>
<script type="text/javascript" src="../js/userInfo.js"></script>
