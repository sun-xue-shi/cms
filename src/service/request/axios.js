import axios from 'axios'

let request = axios.create({
  // 基础配置
  baseURL: 'http://localhost:8000/',
  timeout: 1000,
  responseType: 'json',
  headers: {}
})

//请求拦截器
request.interceptors.request.use((config) => {
  // token处理
  let token = localStorage.getItem('token')
  config.headers.token = token
  return config
})

// 响应拦截器
request.interceptors.response.use((res) => {
  // 响应的统一处理
  const status = res.data.status || 200
  const message = res.data.message || '未知错误'
  if (status === 401) {
    return Promise.reject(new Error(message))
  }
  if (status !== 200) {
    return Promise.reject(new Error(message))
  }
})
