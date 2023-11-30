import { localCache } from '@/utils/cache'
import { firstMenu, mapMenuToRoutes } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  //映射关系
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: '/login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

export function addRoutesWithMenu(menus: any) {
  const routes = mapMenuToRoutes(menus)

  for (const route of routes) {
    router.addRoute('main', route)
  }
}

router.beforeEach((to) => {
  //路由守卫：登陆成功(有token)才能进入main页面
  const token = localCache.getCache('token')
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
