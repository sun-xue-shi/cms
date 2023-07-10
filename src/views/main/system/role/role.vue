<template>
  <div class="role">
    <PageSearch :search-config="searchConfig" />
    <PageContent :content-config="contentConfig" />
    <PageModal :modal-config="modalConfig" />
  </div>
</template>

<script setup lang="ts" name="role">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
</script>
<style scoped lang="less">
.role {
}
</style>
