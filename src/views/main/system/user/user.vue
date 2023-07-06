<template>
  <div class="user">
    <UserSearch
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <UserContent ref="contentRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import UserSearch from './cpns/user-search.vue'
import UserContent from './cpns/user-content.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof UserContent>>()
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}
</script>
<style scoped lang="less">
.user {
}
</style>
