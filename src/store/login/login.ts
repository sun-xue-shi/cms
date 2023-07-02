import { defineStore } from 'pinia'
import {
  accountLogin,
  getUserInfoById,
  getUserMenuById
} from '@/service/login/login'
import type { IAccount } from '@/types/'
import { localCache } from '@/utils/cache'
import router from '@/router'

interface ILoginState {
  token: string
  userInfo: any
  userMenu: any[]
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    userInfo: {},
    userMenu: [],
    token: localCache.getCache('token') ?? ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登陆，获取id等信息
      const loginData = await accountLogin(account)

      const id = loginData.data.data.id

      this.token = loginData.data.data.token

      //2.本地缓存
      localCache.setCache('token', this.token)

      //3.获取用户登陆信息
      const userLoginInfo = await getUserInfoById(id)

      this.userInfo = userLoginInfo.data

      //4.获取用户登陆信息
      const userMenuInfo = await getUserMenuById(this.userInfo.data.role.id)
      this.userMenu = userMenuInfo.data

      //5.跳转到main页面
      router.push('/main')
    }
  }
})

export default useLoginStore
