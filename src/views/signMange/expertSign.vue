/**
 *  注册管理 企业信息
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">注册管理</el-breadcrumb-item>
      <el-breadcrumb-item>专家注册管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="inputVal" placeholder="输入ID" clearable @clear="refresh"></el-input>
      </el-form-item>
      <!-- <el-form-item label="">
        <el-input size="small" v-model="formInline.deptNo" placeholder="输入部门代码"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
        <el-button size="mini" type="danger" @click="deletesUser()">选中删除</el-button>
        
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" @select='select' :data="userData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
       <el-table-column sortable prop="id" label="ID" width="150">
      </el-table-column>
      <el-table-column sortable prop="name" label="专家名称" width="100">
      </el-table-column>
      <el-table-column sortable prop="unitName" label="单位名称" width="200">
      </el-table-column>
      <el-table-column sortable prop="orgTypePathKey" label="部门类型" width="100">
      </el-table-column>
      <!-- <el-table-column sortable prop="active" label="是否有效" width="200">
      </el-table-column> -->
      <el-table-column sortable prop="status" label="状态" width="200">
      </el-table-column>
      <el-table-column align="center" label="预览" min-width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="checkPro(scope.$index, scope.row)">专业信息</el-button>
          <el-button size="mini" type="success" @click="checkAwa(scope.$index, scope.row)">获奖信息</el-button>
          <el-button size="mini" type="success" @click="checkQua(scope.$index, scope.row)">资质信息</el-button>
        </template>
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
     <!-- 查看专业信息界面 -->
    <el-dialog title="专家专业信息" :visible.sync="professionFormVisible" width="30%" >
      <el-form label-width="120px" :model="editForm" ref="editForm">
        <el-form-item label="专家ID">
          <el-input size="small" v-model="editForm.expertProfessionList[0].userId" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="专家名称">
          <el-input size="small" v-model="editForm.expertProfessionList[0].name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="专业名称">
          <el-input size="small" v-model="editForm.expertProfessionList[0].professionName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="专业开始时间">
          <el-input size="small" v-model="editForm.expertProfessionList[0].startDate" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="专业结束时间">
          <el-input size="small" v-model="editForm.expertProfessionList[0].endDate" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="单位或院校名称">
          <el-input size="small" v-model="editForm.expertProfessionList[0].fromUnitName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="部门类型">
          <el-input size="small" v-model="editForm.expertProfessionList[0].orgTypePathKey" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="字典数据ID">
          <el-input size="small" v-model="editForm.expertProfessionList[0].professionId" auto-complete="off" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="是否有效">
          <el-input size="small" v-model="editForm.expertProfessionList[0].active" auto-complete="off" disabled></el-input>
        </el-form-item> -->
      </el-form>
    </el-dialog>
      <!-- 查看获奖信息界面 -->
    <el-dialog title="专家获奖信息" :visible.sync="awardFormVisible" width="30%" >
      <el-form label-width="120px" :model="editForm" ref="editForm" readonly='true'>
       <el-form-item label="专家ID">
          <el-input size="small" v-model="editForm.expertAwardList[0].userId" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="专家名称">
          <el-input size="small" v-model="editForm.expertAwardList[0].name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="专业开始时间">
          <el-input size="small" v-model="editForm.expertAwardList[0].startDate" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="专业结束时间">
          <el-input size="small" v-model="editForm.expertAwardList[0].endDate" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="单位或院校名称">
          <el-input size="small" v-model="editForm.expertAwardList[0].fromUnitName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="部门类型">
          <el-input size="small" v-model="editForm.expertAwardList[0].orgTypePathKey" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="获奖名称">
          <el-input size="small" v-model="editForm.expertAwardList[0].qualificationName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="是否有效">
          <el-input size="small" v-model="editForm.expertAwardList[0].active" auto-complete="off" disabled ></el-input>
        </el-form-item> -->
      </el-form>
    </el-dialog>
          <!-- 查看资质信息界面 -->
    <el-dialog title="专家资质信息" :visible.sync="qualificationFormVisible" width="30%">
      <el-form label-width="120px" :model="editForm" ref="editForm" readonly='true'>
        <el-form-item label="专家ID">
          <el-input size="small" v-model="editForm.expertQualificationList[0].userId" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="专家名称">
          <el-input size="small" v-model="editForm.expertQualificationList[0].name" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="专业开始时间">
          <el-input size="small" v-model="editForm.expertQualificationList[0].startDate" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="专业结束时间">
          <el-input size="small" v-model="editForm.expertQualificationList[0].endDate" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="单位或院校名称">
          <el-input size="small" v-model="editForm.expertQualificationList[0].fromUnitName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="部门类型">
          <el-input size="small" v-model="editForm.expertQualificationList[0].orgTypePathKey" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="资质名称">
          <el-input size="small" v-model="editForm.expertQualificationList[0].qualificationName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="资质等级">
          <el-input size="small" v-model="editForm.expertQualificationList[0].qualificationLevel" auto-complete="off" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="是否有效">
          <el-input size="small" v-model="editForm.expertQualificationList[0].active" auto-complete="off" disabled></el-input>
        </el-form-item> -->
      </el-form>
    </el-dialog>
    <!-- 编辑界面 -->
    <el-dialog title="编辑专家注册信息" :visible.sync="editFormVisible" width="30%" @click='closeEdit("edit")'>
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="专家名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入专家名称"></el-input>
        </el-form-item>
        <el-form-item label="单位名称" prop="unitName">
          <el-input size="small" v-model="editForm.unitName" auto-complete="off" placeholder="请输入单位名称"></el-input>
        </el-form-item>
          <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
        </el-form-item>
        <el-form-item label="是否有效" prop="active">
          <el-select size="small" v-model="editForm.active" placeholder="请选择" class="userRole">
            <el-option v-for="type in orgActive" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input size="small" v-model="editForm.mobile" auto-complete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select size="small" v-model="editForm.status" placeholder="请选择" class="userRole">
            <el-option v-for="type in statuss" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- 专业信息 -->
        <el-form-item label="专业名称">
          <el-input size="small" v-model="editForm.expertProfessionList[0].professionName" auto-complete="off" placeholder="请输入专业名称"></el-input>
        </el-form-item>
        <el-form-item label="专业开始时间">
          <el-date-picker v-model="editForm.expertProfessionList[0].startDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
        </el-form-item>
        <el-form-item label="专业结束时间" >
          <el-date-picker v-model="editForm.expertProfessionList[0].endDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
          <!-- <el-input size="small" v-model="editForm.expertProfessionList[0].endDate" auto-complete="off" ></el-input> -->
        </el-form-item>
        <!-- <el-form-item label="单位或院校名称">
          <el-input size="small" v-model="editForm.expertProfessionList[0].fromUnitName" auto-complete="off" ></el-input>
        </el-form-item> -->
        <el-form-item label="字典数据">
          <el-input size="small" v-model="editForm.expertProfessionList[0].professionId" auto-complete="off" placeholder="请输入字典数据"></el-input>
        </el-form-item>
        <!-- 获奖信息 -->
        <el-form-item label="获奖名称">
          <el-input size="small" v-model="editForm.expertAwardList[0].qualificationName" auto-complete="off" placeholder="请输入获奖名称"></el-input>
        </el-form-item>
        <!-- 资质信息 -->
        <el-form-item label="资质名称">
          <el-input size="small" v-model="editForm.expertQualificationList[0].qualificationName" auto-complete="off" placeholder="请输入资质名称"></el-input>
        </el-form-item>
        <el-form-item label="资质等级">
          <el-input size="small" v-model="editForm.expertQualificationList[0].qualificationLevel" auto-complete="off" placeholder="请输入资质等级"></el-input>
        </el-form-item>
        <!-- <el-form-item label="联系电话" prop="contactPhone">
          <el-input size="small" v-model="editForm.contactPhone" auto-complete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeEdit("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitFormEdit('editForm')">保存</el-button>
      </div>
    </el-dialog>
    <!-- 添加界面 -->
    <el-dialog title="添加专家注册信息" :visible.sync="addFormVisible" width="30%" @click='closeAdd("add")'>
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="专家名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入专家名称"></el-input>
        </el-form-item>
        <el-form-item label="单位名称" prop="unitName">
          <el-input size="small" v-model="editForm.unitName" auto-complete="off" placeholder="请输入单位名称"></el-input>
        </el-form-item>
          <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
        </el-form-item>
        <el-form-item label="是否有效" prop="active">
          <el-select size="small" v-model="editForm.active" placeholder="请选择" class="userRole">
            <el-option v-for="type in orgActive" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input size="small" v-model="editForm.mobile" auto-complete="off" placeholder="请输入联系电话"></el-input>
        </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select size="small" v-model="editForm.status" placeholder="请选择" class="userRole">
            <el-option v-for="type in statuss" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- 专业信息 -->
        <el-form-item label="专业名称">
          <el-input size="small" v-model="editForm.expertProfessionList[0].professionName" auto-complete="off" placeholder="请输入专业名称"></el-input>
        </el-form-item>
        <el-form-item label="专业开始时间">
          <el-date-picker v-model="editForm.expertProfessionList[0].startDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
        </el-form-item>
        <el-form-item label="专业结束时间" >
          <el-date-picker v-model="editForm.expertProfessionList[0].endDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
          <!-- <el-input size="small" v-model="editForm.expertProfessionList[0].endDate" auto-complete="off" ></el-input> -->
        </el-form-item>
        <!-- <el-form-item label="单位或院校名称">
          <el-input size="small" v-model="editForm.expertProfessionList[0].fromUnitName" auto-complete="off" ></el-input>
        </el-form-item> -->
        <el-form-item label="字典数据">
          <el-input size="small" v-model="editForm.expertProfessionList[0].professionId" auto-complete="off" placeholder="请输入字典数据"></el-input>
        </el-form-item>
        <!-- 获奖信息 -->
        <el-form-item label="获奖名称">
          <el-input size="small" v-model="editForm.expertAwardList[0].qualificationName" auto-complete="off" placeholder="请输入获奖名称"></el-input>
        </el-form-item>
        <!-- 资质信息 -->
        <el-form-item label="资质名称">
          <el-input size="small" v-model="editForm.expertQualificationList[0].qualificationName" auto-complete="off" placeholder="请输入资质名称"></el-input>
        </el-form-item>
        <el-form-item label="资质等级">
          <el-input size="small" v-model="editForm.expertQualificationList[0].qualificationLevel" auto-complete="off" placeholder="请输入资质等级"></el-input>
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
import { expertSign, expertSave, expertDel,expertEdit} from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      addFormVisible: false, //控制编辑页面显示与隐藏
      professionFormVisible:false,//专家专业信息页面的显示与隐藏
      awardFormVisible:false,//专家专业信息页面的显示与隐藏
      qualificationFormVisible:false,//专家专业信息页面的显示与隐藏
      inputVal:'',
      editForm: {
        id:'',
        name:'',
        unitName:'',
        orgTypePathKey:'',
        active:'',
        status:'',
        mobile:'',
        expertProfessionList:[
          {
            id: "",
            orgTypePathKey: "",
            userId: "",
            name: '',
            professionId: "",
            professionName: "",
            startDate: "",
            endDate: "",
            fromUnitName: '',
            active: ''
          }
        ],
        expertAwardList:[
          {
            id: "",
            orgTypePathKey: "",
            userId: "",
            name: "",
            qualificationName: "",
            startDate: "",
            endDate: "",
            fromUnitName: "",
            active: ''
          }
        ],
        expertQualificationList:[
          {
            id: "",
            orgTypePathKey: "",
            userId: "",
            name: "",
            qualificationName: "",
            qualificationLevel: "",
            startDate: "",
            endDate: "",
            fromUnitName: "",
            active: ''
          }
        ]
      },
      // 状态
      statuss: [
        { key: '资料保存未提交' , value: 0 },
        { key: '资料已提交', value: 1 },
        { key: '内部审核中' , value: 2 },
        { key: '驳回' , value: 3 },
        { key: '申请成功', value: 4 },
      ],
      //是否有效
      orgActive:[
        { key: '否', value: 0},
        { key: '是', value: 1 },
      ],
      // rules表单验证
      rules: {
        name: [
          { required: true, message: '请输入专家名称', trigger: 'blur' }
        ],
        unitName: [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
        orgTypePathKey: [
          { required: true, message: '请输入部门类型', trigger: 'blur' }
        ],
        active: [{ required: true, message: '请选择是否有效', trigger: 'blur' }],
        orgTypePathKey: [
          { required: true, message: '请输入部门类型', trigger: 'blur' }
        ],
        contactAddress: [{ required: true, message: '请输入联系电话', trigger: 'blur' }]
      },
      // 请求数据参数
      formInline: {
        current: 1,
        size: 10,
        id:null
      },
       // 选择数据
      selectdata: [],
      // 删除
      seletedata: [],
      userparm: [], //搜索权限
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
      // this.loading = true
      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      expertSign(this.formInline)
        .then(res => {
          this.loading = false
          if (res.statusCode != 200) {
            this.$message({
              type: 'info',
              message: res.message
            })
          } else {
            console.log(res);
            this.userData = res.data.records
            for(var i=0;i<this.userData.length;i++){
              if(this.userData[i].status === 0){
                this.userData[i].status='资料保存未提交'
              }else if(this.userData[i].status=== 1){
                this.userData[i].status='资料已提交'
              }else if(this.userData[i].status=== 2){
                this.userData[i].status='内部审核中'
              }else if(this.userData[i].status=== 3){
                this.userData[i].status='驳回'
              }else if(this.userData[i].status=== 4){
                this.userData[i].status='申请成功'
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
      this.formInline.page = parm.currentPage
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
    checkPro:function(index,row){ 
      this.professionFormVisible=true
      this.editForm.expertProfessionList[0].id=row.expertProfessionList[0].id
      this.editForm.expertProfessionList[0].name=row.expertProfessionList[0].name
      this.editForm.expertProfessionList[0].userId=row.expertProfessionList[0].userId
      this.editForm.expertProfessionList[0].professionId=row.expertProfessionList[0].professionId
      this.editForm.expertProfessionList[0].professionName=row.expertProfessionList[0].professionName
      this.editForm.expertProfessionList[0].startDate=row.expertProfessionList[0].startDate
      this.editForm.expertProfessionList[0].fromUnitName=row.expertProfessionList[0].fromUnitName
      this.editForm.expertProfessionList[0].active=row.expertProfessionList[0].active
      this.editForm.expertProfessionList[0].orgTypePathKey=row.expertProfessionList[0].orgTypePathKey
      this.editForm.expertProfessionList[0].endDate=row.expertProfessionList[0].endDate
    },
    checkAwa:function(index,row){ 
      this.awardFormVisible=true
      this.editForm.expertAwardList[0].id=row.expertAwardList[0].id
      this.editForm.expertAwardList[0].orgTypePathKey=row.expertAwardList[0].orgTypePathKey
      this.editForm.expertAwardList[0].userId=row.expertAwardList[0].userId
      this.editForm.expertAwardList[0].name=row.expertAwardList[0].name
      this.editForm.expertAwardList[0].qualificationName=row.expertAwardList[0].qualificationName
      this.editForm.expertAwardList[0].startDate=row.expertAwardList[0].startDate
      this.editForm.expertAwardList[0].fromUnitName=row.expertAwardList[0].fromUnitName
      this.editForm.expertAwardList[0].active=row.expertAwardList[0].active
      this.editForm.expertAwardList[0].endDate=row.expertAwardList[0].endDate
    },
    checkQua:function(index,row){ 
      this.qualificationFormVisible=true
      this.editForm.expertQualificationList[0].id=row.expertQualificationList[0].id
      this.editForm.expertQualificationList[0].name=row.expertQualificationList[0].name
      this.editForm.expertQualificationList[0].userId=row.expertQualificationList[0].userId
      this.editForm.expertQualificationList[0].startDate=row.expertQualificationList[0].startDate
      this.editForm.expertQualificationList[0].fromUnitName=row.expertQualificationList[0].fromUnitName
      this.editForm.expertQualificationList[0].active=row.expertQualificationList[0].active
      this.editForm.expertQualificationList[0].orgTypePathKey=row.expertQualificationList[0].orgTypePathKey
      this.editForm.expertQualificationList[0].endDate=row.expertQualificationList[0].endDate
      this.editForm.expertQualificationList[0].qualificationName=row.expertQualificationList[0].qualificationName
      this.editForm.expertQualificationList[0].active=row.expertQualificationList[0].active
      this.editForm.expertQualificationList[0].qualificationLevel=row.expertQualificationList[0].qualificationLevel
      this.editForm.expertQualificationList[0].endDate=row.expertQualificationList[0].endDate
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      console.log(index,row);
      this.editFormVisible = true
      this.editForm.id=row.id
      this.editForm.name=row.name
      this.editForm.unitName=row.unitName
      this.editForm.orgTypePathKey=row.orgTypePathKey
      this.editForm.active=row.active
      this.editForm.status=row.status
      this.editForm.mobile=row.mobile
      this.editForm.expertProfessionList[0].id=row.expertProfessionList[0].id
      this.editForm.expertProfessionList[0].professionId=row.expertProfessionList[0].professionId
      this.editForm.expertProfessionList[0].professionName=row.expertProfessionList[0].professionName
      this.editForm.expertProfessionList[0].startDate=row.expertProfessionList[0].startDate
      this.editForm.expertProfessionList[0].endDate=row.expertProfessionList[0].endDate
      this.editForm.expertAwardList[0].id=row.expertAwardList[0].id
      this.editForm.expertAwardList[0].qualificationName=row.expertAwardList[0].qualificationName
      this.editForm.expertQualificationList[0].id=row.expertQualificationList[0].id
      this.editForm.expertQualificationList[0].qualificationName=row.expertQualificationList[0].qualificationName
      this.editForm.expertQualificationList[0].qualificationLevel=row.expertQualificationList[0].qualificationLevel
      // this.editForm.expertProfessionList[0].name=row.name
      // this.editForm.expertProfessionList[0].userId=row.id
      // this.editForm.expertProfessionList[0].fromUnitName=row.unitName
      // this.editForm.expertProfessionList[0].active=row.active
      // this.editForm.expertProfessionList[0].orgTypePathKey=row.orgTypePathKey
      // this.editForm.expertAwardList[0].orgTypePathKey=row.orgTypePathKey
      // this.editForm.expertAwardList[0].userId=row.id
      // this.editForm.expertAwardList[0].name=row.name
      // this.editForm.expertAwardList[0].startDate=row.expertProfessionList[0].startDate
      // this.editForm.expertAwardList[0].fromUnitName=row.unitName
      // this.editForm.expertAwardList[0].active=row.expertAwardList[0].active
      // this.editForm.expertAwardList[0].endDate=row.expertProfessionList[0].endDate
      // this.editForm.expertQualificationList[0].name=row.name
      // this.editForm.expertQualificationList[0].userId=row.id
      // this.editForm.expertQualificationList[0].startDate=row.expertProfessionList[0].startDate
      // this.editForm.expertQualificationList[0].fromUnitName=row.unitName
      // this.editForm.expertQualificationList[0].active=row.active
      // this.editForm.expertQualificationList[0].orgTypePathKey=row.orgTypePathKey
      // this.editForm.expertQualificationList[0].endDate=row.expertProfessionList[0].endDate
      // this.editForm.expertQualificationList[0].active=row.active

      if(row.status == '资料保存未提交'){
        this.editForm.status = 0
      }else if(row.status == '资料已提交'){
        this.editForm.status = 1
      }else if(row.status == '内部审核中'){
        this.editForm.status = 2
      }else if(row.status == '驳回'){
        this.editForm.status = 3
      }else if(row.status == '申请成功'){
        this.editForm.status = 4
      }
      
    },
       //显示添加界面
    handleAdd: function() {
      this.addFormVisible = true
      this.editForm.name= ''
      this.editForm.unitName= ''
      this.editForm.orgTypePathKey= ''
      this.editForm.active= ''
      this.editForm.status= ''
      this.editForm.mobile= ''
      this.editForm.expertProfessionList[0].professionId= ''
      this.editForm.expertProfessionList[0].professionName= ''
      this.editForm.expertProfessionList[0].startDate= ''
      this.editForm.expertProfessionList[0].endDate=''
      this.editForm.expertAwardList[0].qualificationName= ''
      this.editForm.expertQualificationList[0].qualificationName= ''
      this.editForm.expertQualificationList[0].qualificationLevel= ''
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
    // 编辑页面保存方法
    submitFormEdit(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          if(true){
            this.editForm.expertProfessionList[0].name=this.editForm.name
            this.editForm.expertProfessionList[0].userId=this.editForm.id
            this.editForm.expertProfessionList[0].fromUnitName=this.editForm.unitName
            this.editForm.expertProfessionList[0].active=this.editForm.active
            this.editForm.expertProfessionList[0].orgTypePathKey=this.editForm.orgTypePathKey
            this.editForm.expertAwardList[0].orgTypePathKey=this.editForm.orgTypePathKey
            this.editForm.expertAwardList[0].userId=this.editForm.id
            this.editForm.expertAwardList[0].name=this.editForm.name
            this.editForm.expertAwardList[0].startDate=this.editForm.expertProfessionList[0].startDate
            this.editForm.expertAwardList[0].fromUnitName=this.editForm.unitName
            this.editForm.expertAwardList[0].active=this.editForm.expertAwardList[0].active
            this.editForm.expertAwardList[0].endDate=this.editForm.expertProfessionList[0].endDate
            this.editForm.expertQualificationList[0].name=this.editForm.name
            this.editForm.expertQualificationList[0].userId=this.editForm.id
            this.editForm.expertQualificationList[0].startDate=this.editForm.expertProfessionList[0].startDate
            this.editForm.expertQualificationList[0].fromUnitName=this.editForm.unitName
            this.editForm.expertQualificationList[0].active=this.editForm.active
            this.editForm.expertQualificationList[0].orgTypePathKey=this.editForm.orgTypePathKey
            this.editForm.expertQualificationList[0].endDate=this.editForm.expertProfessionList[0].endDate
            this.editForm.expertQualificationList[0].active=this.editForm.active
          }
          expertEdit(this.editForm)
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
    // 添加保存
    submitFormAdd(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          if(true){
            this.editForm.expertProfessionList[0].name=this.editForm.name
            this.editForm.expertProfessionList[0].userId=this.editForm.id
            this.editForm.expertProfessionList[0].fromUnitName=this.editForm.unitName
            this.editForm.expertProfessionList[0].active=this.editForm.active
            this.editForm.expertProfessionList[0].orgTypePathKey=this.editForm.orgTypePathKey
            this.editForm.expertAwardList[0].orgTypePathKey=this.editForm.orgTypePathKey
            this.editForm.expertAwardList[0].userId=this.editForm.id
            this.editForm.expertAwardList[0].name=this.editForm.name
            this.editForm.expertAwardList[0].startDate=this.editForm.expertProfessionList[0].startDate
            this.editForm.expertAwardList[0].fromUnitName=this.editForm.unitName
            this.editForm.expertAwardList[0].active=this.editForm.expertAwardList[0].active
            this.editForm.expertAwardList[0].endDate=this.editForm.expertProfessionList[0].endDate
            this.editForm.expertQualificationList[0].name=this.editForm.name
            this.editForm.expertQualificationList[0].userId=this.editForm.id
            this.editForm.expertQualificationList[0].startDate=this.editForm.expertProfessionList[0].startDate
            this.editForm.expertQualificationList[0].fromUnitName=this.editForm.unitName
            this.editForm.expertQualificationList[0].active=this.editForm.active
            this.editForm.expertQualificationList[0].orgTypePathKey=this.editForm.orgTypePathKey
            this.editForm.expertQualificationList[0].endDate=this.editForm.expertProfessionList[0].endDate
            this.editForm.expertQualificationList[0].active=this.editForm.active
          }
          expertSave(this.editForm)
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
    // 删除
    deletesUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          expertDel(this.seletedata)
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
            message: '已取消删除'
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
          expertDel(this.seletedata)
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

 
 