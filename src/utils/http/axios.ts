import axios from 'axios'

const axiosClient = axios.create({
  baseURL: '/api',
  timeout: 1000 * 60 * 5,
  withCredentials: true,
})

axiosClient.interceptors.request.use(
  config => {
    const headers = (config.headers = config.headers || {}) as AxiosRequestHeaders
    // TODO 添加 jwt TOKEN
    config.headers = headers
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosClient
