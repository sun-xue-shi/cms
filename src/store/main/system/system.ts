import { postUserList } from '@/service/main/system'
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
}
const useSystemStore = defineStore('system', {
  state: (): ISystem => ({
    userList: [],
    userTotalCount: 0
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const userListData = await postUserList(queryInfo)

      const totalCount = userListData.data.data.totalCount
      const list = userListData.data.data.list
      this.userTotalCount = totalCount
      this.userList = list
    }
  }
})

export default useSystemStore
