
<template>

    <button type="button" :class="clz"  @click="onClick()" :style="{'opacity' : isLoading ? 0.6 : 1 , 'position' : 'relative'}">
      <span class="ib  btn-icon-loading">
            <i class="el-icon-loading" v-show="isLoading" ></i>
        </span>
      <span :style="{'visibility' : isLoading ? 'hidden' : 'visible'}"><slot></slot></span>
    </button>

    <!--<div class="ib loading-text">-->
      <!--<i class="el-icon-loading" v-show="isLoading"></i>-->
      <!--<span v-show="!isLoading">-->
          <!--<slot></slot>-->
      <!--</span>-->
    <!--</div>-->
</template>
<style scoped lang="scss">
   .btn-icon-loading{
      position: absolute;
      left: 50%;
      margin-left: -7px;
     z-index: 2;

   }
</style>
<script>
    export default{
        props : ['isLoading','clz','onLdClick'],
        data(){
            return{
            }
        },
        methods : {
          onClick : function(){
              if(!this.isLoading){
                  this.onLdClick();
              }
              else{

              }
          }
        },
        components:{
        }
    }
</script>
