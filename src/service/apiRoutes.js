export const API_ROUTES = {
  // 使用者相關
  LOGIN: '/api/login',
  REGISTER: '/api/register',
  PROFILE: '/api/profile',
  FINDUSER: '/api/finduser', // 根據 token 找使用者資料

  // 商品相關
  PRODUCT_LIST: '/api/products',
  PRODUCT_DETAIL: (id) => `/api/products/${id}`,
  PRODUCT_DELETE: (id) => `/api/deleteProduct/${id}`, // 新增
  PRODUCT_MANAGE_LIST: '/api/products/list',
  PRODUCT_ADD: '/api/addProducts',

  // --- 選項管理 ---
  OPTIONS_LIST: '/options/list',
  OPTIONS_ADD: '/options/add',
  OPTIONS_UPDATE: (id) => `/options/update/${id}`,
  OPTIONS_DELETE: (id) => `/options/delete/${id}`,
  OPTIONS_BY_LISTNAME: (listName) => `/options/getByListName?listName=${listName}`,
}
