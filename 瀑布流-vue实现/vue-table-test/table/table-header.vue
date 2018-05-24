
<template>
  <thead>
    <tr>
      <th v-for="(lable, i) in labels" :key="lable + i" v-text="lable"></th>
    </tr>
  </thead>
</template>
<script>
export default {
  name:'MyTableHead',
  props: {
    labels:{
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>
