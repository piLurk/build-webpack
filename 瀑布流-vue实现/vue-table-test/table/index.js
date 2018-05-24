
import MyTable from './mytable.vue'
import MyTableColumn from './table-column'
export default {
  install(Vue, options) {
    Vue.component(MyTable.name, MyTable)
    Vue.component(MyTableColumn.name, MyTableColumn)
  }
}