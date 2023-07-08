import { getEntireDepartments, getEntireRoles } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMain {
  entireRoles: any[]
  entireDepartments: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMain => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesRes = await getEntireRoles()
      const DepartmentRes = await getEntireDepartments()

      this.entireRoles = rolesRes.data.list
      this.entireDepartments = DepartmentRes.data.list
    }
  }
})

export default useMainStore
