/**
 * 字典维护 消息模板
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">字典维护</el-breadcrumb-item>
      <el-breadcrumb-item>消息模板</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="inputVal" placeholder="输入ID" clearable @clear="refresh"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
        <el-button size="mini" type="danger" @click="deletesUser()">选中删除</el-button>

      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small"  @select='select'  :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="id" label="id" width="60">
      </el-table-column>
      <el-table-column sortable prop="name" label="名称" width="200">
      </el-table-column>
      <el-table-column sortable prop="sendType" label="发送方式" width="200">
      </el-table-column>
      <el-table-column sortable prop="orgTypePathKey" label="部门类型" width="200">
      </el-table-column>
      <el-table-column sortable prop="orgId" label="权限部门" width="200">
      </el-table-column>
        <el-table-column sortable prop="content" label="内容" width="500">
      </el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog title="编辑模板" :visible.sync="editFormVisible" width="30%" @click='closeEdit("edit")'>
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="发送方式" prop="sendType">
          <el-input size="small" v-model="editForm.sendType" auto-complete="off" placeholder="请选择发送方式"></el-input>
        </el-form-item>
          <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
        </el-form-item>
        <el-form-item label="权限部门" prop="orgId">
          <el-input size="small" v-model="editForm.orgId" auto-complete="off" placeholder="请输入权限部门"></el-input>
        </el-form-item>
          <el-form-item label="内容" prop="content">
          <el-input size="small" v-model="editForm.content" auto-complete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeEdit("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitFormEdit('editForm')">保存</el-button>
      </div>
    </el-dialog>
      <el-dialog title="添加模板" :visible.sync="addFormVisible" width="30%" @click='closeAdd("add")'>
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="发送方式" prop="sendType">
          <el-input size="small" v-model="editForm.sendType" auto-complete="off" placeholder="请选择发送方式"></el-input>
        </el-form-item>
          <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
        </el-form-item>
        <el-form-item label="权限部门" prop="orgId">
          <el-input size="small" v-model="editForm.orgId" auto-complete="off" placeholder="请输入权限部门"></el-input>
        </el-form-item>
          <el-form-item label="内容" prop="content">
          <el-input size="small" v-model="editForm.content" auto-complete="off" placeholder="请输入内容"></el-input>
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
import {
  newsTemplate,
  templateSave,
  templateDel,
  templateEdit
  } from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      addFormVisible:false,
      inputVal:'',
      editForm: {
        name:'',
        sendType:'',
        orgTypePathKey : '',
        orgId : '',
        content : '',
      },
      // rules表单验证
      rules: {
        // name: [
        //   { required: true, message: '请输入名称', trigger: 'blur' }
        // ],
        // sendType: [{ required: true, message: '请选择发送方式', trigger: 'blur' }],
        // orgTypePathKey: [
        //   { required: true, message: '请输入部门类型', trigger: 'blur' }
        // ],
        // orgId: [{ required: true, message: '请输入权限部门', trigger: 'blur' }],
        // content: [
        //   { required: true, message: '请输入内容', trigger: 'blur' }
        // ]
      },
     formInline: {
        pageNo: 1,
        pageSize: 10,
        id:null
      },
     // 选择数据
      selectdata: [],
      // 删除
      seletedata: [],
      listData: [], //用户数据
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
    // 获取公司列表
    getdata(parameter) {
      this.loading = true
      // 模拟数据开始
      let res = {
        code: 0,
        msg: null,
        count: 5,
        data: [
          {
            addUser: null,
            editUser: null,
            addTime: 1521062371000,
            editTime: 1526700200000,
            id: 2,
            name: 'XX分公司',
            sendType:'短信',
            orgTypePathKey:'kjj',
            orgId:'企业部门',
            content:'XXXXXXX'
          }
        ]
      }
      this.loading = false
      this.listData = res.data
      this.pageparm.currentPage = this.formInline.page
      this.pageparm.pageSize = this.formInline.limit
      this.pageparm.total = res.count
      // 模拟数据结束

      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      // deptList(parameter)
      //   .then(res => {
      //     this.loading = false
      //     if (res.success == false) {
      //       this.$message({
      //         type: 'info',
      //         message: res.msg
      //       })
      //     } else {
      //       this.listData = res.data
      //       // 分页赋值
      //       this.pageparm.currentPage = this.formInline.page
      //       this.pageparm.pageSize = this.formInline.limit
      //       this.pageparm.total = res.count
      //     }
      //   })
      //   .catch(err => {
      //     this.loading = false
      //     this.$message.error('菜单加载失败，请稍后再试！')
      //   })
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
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
        this.editForm.name = row.name
        this.editForm.sendType = row.sendType
        this.editForm.orgTypePathKey = row.orgTypePathKey
        this.editForm.orgId = row.orgId
        this.editForm.content = row.content
    },
      //显示编辑界面
    handleAdd: function(index, row) {
      this.addFormVisible = true
      this.editForm.name = ''
      this.editForm.sendType = ''
      this.editForm.orgTypePathKey = ''
      this.editForm.orgId = ''
      this.editForm.content = ''
    },
       // 关闭编辑、增加弹出框
    closeEdit(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } else if (dialog == 'perm') {
        this.dataAccessshow = false
      } else if (dialog == 'unit') {
        this.unitAccessshow = false
      }
    },
     closeAdd(dialog) {
      if (dialog == 'add') {
        this.addFormVisible = false
      } else if (dialog == 'perm') {
        this.dataAccessshow = false
      } else if (dialog == 'unit') {
        this.unitAccessshow = false
      }
    },
    // 编辑、增加页面保存方法
    submitFormEdit(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          templateEdit(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.statusCode === 200) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '公司保存成功！'
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
              this.$message.error('公司保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
       // 增加页面保存方法
    submitFormAdd(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          templateEdit(this.editForm)
            .then(res => {
              this.addFormVisible = false
              this.loading = false
              if (res.statusCode === 200) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '公司保存成功！'
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
              this.$message.error('公司保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
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
    // 删除公司
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deptDelete(row.deptId)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '公司已删除!'
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
              this.$message.error('公司删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
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

 
 