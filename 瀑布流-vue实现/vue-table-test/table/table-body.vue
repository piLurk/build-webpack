<template>
  <tbody>
    <tr v-for="(item, trKey) in data" key="trKey">
      <td v-for="(key, i) in keys" :key="key + i" v-text="item[key]"></td>
    </tr>
  </tbody>
  
</template>
<script>
export default {
  name:'MyTableBody',
  props: {
    data:{
      type: Array,
      default: function() {
        return []
      }
    },
    keys:{
      type: Array,
      default: function() {
        return []
      }
    },
  }
}
</script>
