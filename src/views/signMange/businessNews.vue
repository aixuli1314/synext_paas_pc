/**
 *  注册管理 企业信息
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">注册管理</el-breadcrumb-item>
      <el-breadcrumb-item>企业信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="inputVal" placeholder="输入ID" clearable @clear="refresh"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
        <el-button size="mini" type="danger" @click="deletesUser()">选中删除</el-button>

      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" @select='select' :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
       <el-table-column sortable prop="id" label="ID" width="150">
      </el-table-column>
      <el-table-column sortable prop="contactPersonName" label="联系人姓名" width="110">
      </el-table-column>
      <el-table-column sortable prop="contactEmail" label="联系邮箱" width="130">
      </el-table-column>
      <el-table-column sortable prop="name" label="企业名称" width="100">
      </el-table-column>
      <el-table-column sortable prop="contactAddress" label="联系地址" width="100">
      </el-table-column>
      <el-table-column sortable prop="orgTypePathKey" label="部门类型" width="100">
      </el-table-column>
      <el-table-column sortable prop="contactPhone" label="联系电话" width="110">
      </el-table-column>
      <el-table-column sortable prop="bType" label="营业执照类型" width="120">
      </el-table-column>
      <el-table-column sortable prop="bAddress" label="营业执照注册地" width="130">
      </el-table-column>
      <el-table-column sortable prop="bLegalPerson" label="注册法人" width="100">
      </el-table-column>
      <el-table-column sortable prop="bCapital" label="注册资本" width="100">
      </el-table-column>
      <el-table-column sortable prop="bCreateTime" label="成立日期" width="100">
      </el-table-column>
      <el-table-column sortable prop="bTermStart" label="营业期限开始时间" width="150">
      </el-table-column>
      <el-table-column sortable prop="bTermEnd" label="营业期限开始时间" width="150">
      </el-table-column>
      <el-table-column sortable prop="bScope" label="经营范围" width="100">
      </el-table-column>
      <el-table-column sortable prop="active" label="是否有效" width="100">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="170">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog title="编辑企业信息" :visible.sync="editFormVisible" width="30%" @click='closeEdit("edit")'>
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="联系人姓名" prop="contactPersonName">
          <el-input size="small" v-model="editForm.contactPersonName" auto-complete="off" placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="contactEmail">
          <el-input size="small" v-model="editForm.contactEmail" auto-complete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
          <el-form-item label="企业名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" prop="contactAddress">
          <el-input size="small" v-model="editForm.contactAddress" auto-complete="off" placeholder="请输入联系地址"></el-input>
        </el-form-item>
          <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input size="small" v-model="editForm.contactPhone" auto-complete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="营业执照类型" prop="bType">
          <el-select size="small" v-model="editForm.bType" placeholder="请选择" class="userRole">
            <el-option v-for="type in btypes" :label="type.key" :value="type.key" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="营业执照注册地" prop="bAddress">
          <el-input size="small" v-model="editForm.bAddress" auto-complete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="注册法人" prop="blegalPerson">
          <el-input size="small" v-model="editForm.bLegalPerson" auto-complete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="注册资本" prop="bCapital">
          <el-input size="small" v-model="editForm.bCapital" auto-complete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="成立日期" prop="bCreateTime">
          <el-date-picker v-model="editForm.bCreateTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">  </el-date-picker>
        </el-form-item>
        <el-form-item label="营业期限开始" prop="bTermStart">
          <el-date-picker v-model="editForm.bTermStart" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">  </el-date-picker>
        </el-form-item>
        <el-form-item label="营业期限结束" prop="bTermEnd">
          <el-date-picker v-model="editForm.bTermEnd" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">  </el-date-picker>
        </el-form-item>
        <el-form-item label="经营范围" prop="bScope">
          <el-input size="small" v-model="editForm.bScope" auto-complete="off" placeholder="请输入联系电话"></el-input>
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
    <!-- 添加页面 -->
    <el-dialog title="添加企业信息" :visible.sync="addFormVisible" width="30%" @click='closeAdd("add")'>
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="联系人姓名" prop="contactPersonName">
          <el-input size="small" v-model="editForm.contactPersonName" auto-complete="off" placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="contactEmail">
          <el-input size="small" v-model="editForm.contactEmail" auto-complete="off" placeholder="请输入邮箱"></el-input>
        </el-form-item>
          <el-form-item label="企业名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" prop="contactAddress">
          <el-input size="small" v-model="editForm.contactAddress" auto-complete="off" placeholder="请输入联系地址"></el-input>
        </el-form-item>
          <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="contactPhone">
          <el-input size="small" v-model="editForm.contactPhone" auto-complete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="营业执照类型" prop="bType">
          <el-select size="small" v-model="editForm.bType" placeholder="请选择" class="userRole">
            <el-option v-for="type in btypes" :label="type.key" :value="type.key" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="营业执照注册地" prop="bAddress">
          <el-input size="small" v-model="editForm.bAddress" auto-complete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="注册法人" prop="bLegalPerson">
          <el-input size="small" v-model="editForm.bLegalPerson" auto-complete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="注册资本" prop="bCapital">
          <el-input size="small" v-model="editForm.bCapital" auto-complete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="成立日期" prop="bCreateTime">
          <el-date-picker v-model="editForm.bCreateTime" type="date" placeholder="选择日期"  format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">  </el-date-picker>
        </el-form-item>
        <el-form-item label="营业期限开始" prop="bTermStart">
          <el-date-picker v-model="editForm.bTermStart" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">  </el-date-picker>
        </el-form-item>
        <el-form-item label="营业期限结束" prop="bTermEnd">
          <!-- <el-date-picker v-model="value2" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker> -->
          <el-date-picker v-model="editForm.bTermEnd" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="经营范围" prop="bScope">
          <el-input size="small" v-model="editForm.bScope" auto-complete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="是否有效" prop="active">
          <el-select size="small" v-model="editForm.active" placeholder="请选择" class="userRole">
            <el-option v-for="type in orgActive" :label="type.key" :value="type.value" :key="type.value"></el-option>
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
import { orgNews, orgSave,orgDel,orgEdit,orgSearch} from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏,
      addFormVisible: false, //控制编辑页面显示与隐藏,
      inputVal:'',
      editForm: {
        id:'',
        contactPersonName:'',
        contactEmail:'',
        name:'',
        contactAddress:'',
        orgTypePathKey:'',
        contactPhone:'',
        bType:'',
        bAddress:'',
        bLegalPerson:'',
        bCapital:'',
        bCreateTime:'',
        bTermStart:'',
        bTermEnd:'',
        bScope:''
      },
          //是否有效
      orgActive:[
        { key: '否', value: 0},
        { key: '是', value: 1 },
      ],
      btypes:[
        { key: '个体户', value: 0},
        { key: '个人独资企业', value: 1 },
        { key: '合伙企业', value: 2},
        { key: '有限公司', value: 3 },
        { key: '股份公司', value: 4},
      ],
      // rules表单验证
      rules: {
        // contactPersonName: [
        //   { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        // ],
        // contactEmail: [{ required: true, message: '请输入联系邮箱', trigger: 'blur' }],
        // name: [
        //   { required: true, message: '请输入企业名称', trigger: 'blur' }
        // ],
        // contactAddress: [{ required: true, message: '请输入联系地址', trigger: 'blur' }],
        // orgTypePathKey: [
        //   { required: true, message: '请输入部门类型', trigger: 'blur' }
        // ],
        // contactAddress: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
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
      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      orgNews(this.formInline)
        .then(res => {
          this.loading = false
          if (res.statusCode != 200) {
            this.$message({
              type: 'info',
              message: res.message
            })
          } else {
            // console.log(res);
            this.listData = res.data.records
            for(var i=0;i<this.listData.length;i++){
              if(this.listData[i].active===1){
                this.listData[i].active='是'
              }else if(this.listData[i].active===0){
                this.listData[i].active='否'
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
          this.$message.error('菜单加载失败，请稍后再试！')
        })
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
      this.editForm.id = row.id
      this.editForm.contactPersonName = row.contactPersonName
      this.editForm.contactEmail = row.contactEmail
      this.editForm.name = row.name
      this.editForm.contactAddress = row.contactAddress
      this.editForm.orgTypePathKey = row.orgTypePathKey
      this.editForm.contactPhone = row.contactPhone
      this.editForm.bType = row.bType,
      this.editForm.bAddress = row.bAddress,
      this.editForm.bLegalPerson = row.bLegalPerson,
      this.editForm.bCapital = row.bCapital,
      this.editForm.bCreateTime = row.bCreateTime,
      this.editForm.bTermStart = row.bTermStart,
      this.editForm.bTermEnd = row.bTermEnd,
      this.editForm.bScope = row.bScope
      if(row.active=='否'){
          this.editForm.active=0
        }else{
          this.editForm.active=1
      }
      // if(row.btype=='个体户'){
      //     this.editForm.btype=0
      //   }else if(row.btype=='个人独资企业'){
      //     this.editForm.active=1
      //   }else if(row.btype=='合伙企业'){
      //     this.editForm.active=2
      //   }else if(row.btype=='有限公司'){
      //     this.editForm.active=3
      //   }else if(row.btype=='股份公司'){
      //     this.editForm.active=4
      //   }
        
    },
       //显示添加界面
    handleAdd: function(index, row) {
      this.addFormVisible = true
      this.editForm.contactPersonName = ''
      this.editForm.contactEmail = ''
      this.editForm.name = ''
      this.editForm.contactAddress = ''
      this.editForm.orgTypePathKey = ''
      this.editForm.contactPhone = ''
      this.editForm.bType = '',
      this.editForm.bAddress = '',
      this.editForm.bLegalPerson = '',
      this.editForm.bCapital = '',
      this.editForm.bCreateTime = '',
      this.editForm.bTermStart = '',
      this.editForm.bTermEnd = '',
      this.editForm.bScope = ''
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
    // 编辑、增加页面保存方法
    submitFormEdit(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          orgEdit(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.statusCode == 200) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '编辑成功！'
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
              this.$message.error('编辑失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 添加
    submitFormAdd(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          orgSave(this.editForm)
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
          orgDel(this.seletedata)
            .then(res => {
              if (res.statusCode == 200) {
                this.$message({
                  type: 'success',
                  message: '已删除!'
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
              this.$message.error('删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
      // 删除多个
    deletesUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          orgDel(this.seletedata)
            .then(res => {
              if (res.statusCode == 200) {
                this.$message({
                  type: 'success',
                  message: '已删除!'
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
              this.$message.error('删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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

 
 