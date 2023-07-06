import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import myRequest from './request'

const MyRequest = new myRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
  // interceptors: {
  //   requestSuccessFn: (config) => {
  //     const token = localCache.getCache('token')
  //     if (token && config.headers) {
  //       config.headers.Authorization = `Bearer ${token}`
  //     }
  //     return config
  //   },
  //   requestFailureFn: (err) => {
  //     return err
  //   },
  //   responseSuccessFn: (res) => {
  //     return res
  //   },
  //   responseFailureFn: (err) => {
  //     return err
  //   }
  // }
})

export default MyRequest
