// router.js
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      { path: '/', component: () => import('./view/workbench/workbench.vue') },
      { path: '/department', component: () => import('./view/department/department.vue') }
    ]
  })
}