<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <MainMenu :is-fold="isCollapse" />
      </el-aside>
      <el-container>
        <el-header height="48px">
          <MainHeader @fold-change="handleFoldChange" />
        </el-header>
        <el-main><RouterView></RouterView> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'

const isCollapse = ref(false)

function handleFoldChange(isFold: boolean) {
  isCollapse.value = isFold
}
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;

  .main-content {
    height: 100%;
  }
  .el-aside {
    transition: width 0.3s linear;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
