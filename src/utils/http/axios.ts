import { ElNotification } from 'element-plus'
import axios from 'axios'
import { AxiosRequestHeaders } from 'axios'
import { useAuthStore } from '@/store/modules/auth'

const axiosClient = axios.create({
  baseURL: '',
  timeout: 1000 * 60 * 5,
  withCredentials: true,
})

axiosClient.interceptors.request.use(
  config => {
    const authStore = useAuthStore()
    const headers = (config.headers || {}) as AxiosRequestHeaders
    headers.Authorization = `Bearer ${authStore.getAccessToken}`
    config.headers = headers
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      // TODO 处理非200状态
      ElNotification.error({
        title: 'HTTP ERROR',
        message: `${response.data.data.msg}`,
      })
    }
    return Promise.resolve(response.data.data)
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosClient
