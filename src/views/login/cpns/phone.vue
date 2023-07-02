<template>
  <div class="phone">
    <el-form label-width="60px" size="large">
      <el-form-item label="手机号">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="code">
          <el-input />
          <span>
            <el-button class="btn" type="primary">获取验证码</el-button>
          </span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
.code {
  display: flex;

  .btn {
    margin-left: 8px;
  }
}
</style>
