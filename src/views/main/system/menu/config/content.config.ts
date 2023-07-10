const contentConfig = {
  pageName: 'department',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  contentItem: [
    {
      type: 'normal',
      label: '菜单名称',
      prop: 'name',
      width: '150px'
    },
    {
      type: 'normal',
      label: '级别',
      prop: 'type',
      width: '120px'
    },
    {
      type: 'normal',
      label: '菜单url',
      prop: 'url',
      width: '120px'
    },
    {
      type: 'normal',
      label: '菜单icon',
      prop: 'icon',
      width: '120px'
    },
    {
      type: 'normal',
      label: '排序',
      prop: 'sort',
      width: '120px'
    },
    {
      type: 'timer',
      label: '创建时间',
      prop: 'creatAt'
    },
    {
      type: 'timer',
      label: '更新时间',
      prop: 'updateAt'
    },
    {
      type: 'handle',
      label: '操作',
      width: '150px'
    },
    {
      type: 'custom',
      label: '上级部门',
      prop: 'parentId',
      width: '120px',
      slotName: 'parent'
    },
    {
      type: 'custom',
      label: '部门主管',
      prop: 'leader',
      width: '120px',
      slotName: 'leader'
    }
  ]
}

export default contentConfig
