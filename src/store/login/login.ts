import { defineStore } from 'pinia'
import { accountLogin } from '@/service/login/login'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: ''
  }),
  actions: {
    async loginAccountAction(account: { name: string; password: string }) {
      const loginData = await accountLogin(account)
      this.id = loginData.data.id
      this.name = loginData.data.name
      this.token = loginData.data.token
    }
  }
})

export default useLoginStore
