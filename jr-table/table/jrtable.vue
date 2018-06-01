
<template>
  <div class="tableBox">
    <slot></slot>
    <table class="modtable">
      <template
      v-if="showHeader"
      class="jr-table__header-wrapper"
      ref="headerWrapper">
      <jr-table-header
        ref="jrTableHeader"
        :store="store"
        :border="border"
        :default-sort="defaultSort"
      >
      </jr-table-header>
    </template>
      <jr-table-body
        :store="store"
        ref="jrTableBody"
      >
      </jr-table-body>
    </table>
  </div>
</template>

<script>
import JrTableBody from "./table-body"
import JrTableHeader from "./table-header"


import TableStore from './table-store';

// 表id 
  let tableIdSeed = 1;
export default {
  name:'JrTable',

  props:{
    data:{
      type:Array,
      default: function() {
        return []
      }
    },

    showHeader: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    selectOnIndeterminate: {
      type: Boolean,
      default: true
    }
  },
  components: {
    JrTableBody,
    JrTableHeader
  },
  data() {
    const store = new TableStore(this, {
      // 是否默认打开展开
      defaultExpandAll: this.defaultExpandAll
    });
    
    return {
      props:[],
      store,
      defaultSort:[],
    }
  },
  
  watch: {
    data: {
      immediate: true,
      handler(value) {
        this.store.commit('setData', value)
      }
    },
    'store.states.isRowSelection': {
      immediate: true,
      handler(value) {
        this.store.commit('toggleSelectPorp', value)
      }
    },
    'store.states.isRowExpanded': {
      immediate: true,
      handler(value) {
        this.store.commit('toggleExpandPorp', value)
      }
    }

  },
  created() {
    this.tableId = 'jr-table_' + tableIdSeed++;
  }

}
</script>

<style>
  .section-td{
    width:40px;
  }
  .section-td .section-checkbox{
    position:relative;
    display:inline-block;
    width:14px;
    height:14px;
    border:1px solid #efefef;
    cursor:pointer;
    background-color:#fff;
  }
  .section-td .section-checkbox.isSelected{
    border-color:#3ba0ff;
  }
  .section-td .section-checkbox.isSelected::after{
    border-color:#3ba0ff;
    border-left: 0;
    border-top: 0;
    height: 8px;
    left: 5px;
    top: 1px;
    transform: rotate(45deg);
    width: 3px;
    -webkit-transform-origin: center;
    transform-origin: center;
  }
  .section-td .section-checkbox::after{
    box-sizing: content-box;
    content: "";
    position: absolute;
    border: 2px solid transparent;
  }

  .section-td .section-checkbox.isHalfSelected::after{
    border-color:#3ba0ff;
    border-width:1px;
    width:6px;
    top:6px;
    left:3px;
    
  }
  .arrowTd{
    cursor: pointer;
    width: 40px;
    box-sizing: border-box;
  }
  .arrowTd .arrow{
    background-image: url(./lib/images/uptable.png);
    background-repeat: no-repeat;
    display:inline-block;
    width:19px;
    height:19px;
  }
  .arrowTd .arrow.down{
    background-image: url(./lib/images/downtable.png)
  }

  .tableBox .modtable tr.active td {
    background-color: #3ba0ff;
    color: #fff;
  }
  
</style>