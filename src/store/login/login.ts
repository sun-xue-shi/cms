import { defineStore } from 'pinia'
import {
  accountLogin,
  getUserInfoById,
  getUserMenuById
} from '@/service/login/login'
import type { IAccount } from '@/types/'
import { localCache } from '@/utils/cache'
import router from '@/router'
import type { RouteRecordRaw } from 'vue-router'

interface ILoginState {
  token: string
  userInfo: any
  userMenu: any[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenu: localCache.getCache('userMenu') ?? [],
    token: localCache.getCache('token') ?? ''
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

      //6.读取router/main中的所有ts文件
      const files: Record<string, any> = import.meta.glob(
        '../../router/main/**/*.ts',
        {
          eager: true
        }
      )

      //7.将加载的对象添加到localRoutes
      const localRoutes: RouteRecordRaw[] = []

      for (const key in files) {
        const moudle = files[key]
        localRoutes.push(moudle.default)
      }

      //8.根据菜单匹配正确的路由
      for (const menu of userMenu.data) {
        for (const submenu of menu.children) {
          const route = localRoutes.find((item) => item.path === submenu.url)
          if (route) router.addRoute('main', route)
        }
      }

      //9.跳转到main页面
      router.push('/main')
    }
  }
})

export default useLoginStore
