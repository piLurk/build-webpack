
import JrTable from './jrtable.vue'
import JrTableColumn from './table-column'
import './lib/css/base.css'
exports.install = function(Vue, options) {
  Vue.component(JrTable.name, JrTable)
  Vue.component(JrTableColumn.name, JrTableColumn)
}