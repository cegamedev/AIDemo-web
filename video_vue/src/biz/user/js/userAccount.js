/**
 * Created by jiaaobo on 16/11/29.
 */
import Util from "util";
import API  from "api";
import constant from "const";
import leftNav from "../../../common/component/leftNav";
import tabBar from "../../../common/component/tabBar";
import LoadingBtn from "../../../common/component/loadingBtn";
import md5 from  'js-md5';
export default{
  name: "userAccountPage",
  data(){
    return {
      tabList : [
        {
          name : "mb",
          desc : "修改密码"

        }
      ],
      oldPassword : '',
      newPassword : '',
      repeatPassword : '',
      tabSelect : '',
      isBtnUpdateLoading : false
    }
  },

  mounted: function () {


  },
  methods: {


    updatePwd : function () {

      if(!this.oldPassword || !this.newPassword || !this.repeatPassword){
        Util.UI.toast("请填写密码!",'warning');
        return;
      }

      if(this.newPassword  ==  this.oldPassword){
        Util.UI.toast("请确保新密码与旧密码不同!",'warning');
        return;
      }

      if(this.newPassword  !=  this.repeatPassword){
        Util.UI.toast("新密码 两次密码不一致!",'warning');
        return;
      }

      let data = {
        oldPassword : md5(this.oldPassword),
        newPassword : md5(this.newPassword)
      }

      this.isBtnUpdateLoading = true;

      API.User.updateUserPassword(data)
        .then(res=>{
          Util.UI.toast("修改成功!",'success');

          this.oldPassword = '';
          this.newPassword = '';
          this.repeatPassword = '';
          
          this.isBtnUpdateLoading = false
        },(err)=>{
          this.isBtnUpdateLoading = false
        });

    },
    onSelectTab : function(a){

    }


  },
  computed: {

  },
  components: {
    leftNav,
    tabBar,
    LoadingBtn
  }
}
