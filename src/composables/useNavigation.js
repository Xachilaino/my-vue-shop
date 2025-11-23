import { useRouter } from 'vue-router'

export function useNavigation() {
  const router = useRouter()

  const goHome = () => {
    router.push({ name: 'Home' })
  }

  const goLogin = () => {
    router.push({ name: 'Login' })
  }

  /**
   * 前往指定名稱的路由
   * @param {string} name - 路由名稱
   * @param {object} params - 路由參數 (e.g., /products/:id)
   * @param {object} query - 查詢參數 (e.g., ?page=1)
   */
  const goTo = (name, params = {}, query = {}) => {
    router.push({ name, params, query })
  }

  const goBack = () => {
    router.back()
  }

  return {
    goHome,
    goLogin,
    goTo,
    goBack,
  }
}
