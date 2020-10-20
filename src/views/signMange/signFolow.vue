/**
 *  注册管理 企业信息
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">注册管理</el-breadcrumb-item>
      <el-breadcrumb-item>注册流程</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="inputVal" placeholder="输入ID" clearable @clear="refresh"></el-input>
      </el-form-item>
      <!-- <el-form-item label="">
        <el-input size="small" v-model="formInline.deptNo" placeholder="输入部门代码"></el-input>
      </el-form-item>-->
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
        <el-button size="mini" type="danger" @click="deletesUser()">选中删除</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table
      @select='select'
      size="small"
      :data="listData"
      highlight-current-row
      v-loading="loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%;"
    >
      <el-table-column align="center" type="selection" width="60"></el-table-column>
      <el-table-column sortable prop="id" label="ID" width="80"></el-table-column>
      <el-table-column sortable prop="approvalUserId" label="审批人员ID" width="150"></el-table-column>
      <el-table-column sortable prop="businessModule" label="业务模块" width="110"></el-table-column>
      <el-table-column sortable prop="rejectionDate" label="驳回时间" width="110"></el-table-column>
      <el-table-column sortable prop="rejectionDescription" label="驳回说明" width="200"></el-table-column>
      <el-table-column sortable prop="createTime" label="创建时间" width="110"></el-table-column>
      <el-table-column sortable prop="submitTime" label="提交时间" width="110"></el-table-column>
      <el-table-column sortable prop="userId" label="用户ID" width="110"></el-table-column>
      <el-table-column sortable prop="useType" label="用户类型" width="110"></el-table-column>
      <el-table-column sortable prop="orgTypePathKey" label="部门类型" width="110"></el-table-column>
      <el-table-column sortable prop="approvalDate" label="审批时间" width="110"></el-table-column>
      <el-table-column sortable prop="status" label="上报状态" width="100"></el-table-column>

      <el-table-column align="center" label="操作">
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
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="审批人员ID" prop="approvalUserId">
          <el-input size="small" v-model="editForm.approvalUserId" auto-complete="off" placeholder="请输入审批人员ID" ></el-input>
        </el-form-item>
        <el-form-item label="业务模块" prop="businessModule">
          <el-input  size="small"
            v-model="editForm.businessModule"
            auto-complete="off"
            placeholder="请输入业务模块"
          ></el-input>
        </el-form-item>
        <el-form-item label="驳回时间" prop="rejectionDate">
          <el-input
            size="small"
            v-model="editForm.rejectionDate"
            auto-complete="off"
            placeholder="请输入驳回时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="驳回说明" prop="rejectionDescription">
          <el-input
            size="small"
            v-model="editForm.rejectionDescription"
            auto-complete="off"
            placeholder="请输入驳回说明"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input
            size="small"
            v-model="editForm.createTime"
            auto-complete="off"
            placeholder="请输入创建时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="提交时间" prop="submitTime">
          <el-input
            size="small"
            v-model="editForm.submitTime"
            auto-complete="off"
            placeholder="请输入提交时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input
            size="small"
            v-model="editForm.userId"
            auto-complete="off"
            placeholder="请输入用户ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="useType">
          <el-select size="small" v-model="editForm.useType" placeholder="请选择" class="userRole">
            <el-option v-for="type in userTypes" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input
            size="small"
            v-model="editForm.orgTypePathKey"
            auto-complete="off"
            placeholder="请输入部门类型"
          ></el-input>
        </el-form-item>
        <el-form-item label="审批时间" prop="approvalDate">
          <el-input
            size="small"
            v-model="editForm.approvalDate"
            auto-complete="off"
            placeholder="请输入审批时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="上报状态" prop="status">
          <el-select size="small" v-model="editForm.status" placeholder="请选择" class="userRole">
            <el-option v-for="type in statuss" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeEdit("edit")'>取消</el-button>
        <el-button
          size="small"
          type="primary"
          :loading="loading"
          class="title"
          @click="submitFormEdit('editForm')"
        >保存</el-button>
      </div>
    </el-dialog>
    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="addFormVisible" width="30%" @click='closeAdd("add")'>
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <!-- <el-form-item label="审批人员ID" prop="approvalUSerId">
          <el-input
            size="small"
            v-model="editForm.approvalUserId"
            auto-complete="off"
            placeholder="请输入审批人员ID"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="业务模块" prop="businessModule">
          <el-input
            size="small"
            v-model="editForm.businessModule"
            auto-complete="off"
            placeholder="请输入业务模块"
          ></el-input>
        </el-form-item>
        <el-form-item label="驳回时间" prop="rejectionDate">
          <el-input
            size="small"
            v-model="editForm.rejectionDate"
            auto-complete="off"
            placeholder="请输入驳回时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="驳回说明" prop="rejectionDescription">
          <el-input
            size="small"
            v-model="editForm.rejectionDescription"
            auto-complete="off"
            placeholder="请输入驳回说明"
          ></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input
            size="small"
            v-model="editForm.createTime"
            auto-complete="off"
            placeholder="请输入创建时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="提交时间" prop="submitTime">
          <el-input
            size="small"
            v-model="editForm.submitTime"
            auto-complete="off"
            placeholder="请输入提交时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input
            size="small"
            v-model="editForm.userId"
            auto-complete="off"
            placeholder="请输入用户ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="useType">
          <el-select size="small" v-model="editForm.useType" placeholder="请选择" class="userRole">
            <el-option v-for="type in userTypes" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input
            size="small"
            v-model="editForm.orgTypePathKey"
            auto-complete="off"
            placeholder="请输入部门类型"
          ></el-input>
        </el-form-item>
        <el-form-item label="审批时间" prop="approvalDate">
          <el-input
            size="small"
            v-model="editForm.approvalDate"
            auto-complete="off"
            placeholder="请输入审批时间"
          ></el-input>
        </el-form-item>
        <el-form-item label="上报状态" prop="status">
          <el-select size="small" v-model="editForm.status" placeholder="请选择" class="userRole">
            <el-option v-for="type in statuss" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeAdd("add")'>取消</el-button>
        <el-button
          size="small"
          type="primary"
          :loading="loading"
          class="title"
          @click="submitFormAdd('editForm')"
        >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { signFolow,signSave, signDel,signEdit } from "../../api/userMG";
import Pagination from "../../components/Pagination";
export default {
  data() {
    return {
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      addFormVisible: false, //控制编辑页面显示与隐藏
      inputVal:'',
      editForm: {
        approvalUSerId: "",
        businessModule: "",
        rejectionDate: "",
        rejectionDescription: "",
        createTime: "",
        submitTime: "",
        userId: "",
        useType: "",
        orgTypePathKey: "",
        approvalDate: "",
        status: "",
      },
      // 用户类型
      userTypes:[
        { key: '注册企业', value: 1 },
        { key: '企业个人', value: 2 },
        { key: '专家', value: 3 },
      ],
      // 上报状态
      statuss:[
        { key: '已填写未提交', value: 0 },
        { key: '已提交', value: 1 },
        { key: '已审核', value: 2 },
        { key: '已驳回', value: 3 },
        { key: '已超期', value: 6 },
      ],
      // rules表单验证
      rules: {
        // approvalUSerId: [
        //   { required: true, message: "请输入审批员ID", trigger: "blur" },
        // ],
        // businessModule: [
        //   { required: true, message: "请输入业务模块", trigger: "blur" },
        // ],
        // rejectionDate: [
        //   { required: true, message: "请输入驳回时间", trigger: "blur" },
        // ],
        // rejectionDescription: [
        //   { required: true, message: "请输入驳回说明", trigger: "blur" },
        // ],
        // createTime: [
        //   { required: true, message: "请输入创建时间", trigger: "blur" },
        // ],
        // submitTime: [
        //   { required: true, message: "请输入提交时间", trigger: "blur" },
        // ],
        // userId: [{ required: true, message: "请输入用户ID", trigger: "blur" }],
        // useType: [
        //   { required: true, message: "请输入用户类型", trigger: "blur" },
        // ],
        // orgTypePathKey: [
        //   { required: true, message: "请输入部门类型", trigger: "blur" },
        // ],
        // approvalDate: [
        //   { required: true, message: "请输入审批时间", trigger: "blur" },
        // ],
        // status: [
        //   { required: true, message: "请选择上报状态", trigger: "blur" },
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
        id:null
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
      },
    };
  },
  // 注册组件
  components: {
    Pagination,
  },
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {
    this.getdata(this.formInline);
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取公司列表
    getdata(parameter) {
      this.loading = true;
      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      signFolow(parameter)
        .then(res => {
          this.loading = false
          if (res.statusCode != 200) {
            this.$message({
              type: 'info',
              message: res.message
            })
          } else {
            console.log(res);
            this.listData = res.data.records
            for(var i=0;i<this.listData.length;i++){
              if(this.listData[i].status===0){
                this.listData[i].status='已填写未提交'
              }else if(this.listData[i].status===2){
                this.listData[i].status='已提交'
              }else if(this.listData[i].status===3){
                this.listData[i].status='已审核'
              }else if(this.listData[i].status===6){
                this.listData[i].status='已驳回'
              }else if(this.listData[i].status===1){
                this.listData[i].status='已超期'
              }

              if(this.listData[i].useType == 1){
                this.listData[i].useType ="注册企业"
              }else if(this.listData[i].useType == 2){
                 this.listData[i].useType ="企业个人"
              }else{
                this.listData[i].useType ="专家"
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
          this.$message.error('加载失败，请稍后再试！')
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
    handleEdit: function (index, row) {
      this.editFormVisible = true;
      this.editForm.id = row.id
        this.editForm.approvalUserId = row.approvalUserId;
        this.editForm.businessModule = row.businessModule;
        this.editForm.rejectionDate = row.rejectionDate;
        this.editForm.rejectionDescription = row.rejectionDescription;
        this.editForm.createTime = row.createTime;
        this.editForm.submitTime = row.submitTime;
        this.editForm.userId = row.userId;
        // this.editForm.useType = row.useType;
        this.editForm.orgTypePathKey = row.orgTypePathKey;
        this.editForm.approvalDate = row.approvalDate;
        // this.editForm.status = row.status;
        if(row.useType=="注册企业"){
          this.editForm.useType=1
        }else if(row.useType=="企业个人"){
          this.editForm.useType=2
        }else{
          this.editForm.useType=3
        }
        if(row.status=="已提交"){
          this.editForm.status=1
        }else if(row.status=="已审核"){
          this.editForm.status=2
        }else if(row.status=="已驳回"){
          this.editForm.status=3
        }else if(row.status=="已超期"){
          this.editForm.status=6
        }else{
          this.editForm.status=0
        }
    },
        //显示添加界面
    handleAdd: function (index, row) {
      this.addFormVisible = true;
        this.editForm.approvalUserId = "";
        this.editForm.businessModule = "";
        this.editForm.rejectionDate = "";
        this.editForm.rejectionDescription = "";
        this.editForm.createTime = "";
        this.editForm.submitTime = "";
        this.editForm.userId = "";
        this.editForm.useType = "";
        this.editForm.orgTypePathKey = "";
        this.editForm.approvalDate = "";
        this.editForm.status = "";
    },
    // 编辑、增加页面保存方法
    submitFormEdit(editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          signEdit(this.editForm)
            .then((res) => {
              this.editFormVisible = false;
              this.loading = false;
              if (res.statusCode == 200) {
                this.getdata(this.formInline);
                this.$message({
                  type: "success",
                  message: "编辑成功！",
                });
              } else {
                this.$message({
                  type: "info",
                  message: res.message,
                });
              }
            })
            .catch((err) => {
              this.editFormVisible = false;
              this.loading = false;
              this.$message.error("编辑失败，请稍后再试！");
            });
        } else {
          return false;
        }
      });
    },
        // 增加页面保存方法
    submitFormAdd(editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          signSave(this.editForm)
            .then((res) => {
              this.addFormVisible = false;
              this.loading = false;
              if (res.statusCode == 200) {
                this.getdata(this.formInline);
                this.$message({
                  type: "success",
                  message: "添加成功！",
                });
              } else {
                this.$message({
                  type: "info",
                  message: res.message,
                });
              }
            })
            .catch((err) => {
              this.editFormVisible = false;
              this.loading = false;
              this.$message.error("添加失败，请稍后再试！");
            });
        } else {
          return false;
        }
      });
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
    // 删除
    deleteUser(index, row) {
      if(row){
        this.seletedata=[]
        this.seletedata.push(row.id)
      }
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          signDel(this.seletedata)
            .then((res) => {
              if (res.statusCode == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getdata(this.formInline);
              } else {
                this.$message({
                  type: "info",
                  message: res.message,
                });
              }
            })
            .catch((err) => {
              this.loading = false;
              this.$message.error("删除失败，请稍后再试！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
        // 删除多个
    deletesUser(index, row) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          signDel(this.seletedata)
            .then((res) => {
              if (res.statusCode == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.getdata(this.formInline);
              } else {
                this.$message({
                  type: "info",
                  message: res.message,
                });
              }
            })
            .catch((err) => {
              this.loading = false;
              this.$message.error("删除失败，请稍后再试！");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    
  },
};
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>

 
 