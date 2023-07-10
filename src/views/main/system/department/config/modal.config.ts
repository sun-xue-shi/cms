const modalConfig = {
  pageName: 'department',
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
      initialValue: ''
    },
    {
      prop: 'leader',
      type: 'input',
      label: '部门主管',
      placeholder: '请输入部门主管'
    },
    {
      prop: 'parentId',
      type: 'select',
      label: '上级部门',
      options: [],
      placeholder: '请输入上级部门'
    }
  ]
}

export default modalConfig
