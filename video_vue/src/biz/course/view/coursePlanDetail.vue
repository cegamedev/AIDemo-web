<template>
  <section id="coursePlanDetailPage" class="fix course-plan-detail">

    <left-nav navActive="2" />

    <div class="c-right-content">

      <div class="template-block course-plan-top">

        <section class="tb-box">
            <div class="row">
            <div class="col vt course-plan-banner">
              <div class="bg-img-clip  course-plan-img" :style="{'backgroundImage':`url(${coursePlan.cover})`}"></div>
            </div>
            <div class="col vt width-100-pec">
              <div class="fix">
                <h5 class="text-color course-plan-name pull-left">{{coursePlan.name}}</h5>
                <a @click="onShowAllCourse()" href="javascript:void(0)" class="font-12 text-primary pull-right">查看课程表</a>
              </div>
              <p class="font-12 text-gray-color mb15" style="margin-top:3px;">
               主讲老师:&nbsp;<slot v-for="(teacher,$index) in coursePlan.lectureLists">{{teacher.name}}{{$index ==  coursePlan.lectureLists.length -1? '' : '、' }}</slot>
              </p>

              <div class="font-12 text-gray-color">
                <span class="mr15">学习老师:&nbsp;<span class="text-accent">{{coursePlan.schoolLearners}}人</span></span>
                <span>本周完成目标:&nbsp;<span class="text-accent">{{coursePlan.completePercent}}%</span></span>
              </div>

              <div class="font-12 text-gray-color mt-temp-4">
                <span>学习人数:&nbsp;&nbsp;{{coursePlan.learner}}人  &nbsp;|&nbsp;</span>
                <span>总课时:&nbsp;&nbsp;{{coursePlan.totalCourseTimes}}分钟  &nbsp;|&nbsp;</span>
                <span>学习时间:&nbsp;&nbsp;{{coursePlan.totalWeeks}}周&nbsp;|&nbsp;</span>
                <span>面向:&nbsp;&nbsp;{{coursePlan.crowd}}  </span>
              </div>


              <div class="mt20">
                <button class="btn btn-success btn-outline">编辑课程计划</button>
              </div>
            </div>

        </div>
        </section>

      </div>


      <div class="template-block course-plan-content mt20">
          <div class="course-plan-util">
            <button @click="editTeachers" class="btn btn-primary btn-outline">编辑老师名单</button>
          </div>


        <table class="table-base table-center">
            <thead class="table-thead-center">
                <tr>
                  <td>
                    老师姓名
                  </td>
                  <td>
                    本周目标
                  </td>
                  <td>
                    课程计划总完成度
                  </td>
                  <td>
                    未完成目标数
                  </td>
                </tr>
            </thead>
            <tbody class="table-tbody-center">
              <tr v-for="teacher in teacherLearnList">
                <td>
                  <span class="ib course-plan-teacher-head bg-img-clip" :style="{'backgroundImage':`url(${teacher.portrait})`}"></span>
                  <span class="ib ">{{teacher.name}}</span>
                </td>
                <td :class="{'text-danger' : teacher.thisWeekTarget == 0}">
                  {{teacher.thisWeekTarget == 1 ? '已完成' : '未完成'}}
                </td>
                <td :class="{'text-danger' : teacher.thisWeekTarget == 0}">
                  {{teacher.completePercent}}
                </td>
                <td :class="{'text-danger' : teacher.thisWeekTarget == 0}">
                  {{teacher.unCompleteCourse}}
                </td>
              </tr>
            </tbody>
          </table>


      </div>



    </div>


    <el-dialog  title="全部课程" custom-class="userCourseDialog" v-model="dialogAllCourseVisible">

      <ul class="course-list">
        <li v-for="c in coursePlan.allCourse">
          {{c.courseName}}
        </li>
      </ul>



    </el-dialog>
    <el-dialog title="选择参加课程计划的老师" @close="teacherDialogClose" :close-on-click-modal=false v-model="dialogTeacherVisible">
      <edit-teachers  @child-event="teacherDialogCallBack" v-if="showTeacherList" :id="coursePlanId"   />
    </el-dialog>
    <!--<edit-teachers  v-if="dialogVisible" @childevent="teacherDialogCallBack" :id="coursePlanId"   />-->
  </section>
</template>
<style scoped lang="scss">
  @import "../css/coursePlanDetail";
</style>
<script type="text/javascript" src="../js/coursePlanDetail.js"></script>
