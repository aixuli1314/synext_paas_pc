/**
 * 字典维护  字典类目
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">字典维护</el-breadcrumb-item>
      <el-breadcrumb-item>字典类目</el-breadcrumb-item>
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
      <el-table-column sortable  prop="id" label="ID" width="400"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="name" label="字典名称" width="200"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="pathkey" label="类别路径" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="orgTypePathKey" label="部门类型" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="active" label="是否有效" width="200" show-overflow-tooltip>
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
    <el-dialog title="编辑字典类别" :visible.sync="editFormVisible" width="30%" @click='closeEdit("edit")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="字典名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入字典名称"></el-input>
        </el-form-item>
        <el-form-item label="类别路径" prop="pathkey">
          <el-input size="small" v-model="editForm.pathkey" auto-complete="off" placeholder="请输入类别路径"></el-input>
        </el-form-item>
        <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
        </el-form-item>
          <el-form-item label="是否有效" prop="active">
          <el-select size="small" v-model="editForm.active" placeholder="请选择" class="userRole">
            <el-option v-for="type in orgActive" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeEdit("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitFormEdit('editForm')">保存</el-button>
      </div>
    </el-dialog>
 <!-- 添加界面 -->
    <el-dialog title="添加字典类别" :visible.sync="addFormVisible" width="30%" @click='closeAdd("add")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="字典名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入字典名称"></el-input>
        </el-form-item>
        <el-form-item label="类别路径" prop="pathkey">
          <el-input size="small" v-model="editForm.pathkey" auto-complete="off" placeholder="请输入类别路径"></el-input>
        </el-form-item>
        <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
        </el-form-item>
          <el-form-item label="是否有效" prop="active">
          <el-select size="small" v-model="editForm.active" placeholder="请选择" class="userRole">
            <el-option v-for="type in orgActive" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeAdd("add")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitFormAdd('add')">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// 导入请求方法
import {
  userList,
  userSave,
  userDelete,
  userPwd,
  userExpireToken,
  userFlashCache,
  userLock,
  UserDeptTree,
  UserDeptSave,
  UserDeptdeptTree,
  UserChangeDept,
  dicSort,
  dicSearch,
  dicSave,
  dicDel,
  dicEdit
} from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      addFormVisible:false, //控制添加页面的显示与隐藏
      inputVal:'',
      // 编辑与添加
      editForm: {
        id: '',
        name: '',
        pathkey: '',
        orgTypePathKey: '',
        active: '',
        // token: localStorage.getItem('logintoken')
      },
        //是否有效
      orgActive:[
        { key: '否', value: 0},
        { key: '是', value: 1 },
      ],  
       // 选择数据
      selectdata: [],
      // 删除用户
      seletedata: [],
      // rules表单验证
      rules: {
        name: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
       
        pathkey: [{ required: true, message: '请输入字典类型', trigger: 'blur' }],
        orgTypePathKey: [
          { required: true, message: '请输入部门类型', trigger: 'blur' }
        ],
        active: [
          { required: true, message: '请选择是否有效', trigger: 'blur' }
        ],
        
      },
      // 请求数据参数
        formInline: {
          current: 1,
          size: 10,
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
      dicSort(this.formInline).then(res => {
        this.loading = false
        if (res.statusCode == 200) {
          console.log(res);
          this.userData = res.data.records
          for(var i=0;i<this.userData.length;i++){
              if(this.userData[i].active===1){
                this.userData[i].active='是'
              }else if(this.userData[i].active===0){
                this.userData[i].active='否'
              }
          }
          // 分页赋值
          this.pageparm.currentPage = res.data.current
          this.pageparm.pageSize = res.data.size
          this.pageparm.total = res.data.total
          
        } else {
          this.$message({
            type: 'info',
            message: res.message
          })
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
      this.editForm.pathkey = row.pathkey
      this.editForm.orgTypePathKey = row.orgTypePathKey
      this.editForm.active = row.active
      if(row.active=='否'){
          this.editForm.active=0
      }else{
          this.editForm.active=1
      }
    },
      //显示添加界面
    handleAdd: function(index, row) {
      this.addFormVisible = true
      // this.editForm.id = ''
      this.editForm.name = ''
      this.editForm.pathkey = ''
      this.editForm.orgTypePathKey = ''
      // if(row.active=='否'){
      //     this.editForm.active=0
      // }else{
      //     this.editForm.active=1
      // }
    },
    // 编辑提交方法
    submitFormEdit(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          // 请求方法
          dicEdit(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.statusCode == 200) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '数据保存成功！'
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
              this.$message.error('保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 添加提交方法
    submitFormAdd(editData) {
          // 请求方法
          dicSave(this.editForm)
            .then(res => {
              this.addFormVisible = false
              this.loading = false
              if (res.statusCode == 200) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '数据保存成功！'
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
              this.$message.error('保存失败，请稍后再试！')
            })
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
       // 关闭增加弹出框
    closeAdd(dialog) {
      if (dialog == 'add') {
        this.editFormVisible = false
      } else if (dialog == 'perm') {
        this.dataAccessshow = false
      } else if (dialog == 'unit') {
        this.unitAccessshow = false
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
          dicDel(this.seletedata)
            .then(res => {
              console.log(res);
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
              console.log(err);
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
        // 删除用户
    deletesUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          dicDel(this.seletedata)
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

 