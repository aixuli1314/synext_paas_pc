/**
 * 申报指南  计划类目
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">申报指南</el-breadcrumb-item>
      <el-breadcrumb-item>计划类目</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="inputVal" placeholder="输入ID" clearable @clear="refresh"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
        <el-button size="mini" type="danger" @click="deletesUser()">选中删除</el-button>

      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" @select='select' :data="userData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
 <el-table-column align="center" type="selection" width="50">
      </el-table-column>
      <el-table-column sortable  prop="id" label="ID" width="60"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="name" label="名称" width="200"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="createUserId" label="创建人" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="createTime" label="创建时间" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="planType" label="计划类别" width="200" show-overflow-tooltip>
      </el-table-column>
        <el-table-column sortable prop="orgTypePathKey" label="部门类型" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" width="30%" @click='closeEdit("edit")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <!-- <el-form-item label="ID" prop="id">
          <el-input size="small" v-model="editForm.id" auto-complete="off" placeholder="请输入ID"></el-input>
        </el-form-item> -->
        <el-form-item label="名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="createUserId">
          <el-input size="small" v-model="editForm.createUserId" auto-complete="off" placeholder="请输入创建人"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input size="small" v-model="editForm.createTime" auto-complete="off" placeholder="请输入创建时间"></el-input>
        </el-form-item>
        <el-form-item label="计划类别" prop="planType">
          <el-select size="small" v-model="editForm.planType" placeholder="请选择" class="userRole">
            <el-option v-for="type in planTypes" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeEdit("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitFormEdit('editForm')">保存</el-button>
      </div>
    </el-dialog>
     <el-dialog title="添加" :visible.sync="addFormVisible" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <!-- <el-form-item label="ID" prop="id">
          <el-input size="small" v-model="editForm.id" auto-complete="off" placeholder="请输入ID"></el-input>
        </el-form-item> -->
        <el-form-item label="名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="createUserId">
          <el-input size="small" v-model="editForm.createUserId" auto-complete="off" placeholder="请输入创建人"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input size="small" v-model="editForm.createTime" auto-complete="off" placeholder="请输入创建时间"></el-input>
        </el-form-item>
        <el-form-item label="计划类别" prop="planType">
          <el-select size="small" v-model="editForm.planType" placeholder="请选择" class="userRole">
            <el-option v-for="type in planTypes" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
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
  planType,
  planSave,
  planDel,
  planEdit
} from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      addFormVisible: false, //控制编辑页面显示与隐藏
      inputVal:'',
      // 编辑与添加
      editForm: {
        id: '',
        name: '',
        createUserId:'',
        createTime:'',
        planType:'',
        orgTypePathKey: '',
      },
      // 计划类别
      planTypes:[
        {key:'课题申报',value:0}
      ],
      // 选择数据
      selectdata: [],
      // rules表单验证
      rules: {
        // name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
       
        // createUserId: [{ required: true, message: '请输入创建人', trigger: 'blur' }],
        // createTime: [{ required: true, message: '请输入创建时间', trigger: 'blur' }],
        // planType: [{ required: true, message: '请输入计划类别', trigger: 'blur' }],
        // orgTypePathKey: [
        //   { required: true, message: '请输入部门类型', trigger: 'blur' }
        // ],
        
      },
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
      planType(this.formInline).then(res => {
        this.loading = false
        if (res.statusCode != 200) {
          this.$message({
            type: 'info',
            message: res.message
          })
        } else {
          this.userData = res.data.records
          for(var i=0;i<this.userData.length;i++){
              if(this.userData[i].planType===0){
                this.userData[i].active='课题申报'
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
        this.editForm.createUserId = row.createUserId
        this.editForm.createTime = row.createTime
        if(row.planType == '课题申报'){
          this.editForm.planType = 0
        }
        this.editForm.orgTypePathKey = row.orgTypePathKey
     
    },
    //显示添加界面
    handleAdd: function(index, row) {
      this.addFormVisible = true
        this.editForm.name = ''
        this.editForm.createUserId = ''
        this.editForm.createTime = ''
        this.editForm.planType = ''
        this.editForm.orgTypePathKey = ''
      
    },
    // 编辑、添加提交方法
    submitFormEdit(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          // 请求方法
          planEdit(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.statusCode == 200) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '修改成功！'
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
       // 添加提交方法
    submitFormAdd(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          // 请求方法
          planSave(this.editForm)
            .then(res => {
              this.addFormVisible = false
              this.loading = false
              if (res.statusCode == 200) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '添加成功！'
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
    // 关闭编辑弹出框
    closeEdit(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } 
    },
    // 关闭增加弹出框
    closeAdd(dialog) {
      if (dialog == 'add') {
        this.editFormVisible = false
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
    deleteUser(index, row) {
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
          planDel(this.seletedata)
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
    // 删除多个用户
    deletesUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          planDel(this.seletedata)
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

 