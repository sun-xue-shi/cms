import MyRequest from '..'

export function accountLogin(account: { name: string; password: string }) {
  return MyRequest.post({
    url: '/login',
    data: account
  })
}
