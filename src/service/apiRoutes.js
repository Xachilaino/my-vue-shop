export const API_ROUTES = {
  // 使用者相關
  LOGIN: '/api/login',
  REGISTER: '/api/register',
  PROFILE: '/api/profile',

  // 商品相關
  PRODUCT_LIST: '/api/products',
  PRODUCT_DETAIL: (id) => `/api/products/${id}`,
  PRODUCT_DELETE: (id) => `/api/deleteProduct/${id}`, // 新增
  PRODUCT_MANAGE_LIST: '/api/products/list',
  PRODUCT_ADD: '/api/addProducts',
}
