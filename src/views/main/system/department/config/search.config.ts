const searchConfig = {
  pageName: 'department',
  formItem: [
    {
      type: 'input',
      prop: 'name',
      label: '部门名称',
      placeholder: '请输入部门名称'
    },
    {
      type: 'input',
      prop: 'leader',
      label: '部门主管',
      placeholder: '请输入部门主管'
    },
    // {
    //   type: 'select',
    //   prop: 'enable',
    //   label: '状态',
    //   placeholder: '请选择状态',
    //   option: [
    //     {
    //       label: '启用',
    //       value: 1
    //     },
    //     {
    //       label: '禁用',
    //       value: 0
    //     }
    //   ]
    // },
    {
      type: 'date-picker',
      prop: 'creatAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
