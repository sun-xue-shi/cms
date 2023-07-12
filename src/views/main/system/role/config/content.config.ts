const contentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  contentItem: [
    {
      type: 'selection',
      width: '60px'
    },
    {
      type: 'index',
      label: '序号',
      width: '60px'
    },
    {
      type: 'normal',
      label: '角色名称',
      prop: 'name',
      width: '120px'
    },
    {
      type: 'normal',
      label: '角色权限',
      prop: 'intro',
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
    }

    // {
    //   type: 'custom',
    //   label: '上级部门',
    //   prop: 'parentId',
    //   width: '120px',
    //   slotName: 'parent'
    // },
    // {
    //   type: 'custom',
    //   label: '部门主管',
    //   prop: 'leader',
    //   width: '120px',
    //   slotName: 'leader'
    // }
  ]
}

export default contentConfig
