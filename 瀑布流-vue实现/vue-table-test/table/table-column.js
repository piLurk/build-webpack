
export default {
  name: 'MyTableColumn',
  props: {
    type: String,
    label: String,
    prop: String
  },
  data() {
    return {

    }
  },
  computed: {
    owner() {
      let parent = this.$parent;
      return parent;
    }
  },
  created() {
    let owner = this.owner;

    
    owner.addHeader({label:this.label, prop: this.prop})


  },
  render(h) {

  }


}