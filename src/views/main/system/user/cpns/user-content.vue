<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="selection" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号码"
          width="150px"
        />
        <el-table-column
          align="center"
          prop="enable"
          label="状态"
          width="100px"
        >
          <template #default="scope">
            <el-button
              :type="scope.row.enable ? 'primary' : 'danger'"
              size="small"
              plain
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150px">
          <el-button text size="small" type="primary" icon="Edit">
            编辑
          </el-button>
          <el-button text size="small" type="danger" icon="Delete">
            删除
          </el-button>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30]"
      size="small"
      layout="sizes, prev, pager, next, jumper,total"
      :total="userTotalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'

//请求userlist数据
const currentPage = ref(1)
const pageSize = ref(10)
const systemStore = useSystemStore()
fetchUserListData()
//获取并展示userlist数据(storeToRefs响应处理)
const { userList, userTotalCount } = storeToRefs(systemStore)

//分页器相关逻辑

function handleSizeChange() {
  fetchUserListData()
}

function handleCurrentChange() {
  fetchUserListData()
}

function fetchUserListData(formData: any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...formData }

  systemStore.postUserListAction(queryInfo)
}

defineExpose({ fetchUserListData })
</script>
<style scoped lang="less">
.content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .title {
      font-size: 20px;
    }
  }
}

.el-button {
  margin-left: 0;
  padding: 5px 8px;
}

:deep(.el-table__cell) {
  padding: 12px 0;
}

.el-pagination {
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
