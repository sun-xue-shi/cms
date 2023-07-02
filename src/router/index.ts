import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  //映射关系
  routes: [
    {
      path: '/',
      redirect: 'main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      component: () => import('../views/main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

router.beforeEach((to) => {
  //路由守卫：登陆成功才能进入main页面
  const token = localCache.getCache('token')
  if (to.path === '/main' && !token) {
    return '/login'
  }
})

export default router
