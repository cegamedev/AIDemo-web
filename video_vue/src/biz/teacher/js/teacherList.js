/**
 * Created by jiaaobo on 16/11/29.
 */
import Util from "util";
import API  from "api";
import constant from "const";
import leftNav from "../../../common/component/leftNav";
import tabBar from "../../../common/component/tabBar";
import paging from "../../../common/component/paging";
import LoadingBtn from "../../../common/component/loadingBtn";
import LoadingText from "../../../common/component/loadingText";

export default{
  name: "teacherListPage",
  data(){
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      }
      var flag = Util.Validate.isPhone(value);
      if (!flag) {
        callback(new Error('手机号格式不正确'));
      } else {
        callback();
      }
    };
    return {

      pageIndex: 1,
      pageSize: 10,
      teacherList: [],
      totalCount: 0,

      dialogTitle: '添加老师',
      dialogAddTeacherVisible: false,
      isLoadingTeacher: false,//老师列表数据加载
      isEdit: false,
      classList: [],
      positionList: [],
      form: {
        accountId: '',
        phone: '',
        userName: '',
        classCode: '',
        position: ''
      },

      rules: {
        userName: [
          { required: true, message: '请输入老师的姓名', trigger: 'blur' }
        ],
        classCode: [
          { required: true, message: '请选择班级', trigger: 'blur,change' }
        ],
        position: [
          { required: true, message: '请选择职位', trigger: 'blur,change' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {validator: checkPhone, trigger: 'blur'}
        ]
      },
      saveTeacherLoading: false
    }
  },

  mounted: function () {
    this.doRefresh();
  },
  methods: {
    pageChange: function (data) {
      if (!data) {
        return;
      }
      this.pageIndex = data;
      this.doRefresh();
      console.log('page change...' + data);
    },
    //删除老师账户
    doDelete: function (row) {
      row.delLoading = true;
      API.Teacher.delTeacherAccount({id: row.id})
        .then((res) => {
          this.doRefresh();
          row.delLoading = false;
          Util.UI.toast('删除成功!', 'success');
        }, (err) => {
          row.delLoading = false;
          Util.UI.toast(err.msg, 'error');
        });
    },
    //刷新列表
    doRefresh: function () {
      this.isLoadingTeacher = true;
      API.Teacher.getTeacherList({
        'pageIndex': this.pageIndex,
        'pageSize': this.pageSize
      })
        .then((res) => {
          this.isLoadingTeacher = false;
          let result = res.bizData;
          if (result) {
            this.totalCount = result.records;
            this.teacherList = result.rows.map((r)=>{
              r.delLoading = false;
              r.resetLoading = false;
              return r;
            });
          }
        }, (err) => {
          this.isLoadingTeacher = false;
        });
    },
    deleteTeacher: function (index, row) {
      Util.UI.confirm('是否确认删除该老师账户?', '提示')
        .then(() => {
          this.doDelete(row);

      }).catch((err) => {

      });
    },
    addTeacher: function () {
      this.dialogTitle = '添加老师';
      this.dialogAddTeacherVisible = true;
      this.initSelectData();
    },
    resetForm(str) {
      //不要用这个
      // this.$nextTick( () => {
      //
      // })
      this.form = {
        accountId: '',
        phone: '',
        userName: '',
        classCode: '',
        position: ''
      };
      this.$refs[str].resetFields();

    },
    initSelectData: function () {

      //获取老师列表
      API.Teacher.getClassesByUser()
        .then((data) => {
          this.classList = data.bizData;
        });
      //获取职位列表
      API.Teacher.getPositionList()
        .then((data) => {
          this.positionList = data.bizData;
        });
    },
    editTeacher: function (index, row) {
      this.initSelectData();
      console.log(row);
      this.isEdit = true;
      this.form.accountId = row.id ? row.id : '';
      this.form.phone = row.phone ? row.phone : '';
      this.form.userName = row.userName ? row.userName : '';
      this.form.classCode = row.classCode ? row.classCode : '';
      this.form.position = row.position ? row.position : '';
      this.dialogTitle = '修改老师';
      this.dialogAddTeacherVisible = true;
      console.log(this.form);
    },
    //查看课程表
    viewCourseTable: function (index, row) {

    },
    doAdd: function (obj) {
      API.Teacher.addTeacherAccount(obj)
        .then(() => {
          this.saveTeacherLoading = false;
          this.dialogAddTeacherVisible = false;
          this.doRefresh();
          Util.UI.toast('保存成功！', 'success');
        }, () => {
          this.saveTeacherLoading = false;
        });
    },
    doUpdate: function (obj) {
      API.Teacher.updateTeacherAccount(obj)
        .then(() => {
          this.saveTeacherLoading = false;
          this.dialogAddTeacherVisible = false;
          this.doRefresh();
          Util.UI.toast('修改成功！', 'success');
        }, () => {
          this.saveTeacherLoading = false;
        });
    },
    //保存老师
    save: function () {
      this.$refs['teacherForm'].validate((valid) => {
        if (valid) {
          let obj = this.form;
          this.saveTeacherLoading = true;
          if (this.isEdit === true) {
            this.doUpdate(obj);
          } else {
            delete this.form.accountId;
            this.doAdd(obj);
          }
        } else {
          return false;
        }
      });

    },

    cancel: function (str) {
      this.isEdit = false;
      this.resetForm(str);
      this.dialogAddTeacherVisible = false;
    },
    doReset: function (row) {
      row.resetLoading = true;
      API.Teacher.resetTeacherPassword(row.id)
        .then((res) => {
          row.resetLoading = false;
          this.doRefresh();
          Util.UI.toast('重置成功!', 'success');
        }, (err) => {
          row.resetLoading = false;
          Util.UI.toast(err.msg, 'error');
        });
    },
    resetPwd: function (index, row) {
      Util.UI.confirm('是否确认重置该老师账户密码？点击重置后，会给该用户注册的手机号发一条6位随机数的短信', '提示')
        .then(() => {
          this.doReset(row);
        }).catch((err) => {

      });
    },

  },
  computed: {
    // totalCount: function () {
    //   return 11;
    // },
    leftCount: function () {
      return 28 - this.totalCount;//目前需求：总共可新建28名老师
    },
  },
  components: {
    leftNav,
    tabBar,
    paging,
    LoadingBtn,
    LoadingText
  }
}
