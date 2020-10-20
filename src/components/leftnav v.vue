/**
* 左边菜单
*/ 
<template>
  <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path" unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b">
    <div class="logobox">
      <img class="logoimg" src="../assets/img/logo1.png" alt="">
      <img class="logoimg" src="../assets/img/logo2.png" alt="">
    </div>
    <el-submenu v-for="menu in allmenu" :key="menu.id" :index="menu.name">
      <template slot="title">
        <i class="iconfont" :class="menu.icon"></i>
        <span>{{menu.name}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item v-for="chmenu in menu.children" :index="chmenu.url" :key="chmenu.id" style="paddingLeft:70px;">
          <i class="iconfont" :class="chmenu.icon"></i>
          <span>{{chmenu.name}}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
import { menus } from '../api/userMG'
export default {
  name: 'leftnav',
  data() {
    return {
      collapsed: false,
      allmenu: []
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    // 获取图形验证码
    // let res = {
    //   success: true,
    //   data: [
    // //     {
    // //       menuid: 11,
    // //       icon: 'li-icon-xiangmuguanli',
    // //       menuname: '基础管理',
    // //       hasThird: null,
    // //       url: null,
    // //       menus: [
    // //         {
    // //           menuid: 2,
    // //           icon: 'icon-cat-skuQuery',
    // //           menuname: '商品管理',
    // //           hasThird: 'N',
    // //           url: 'goods/Goods',
    // //           menus: null
    // //         }
    // //       ]
    // //     },
    // //     {
    // //       menuid: 33,
    // //       icon: 'li-icon-dingdanguanli',
    // //       menuname: '订单管理',
    // //       hasThird: null,
    // //       url: null,
    // //       menus: [
    // //         {
    // //           menuid: 34,
    // //           icon: 'icon-order-manage',
    // //           menuname: '交易订单',
    // //           hasThird: 'N',
    // //           url: 'pay/Order',
    // //           menus: null
    // //         }
    // //       ]
    // //     },
    // //     {
    // //       menuid: 71,
    // //       icon: 'li-icon-xitongguanli',
    // //       menuname: '系统管理',
    // //       hasThird: null,
    // //       url: null,
    // //       menus: [
    // //         {
    // //           menuid: 72,
    // //           icon: 'icon-cus-manage',
    // //           menuname: '用户管理',
    // //           hasThird: 'N',
    // //           url: 'system/user',
    // //           menus: null
    // //         },
    // //         {
    // //           menuid: 174,
    // //           icon: 'icon-cms-manage',
    // //           menuname: '菜单管理',
    // //           hasThird: 'N',
    // //           url: 'system/Module',
    // //           menus: null
    // //         },
    // //         {
    // //           menuid: 73,
    // //           icon: 'icon-news-manage',
    // //           menuname: '角色管理',
    // //           hasThird: 'N',
    // //           url: 'system/Role',
    // //           menus: null
    // //         },
    // //         {
    // //           menuid: 74,
    // //           icon: 'icon-cs-manage',
    // //           menuname: '公司管理',
    // //           hasThird: 'N',
    // //           url: 'system/Dept',
    // //           menus: null
    // //         },
    // //         {
    // //           menuid: 75,
    // //           icon: 'icon-promotion-manage',
    // //           menuname: '系统环境变量',
    // //           hasThird: 'N',
    // //           url: 'system/Variable',
    // //           menus: null
    // //         },
    // //         {
    // //           menuid: 76,
    // //           icon: 'icon-cms-manage',
    // //           menuname: '权限管理',
    // //           hasThird: 'N',
    // //           url: 'system/Permission',
    // //           menus: null
    // //         }
    // //       ]
    // //     },
    // //     {
    // //       menuid: 128,
    // //       icon: 'li-icon-shangchengxitongtubiaozitihuayuanwenjian91',
    // //       menuname: '支付管理',
    // //       hasThird: null,
    // //       url: null,
    // //       menus: [
    // //         {
    // //           menuid: 129,
    // //           icon: 'icon-provider-manage',
    // //           menuname: '支付配置信息',
    // //           hasThird: 'N',
    // //           url: 'machine/MachineConfig',
    // //           menus: null
    // //         },
    // //         {
    // //           menuid: 175,
    // //           icon: 'icon-provider-manage',
    // //           menuname: '支付配置',
    // //           hasThird: 'N',
    // //           url: 'pay/Config',
    // //           menus: null
    // //         }
    // //       ]
    // //     },
    // //       {
    // //       menuid: 1,
    // //       icon: 'li-icon-xiangmuguanli',
    // //       menuname: '系统首页',
    // //       hasThird: null,
    // //       url: null,
    // //       menus: [
    // //         // {
    // //         //   menuid: 12,
    // //         //   menuname: '代办通知',
    // //         //   hasThird: 'N',
    // //         //   url: 'goods/Goods',
    // //         //   menus: null
    // //         // }, 
    // //         // {
    // //         //   menuid: 13,
    // //         //   menuname: '消息提醒',
    // //         //   hasThird: 'N',
    // //         //   url: 'goods/Goods',
    // //         //   menus: null
    // //         // },
    // //         //  {
    // //         //   menuid: 14,
    // //         //   menuname: '图形管理',
    // //         //   hasThird: 'N',
    // //         //   url: 'goods/Goods',
    // //         //   menus: null
    // //         // }
    // //       ]
    // //     },
    // //     {
    // //       menuid: 2,
    // //       icon: 'li-icon-dingdanguanli',
    // //       menuname: '注册管理',
    // //       hasThird: null,
    // //       url: null,
    // //       menus: [
    // //         // {
    // //         //   menuid: 21,
    // //         //   menuname: '单位/专家注册',
    // //         //   hasThird: 'N',
    // //         //   url: 'pay/Order',
    // //         //   menus: null
    // //         // },
    // //         //  {
    // //         //   menuid: 22,
    // //         //   menuname: '单位注册审核',
    // //         //   hasThird: 'N',
    // //         //   url: 'pay/Order',
    // //         //   menus: null
    // //         // },
    // //         //  {
    // //         //   menuid: 23,
    // //         //   menuname: '专家注册审核',
    // //         //   hasThird: 'N',
    // //         //   url: 'pay/Order',
    // //         //   menus: null
    // //         // },
    // //         {
    // //           menuid: 24,
    // //           menuname: '专家注册管理',
    // //           hasThird: 'N',
    // //           url: 'signMange/expertSign',
    // //           menus: null
    // //         },
    // //         {
    // //           menuid: 25,
    // //           menuname: '注册流程',
    // //           hasThird: 'N',
    // //           url: 'signMange/signFolow',
    // //           menus: null
    // //         },
    // //         {
    // //           menuid: 26,
    // //           menuname: '企业信息',
    // //           hasThird: 'N',
    // //           url: 'signMange/businessNews',
    // //           menus: null
    // //         },
    // //         {
    // //           menuid: 27,
    // //           menuname: '附件信息',
    // //           hasThird: 'N',
    // //           url: 'signMange/attachmentNews',
    // //           menus: null
    // //         },

    // //       ]
    // //     },
    // //     {
    // //       menuid: 3,
    // //       icon: 'li-icon-xitongguanli',
    // //       menuname: '申报指南',
    // //       hasThird: null,
    // //       url: null,
    // //       menus: [
    // //         {
    // //           menuid: 31,
    // //           menuname: '计划类目',
    // //           hasThird: 'N',
    // //           url: 'sbtip/planType',
    // //           menus: null
    // //         },
    // //         // {
    // //         //   menuid: 32,
    // //         //   menuname: '申报模板',
    // //         //   hasThird: 'N',
    // //         //   url: 'system/Module',
    // //         //   menus: null
    // //         // },
            
    // //       ]
    // //     },
    // //     {
    // //       menuid: 4,
    // //       icon: 'icon-order-manage',
    // //       menuname: '业务办理',
    // //       hasThird: null,
    // //       url: null,
    // //       menus: [
    // //         // {
    // //         //   menuid: 41,
    // //         //   menuname: '项目受理',
    // //         //   hasThird: 'N',
    // //         //   url: 'machine/MachineConfig',
    // //         //   menus: null
    // //         // },
    // //         // {
    // //         //   menuid: 42,
    // //         //   menuname: '项目审核',
    // //         //   hasThird: 'N',
    // //         //   url: 'pay/Config',
    // //         //   menus: null
    // //         // },
    // //         //  {
    // //         //   menuid: 43,
    // //         //   menuname: '专家评估',
    // //         //   hasThird: 'N',
    // //         //   url: 'machine/MachineConfig',
    // //         //   menus: null
    // //         // },
    // //         // {
    // //         //   menuid: 44,
    // //         //   menuname: '专家评审',
    // //         //   hasThird: 'N',
    // //         //   url: 'pay/Config',
    // //         //   menus: null
    // //         // },
    // //         //  {
    // //         //   menuid: 45,
    // //         //   menuname: '中期评估',
    // //         //   hasThird: 'N',
    // //         //   url: 'machine/MachineConfig',
    // //         //   menus: null
    // //         // },
    // //         // {
    // //         //   menuid: 46,
    // //         //   menuname: '结题',
    // //         //   hasThird: 'N',
    // //         //   url: 'pay/Config',
    // //         //   menus: null
    // //         // }
    // //       ]
    // //     },
    // //     {
    // //       menuid: 5,
    // //        icon: 'icon-cs-manage',
    // //       menuname: '统计分析',
    // //       hasThird: null,
    // //       url: null,
    // //       menus:[
    // //         // {
    // //         //   menuid: 51,
    // //         //   menuname: '受理分析',
    // //         //   hasThird: 'N',
    // //         //   url: 'system/Role',
    // //         //   menus: null
    // //         // },
    // //         // {
    // //         //   menuid: 52,
    // //         //   menuname: '审核统计',
    // //         //   hasThird: 'N',
    // //         //   url: 'system/Dept',
    // //         //   menus: null
    // //         // },
    // //         // {
    // //         //   menuid: 53,
    // //         //   menuname: '评审统计',
    // //         //   hasThird: 'N',
    // //         //   url: 'system/Variable',
    // //         //   menus: null
    // //         // },
    // //         // {
    // //         //   menuid: 54,
    // //         //   menuname: '评估统计',
    // //         //   hasThird: 'N',
    // //         //   url: 'system/Permission',
    // //         //   menus: null
    // //         // },
    // //         // {
    // //         //   menuid: 55,
    // //         //   menuname: '结题统计',
    // //         //   hasThird: 'N',
    // //         //   url: 'system/Variable',
    // //         //   menus: null
    // //         // },
    // //         // {
    // //         //   menuid: 56,
    // //         //   menuname: '业务统计',
    // //         //   hasThird: 'N',
    // //         //   url: 'system/Permission',
    // //         //   menus: null
    // //         // }
    // //       ]
    // //     }, 
    // //     {
    // //       menuid: 6,
    // //       icon: 'li-icon-shangchengxitongtubiaozitihuayuanwenjian91',
    // //       menuname: '字典维护',
    // //       hasThird: null,
    // //       url: null,
    // //       menus:[
    // //         {
    // //           menuid: 61,
    // //           menuname: '字典类目',
    // //           hasThird: 'N',
    // //           url: 'dicnaryPro/dicSort',
    // //           menus: null
    // //         },
    // //         {
    // //           menuid: 62,
    // //           menuname: '字典数据',
    // //           hasThird: 'N',
    // //           url: 'dicnaryPro/dicData',
    // //           menus: null
    // //         },
    // //         // {
    // //         //   menuid: 63,
    // //         //   menuname: '行政区划',
    // //         //   hasThird: 'N',
    // //         //   url: 'system/Variable',
    // //         //   menus: null
    // //         // },
    // //         // {
    // //         //   menuid: 64,
    // //         //   menuname: '学科专业',
    // //         //   hasThird: 'N',
    // //         //   url: 'system/Permission',
    // //         //   menus: null
    // //         // },
    // //         {
    // //           menuid: 65,
    // //           menuname: '消息模板',
    // //           hasThird: 'N',
    // //           url: 'dicnaryPro/newsTemplate',
    // //           menus: null
    // //         },
    // //         {
    // //           menuid: 66,
    // //           menuname: '消息记录',
    // //           hasThird: 'N',
    // //           url: 'dicnaryPro/newsRecord',
    // //           menus: null
    // //         },
    // //         // {
    // //         //   menuid: 67,
    // //         //   menuname: '逾期设置',
    // //         //   hasThird: 'N',
    // //         //   url: 'system/Permission',
    // //         //   menus: null
    // //         // },
    // //       ]
    // //     },
    //     {
    //       id: 7,
    //       icon: 'icon-promotion-manage',
    //       name: '系统设置',
    //       hasThird: null,
    //       hrefUrl: null,
    //       children: [
    //         {
    //           id: 71,
    //           name: '部门管理',
    //           hasThird: 'N',
    //           url: 'xtset/classManger',
    //           menus: null
    //         },
    //         {
    //           id: 72,
    //           name: '用户管理',
    //           hasThird: 'N',
    //           url: 'xtset/userManger',
    //           menus: null
    //         },
    //         //  {
    //         //   menuid: 73,
    //         //   menuname: '群组管理',
    //         //   hasThird: 'N',
    //         //   url: 'machine/MachineConfig',
    //         //   menus: null
    //         // },
    //         {
    //           id: 74,
    //           name: '角色管理',
    //           hasThird: 'N',
    //           url: 'xtset/roleManger',
    //           menus: null
    //         },
    //         //  {

    //         //   menuid: 75,
    //         //   menuname: '流程设置',
    //         //   hasThird: 'N',
    //         //   url: 'machine/MachineConfig',
    //         //   menus: null
    //         // },
    //         // {
    //         //   menuid: 76,
    //         //   menuname: '结题',
    //         //   hasThird: 'N',
    //         //   url: 'pay/Config',
    //         //   menus: null
    //         // },
    //          {
    //           id: 77,
    //           name: '菜单管理',
    //           hasThird: 'N',
    //           url: 'xtset/menuManger',
    //           menus: null
    //         },
    //       ]
    //     },
    //   ],
    //   msg: 'success'
    // }
    //       this.allmenu = res.data
    
    // menu(localStorage.getItem('logintoken'))
    //   .then(res => {
    //     console.log(JSON.stringify(res))
    //     if (res.success) {
    //       this.allmenu = res.data
    //     } else {
    //       this.$message.error(res.msg)
    //       return false
    //     }
    //   })

      menus()
      .then(res => {
        // console.log(JSON.stringify(res))
        console.log(res);
        if (res.statusCode==200) {
          this.allmenu = res.data
          console.log(this.allmenu);
        } else {
          this.$message.error(res.message)
          return false
        }
      })
      .catch(err => {
        this.$message.error('菜单加载失败，请稍后再试！')
      })
    // // 监听
    // this.$root.Bus.$on('toggle', value => {
    //   this.collapsed = !value
    // })
  }
}
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}
.logoimg {
  height: 40px;
}
</style>