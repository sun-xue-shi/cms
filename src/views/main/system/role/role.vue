<template>
  <div class="role">
    <PageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <PageContent
      ref="contentRef"
      :content-config="contentConfig"
      @edit-btn-click="handleEditBtnClick"
      @new-btn-click="handleNewUserClick"
    />
    <PageModal :modal-config="modalConfig" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="role">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

//hook => usePageContent
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

//hook => usemodalContent
const { modalRef, handleEditBtnClick, handleNewUserClick } = usePageModal()
</script>

<style scoped lang="less">
.role {
}
</style>
