// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 登录
import login from '@/views/login';
// 首页
import index from '@/views/index';
// 申报指南
    // 计划类目
import planType from '../views/sbtip/planType.vue'


// 注册管理
    // 企业信息
import businessNews from '../views/signMange/businessNews.vue'
    //附件信息
import attachmentNews from '../views/signMange/attachmentNews.vue'

    //专家注册管理
import expertSign from '../views/signMange/expertSign.vue'
    //注册流程
import signFolow from '../views/signMange/signFolow.vue'

// 审批管理
    // 可申请流程
import follow from '../views/approvalMange/follow.vue'
    //待审批
import notAppro from '../views/approvalMange/notAppro.vue'
    //待办
import noDeal from '../views/approvalMange/noDeal.vue'
// 我的申请
import mySqList from '../views/approvalMange/mySqList.vue'

    //审批中
import inAppro from '../views/approvalMange/inAppro.vue'
    //已完成
import done from '../views/approvalMange/done.vue'
    // 流程图
import folowPic from '../views/folowPic.vue'



//字典维护
    //字典类目
import dicSort from '../views/dicnaryPro/dicSort.vue'
    // 字典数据
import dicData from '../views/dicnaryPro/dicData.vue'
    // 消息记录
import newsRecord from '../views/dicnaryPro/newsRecord.vue'
    // 消息模板
import newsTemplate from '../views/dicnaryPro/newsTemplate.vue'

// 系统设置
    // 用户管理
import userManger from '../views/xtset/userManger.vue'
    //部门管理
import classManger from '../views/xtset/classManger.vue'
    //角色管理
import roleManger from '../views/xtset/roleManger.vue'
    //角色管理
import menuManger from '../views/xtset/menuManger.vue'


















/**
 * 基础菜单
 */
// 商品管理
import Goods from '@/views/goods/Goods';
// 机器信息管理
import Machine from '@/views/machine/Machine';
// 货道信息管理
import MachineAisle from '@/views/machine/MachineAisle';
/**
 * 订单管理
 */
// 交易订单
import Order from '@/views/pay/Order';
/**
 * 系统管理
 */
// 用户管理
import user from '@/views/system/user';
// 菜单管理
import Module from '@/views/system/Module';
// 角色管理
import Role from '@/views/system/Role';
// 公司管理
import Dept from '@/views/system/Dept';
// 系统环境变量
import Variable from '@/views/system/Variable';
// 权限管理
import Permission from '@/views/system/Permission';
/**
 * 支付管理
 */
// 支付配置信息
import MachineConfig from '@/views/machine/MachineConfig';
// 支付配置
import Config from '@/views/pay/Config';
/**
 * 数据监控
 */
// 监控查询
import druidLogin from '@/views/druid/login';


// 启用路由
Vue.use(Router);

// 导出路由 
export default new Router({
    mode:'history',
    routes: [{
        path: '/',
        name: '',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/login',
        name: '登录',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    },{
        path: '/folowPic',
        name: ' 流程图',
        component: folowPic,
        meta: {
                // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
            requireAuth: true
        }      
    },{
        path: '/index',
        name: '首页',
        component: index,
        iconCls: 'el-icon-tickets',
        children: [
            // 申报指南
            {
                path: '/sbtip/planType',
                name: ' 计划类目',
                component: planType,
                meta: {
                        // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                    requireAuth: true
                }
                    
            },
            

            //注册管理
            {
                path: '/signMange/businessNews',
                name: ' 企业信息',
                component: businessNews,
                meta: {
                        // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                    requireAuth: true
                }
                    
            },  
            {
                path: '/signMange/attachmentNews',
                name: ' 附件信息',
                component: attachmentNews,
                meta: {
                        // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                    requireAuth: true
                }
                    
            },  
            {
                path: '/signMange/expertSign',
                name: ' 专家注册管理',
                component: expertSign,
                meta: {
                        // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                    requireAuth: true
                }
                    
            },
            {
                path: '/signMange/signFolow',
                name: ' 注册流程',
                component: signFolow,
                meta: {
                        // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                    requireAuth: true
                }      
            },
            // 审批管理
            {
                path: '/approvalMange/follow',
                name: ' 可申请流程',
                component: follow,
                meta: {
                        // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                    requireAuth: true
                }
                    
            }, 
            {
                path: '/approvalMange/mySqList',
                name: ' 我的申请',
                component: mySqList,
                meta: {
                        // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                    requireAuth: true
                }
                    
            },
            {
                path: '/approvalMange/noDeal',
                name: ' 待办',
                component: noDeal,
                meta: {
                        // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                    requireAuth: true
                }

            } ,
            {
                path: '/approvalMange/notAppro',
                name: ' 待审批',
                component: notAppro,
                meta: {
                        // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                    requireAuth: true
                }
                    
            },  
            {
                path: '/approvalMange/inAppro',
                name: ' 审批中',
                component: inAppro,
                meta: {
                        // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                    requireAuth: true
                }
                    
            },
            {
                path: '/approvalMange/done',
                name: ' 已完成',
                component: done,
                meta: {
                        // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                    requireAuth: true
                }      
            },
            
            
            //字典维护
        {
            path: '/dicnaryPro/dicSort',
            name: ' 字典类目',
            component: dicSort,
            meta: {
                    // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                requireAuth: true
            }
                
        },
        {
            path: '/dicnaryPro/dicData',
            name: ' 字典数据',
            component: dicData,
            meta: {
                    // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                requireAuth: true
            }
                
        },
        {
            path: '/dicnaryPro/newsRecord',
            name: ' 消息记录',
            component: newsRecord,
            meta: {
                    // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                requireAuth: true
            }
                
        },
        {
            path: '/dicnaryPro/newsTemplate',
            name: ' 消息模板',
            component: newsTemplate,
            meta: {
                    // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                requireAuth: true
            }
                
        },








            // 系统设置
        {
            path: '/xtset/userManger',
            name: ' 用户管理',
            component: userManger,
            meta: {
                // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                requireAuth: true
            }
        },
        {
            path: '/xtset/classManger',
            name: ' 部门管理',
            component: classManger,
            meta: {
                // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                requireAuth: true
            }
            
        },
        {
            path: '/xtset/roleManger',
            name: ' 角色管理',
            component: roleManger,
            meta: {
                // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                requireAuth: true
            }
            
        },
        {
            path: '/xtset/menuManger',
            name: ' 菜单管理',
            component: menuManger,
            meta: {
                // 判断该用户是否已经登录，成功登录的用户可以跳转，否则会重定向到登录页面
                requireAuth: true
            }
            
        },
        
        {
            path: '/goods/Goods',
            name: '商品管理',
            component: Goods,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/machine/Machine',
            name: '机器信息管理',
            component: Machine,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/machine/MachineAisle',
            name: '货道信息管理',
            component: MachineAisle,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/pay/Order',
            name: '交易订单',
            component: Order,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/user',
            name: '用户管理',
            component: user,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Module',
            name: '菜单管理',
            component: Module,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Role',
            name: '角色管理',
            component: Role,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Dept',
            name: '公司管理',
            component: Dept,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Variable',
            name: '系统环境变量',
            component: Variable,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/system/Permission',
            name: '权限管理',
            component: Permission,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/machine/MachineConfig',
            name: '支付配置信息',
            component: MachineConfig,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/pay/Config',
            name: '支付配置',
            component: Config,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/druid/login',
            name: '监控查询',
            component: druidLogin,
            meta: {
                requireAuth: true
            }
        }]
    }]
})