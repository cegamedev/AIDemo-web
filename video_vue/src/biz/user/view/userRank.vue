<template>
  <section id="userRankPage" class="fix user-rank">

    <left-nav  navActive="5"/>

    <div v-loading="isLoadingCourse"
         element-loading-text="拼命加载中" class="c-right-content">
      <div v-if="userInfo.userType !== 1" class="top-rank">
        <div class="text-center">
          <span class="ib user-rank-my-head bg-img-clip" :style="{'backgroundImage':`url(${userInfo.portrait})`}"></span>
          <span class="ib mr16 min70">{{userInfo.userName}}</span>
          <span v-if="myRank.rank" class="ib">第</span> <span v-if="myRank.rank" class="text-accent ib">{{myRank.rank}} </span> <span v-if="myRank.rank">名</span>
        </div>
        <div v-if="myRank.distance && myRank.rank != 1" class="text-center p10">
          <p class="font-14">距离上一名还差<span class="text-accent ml2 mr2">{{myRank.distance | f_rank}}</span>！</p>
        </div>
      </div>
      <table class="table-base table-center user-rank-table">
        <thead class="table-thead-center">
        <tr>
          <td >
            排名
          </td>
          <td >
            学习总时长
          </td>
          <td >
            学习总课程数
          </td>
          <td >
            学习总学分
          </td>
        </tr>
        </thead>
        <tbody class="table-tbody-center">
        <tr v-for="(item, index) in rankList">
          <td>
            <span class="ib mr10 pull-left line28">{{index + 1}}</span>
            <span style="margin-left: 56px;" class="line28 pull-left ib user-rank-teacher-head bg-img-clip pull-left mr25" :style="{'backgroundImage':`url(${item.portrait})`}"></span>
            <span class="ib mr25 pull-left line28 min70">{{item.userName}}</span>
            <span class="ib pull-left line28 min90 text-gray">{{item.className}}</span>
          </td>
          <td class="text-left">
            <span class="ib "><i class="iconfont icon-clock iconbg"></i></span>
            <span class="ib ml10">{{item.totalTimes | f_rank}}</span>
          </td>
          <td class="text-left">
            <span class="ib "><i class="iconfont icon-jiangzhang iconbg"></i></span>
            <span class="ib ml10">{{item.totalCourses}}节课</span>
          </td>

          <td class="text-left">
            <span class="ib "><i class="iconfont icon-star iconbg"></i></span>
            <span class="ib ml10">{{item.totalScore}}分</span>
          </td>
        </tr>

        </tbody>
      </table>
      <div class="rank-bottom text-center">
        <a class="a-about" @click="about"><span class="ib"><i class="iconfont icon-information"></i></span><span class="ib ml5">关于排名</span></a>
      </div>
    </div>

  </section>
</template>
<style scoped lang="scss">
  @import "../css/userRank";
</style>
<script type="text/javascript" src="../js/userRank.js"></script>
