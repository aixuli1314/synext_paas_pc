/**
 * 字典维护  字典数据
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">字典维护</el-breadcrumb-item>
      <el-breadcrumb-item>字典数据</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="请选择类别路径：">
        <el-select size="small" v-model="valuePathKey" placeholder="请选择" class="userRole" @change="changePathkey()">
          <el-option v-for="type in pathKeyData" :label="type.pathkey" :value="type.pathkey" :key="type.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="搜索：">
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="inputVal" placeholder="输入ID" clearable @clear="refresh"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleAdd()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small"  :data="userData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
 <!-- <el-table-column align="center" type="selection" width="50"> -->
      <!-- </el-table-column> -->
      <el-table-column sortable  prop="id" label="ID" width="200"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="name" label="名称" width="200"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="comcode" label="字典路径" width="200" show-overflow-tooltip>
      </el-table-column>
        <!-- <el-table-column sortable prop="orgTypePathKey" label="部门类型" width="200" show-overflow-tooltip>
      </el-table-column> -->
      <!-- <el-table-column sortable prop="remark" label="描述" width="200" show-overflow-tooltip>
      </el-table-column> -->
      <el-table-column sortable prop="pid" label="父级ID" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="code" label="编码" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="val" label="值" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="90">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog title="修改字典数据" :visible.sync="editFormVisible" width="30%" @click='closeEdit("edit")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="字典路径" prop="pathkey">
          <el-input size="small" v-model="editForm.comcode" auto-complete="off" placeholder="请输入字典路径"></el-input>
        </el-form-item>
        <!-- <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
        </el-form-item>
         <el-form-item label="描述" prop="remark">
          <el-input size="small" v-model="editForm.remark" auto-complete="off" placeholder="请输入描述"></el-input>
        </el-form-item> -->
        <el-form-item label="父级ID" prop="pid">
          <el-input size="small" v-model="editForm.pid" auto-complete="off" placeholder="请输入父级ID"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input size="small" v-model="editForm.code" auto-complete="off" placeholder="请输入编码"></el-input>
        </el-form-item>
         <el-form-item label="值" prop="val">
          <el-input size="small" v-model="editForm.val" auto-complete="off" placeholder="请输入值"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeEdit("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitFormEdit('editForm')">保存</el-button>
      </div>
    </el-dialog>
    <!-- 添加页面 -->
    <el-dialog title="添加字典数据" :visible.sync="addFormVisible" width="30%" @click='closeAdd("add")'>
      <el-form label-width="80px" ref="editForm" :model="editForm" :rules="rules">
        <el-form-item label="名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="字典路径" prop="pathkey">
          <el-input size="small" v-model="editForm.comcode" auto-complete="off" placeholder="请输入字典路径"></el-input>
        </el-form-item>
        <!-- <el-form-item label="部门类型" prop="orgTypePathKey">
          <el-input size="small" v-model="editForm.orgTypePathKey" auto-complete="off" placeholder="请输入部门类型"></el-input>
        </el-form-item>
         <el-form-item label="描述" prop="remark">
          <el-input size="small" v-model="editForm.remark" auto-complete="off" placeholder="请输入描述"></el-input>
        </el-form-item> -->
        <el-form-item label="父级ID" prop="pid">
          <el-input size="small" v-model="editForm.pid" auto-complete="off" placeholder="请输入父级ID"></el-input>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input size="small" v-model="editForm.code" auto-complete="off" placeholder="请输入编码"></el-input>
        </el-form-item>
         <el-form-item label="值" prop="val">
          <el-input size="small" v-model="editForm.val" auto-complete="off" placeholder="请输入值"></el-input>
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
  dicSort,
  dicData,
  dataSearch,
  dataSave,
  dataEdit
} from '../../api/userMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      addFormVisible: false, //控制添加页面隐藏与显示
      pathKeyData:[],//pathkey下拉框
      valuePathKey:'minzu',//下拉框选择的值
      inputVal:'',
      // 编辑与添加
      editForm: {
        id: '',
        name: '',
        comcode: '',
        pathkey: '',
        // orgTypePathKey: '',
        pid: '',
        code: '',
        // remark: '',
        val: ''
        // token: localStorage.getItem('logintoken')
      },
      // rules表单验证
      rules: {
        // name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
       
        // comcode: [{ required: true, message: '请输入字典路径', trigger: 'blur' }],
        // orgTypePathKey: [
        //   { required: true, message: '请输入部门类型', trigger: 'blur' }
        // ],
        //  remark: [{ required: true, message: '请输入描述', trigger: 'blur' }],
       
        // pid: [{ required: true, message: '请输入父级ID', trigger: 'blur' }],
        // code: [
        //   { required: true, message: '请输入编码', trigger: 'blur' }
        // ],
        //  val: [{ required: true, message: '请输入值', trigger: 'blur' }],
      },
      // 请求数据参数
      formInline: {
        current: 1,
        size: 10,
        pathkey:'minzu',
        id:''
      },
      // 请求字典类别数据参数
      formInlineSort: {
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
    this.getDicSortData()
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取数据方法
    getdata(parameter) {
      this.loading = false
      // 模拟数据开始
      // let res = {
      //   code: 0,
      //   msg: null,
      //   count: 12,
      //   data: [
      //     {
      //       addUser: '1',
      //       editUser: '1',
      //       addTime: null,
      //       editTime: 1527411068000,
      //       id: 1,
      //       name: '民族字典',
      //       comcode: 'root,mydataid',
      //       orgTypePathKey: 'Kjj',
      //       remark:'XXXXXXXXXXXXXXXXX',
      //       pid:'root',
      //       code:'XXXX',
      //       val:'XXXXXXXXX'
      //     }
    
      //   ]
      // }
      // this.loading = false
      // this.userData = res.data
      // // 分页赋值
      // this.pageparm.currentPage = this.formInline.page
      // this.pageparm.pageSize = this.formInline.limit
      // this.pageparm.total = res.count
      // 模拟数据结束

      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      // 获取用户列表
      dicData(this.formInline).then(res => {
        this.loading = false
        if (res.statusCode != 200) {
          this.$message({
            type: 'info',
            message: res.message
          })
        } else {
          // console.log(res);
          this.userData = res.data.records
          // 分页赋值
          this.pageparm.currentPage = res.data.current
          this.pageparm.pageSize = res.data.size
          this.pageparm.total = res.data.total
        }
      })
    },
    // 获取字典类别地址
    getDicSortData() {
      this.loading = true
      // 获取用户列表
      dicSort(this.formInlineSort).then(res => {
        this.loading = false
        if (res.statusCode == 200) {
          // console.log(res);
          var m =res.data.records
          for(var i=0;i<m.length;i++){
            var info={}
            info.id= m[i].id
            info.pathkey=m[i].pathkey
            // 循环遍历input
            this.pathKeyData.push(info)
          }
          // console.log(this.pathKeyData);
       
          
        } else {
          this.$message({
            type: 'info',
            message: res.message
          })
        }
      })
    },
    changePathkey(){
      this.formInline.pathkey=this.valuePathKey
      this.editForm.pathkey=this.valuePathKey
      this.getdata(this.formInline) 
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
      this.editForm.comcode = row.comcode
      // this.editForm.orgTypePathKey = row.orgTypePathKey
      // this.editForm.remark = row.remark
      this.editForm.pid = row.pid
      this.editForm.code = row.code
      this.editForm.val = row.val 
    },
    handleAdd:function(index, row){
      this.addFormVisible = true
      this.editForm.name = ''
      this.editForm.comcode = ''
      // this.editForm.orgTypePathKey = ''
      // this.editForm.remark = ''
      this.editForm.pid = ''
      this.editForm.code = ''
      this.editForm.val = ''
    },
    // 编辑提交方法
    submitFormEdit(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          // 请求方法
          this.editForm.pathkey=this.valuePathKey
          // console.log(this.editForm.pathkey);
          dataEdit(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.statusCode ==200) {
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
       // 添加提交方法
    submitFormAdd(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          // 请求方法
          this.editForm.pathkey=this.valuePathKey
          dataSave(this.editForm)
            .then(res => {
              this.addFormVisible = false
              this.loading = false
              if (res.statusCode ==200) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '数据保存成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.addFormVisible = false
              this.loading = false
              this.$message.error('保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 关闭编辑弹出框
    closeEdit(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } 
    },
       // 关闭增加弹出框
    closeAdd(dialog) {
      if (dialog == 'add') {
        this.addFormVisible = false
      }
      
    },
    // 删除用户
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除
          userDelete(row.id)
            .then(res => {
              if (res.success) {
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
    //数据格式化
    changeArr(data) {
      var pos = {}
      var tree = []
      var i = 0
      while (data.length != 0) {
        if (data[i].pId == 0) {
          tree.push({
            id: data[i].id,
            name: data[i].name,
            pId: data[i].pId,
            open: data[i].open,
            checked: data[i].checked,
            children: []
          })
          pos[data[i].id] = [tree.length - 1]
          data.splice(i, 1)
          i--
        } else {
          var posArr = pos[data[i].pId]
          if (posArr != undefined) {
            var obj = tree[posArr[0]]
            for (var j = 1; j < posArr.length; j++) {
              obj = obj.children[posArr[j]]
            }

            obj.children.push({
              id: data[i].id,
              name: data[i].name,
              pId: data[i].pId,
              open: data[i].open,
              checked: data[i].checked,
              children: []
            })
            pos[data[i].id] = posArr.concat([obj.children.length - 1])
            data.splice(i, 1)
            i--
          }
        }
        i++
        if (i > data.length - 1) {
          i = 0
        }
      }
      return tree
    },
    // 选中菜单
    changemenu(arr) {
      let change = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
          change.push(arr[i].id)
        }
      }
      return change
    },
    // 菜单权限-保存
    menuPermSave() {
      let parm = {
        userId: this.saveroleId,
        deptIds: ''
      }
      let node = this.$refs.tree.getCheckedNodes()
      let moduleIds = []
      if (node.length != 0) {
        for (let i = 0; i < node.length; i++) {
          moduleIds.push(node[i].id)
        }
        parm.deptIds = JSON.stringify(moduleIds)
      }
      UserDeptSave(parm)
        .then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '权限保存成功'
            })
            this.dataAccessshow = false
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

 