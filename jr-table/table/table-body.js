

export default {
  name:'JrTableBody',
  props: {
    store:{
      require:true
    },
    props:{
      type: Array,
      default: function() {
        return []
      }
    },
  },
  data(){
    return {
      data:[]
    }
  },
  methods:{
    updateData(){
      // hack 
      this.data = [...this.store.states.data]
    },
    getCells(row, index){
       return this._l(this.columns, column =>  this.getTdAppend(row, column, index) )
    },
    getTdAppend(row, column, index){
      if(column['type'] === 'index') {
        return <td> { index + 1 } </td> 
      }
      
      if(column['type'] === 'expand') {
        return (<td class = "arrowTd">
                  <i 
                    class="arrow down"
                    class={ [{'arrow':true, down: this.isDown(row)}] }
                    on-click={ ($event) => this.expandClick($event, row) }
                  ></i>
                </td>) 
      }

      if(column['type'] === 'section') {
        return (<td class = "section-td">
                  <i 
                    class={ [{'section-checkbox':true, isSelected: this.isSelected(row)}] } 
                    on-click={ ($event) => this.simpleSelectClick($event, row) }
                  ></i>
                </td>) 
      }
      
      return <td> { 
        column['property']? 
          (row[ column['property'] ] )
          :
          (this.table['renderDefault' + column.id] ? this.table['renderDefault' + column.id]({row, index}):'')
        } 
        </td>
    },
    isSelected(row){
      return row['selected']
    },
    isDown(row) {
      return row['isExpand'] 
    },
    simpleSelectClick(event, row) {
      this.store.commit('rowSelectedChanged', row)
      this.updateData();
    },
    expandClick(event, row) {
      this.store.commit('rowExpandChanged', row)
      this.updateData();
    }
  },
  created(){
    this.data = this.store.states.data;
  },
  computed:{
    table() {
      return this.$parent;
    },
    columns(){
      return this.store.states.columns
    },
    isRowExpanded(){
      return this.store.states.isRowExpanded;
    },
  },
  render(h) {
    return (
      <tbody>
        {
          this._l(this.data, (row, index) => 
            [
              <tr 
                class={ [{active: this.isDown(row)}] }>
                {
                  this.getCells(row, index)
                }
              </tr>,
              this.isRowExpanded
                ? (<tr class="children" v-show={ row.isExpand }>
                  <td colspan={ this.columns.length }>
                    { this.table.renderExpanded ? this.table.renderExpanded( {row, index}) : '' }
                  </td>
                </tr>)
                : ''
            ]
           )
        }
      </tbody>
    )
  }
}