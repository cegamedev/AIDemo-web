<template>
  <div class="c-tabbar">

    <ul class="c-tabbar-list">
      <li @click="onTabSelect(tab)" :class="{'active' : tab.active}"  v-for="tab in tabs">
        <a href="javascript:void(0)">
          {{tab.desc}}
        </a>
      </li>
    </ul>

  </div>
</template>
<style lang="scss" scoped>
  @import "../skin/var";

  .c-tabbar {
    background-color: #fff;
    border: 1px solid #EBEBEB;
    box-shadow: 0 2px 4px 0 rgba(156, 156, 156, 0.08);
  }

  .c-tabbar-list {
    overflow: hidden;
    clear: both;
    background: #fff;

    & > li {
      a {
        font-size: 12px;
      }

      float: left;
      padding: 10px;

      &.active {
        border-bottom: 2px solid $primary-color;
      }
      &:first-child {
        margin-left: 10px;
      }
    }
  }
</style>
<script>
    export default{
        props : ['tabList','value'],
        data(){
            return{
                tabs :[]
            }
        },

        mounted : function(){
          let item = this.tabList[0];
          item.active = true;
          this.tabList.splice(0,item);
          this.$emit("input",item);
          this.tabs = this.tabList;
        },
        methods : {
            onTabSelect : function(tab){
                this.tabs = this.tabs.map(t=>{
                    if(t.name == tab.name){
                       t.active = true;
                        //发送通知
                        this.$emit("input",t);
                    }
                    else{
                      t.active = false;
                    }
                    return t;
                });
            }
        },
        components:{
        }
    }

</script>
