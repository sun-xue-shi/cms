import { BASE_URL, TIME_OUT } from './config'
import myRequest from './request'

const MyRequest = new myRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default MyRequest
