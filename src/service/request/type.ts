import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export interface myInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

//对AxiosRequestConfig配置进行扩展
export interface myRequestConfig<T = AxiosResponse> extends InternalAxiosRequestConfig {
  interceptors?: myInterceptors<T>
}
