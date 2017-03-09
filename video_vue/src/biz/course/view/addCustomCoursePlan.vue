<template>
  <section id="addCoursePlanPage" class="fix">
    <!--<el-dialog  title="选择参加课程计划的老师" v-model="dialogVisible" custom-class="userCourseDialog" >-->
      <!--<div class="user-course-time">-->
        <!--当前时间: &nbsp;11111-->
      <!--</div>-->
    <!--</el-dialog>-->

    <div class="tb-box  add-plan-main">
      <div class="row">
        <div class="col vt w-l">
          <div class="add-plan-left">

            <div class="add-custom-top">
              <div class="input-group">
                <i class="iconfont icon-search input-icon"></i>
                <input type="text" @input="onInputSearchCourse()" v-model="coursePage.filterValue" placeholder="搜索课程" class="input-base input-block" />
              </div>
            </div>

            <div class="add-custom-menu">
              <el-dropdown menu-align="start" class="mr15" @command="onSelectOrder">
                <div class="el-dropdown-link dropdown-link">
                  {{coursePage.orderBy == 'new' ? '最新' : '最热'}}<i class="iconfont icon-arrow-bottom "></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="new">最新</el-dropdown-item>
                  <el-dropdown-item command="hot">最热</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>


              <el-select   @change="onInputSearchCourse" class="dropdown-select-auto  lg"  v-model="coursePage.lectureId" clearable filterable placeholder="请选择老师">
                <el-option
                  v-for="(teacher,index) in teacherList"
                  :label="teacher.name"
                  :value="teacher.id">
                </el-option>
              </el-select>

              <div class="mt10" style="margin-left : -5px;margin-right: -10px;">
                <el-select    @change="onCoursePlanTypeFirstChange" class="dropdown-select-auto" clearable  v-model="selectCourseFirst"  placeholder="请选择">
                  <el-option
                    v-for="(cType,index) in courseTypeFirstList"
                    :label="cType.name"
                    :value="index">
                  </el-option>
                </el-select>

                <el-select  v-if="courseTypeSecondList.length > 0"  @change="onCoursePlanTypeSecondChange" class="dropdown-select-auto" clearable  v-model="selectCourseSecond"  placeholder="请选择">
                  <el-option
                    v-for="(sObj,index) in courseTypeSecondList"
                    :label="sObj.name"
                    :value="index">
                  </el-option>
                </el-select>

                <el-select  v-if="courseTypeThirdList.length > 0"  @change="onCoursePlanTypeThirdChange" class="dropdown-select-auto" clearable  v-model="selectCourseThird"  placeholder="请选择">
                  <el-option
                    v-for="(tObj,index) in courseTypeThirdList"
                    :label="tObj.name"
                    :value="index">
                  </el-option>
                </el-select>


              </div>


            </div>

            <section  v-loading="isCourseTypeLoading"
                      element-loading-text="拼命加载中">

              <p class="course-list-default" v-show="courseList.length <=0">
                没有课程
              </p>

              <ul v-show="courseList.length >0" class="add-custom-card-list">
              <li v-for="(course,index) in courseList">
                <a href="javascript:void(0)" class="block">
                  <div class="fix">
                      <div class="pull-left">
                    <h5 class="card-title">{{course.courseName}}</h5>
                    <p class="card-teacher text-gray-color">主体讲师: {{course.lecture}}</p>
                  </div>
                    <div class="pull-right">
                      <button  @click="onAddCourse(course)" v-show="course.opStatus =='add'" class="btn btn-danger btn-ss btn-radius">添加</button>
                      <button @click="onAddCourse(course)" v-show="course.opStatus =='replace'"  class="btn btn-primary btn-ss btn-radius">替换</button>
                      <button @click="onRemoveCourse(course)" v-show="course.opStatus =='cancel'"  class="btn btn-accent btn-ss btn-radius">取消</button>
                    </div>
                  </div>

                  <div class="">
                    <div class="text-gray-color font-12 text-ellipsis">
                      学习人数: &nbsp;{{course.viewers}}人&nbsp;&nbsp;|&nbsp;&nbsp;
                      时长: &nbsp;{{course.courseTimes}}分钟&nbsp;&nbsp;|&nbsp;&nbsp;
                      建议学段: &nbsp;{{course.grade}}&nbsp;&nbsp;
                    </div>
                  </div>
                </a>
              </li>
            </ul>
            </section>

            <div class="block text-center mt10 mb10">
              <paging :pageSize="coursePage.pageSize" :total="coursePage.total" @page-change="pageChange"></paging>
            </div>

          </div>

        </div>


        <div class="col vt w-r pl20">
         <div class="add-plan-right">

           <div class="fix course-table-util">

             <div class="pull-left">
               <span v-if="hasPrePage" @click="onUpdateWeek('pre')"  class="iconfont icon-arrow-left  pointer font-bold"></span>
             </div>
             <div class="pull-right">
               <span @click="onUpdateWeek('next')" class="iconfont icon-arrow-right  pointer font-bold"></span>
             </div>
           </div>


           <section class="add-custom-table">
             <ul class="add-custom-table-header fix">
               <li class="add-custom-table-item" v-for="(tb,index) in courseTable">
                 <a href="javascript:void(0)" class="block">
                   第{{tb.week}}周
                 </a>
               </li>
             </ul>

             <div  id="addTable" class="add-custom-table-body fix">

               <ul class="add-custom-table-item" v-for="(tb,index) in courseTable">
                 <li :class="{'active' : course.active}" @click="selectdCourseItem(course,tb)" class="add-custom-table-data" v-for="(course,index) in tb.courses">
                   <a href="javascript:void(0)" class="block">
                      <p class="add-custom-table-content">
                        {{course.courseName}}
                      </p>

                      <div class="fix" v-if="course.active && course.id">
                        <button  v-if="course.needRepeat"  class="pull-left btn btn-danger btn-ss btn-radius">复习</button>
                        <i @click="onRemoveCourse(course)"  style="position:relative;bottom:-2px;" class="pull-right text-danger iconfont icon-clock"></i>
                      </div>
                   </a>
                 </li>
               </ul>
             </div>


           </section>


           <div class="course-table-add fix">
             <button @click="onUpdateCourseTable('add')" class="btn btn-primary btn-ss btn-outline btn-radius pull-left">添加一行</button>
             <button  v-if="courseTable.length > 1" @click="onUpdateCourseTable('remove')" class="btn btn-accent btn-ss btn-outline btn-radius pull-right">删除一行</button>
           </div>


         </div>
        </div>
      </div>
    </div>


    <div class="fixed-bottom">

      <div class="container w-container-sm fix">
          <div class="pull-left">
            <input type="text" v-model="coursePlanName" placeholder="请输入课程计划名称" class="input-base input-w-lg" />
          </div>
          <div class="pull-right">
            <loading-btn  :onLdClick="onSaveCoursePlan" clz="btn btn-primary btn-radius" :isLoading="saveLoading || false">
              确定
            </loading-btn>
          </div>
      </div>
      <div>

      </div>

    </div>
  </section>
</template>
<style scoped lang="scss">
  @import "../css/addCoursePlan";
</style>
<script type="text/javascript" src="../js/addCustomCoursePlan"></script>
