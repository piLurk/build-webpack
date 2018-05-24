import Vue from 'vue'
import App from './index.vue';
import mytable from '../table'

import '../table/lib/css/base.css'
Vue.use(mytable)

import 'element-ui/lib/theme-default/index.css'
// //引入elementUI组件
import ElementUI from 'element-ui'
Vue.use(ElementUI)

new Vue({
  el:'#app',
  render: h => h(App)
})