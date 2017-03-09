<template>
  <section id="userCoursePage" class="fix">

    <left-nav  navActive="1"/>

    <div class="c-right-content">

      <tab-bar  :tabList="tabList" v-model="tabSelect"  v-on:input="onSelectTab()" />

      <!-- 学习目标 -->
      <div  v-show="tabSelect && tabSelect.name == 'mb'" class="learn-target mt15">
        <div class="mb10 fix" v-if="learnTarget">
          <span class="learn-target-time text-gray-color font-12 ">&nbsp;{{getDay(learnTarget.sunday)}}前需要完成</span>
          <a href="javascript:void(0)" class="text-primary font-12 ml20" @click="onShowCourse()">查看课程表</a>
          <div class="pull-right">
            <span class="learn-target-score text-gray-color font-12">当前学分: {{learnTarget.score}}分</span>
          </div>
        </div>
        <ul class="learn-target-list">
          <li v-for="(c,index) in learnTarget.courses">
              <a href="javascript:void(0)" class="">
                <div class="review-tag" v-if='c.repeat'>复习</div>
                <div class="bg-img-clip learn-target-img pull-left" :style="{'backgroundImage':`url(${c.cover})`}"></div>
                <div class="learn-target-content ">
                    <h5 class="font-14 text-color">{{c.courseName}}</h5>
                    <p class="font-12 text-gray-color mt-temp-4" v-for="plan in c.plans">
                      {{plan.coursePlanName}}&nbsp;第{{plan.week}}周&nbsp;第{{plan.courseIndex}}节
                    </p>
                    <p class="font-12 text-gray-color mt-temp-4">
                      上次学习到 <span class="text-accent">{{c.lastLearnTime}}分钟</span>
                    </p>

                  <div class="learn-target-bottom">
                    <div class="fix">
                        <button class="btn btn-primary  pull-left">立即学习</button>
                        <div class="pull-right learn-target-info text-gray-color">
                          <span>学习人数:&nbsp;&nbsp;{{c.viewers}}人  &nbsp;|&nbsp;</span>
                          <span>时长:&nbsp;&nbsp;{{c.duration}}分钟  &nbsp;|&nbsp;</span>
                          <span>建议学段:&nbsp;&nbsp;{{c.grade}}  </span>
                        </div>
                    </div>

                  </div>
                </div>

              </a>
          </li>
        </ul>

      </div>

      <!-- 播放历史 -->
      <div class="play-history mt15" v-show="tabSelect && tabSelect.name == 'history'">


        <div class="" v-for="(p,index) in playHistoryList">
          <div class="mb10 fix">
            <span class="text-gray-color font-12">{{p.date}}</span>
          </div>

          <ul class="play-list fix">
            <li v-for="(c,index) in p.courses">
              <a href="javascript:void(0)">
                <div class="play-content">
                  <div class="play-cover bg-img-clip" :style="{backgroundImage : `url(${c.cover})`}"></div>
                  <div class="play-desc">
                    <h5 class="mb5">一起来读书</h5>
                    <div class="fix font-12 text-gray-color">
                      <span class="pull-left">62人学习过</span>
                      <span class="pull-right">应彩云老师</span>
                    </div>
                  </div>
                </div>

              </a>
            </li>
          </ul>


        </div>

        <paging v-on:page-change="pageChange"  :pageSize="playHistoryPage.pageSize" :total="playHistoryPage.total" />
      </div>

    </div>


    <!-- 课程表 -->
    <el-dialog  title="课程表" custom-class="userCourseDialog" v-model="dialogUserCourseVisible">

      <div class="user-course-time">
        当前时间: &nbsp;{{getCurrentDate}}
      </div>

      <section v-loading="isLoadingCourse"
               element-loading-text="拼命加载中">
          <div class="syllabus-bar fix mb10" >
            <a v-if="startWeek  > 1" href="javascript:void(0)" class="pull-left block" @click="onNextOrPreWeek('pre')">
              <span class="iconfont icon-arrow-left  pointer font-bold"></span>
            </a>
            <a  v-if="!getEndWeek" href="javascript:void(0)" class="pull-right block"  @click="onNextOrPreWeek('next')">
              <span class="iconfont icon-arrow-right  pointer font-bold"></span>
            </a>
            <div class="text-center font-12 text-color">
              {{getFirstDay}}&nbsp;至&nbsp;{{getLastDay}}
            </div>
          </div>

          <section class="syllabus-list fix">
            <div class="syllabus-item" :class="{'active' : week.nowWeek}"  v-for="week in weekList">
              <div class="syllabus-week">
                <p class="text-gray-color font-12 syllabus-week-time">{{getDay(week.firstDay)}} ~ {{getDay(week.lastDay)}}</p>
                <div class=" syllabus-week-date">第{{week.weekIndex}}周</div>

              </div>
            </div>
          </section>
          <section class="syllabus-main">
            <div class="syllabus-content" v-for="week in weekList">
              <ul class="syllabus-content-list fix">
                <li v-for="course in week.courses">
                  <span class="syllabus-circle"></span>
                  <div class="syllabus-content-desc">
                    <p class="text-color font-12">{{course.courseName}}</p>
                    <span class="syllabus-tag ib mt5" :class="{'tag-in-complete':course.learnStatus == 0,'tag-complete' :course.learnStatus == 1 }"></span>
                  </div>
                </li>
              </ul>
            </div>
          </section>
      </section>
    </el-dialog>



  </section>
</template>
<style scoped lang="scss">
  @import "../css/userCourse";
</style>
<script type="text/javascript" src="../js/userCourse.js"></script>
