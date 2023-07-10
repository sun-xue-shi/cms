import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

function usePageModal() {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleEditBtnClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)
  }
  function handleNewUserClick() {
    modalRef.value?.setModalVisible()
  }

  return {
    modalRef,
    handleEditBtnClick,
    handleNewUserClick
  }
}

export default usePageModal
