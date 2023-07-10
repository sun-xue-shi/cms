<template>
  <div class="department">
    <pageSearch
      :searchConfig="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <pageContent
      :contentConfig="contentConfig"
      ref="contentRef"
      @edit-btn-click="handleEditBtnClick"
      @new-btn-click="handleNewUserClick"
    >
      <!-- <template #leader="scope">
        <span class="leader">{{ scope.row.leader }}</span>
      </template> -->
    </pageContent>
    <pageModal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import { computed, ref } from 'vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import useMainStore from '@/store/main/main'

const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  console.log(departments)

  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(departments)
    }
  })
  return modalConfig
})
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
.leader {
  color: red;
}
</style>
