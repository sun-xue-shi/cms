import MyRequest from '..'

export function getAmountList() {
  return MyRequest.get({
    url: '/goods/amount/list'
  })
}

export function getGoodsCategoryCount() {
  return MyRequest.get({
    url: '/goods/category/count'
  })
}

export function getGoodsCategorySale() {
  return MyRequest.get({
    url: '/goods/category/sale'
  })
}

export function getGoodsCategoryFavor() {
  return MyRequest.get({
    url: '/goods/category/favor'
  })
}

export function getGoodsAddressSale() {
  return MyRequest.get({
    url: '/goods/address/sale'
  })
}
