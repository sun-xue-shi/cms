import { localCache } from '@/utils/cache'
import MyRequest from '..'

// export function postUserList(queryInfo: any) {
//   return MyRequest.post({
//     url: '/users/list',
//     data: queryInfo,
//     headers: {
//       Authorization: localCache.getCache('token')
//     }
//   })
// }

export function postUserListData(queryInfo?: any) {
  return MyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserById(id: number) {
  return MyRequest.delete({
    url: `/users/${id}`
  })
}

export function newUserData(userInfo: any) {
  return MyRequest.post({
    url: '/users',
    data: userInfo
  })
}

export function editUserData(id: number, userInfo: any) {
  return MyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

// 页面的网络请求
export function postPageListData(pageName: string, queryInfo?: any) {
  return MyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageById(pageName: string, id: number) {
  return MyRequest.delete({
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, pageInfo: any) {
  return MyRequest.post({
    url: `${pageName}`,
    data: pageInfo
  })
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return MyRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
