<template>
  <div class="login">
    <h2>login</h2>
  </div>
</template>

<script setup lang="ts">
import MyRequest from '@/service'

MyRequest.get({
  url: '/home/multidata'
}).then((res: any) => {
  console.log(res)
})
</script>

<style>
.login {
}
</style>
