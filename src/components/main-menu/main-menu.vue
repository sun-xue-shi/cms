<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="../../assets//img//logo.svg" alt="" />
      <div v-show="!isFold" class="title">ZILONG CMS</div>
    </div>
    <div class="menu">
      <el-menu
        :collapse="isFold"
        :default-active="defaultactive"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <!-- 1.系统总览 -->
        <template v-for="item in userMenu" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
              >
                <template #title>
                  <span>{{ subitem.name }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useLoginStore from '../../store/login/login'
import { useRoute, useRouter } from 'vue-router'
import { mapPathToMenu, firstMenu } from '@/utils/map-menus'

const loginStore = useLoginStore()
const userMenu = loginStore.userMenu

defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
function handleItemClick(subitem: any) {
  router.push({
    path: subitem.url ?? '/not-found'
  })
}

const route = useRoute()
const pathMenu = mapPathToMenu(route.path, userMenu)
const defaultactive = ref(pathMenu.id + '')
</script>

<style scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    align-items: center;
    /* justify-content: flex-start; */
    height: 28px;
    /* flex-direction: row; */
    padding: 12px 10px 8px 10px;
  }

  .img {
    height: 100%;
    margin: 0 10px 0 5px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}
.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
    background-color: #92b2d4;
  }

  .el-menu-item:focus {
    background-color: #0a60bd;
  }
}
</style>
