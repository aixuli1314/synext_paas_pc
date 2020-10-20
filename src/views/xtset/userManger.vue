/**
 * 系统管理 用户管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/xtset/classManger' }">系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="inputVal" placeholder="输入ID" clearable @clear='refresh' ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search()" clean>搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
        <el-button size="mini" type="danger" @click="deletesUser()">选中删除</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" @select='select' :data="userData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
 <el-table-column align="center" type="selection" width="50">
      </el-table-column>
      <el-table-column sortable  prop="id" label="ID" width="160"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="userName" label="姓名" width="80"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="sex" label="性别" width="80" show-overflow-tooltip>
      </el-table-column>
      <!-- <el-table-column sortable prop="userType" label="用户类型" width="100" show-overflow-tooltip>
      </el-table-column> -->
        <el-table-column sortable prop="createTime" label="创建时间" width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="account" label="账号" width="170" show-overflow-tooltip>
      </el-table-column>
      <!-- <el-table-column sortable prop="pw" label="密码" width="170" show-overflow-tooltip>
      </el-table-column> -->
      <el-table-column sortable prop="email" label="邮箱" width="170" show-overflow-tooltip>
      </el-table-column>
      <!-- <el-table-column sortable prop="unionid" label="微信号" width="170" show-overflow-tooltip>
      </el-table-column> -->
      <el-table-column sortable prop="mobile" label="手机号码" width="170" show-overflow-tooltip>
      </el-table-column>
      <!-- <el-table-column sortable prop="active" label="是否有效" width="107" show-overflow-tooltip>
      </el-table-column> -->
      <!-- <el-table-column sortable prop="avatar" label="头像地址" width="170" show-overflow-tooltip>
      </el-table-column> -->
      <el-table-column label="操作" align="center" min-width="170"> 
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog title="编辑用户信息" :visible.sync="editFormVisible" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="姓名" prop="userName">
          <el-input size="small" v-model="editForm.userName" auto-complete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="editForm.sex" label="男">男</el-radio>
          <el-radio v-model="editForm.sex" label="女">女</el-radio>
        </el-form-item>
        <!-- <el-form-item label="用户类型" prop="userType">
          <el-select size="small" v-model="editForm.userType" placeholder="请选择" class="userRole">
            <el-option v-for="type in userType" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="账号" prop="account">
          <el-input size="small" v-model="editForm.account" auto-complete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <!-- <el-form-item label="微信号" prop="unionid">
          <el-input size="small" v-model="editForm.unionid" auto-complete="off" placeholder="请输入微信号"></el-input>
        </el-form-item> -->
        <el-form-item label="邮箱" prop="email">
          <el-input size="small" v-model="editForm.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input size="small" v-model="editForm.mobile" auto-complete="off" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <!-- <el-form-item label="是否有效" prop="active">
          <el-select size="small" v-model="editForm.active" placeholder="请选择" class="userRole">
            <el-option v-for="type in activeType" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item> -->
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeEdit("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitFormEdit('editForm')">保存</el-button>
      </div>
    </el-dialog>
    <!-- 添加 -->
    <el-dialog title="添加用户信息" :visible.sync="addFormVisible" width="30%" @click='closeDialog("add")'>
      <el-form label-width="80px" ref="addForm" :model="addForm" :rules="rules">
        <el-form-item label="账号" prop="account">
          <el-input size="small" v-model="addForm.account" auto-complete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input size="small" v-model="addForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwords">
          <el-input size="small" v-model="addForm.passwords" auto-complete="off" placeholder="再次输入密码"></el-input>
        </el-form-item>
         <el-form-item label="手机号码" prop="mobile">
          <el-input size="small" v-model="addForm.mobile" auto-complete="off" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input size="small" v-model="addForm.userName" auto-complete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="addForm.sex" label="男">男</el-radio>
          <el-radio v-model="addForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input size="small" v-model="addForm.email" auto-complete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="是否有效" prop="active">
          <el-select size="small" v-model="addForm.active" class="userRole">
            <el-option v-for="type in activeType" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择角色" prop="roles">
          <el-select size="small" v-model="addForm.roles" class="userRole">
            <el-option v-for="type in chooseRole" :label="type.value" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="头像地址" prop="avatar"> -->
          <!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="fileList" list-type="picture" v-model="addForm.avatar">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeAdd("add")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitFormAdd('editForm')">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// 导入请求方法
import {
  users,
  usersSearch,
  usersSave,
  usersDel,
  usersEdit,
  roles
} from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.addForm.password !== '') {
            this.$refs.addForm.validateField('passwords');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.addForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      addFormVisible: false, //控制添加页面显示与隐藏
      inputVal:'',
      chooseRole:[],
      // 编辑
      editForm: {
        userName: '',
        sex: '',
        userType: '',
        account: '',
        email: '',
        unionid: '',
        mobile: '',
        // avatar: '',
        active:''
      },
      // 添加
      addForm: {
        userName: '',
        sex: '',
        roles: '',
        account: '',
        password: '',
        passwords:'',
        email: '',
        // unionid: '',
        mobile: '',
        active:''
      },
      // 用户类型
      // userType: [
      //   { key: '访客', value: 0 },
      //   { key: '注册企业', value: 1 },
      //   { key: '企业个人', value: 2 },
      //   { key: '专家', value: 3 },
      //   { key: '科技局后台', value: 4 },
      //   { key: '系统管理员', value: 5 }
      // ],
        activeType: [
        { key: '否', value: 0 },
        { key: '是', value: 1 }
      ],
// 上传照片
      fileList: [],

      // 选择数据
      selectdata: [],
      // rules表单验证
      rules: {
        userName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        userType: [{ required: true, message: '请输入用户类型', trigger: 'blur' }],
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
            { validator: validatePass, trigger: 'blur', required: true, }
          ],
        passwords: [
            { validator: validatePass2, trigger: 'blur',required: true, }
          ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            required: true,
            message: '请输入正确的邮箱',
            trigger: 'blur'
          }
        ],
        // unionid: [
        //   { required: true, message: '请输入微信号', trigger: 'blur' },
        //   {
        //     pattern: /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/,
        //     required: true,
        //     message: '请输入正确的微信号',
        //     trigger: 'blur'
        //   }
        // ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
           {
            pattern: /^1(3\d|47|5((?!4)\d)|7(0|1|[6-8])|8\d)\d{8,8}$/,
            required: true,
            message: '请输入正确的电话号码',
            trigger: 'blur'
          }
        ],
        // active: [{ required: true, message: '请选择是否有效', trigger: 'blur' }],
        // avatar: [
        //   { required: true, message: '请输入头像地址', trigger: 'blur' }
        // ],
      },
      // 选择数据
      selectdata: [],
      // 删除用户
      seletedata: [],
      // 请求数据参数
      formInline: {
          current:1,
          size:10,
          id:null
        
      },
      //用户数据
      userData: [],
      // 数据权限
      UserDept: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      // role参数
      formInlineRole: {
        current:1,
        size:10000,
        id:null
      },
    }
  },
  // 注册组件
  components: {
    Pagination
  },

  /**
   * 数据发生改变
   */
  watch: {},

  /**
   * 创建完毕
   */
  created() {
    this.getdata(this.formInline)
    
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取数据方法
    getdata(parameter) {
      this.loading = true
      // 获取用户列表
      users(this.formInline).then(res => {
        this.loading = false
        if (res.statusCode !== 200) {
          this.$message({
            type: 'info',
            message: res.message
          })
        } else {
          console.log(res);
          this.userData = res.data.records
          for(var i=0;i<this.userData.length;i++){
            if(this.userData[i].active===0){
              this.userData[i].active="否"
            }else{
              this.userData[i].active="是"
            }
            // if(this.userData[i].userType==0){
            //   this.userData[i].userType="访客"
            // }else if(this.userData[i].userType==1){
            //   this.userData[i].userType="注册企业"
            // }else if(this.userData[i].userType==2){
            //   this.userData[i].userType="企业个人"
            // }else if(this.userData[i].userType==3){
            //   this.userData[i].userType="专家"
            // }else if(this.userData[i].userType==4){
            //   this.userData[i].userType="科技局后台"
            // }else{
            //   this.userData[i].userType="系统管理员"
            // }
          }
          // 分页赋值
          this.pageparm.currentPage = res.data.current
          this.pageparm.pageSize = res.data.size
          this.pageparm.total = res.data.total
        }
      })
      roles(this.formInlineRole).then(res =>{
        if(res.statusCode == 200){
          console.log(res);
          var s=res.data.records
          for(var u=0;u<s.length;u++){
            this.chooseRole[u] ={value : s[u].name}
          }
          console.log(this.chooseRole);
        }else{
          console.log('err');
        }
      })
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.current = parm.currentPage
      this.formInline.size = parm.pageSize
      this.getdata(this.formInline)
    },
    //搜索事件
   search() {
      if(this.inputVal){
        this.formInline.id=this.inputVal
        this.getdata(this.formInline) 
      } 
    },
    //搜索框清空刷新
    refresh(){
      this.formInline.id=null
      this.getdata(this.formInline)
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
        this.editForm.userName = row.userName
        this.editForm.sex = row.sex
        this.editForm.id = row.id
        // this.editForm.userType = row.userType
        this.editForm.account = row.account
        this.editForm.password = row.password
        this.editForm.email = row.email
        this.editForm.unionid = row.unionid
        this.editForm.mobile = row.mobile
        // this.editForm.avatar = row.avatar
        if(row.active=="否"){
          this.editForm.active=0
        }else{
          this.editForm.active=1
        }
        if(row.userType=='访客'){
          this.editForm.userType=0
        }else if(row.userType=='注册企业'){
          this.editForm.userType=1
        }else if(row.userType=='企业个人'){
          this.editForm.userType=2
        }else if(row.userType=='专家'){
          this.editForm.userType=3
        }else if(row.userType=='科技局后台'){
          this.editForm.userType=4
        }else if(row.userType=='系统管理员'){
          this.editForm.userType=5
        }
        // this.editForm.active = row.active
    },
        //显示添加界面
    handleAdd: function(index, row) {
      this.addFormVisible = true
        this.addForm.userName = ''
        this.addForm.sex = ''
        this.addForm.userType = ''
        this.addForm.account = ''
        this.addForm.password = ''
        this.addForm.email = ''
        this.addForm.unionid = ''
        this.addForm.mobile = ''
        this.addForm.active = ''
        // this.addForm.avatar = ''
    },
    // 编辑方法
    submitFormEdit(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          // 请求方法
          usersEdit(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.statusCode == 200) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '数据修改成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.editFormVisible = false
              this.loading = false
              this.$message.error('修改失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
     // 添加方法
    submitFormAdd(editData) {
      // this.$refs[editData].validate(valid => {
      //   if (valid) {
          // 请求方法
          usersSave(this.addForm)
            .then(res => {
              this.addFormVisible = false
              this.loading = false
              if (res.statusCode == 200) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '数据添加成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.addFormVisible = false
              this.loading = false
              this.$message.error('添加失败，请稍后再试！')
            })
        // } else {
        //   return false
        // }
      // })
    },
    // 选择复选框事件
    select(selection){
      this.selectdata=[]
      this.seletedata=[]
      this.selectdata = selection
      for (var i=0;i<this.selectdata.length;i++){
        this.seletedata.push(this.selectdata[i].id)
      }
      
    },
    // 关闭编辑弹出框
    closeEdit(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } else if (dialog == 'perm') {
        this.dataAccessshow = false
      } else if (dialog == 'unit') {
        this.unitAccessshow = false
      }
    },
    // 关增加弹出框
     closeAdd(dialog) {
      if (dialog == 'add') {
        this.addFormVisible = false
      } else if (dialog == 'perm') {
        this.dataAccessshow = false
      } else if (dialog == 'unit') {
        this.unitAccessshow = false
      }
    },
    // 删除多个用户
    deletesUser() {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          usersDel(this.seletedata)
            .then(res => {
              if (res.statusCode== 200) {
                this.$message({
                  type: 'success',
                  message: '数据已删除!'
                })
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.message
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('数据删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
    },
        // 单个删除
     deleteUser(index,row) {
        if(row){
        this.seletedata=[]
        this.seletedata.push(row.id)
      }
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          usersDel(this.seletedata)
            .then(res => {
              if (res.statusCode == 200) {
                this.$message({
                  type: 'success',
                  message: '数据已删除!'
                })
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.message
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('数据删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除！'
          })
        })
    }, 
   
    
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>

 