/**
 * 系统设置  角色管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/xtset/classManger' }">系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">

      <el-form-item label="搜索：">
        <el-input size="small" v-model="inputVal" placeholder="输入ID" clearable @clear="refresh"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search()" >搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
        <el-button size="mini" type="danger" @click="deletesUser()">选中删除</el-button>

      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small"  @select='select' :data="userData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="id" label="角色ID" width="200">
      </el-table-column>
      <el-table-column sortable prop="name" label="角色名称" width="150">
      </el-table-column>
      <el-table-column sortable prop="orgId" label="归属部门" width="200">
      </el-table-column>
      <el-table-column sortable prop="privateOrg" label="部门私有" width="100">
      </el-table-column>
      <!-- <el-table-column sortable prop="orgTypePathKey" label="部门类型" width="100">
      </el-table-column> -->
      <!-- <el-table-column sortable prop="pid" label="上级角色ID" width="300">
      </el-table-column> -->
      <el-table-column sortable prop="shareRole" label="角色共享" width="100">
      </el-table-column>
      <el-table-column sortable prop="roleOrgType" label="权限" width="100">
      </el-table-column>
      <el-table-column sortable prop="code" label="权限编码" width="150">
      </el-table-column>
      <el-table-column sortable prop="active" label="是否有效" width="107" >
      </el-table-column>
         <el-table-column sortable prop="remark" label="备注" width="250" >
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog title="编辑角色信息" :visible.sync="editFormVisible" width="30%" @click='closeEdit("edit")'>
      <el-form label-width="120px" :model="editForm" ref="editForm" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入角色名称"></el-input>
        </el-form-item>
         <el-form-item label="归属部门" prop="orgId">
          <el-select size="small" v-model="editForm.orgId" placeholder="请选择" class="userRole" >
            <el-option v-for="type in orgData" :label="type.name" :value="type.id" :key="type.id" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门私有" prop="privateOrg">
          <el-select size="small" v-model="editForm.privateOrg" placeholder="请选择" class="userRole">
            <el-option v-for="type in privateOrgs" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="上级角色ID" prop="pid">
          <el-input size="small" v-model="editForm.pid" auto-complete="off" placeholder="请输入上级角色ID"></el-input>
        </el-form-item> -->
        <el-form-item label="角色共享" prop="shareRole">
          <el-select size="small" v-model="editForm.shareRole" placeholder="请选择" class="userRole">
            <el-option v-for="type in shareRoles" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限" prop="roleOrgType">
           <el-select size="small" v-model="editForm.roleOrgType" placeholder="请选择" class="userRole">
            <el-option v-for="type in roleOrgTypes" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限编码" prop="code">
          <el-input size="small" v-model="editForm.code" auto-complete="off" placeholder="请输入权限编码"></el-input>
        </el-form-item>
         <el-form-item label="是否有效" prop="active">
          <el-select size="small" v-model="editForm.active" placeholder="请选择" class="userRole">
            <el-option v-for="type in activeType" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input size="small" v-model="editForm.remark" auto-complete="off" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限" prop="permissionIds">
          <el-checkbox-group v-model="checkedMenu" @change="checkeds()">
          <el-checkbox v-for="menu in allmenu" :label="menu.id" :key="menu.id ">{{menu.name}}</el-checkbox>
        </el-checkbox-group>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeEdit("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitFormEdit('editForm')">保存</el-button>
      </div>
    </el-dialog>
        <!-- 添加界面 -->
    <el-dialog title="添加角色信息" :visible.sync="addFormVisible" width="30%" @click='closeAdd("add")'>
      <el-form label-width="120px" :model="editForm" ref="editForm" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="归属部门" prop="orgId">
          <el-select size="small" v-model="valueOrg" placeholder="请选择" class="userRole">
            <el-option v-for="type in orgData" :label="type.name" :value="type.id" :key="type.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门私有" prop="privateOrg">
          <el-select size="small" v-model="editForm.privateOrg" placeholder="请选择" class="userRole">
            <el-option v-for="type in privateOrgs" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="上级角色ID" prop="pid">
          <el-input size="small" v-model="editForm.pid" auto-complete="off" placeholder="请输入上级角色ID"></el-input>
        </el-form-item> -->
        <el-form-item label="角色共享" prop="shareRole">
          <el-select size="small" v-model="editForm.shareRole" placeholder="请选择" class="userRole">
            <el-option v-for="type in shareRoles" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限" prop="roleOrgType">
           <el-select size="small" v-model="editForm.roleOrgType" placeholder="请选择" class="userRole">
            <el-option v-for="type in roleOrgTypes" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限编码" prop="code">
          <el-input size="small" v-model="editForm.code" auto-complete="off" placeholder="请输入权限编码"></el-input>
        </el-form-item>
         <el-form-item label="是否有效" prop="active">
          <el-select size="small" v-model="editForm.active" placeholder="请选择" class="userRole">
            <el-option v-for="type in activeType" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input size="small" v-model="editForm.remark" auto-complete="off" placeholder="请输入备注"></el-input>
        </el-form-item>
         <el-form-item label="菜单权限" prop="permissionIds">
          <el-checkbox-group v-model="checkedMenu" @change="checkeds()">
          <el-checkbox v-for="menu in allmenu" :label="menu.id" :key="menu.id ">{{menu.name}}</el-checkbox>
        </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeAdd("add")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitFormAdd('addForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  roleList,
  roleSave,
  roleDelete,
  rolePwd,
  RoleRightTree,
  RoleRightSave,
  roles,
  rolesSearch,
  rolesSave,
  rolesDel,
  rolesEdit,
  menus,
  classMangerAll
} from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      addFormVisible: false, //控制添加页面显示与隐藏
      allmenu:[],
      checkedMenu: [],
      orgData: [],
      valueOrg : [],
      inputVal:'',
      editForm: {
        id : '',
        name : '',
        orgId : '',
        privateOrg : '',
        // orgTypePathKey : '',
        shareRole : '',
        roleOrgType : '',
        code : '',
        active:'',
        remark:'',
        permissionIds:[],
        // token: localStorage.getItem('logintoken')
        // pid:''
      },
      // 角色共享
      shareRoles: [
        { key: '否', value: 0 },
        { key: '是', value: 1 },
      ],
      // 权限
     　roleOrgTypes: [
        { key: '自己的数据', value: 0 },
        { key: '所在部门', value: 1 },
        { key: '所在部门及子部门数据', value: 2 },
        { key: '自定义部门数据', value: 3 },
        { key: '全部权限', value: 4 },
      ],
      // 部门私有
      privateOrgs: [
        { key: '否', value: 0 },
        { key: '是', value: 1 },
      ],
      // 是否有效
      activeType: [
        { key: '否', value: 0 },
        { key: '是', value: 1 }
      ],
      

      // rules 表单验证
      rules: {
        // id: [
        //   { required: true, message: '请输入角色ID', trigger: 'blur' }
        // ],
        // name: [
        //   { required: true, message: '请输入角色名称', trigger: 'blur' }
        // ],
        // createTime: [
        //   { required: true, message: '请输入创建时间', trigger: 'blur' }
        // ],
        // orgId: [
        //   { required: true, message: '请输入归属部门', trigger: 'blur' }
        // ],
        // privateOrg: [
        //   { required: true, message: '请选择部门私有', trigger: 'blur' }
        // ],
        // orgTypePathKey: [
        //   { required: true, message: '请输入部门类型', trigger: 'blur' }
        // ],
        // updateTime: [
        //   { required: true, message: '请输入更新时间', trigger: 'blur' }
        // ],
        // // pid: [
        // //   { required: true, message: '请输入上级角色ID', trigger: 'blur' }
        // // ],
        // remark: [
        //   { required: true, message: '请输入备注', trigger: 'blur' }
        // ],
        // shareRole: [
        //   { required: true, message: '请选择角色共享', trigger: 'blur' }
        // ],
        // updateUserId: [
        //   { required: true, message: '请输入更新用户ID', trigger: 'blur' }
        // ],
        // roleOrgType: [
        //   { required: true, message: '请选择权限', trigger: 'blur' }
        // ],
        // code: [
        //   { required: true, message: '请输入权限编码', trigger: 'blur' }
        // ],
        

      },
        // 请求数据参数
      formInline: {
          current:1,
          size:10,
          id:null
      },

      // 选择数据
      selectdata: [],
      // 删除用户
      seletedata: [],
      userData: [], //用户数据
      RoleRightProps: {
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
    this.getMenus()
    this.getOrgId()
   
  },

  /**
   * 里面的方法只有被调用才会执行
   */

  methods: {
    // 获取角色列表
    getdata(parameter) {
      this.loading = true
      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      roles(this.formInline)
        .then(res => {
          this.loading = false
          if (res.statusCode !== 200) {
            this.$message({
              type: 'info',
              message: res.message
            })
          } else {
            console.log(res.data.records);
            this.userData = res.data.records
            for(var i=0;i<this.userData.length;i++){
              // 权限
              if(this.userData[i].roleOrgType==0){
                this.userData[i].roleOrgType='自己的数据'
              }else if(this.userData[i].roleOrgType==1){
                this.userData[i].roleOrgType='所在部门'
              }else if(this.userData[i].roleOrgType==2){
                this.userData[i].roleOrgType='所在部门及子部门数据'
              }else if(this.userData[i].roleOrgType==3){
                this.userData[i].roleOrgType='自定义部门数据'
              }else if(this.userData[i].roleOrgType==4){
                this.userData[i].roleOrgType='全部权限'
              }
              // 角色是否共享
              if(this.userData[i].shareRole==0){
                this.userData[i].shareRole='否'
              }else{
                this.userData[i].shareRole='是'
              }
              // 部门私有
              if(this.userData[i].privateOrg==0){
                this.userData[i].privateOrg='否'
              }else{
                this.userData[i].privateOrg='是'
              }
              // 是否有效
              if(this.userData[i].active===0){
              this.userData[i].active="否"
              }else{
              this.userData[i].active="是"
            }
              let arr=this.orgData.filter(item =>item.id == this.userData[i].orgId)
              if(arr != ''){
                this.userData[i].orgId=arr[0].name
              }
            }
            // 分页赋值
            this.pageparm.currentPage = res.data.current
            this.pageparm.pageSize = res.data.size
            this.pageparm.total = res.data.total
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('获取角色列表失败，请稍后再试！')
        })
    },
    getMenus(){
      menus()
      .then(res => {
        // console.log(res);
        if (res.statusCode==200) {
          let m = res.data
          for(var i=0;i<m.length;i++){
            var info={}
            info.id=m[i].id
            info.name=m[i].name
            this.allmenu.push(info)
          }
        } else {
          this.$message.error(res.message)
          return false
        }
      })
      .catch(err => {
        this.$message.error('菜单权限加载失败，请稍后再试！')
      })
    },
    getOrgId(){
      classMangerAll().then(res => {
        this.loading = false
        if (res.statusCode==200) {
          let s = res.data
          for(var j=0;j<s.length;j++){
            var orgInfo={}
            orgInfo.id=s[j].id
            orgInfo.name=s[j].name
            this.orgData.push(orgInfo)
          }
          // console.log(this.orgData);
        } else {
          this.$message.error(res.message)
          return false
        }
      })
    },
    //返回复选框选择的id
    checkeds(){
      this.editForm.permissionIds=this.checkedMenu
      console.log(this.checkedMenu);
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.current = parm.currentPage
      this.formInline.size = parm.pageSize
      this.getdata(this.formInline)
    },
    // 搜索事件
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
      this.editForm.permissionIds = this.checkedMenu
        this.editForm.id = row.id
        this.editForm.name = row.name
        this.editForm.createTime = row.createTime
        this.editForm.orgId = row.orgId
        this.editForm.privateOrg = row.privateOrg
        this.editForm.orgTypePathKey = row.orgTypePathKey
        this.editForm.updateTime = row.updateTime
        this.editForm.remark = row.remark
        this.editForm.shareRole = row.shareRole
        this.editForm.updateUserId = row.updateUserId
        this.editForm.roleOrgType = row.roleOrgType
        this.editForm.code = row.code
        // 角色共享
        if(row.shareRole=='否'){
          this.editForm.shareRole=0
        }else{
          this.editForm.shareRole=1
        }
         //部门私有
        if(row.privateOrg=='否'){
          this.editForm.privateOrg=0
        }else{
          this.editForm.privateOrg=1
        }
        // 权限
        if(row.roleOrgType=='自己的数据'){
          this.editForm.roleOrgType=0
        }else if(row.roleOrgType=='所在部门'){
          this.editForm.roleOrgType=1
        }else if(row.roleOrgType=='所在部门及子部门数据'){
          this.editForm.roleOrgType=2
        }else if(row.roleOrgType=='自定义部门数据'){
          this.editForm.roleOrgType=3
        }else if(row.roleOrgType=='全部权限'){
          this.editForm.roleOrgType=4
        }
        // 是否有效
         if(row.active=="否"){
          this.editForm.active=0
        }else{
          this.editForm.active=1
        } 
    },
    handleAdd: function(index, row) {
      this.addFormVisible = true
        this.editForm.id = ''
        this.editForm.name = ''
        this.editForm.orgId = ''
        this.editForm.privateOrg = ''
        this.editForm.orgTypePathKey = ''
        this.editForm.remark = ''
        this.editForm.shareRole = ''
        this.editForm.roleOrgType = ''
        this.editForm.code = ''
        this.editForm.active=''
    },
    // 编辑页面保存方法
    submitFormEdit(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          rolesEdit(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.statusCode == 200) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '角色保存成功！'
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
              this.$message.error('角色保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
      // 增加页面保存方法
    submitFormAdd(editData) {
          rolesSave(this.editForm)
            .then(res => {
              this.addFormVisible = false
              this.loading = false
              if (res.statusCode ==200) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '角色保存成功！'
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
              this.$message.error('角色保存失败，请稍后再试！')
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
    // 删除多个角色
    deletesUser() {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          rolesDel(this.seletedata)
            .then(res => {
              if (res.statusCode==200) {
                this.$message({
                  type: 'success',
                  message: '角色已删除！'
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
              this.$message.error('角色删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
        // 删除角色
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
          rolesDel(this.seletedata)
            .then(res => {
              if (res.statusCode==200) {
                this.$message({
                  type: 'success',
                  message: '角色已删除！'
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
              this.$message.error('角色删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 数据权限
    menuAccess: function(index, row) {
      this.menuAccessshow = true
      this.saveroleId = row.roleId
      RoleRightTree(row.roleId)
        .then(res => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '获取权限成功'
            })
            this.changemenu(res.data.data)
            this.RoleRight = this.changeArr(res.data.data)
          } else {
            this.$message({
              type: 'info',
              message: res.data.msg
            })
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('获取权限失败，请稍后再试！')
        })
    },
    // 选中菜单
    changemenu(arr) {
      let change = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
          change.push(arr[i].id)
        }
      }
      this.checkmenu = change
    },
    // tree 递归
    changeArr(list) {
      var temptree = [],
        tree = [],
        items = []
      for (var i in list) {
        if (!temptree[list[i].id]) {
          var trow = {
            id: list[i].id,
            pId: list[i].pId,
            name: list[i].name,
            open: list[i].open,
            checked: list[i].checked,
            children: []
          }
          temptree[list[i].id] = trow
          items.push(trow)
        }
        if (list[i].uid > 0) {
          temptree[list[i].id]['children'].push({
            id: list[i].id,
            pId: list[i].pId,
            name: list[i].name,
            open: list[i].open,
            checked: list[i].checked,
            children: []
          })
        }
      }

      for (var j in items) {
        if (temptree[items[j].pId]) {
          temptree[items[j].pId]['children'].push(temptree[items[j].id])
        } else {
          tree.push(temptree[items[j].id])
        }
      }
      temptree = null
      items = null
      return tree
    },
    // 菜单权限-保存
    menuPermSave() {
      let parm = {
        roleId: this.saveroleId,
        moduleIds: ''
      }
      let node = this.$refs.tree.getCheckedNodes()
      let moduleIds = []
      if (node.length != 0) {
        for (let i = 0; i < node.length; i++) {
          moduleIds.push(node[i].id)
        }
        parm.moduleIds = JSON.stringify(moduleIds)
      }
      RoleRightSave(parm)
        .then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '权限保存成功'
            })
            this.menuAccessshow = false
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
          this.$message.error('权限保存失败，请稍后再试！')
        })
    },
    // 关闭编辑、增加弹出框
    closeEdit(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } else if (dialog == 'perm') {
        this.menuAccessshow = false
      }
    },
     closeAdd(dialog) {
      if (dialog == 'add') {
        this.addFormVisible = false
      } else if (dialog == 'perm') {
        this.menuAccessshow = false
      }
    }
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

 