<template>
  <el-pagination
    v-show="hasPaging"
    layout="prev, pager, next"
    :page-size="pageSize"
    v-on:current-change="currentChange"
    :total="total">
  </el-pagination>
</template>
<style scoped>

</style>
<script>
    export default{
        props : ['total','pageSize','page-change'],
        data(){
            return{
            }
        },
        methods : {
          currentChange : function(index){
            this.$emit("page-change",index);
          }
        },
        computed : {

          hasPaging: function(){
              return this.total / this.pageSize  > 1
          }

        },
        components:{
        }
    }
</script>
