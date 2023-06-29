import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { type myRequestConfig } from './type'

class myRequest {
  instance: AxiosInstance
  //request实例 => axios实例
  constructor(config: myRequestConfig) {
    this.instance = axios.create(config)

    //每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res
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
