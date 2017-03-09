<template>
  <section id="userCoursePlanPage" class="fix user-course-plan">

    <left-nav  navActive="3"/>

    <div class="c-right-content">

      <tab-bar  :tabList="tabList" v-model="tabSelect"  v-on:input="onSelectTab()" />

      <!-- 学习中 -->
      <div v-show="tabSelect && tabSelect.name == 'learning'" class="learn-target mt15">
       <div class="block fix">
         <div class="course-plan-item" v-for="(item, index) in learningPlanList">
           <a href="javascript: void(0);" @click="goToPlay(1, item, index)">
             <h5 class="mb10 plan-item-title">{{item.name}}</h5>
             <div class="bg-img-clip user-course-img mb10" :style="{'backgroundImage':`url(${item.cover})`}"></div>
             <div class="user-course-bottom">
               <div class="fix">
                 <div class="pull-left font-12 text-gray-color">
                   <span class="mr15">已完成:&nbsp;<span class="text-accent">{{item.completePercent}}</span></span>
                 </div>
                 <div class="pull-right font-12">
                   <span>学习人数:&nbsp;<span>{{item.learner}}</span></span>
                   <span class="mlr5">|</span>
                   <span>总课时:&nbsp;<span>{{item.totalCourseTimes}}</span></span>
                   <span class="mlr5">|</span>
                   <span>学习时间:&nbsp;<span>{{item.totalWeeks}}周</span></span>
                 </div>
               </div>
             </div>
           </a>
         </div>
       </div>

        <div class="block text-center p16">
          <paging :pageSize="pageSize" :total="totalCount" @page-change="pageChange"></paging>
        </div>
      </div>
      <!-- 已完成 -->
      <div class="group-course-plan mt15" v-show="tabSelect && tabSelect.name == 'finish'">
        <div class="block">
          <div class="course-plan-item" v-for="(item, index) in finishPlanList">

            <h5 class="mb10 plan-item-title " style="font-size: 14px;">{{item.name}}</h5>
            <a href="javascript: void(0);" @click="goToPlay(2, item, index)">
              <div class="bg-img-clip user-course-img mb10" :style="{'backgroundImage':`url(${item.cover})`}"></div>
              <div class="user-course-bottom">
                <div class="fix">
                  <div class="pull-left font-12 text-gray-color">
                    <span class="mr15">完成于:&nbsp;<span class="text-accent">{{item.completeDate}}</span></span>
                  </div>
                  <div class="pull-right font-12">
                    <span>学习人数:&nbsp;<span>{{item.learner}}</span></span>
                    <span class="mlr5">|</span>
                    <span>总课时:&nbsp;<span>{{item.totalCourseTimes}}</span></span>
                    <span class="mlr5">|</span>
                    <span>学习时间:&nbsp;<span>{{item.totalWeeks}}周</span></span>
                  </div>
                </div>
              </div>
            </a>


          </div>
        </div>

        <div class="block text-center p16">
          <paging :pageSize="pageSz" :total="totalCt" @page-change="pageChangeHandler"></paging>
        </div>
      </div>

    </div>

  </section>
</template>
<style scoped lang="scss">
  @import "../css/userCoursePlan";
</style>
<script type="text/javascript" src="../js/userCoursePlan"></script>
