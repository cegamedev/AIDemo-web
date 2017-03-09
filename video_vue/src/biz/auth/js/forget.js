/**
 * Created by jiaaobo on 16/11/29.
 */
import Util from "util";
import API  from "api";
import constant from "const";
import md5 from  'js-md5';

export default{
  name: "forgetPage",
  data(){
    return {
      'mobile': '',
      'code': ''
    }
  },

  created: function() {

  },
  mounted: function () {

  },
  methods: {
    sendCodeClick: function() {
      API.Auth.sendCode({"phone":this.mobile})
        .then((res)=>{
          Util.UI.toast("发送成功，请输入验证码",'success');
      });
    },
    nextBtnClick : function(){
      API.Auth.validateCode({"phone":this.mobile,'code' : this.code})
        .then((res)=>{
          window.getRouter().push({
            path : `/auth/resetPassword`,
            query : {'phone' : this.mobile,'code' : this.code}
          });
        });
    }
  },
  computed: {},
  components: {}
}

