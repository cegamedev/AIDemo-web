<template>
  <section id="teacherListPage" class="fix">

    <left-nav  navActive="4"/>

    <div class="c-right-content teacher-list">

      <!--老师管理-->
      <div class="t-top">
        <button @click="addTeacher" class="btn btn-primary btn-outline">添加老师</button>
        <div class="t-right-span" ><span>共计 {{totalCount}} 名老师，最多还可添加 {{leftCount}} 人</span></div>
      </div>
      <div v-loading="isLoadingTeacher"
           element-loading-text="拼命加载中" class="table-responsive minh320">
        <div v-if="teacherList && teacherList.length <= 0" class="text-center text-gray-color line60 font-14">还没有老师哦</div>
        <table v-if="teacherList && teacherList.length > 0" class="table-base table-center">
          <thead class="table-thead-center">
          <tr>
            <td>
              姓名
            </td>
            <td>
              身份
            </td>
            <td>
              班级
            </td>
            <td>
              手机号
            </td>
            <td>
              管理员
            </td>
            <td>
              激活
            </td>
            <td>
              课程表
            </td>
            <td>
              操作
            </td>
          </tr>
          </thead>
          <tbody class="table-tbody-center">
          <tr v-for="(item, index) in teacherList">
            <td>
             {{item.userName}}
            </td>
            <td>
              {{item.position}}
            </td>
            <td>
              {{item.className}}
            </td>
            <td>
              {{item.phone}}
            </td>

            <td>
              {{item.userType == 1 ? '是' : '否'}}
            </td>
            <td>
              <div v-if="item.activeDate">已激活</div>
              <div class="text-danger" v-else>未激活</div>
            </td>
            <td>
              <a href="javascript:void(0)" class="text-primary ib" @click="viewCourseTable(index, item)">
                查看
              </a>
            <td>
              <a href="javascript:void(0)" class="text-primary ib" @click="editTeacher(index, item)">
                编辑
              </a>
              <loading-text :isLoading="item.delLoading || false">
                <a href="javascript:void(0)" class="text-primary" @click="deleteTeacher(index, item)">
                  删除
                </a>
              </loading-text>
              <loading-text :isLoading="item.resetLoading || false">
                <a href="javascript:void(0)" class="text-primary" @click="resetPwd(index, item)">
                  密码重置
                </a>
              </loading-text>
            </td>
            <!--<td>-->
                <!--<el-button @click="editTeacher(index, item)" type="text" size="small" style="color: #1D2832;">编辑</el-button>-->
                <!--<el-button @click="deleteTeacher(index, item)" type="text" size="small" style="color: #1D2832;">删除</el-button>-->
                <!--<el-button @click="resetPwd(index, item)" type="text" size="small" style="color: #1D2832;">密码重置</el-button>-->
            <!--</td>-->
          </tr>

          </tbody>
        </table>

        <div class="block t-page">
          <paging :pageSize="pageSize" :total="totalCount" @page-change="pageChange"></paging>
        </div>
      </div>

      <!-- 添加编辑老师 -->
      <el-dialog  custom-class="editTeacherDialog" :close-on-click-modal=false   @close="cancel('teacherForm')" :title="dialogTitle" v-model="dialogAddTeacherVisible">
        <section >
          <el-form  :rules="rules" ref="teacherForm" :model="form" label-width="120px">
            <el-form-item label="姓名" prop="userName"

            >
              <el-input :size="small" v-model="form.userName" placeholder="请输入老师的姓名"></el-input>
            </el-form-item>
            <el-form-item label="所在班级"   prop="classCode"
                          >
              <el-select v-model="form.classCode"  placeholder="请选择班级">
                <el-option
                  v-for="item in classList"
                  :label="item.className"

                  :value="item.classCode">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职位"  prop="position"
                          >
              <el-select v-model="form.position"  placeholder="请选择职位">
                <el-option
                  v-for="item in positionList"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机" prop="phone"
                          >
              <el-input  v-model="form.phone"  placeholder="请输入手机号"></el-input>
            </el-form-item>

          </el-form>
          <div class="fix" style="margin-top: 40px;">
            <div class="gird-50 text-center pull-left">
              <loading-btn  :onLdClick="save" clz="btn btn-primary btn-md btn-w-md btn-radius" :isLoading="saveTeacherLoading || false">
                确定
              </loading-btn>
            </div>
            <div class="gird-50 text-center pull-left">
              <button @click="cancel('teacherForm')" class="btn btn-info btn-md btn-w-md btn-radius">取消</button>
            </div>

          </div>
        </section>

      </el-dialog>
    </div>

  </section>
</template>
<style scoped lang="scss">
  @import "../css/teacherList";
</style>
<script type="text/javascript" src="../js/teacherList.js"></script>
