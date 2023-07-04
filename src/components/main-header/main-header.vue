<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuClick">
      <el-icon size="25px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="concent">
      <div class="bread">面包屑</div>
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './cpns/header-info.vue'

//自定义事件
const emit = defineEmits(['foldChange'])
const isFold = ref(false)

function handleMenuClick() {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>
<style scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .concent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
