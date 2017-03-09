
<template>
      <!-- 上传头像 -->
      <el-dialog  title="上传头像" v-model="showUpload"    >
        <el-upload
          ref="uploadDialog"
          class="upload-base"
          :on-success="onEnd"
          drag
          show-file-list="false"
          :action="uploadUrl"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text el-upload-text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

      </el-dialog>

</template>
<style scoped lang="scss">
    .upload-base{
      margin: 30px auto;
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  .el-icon-upload{
    font-size: 67px;
    color: #97a8be;
    margin: 40px 0 16px;
    line-height: 50px
  }
  .el-upload-text{
    color: #97a8be;
    font-size: 14px;
    text-align: center;

    em{
      color: #20a0ff;
      font-style: normal;
    }

  }

}
</style>
<script>

    //数组更新检测
    //https://cn.vuejs.org/v2/guide/list.html#search-query-sidebar
    export default{
        props : ['showUpload','onUploadSuccess','uploadUrl'],

        data(){
            return{

            }
        },
        methods : {
          onEnd : function(res){
              this.onUploadSuccess(res);
              this.$refs.uploadDialog.clearFiles();
          }
        },
        components:{
        }
    }
</script>
