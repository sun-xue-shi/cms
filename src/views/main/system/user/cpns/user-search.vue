<template>
  <div class="user-search">
    <el-form label-width="80px" ref="formRef" size="large" :model="searchForm">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="searchForm.realname" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="searchForm.cellphone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select v-model="searchForm.enable" placeholder="请选择状态" style="width: 100%">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
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
      <el-button type="primary" icon="Search" @click="handleQueryClick"> 查询 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { type ElForm } from 'element-plus'
import { reactive } from 'vue'

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
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
