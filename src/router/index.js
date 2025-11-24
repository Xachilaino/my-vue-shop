import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Storage, { TOKEN_KEY, USER_ROLE_KEY } from '@/utils/storageUtil'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/login', name: 'Login', component: () => import('@/views/users/Login.vue') },
  // ... 其他公用路由

  // --- 後台管理路由 ---
  {
    path: '/admin/products',
    name: 'ProductManage',
    component: () => import('@/views/products/ProductManage.vue'),
    meta: { requiresAuth: true, roles: ['ADMIN'] }, // 需要登入，且角色必須是 ADMIN
  },
  {
    path: '/admin/products/add',
    name: 'AddProduct',
    component: () => import('@/views/products/AddProduct.vue'),
    meta: { requiresAuth: true, roles: ['ADMIN'] },
  },
  {
    path: '/admin/products/edit/:id',
    name: 'EditProduct',
    component: () => import('@/views/products/EditProduct.vue'),
    meta: { requiresAuth: true, roles: ['ADMIN'] },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 全域前置守衛
router.beforeEach((to, from, next) => {
  const token = Storage.get(TOKEN_KEY)
  const userRole = Storage.get(USER_ROLE_KEY)

  // 檢查路由是否需要驗證
  if (to.meta.requiresAuth) {
    // 1. 檢查是否已登入
    if (!token) {
      console.log('未登入，導向登入頁')
      return next({ name: 'Login' })
    }

    // 2. 檢查角色權限
    if (to.meta.roles && !to.meta.roles.includes(userRole)) {
      console.log('權限不足')
      // 可以導向一個專門的 "權限不足" 頁面
      ElMessage.error('您的權限不足，無法訪問此頁面')
      return next({ name: 'Home' }) // 或 from.path
    }
  }

  // 如果一切正常，放行
  next()
})

export default router
