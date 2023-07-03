<template>
  <div class="login-panel">
    <div class="title">
      <h1>后台管理系统</h1>
    </div>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 账号登陆 -->
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登陆</span>
            </div>
          </template>
          <account ref="accountRef" />
        </el-tab-pane>
        <!-- 手机登录 -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isKeepWord" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="loginBtnClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import account from './account.vue'
import phone from './phone.vue'
import { watch } from 'vue'
import { localCache } from '@/utils/cache'

const isKeepWord = ref<boolean>(localCache.getCache('isKeepWord') ?? false)
const activeName = ref('account')
const accountRef = ref<InstanceType<typeof account>>()

//监听isKeepWord的变化
watch(isKeepWord, (newValue) => {
  localCache.setCache('isKeepWord', newValue)
})

//点击登录
function loginBtnClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isKeepWord.value)
  } else {
    console.log('6')
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .tabs {
    .label {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .text {
      margin-left: 5px;
    }
  }
  .controls {
    display: flex;
    margin-top: 12px;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
