import apiService from './apiService'
import { API_ROUTES } from './apiRoutes'

const api = {
  // 登入
  login: (data) => apiService.post(API_ROUTES.LOGIN, data),

  // 註冊
  register: (data) => apiService.post(API_ROUTES.REGISTER, data),

  // 查詢個人資料
  findUser: () => apiService.get(API_ROUTES.FINDUSER),

  // 個人資料維護
  updateProfile: (data) => apiService.put(API_ROUTES.PROFILE, data),

  // 取得商品列表
  getProducts: () => apiService.get(API_ROUTES.PRODUCT_LIST),

  // 取得單一商品
  getProductById: (id) => apiService.get(API_ROUTES.PRODUCT_DETAIL(id)),

  // 取得產品管理列表
  getManageProducts: () => apiService.get(API_ROUTES.PRODUCT_MANAGE_LIST),

  // 新增產品
  addProduct: (data) => apiService.post(API_ROUTES.PRODUCT_ADD, data),

  // 刪除產品
  deleteProduct: (id) => apiService.put(API_ROUTES.PRODUCT_DELETE(id)),

  // 取得所有選項列表
  getOptions: () => apiService.get(API_ROUTES.OPTIONS_LIST),

  // 新增選項
  addOption: (data) => apiService.post(API_ROUTES.OPTIONS_ADD, data),

  // 更新選項
  updateOption: (id, data) => apiService.put(API_ROUTES.OPTIONS_UPDATE(id), data),

  // 刪除選項
  deleteOption: (id) => apiService.delete(API_ROUTES.OPTIONS_DELETE(id)),

  // 根據 listName 取得選項
  getOptionsByListName: (listName) => apiService.get(API_ROUTES.OPTIONS_BY_LISTNAME(listName)),
}

export default api
