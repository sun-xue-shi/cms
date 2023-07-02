<template>
  <div class="main">
    <button @click="handleExitClick">退出</button>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/const'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()
function handleExitClick() {
  //删除token
  // localCache.removeCache(LOGIN_TOKEN)
  //跳回login页面
  router.push('/login')
}
</script>

<style>
.main {
}
</style>
