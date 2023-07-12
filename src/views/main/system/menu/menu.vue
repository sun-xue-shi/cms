<template>
  <div class="menu">
    <PageContent ref="contentRef" :content-config="contentConfig" />
  </div>
</template>

<script setup lang="ts" name="menu">
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import contentConfig from './config/content.config'
import usePageModal from '@/hooks/usePageModal'
import usePageContent from '@/hooks/usePageContent'
</script>

<style scoped>
.menu {
}
</style>
