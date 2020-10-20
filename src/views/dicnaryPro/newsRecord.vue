/**
 * 字典维护  消息记录
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">字典维护</el-breadcrumb-item>
      <el-breadcrumb-item>消息记录</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="inputVal" placeholder="输入ID" clearable @clear="refresh"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>

      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="userData"  highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
     
      <el-table-column sortable prop="id" label="ID" width="150">
      </el-table-column>
      <el-table-column sortable prop="fromUserId" label="发送人" width="90">
      </el-table-column>
      <el-table-column sortable prop="businessId" label="业务记录Id" width="105">
      </el-table-column>
      <el-table-column sortable prop="errorMessage" label="错误原因" width="100">
      </el-table-column>
      <el-table-column sortable prop="readTime" label="读取时间" width="100">
      </el-table-column>
      <el-table-column sortable prop="orgTypePathKey" label="部门类型" width="100">
      </el-table-column>
      <el-table-column sortable prop="templateId" label="模板Id" width="100">
      </el-table-column>
      <el-table-column sortable prop="toUserId" label="接收人Id" width="100">
      </el-table-column>
      <el-table-column sortable prop="content" label="内容" width="100">
      </el-table-column>
      <el-table-column sortable prop="sendTime" label="发送时间" width="100">
      </el-table-column>
      <el-table-column sortable prop="errorTime" label="错误时间" width="100">
      </el-table-column>
      <el-table-column sortable prop="successTime" label="成功时间" width="100">
      </el-table-column>
      <el-table-column sortable prop="sendType" label="发送方式" width="95">
      </el-table-column>
      <el-table-column sortable prop="businessModule" label="业务模块" width="100">
      </el-table-column>
      <el-table-column sortable prop="status" label="消息状态" >
      </el-table-column>
      <el-table-column sortable prop="active" label="是否有效" width="100" >
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog title="添加" :visible.sync="editFormVisible" width="30%" @click='closeEdit("edit")'>
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="发送人" prop="fromUserId">
          <el-input size="small" v-model="editForm.fromUserId" auto-complete="off" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="业务记录Id" prop="businessId">
          <el-input size="small" v-model="editForm.businessId" auto-complete="off" placeholder="请输入业务记录Id"></el-input>
        </el-form-item>
        <el-form-item label="错误原因" prop="errorMessage">
          <el-input size="small" v-model="editForm.errorMessage" auto-complete="off" placeholder="请输入错误原因"></el-input>
        </el-form-item>
        <el-form-item label="读取时间" prop="readTime">
          <el-input size="small" v-model="editForm.readTime" auto-complete="off" placeholder="请输入读取时间"></el-input>
        </el-form-item>
        <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
        </el-form-item>
        <el-form-item label="模板Id" prop="templateId">
          <el-input size="small" v-model="editForm.templateId" auto-complete="off" placeholder="请输入模板Id"></el-input>
        </el-form-item>
        <el-form-item label="接收人Id" prop="toUserId">
          <el-input size="small" v-model="editForm.toUserId" auto-complete="off" placeholder="请输入接收人Id"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input size="small" v-model="editForm.content" auto-complete="off" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="发送时间" prop="sendTime">
          <el-input size="small" v-model="editForm.sendTime" auto-complete="off" placeholder="请输入发送时间"></el-input>
        </el-form-item>
        <el-form-item label="错误时间" prop="errorTime">
          <el-input size="small" v-model="editForm.errorTime" auto-complete="off" placeholder="请输入错误时间"></el-input>
        </el-form-item>
        <el-form-item label="成功时间" prop="successTime">
          <el-input size="small" v-model="editForm.successTime" auto-complete="off" placeholder="请输入成功时间"></el-input>
        </el-form-item>
        <el-form-item label="发送方式" prop="sendType">
          <el-select size="small" v-model="editForm.sendType" placeholder="请选择" class="userRole">
            <el-option v-for="type in sendTypes" :label="type.key" :value="type.value" :key="type.value" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务模块" prop="businessModule">
          <el-input size="small" v-model="editForm.businessModule" auto-complete="off" placeholder="请输入业务模块"></el-input>
        </el-form-item>
        <el-form-item label="消息状态" prop="status">
          <el-select size="small" v-model="editForm.status" placeholder="请选择" class="userRole">
            <el-option v-for="type in statuss" :label="type.key" :value="type.value" :key="type.value" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有效" prop="active">
          <el-select size="small" v-model="editForm.active" placeholder="请选择" class="userRole">
            <el-option v-for="type in orgActive" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeEdit("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { newsRecord, recordSave } from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      inputVal:'',
      editForm: {
        id: '',
        fromUserId:'',
        businessId:'',
        errorMessage:"",
        readTime:'',
        orgTypePathKey:'',
        templateId:'',
        toUserId:'',
        content:'',
        sendTime:'',
        errorTime:'',
        successTime:'',
        sendType:'',
        businessModule:'',
        status:''
      },
    // 发送方式
      sendTypes: [
        { key: '站内信' , value: 0 },
        { key: '邮件', value: 1 },
        { key: '短信' , value: 2 },
        { key: '微信' , value: 3 },
      ],
      // 消息状态
      statuss: [
        { key: '已创建' , value: 0 },
        { key: '发送成功', value: 1 },
        { key: '发送失败' , value: 2 },
        { key: '已读取' , value: 3 },
      ],
      //是否有效
      orgActive:[
        { key: '否', value: 0},
        { key: '是', value: 1 },
      ],
      // rules表单验证
      rules: {
        // fromUserId: [
        //   { required: true, message: '请输入发送人', trigger: 'blur' }
        // ],
        // businessId: [{ required: true, message: '请输入业务记录Id', trigger: 'blur' }],
        // errorMessage: [
        //   { required: true, message: '请输入错误原因', trigger: 'blur' }
        // ],
        // readTime: [{ required: true, message: '请输入读取时间', trigger: 'blur' }],
        // orgTypePathKey: [
        //   { required: true, message: '请输入部门类型', trigger: 'blur' }
        // ],
        // templateId: [{ required: true, message: '请输入模板Id', trigger: 'blur' }],

        // tuUserId: [
        //   { required: true, message: '请输入接收人Id', trigger: 'blur' }
        // ],
        // content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        // sendTime: [
        //   { required: true, message: '请输入发送时间', trigger: 'blur' }
        // ],
        // errorTime: [{ required: true, message: '请输入错误时间', trigger: 'blur' }],
        // successTime: [
        //   { required: true, message: '请输入成功时间', trigger: 'blur' }
        // ],
        // sendType: [{ required: true, message: '请选择发送方式', trigger: 'blur' }],

        // businessModule: [
        //   { required: true, message: '请输入业务模块', trigger: 'blur' }
        // ],
        // status: [{ required: true, message: '请选择消息状态', trigger: 'blur' }],
           
      },
      // 请求数据参数
      formInline: {
        current: 1,
        size: 10,
        id:null
      },
      userData: [], //用户数据
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
       * 调用接口，注释上面模拟数据 取消下面注释newsRecord, recordSave
       */
      newsRecord(this.formInline)
        .then(res => {
          this.loading = false
          if (res.statusCode == 200) {
            this.userData = res.data.records
            for(var i=0;i<this.userData.length;i++){
              if(this.userData[i].sendType===0){
                this.userData[i].sendType='站内信'
              }else if(this.userData[i].sendType===1){
                this.userData[i].sendType='邮件'
              }else if(this.userData[i].sendType===2){
                this.userData[i].sendType='短信'
              }else if(this.userData[i].sendType===3){
                this.userData[i].sendType='微信'
              }
              if(this.userData[i].status===0){
                this.userData[i].status='已创建'
              }else if(this.userData[i].status===1){
                this.userData[i].status='发送成功'
              }else if(this.userData[i].status===2){
                this.userData[i].status='发送失败'
              }else if(this.userData[i].status===3){
                this.userData[i].status='已读取'
              }
              if(this.userData[i].active===1){
                this.userData[i].active='是'
              }else if(this.userData[i].active===0){
                this.userData[i].active='否'
              }
          }
            console.log(res);
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
        .catch(err => {
          this.loading = false
          this.$message.error('加载失败，请稍后再试！')
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
      this.editForm.fromUserId = '',
      this.editForm.businessId = '',
      this.editForm.errorMessage = '',
      this.editForm.readTime = '',
      this.editForm.orgTypePathKey = '',
      this.editForm.templateId = '',
      this.editForm.toUserId = '',
      this.editForm.content = '',
      this.editForm.sendTime = '',
      this.editForm.errorTime = '',
      this.editForm.successTime = '',
      this.editForm.sendType = '',
      this.editForm.businessModule = '',
      this.editForm.status = ''
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
          recordSave(this.editForm)
            .then(res => {
              this.editFormVisible = false
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
              this.editFormVisible = false
              this.loading = false
              this.$message.error('添加失败，请稍后再试！')
            })
        
      
    },
        // 关闭编辑、增加弹出框
    closeEdit(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } 
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

 
 