<template>
  <section id="homePage" class="container-reverse-top">
    <div class="c-content1">
      <div class="c-ct-top" style="padding-top : 37px;">
        <div class="c-ct-top-box">
          <div class="c-ctt-l">
            <div class="c-cttl-top-all">
              <div class="c-cttl-tmg"></div>
              <div class="c-cttl-ttxt">全部课程</div>
              <div style="clear:both;"></div>
            </div>

            <div v-for="(crts,$index) in courseTypes">
              <div class="c-ctt-l-item" v-show="$index < courseTypes.length-1">
                <div class="c-cttl-top">
                  <div class="c-cttl-ttxt">{{crts.name}}</div>
                  <div style="clear:both;"></div>
                </div>
                <div class="c-cttl-box">
                  <div class="c-cttl-b-i" v-for="crtsitem in crts.childs" v-on:click="leftMenuBtnClick(crtsitem.id)">
                    {{crtsitem.name | f_substr(5)}}
                  </div>
                  <div style="clear:both;"></div>
                </div>
                <div class="c-cttl-line"></div>
              </div>
              <div class="c-ctt-l-item" v-show="$index>=courseTypes.length-1">
                <div class="c-cttl-top">
                  <div class="c-cttl-ttxt">{{crts.name}}</div>
                  <div style="clear:both;"></div>
                </div>
                <div class="c-cttl-box">
                  <div class="c-cttl-b-i" v-for="crtsitem in crts.childs" v-on:click="leftMenuBtnClick(crtsitem.id)">
                    {{crtsitem.name | f_substr(5) }}
                  </div>
                  <div style="clear:both;"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="j-ct-bottom c-ct-bottom">
        <div class="c-ctb-section">
          <div class="c-ctb-box">
            <div class="jIndexSwp1 swiper-container" style="height:100%;">
              <div class="swiper-wrapper">


                <div class="swiper-slide" v-for="br in banners">
                  <a class="j-banner-a"  v-bind:target-href="br.url" href="javascript:;">
                    <img style="width: 100%;"  v-bind:data-src="br.picture" class="swiper-lazy">
                  </a>
                  <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                </div>

              </div>
              <div class="jSwpPag1 swiper-pagination swiper-pagination-active"></div>
            </div>
            <!-- <div class="jSwpPag1 swiper-pagination swiper-pagination-active" style="position:relative;margin-top:10px;"></div> -->
          </div>
          <div class="c-ctb-r" style="display:none;">
            <template v-if="userinfo!=''">
              <div class="c-ctb-r-top">
                <div class="c-ctbrt-y"><img v-bind:src="userinfo.portrait" width="100%"></div>
                <div class="c-ctbrt-t">{{userinfo.userName}}老师</div>
                <div class="c-ctbrt-b" v-on:click="logoutBtnClick()">退出</div>
                <div style="clear:both;"></div>
              </div>
              <div class="c-ctb-r-mid"  v-show="schoolCourseInfo.userType==1">
                <div class="c-ctbrm-i c-ctbrm-if">
                  <div class="c-ctbrm-i-top">学习老师</div>
                  <div class="c-ctbrm-i-bot">{{schoolCourseInfo.learnTeachers}}</div>
                </div>
                <div class="c-ctbrm-i">
                  <div class="c-ctbrm-i-top">课程</div>
                  <div class="c-ctbrm-i-bot">{{schoolCourseInfo.totalCompleteCourse}}</div>
                </div>
                <div class="c-ctbrm-i">
                  <div class="c-ctbrm-i-top">当前进度</div>
                  <div class="c-ctbrm-i-bot">{{schoolCourseInfo.nowPercent}}</div>
                </div>
                <div style="clear:both;"></div>
              </div>
              <div class="c-ctb-r-mid"  v-show="schoolCourseInfo.userType==2">
                <div class="c-ctbrm-i c-ctbrm-if">
                  <div class="c-ctbrm-i-top">本周目标</div>
                  <div class="c-ctbrm-i-bot">{{schoolCourseInfo.thisWeekTarget}}</div>
                </div>
                <div class="c-ctbrm-i">
                  <div class="c-ctbrm-i-top">课程</div>
                  <div class="c-ctbrm-i-bot">{{schoolCourseInfo.totalCompleteCourse}}</div>
                </div>
                <div class="c-ctbrm-i">
                  <div class="c-ctbrm-i-top">排名</div>
                  <div class="c-ctbrm-i-bot">{{schoolCourseInfo.rank}}</div>
                </div>
                <div style="clear:both;"></div>
              </div>
              <div class="c-ctb-r-bot">

                <div class="jIndexSwp2 swiper-container" style="height:100%;">
                  <div class="swiper-wrapper">

                    <div class="swiper-slide" v-for="srct in schoolCourseInfo.recentCourses">
                      <div class="c-ctb-rb-box">
                        <div class="c-ctb-rb-left">
                          <div class="c-ctb-rb-lt">
                            {{srct.courseTypeName}}
                            <!-- <span class="c-ctb-rblt-d"></span>
                                                      情景阅读 -->
                          </div>
                          <div class="c-ctb-rb-lb">{{srct.courseName | f_substr(10)}}</div>
                        </div>
                        <div class="c-ctb-rb-middel"></div>
                        <div class="c-ctb-rb-right">
                          <div class="c-ctb-rb-t">{{srct.targetDate.substr(8, 2)}}日</div>
                          <div class="c-ctb-rb-b">{{srct.targetDate.substr(5, 2)}}月</div>
                        </div>
                        <div style="clear:both;"></div>
                      </div>
                    </div>
                    <div class="swiper-slide" v-if="schoolCourseInfo=='' || schoolCourseInfo.recentCourses.length<=0">
                      <div class="c-ctb-rb-box-notxt">
                        近期无课程
                      </div>
                    </div>
                  </div>
                  <div class="jSwpPag2 swiper-pagination swiper-pagination-active"></div>
                </div>

              </div>
            </template>
            <template v-if="userinfo==''">
              <div class="c-ctbr-t1">欢迎来到名师课堂</div>
              <div class="c-ctbr-t2">只有登录后才能观看学习视频哦</div>
              <div class="c-ctbr-btn" v-on:click="loginBtnClick()">登录</div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="c-content2">
      <div class="c-ct2-item">
        <div class="c-ct2-i1">
          <div class="c-ct2i1-t1">全园学习卡</div>
          <div class="c-ct2i1-t2">幼儿园系统学习秘籍</div>
        </div>
        <div class="c-ct2-i3"></div>
        <div class="c-ct2-i2"><img src="../../../resources/images/c-ct2-i2-img1.png" width="100%"></div>
        <div style="clear:both;"></div>
      </div>
      <div class="c-ct2-item">
        <div class="c-ct2-i1">
          <div class="c-ct2i1-t1">探究游戏</div>
          <div class="c-ct2i1-t2">玩转主题活动</div>
        </div>
        <div class="c-ct2-i3"></div>
        <div class="c-ct2-i2-2"><img src="../../../resources/images/c-ct2-i2-img2.png" width="100%"></div>
        <div style="clear:both;"></div>
      </div>
      <div class="c-ct2-item">
        <div class="c-ct2-i1">
          <div class="c-ct2i1-t1">活动区</div>
          <div class="c-ct2i1-t2">把游戏还给孩子</div>
        </div>
        <div class="c-ct2-i3"></div>
        <div class="c-ct2-i2"><img src="../../../resources/images/c-ct2-i2-img3.png" width="100%"></div>
        <div style="clear:both;"></div>
      </div>
      <div class="c-ct2-item">
        <div class="c-ct2-i1">
          <div class="c-ct2i1-t1">微店</div>
          <div class="c-ct2i1-t2">幼儿园教育教学宝典</div>
        </div>
        <div class="c-ct2-i2"><img src="../../../resources/images/c-ct2-i2-img4.png" width="100%"></div>
        <div style="clear:both;"></div>
      </div>
      <div style="clear:both;"></div>
    </div>
    <div class="c-content3">
      <div class="c-ct3-section">
        <div style="height:1px;"></div>
        <div class="c-ct3-title">最新课程</div>
        <div class="c-ct3-subt">最新教育理念，不一样的幼儿课堂</div>
        <div class="c-ct3-btn" v-on:click="moreCourseClick()"></div>
        <div class="c-ct3-line"></div>
        <div class="c-ct3-box">
          <div class="c-ct3-bitem" v-for="cmcTion in courseMutiContion.rows" v-on:click="coursesClick(cmcTion.id)">
            <img class="c-ct3-b-mg" v-bind:src="cmcTion.cover">
            <div class="c-ct3-b-t">{{cmcTion.courseName | f_substr(14)}}</div>
            <div class="c-ct3-b-tl">{{cmcTion.viewers}}人学过</div>
            <div class="c-ct3-b-tr">{{cmcTion.courseTypeName}}</div>
            <div style="clear:both;"></div>
          </div>
          <div style="clear:both;"></div>
        </div>
      </div>
    </div>
    <div class="c-content4">
      <div class="c-ct4-section">
        <div style="height:1px;"></div>
        <div class="c-ct4-title">金牌名师</div>
        <div class="c-ct4-subt">行业领航者，超过100位名师为您保驾护航</div>
        <div class="c-ct4-line"></div>
        <div class="c-ct4-box">
          <div class="c-ct4-bitem" v-for="letc in lectures">
            <img class="c-ct4-b-mg" v-bind:src="letc.picture">
            <div class="c-ct4-b-t">{{letc.name}}</div>
            <div class="c-ct4-b-tsub">{{letc.introduce}}</div>
          </div>
          <div style="clear:both;"></div>
        </div>
      </div>
    </div>
    <div class="c-content5">
      <div class="c-ct5-l">
        <img class="c-ct5-l-mg" src="../../../resources/images/c-ct5-l-mg.png" />
      </div>
      <div class="c-ct5-r">
        <div class="c-ct5-r-section">
          <div class="jIndexSwp3 swiper-container" style="height:100%;">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <a href="http://pwyey.s.9ye.com/school/article~a~view-242660~sn_id~11517407.html" target="_blank">
                  <div class="c-ct5-r-box">
                    <div style="height:1px;"></div>
                    <div class="c-ct5r-t1">豆班开展明师课堂网络学习的研讨活动</div>
                    <div class="c-ct5r-line"></div>
                    <div class="c-ct5r-t2" style="width:auto;margin-left: -91px;">苏州市吴江区平望幼儿园</div>
                  </div>
                </a>
              </div>
              <div class="swiper-slide">
                <a href="http://www.ahedu.gov.cn/29/view/319970.shtml" target="_blank">
                  <div class="c-ct5-r-box">
                    <div style="height:1px;"></div>
                    <div class="c-ct5r-t1">广德县中心幼儿园开展仿“明师课堂”教学研修活动</div>
                    <div class="c-ct5r-line"></div>
                    <div class="c-ct5r-t2">安徽教育网</div>
                  </div>
                </a>
              </div>
            </div>
            <div class="jSwpPag3 swiper-pagination swiper-pagination-active"></div>
          </div>
        </div>
      </div>
      <div style="clear:both;"></div>
    </div>
  </section>
</template>
<style scoped lang="scss">
  @import "../css/home";
</style>
<script type="text/javascript" src="../js/home.js"></script>
