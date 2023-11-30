import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { myRequestConfig } from './type'
import { localCache } from '@/utils/cache'

class myRequest {
  instance: AxiosInstance
  //request实例 => axios实例
  constructor(config: myRequestConfig) {
    this.instance = axios.create(config)

    //每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        config.headers = config.headers || {}
        const token = localCache.getCache('token')
        config.headers['Authorization'] = token
        config.headers['Content-Type'] = 'application/json'
        if (token) {
          config.headers['Authorization'] = token
          config.headers['Content-Type'] = 'application/json'
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )

    //针对特定myRequest实例的拦截
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  request<T = any>(config: myRequestConfig<T>) {
    //单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    //返回promise
    return new Promise<T>((reslove, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          //单次响应的拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          reslove(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: myRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: myRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: myRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: myRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default myRequest
// import axios, { type AxiosInstance } from 'axios'

// class MyRequest {
//   instance: AxiosInstance

//   constructor(config) {
//     this.instance = axios.create(config)

//     this.instance.interceptors.request.use(
//       (config: any) => {
//         const token = localStorage.getItem('token')
//         config.headers['Authorization'] = token

//         return
//       },
//       (err) => {
//         return err
//       }
//     )

//     this.instance.interceptors.response.use(
//       (res) => {
//         return res.data
//       },
//       (err) => {
//         return Promise.reject(new Error(err))
//       }
//     )
//   }

//   request(config) {
//     return new Promise((resolve, reject) => {
//       this.instance
//         .request(config)
//         .then((res) => {
//           resolve(res)
//         })
//         .catch((err) => {
//           reject(err)
//         })
//     })
//   }

//   get(config) {
//     return this.request({ ...config, method: 'GET' })
//   }

//   delete(config) {
//     return this.request({ ...config, method: 'DELETE' })
//   }
//   post(config) {
//     return this.request({ ...config, method: 'POST' })
//   }
//   patch(config) {
//     return this.request({ ...config, method: 'PATCH' })
//   }
// }
