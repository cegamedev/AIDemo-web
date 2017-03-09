/**
 * Created by jiaaobo on 16/11/29.
 */
import Util from "util";
import API  from "api";
import constant from "const";
import md5 from  'js-md5';

export default{
  name: "loginPage",
  data(){
    return {
      'account': '',
      'pwd': '',
       isAuto : false
    }
  },

  created: function() {
    let loginInfo = Util.Storage.getLgObj("loginInfo");
    if(loginInfo){
      this.account = loginInfo.account;
      this.pwd = loginInfo.pwd;
      this.isAuto = true;
    }

  },
  mounted: function () {

  },
  methods: {
    loginBtnClick: function() {

      let isMd5 = /^([a-fA-F0-9]{32})$/.test(this.pwd);

      var data = {
        "account": this.account,
        "pwd": isMd5 ? this.pwd : md5(this.pwd)
      };

      API.Auth.login(data)
        .then((res)=>{
          
          //存储token
          Util.Storage.setLg("token",res.bizData.token);
          
          if(this.isAuto){
            Util.Storage.setLgObj("loginInfo",data);
          }
          else{
            Util.Storage.removeLg("loginInfo");
          }

          //发送通知
          window.getEventBus().$emit("onUserInfo",res.bizData);

          window.getRouter().push({
            path : `/index/home`
          });
      });
    },
    forgetPwdBtnClick:function(){
      window.getRouter().push({
        path : `/auth/forgetPwd`
      });
    }
  },
  computed: {},
  components: {}
}

