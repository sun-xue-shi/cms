import { localCache } from '@/utils/cache'
import MyRequest from '..'

export function postUserList(queryInfo: any) {
  return MyRequest.post({
    url: '/users/list',
    headers: {
      Authorization: localCache.getCache('login/token')
    },
    data: queryInfo
  })
}
