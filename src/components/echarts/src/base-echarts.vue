<template>
  <div class="base-echarts">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref, watchEffect } from 'vue'
import type { EChartsOption } from 'echarts'
import ChinaJSON from '../data/china.json'

//注册地图
echarts.registerMap('china', ChinaJSON as any)

interface Iprops {
  option: EChartsOption
}

const props = defineProps<Iprops>()
const echartRef = ref<HTMLElement>()
onMounted(() => {
  const echartIntance = echarts.init(echartRef.value!, 'light', { renderer: 'canvas' })

  //监听option变化
  watchEffect(() => echartIntance.setOption(props.option))

  //监听window缩放
  window.addEventListener('resize', () => {
    echartIntance.resize()
  })
})
</script>
<style scoped lang="less">
.base-echarts {
}

.echart {
  height: 300px;
}
</style>
