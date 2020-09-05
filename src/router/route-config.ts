interface RouterConf {
  title  : string     // 标题
  name   : string
  brief? : string     // 简称
  path   : string
  icon?  : string
  disabled? : boolean,
  isLeaf?: boolean
  children?: RouterConf[]
  component?: () => any
}
const RouterConfig = [
  {
    title: '首页',
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
]