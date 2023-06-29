<template>
  <div class="main">
    <h2>main:{{ counterStore.counter }}-{{ counterStore.doubbleCounter }}</h2>
    <button @click="changeCounter">+1</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'

const counterStore = useCounterStore()

function changeCounter() {
  counterStore.changeNewCounter(66)
}
</script>

<style>
.main {
}
</style>
