import apiService from './apiService'
import { API_ROUTES } from './apiRoutes'

const api = {
  // 登入
  login: (data) => apiService.post(API_ROUTES.LOGIN, data),

  // 取得商品列表
  getProducts: () => apiService.get(API_ROUTES.PRODUCT_LIST),

  // 取得單一商品
  getProductById: (id) => apiService.get(API_ROUTES.PRODUCT_DETAIL(id)),
}

export default api
