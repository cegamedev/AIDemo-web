<template>
    <div class="" style="padding : 20px;">
      <button class="btn btn-primary">基础按钮</button>
      <button class="btn btn-primary btn-radius">圆角按钮</button>
      <button class="btn btn-primary btn-outline">镂空按钮</button>
      <button class="btn btn-primary btn-md btn-radius">中等按钮</button>
      <button class="btn btn-primary btn-md btn-w-md btn-radius">固定宽度</button>

      <button class="btn btn-primary btn-ss btn-radius">老师</button>
      <button class="btn btn-accent btn-ss btn-radius">老师</button>

      <!-- 图标 -->
      <i class="iconfont icon-book"></i>

      <div class="mt10">
          <input type="text" placeholder="默认input" class="input-base" />
          <input type="text" placeholder="固定宽度input" class="input-base input-w-lg" />
      </div>

      <div class="mt10">

        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>


        <div class="input-group">
          <i class="iconfont icon-search"></i>
          <input type="text" placeholder="集体教学魅力" class="input-base input-block" />
        </div>


        <div class="">

          <el-dropdown menu-align="start">
            <div class="el-dropdown-link dropdown-link">
              下拉菜单<i class="iconfont icon-arrow-bottom "></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>

      </div>

      <div class="mt15">


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
          <tr>
            <td> 老师姓名 </td> <td> 老师姓名 </td> <td> 老师姓名 </td> <td> 老师姓名 </td>
          </tr>
          <tr>
            <td> 老师姓名 </td> <td> 老师姓名 </td> <td> 老师姓名 </td> <td> 老师姓名 </td>
          </tr>
          <tr>
            <td> 老师姓名 </td> <td> 老师姓名 </td> <td> 老师姓名 </td> <td> 老师姓名 </td>
          </tr>

          </tbody>
        </table>

        <br/>
        <br/>
        <br/>
        <br/>


        <loading-text :isLoading="isLoading || false">
          <a href="javascript:void(0)" class="text-primary" @click="onLoading()">
            loading 文字
          </a>
        </loading-text>


        <loading-btn  :onLdClick="onBtnClick" clz="btn btn-md btn-primary" :isLoading="isBtnLoading || false">
              文字
        </loading-btn>



        <div class="block mt30">
          <el-pagination
            :current-change="onCurrentPage"
            layout="prev, pager, next"
            :total="100">
          </el-pagination>
        </div>

      </div>
    </div>
</template>
<style>

</style>
<script>
  import LoadingText from "../../common/component/loadingText";
  import LoadingBtn from "../../common/component/loadingBtn";

  export default {
    data() {
      return {
        isLoading : false,
        isBtnLoading : false,

        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },

    methods : {

    onCurrentPage : function(currentPage){

        console.log(currentPage);

    },

    onBtnClick : function(){
        console.log("onBtnClick..");
        this.isBtnLoading = true;
        setTimeout(()=>{
           this.isBtnLoading = false;
        },2000);

    },
      onLoading : function(){

        this.isLoading = true;
         setTimeout(()=>{
          this.isLoading = false;
         },3000);
      }
    },
    components : {
      LoadingText,
      LoadingBtn
    }
  }

</script>
