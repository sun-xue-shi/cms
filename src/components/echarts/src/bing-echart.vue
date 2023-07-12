<template>
  <div class="bing-echart">
    <BaseEchart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseEchart from './base-echarts.vue'
import type { EChartsOption } from 'echarts'

interface IEchart {
  value: number
  name: string
}

interface Iprops {
  bingData: IEchart[]
}

const prop = defineProps<Iprops>()

const option = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left',
      top: '5%'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        bottom: '-15%',
        data: prop.bingData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>
<style scoped lang="less">
.bing-echart {
}
</style>
