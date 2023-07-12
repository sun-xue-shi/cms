<!-- <template>
  <div class="bing-echart"></div>
</template>

<script setup lang="ts"></script>
<style scoped lang="less">
.bing-echart {
}
</style> -->

<template>
  <div class="line-echart">
    <BaseEchart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseEchart from './base-echarts.vue'
import type { EChartsOption } from 'echarts'

interface IEchart {
  labels: string[]
  values: string[]
}

const prop = defineProps<IEchart>()

const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: prop.labels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '分类销量统计',
        data: prop.values,
        type: 'line',
        stack: '总量',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        }
      }
    ]
  }
})
</script>
<style scoped lang="less">
.line-echart {
}
</style>
