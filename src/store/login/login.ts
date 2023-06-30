import { defineStore } from 'pinia'
import { accountLogin } from '@/service/login/login'
import type { IAccount } from '@/types/'
import { localCache } from '@/utils/cache'

const LOGIN_TOKEN = 'login/token'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: localCache.getCache(LOGIN_TOKEN),
    token: ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      //1.账号登陆，获取id等信息
      const loginData = await accountLogin(account)
      this.name = loginData.data.name
      this.id = loginData.data.id
      this.token = loginData.data.token

      //2.本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)

      //3.跳转到main页面
    }
  }
})

export default useLoginStore
