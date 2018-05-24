
<template>
  <div class="tableBox">
    <slot></slot>
    <table class="modtable">
      <template
      v-if="showHeader"
      class="el-table__header-wrapper"
      ref="headerWrapper">
      <my-table-header
        ref="tableHeader"
        :labels="labels"
        :border="border"
        :default-sort="defaultSort"
      >
      </my-table-header>
    </template>
      <my-table-body
        :data="data"
        :keys="props"
      >
      </my-table-body>
    </table>
  </div>
</template>

<script>


import MyTableBody from "./table-body.vue"
import MyTableHeader from "./table-header.vue"
export default {
  name:'MyTable',

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
    }
  },
  components: {
    MyTableBody,
    MyTableHeader
  },
  data() {
    return {
      labels:[],
      props:[],
      showItems:[],
      defaultSort:[],
    }
  },
  computed:{
    dataList() {
      return this.data.filters((item) => {
        labels.indexOf()
      })
    }
  },
  methods:{
    addHeader({label, prop}){
      if(this.labels.indexOf(label) === -1) {
        this.labels.push(label)
        this.props.push(prop)
      }
    },

  }

}
</script>