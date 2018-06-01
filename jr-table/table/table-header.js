

export default {
  name:'JrTableHead',
  props: {
    store:{
      require:true
    },
    labels:{
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data(){
    return {
      data:[]
    }
  },
  computed:{
    halfCheck(){
			if(this.selectNum === this.data.length || this.selectNum === 0){
				return false;
			}else{
				return true;
			}
		},
		selectNum(){
			var checkNum=0;
			for(let i of this.data){
				if(i.selected === true){
					checkNum++;
				}
			}
			return checkNum;
		},
		allCheck(){
			if(this.selectNum === this.data.length && this.selectNum!==0){
				return true
			}else{
				return false
			}
		},
    columns(){
      return this.store.states.columns;
    },
    table(){
      return this.$parent;
    }
  
  },
  methods: {
    updateData(){
      // hack 
      this.data = [...this.store.states.data]
    },
    allSelectClick(event, data) {
      // 选择或取消所有
      this.store.commit('allRowSelectedChanged');
      // 更新 data
      this.updateData();
    },
    isSelected(){
      return this.allCheck;
    },
    isHalfSelected(){
      return this.halfCheck;
    }
  },
  created(){

    this.data =  this.store.states.data

  },
  render(h) {
    return (
      <thead>
        <tr>
          {
            this._l(this.columns, 
              column =>           
                  column['type'] === 'section'?
                    <th class = "section-td">
                      <i 
                        class={ [{'section-checkbox':true, isSelected: this.isSelected(), isHalfSelected:this.isHalfSelected()}] }
                        on-click={ ($event) => this.allSelectClick($event) }
                      ></i>
                    </th>
                  :
                  <th>{ column.label }</th>
            )
          }
        </tr>
      </thead>
    )
  }
}