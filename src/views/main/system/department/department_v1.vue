<template>
  <div class="department">
    <pageSearch
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <pageContent
      ref="contentRef"
      @edit-btn-click="handleEditBtnClick"
      @new-btn-click="handleNewUserClick"
    />
    <pageModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from './cpns/page-search.vue'
import pageContent from './cpns/page-content.vue'
import pageModal from './cpns/page-modal.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof pageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

const modalRef = ref<InstanceType<typeof pageModal>>()
function handleEditBtnClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}

function handleNewUserClick() {
  modalRef.value?.setModalVisible()
}
</script>

<style scoped>
.department {
}
</style>
