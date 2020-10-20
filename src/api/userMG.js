import axios from 'axios';
import { loginreq, req ,sp,upLoad } from './axiosFun';
// 登录接口 
export const login = (params) => { return loginreq("post", "/auth/user/token?username="+params.username+'&'+"password="+params.password+'&'+"clientId="+params.clientId+'&'+"clientSecret="+params.clientSecret, params) };
// 申报指南
    // 计划类目-列表
export const planType = (params) => { return req("post", "/system/api/kjj/plantype/list",params) };
    // 搜索
export const planSearch = (params) => { return req("post", "/system/api/kjj/plantype/look", params) };
    // 保存
export const planSave = (params) => { return req("post", "/system/api/kjj/plantype/save",params) };
    // 删除
export const planDel = (params) => { return req("post", "/system/api/kjj/plantype/delete", params) };
    // 编辑
export const planEdit = (params) => { return req("post", "/system/api/kjj/plantype/update",params) };
// 注册管理
    // 企业信息-列表
export const orgNews = (params) => { return req("post", "/company/api/kjj/orgenterprise/list",params) };
    // 搜索
export const orgSearch = (params) => { return req("post", "/company/api/kjj/orgenterprise/look/"+params.id, params) };
    // 保存
export const orgSave = (params) => { return req("post", "/company/api/kjj/orgenterprise/save",params) };
    // 删除
export const orgDel = (params) => { return req("post", "/company/api/kjj/orgenterprise/delete", params) };
    // 编辑
export const orgEdit = (params) => { return req("post", "/company/api/kjj/orgenterprise/update",params) };
    // 附件信息-列表
export const attachmentNews = () => { return req("post", "/system/api/kjj/attachment/list") };
    // 搜索
export const attachmentSearch = (params) => { return req("post", "/system/api/kjj/attachment/look", params) };
    // 保存
export const attachmentSave = () => { return req("post", "/system/api/kjj/attachment/save") };
    // 删除
export const attachmentDel = (params) => { return req("post", "/system/api/kjj/attachment/delete", params) };
    // 编辑
export const attachmentEdit = () => { return req("post", "/system/api/kjj/attachment/update") };
    // 上传
export const attachmentUpload = () => { return req("post", "/system/api/kjj/attachment/upload") };
    // 专家注册管理-列表
 export const expertSign = (params) => { return req("post", "/expert/api/kjj/userexpert/list",params) };
    // 搜索
export const expertSearch = (params) => { return req("post", "/expert/api/kjj/userexpert/look", params) };
    // 保存
export const expertSave = (params) => { return req("post", "/expert/api/kjj/userexpert/save",params) };
    // 删除
export const expertDel = (params) => { return req("post", "/expert/api/kjj/userexpert/delete", params) };
    // 编辑
export const expertEdit = (params) => { return req("post", "/expert/api/kjj/userexpert/update",params) };
    // 注册流程-列表
export const signFolow = (params) => { return req("post", "/system/api/kjj/registeredflow/list",params) };
    // 搜索
export const signSearch = (params) => { return req("post", "/system/api/kjj/registeredflow/look", params) };
    // 保存
export const signSave = (params) => { return req("post", "/system/api/kjj/registeredflow/save",params) };
    // 删除
export const signDel = (params) => { return req("post", "/system/api/kjj/registeredflow/delete", params) };
    // 编辑
export const signEdit = (params) => { return req("post", "/system/api/kjj/registeredflow/update",params) };
// 审批管理
    //可申请流程：
export const sqflow = (params) => { return req("get", "/open/api/kjj/process/listProcess?current="+params.current+"&"+"size="+params.size,params) };
// |--新增按钮(带权限)：
export const flowAdd = (params) => { return sp("post", "/system/api/kjj/activiti/deployment/deployProcessByText?text="+params.text+"&deploymentName="+params.deploymentName,params) };
// 添加审批人员
export const addSpUser = (params) => { return req("post", "/open/api/kjj/userTask/update",params) };
// 流程删除接口：(process为1时表示删除历史记录，其他或不传为不删记录)
export const flowLook = (params) => { return req("post", "/open/api/kjj/activiti/deployment/image?deploymentId=1",params) };
// 流程删除
export const flowDel = (params) => { return req("post", "/open/api/kjj/activiti/deployment/delete?deploymentId=1&process=1",params) };
//// 待审批 状态为1时，为待我审批
export const spNo = (params) => { return req("post", "/open/api/kjj/activiti/task/list?state="+params.state,params) };
// 审批按钮
export const spBtn = (params) => { return req("post", "/open/api/kjj/activiti/task/complete",params) };
// 审批中  状态为2时，非待我审批
export const spin = (params) => { return req("post", "/open/api/kjj/activiti/task/list?state=2",params) };
// 已完成  状态为3时，审批结束
export const done = (params) => { return req("post", "/open/api/kjj/activiti/task/list?state=3",params) };
// 审批人员
export const spPeoInfo = (params) => { return req("post", "/open/api/kjj/userTask/list",params) };
// 获取类型
export const spOrg = (params) => { return req("post", "/system/api/kjj/org/getAll",params) };

