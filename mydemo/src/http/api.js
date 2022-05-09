import http from './request'
// 登录验证接口
export const loginApi = (data) => {
  return http({
    url: '/login',
    method: 'post',
    data
  })
}
// 左侧菜单权限
export const leftMenusApi = () => {
  return http({
    url: '/menus',
    method: 'get'
  })
}
// 获取用户数据列表
export const getUsersApi = (params) => {
  return http({
    url: '/users',
    method: 'get',
    params
  })
}
// 添加用户接口
export const addUserApi = (data) => {
  return http({
    url: '/users',
    method: 'post',
    data
  })
}
// 修改用户状态
export const changeUserStatusApi = (uId, type) => {
  return http({
    url: `/users/${uId}/state/${type}`,
    method: 'put'
  })
}
// 编辑用户接口
export const editUserApi = (data) => {
  return http({
    url: `/users/${data.id}`,
    method: 'put',
    data
  })
}
// 删除用户接口
export const deleteUserApi = (id) => {
  return http({
    url: `users/${id}`,
    method: 'delete'
  })
}
// 角色列表
export const userListApi = () => {
  return http({
    url: '/roles',
    method: 'get'
  })
}
// 分配角色接口
export const fpUserApi = (data) => {
  return http({
    url: `/users/${data.id}/role`,
    method: 'put',
    data
  })
}
// 添加角色
export const addUserNameApi = (data) => {
  return http({
    url: '/roles',
    method: 'post',
    data
  })
}
// 编辑角色
export const editUserNameApi = (data) => {
  return http({
    url: `/roles/${data.id}`,
    method: 'put',
    data
  })
}
// 删除角色
export const deleteUserNameApi = (id) => {
  return http({
    url: `/roles/${id}`,
    method: 'delete'
  })
}
// 角色授权
export const fpUserNameApi = (roleId, c) => {
  return http({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: { rids: c }
  })
}
// 所有权限列表
export const getQXAllList = (type = 'tree') => {
  return http({
    url: `/rights/${type}`,
    method: 'get'
  })
}
// 删除角色指定权限
export const delUserQxApi = (roleId, rightId) => {
  return http({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
// 商品数据列表
export const getGoodsListApi = (params) => {
  return http({
    url: '/goods',
    method: 'get',
    params
  })
}
// 删除商品接口
export const delGoodsApi = (id) => {
  return http({
    url: `goods/${id}`,
    method: 'delete'
  })
}
// 商品分类接口
export const GoodCcateApi = (params) => {
  return http({
    url: 'categories',
    method: 'get',
    params
  })
}
// 参数列表接口
export const getCateGoriesApi = (id, sel) => {
  return http({
    url: `categories/${id}/attributes`,
    method: 'get',
    params: { sel }
  })
}
// 添加商品
export const addGoodsApi = (data) => {
  return http({
    url: '/goods',
    method: 'post',
    data
  })
}
// 编辑提交商品
export const editGoodsApi = (data) => {
  return http({
    url: `/goods/${data.goods_id}`,
    method: 'put',
    data
  })
}
// 编辑提交分类
export const editCateApi = (data) => {
  return http({
    url: `categories/${data.cat_id}`,
    method: 'put',
    data
  })
}
// 删除分类
export const delCateApi = (id) => {
  return http({
    url: `categories/${id}`,
    method: 'delete'
  })
}
// 添加分类接口
export const addCateApi = (data) => {
  return http({
    url: '/categories',
    method: 'post',
    data
  })
}
// 订单数据列表
export const getOrderApi = (params) => {
  return http({
    url: '/orders',
    method: 'get',
    params
  })
}
// 基于时间统计的折线图
export const getReportsApi = () => {
  return http({
    url: 'reports/type/1',
    method: 'get'
  })
}
// 物流信息
export const getKuaidiApi = (id) => {
  return http({
    url: `/kuaidi/${id}`,
    method: 'get'
  })
}
// // 编辑参数
// export const editCsApi = (data) => {
//     return http({
//         url: `/categories/${data.id}/attributes/${data.attr_id}`,
//         method: 'put',
//         data
//     })
// }
// 删除参数
export const deleteCsApi = (data) => {
  return http({
    url: `categories/${data.cat_id}/attributes/${data.attr_id}`,
    method: 'delete'
  })
}
// 添加动态参数或者静态属性
export const addCsSxApi = (data) => {
  return http({
    url: `/categories/${data.id}/attributes`,
    method: 'post',
    data
  })
}
// 编辑提交参数
export const editComitParmasApi = (data) => {
  return http({
    url: `categories/${data.id}/attributes/${data.attrId}`,
    method: 'put',
    data
  })
}
