import axios from 'axios'
import { ElMessage } from 'element-plus'

// 建立一個 Axios 實例
const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // API 的基礎路徑
  timeout: 10000, // 請求超時時間
})

// 請求攔截器 (Request Interceptor)
apiService.interceptors.request.use(
  (config) => {
    // 請求資料
    return config
  },
  (error) => {
    // 請求錯誤
    console.error('Request error:', error)
    return Promise.reject(error)
  },
)

// 回應攔截器 (Response Interceptor)
apiService.interceptors.response.use(
  (response) => {
    // 回應資料
    const res = response.data
    if (res.code && res.code !== '0000') {
      ElMessage.error(res.msg || '發生錯誤')
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    // 回應錯誤
    console.error('Response error:', error)
    ElMessage.error(error.message || '網路錯誤，請稍後再試')
    return Promise.reject(error)
  },
)

export default apiService
