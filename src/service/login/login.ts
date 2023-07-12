import { localCache } from '@/utils/cache'
import MyRequest from '..'
import type { IAccount } from '@/types/'

export function accountLogin(account: IAccount) {
  return MyRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return MyRequest.get({
    url: '/users/' + id
  })
}

export function getUserMenuById(id: number) {
  return MyRequest.get({
    url: `/role/${id}/menu`
  })
}
