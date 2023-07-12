import { inputNumberEmits } from 'element-plus'
import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  //6.读取router/main中的所有ts文件
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })

  //7.将加载的对象添加到localRoutes
  for (const key in files) {
    const moudle = files[key]
    localRoutes.push(moudle.default)
  }

  return localRoutes
}

export let firstMenu: any = null
export function mapMenuToRoutes(userMenu: any[]) {
  //加载本地路由
  const localRoutes = loadLocalRoutes()

  //根据菜单匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        //给route顶级菜单添加重定向功能
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        //二级菜单对应路径
        routes.push(route)
      }

      //记录第一个被匹配到的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

//根据路径匹配菜单
export function mapPathToMenu(path: string, userMenu: any) {
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

interface ICreadCrumb {
  name: string
  path?: string
}
//获取面包屑层级
export function mapPathToCrumb(path: string, userMenu: any) {
  const breadCrumb: ICreadCrumb[] = []
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadCrumb.push({ name: menu.name, path: menu.url })
        breadCrumb.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadCrumb
}

export function mapMenuListById(menuList: any[]) {
  const id: number[] = []

  function recurseGetId(menu: any[]) {
    for (const item of menu) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        id.push(item.id)
      }
    }
  }
  recurseGetId(menuList)
  return id
}

// 从菜单列表获取用户按钮权限
export function mapMenuToPermissions(menuList: any[]) {
  const premissions: string[] = []

  function recurseGetPermission(menu: any[]) {
    for (const item of menu) {
      if (item.type === 3) {
        premissions.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)
  return premissions
}
