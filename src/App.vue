<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<style scoped lang="less">
.app {
  width: 100vw;
  height: 100vh;
  background-color: rgb(242, 239, 239);
}
</style>
