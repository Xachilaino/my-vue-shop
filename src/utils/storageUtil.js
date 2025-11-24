/**
 * sessionStorage 集中管理
 */
const Storage = {
  set(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  get(key, defaultValue = null) {
    const item = sessionStorage.getItem(key)
    try {
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  remove(key) {
    sessionStorage.removeItem(key)
  },
  clear() {
    sessionStorage.clear()
  },
}

// 定義專用 key，避免在程式碼中寫死字串
export const CART_KEY = 'shopping_cart'
export const TOKEN_KEY = 'token'
export const USER_ROLE_KEY = 'user_role'

export default Storage
