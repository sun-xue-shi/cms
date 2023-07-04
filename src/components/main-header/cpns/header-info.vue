<template>
  <div class="header-info">
    <div class="icon">
      <span>
        <el-icon><More /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><Dish /></el-icon>
      </span>
      <span>
        <el-icon><ElementPlus /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar :size="30" src="" />
          <span class="name"> coderwhy</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu @click="handleExitClick">
            <el-dropdown-item>
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><User /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '../../../utils/cache'
import { useRouter } from 'vue-router'

//退出登录
const router = useRouter()
function handleExitClick() {
  //1.删除token
  localCache.removeCache('token')
  //2.跳回login页面
  router.push('/login')
}
</script>
<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
  .icon {
    display: inline-flex;
    margin-right: 20px;

    span {
      position: relative;
      display: flex;
      width: 35px;
      height: 40px;
      justify-content: center;
      align-items: center;

      &:hover {
        background: #f2f2f2;
      }
      .dot {
        position: absolute;
        top: 10px;
        right: 8px;
        border-radius: 100%;
        background: red;
        width: 5px;
        height: 5px;
      }
    }
  }
}

.info {
  :global(.el-dropdown-menu__item) {
    line-height: 36px;
    padding: 6px 22px;
  }

  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      margin-left: 5px;
    }
  }
}
</style>
