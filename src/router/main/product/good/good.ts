import goodsVue from '@/views/main/product/goods/goods.vue'

const good = () => import('@/views/main/product/goods/goods.vue')
export default {
  path: '/main/product/goods',
  name: 'goods',
  component: goodsVue,
  children: []
}
