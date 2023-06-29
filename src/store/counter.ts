import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 100
  }),
  getters: {
    doubbleCounter(state) {
      return state.counter * 2
    }
  },
  actions: {
    changeNewCounter(newcounter: number) {
      this.counter = newcounter
    }
  }
})

export default useCounterStore
