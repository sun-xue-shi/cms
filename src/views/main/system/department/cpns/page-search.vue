<template>
  <div class="user-search">
    <el-form label-width="80px" ref="formRef" size="large" :model="searchForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入部门名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门主管" prop="leader">
            <el-input
              v-model="searchForm.leader"
              placeholder="请输入部门主管"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="创建时间" prop="creatAt">
            <el-date-picker
              v-model="searchForm.creatAt"
              type="datetimerange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button type="primary" icon="Search" @click="handleQueryClick">
        查询
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type ElForm } from 'element-plus'
import { reactive } from 'vue'

const searchForm = reactive({
  name: '',
  leader: '',
  creatAt: ''
})

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
