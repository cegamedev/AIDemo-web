
<template>
    <div class="ib loading-text">
      <i class="el-icon-loading" v-show="isLoading"></i>
      <span v-show="!isLoading">
          <slot></slot>
      </span>
    </div>
</template>
<style scoped>
    .loading-text{

    }
</style>
<script>

    //数组更新检测
    //https://cn.vuejs.org/v2/guide/list.html#search-query-sidebar
    export default{
        props : ['isLoading'],
        data(){
            return{

            }
        },
        components:{
        }
    }
</script>
