import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/index',
    component: () => import('@/layout/main.vue'),
    children: [
      {
        path: 'index',
        name: 'index',
        meta: { keepAlive: '首页' },
        component: () => import('@/views/index/index.vue')
      },
      {
        path: 'organization',
        name: 'organization',
        meta: { keepAlive: '组织架构' },
        component: () => import('@/views/organization/index.vue')
      },
      {
        path: 'drawer',
        name: 'drawer',
        component: () => import('@/views/drawer/index')
      },
      {
        path: 'approval',
        name: 'approval',
        component: () => import('@/views/approval/index.vue')
      },
    ]
  },
  {
    path: '/error/:type',
    name: '404',
    component: () => import('@/views/error.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '*',
    redirect: '/error/404'
  }
]
export default routes;