<template>
  <div class="bar-echart">
    <BaseEchart :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseEchart from './base-echarts.vue'
import type { EChartsOption } from 'echarts'

interface IEchart {
  values: string[]
  labels: string[]
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
      bottom: '5%'
    },
    xAxis: {
      type: 'category',
      data: prop.labels,
      axisLabel: {
        inside: true,
        color: '#fff'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#999'
      }
    },
    dataZoom: {
      type: 'inside'
    },
    series: [
      {
        data: prop.values,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }
})
</script>
<style scoped lang="less">
.bar-echart {
}
</style>
