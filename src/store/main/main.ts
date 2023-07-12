import { getEntireDepartments, getEntireMenus, getEntireRoles } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMain {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMain => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesRes = await getEntireRoles()
      const departmentRes = await getEntireDepartments()
      const menuRes = await getEntireMenus()

      this.entireRoles = rolesRes.data.list
      this.entireDepartments = departmentRes.data.list
      this.entireMenus = menuRes.data.list
    }
  }
})

export default useMainStore
