import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import myRequest from './request'
import { LOGIN_TOKEN } from '@/global/const'

const MyRequest = new myRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer' + token
      }
      return config
    }
  }
})

export default MyRequest
