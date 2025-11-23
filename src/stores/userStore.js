import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  // state: 定義這個 store 的所有狀態 (資料)
  state: () => ({
    user: {
      username: '',
      isLogin: false,
    },
  }),

  // getters: 就像是 store 的 computed 屬性，用來衍生出新的狀態
  getters: {
    isLoggedIn: (state) => state.user.isLogin,
  },

  // actions: 用來修改 state 的方法 (可以是同步或非同步)
  actions: {
    /**
     * 登入
     * @param {object} userData - 使用者資料，例如 { username: 'Admin' }
     */
    login(userData) {
      // 在這裡，我們只是模擬登入成功
      this.user = {
        username: userData.username,
        isLogin: true,
      }
      console.log('User logged in:', this.user)
    },

    /**
     * 登出
     */
    logout() {
      this.user = {
        username: '',
        isLogin: false,
      }
      console.log('User logged out')
    },
  },
})
