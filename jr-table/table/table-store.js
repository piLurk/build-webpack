
import debounce from 'throttle-debounce/debounce';
import { POINT_CONVERSION_COMPRESSED } from 'constants';


const sortData = (data, states) => {
  const sortingColumn = states.sortingColumn;
  if (!sortingColumn || typeof sortingColumn.sortable === 'string') {
    return data;
  }
  return orderBy(data, states.sortProp, states.sortOrder, sortingColumn.sortMethod, sortingColumn.sortBy);
};


// 切换行的选中状态
const toggleRowSelection = function(states, row, selected) {
  let changed = false;
  const selection = states.selection;
  const index = selection.indexOf(row);
  if (typeof selected === 'undefined') {
    if (index === -1) {
      selection.push(row);
      changed = true;
    } else {
      selection.splice(index, 1);
      changed = true;
    }
  } else {
    if (selected && index === -1) {
      selection.push(row);
      changed = true;
    } else if (!selected && index > -1) {
      selection.splice(index, 1);
      changed = true;
    }
  }

  return changed;
};
const getRowSelection = function(states) {
  let data = states.data;
  return data.filter( (item, index) => {
    return item['selected']
  })
}
const toggleRowExpansion = function(states, row, expanded) {
  let changed = false;
  const expandRows = states.expandRows;
  if (typeof expanded !== 'undefined') {
    const index = expandRows.indexOf(row);
    if (expanded) {
      if (index === -1) {
        expandRows.push(row);
        changed = true;
      }
    } else {
      if (index !== -1) {
        expandRows.splice(index, 1);
        changed = true;
      }
    }
  } else {
    const index = expandRows.indexOf(row);
    if (index === -1) {
      expandRows.push(row);
      changed = true;
    } else {
      expandRows.splice(index, 1);
      changed = true;
    }
  }

  return changed;
};
// table store
const TableStore = function(table, initialState = {}) {
  if (!table) {
    throw new Error('Table is required.');
  }
  this.table = table;
  
  this.states = {

    rowKey: null,

    _columns: [],

    originColumns: [],

    columns: [],
    
    fixedColumns: [],

    rightFixedColumns: [],

    leafColumns: [],

    fixedLeafColumns: [],

    rightFixedLeafColumns: [],

    leafColumnsLength: 0,

    fixedLeafColumnsLength: 0,

    rightFixedLeafColumnsLength: 0,

    isComplex: false,

    isRowExpanded: false, //是否有展开

    isRowSelection: false, //是否有选择项

    filteredData: null,

    data: null,

    sortingColumn: null,
    sortProp: null,
    sortOrder: null,
    isAllSelected: false,
    selection: [],
    reserveSelection: false,
    selectable: null,
    currentRow: null,
    hoverRow: null,
    filters: {},
    expandRows: [],
    defaultExpandAll: false,
    selectOnIndeterminate: false
  };

  for (let prop in initialState) {
    if (initialState.hasOwnProperty(prop) && this.states.hasOwnProperty(prop)) {
      this.states[prop] = initialState[prop];
    }
  }
};
TableStore.prototype.updateData = function(){
  const table = this.table;
  //table中各个子组件 更新data
  
  //第一次data变更，$refs不存在，且不需要更新数据
  var $refs = table.$refs;
  if('jrTableBody' in $refs && 'jrTableHeader' in $refs) {
    table.$refs['jrTableBody'].updateData();
    table.$refs['jrTableHeader'].updateData();
  }
  
}
TableStore.prototype.setSelections = function(){
  const table = this.table;
  let states = this.states;

  states.selection =  getRowSelection(states);
  let selection = states.selection;
  table.$emit('selection-change', selection ? selection.slice() : []);
  this.updateData()
}
TableStore.prototype.toggleDataPorp = function(prop, hasProp, defaultProp) {
  let data = this.states.data;
    data.forEach( ( item, index, arr ) => {
      if(hasProp){
        item[prop] = item[prop] || defaultProp || false;
      }else{
        delete item[prop]
      }
    })
}
TableStore.prototype.mutations = {
  setData(states, data) {

    // 数据引用发生变化，清空se
    const dataInstanceChanged = states._data !== data;
    states._data = data;

    states.data = sortData((data || []), states);



    if (!states.reserveSelection) {
      if (dataInstanceChanged) {
        // 数组引用发生变化，清空section.并且更新子组件data
        
        this.clearSelection();
        
        this.updateData()
      } else {
        // 数组引用未变化，清除内部变更（section）
        
        this.cleanSelection();
        this.updateData()
      }
    } 

    const defaultExpandAll = states.defaultExpandAll;
    if (defaultExpandAll) {
      this.states.expandRows = (states.data || []).slice(0);
    }


  },
  setRowExpanded(states, rowExpanded){
    states.isRowExpanded = rowExpanded;
  },
  setRowSelection(states, rowSelection) {
    states.isRowSelection = rowSelection;
  },
  toggleSelectPorp(states, hasSelectPorp){
    this.toggleDataPorp('selected', hasSelectPorp)
  },
  toggleExpandPorp(states, hasExpandProp) {
    let defaultProp = states.defaultExpandAll;
    this.toggleDataPorp('isExpand', hasExpandProp, (hasExpandProp ? defaultProp:undefined))
  },
  rowSelectedChanged(states, row) {
   // const changed = toggleRowSelection(states, row);
    row['selected'] = !row['selected'];
    this.setSelections()
  },
  allRowSelectedChanged(states) {
    let data = states.data;
    var hasSelect = data.find((item) => {
      return item['selected']
    })
    data.forEach( (row) => {
      row['selected'] = !hasSelect
    });
    this.setSelections()
  },
  rowExpandChanged(states, row) {
    row['isExpand'] = !row['isExpand']
  },

  insertColumn(states, column, index ) {

    let array = states.columns;

    if (typeof index !== 'undefined') {
      array.splice(index, 0, column);
    } else {
      array.push(column);
    }
    
    if (column.type === 'selection') {
      states.selectable = column.selectable;
      states.reserveSelection = column.reserveSelection;
    }
  }
};

const doFlattenColumns = (columns) => {
  const result = [];
  columns.forEach((column) => {
    if (column.children) {
      result.push.apply(result, doFlattenColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};
TableStore.prototype.isSelected = function(row) {
  return (this.states.selection || []).indexOf(row) > -1;
};

TableStore.prototype.clearSelection = function() {
  const states = this.states;
  states.isAllSelected = false;
  const oldSelection = states.selection;
  if (states.selection.length) {
    states.selection = [];
  }
  if (oldSelection.length > 0) {
    this.table.$emit('selection-change', states.selection ? states.selection.slice() : []);
  }
};
TableStore.prototype.cleanSelection = function() {
  const selection = this.states.selection || [];
  const data = this.states.data;
  let deleted;
  deleted = selection.filter((item) => {
    return data.indexOf(item) === -1;
  });
  
  deleted.forEach((deletedItem) => {
    selection.splice(selection.indexOf(deletedItem), 1);
  });

  if (deleted.length) {
    this.table.$emit('selection-change', selection ? selection.slice() : []);
  }
};

TableStore.prototype.commit = function(name, ...args) {
  
  const mutations = this.mutations;
  if (mutations[name]) {

    mutations[name].apply(this, [this.states].concat(args));
    
  } else {
    throw new Error(`Action not found: ${name}`);
  }
};
export default TableStore;