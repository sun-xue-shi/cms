<template>
  <div class="user-search" v-if="isQuery">
    <el-form label-width="80px" ref="formRef" size="large" :model="searchForm">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItem" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="datetimerange"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="options in item.option" :key="options.value">
                    <el-option :label="options.label" :value="options.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button type="primary" icon="Search" @click="handleQueryClick"> 查询 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type ElForm } from 'element-plus'
import { reactive } from 'vue'
import usePermissions from '@/hooks/usePermissions'

interface IProps {
  searchConfig: {
    pageName: string
    formItem: any[]
  }
}

const props = defineProps<IProps>()
const initialForm: any = {}
for (const item of props.searchConfig.formItem) {
  initialForm[item.prop] = ''
}
const searchForm = reactive(initialForm)

const isQuery = usePermissions(`${props.searchConfig.pageName}:query`)
//重置操作
const formRef = ref<InstanceType<typeof ElForm>>()
const emit = defineEmits(['queryClick', 'resetClick'])
function handleResetClick() {
  //重置form数据
  formRef.value?.resetFields()
  //传出事件，content内部重新发送网络请求
  emit('resetClick', searchForm)
}
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>
<style scoped lang="less">
.user-search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    margin-bottom: 0;
    padding: 20px 30px;
  }
  .btns {
    text-align: right;
    padding: 0 50px 10px 0;
  }
}
</style>
