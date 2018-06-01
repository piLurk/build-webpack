import Vue from 'vue'
import App from './index.vue';

import jrtable from '../dist/jr-table.min.js'
Vue.use(jrtable)



new Vue({
  el:'#app',
  render: h => h(App)
})