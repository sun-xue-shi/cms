import { localCache } from '@/utils/cache'
import MyRequest from '..'

export function getEntireRoles() {
  return MyRequest.post({
    url: '/role/list'
  })
}

export function getEntireDepartments() {
  return MyRequest.post({
    url: '/department/list'
  })
}
