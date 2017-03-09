<template>
  <section id="groupCoursePlanPage" class="fix">

    <left-nav navActive="2" />

    <div class="c-right-content fix">

      <tab-bar  :tabList="tabList" v-model="tabSelect"  v-on:input="onSelectTab()" />

      <!-- 自助学习课程 -->
      <div  v-show="tabSelect && tabSelect.name == 'user'" class="learn-target mt15 fix">
              <section class="pull-left group-main-left" >

                  <div class="mb10">
                    <span class="learn-target-time text-gray-color font-12 ">当前学习中的课程计划</span>
                  </div>

                  <div class="text-center course-zero" v-if="unCompleteCoursePlans.length  <= 0">
                    <p class="text-gray-color">您的园所目前没有学习中的课程计划,快来为老师制定课程计划吧~</p>
                    <button class="btn btn-primary btn-radius mt10">添加课程计划</button>
                  </div>

                  <ul class="school-course-list"  v-if="unCompleteCoursePlans.length > 0">
                    <li v-for="unCompleteCoursePlan in  unCompleteCoursePlans">
                      <a href="javascript:void(0)" class="">
                        <div class="bg-img-clip school-course-img pull-left" :style="{'backgroundImage':`url(${unCompleteCoursePlan.cover})`}"></div>
                        <div class="school-course-content ">
                          <h5 class="school-course-name text-color">{{unCompleteCoursePlan.name}}</h5>
                          <p class="font-12 text-gray-color mt-temp-4 text-ellipsis">
                            主讲老师:&nbsp;<slot v-for="(teacher,$index) in unCompleteCoursePlan.lectureLists">{{teacher.name}}{{$index ==  unCompleteCoursePlan.lectureLists.length -1? '' : '、' }}</slot>
                          </p>

                          <div class="school-course-bottom">
                            <div class="fix">
                              <div class="pull-left font-12 text-gray-color">
                                <span class="mr15">学习老师:&nbsp;<span class="text-accent">{{unCompleteCoursePlan.schoolLearners}}人</span></span>
                                <span>本周完成目标:&nbsp;<span class="text-accent">{{unCompleteCoursePlan.completePercent}}%</span></span>
                              </div>
                              <div class="pull-right">
                                <a href="javascript:void(0)" class="text-primary font-12" @click="onForwardCoursePlanDetail(unCompleteCoursePlan)">
                                  查看更多
                                </a>
                              </div>
                            </div>
                          </div>

                        </div>

                      </a>
                    </li>
                  </ul>

                  <div class="mb10">
                    <span class="learn-target-time text-gray-color font-12 ">已完成课程计划</span>
                  </div>

                  <ul class="school-course-list" >
                    <li v-for="completeCoursePlan in  completeCoursePlans">
                      <a href="javascript:void(0)" class="">
                        <div class="bg-img-clip school-course-img pull-left" :style="{'backgroundImage':`url(${completeCoursePlan.cover})`}"></div>
                        <div class="school-course-content ">
                          <h5 class="school-course-name text-color">{{completeCoursePlan.name}}</h5>
                          <p class="font-12 text-gray-color mt-temp-4 text-ellipsis">
                            主讲老师:&nbsp;<slot v-for="(teacher,$index) in completeCoursePlan.lectureLists">{{teacher.name}}{{$index ==  completeCoursePlan.lectureLists.length -1? '' : '、' }}</slot>
                          </p>

                          <div class="school-course-bottom">
                            <div class="fix">
                              <div class="pull-left font-12 text-gray-color">
                                <span class="mr15">学习老师:&nbsp;<span class="text-accent">{{completeCoursePlan.learner}}人</span></span>
                                <span>完成日期:&nbsp;{{completeCoursePlan.completeDate}}</span>
                              </div>
                              <div class="pull-right">
                                <a href="javascript:void(0)" class="text-primary font-12"  @click="onForwardCoursePlanDetail(completeCoursePlan)">
                                  查看更多
                                </a>
                              </div>
                            </div>
                          </div>

                        </div>

                      </a>
                    </li>
                  </ul>
              </section>

        <section class="pull-right group-main-right">
            <router-link class="block btn btn-primary btn-md btn-block" href="javascript:void(0)" :to="{'path' : `/course/addCoursePlan`}">
              添加自定义课程计划
            </router-link>
          <div class="group-box template-block">

            <div class="group-item">
              <p>全园学习老师总数</p>
              <h3 class="ib">{{schoolInfo.totalLearnTeachers}}</h3>
              <span class="group-unit">人</span>
            </div>
            <div class="group-item">
              <p>全园本周完成目标</p>
              <h3 class="ib">{{schoolInfo.thisWeekTarget}}</h3>
              <span class="group-unit">人</span>
            </div>

          </div>
        </section>
      </div>





      <!-- 集体课程 -->
      <div class="play-history mt15" v-show="tabSelect && tabSelect.name == 'group'">


        <div class="group-course-plan-util font-12">
          在课程详情中添加课程，可以使用明师课堂智能学习盒子直接观看
        </div>

        <table class="table-base table-center">
          <thead class="">
          <tr>
            <td>
              课程名
            </td>
            <td>
              所属分类
            </td>
            <td>
              主讲人
            </td>
            <td>
              建议学校
            </td>
            <td>
              课时
            </td>
            <td class="text-left">
              操作
            </td>
          </tr>
          </thead>
          <tbody class="">
          <tr v-for="(course,index) in allSchoolCoursePlans">
            <td>
              {{course.courseName}}
            </td>
            <td >
              {{course.courseTypeName}}
            </td>
            <td >
              {{course.lecture}}
            </td>
            <td>
              {{course.grade}}
            </td>
            <td>
              {{course.courseTimes}}
            </td>
            <td class="text-left">

              <a href="javascript:void(0)" class="text-primary ib mr5">
                详情
              </a>

              <loading-text :isLoading="course.isDeleteLoading || false">
                <a href="javascript:void(0)" class="text-primary" @click="onRemoveCoursePlan(index,course)">
                  删除
                </a>
              </loading-text>

            </td>
          </tr>

          </tbody>
        </table>
      </div>



    </div>

  </section>
</template>
<style scoped lang="scss">
  @import "../css/groupCoursePlan";
</style>
<script type="text/javascript" src="../js/groupCoursePlan.js"></script>
