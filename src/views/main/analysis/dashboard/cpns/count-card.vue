<template>
  <div class="count-card">
    <div class="header">
      <span class="title">{{ props.title }}</span>
      <el-tooltip :content="props.tips" placement="top" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span class="count" ref="count1Ref">{{ props.number1 }}</span>
    </div>
    <div class="footer">
      <span class="text">{{ props.title }}</span>
      <span ref="count2Ref">{{ props.number1 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CountUp } from 'countup.js'
import { onMounted, ref } from 'vue'
interface Iprops {
  title: string
  tips: string
  number1: number
  amount: string
}

const props = defineProps<Iprops>()

//创建CountUp的实例对象
const count1Ref = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()
//加前缀否?
const countOption = {
  prefix: props.amount === 'saleroom' ? '￥' : ''
}
onMounted(() => {
  const countup1 = new CountUp(count1Ref.value!, props.number1, countOption)
  countup1.start()
  const countup2 = new CountUp(count2Ref.value!, props.number1, countOption)
  countup2.start()
})
</script>
<style scoped lang="less">
.count-card {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  background-color: #fff;
  height: 130px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    justify-content: space-between;
    color: gray;
    height: 38px;
    font-size: 15px;
    padding-top: 18px;
  }

  .content {
    display: flex;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 5px;

    .count {
      font-size: 26px;
    }
  }

  .footer {
    display: flex;
    color: #444141;
    height: 38px;
    line-height: 38px;
    letter-spacing: 1px;
    font-size: 14px;

    .text {
      margin-right: 5px;
    }
  }
}
</style>
