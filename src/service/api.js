import apiService from './apiService'
import { API_ROUTES } from './apiRoutes'

const api = {
  // 登入
  login: (data) => apiService.post(API_ROUTES.LOGIN, data),

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
}

export default api
