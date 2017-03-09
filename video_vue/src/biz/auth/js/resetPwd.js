/**
 * Created by jiaaobo on 16/11/29.
 */
import Util from "util";
import API  from "api";
import constant from "const";
import md5 from  'js-md5';

export default{
  name: "resetPage",
  data(){
    return {
      'pwd': '',
      'repwd': ''
    }
  },

  created: function() {

  },
  mounted: function () {
    //从url获取参数
    this.phone =  this.$route.query.phone;
    this.code =  this.$route.query.code;

    console.log(this.phone);
    console.log(this.code);

  },
  methods: {
    resetPwdBtnClick: function() {
      var data = {
        "phone": this.phone,
        "password": md5(this.pwd),
        "repassword": md5(this.repwd),
        "code":this.code
      };

      API.Auth.updatePassword(data)
        .then((res)=>{
          //更新token
          Util.Storage.setLg("token",res.bizData.token);
          Util.UI.toast("密码修改成功!",'success');

          window.getRouter().push({
            path : `/index/home`
          });
      });
    }

  },
  computed: {},
  components: {}
}

