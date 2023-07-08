<template>
  <div class="user">
    <UserSearch
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <UserContent
      ref="contentRef"
      @new-btn-click="handleNewUserClick"
      @edit-btn-click="handleEditBtnClick"
    />
    <UserModal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="user">
import UserSearch from './cpns/user-search.vue'
import UserContent from './cpns/user-content.vue'
import UserModal from './cpns/user-modal.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof UserContent>>()
function handleQueryClick(searchForm: any) {
  contentRef.value?.fetchUserListData(searchForm)
}

function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

//新建用户
const modalRef = ref<InstanceType<typeof UserModal>>()
function handleNewUserClick() {
  modalRef.value?.setModalVisible()
}

//编辑用户
function handleEditBtnClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>
<style scoped lang="less">
.user {
}
</style>
