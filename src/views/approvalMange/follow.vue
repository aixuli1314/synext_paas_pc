/**
 * 系统管理 部门管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">审批管理</el-breadcrumb-item>
      <el-breadcrumb-item>可申请流程</el-breadcrumb-item>
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
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAddSp()">设定人员</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small"  @select='select'  :data="userData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="50">
      </el-table-column>
      <el-table-column sortable  prop="id" label="ID" width="160"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="name" label="名称" width="200"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="key" label="KEY" width="200" show-overflow-tooltip>
      </el-table-column>
        <el-table-column sortable prop="resourceName" label="XML" width="200" show-overflow-tooltip>
      </el-table-column>
        <el-table-column sortable prop="diagramResourceName" label="查看图片" width="200" show-overflow-tooltip >
      </el-table-column>
      <el-table-column  prop="suspended" label="暂停" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="170">
        <template slot-scope="scope">
          <el-button size="mini" @click="apply(scope.$index, scope.row)">申请</el-button>
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
<!-- 添加设定审批人员 -->
    <el-dialog title="设定审批人员" :visible.sync="addFormVisibleSp" width="70%" @click='closeAdd("sp")'>
      <ul>
        <li class="spLi" v-for="(item,j) in spPeoInfos" :key="j">
          <!-- v-for="item in spPeoInfos" -->
          <div class="spName pad" >
              名称：{{item.taskName}}
          </div>
          <div class="spType pad">
             类型：
             <el-radio-group v-model="item.radios" @change='changeRadio(j)'>
               <!-- <input type="radio" value="人员" name='sqChoose'>人员 -->
                <!-- <span @click="chooseOrg(j)"> -->
                  <el-radio label="assignee">人员</el-radio>
                <!-- </span> -->
                <!-- <span @click="chooseOrgs(j)"> -->
                <el-radio label="candidateUser" >候选人</el-radio>
                <!-- </span> -->
                <!-- <span @click='chooseGro(j)'> -->
                <el-radio label="candidateGroup" > 候选组</el-radio>
                <!-- </span> -->
            </el-radio-group>
          </div>
          <div class="spChoose pad">
              选择：<el-input clearable readonly v-model="item.spInput" :name='ipLbName'></el-input>
          </div>
        </li>
        <!-- <li class="spLi"  >
          <div class="spName pad" >
              名称：县区级科技局审核
          </div>
          <div class="spType pad">
             类型：
             <el-radio-group v-model="radio">
                <el-radio :label="3" v-model="radio" @change='chooseOrg'>人员</el-radio>
                <el-radio :label="6" v-model="radio" @change='chooseOrgs' >候选人</el-radio>
                <el-radio :label="9" v-model="radio" @change='chooseGro'>候选组</el-radio>
            </el-radio-group>
          </div>
          <div class="spChoose pad">
              选择：<el-input clearable readonly v-model="xianVal" > </el-input>
          </div>
        </li> -->
        
        <!-- <li class="spLi"  >
          <div class="spName pad" >
              名称：市级科技局审核
          </div>
          <div class="spType pad">
             类型：
             <el-radio-group v-model="radio1">
                <el-radio :label="3" v-model="radio1" @change='chooseOrg'>人员</el-radio>
                <el-radio :label="6" v-model="radio1" @change='chooseOrgs' >候选人</el-radio>
                <el-radio :label="9" v-model="radio1" @change='chooseGro'>候选组</el-radio>
            </el-radio-group>
          </div>
          <div class="spChoose pad">
              选择：<el-input clearable readonly v-model="shiVal"> </el-input>
          </div>
        </li>
        <li class="spLi"  >
          <div class="spName pad" >
              名称：市科技局中期评估
          </div>
          <div class="spType pad">
             类型：
             <el-radio-group v-model="radio2">
                <el-radio :label="3" v-model="radio2" @change='chooseOrg'>人员</el-radio>
                <el-radio :label="6" v-model="radio2" @change='chooseOrgs' >候选人</el-radio>
                <el-radio :label="9" v-model="radio2" @change='chooseGro'>候选组</el-radio>
            </el-radio-group>
          </div>
          <div class="spChoose pad">
              选择：<el-input clearable readonly v-model="zhongVal"> </el-input>
          </div>
        </li>
        <li class="spLi"  >
          <div class="spName pad" >
              名称：科技局结题审核
          </div>
          <div class="spType pad">
             类型：
             <el-radio-group v-model="radio3">
                <el-radio :label="3" v-model="radio3" @change='chooseOrg'>人员</el-radio>
                <el-radio :label="6" v-model="radio3" @change='chooseOrgs'>候选人</el-radio>
                <el-radio :label="9" v-model="radio3" @change='chooseGro'>候选组</el-radio>
            </el-radio-group>
          </div>
          <div class="spChoose pad">
              选择：<el-input clearable readonly v-model="overVal"> </el-input>
          </div>
        </li> -->
      </ul>
        <el-button type="primary" class="spSave" @click="spUserSave()">保存</el-button>
        <el-button @click='closeAdd("sp")'>取消</el-button>
    </el-dialog>
    <!-- 候选人员 -->
    <el-dialog title="设定候选人" :visible.sync="chooseHx" width="50%" @click='closeAdd("hxr")'>
      <el-tabs tab-position="left" style="height: 300px;">
        <el-tab-pane :label="itemName[i+1]" v-for="(item,i) in spOrgTypeInfos" :key="i">
          <el-table size="small"  highlight-current-row  :data="item.users"  v-loading="loading" border element-loading-text="拼命加载中" style="width: 90%;">  
          <el-table-column sortable  prop="id" label="ID" width="200"  show-overflow-tooltip>
          </el-table-column>
          <el-table-column sortable prop="userName" label="名称" width="200"  show-overflow-tooltip>
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="170" style="display:'none!important'">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleChoose(scope.$index, scope.row)">选中</el-button>
            </template>
      </el-table-column>
        </el-table>
        </el-tab-pane>
        <el-button type="primary" class="spSave" style="marginTop:'10px'" @click="hxrSave()">保存</el-button>
        <el-button @click='closeAdd("hxr")'>取消</el-button>
      </el-tabs>
    </el-dialog>
    <!-- 候选人 -->
    <el-dialog title="设定候选人" :visible.sync="chooseHxs" width="40%" @click='closeAdd("hxrs")'>
      <el-tabs tab-position="left" style="height: 300px;">
        <el-tab-pane :label="itemName[i+1]" v-for="(item,i) in spOrgTypeInfos"  @tab-click='chooseTab()' :key="i">
          <el-table size="small"  @select='selects'  :data="item.users"  v-loading="loading" border element-loading-text="拼命加载中" style="width: 90%;">
          <el-table-column align="center" type="selection" width="50">
          </el-table-column>
          <el-table-column sortable  prop="id" label="ID" width="250"  show-overflow-tooltip>
          </el-table-column>
          <el-table-column sortable prop="userName" label="名称" width="251"  show-overflow-tooltip>
          </el-table-column>
        </el-table>
        </el-tab-pane>
        <el-button type="primary" class="spSave" style="marginTop:'10px'" @click="hxrsSave()">保存</el-button>
        <el-button @click='closeAdd("hxrs")'>取消</el-button>
      </el-tabs>
    </el-dialog>
  <!-- 候选组 -->
    <el-dialog title="设定候选人" :visible.sync="chooseGroup" width="40%" @click='closeAdd("cg")'>
      <el-tabs tab-position="left" style="height: 300px;">
        <!-- <el-tab-pane :label="itemName[i+1]" v-for="(item,i) in spOrgTypeInfos"> -->
          <el-table size="small" @select='selectss'  :data="spOrgTypeInfos" v-loading="loading" border element-loading-text="拼命加载中" style="width: 90%;">
          <el-table-column align="center" type="selection" width="50">
          </el-table-column>
          <el-table-column sortable  prop="id" label="ID" width="250"  show-overflow-tooltip>
          </el-table-column>
          <el-table-column sortable prop="name" label="名称" width="251"  show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <!-- </el-tab-pane> -->
        <el-button type="primary" class="spSave" style="marginTop:'10px'" @click="cgSave()">保存</el-button>
        <el-button @click='closeAdd("cg")'>取消</el-button>
      </el-tabs>
    </el-dialog>
    <!-- 申请页面 -->
    <el-dialog title="申请" :visible.sync="applyDia" width="40%" @click='closeAdd("apply")'>
      <el-form label-width="80px" ref="applyForm" :model="applyForm" :rules="rules">
        <el-form-item label="备注" prop="reason">
          <!-- <el-upload
            class="upload-demo"
            action=""
            ref='upload'
            :http-request="handleFile" 
            :beforeUpload='beforeUpload'
            :on-exceed="handleExceed" 
            :file-list="fileList"
            :on-preview ='up'
            :on-progress ='onUp'
            :limit='1'
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload()">上传到服务器</el-button> -->
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          <!-- </el-upload> -->
        </el-form-item>
        <el-form-item label="备注" prop="reason">
          <el-input type="textarea" size="small" :rows="2"  placeholder="请输入备注" auto-complete="off" v-model="applyForm.reason"></el-input>
        </el-form-item>        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeAdd("apply")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitFormApply('editForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入请求方法
import {
  spPeoInfo,
  sqflow,
  spOrg,
  addSpUser,
  applyOne,
  applyUpload
} from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      loading: false, //是显示加载,
      editFormVisible: false, //控制编辑页面显示与隐藏
      addFormVisible: false,//添加页面的显示与隐藏
      addFormVisibleSp:false,//设定审批页面的显示与隐藏
      chooseHx:false,//候选人原页面显示隐藏
      chooseHxs:false,//候选人页面的显示与隐藏
      chooseGroup:false,//候选组显示与隐藏
      applyDia:false,//申请页面
      tabPosition: 'left',
      selectTab:[],
      currentRow:null,
      indexs:'',
      inputVal:'',//搜索框里的值
      chooseVal:[],
      overVal:'',
      radios: 1,
      radioHx:'',
      spOrgInfo:{},
      spOrgInfos:'',
      spOrgTypeInfos:'', //审批分类信息
      fileList: [],
      upVal:{},
      // url:'http://172.16.0.208/',
      // 编辑与添加
      editForm: {
        id: "",
        name: "",
        key: "",
        revision: '',
        version: '',
        deploymentId: "",
        resourceName: "",
        deploymentTime: "",
        diagramResourceName: "",
        suspended: ''
      },
      applyForm:{
        applyDate:'',
        applyFilepath:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.qqtn.com%2Farticle%2Farticle_284105_1.html&psig=AOvVaw1KhEPi6X04DUlDsdxYjeb_&ust=1600852741764000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCC-qq3_OsCFQAAAAAdAAAAABAI',
        applyType:'',
        id:'',
        procInstId:'',
        processDefinitionId:'',
        reason:'',
        status:'',
        userId:'',
      },
      // 上传相关data
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      // spForm:{
      //   id: "",
      //   procDefKey: "",
      //   procDefName: "",
      //   taskDefKey: "",
      //   taskName: "",
      //   taskType: "",
      //   candidateName: "",
      //   candidateIds: ""
      // },
      itemName:["",],
      ipLbName:[],
      spInfo:{
        procDefKey:"BeforSubsidize"
      },
      spPeoInfos:'',
       //审核状态
      statusType: [
        { key: '审批中', value: 'PENDING'},
        { key: '待审批', value: 'WAITING_FOR_APPROVAL' },
        { key: '审批成功', value: 'APPROVAL_SUCCESS' },
        { key: '审批失败', value: 'APPROVAL_FAILED' },
      ],
      // 组织类型
      // orgType: [
      //   { key: '部门' , value: 0 },
      //   { key: '注册企业', value: 1 },
      //   { key: '虚拟部门' , value: 2 },
      // ],
      //是否有效
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

      // 选择org数据
      selecthxrs: [],
      // 选中的id
      selectedhxrs: [],
      // 选中的namde
      selectedhxrsName:[],
      // 转化成字符串
      selectStrName:'',
      selectStrId:'',
      // 请求数据参数
      formInline: {
        current: 1,
        size: 20,
        id:null
      },
      //用户数据
      userData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 调添加审批接口传的数据
      upInfo:[
        {
          id:'',
          taskType:'',
          candidateName:'',
          candidateIds:''
        }
      ],
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
    this.getdataOrg()
  },
  mounted(){
    // this.$set(this.chooseVal,)
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取数据方法
    getdata(parameter) {
      this.loading = true
      // 获取用户列表
      sqflow(this.formInline).then(res => {
        this.loading = false
        if (res.statusCode !== 200) {
          this.$message({
            type: 'info',
            message: res.message
          })
        } else {
          // console.log(res);
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
      // 获取审批人员信息
      spPeoInfo(this.spInfo).then(res => {
        this.loading = false
        if (res.statusCode !== 200) {
          this.$message({
            type: 'info',
            message: res.message
          })
        } else {
          console.log(res);

          this.spPeoInfos=res.data.records
          // console.log(this.spPeoInfos);
          for(var q=0;q<this.spPeoInfos.length;q++){
            this.$set(this.spPeoInfos[q],'spInput','')
            this.$set(this.spPeoInfos[q],'radios','assignee')
            this.$set(this.spPeoInfos[q],'spId','')
          }
          // console.log(this.spPeoInfos);
        }
      })
    },
    getdataOrg(){
       // 获取类型
      spOrg(this.spOrgInfo).then(res => {
        this.loading = false
        if (res.statusCode !== 200) {
          this.$message({
            type: 'info',
            message: res.message
          })
        } else {
          // console.log(res);

          this.spOrgTypeInfos=res.data
          // console.log(this.spOrgTypeInfos);
          if(this.spOrgTypeInfos){
            for(var i=0;i<this.spOrgTypeInfos.length;i++){
            // console.log(this.spOrgTypeInfos[i]);
            this.itemName.push(this.spOrgTypeInfos[i].name)
            }
          }
          // console.log(this.itemName);
        }
      })
    },
    go(row, column, cell, event){
      console.log(row, column, cell, event);
    },
    // 选中的多选框
    selects(selection){
      // console.log(selection);
      this.selecthxrs=[],
      this.selectedhxrs=[],
      this.selectedhxrsName=[]
      this.selecthxrs=selection
      this.selectTab=this.selecthxrs
      // console.log(selection);
      // console.log(this.selecthxrs);
      for(var i=0;i<this.selecthxrs.length;i++){
        this.selectedhxrs.push(this.selecthxrs[i].id)
        // console.log(this.selectedhxrs);
        this.selectedhxrsName.push(this.selecthxrs[i].userName)
        // console.log(this.selectedhxrsName);
      }
      // console.log(this.selectedhxrs);
      // console.log(this.selectedhxrsName);
        this.selectStrName=this.selectedhxrsName.join(',')
        this.selectStrId=this.selectedhxrs.join(',')
     
      // console.log(this.selectStrName);

    },
    // 选中的多选框
    selectss(selection){
      // console.log(selection);
      this.selecthxrs=[],
      this.selectedhxrs=[],
      this.selectedhxrsName=[]
      this.selecthxrs=selection
      this.selectTab=this.selecthxrs
      // console.log(selection);
      // console.log(this.selecthxrs);
      for(var i=0;i<this.selecthxrs.length;i++){
        this.selectedhxrs.push(this.selecthxrs[i].id)
        // console.log(this.selectedhxrs);
        this.selectedhxrsName.push(this.selecthxrs[i].name)
        // console.log(this.selectedhxrsName);
      }
      // console.log(this.selectedhxrs);
      // console.log(this.selectedhxrsName);
        this.selectStrName=this.selectedhxrsName.join(',')
        console.log(this.selectedhxrs);
        this.selectStrId=this.selectedhxrs.join(',')

     
      // console.log(this.selectStrName);

    },
    chooseTab(){
      // console.log(12333);
      // // this
      // this.select(selection)
      // console.log(this.selecthxrs);
    },
    changeRadio(j){
      // console.log(j);
      this.indexs=j
      // console.log(this.spPeoInfos[j].radios);
      if(this.spPeoInfos[j].radios=='assignee'){
        this.chooseHx = true
      }else if(this.spPeoInfos[j].radios=='candidateUser'){
        this.chooseHxs = true
      }else if(this.spPeoInfos[j].radios=='candidateGroup'){
        this.chooseGroup = true
      }

    },
    handleChoose:function(index,row){
      this.selectedhxrs=[],
      this.selectStrName=[]
      this.selectedhxrs.push(row.id)
      this.selectStrName=row.userName

    },
    hxrSave(){
      this.chooseHx = false
      this.spPeoInfos[this.indexs].spInput=this.selectStrName
      this.spPeoInfos[this.indexs].spId=this.selectedhxrs
    },
    hxrsSave(){
      this.chooseHxs=false
      this.spPeoInfos[this.indexs].spInput=this.selectStrName
      this.spPeoInfos[this.indexs].spId=this.selectStrId

      },
    cgSave(){
      this.chooseGroup = false
      this.spPeoInfos[this.indexs].spInput=this.selectStrName
      this.spPeoInfos[this.indexs].spId=this.selectStrId

    },
    spUserSave(){
      // this.upInfo
      console.log(this.spPeoInfos);
    
      if(this.spPeoInfos){
        for(var e=0;e<this.spPeoInfos.length;e++){
          this.upInfo[e]={id:this.spPeoInfos[e].id,
                          taskType:this.spPeoInfos[e].radios,
                          candidateName:this.spPeoInfos[e].spInput,
                          candidateIds:this.spPeoInfos[e].spId}
        }
      }
      addSpUser(this.upInfo)
      .then(res=>{
        if(res.statusCode == 200){
          console.log('成功');
        }else{
          console.log(err);
        }
      })
    },
    apply:function(index,row){
      // this.loading = true
      this.applyDia =true
      // console.log(row,index);
      this.applyForm.processDefinitionId=row.id
    },
    // 上传相关方法
    // handleSuccess(response, file, fileList) {
    //   this.fileList = fileList
    // },
    // handleFile(item){
    //     this.fileObj = item.file
    //   const formData = new FormData()
    //   formData.append('file', this.fileObj)
      
      
      // let formData = new FormData();
      // formData.set("file", fileObj.file);
      // applyUpload(formData).then(res=>{
      //     alert('111');
      //     if(res.statusCode == 200){
      //       console.log('chengg');
      //     }else{
      //       console.log("err");
      //     }
      //   })
      //   .catch(err=>{
      //     console.log(err);
      //   })
//         axios.interceptors.request.use(
//         config => {
//           console.log(config, "request");
//           if (config.method === "post") {
//             let curPost = config.url.split("/")[config.url.split("/").length - 1];
//             if (curPost === "uploadpicture" || curPost === "uploadfile") {
//               return config; // 这里对上传文件/图片的 api 不做传参序列化处理
//             } else {
//             config.data = qs.stringify(config.data);
//             return config;
//           }
//         }
//         return config;
//       },
//       error => {
//         return Promise.reject(error);
//       }
//  );

    // },
    // onUp(e,file,fileList){
    //   console.log('111');
    //   console.log(e);
    // },
    // up(file){
    //   console.log(file);
    //   this.upVal = file
    //   console.log(this.upVal);
    // },
    // handleExceed(files, fileList) {
    //   this.$message.warning(`最多上传 1 个文件`)
    // },

    // // 上传文件
    //  submitUpload() {
    //     // this.$refs.upload.submit(){};
    //     beforeUpload:{

    //     }
    //     let form = this.$refs['upload']
    //     let formData = new FormData()
    //     formData.append('file', this.fileList[0])
    //   // console.log(form);
    //     // console.log(this.fileList[0]);
    //     console.log(formData);
    //     // console.log(this.upVal.raw);
    //     applyUpload(formData).then(res=>{
    //       alert('111');
    //       if(res.statusCode == 200){
    //         console.log('chengg');
    //       }else{
    //         console.log("err");
    //       }
    //     })
    //     .catch(err=>{
    //       console.log(err);
    //     })
    //   },
    submitFormApply(){
      // console.log(this.applyForm);
      // this.loading = true
      applyOne(this.applyForm).then(res =>{
        this.loading = false
        this.applyDia=false
        if(res.statusCode == 200){
          this.$message({
            type: 'success',
            message: '申请成功'
          })
        }else{
            this.$message({
            type: 'info',
            message: '申请失败'
          })
          }
      })
      .catch(err => {
          this.$message.error('申请失败，请稍后再试！')
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
      })
      
    },
    handleAddSp:function(){
      this.addFormVisibleSp =true
      
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
      }else if (dialog == 'sp') {
        this.addFormVisibleSp = false
      }else if (dialog == 'hxr') {
        this.chooseHx = false
      }else if (dialog == 'hxrs') {
        this.chooseHxs = false
      }else if (dialog == 'cg') {
        this.chooseGroup = false
      }else if (dialog == 'apply') {
        this.applyDia = false
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
  /* display: flex; */
}
.spLi{
  list-style: none;
  border: 2px solid black;
  width: 20%;
  border-radius: 5px;
  padding: 5px;
  background-color:#F5F5F5 ;
  display: inline-block;
  /* flex: 1; */
  margin-right: 40px;
  margin-bottom: 10px;
}
.spLi .pad{
  padding: 5px 0;
  display: inline-block;
}
.spLi .spType .el-radio-group{
  display: inline-block!important;
  padding-top: 5px;
}
.el-radio{
  margin-right: 3px!important;
}
.el-input {
width: 80%;

}
.el-input .el-input__inner{
height: 25px!important;
line-height: 25px!important;
outline-color: black!important;
}
.el-button{
  margin-right: 10px;
  margin-top: 20px;
}
.spSave{
  margin-left: 43%;
}

</style>

 