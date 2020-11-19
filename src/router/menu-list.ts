interface RouterConf {
  title     : string     // 标题
  key       : string
  brief?    : string     // 简称
  icon?     : string
  disabled? : boolean,
  isLeaf?   : boolean
  children? : RouterConf[]
}
const MenuList: RouterConf[] = [
  {
    title : '首页',
    key   : '/index',
    icon  : 'el-icon-s-home',
    isLeaf: true
  },
  {
    title   : '组织管理',
    key     : '/organization',
    icon    : 'el-icon-orange',
    children: [
      {
        title : '组织架构',
        key   : '/organization',
        isLeaf: true
      },
      {
        title : '组织管理',
        key   : '/admin',
        isLeaf: true
      },
    ]
  },
  {
    title : 'drawer',
    key   : '/drawer',
    icon  : 'el-icon-s-home',
    isLeaf: true
  },
  {
    title: 'approval',
    key: '/approval',
    icon: 'el-icon-s-home',
    isLeaf: true
  },
]

export default MenuList;