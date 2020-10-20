/**
 * 系统管理 部门管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/xtset/classManger' }">系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>部门管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="inputVal" placeholder="输入编号" clearable @clear="refresh"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
        <el-button size="mini" type="danger" @click="deletesUser()">选中删除</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small"  @select='select'  :data="userData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
 <el-table-column align="center" type="selection" width="50">
      </el-table-column>
      <el-table-column sortable  prop="id" label="编号" width="160"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="name" label="部门名称" width="130"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="createTime" label="创建时间" width="150" show-overflow-tooltip>
      </el-table-column>
        <el-table-column sortable prop="orgTypePathKey" label="部门类型" width="150" show-overflow-tooltip>
      </el-table-column>
        <el-table-column sortable prop="orgType" label="组织类型" width="100" show-overflow-tooltip >
      </el-table-column>
      <el-table-column sortable prop="comcode" label="部门路径" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="pid" label="上级部门ID" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="active" label="是否有效" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="remark" label="备注" width="250" show-overflow-tooltip>
      </el-table-column>
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
    <!-- auto-complete  关闭再打开填写的时候会有之前的提示 -->
    <el-dialog title="编辑部门信息" :visible.sync="editFormVisible" width="30%" @click='closeEdit("edit")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        
        <el-form-item label="部门名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        
        <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
        </el-form-item>
        <el-form-item label="组织类型" prop="orgType">
           <el-select size="small" v-model="editForm.orgType" placeholder="请选择" class="userRole">
            <el-option v-for="type in orgType" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门路径" prop="comcode">
          <el-input size="small" v-model="editForm.comcode" auto-complete="off" placeholder="请输入部门路径"></el-input>
        </el-form-item>
        <el-form-item label="上级ID" prop="pid">
          <el-input size="small" v-model="editForm.pid" auto-complete="off" placeholder="请输入上级部门ID"></el-input>
        </el-form-item>
        <el-form-item label="是否有效" prop="active">
          <el-select size="small" v-model="editForm.active" placeholder="请选择" class="userRole">
            <el-option v-for="type in orgActive" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" :rows="2"  placeholder="请输入备注" auto-complete="off" v-model="editForm.remark"></el-input>
        </el-form-item>        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeEdit("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitFormEdit('editForm')">保存</el-button>
      </div>
    </el-dialog>
<!-- 添加 -->
      <el-dialog title="添加部门信息" :visible.sync="addFormVisible" width="30%" @click='closeAdd("add")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
         
        <el-form-item label="部门名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        
        <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
        </el-form-item>
        <el-form-item label="组织类型" prop="orgType">
           <el-select size="small" v-model="editForm.orgType" placeholder="请选择" class="userRole">
            <el-option v-for="type in orgType" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门路径" prop="comcode">
          <el-input size="small" v-model="editForm.comcode" auto-complete="off" placeholder="请输入部门路径"></el-input>
        </el-form-item>
        <el-form-item label="上级ID" prop="pid">
          <el-input size="small" v-model="editForm.pid" auto-complete="off" placeholder="请输入上级部门ID"></el-input>
        </el-form-item>
         <el-form-item label="是否有效" prop="active">
          <el-select size="small" v-model="editForm.active" placeholder="请选择" class="userRole">
            <el-option v-for="type in orgActive" :label="type.key" :value="type.value" :key="type.value" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" :rows="2"  placeholder="请输入备注" auto-complete="off" v-model="editForm.remark"></el-input>
        </el-form-item>        
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
  classManger,
  classSearch,
  classSave,
  classDel,
  classEdit
} from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      loading: false, //是显示加载,
      editFormVisible: false, //控制编辑页面显示与隐藏
      addFormVisible: false,//添加页面的显示与隐藏
      inputVal:'',//搜索框里的值
      // 编辑与添加
      editForm: {
        id: "",
        name: "",
        createTime:"",
        orgTypePathKey:"",
        orgType:"",
        comcode:"",
        pid:"",
        remark:"",
        active:"",
        // token: localStorage.getItem('logintoken')
      },
      // 组织类型
      orgType: [
        { key: '部门' , value: 0 },
        { key: '注册企业', value: 1 },
        { key: '虚拟部门' , value: 2 },
      ],
      //是否有效
      orgActive:[
        { key: '否', value: 0},
        { key: '是', value: 1 },
      ],
      
      // rules表单验证
      rules: {
        name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
        orgTypePathKey: [{ required: true, message: '请输入部门类型', trigger: 'blur' }],
        orgType: [
          { required: true, message: '请输入组织类型', trigger: 'blur' }
        ],
        comcode: [{ required: true, message: '请输入部门路径', trigger: 'blur' }],
        pid: [
          { required: true, message: '请输入上级ID', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],
         active: [
          { required: true, message: '请选择是否有效', trigger: 'blur' }
        ],
      
      },
      // 选择数据
      selectdata: [],
      // 删除
      seletedata: [],
      // 请求数据参数
      formInline: {
        current: 1,
        size: 10,
        id:null
      },
      //用户数据
      userData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
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
      classManger(this.formInline).then(res => {
        this.loading = false
        if (res.statusCode !== 200) {
          this.$message({
            type: 'info',
            message: res.message
          })
        } else {
          this.userData = res.data.records
          for(var i=0;i<this.userData.length;i++){
              if(this.userData[i].active===1){
                this.userData[i].active='是'
              }else if(this.userData[i].active===0){
                this.userData[i].active='否'
              }
              if(this.userData[i].orgType == 0){
                this.userData[i].orgType ="部门"
              }else if(this.userData[i].orgType == 1){
                 this.userData[i].orgType ="注册企业"
              }else{
                this.userData[i].orgType ="虚拟部门"
              }
          }
          // 分页赋值
          this.pageparm.currentPage = res.data.current
          this.pageparm.pageSize = res.data.size
          this.pageparm.total = res.data.total
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
        this.editForm.id = row.id 
        this.editForm.name = row.name
        this.editForm.orgTypePathKey = row.orgTypePathKey
        if(row.orgType=="部门"){
          this.editForm.orgType=0
        }else if(row.orgType=="注册企业"){
          this.editForm.orgType=1
        }else{
          this.editForm.orgType=2
        }
        this.editForm.orgType = row.orgType
        this.editForm.comcode = row.comcode
        this.editForm.pid = row.pid
        this.editForm.remark = row.remark
        if(row.active=='否'){
          this.editForm.active=0
        }else{
          this.editForm.active=1
        }
    },
    // 显示添加页面
    handleAdd: function(index, row) {
      this.addFormVisible = true
        // this.editForm.id = ''
        this.editForm.name = ''
        this.editForm.orgTypePathKey = ''
        this.editForm.orgType = ''
        this.editForm.comcode = ''
        this.editForm.pid = ''
        this.editForm.remark = ''
      
    },
    // 添加提交方法
    submitFormAdd(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          // 请求方法
          classSave(this.editForm)
            .then(res => {
              this.addFormVisible = false
              this.loading = false
              if (res.statusCode==200) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '数据添加成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.message
                })
              }
            })
            .catch(err => {
              this.addFormVisible = false
              this.loading = false
              this.$message.error('添加失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 编辑、
      submitFormEdit(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {

          // 请求方法
          classEdit(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.statusCode==200) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '数据修改成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.message
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
    // 关闭编辑、增加弹出框
    closeEdit(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } 
    },
     closeAdd(dialog) {
      if (dialog == 'add') {
        this.addFormVisible = false
      } 
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
    // 删除用户
    deletesUser() {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          classDel(this.seletedata)
            .then(res => {
              if (res.statusCode==200) {
                this.$message({
                  type: 'success',
                  message: '数据已删除!'
                })
                this.getdata(this.formInline)
                
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
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
          classDel(this.seletedata)
            .then(res => {
              if (res.statusCode==200) {
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

 