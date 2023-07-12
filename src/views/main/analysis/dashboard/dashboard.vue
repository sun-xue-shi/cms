<template>
  <div class="dash">
    <!-- 顶部 -->
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24">
          <CountCard v-bind="item" />
        </el-col>
      </template>
    </el-row>
    <!-- 中间 -->
    <el-row :gutter="10">
      <el-col :span="7">
        <ChartCard>
          <BingEchart :bing-data="showGoodsCategoryCount" />
        </ChartCard>
      </el-col>
      <el-col :span="10">
        <ChartCard> <MapEchart :map-data="showGoodsAddressSale" /> </ChartCard>
      </el-col>
      <el-col :span="7">
        <ChartCard> <FlowerEchart :rosedata="showGoodsCategoryCount" /></ChartCard>
      </el-col>
    </el-row>

    <!-- 底部 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <ChartCard> <LineEchart v-bind="showGoodsCategorySale" /></ChartCard>
      </el-col>
      <el-col :span="12">
        <ChartCard><BarEchart v-bind="showGoodsCategoryFavor" /></ChartCard>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dash">
import { storeToRefs } from 'pinia'
import CountCard from './cpns/count-card.vue'
import ChartCard from './cpns/chart-card.vue'
import useAnalysisStore from '@/store/analysis/analysis'
import BingEchart from '@/components/echarts/src/bing-echart.vue'
import LineEchart from '@/components/echarts/src/line-echart.vue'
import FlowerEchart from '@/components/echarts/src/flower-echart.vue'
import BarEchart from '@/components/echarts/src/bar-echart.vue'
import MapEchart from '@/components/echarts/src/map-echart.vue'
import { computed } from 'vue'

//发起请求
const alalysisStore = useAnalysisStore()
alalysisStore.fetchAnalysisDataAction()

//拿数据
const { amountList, goodsCategoryCount, goodsCategorySale, goodsCategoryFavor, goodsAddressSale } =
  storeToRefs(alalysisStore)

const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => ({
    value: item.goodsCount,
    name: item.name
  }))
})

const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsCount)
  return { labels, values }
})

const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)
  return { labels, values }
})

const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    value: item.count,
    name: item.address
  }))
})
</script>
<style scoped lang="less">
.el-row {
  margin-bottom: 10px;
}
</style>
