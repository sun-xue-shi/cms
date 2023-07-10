<template>
  <div class="menu">
    <PageContent
      ref="contentRef"
      :content-config="contentConfig"
      @edit-btn-click="handleEditBtnClick"
      @new-btn-click="handleNewUserClick"
    />
  </div>
</template>

<script setup lang="ts" name="menu">
import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
import usePageContent from '@/hooks/usePageContent'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
</script>

<style scoped>
.menu {
}
</style>
