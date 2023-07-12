<template>
  <div class="chart-card">
    <div class="header">
      <span class="title" :header="header">{{ header }}</span>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Iprops {
  header: string
}

const prop = withDefaults(defineProps<Iprops>(), {
  header: '卡片的头部标题'
})
</script>
<style scoped lang="less">
.chart-card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  background-color: #fff;

  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  .title {
    display: flex;
    height: 50px;
    font-size: 15px;
    align-items: center;
    border-bottom: 1px solid #f0f0f0;
  }
}
</style>
