import { defineStore } from 'pinia'
import Storage, { TOKEN_KEY, USER_ROLE_KEY } from '@/utils/storageUtil'
import api from '@/service/api'

// 輔助函式：解析 JWT Token (不需要完整驗證，只需解碼 payload)
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join(''),
    )
    return JSON.parse(jsonPayload)
  } catch (e) {
    console.error('Invalid token:', e)
    return null
  }
}

export const useUserStore = defineStore('userStore', {
  state: () => ({
    token: Storage.get(TOKEN_KEY) || null,
    role: Storage.get(USER_ROLE_KEY) || 'GUEST', // GUEST, USER, ADMIN
    username: '',
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    userRole: (state) => state.role,
  },

  actions: {
    // 登入 action，現在會接收後端回傳的 token 和 role
    async login(loginData) {
      const response = await api.login(loginData)
      if (response.code === '0000') {
        const { token, role } = response.result
        this.token = token
        this.role = role

        // 從 token 中解析出使用者名稱
        const payload = parseJwt(token)
        this.username = payload?.sub || ''

        // 將 token 和 role 存入 sessionStorage
        Storage.set(TOKEN_KEY, token)
        Storage.set(USER_ROLE_KEY, role)
        return true // 回傳成功
      }
      return false // 回傳失敗
    },

    logout() {
      this.token = null
      this.role = 'GUEST'
      this.username = ''
      Storage.remove(TOKEN_KEY)
      Storage.remove(USER_ROLE_KEY)
      // 之後也可以一併清除購物車
      Storage.remove('shopping_cart')
    },

    // 應用程式初始化時，檢查 token 是否仍然有效
    tryAutoLogin() {
      if (this.token) {
        const payload = parseJwt(this.token)
        // 檢查 token 是否過期
        if (payload && payload.exp * 1000 > Date.now()) {
          this.username = payload.sub
          // 可以選擇在此處向後端發送請求，以重新驗證 token 並獲取最新的使用者資料
        } else {
          // token 過期，執行登出
          this.logout()
        }
      }
    },
  },
})
