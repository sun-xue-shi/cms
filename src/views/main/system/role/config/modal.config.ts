const modalConfig = {
  pageName: 'role',
  header: {
    newTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    {
      prop: 'name',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称',
      initialValue: ''
    },
    {
      prop: 'intro',
      type: 'input',
      label: '角色权限',
      placeholder: '请输入角色权限'
    }
  ]
}

export default modalConfig
