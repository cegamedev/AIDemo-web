<template>
  <section id="courseTypeInfoPage" class="container-reverse-top fix course-type-info">


    <div class="c-content1">
      <div style="height:1px;"></div>
      <div class="c-ct1-box">
        <div style="height:1px;"></div>
        <div class="j-ct1-left c-ct1-left">
          <div class="c-ct1-litem"><a href="javascript:void(0)"@click="(e)=>goAnchor()" >简介</a></div>
          <div class="c-ct1-litem" style="display:none;"><a href="#tj" @click="(e)=>goAnchor('#anchor_tj')" >推荐计划</a></div>
          <div class="c-ct1-litem"><a href="javascript:void(0)" @click="(e)=>goAnchor('#anchor_sz')">师资介绍</a></div>
          <div class="c-ct1-litem"><a href="javascript:void(0)" @click="(e)=>goAnchor('#anchor_fl')">分类课程</a></div>
        </div>
        <div class="c-ct1-right">

          <div class="c-ct1-rtop">{{oneCourseType.name}}</div>
          <div class="c-ct1-rmid">{{oneCourseType.description}}</div>
          <div class="c-ct1-rbot">

            <slot v-for="(octc,$index) in oneCourseType.childs">
              <div class="c-ct1-rbtn c-rbtn-first" v-if="$index==0" @click="threeSearchClick(octc.id,octc.name)">{{octc.name}}</div>
              <div class="c-ct1-rbtn" v-if="$index>0" @click="threeSearchClick(octc.id,octc.name)">{{octc.name}}</div>
            </slot>

            <div style="clear:both;"></div>
          </div>
        </div>
      </div>
    </div>



    <div class="c-section">
      <div style="height:1px;"></div>
      <div class="c-content2" id="anchor_sz">
        <div class="c-ct2-title">师资介绍</div>
        <div class="c-ct2-box">

          <div v-if="lts.id" class="c-ct2b-item" v-for="(lts,$index) in lectures">
            <img class="c-ct2b-mg" v-bind:src="lts.picture" />
            <div class="c-ct2b-txt">
              <div class="c-ct2bt1">{{lts.name}}</div>
              <div class="c-ct2bt2">{{lts.introduce}}</div>
            </div>
            <div class="c-ct2b-line" v-show="$index<lectures.length-1"></div>
            <div style="clear:both;"></div>
          </div>

          <div style="clear:both;"></div>
        </div>
      </div>
      <div class="c-content3" id="anchor_fl">
        <div class="c-ct3-title">分类课程</div>
        <div class="c-ct3-top">


          <el-dropdown menu-align="start" class="" @command="onSelectOrder">
            <div class="el-dropdown-link dropdown-link j-ct3ts1 c-ct3t-s c-ct3t-s-active el-dropdown-link dropdown-link">
              <span class="c-txt"> {{coursePage.orderBy == 'new' ? '最新' : '最热'}}</span>
              <span class="c-ct3t-sf"></span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="new">最新</el-dropdown-item>
              <el-dropdown-item command="hot">最热</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown   v-show="lectures.length > 0"  menu-align="start" class="" @command="onSelectTeacher">
            <div class="el-dropdown-link dropdown-link j-ct3ts1 c-ct3t-s  el-dropdown-link dropdown-link">
              <span class="c-txt"> {{selectTeacher.name}}</span>
              <span class="c-ct3t-sf"></span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item  v-for="(lctitem,index) in lectures"  :command="index.toString()">{{lctitem.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <div style="clear:both;"></div>
        </div>
        <div class="c-ct3-box">

          <div class="c-ct3-bitem" v-for="(cmcTion,$index) in courseList" v-on:click="coursesClick(cmcTion.id)">
            <img class="c-ct3-b-mg" v-bind:src="cmcTion.cover">
            <div class="c-ct3-b-t">{{cmcTion.courseName | f_substr(14)}}</div>
            <div class="c-ct3-b-tl">{{cmcTion.viewers}}人学过</div>
            <div class="c-ct3-b-tr">{{cmcTion.courseTypeName}}</div>
            <div style="clear:both;"></div>
          </div>

          <div style="clear:both;"></div>
        </div>



        <div class="c-ct3-page">
          <paging v-on:page-change="onPageChange"  :pageSize="coursePage.pageSize" :total="coursePage.total" />
        </div>
      </div>
    </div>



  </section>

</template>
<style scoped lang="scss">
  @import "../css/courseTypeInfo";
</style>
<script type="text/javascript" src="../js/courseTypeInfo.js"></script>
