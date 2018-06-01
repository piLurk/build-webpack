
import objectAssign from './util/merge';

// 生成column组件id
let columnIdSeed = 1;


const getDefaultColumn = function(type, options) {
  const column = {};

  for (let name in options) {
    if (options.hasOwnProperty(name)) {
      const value = options[name];
      if (typeof value !== 'undefined') {
        column[name] = value;
      }
    }
  }

  if (!column.minWidth) {
    column.minWidth = 80;
  }

  column.realWidth = column.width === undefined ? column.minWidth : column.width;

  return column;
};

// 格式化宽度
const parseWidth = (width) => {
  if (width !== undefined) {
    width = parseInt(width, 10);
    if (isNaN(width)) {
      width = null;
    }
  }
  return width;
};

// 格式化最小宽度
const parseMinWidth = (minWidth) => {
  if (minWidth !== undefined) {
    minWidth = parseInt(minWidth, 10);
    if (isNaN(minWidth)) {
      minWidth = 80;
    }
  }
  return minWidth;
};



export default {
  name: 'JrTableColumn',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    width: {},
    minWidth: {},
    label: String,
    prop: String,

    className: String,
    labelClassName: String,
    property: String,
    renderHeader: Function,
    sortable: {
      type: [String, Boolean],
      default: false
    },
    sortMethod: Function,
    sortBy: [String, Function, Array],
    resizable: {
      type: Boolean,
      default: true
    },
    context: {},
    columnKey: String,
    align: String,
    headerAlign: String,
    showTooltipWhenOverflow: Boolean,
    showOverflowTooltip: Boolean,
    fixed: [Boolean, String],
    formatter: Function,
    selectable: Function,
    reserveSelection: Boolean,
    filterMethod: Function,
    filteredValue: Array,
    filters: Array,
    filterPlacement: String,
    filterMultiple: {
      type: Boolean,
      default: true
    },
    index: [Number, Function]
  },
  data() {
    return {
      // 当前column是否为column的下级
      isSubColumn: false,
      columns: []
    }
  },
  computed: {
    owner() {
      let parent = this.$parent;
      while (parent && !parent.tableId) {
        parent = parent.$parent;
      }
      return parent;
    },
    columnOrTableParent() {
      let parent = this.$parent;
      while (parent && !parent.tableId && !parent.columnId) {
        parent = parent.$parent;
      }
      return parent;                              `                                                                                                                                                                                       `
    }
  },
  created() {
    let owner = this.owner;


    let parent = this.columnOrTableParent;
    this.isSubColumn = owner !== parent;
    //当前column的Id
    this.columnId = (parent.tableId || parent.columnId) + '_column_' + columnIdSeed++;


    let type = this.type;


    const width = parseWidth(this.width);
    const minWidth = parseMinWidth(this.minWidth);

    let isColumnGroup = false;

    // 获取column默认配置
    let column = getDefaultColumn(type, {
      id: this.columnId,
      columnKey: this.columnKey,
      label: this.label,
      className: this.className,
      labelClassName: this.labelClassName,
      property: this.prop || this.property,
      type,
      renderCell: null,
      renderHeader: this.renderHeader,
      minWidth,
      width,
      isColumnGroup,
      context: this.context,
      align: this.align ? 'is-' + this.align : null,
      headerAlign: this.headerAlign ? 'is-' + this.headerAlign : (this.align ? 'is-' + this.align : null),
      sortable: this.sortable === '' ? true : this.sortable,
      sortMethod: this.sortMethod,
      sortBy: this.sortBy,
      resizable: this.resizable,
      showOverflowTooltip: this.showOverflowTooltip || this.showTooltipWhenOverflow,
      formatter: this.formatter,
      selectable: this.selectable,
      reserveSelection: this.reserveSelection,
      fixed: this.fixed === '' ? true : this.fixed,
      filterMethod: this.filterMethod,
      filters: this.filters,
      filterable: this.filters || this.filterMethod,
      filterMultiple: this.filterMultiple,
      filterOpened: false,
      filteredValue: this.filteredValue || [],
      filterPlacement: this.filterPlacement || '',
      index: this.index
    });
    this.columnConfig = column;

    var _self = this;
    if(type === 'expand') {
      // scopedSlots可以通过$scopedSlots.default(data)直接传递数据。
      // 这里有一个闭包，可以在owner中访问 this
      owner.renderExpanded = function(data) {
        return _self.$scopedSlots.default
          ? _self.$scopedSlots.default(data)
          : _self.$slots.default;
      }
      owner.store.commit('setRowExpanded', true)
    } 

    // 如果是section ,在原始数据上内部添加_selected字段， 如果是expand，添加 isExpand
    if(type === 'section') {
      owner.store.commit('setRowSelection', true)
    } 

    // 默认，没有传prop， 可能是操作项
    if(type === 'default' && !column.property) {
      var _key = 'renderDefault' + column.id; 
      owner[_key] = function(data) {
        return _self.$scopedSlots.default
          ? _self.$scopedSlots.default(data)
          : _self.$slots.default;
      }
    }
  },
  mounted() {
    const owner = this.owner;
    const parent = this.columnOrTableParent;
    var columnIndex;
    owner.store.commit('insertColumn', this.columnConfig, columnIndex );
  },
  render(h) {
    
  }


}