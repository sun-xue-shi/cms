const modalConfig = {
  header: {
    newTitle: '新建部门',
    editTitle: '编辑部门'
  },
  formItems: [
    {
      prop: 'name',
      type: 'input',
      label: '部门名称',
      placeholder: '请输入部门名称',
      initialValue: '11'
    },
    {
      prop: 'leader',
      type: 'input',
      label: '部门主管',
      placeholder: '请输入部门主管'
    },
    {
      prop: 'parebtId',
      type: 'select',
      label: '上级部门',
      placeholder: '请输入上级部门',
      options: <any>[]
    }
  ]
}

export default modalConfig
