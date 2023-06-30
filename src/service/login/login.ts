import MyRequest from '..'
import type { IAccount } from '@/types/'

export function accountLogin(account: IAccount) {
  return MyRequest.post({
    url: '/login',
    data: account
  })
}
