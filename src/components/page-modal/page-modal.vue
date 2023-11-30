<template>
  <div class="user-modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="80px">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="datetimerange"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="options in item.options" :key="options.value">
                    <el-option :label="options.label" :value="options.value" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'custom'">
                <!-- 插槽 => 定制化 -->
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useSystemStore from '@/store/main/system/system'

interface Iprops {
  modalConfig: {
    pageName: string
    header: {
      newTitle: string
      editTitle: string
    }
    formItems: any[]
  }
  otherInfo?: any
}

const props = defineProps<Iprops>()
const initialForm: any = {}
for (const item of props.modalConfig.formItems) {
  initialForm[item.prop] = ''
}
const formData = reactive<any>(initialForm)

const isNewRef = ref(true)
const editData = ref()

//获取role/department数据

//点击确定
const systemStore = useSystemStore()
function handleConfirmClick() {
  //关闭模态框
  centerDialogVisible.value = false

  let infoData = formData
  if (props.otherInfo) {
    infoData = { ...infoData, ...props.otherInfo }
  }
  if (!isNewRef.value && editData.value) {
    systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, infoData)
  } else {
    systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
  }
}

//模态框展示 和 是否有回显数据
const centerDialogVisible = ref(false)
function setModalVisible(isNew: boolean = true, itemData?: any) {
  centerDialogVisible.value = true
  isNewRef.value = isNew
  //编辑
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
