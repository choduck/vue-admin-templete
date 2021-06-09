import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },


  {
    path: '/',
    component: Layout,
    children: [{
      path: '/',
      name: '상품 목록',
      component: () => import('@/views/prodList/index'),
      meta: { title: '상품 목록', icon: 'list' }
    }]
  },
  {
    path: '/stats',
    component: Layout,
    children: [{
      path: '/stats',
      name: '상품 통계',
      component: () => import('@/views/statsList/index'),
      meta: { title: '상품 통계', icon: 'excel' }
    }]
  },
  {
    path: '/trans',
    component: Layout,
    children: [{
      path: '/trans', 
      name: '상품 이관',
      component: () => import('@/views/transList/transList'),
      meta: { title: '상품 이관', icon: 'drag' }
    }]
  },
  {
    path: '/detail',
    component: Layout,
    children: [{
      path: '/detail',
      name: '상품 상세',
      hidden: true,
      component: () => import('@/views/prodList/prodDetail'),
      meta: { title: '상품 상세', icon: 'table' }
    }]
  },
  {
    path: '/mngList',
    component: Layout,
    redirect: '/mngList/mngList',
    children: [{
      path: 'index',
      name: '상품 상세',
      component: () => import('@/views/mngList/mngList'),
      meta: { title: '카테고리 관리', icon: 'tree' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
