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
    >
    </PageContent>
    <PageModal :modal-config="modalConfig" :other-info="otherInfo" ref="modalRef">
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{ children: 'children', label: 'name' }"
          @check="handleEltreeCheck"
        />
      </template>
    </PageModal>
  </div>
</template>

<script setup lang="ts" name="role">
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'
import type { ElTree } from 'element-plus'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from '../role/config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import useMainStore from '@/store/main/main'
import { mapMenuListById } from '@/utils/map-menus'

//hook => usePageContent
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

//hook => usemodalContent
const { modalRef, handleEditBtnClick, handleNewUserClick } = usePageModal(newCallBack, editCallBack)

const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

//获取点击复选框后所得的数据
const otherInfo = ref({})
function handleEltreeCheck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}

//点击新建的回调(清除回显)
function newCallBack() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
//点击编辑的回调
const treeRef = ref<InstanceType<typeof ElTree>>()
function editCallBack(itemData: any) {
  nextTick(() => {
    const menuId = mapMenuListById(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuId)
  })
}
</script>

<style scoped lang="less">
.role {
}
</style>
