/**
 * Created by jiaaobo on 16/11/29.
 */
import Util from "util";
import API  from "api";
import constant from "const";
import leftNav from "../../../common/component/leftNav";
import uploadDialog from "../../../common/component/uploadDialog";
import LoadingBtn from "../../../common/component/loadingBtn";
export default{
  name: "userInfoPage",
  data(){
    return {
      user : '',
      classList : [],
      dialogUploadUserHeadVisible : false,
      isBtnUpdateLoading : false,
      isBtnUpdateOtherLoading : false
    }
  },

  mounted: function () {

    //获取下userInfo
    API.User.getUserInfo()
      .then(res=>{
        this.user = res.bizData;
      });

    API.User.getClassesByUser()
      .then(res=>{
        this.classList = res.bizData;
      })
  },
  methods: {

    onUploadSuccess : function(res){
      if(res.code == 200){
        Util.UI.toast("头像上传成功!",'success');
        this.user.portrait = res.data.url;
        this.dialogUploadUserHeadVisible = false;
      }
    },

    onUploadUserHead : function(){
      this.dialogUploadUserHeadVisible = true;
    },


    updateUserInfo : function (type) {
      if(!this.user.userName){
        Util.UI.toast("请填写姓名!",'warning');
        return;
      }

      type == 'base' ?  this.isBtnUpdateLoading = true :  this.isBtnUpdateOtherLoading = true;

      API.User.updateUserInfo(this.user)
        .then(res=>{
          Util.UI.toast("修改成功!",'success');
          window.getEventBus().$emit("userInfoChange",res.bizData);
          //更新用户信息
          Util.Storage.setLgObj('userInfo',res.bizData);
          type == 'base' ?  this.isBtnUpdateLoading = false :  this.isBtnUpdateOtherLoading = false;
        },(err)=>{
          type == 'base' ?  this.isBtnUpdateLoading = false :  this.isBtnUpdateOtherLoading = false;
        });

    },

    onUpdateBaseUserInfo : function(){
      this.updateUserInfo('base');
    },
    onUpdateDescUserInfo : function(){
      this.updateUserInfo('desc');
    }
  },
  computed: {

  },
  components: {
    leftNav,
    uploadDialog,
    LoadingBtn
  }
}
