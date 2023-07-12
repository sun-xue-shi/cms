import { defineStore } from 'pinia'
import { accountLogin, getUserInfoById, getUserMenuById } from '@/service/login/login'
import type { IAccount } from '@/types/'
import { localCache } from '@/utils/cache'
import router, { addRoutesWithMenu } from '@/router'
import useMainStore from '../main/main'
import { mapMenuToPermissions } from '@/utils/map-menus'

interface ILoginState {
  token: string
  userInfo: any
  userMenu: any[]
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    userInfo: {},
    userMenu: [],
    token: '',
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登陆，获取id等信息
      const loginData = await accountLogin(account)
      const { id, token } = loginData.data
      this.token = token

      //2.本地缓存token
      localCache.setCache('token', token)

      //3.获取用户登陆信息
      const userLoginInfo = await getUserInfoById(id)
      const userInfo = userLoginInfo.data
      this.userInfo = userInfo

      //4.获取角色请求用户权限
      const userMenuInfo = await getUserMenuById(this.userInfo.role.id)
      const userMenu = userMenuInfo.data
      this.userMenu = userMenu

      //5.本地缓存
      localCache.setCache('userInfo', this.userInfo)
      localCache.setCache('userMenu', this.userMenu)

      //6.请求所有role/department数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      //7.获取登陆用户的权限(importent)
      const permissions = mapMenuToPermissions(userMenu)
      this.permissions = permissions
      localCache.setCache('permissions', this.permissions)

      //8.动态添加路由(importent)
      addRoutesWithMenu(this.userMenu)

      //9.跳转到main页面
      router.push('/main')
    },

    loadLocalCacheAction() {
      this.token = localCache.getCache('token')
      this.userInfo = localCache.getCache('userInfo')
      this.userMenu = localCache.getCache('userMenus')
      // this.permissions = localCache.getCache('permissions')
      if (this.token && this.userInfo && this.userMenu) {
        // 请求所有role / department数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
        // 动态添加路由
        addRoutesWithMenu(this.userMenu)
      }
    }
  }
})

export default useLoginStore
