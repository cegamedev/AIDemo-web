<template>
  <section class="fix">
        <div v-loading="isLoadingCourse"
             element-loading-text="拼命加载中" class="teacher-dialog">
          <div class="t-item" v-for="(item, index) in list">
            <div class="t-row line-border">
              <div class="t-row-icon el-table__expand-icon" @click="expand(index, item)">
                <i v-if="!item.expand" style="color:#C3C3C3;" class="el-icon el-icon-arrow-right"></i>
                <i v-if="item.expand" style="color:#C3C3C3;" class="el-icon el-icon-arrow-down"></i>
              </div>
              <div class="t-content">{{item.className}}{{'('+item.counts+'人'+')'}}</div>
              <div class="v-check">
                <el-checkbox @change="handleCheckSubChange(index, item)"
                             :label=0
                             :true-label=1
                             :false-label=0
                             v-model="item.checked"></el-checkbox>
              </div>
              <div style="clear: both"></div>
            </div>
            <div v-show="item.expand" class="">
              <div class="t-row-children t-sub-item line-border" v-for="subItem in item.teachers">
                {{subItem.userName}}
                <div class="v-check">
                  <el-checkbox v-model="subItem.checked" :label=0 :true-label=1
                               :false-label=0></el-checkbox>
                </div>
              </div>
            </div>
          </div>

          <div class="t-bottom">
            <loading-btn  :onLdClick="save" clz="btn btn-primary btn-md btn-w-md btn-radius" :isLoading="saveLoading || false">
                确认选择&nbsp;{{getSelectLength}}&nbsp;位老师
            </loading-btn>
            <label class="t-b-label font-14" @click="selectAll()">全选</label>
          </div>
        </div>

  </section>

</template>
<style lang="scss" scoped>
  @import "../css/editTeachers";
</style>
<script>
  import API  from "api";
  import Util from 'util';
  import LoadingBtn from "../../../common/component/loadingBtn";

  export default{
    name: "editTeachers",
    props: ['id'],
    data(){
      return {
        isLoadingCourse: false,
        saveLoading: false,//确认btn loading
        checkAll: false,
        list: []//老师列表
      }
    },
    created: function() {
      this.isLoadingCourse = true;
      API.Teacher.getPlanTeacherList(this.idA)
        .then((res)=>{
          this.isLoadingCourse = false;
          let result = res.bizData;
          if (result && result.length > 0) {
            result.forEach( (ele, index) => {
              let flag = true;
              if (ele.teachers) {
                ele.teachers.forEach( (e, idx) => {
                  if (!e.checked) {
                    e.checked = 0;
                    flag = false;
                  }
                });
              }
              ele.checked = ele.checked ? ele.checked : 0;
              if (flag === true) {
                ele.checked = 1;
              }
            });
          }
          this.list = result;
        },(err) => {
          this.isLoadingCourse = false;
        });
    },

    mounted: function () {

    },
    methods: {
      selectAll: function () {
        this.checkAll = !this.checkAll;
        let flag = this.checkAll ? 1 : 0;
        this.list.forEach((ele, index) => {
          ele.checked = flag;
          if (ele.teachers) {
            ele.teachers.map(e => e.checked = flag);
          }
          this.$set(this.list, index, ele);
        });
      },

      handleCheckSubChange: function (index, item) {
        let flag = item.checked ? item.checked : 0;
        if (item.teachers) {
          item.teachers.map(e => e.checked = flag);
        }
        this.$set(this.list, index, item);
      },

      expand: function (index, obj) {
        obj.expand = !obj.expand;
        this.$set(this.list, index, obj)
      },

      doSave: function (obj) {
        this.saveLoading = true;
        API.Teacher.assignCoursePlan4User(obj)
          .then((res)=>{
            this.saveLoading = false;
            this.$emit('child-event','success');
            Util.UI.toast('编辑成功！', 'success');
          },(err) => {
            this.saveLoading = false;
          });
      },

      save: function () {
        let users = [];
        let classCodes = [];
        this.list.forEach( (ele, index) => {
          if (ele.teachers) {
            ele.teachers.forEach(function (e) {
              if (e.checked == 1) {
                users.push(e.userId);
                classCodes.push(ele.classCode);
              }
            });
          }
        });
        let obj = {
          coursePlanId: this.idA,
          userIds: '',
          classCodes: ''
        };
        obj.userIds = users.join(',');
        obj.classCodes = classCodes.join(',');
        this.doSave(obj);
      }
    },
    computed: {
      getSelectLength: function () {
        let len = 0;
        this.list.forEach((ele, index) => {
          if (ele.teachers) {
            ele.teachers.forEach(function (e) {
              if (e.checked == 1) {
                len += 1;
              }
            });
          }
        });
        return len;
      },

      idA: function () {
        return this.id
      }
    },
    components: {
      LoadingBtn
    }
  }

</script>
