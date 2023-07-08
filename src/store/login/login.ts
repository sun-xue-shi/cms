import { defineStore } from 'pinia'
import {
  accountLogin,
  getUserInfoById,
  getUserMenuById
} from '@/service/login/login'
import type { IAccount } from '@/types/'
import { localCache } from '@/utils/cache'
import router, { addRoutesWithMenu } from '@/router'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenu: any[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    userInfo: {},
    userMenu: [],
    token: ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登陆，获取id等信息
      const loginData = await accountLogin(account)
      const id = loginData.data.data.id
      this.token = loginData.data.data.token

      //2.本地缓存token
      localCache.setCache('token', this.token)

      //3.获取用户登陆信息
      const userLoginInfo = await getUserInfoById(id)
      const userInfo = userLoginInfo.data
      this.userInfo = userInfo

      //4.获取角色请求用户权限
      const userMenuInfo = await getUserMenuById(this.userInfo.data.role.id)
      const userMenu = userMenuInfo.data
      this.userMenu = userMenu.data

      //5.本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenu', userMenu.data)

      //6.请求所有role/department数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      //7.动态添加路由
      addRoutesWithMenu(this.userMenu)

      //8.跳转到main页面
      router.push('/main')
    },
    loadLocalCacheAction() {
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenu = localCache.getCache('userMenu')
      if (token && userInfo && userMenu) {
        this.token = token
        this.userInfo = userInfo
        this.userMenu = userMenu

        //请求所有role/department数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        //动态添加路由
        addRoutesWithMenu(this.userMenu)
      }
    }
  }
})

export default useLoginStore
