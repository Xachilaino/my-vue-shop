import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home', // 將 name 從 'home' 改為 'Home' 以保持一致性
      component: HomeView,
    },
    {
      path: '/products',
      name: 'Products',
      // 路由懶載入：只有在使用者訪問此路徑時，才會下載對應的元件程式碼
      component: () => import('../views/products/ProductList.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/users/Login.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/users/Register.vue'),
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/users/Profile.vue'),
    },
  ],
})

export default router
