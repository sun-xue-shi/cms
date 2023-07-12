import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

function usePageModal(newCallBack?: () => void, editCallBack?: (itemData: any) => void) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  function handleEditBtnClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)

    if (editCallBack) editCallBack(itemData)
  }
  function handleNewUserClick() {
    modalRef.value?.setModalVisible()
    if (newCallBack) newCallBack()
  }

  return {
    modalRef,
    handleEditBtnClick,
    handleNewUserClick
  }
}

export default usePageModal
