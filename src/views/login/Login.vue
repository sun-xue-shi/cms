<template>
  <div class="login">
    <LoginPanel></LoginPanel>
  </div>
</template>

<script setup lang="ts" name="login">
import LoginPanel from '../login/cpns/login-panel.vue'
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/img/login-bg.svg');
}
</style>
