import {
  getAmountList,
  getGoodsAddressSale,
  getGoodsCategoryCount,
  getGoodsCategoryFavor,
  getGoodsCategorySale
} from '@/service/main/analysis'
import { defineStore } from 'pinia'

interface Istate {
  amountList: any[]
  goodsCategoryCount: any[]
  goodsCategorySale: any[]
  goodsCategoryFavor: any[]
  goodsAddressSale: any[]
}

const useAnalysisStore = defineStore('analysis', {
  state: (): Istate => ({
    amountList: [],
    goodsCategoryCount: [],
    goodsCategorySale: [],
    goodsCategoryFavor: [],
    goodsAddressSale: []
  }),
  actions: {
    async fetchAnalysisDataAction() {
      const amountRes = await getAmountList()
      this.amountList = amountRes.data

      const goodsCategoryCount = await getGoodsCategoryCount()
      this.goodsCategoryCount = goodsCategoryCount.data

      const goodsCategorySale = await getGoodsCategorySale()
      this.goodsCategorySale = goodsCategorySale.data

      const goodsCategoryFavor = await getGoodsCategoryFavor()
      this.goodsCategoryFavor = goodsCategoryFavor.data

      const goodsAddressSale = await getGoodsAddressSale()
      this.goodsAddressSale = goodsAddressSale.data
    }
  }
})

export default useAnalysisStore
