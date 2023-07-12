<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig.header?.title }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">
        {{ contentConfig.header?.btnTitle }}
      </el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.contentItem" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <!-- 插槽 => 定制化 -->
            <!-- <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column> -->
          </template>
          <template v-else-if="item.type === 'handle'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  text
                  size="small"
                  type="primary"
                  icon="Edit"
                  @click="handleEditBtnClick(scope.row)"
                  v-if="isUpdate"
                >
                  编辑
                </el-button>
                <el-button
                  text
                  size="small"
                  type="danger"
                  icon="Delete"
                  @click="handleDeleteClick(scope.row.id)"
                  v-if="isDelete"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <!-- v-bind="item"将有用的属性自动绑定?? -->
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30]"
      size="small"
      layout="sizes, prev, pager, next, jumper,total"
      :total="pageTotalCount"
      @update:page-size="handleSizeChange"
      @update:current-page="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'
import useLoginStore from '@/store/login/login'
import usePermissions from '@/hooks/usePermissions'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    contentItem: any[]
    childrenTree?: {}
  }
}
const props = defineProps<IProps>()

//获取是否有对应的增删改查权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

//请求userlist数据
const currentPage = ref(1)
const pageSize = ref(10)
const systemStore = useSystemStore()
//监听systemStore中的action执行
systemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'editPageDataAction' ||
      name === 'newPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})
fetchPageListData()
//获取并展示pagelist数据(storeToRefs响应处理)
const { pageList, pageTotalCount } = storeToRefs(systemStore)

//分页器相关逻辑
function handleSizeChange() {
  fetchPageListData()
}

function handleCurrentChange() {
  fetchPageListData()
}

//发送网络请求使list变化
function fetchPageListData(searchForm: any = {}) {
  // if (!isQuery) return

  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...searchForm }

  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

defineExpose({ fetchPageListData })

//删除操作
function handleDeleteClick(id: number) {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}

//新建/编辑用户操作
const emit = defineEmits(['newBtnClick', 'editBtnClick'])
function handleNewUserClick() {
  emit('newBtnClick')
}

function handleEditBtnClick(itemData: any) {
  emit('editBtnClick', itemData)
}
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
