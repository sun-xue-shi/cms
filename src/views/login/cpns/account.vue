<template>
  <div class="account">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      status-icon
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormRules } from 'element-plus'
import { reactive } from 'vue'

const account = reactive({
  name: '',
  password: ''
})

//定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '请输入帐号!', trigger: 'blur' },
    // 正则：pattern: /^[a-z0-9]${6,12}/
    { min: 6, max: 12, message: '帐号长度必须为6-12位', trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码！', trigger: 'blur' },
    // 正则：pattern: /^[a-z0-9]${6,}/
    { min: 6, message: '密码长度必须为6位及以上', trigger: 'change' }
  ]
}

//登陆操作
function loginAction() {
  console.log('6666')
}

defineExpose({
  loginAction
})
</script>

<style scoped lang="less">
.account {
}
</style>
