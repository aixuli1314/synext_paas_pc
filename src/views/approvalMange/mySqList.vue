/**
 * 系统管理 部门管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">审批管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的申请</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="inputVal" placeholder="输入ID" clearable @clear="refresh"></el-input>
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
      <el-table-column sortable  prop="id" label="ID" width="160"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="applyFilepath" label="申报材料" width="200"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="applyType" label="申报类型" width="200" show-overflow-tooltip>
      </el-table-column>
        <el-table-column sortable prop="businessType " label="businessType " width="200" show-overflow-tooltip>
      </el-table-column>
        <el-table-column sortable prop="reason" label="说明" width="200" show-overflow-tooltip >
      </el-table-column>
      <el-table-column  prop="statusName" label="审核状态" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="170">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
<!-- 添加 -->
      <el-dialog title="添加部门信息" :visible.sync="addFormVisible" width="30%" @click='closeAdd("add")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
         
        <el-form-item label="部门名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        
        <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
        </el-form-item>
        <!-- <el-form-item label="组织类型" prop="orgType">
           <el-select size="small" v-model="editForm.orgType" placeholder="请选择" class="userRole">
            <el-option v-for="type in orgType" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="部门路径" prop="comcode">
          <el-input size="small" v-model="editForm.comcode" auto-complete="off" placeholder="请输入部门路径"></el-input>
        </el-form-item>
        <el-form-item label="上级ID" prop="pid">
          <el-input size="small" v-model="editForm.pid" auto-complete="off" placeholder="请输入上级部门ID"></el-input>
        </el-form-item>
         <!-- <el-form-item label="是否有效" prop="active">
          <el-select size="small" v-model="editForm.active" placeholder="请选择" class="userRole">
            <el-option v-for="type in orgActive" :label="type.key" :value="type.value" :key="type.value" ></el-option>
          </el-select>
        </el-form-item> -->
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
  mySqs
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
        applyDate:'',
        applyDate:'',
        applyType:'',
        businessType :'',
        procInstId:'',
        reason:'',
        status:'',
        userId:''
      },
      // 组织类型
      // orgType: [
      //   { key: '部门' , value: 0 },
      //   { key: '注册企业', value: 1 },
      //   { key: '虚拟部门' , value: 2 },
      // ],
      // 是否有效
      // orgActive:[
      //   { key: '否', value: 0},
      //   { key: '是', value: 1 },
      // ],
      
      // rules表单验证
      rules: {
        // name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
        // orgTypePathKey: [{ required: true, message: '请输入部门类型', trigger: 'blur' }],
        // orgType: [
        //   { required: true, message: '请输入组织类型', trigger: 'blur' }
        // ],
        // comcode: [{ required: true, message: '请输入部门路径', trigger: 'blur' }],
        // pid: [
        //   { required: true, message: '请输入上级ID', trigger: 'blur' }
        // ],
        // remark: [
        //   { required: true, message: '请输入备注', trigger: 'blur' }
        // ],
        //  active: [
        //   { required: true, message: '请选择是否有效', trigger: 'blur' }
        // ],
      
      },
      // 选择数据
      selectdata: [],
      // 删除
      seletedata: [],
      // 请求数据参数
      formInline: {
        current: 1,
        size: 10,
        id:null,
        state:1
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
      mySqs().then(res => {
        this.loading = false
        if (res.statusCode !== 200) {
          this.$message({
            type: 'info',
            message: res.message
          })
        } else {
          console.log(res);
          this.userData = res.data
          // for(var i=0;i<this.userData.length;i++){
          //     if(this.userData[i].active===1){
          //       this.userData[i].active='是'
          //     }else if(this.userData[i].active===0){
          //       this.userData[i].active='否'
          //     }
          //     if(this.userData[i].orgType == 0){
          //       this.userData[i].orgType ="部门"
          //     }else if(this.userData[i].orgType == 1){
          //        this.userData[i].orgType ="注册企业"
          //     }else{
          //       this.userData[i].orgType ="虚拟部门"
          //     }
          // }
          // 分页赋值
          this.pageparm.currentPage = res.page.current
          this.pageparm.pageSize = res.page.size
          this.pageparm.total = res.page.total
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
    // 显示添加页面
    handleAdd: function(index, row) {
      // this.addFormVisible = true
      //   // this.editForm.id = ''
      //   this.editForm.name = ''
      //   this.editForm.orgTypePathKey = ''
      //   this.editForm.orgType = ''
      //   this.editForm.comcode = ''
      //   this.editForm.pid = ''
      //   this.editForm.remark = ''
      this.$router.push(
    {
        path:'/folowPic'
    }
)
      
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

    // 关闭增加弹出框
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

 