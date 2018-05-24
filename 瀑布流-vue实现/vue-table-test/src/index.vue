<template>
  <div id="tablePage">
    <h1>这里是表格</h1>

    


    <my-table
      :data="tableList"
    >
      <my-table-column
        type="index"
        prop="name"
        label="客户姓名"
      ></my-table-column>

      <my-table-column
        prop="name"
        label="客户姓名"
      ></my-table-column>

      <my-table-column
        prop="year"
        label="年龄"
      ></my-table-column>
    
    </my-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tableList:[{name:'tom',year:17}]
    }
  },

}

</script>