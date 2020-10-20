/**
 * 系统管理 部门管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/xtset/classManger' }">系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="inputVal" placeholder="输入ID" clearable @clear="refresh()"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
        <el-button size="mini" type="danger" @click="deletesUser()">选中删除</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" @select="select" :data="userData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
 <el-table-column align="center" type="selection" width="50">
      </el-table-column>
      <el-table-column sortable  prop="id" label="ID" width="80"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="name" label="菜单名称" width="130"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="icon" label="图标样式" width="150" show-overflow-tooltip>
      </el-table-column>
        <el-table-column sortable prop="pid" label="父级ID" width="150" show-overflow-tooltip>
      </el-table-column>
        <el-table-column sortable prop="remark" label="备注" width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="menuType" label="功能" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="hrefurl" label="跳转地址" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="comcode" label="菜单路径" width="250" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="hasChildren" label="子菜单" width="100" show-overflow-tooltip>
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
    <el-dialog title="编辑菜单信息" :visible.sync="editFormVisible" width="30%" @click='closeEdit("edit")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <!-- <el-form-item label="ID" prop="id">
          <el-input size="small" v-model="editForm.id" auto-complete="off" placeholder="请输入菜单名称"></el-input>
        </el-form-item> -->
        <el-form-item label="菜单名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="图标样式" prop="icon">
          <el-input size="small" v-model="editForm.icon" auto-complete="off" placeholder="请输入图标样式"></el-input>
        </el-form-item>
        <el-form-item label="父级ID" prop="pid">
          <el-input size="small" v-model="editForm.pid" auto-complete="off" placeholder="请输入父级ID"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="mark">
          <el-input size="small" v-model="editForm.remark" auto-complete="off" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="功能" prop="menuType">
          <el-select size="small" v-model="editForm.menuType" placeholder="请选择" class="userRole">
            <el-option v-for="type in menuTypes" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转地址" prop="hrefurl">
          <el-input size="small" v-model="editForm.hrefurl" auto-complete="off" placeholder="请输入跳转地址"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="comcode">
          <el-input type="textarea" :rows="2"  placeholder="请输入菜单路径" auto-complete="off" v-model="editForm.comcode"></el-input>
        </el-form-item> 
         <el-form-item label="子菜单" prop="menuType">
          <el-select size="small" v-model="editForm.hasChildren" placeholder="请选择" class="userRole">
            <el-option v-for="type in menus" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeEdit("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitFormEdit('editForm')">保存</el-button>
      </div>
    </el-dialog>

    <!-- 添加界面 -->
    <!-- auto-complete  关闭再打开填写的时候会有之前的提示 -->
    <el-dialog title="添加菜单信息" :visible.sync="addFormVisible" width="30%" @click='closeAdd("add")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="ID" prop="id">
          <el-input size="small" v-model="editForm.id" auto-complete="off" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="图标样式" prop="icon">
          <el-input size="small" v-model="editForm.icon" auto-complete="off" placeholder="请输入图标样式"></el-input>
        </el-form-item>
        <el-form-item label="父级ID" prop="pid">
          <el-input size="small" v-model="editForm.pid" auto-complete="off" placeholder="请输入父级ID"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input size="small" v-model="editForm.remark" auto-complete="off" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="功能" prop="menuType">
          <el-select size="small" v-model="editForm.menuType" placeholder="请选择" class="userRole">
            <el-option v-for="type in menuTypes" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跳转地址" prop="hrefurl">
          <el-input size="small" v-model="editForm.hrefurl" auto-complete="off" placeholder="请输入跳转地址"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="comcode">
          <el-input type="textarea" :rows="2"  placeholder="请输入菜单路径" auto-complete="off" v-model="editForm.comcode"></el-input>
        </el-form-item>        
         <el-form-item label="子菜单" prop="menuType">
          <el-select size="small" v-model="editForm.hasChildren" placeholder="请选择" class="userRole">
            <el-option v-for="type in menus" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
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
  menuManger,
  menuSearch,
  menuSave,
  menuDel,
  menuEdit
} from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      // nshow: true, //switch开启
      // fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      addFormVisible: false, //控制编辑页面显示与隐藏
      // 编辑与添加
      editForm: {
        id: '',
        name: '',
        icon:'',
        pid:'',
        remark:'',
        menuType:'',
        hrefurl:'',
        comcode:'',
        hasChildren:''
      },
      inputVal:'',
      // 组织类型
      menuTypes: [
        { key: '功能按钮', value: 0 },
        { key: '导航菜单', value: 1 },
        { key: '导航目录', value: 2 },
      ],
      menus:[
        {key:'无',value:0},
        {key:'有',value:1},
      ],
         // 选择数据
      selectdata: [],
      // 删除
      seletedata: [],
      // rules表单验证
      rules: {
        id: [{ required: true, message: '请输入ID', trigger: 'blur' }],
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        icon: [
          { required: true, message: '请输入图标样式', trigger: 'blur' }
        ],
        pid: [
          { required: true, message: '请输入父级ID', trigger: 'blur' },
           {
            pattern: /^[0-7]*$/g,
            required: true,
            message: '请输入正确的父级ID',
            trigger: 'blur'
          }
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],
        menuType: [{ required: true, message: '请选择功能类型', trigger: 'blur' }],
        hrefurl: [
          { required: true, message: '请输入跳转地址', trigger: 'blur' }
        ],
        comcode: [
          { required: true, message: '请输入菜单路径', trigger: 'blur' }
        ],
        hasChildren: [{ required: true, message: '请选择是否有子菜单', trigger: 'blur' }],
      
      },
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
      // 选中
      checkmenu: [],
      //参数role
      saveroleId: '',
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
      menuManger(this.formInline).then(res => {
        this.loading = false
        if (res.statusCode !== 200) {
          this.$message({
            type: 'info',
            message: res.message
          })
        } else {
          var datas=res.data.records
          this.userData = res.data.records
          if(datas){
            for(let i in datas){
              for(let j in datas[i].children){
                this.userData.push(datas[i].children[j])
              }  
            }
          }
          for(var i=0;i<this.userData.length;i++){
            if(this.userData[i].menuType===0){
              this.userData[i].menuType="功能按钮"
            }else if(this.userData[i].menuType===1){
              this.userData[i].menuType="导航菜单"
            }else{
              this.userData[i].menuType="导航目录"
            }
            if(this.userData[i].hasChildren==0){
              this.userData[i].hasChildren= '无'
            }else{
              this.userData[i].hasChildren='有'
            }
            // if(this.userData[i].active===1){
            //     console.log('111');
            //     this.userData[i].active='是'
            //     console.log(this.userData[i].active);
            //   }else if(this.userData[i].active===0){
            //     this.userData[i].active='否'
            //   }
          }
          
          // 分页赋值
          this.pageparm.currentPage = res.data.current
          this.pageparm.pageSize =res.data.size
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
        this.editForm.icon = row.icon
        this.editForm.pid = row.pid
        this.editForm.remark = row.remark
        if(row.menuType=="功能按钮"){
          this.editForm.menuType =0
        }else if(row.menuType=="导航菜单"){
          this.editForm.menuType =1
        }else{
           this.editForm.menuType =2
        }
        this.editForm.hrefurl = row.hrefurl
        this.editForm.comcode = row.comcode
        // this.editForm.hasChildren = row.hasChildren
        if(row.hasChildren=='无'){
          this.editForm.hasChildren=0
        }else{
          this.editForm.hasChildren=1
        }
    },
    handleAdd: function(index, row) {
      this.addFormVisible = true
       this.editForm.id = ''
        this.editForm.name = ''
        this.editForm.icon = ''
        this.editForm.pid = ''
        this.editForm.remark = ''
        this.editForm.menuType = ''
        this.editForm.hrefurl = ''
        this.editForm.comcode = ''
        this.editForm.hasChildren = ''
    },
    // 编辑、添加提交方法
    submitFormEdit(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          // 请求方法
          menuEdit(this.editForm)
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
    submitFormAdd(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          // 请求方法
          menuSave(this.editForm)
            .then(res => {
              this.editFormVisible = false
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
              this.editFormVisible = false
              this.loading = false
              this.$message.error('添加失败，请稍后再试！')
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
        this.addFormVisible = false
      } else if (dialog == 'perm') {
        this.dataAccessshow = false
      } else if (dialog == 'unit') {
        this.unitAccessshow = false
      }
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
          menuDel(this.seletedata)
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
    // 单个删除
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
          menuDel(this.seletedata)
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

 