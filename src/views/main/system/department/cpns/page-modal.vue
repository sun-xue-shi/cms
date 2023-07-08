<template>
  <div class="user-modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px">
          <el-form-item prop="name" label="部门名称">
            <el-input v-model="formData.name" placeholder="请输入部门" />
          </el-form-item>
          <el-form-item prop="leader" label="部门主管">
            <el-input v-model="formData.leader" placeholder="请输入部门主管" />
          </el-form-item>

          <el-form-item prop="parentId" label="选择部门">
            <el-select
              v-model="formData.parentId"
              placeholder="请选择部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :value="item.id" :label="item.name"> </el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ref } from 'vue'
import useMainStore from '@/store/main/main'
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'

const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})
const isNewRef = ref(true)
const editData = ref()

//获取role/department数据
const mainStore = useMainStore()
const { entireDepartments } = storeToRefs(mainStore)

//点击确定
const systemStore = useSystemStore()
function handleConfirmClick() {
  //关闭模态框
  centerDialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    systemStore.newPageDataAction('department', formData)
  }
}

//模态框是否展示
const centerDialogVisible = ref(false)
function setModalVisible(isNew: boolean = true, itemData?: any) {
  centerDialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && itemData) {
    for (const key in formData) {
      formData[key] = itemData[key]
    }
    editData.value = itemData
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}

defineExpose({
  setModalVisible
})
</script>
<style scoped lang="less">
.form {
  padding: 0 20px;
}
</style>
