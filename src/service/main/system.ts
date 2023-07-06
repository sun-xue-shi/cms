import { localCache } from '@/utils/cache'
import MyRequest from '..'

export function postUserList(queryInfo: any) {
  return MyRequest.post({
    url: '/users/list',
    data: queryInfo,
    headers: {
      Authorization: localCache.getCache('token')
    }
  })
}