// 启动流程
export const applyOne = (params) => { return req("post", "/member/process/startProcessInstance?processDefinitionId="+params.processDefinitionId+'&applyFilepath='+params.applyFilepath,params) };
// 申请之后上传
export const applyUpload = (params) => { return upLoad("post", "/local/upload",params) };
// 待办
export const noDeals = () => { return req('post','/open/api/kjj/process/todoTask')}
//审核
export const noDealSh = (params) => { return req('post','/open/api/kjj/process/complate/'+params.taskId+'?applyflowId='+params.applyflowId+'&content='+params.content+'&isPass='+params.ispass+'&isReceive='+params.isReceive+'&isMetaphase='+params.isMetaphase+'&isNeedExpert='+params.isNeedExpert,params)}
// 我的申请列表
export const mySqs = () => { return req('get','/open/api/kjj/process/runingProcessInstance/BeforSubsidize/list')}






// 字典维护
    // 字典类目-列表
export const dicSort = (params) => { return req("post", "/system/api/kjj/dicdatatype/list",params) };
    // 搜索
export const dicSearch = (params) => { return req("post", "/system/api/kjj/dicdatatype/look", params) };
    // 保存
export const dicSave = (params) => { return req("post", "/system/api/kjj/dicdatatype/save",params) };
    // 删除
export const dicDel = (params) => { return req("post", "/system/api/kjj/dicdatatype/delete", params) };
    // 编辑
export const dicEdit = (params) => { return req("post", "/system/api/kjj/dicdatatype/update",params) };
    // 字典数据-列表
export const dicData = (params) => { return req("post", "/system/api/kjj/dicdata/"+params.pathkey+"/list",params) };
    // 搜索
export const dataSearch = (params) => { return req("post", "/system/api/kjj/dicdata/{pathkey}/look", params) };
    // 保存
export const dataSave = (params) => { return req("post", "/system/api/kjj/dicdata/"+params.pathkey+"/save",params) };
    // 编辑
export const dataEdit = (params) => { return req("post", "/system/api/kjj/dicdata/"+params.pathkey+"/update",params) };
    // 消息记录-列表
export const newsRecord = (params) => { return req("post", "/system/api/kjj/sendmessagelog/list",params) };
    // 搜索
export const recordSearch = (params) => { return req("post", "/system/api/kjj/sendmessagelog/look", params) };
    // 保存
export const recordSave = (params) => { return req("post", "/system/api/kjj/sendmessagelog/save",params) };
    // 消息模板-列表
export const newsTemplate = (params) => { return req("post", "/system/api/kjj/sendmessagetemplate/list",params) };
    // 搜索
export const templateSearch = (params) => { return req("post", "/system/api/kjj/sendmessagetemplate/look", params) };
    // 保存
export const templateSave = (params) => { return req("post", "/system/api/kjj/sendmessagetemplate/save",params) };
    // 删除
export const templateDel = (params) => { return req("post", "/system/api/kjj/sendmessagetemplate/delete", params) };
    // 编辑
export const templateEdit = (params) => { return req("post", "/system/api/kjj/sendmessagetemplate/update",params) };   
// 系统设置
    // 用户管理-列表
export const users = (params) => { return req("post", "/system/api/kjj/user/list",params) };
    // 搜索
export const usersSearch = (params) => { return req("post", "/system/api/kjj/user/look", params) };
    // 添加
export const usersSave = (params) => { return req("post", "/system/api/kjj/user/save",params) };
    // 删除
export const usersDel = (params) => { return req("post", "/system/api/kjj/user/delete", params) };
    // 编辑
export const usersEdit = (params) => { return req("post", "/system/api/kjj/user/update",params) };   
    // 部门管理-全部列表
export const classMangerAll = () => { return req("post", "/system/api/kjj/org/getAll") }; 
    // 部门管理-列表
export const classManger = (params) => { return req("post", "/system/api/kjj/org/list",params) };
    // 搜索
export const classSearch = (params) => { return req("post", "/system/api/kjj/org/look/"+params.id) };
    // 保存
export const classSave = (params) => { return req("post", "/system/api/kjj/org/save",params) };
    // 删除
export const classDel = (params) => { return req("post", "/system/api/kjj/org/delete", params) };
    // 编辑
export const classEdit = (params) => { return req("post", "/system/api/kjj/org/update",params) };  
    // 角色管理-列表
export const roles = (params) => { return req("post", "/system/api/kjj/role/list",params) };
    // 搜索
export const rolesSearch = (params) => { return req("post", "/system/api/kjj/role/look", params) };
    // 保存
export const rolesSave = (params) => { return req("post", "/system/api/kjj/role/save",params) };
    // 删除
export const rolesDel = (params) => { return req("post", "/system/api/kjj/role/delete", params) };
    // 编辑
export const rolesEdit = (params) => { return req("post", "/system/api/kjj/role/update",params) }; 
    // 菜单管理-列表
export const menuManger = (params) => { return req("post", "/system/api/kjj/menu/list",params) };
export const menus = () => { return req("post", "/system/api/kjj/menu") };
    // 搜索
