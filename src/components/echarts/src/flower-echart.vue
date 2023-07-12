<template>
  <div class="flower-echart">
    <BaseEchart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseEchart from './base-echarts.vue'
import type { EChartsOption } from 'echarts'

interface IEchart {
  name: string
  value: number
}

interface Iprops {
  rosedata: IEchart[]
}

const prop = defineProps<Iprops>()
const option = computed<EChartsOption>(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: [10, 120],
        center: ['50%', '50%'],
        bottom: '-15%',
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: prop.rosedata,
        label: {
          show: false
        }
      }
    ]
  }
})
</script>
<style scoped lang="less">
.flower-echart {
}
</style>
