<template>
  <div class="main">
    <el-container>
      <el-aside width="210px"><MainMenu /></el-aside>
      <el-container>
        <el-header height="50px"><MainHeader /></el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
    <!-- <button @click="handleExitClick">退出</button> -->
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'

// import { localCache } from '@/utils/cache'
// import { useRouter } from 'vue-router'

// const router = useRouter()
// function handleExitClick() {
//   //删除token
//   // localCache.removeCache(LOGIN_TOKEN)
//   //跳回login页面
//   router.push('/login')
// }
</script>

<style>
.main {
  width: 100%;
  height: 100%;

  .el-container {
    height: 100%;
  }
  .el-aside {
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