export const menuSearch = (params) => { return req("post", "/system/api/kjj/menu/look", params) };
    // 保存
export const menuSave = (params) => { return req("post", "/system/api/kjj/menu/save",params) };
    // 删除
export const menuDel = (params) => { return req("post", "/system/api/kjj/menu/delete", params) };
    // 编辑
export const menuEdit = (params) => { return req("post", "/system/api/kjj/menu/update",params) }; 




































// 获取用户菜单
export const menu = (params) => { return axios.get("/api/system/api/kjj/menu/list?&token=" ).then(res => res.data) };
// 退出接口
export const loginout = () => { return axios.delete("/api/login?&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
/**
 * 用户管理 
 **/
// 用户管理-获取用户列表
export const userList = () => { return req("post", "/system/api/kjj/org/list") };
// 用户管理-保存（添加编辑）
export const userSave = (params) => { return req("post", "/api/User/save", params) };
// 用户管理-删除用户
export const userDelete = (params) => { return axios.delete("/system/api/kjj/org/delete" + params ).then(res => res.data) };
// 用户管理-重置密码
export const userPwd = (params) => { return req("post", "/api/User/pwd", params) };
// 用户管理-修改状态
export const userLock = (params) => { return axios.get("/api/User/lock?userId=" + params.userId + "&lock=" + params.lock + "&token=" + localStorage.getItem('logintoken')) };
// 用户管理-数据权限
export const UserDeptTree = (params) => { return axios.get("/api/UserDept/tree/" + params + "?token=" + localStorage.getItem('logintoken')) };
// 用户管理-数据权限保存
export const UserDeptSave = (params) => { return req("post", "/api/UserDept/save", params) };
// 用户管理-获取部门设置
export const UserDeptdeptTree = (params) => { return axios.get("/api/UserDept/deptTree/" + params + "?token=" + localStorage.getItem('logintoken')) };
// 用户管理-保存部门设置
export const UserChangeDept = (params) => { return req("post", "/api/User/change/dept", params) };
// 用户管理-用户下线
export const userExpireToken = (params) => { return req("get", "/api/User/expireToken/" + params, {}) };
// 用户管理-刷新缓存
export const userFlashCache = (params) => { return req("get", "/api/User/flashCache/" + params, {}) };

/**
 * 菜单管理
 **/
// 菜单管理-获取菜单Module/list
export const ModuleList = () => { return req("post", "/api/Module/list") };
// 菜单管理-根据菜单获取数据
export const ModuleGet = (params) => { return axios.get("/api/Module/get/" + params + "?token=" + localStorage.getItem('logintoken')) };
// 菜单管理-获取父级菜单Module/nodes
export const ModuleNodes = (params) => { return req("post", "/api/Module/nodes", params) };
// 菜单管理-修改菜单
export const ModuleSave = (params) => { return req("post", "/api/Module/save", params) };
// 菜单管理-删除菜单
export const ModuleDelete = (params) => { return axios.delete("/api/Module/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 角色管理 
 **/
// 角色管理-获取角色列表
export const roleList = (params) => { return req("post", "/api/Role/list", params) };
// 角色管理-保存（添加编辑）
export const roleSave = (params) => { return req("post", "/api/Role/save", params) };
// 角色管理-删除角色
export const roleDelete = (params) => { return axios.delete("/api/Role/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
// 角色管理-菜单权限（获取）
export const RoleRightTree = (params) => { return axios.get("/api/RoleRight/tree/" + params + "?token=" + localStorage.getItem('logintoken')) };
// 角色管理-菜单权限（保存）
export const RoleRightSave = (params) => { return req("post", "/api/RoleRight/save", params) };

/**
 * 公司管理 
 **/
// 公司管理-获取公司列表
export const deptList = (params) => { return req("post", "/api/Dept/list", params) };
// 公司管理-保存（添加编辑）
export const deptSave = (params) => { return req("post", "/api/Dept/save", params) };
// 公司管理-删除公司
export const deptDelete = (params) => { return axios.get("/api/Dept/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 系统环境变量 
 **/
// 系统环境变量-获取系统环境变量列表
export const variableList = (params) => { return req("post", "/api/Variable/list", params) };
// 系统环境变量-保存（添加编辑）
export const variableSave = (params) => { return req("post", "/api/Variable/save", params) };
// 系统环境变量-删除系统环境变量
export const variableDelete = (params) => { return axios.delete("/api/Variable/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 权限管理 
 **/
// 权限管理-获取权限列表
export const permissionList = (params) => { return req("post", "/api/Permission/list", params) };
// 权限管理-保存权限
export const ermissionSave = (params) => { return req("post", "/api/Permission/save", params) };
// 权限管理-删除权限
export const ermissionDelete = (params) => { return axios.delete("/api/Permission/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
// 权限管理-获取权限
export const roleDropDown = () => { return axios.get("/api/Role/dropDown/all?&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
// 权限管理-配置权限
export const RolePermission = (params) => { return req("post", "/api/RolePermission/save", params) };