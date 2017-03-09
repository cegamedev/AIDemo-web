<template>
  <section id="userFavPage" class="fix user-fav-page">

    <left-nav  navActive="6"/>

    <div class="c-right-content">
      <div class="user-fav-block block fix">
        <div v-for="(item, index) in favList" class="user-fav-item">
          <a href="javascript:void(0);" @click="goToCourse(index, item)">
            <div class="fav-content">
              <div class="bg-img-clip user-fav-img mb10" :style="{'backgroundImage':`url(${item.cover})`}"></div>
              <p class="fav-name">{{item.courseName}}</p>
              <div class="fav-item-bottom fix">
                <span class="pull-left l-sp mr2">{{item.duration | f_min}}</span>
                <span class="pull-left">分钟</span>
                <span class="pull-right r-sp">{{item.lecture}}</span>
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class="block text-center p16">
        <paging :pageSize="pageSize" :total="totalCount" @page-change="pageChange"></paging>
      </div>
    </div>

  </section>
</template>
<style scoped lang="scss">
  @import "../css/userFav";
</style>
<script type="text/javascript" src="../js/userFav.js"></script>
