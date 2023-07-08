import {
  deleteUserById,
  editUserData,
  newUserData,
  postUserListData,
  postPageListData,
  deletePageById,
  newPageData,
  editPageData
} from '@/service/main/system'
import { defineStore } from 'pinia'

export interface IUser {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}

interface ISystem {
  userList: IUser[]
  userTotalCount: number
  pageList: any
  pageTotalCount: number
}
const useSystemStore = defineStore('system', {
  state: (): ISystem => ({
    userList: [],
    userTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const userListData = await postUserListData(queryInfo)
      console.log(userListData)
      const { list, totalCount } = userListData.data
      this.userList = list
      this.userTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      //删除数据
      const deleteRes = await deleteUserById(id)

      //请求新的数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      //创建新的用户
      const newRes = await newUserData(userInfo)

      //请求新的数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      //编辑用户
      const editRes = await editUserData(id, userInfo)

      //请求新的数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    //页面的action
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListData = await postPageListData(pageName, queryInfo)

      const totalCount = pageListData.data.totalCount
      const list = pageListData.data.list

      console.log(totalCount)
      console.log(list)

      this.pageTotalCount = totalCount
      this.pageList = list
    },
    async deletePageByIdAction(pageName: string, id: number) {
      //删除数据
      const deleteRes = await deletePageById(pageName, id)

      //请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      //创建新的用户
      const newRes = await newPageData(pageName, pageInfo)

      //请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      //编辑用户
      const editRes = await editPageData(pageName, id, pageInfo)

      //请求新的数据
      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
