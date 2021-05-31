<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      
      <el-row>
        <el-col :span="7">
          <el-form-item label="상품 번호:">{{prodNo}}
            
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="상태:">{{work_stat_nm}}
          </el-form-item>
        </el-col>
        <el-col :span="10">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="상품명:">{{prodNm}}
          </el-form-item>
        </el-col>
        <el-col :span="9">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="카테고리:">{{old_catg_nm}}
          </el-form-item>
        </el-col>
        <el-col :span="9">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
            <el-button type="primary" @click="walletAddressGetAddPop()">신카테고리1</el-button> 
        </el-col>
        <el-col :span="20">
          <dnd-list :list1="newCatg"  list1-title="List"  @change1="displayList2" />
        </el-col>
      </el-row>
      
      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
        <el-button type="primary" v-on:click="testAxios">tree검색</el-button>
        <el-button type="primary" v-on:click="displaytreeData">vuex tree 검색</el-button>
        <el-button type="primary" v-on:click="displayList2">list2 검색</el-button>
      
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="walletAddressAddPop" :title="'신카테고리'" class="wallet-address-pop" width="40%">
      <!--
      <el-tree
        ref="tree2"
        :data="treeData"
        :props="defaultProps"
        class="filter-tree"
        default-expand-all
      />
      -->
      
      <el-tree :data="setTree" :show-checkbox="false" node-key="id" ref="tree" highlight-current :props="defaultProps" @check="currentChecked" @node-click="handleNodeClick">
      </el-tree>
      
<!--
    <el-button @click="getCheckedNodes">get by node</el-button>
          <el-tree
                  :data="setTree"
                  show-checkbox=""
                  node-key="id"
                  :expand-on-click-node="false"
                  ref="markupTree"
                  @node-click="handleNodeClick"
                  >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span class="catname">
                <el-input
                          v-model="setTree.label"
                          size="small"
                          :ref="'node'+ setTree.id"
                          ></el-input>
              </span>

              <span class="catmarkup">
                <el-input
                          placeholder="Please input"
                          v-model="setTree.label"
                          size="small"
                          v-bind:name="setTree.input"
                          >
                  <template slot="append">%</template>
                </el-input>
              </span>
              <el-button
                        icon="el-icon-check"
                        type="primary"
                        size="small"
                        v-on:click="applySelected(node.id)"
                        ></el-button>
            </span>

          </el-tree>
-->          
<!--
      <el-row>
        <el-col :span="7">
          <el-input placeholder="이름"></el-input>
        </el-col>
        <el-col :offset="1" :span="16">
          <el-input placeholder="주소 입력"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-checkbox v-model="destinationAddressChk" class="destination-address-chk"> 추가 주소 사용 </el-checkbox>
        </el-col>
        <el-col :span="18">
          <el-input v-if="destinationAddressChk" placeholder="데스티네이션 태그 또는 추가 주소 입력"></el-input>
        </el-col>
      </el-row>
      
-->      
      <div style="text-align:center; margin-top:15px;">
        <el-button @click="walletAddressAddPop = false;">닫기</el-button>
      </div>
    
    </el-dialog>


  
  
  </div>
</template>

<script>
import axios from 'axios'
import { getTreeList } from '@/api/prodList'
import {mapState} from 'vuex'
import DndList from '@/components/DndList'

export default {
  components: { DndList },
  data() {
    return {
      
      prodNo: this.$route.query.prodNo,
      prodNm: this.$route.query.prodNm,
      work_stat_nm: this.$route.query.work_stat_nm,
      old_catg_nm: this.$route.query.t1_old_catg_nm + '>' + this.$route.query.t2_old_catg_nm +  (this.$route.query.t3_old_catg_nm = 'undefined'? '': '>' + this.$route.query.t3_old_catg_nm) + (this.$route.query.t4_old_catg_nm = 'undefined'? '': '>' + this.$route.query.t4_old_catg_nm),
      
			walletAddressAddPop: false,							// 주소록 추가 팝업
			destinationAddressChk: false,						// 추가주소록 체크박스
      treeData:[],
      setTree:[],
      newCatg:[],
      list1:[],
      list2:[],
      data2: [{
        id: 1,
        label: 'Level one 1',
        children: [{
          id: 4,
          label: 'Level two 1-1',
          children: [{
            id: 9,
            label: 'Level three 1-1-1'
          }, {
            id: 10,
            label: 'Level three 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: 'Level one 2',
        children: [{
          id: 5,
          label: 'Level two 2-1'
        }, {
          id: 6,
          label: 'Level two 2-2'
        }]
      }, {
        id: 3,
        label: 'Level one 3',
        children: [{
          id: 7,
          label: 'Level two 3-1'
        }, {
          id: 8,
          label: 'Level two 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      //treeList:'', 

      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
 
 computed: {
    ...mapState({
      treeList: state => state.product.treeList
    }),
  },

  watch: {
    list2(value){
      console.log('value ===>' + value)
    },
    walletAddressAddPop(value) {

        console.log('value ===>' + value)
        
        if (value == true) { // 1주일
            
            var _this = this
            _this.setTree = this.treeList
            //_this.getListData()
/*            
            getTreeList().then(data => {
                
                _this.setTree = data.data.treeModel
                console.log('_this.setTree start==>')
                console.log('_this.setTree ==>' + JSON.stringify(_this.setTree))
                _this.getListData()
                  // this.$router.push({ path: '/table' });
            });
*/
        
        } 
    }
  },
  created() {
    console.log('ProdList =====>')
    //this.testAxios()
    //this.testAxios()
  },

  
  methods: {
    
    displayList2(value){
      
      console.log('displayList2 ===>' + value)
    },
    handleNodeClick(setTree) {
      this.newCatg.push(setTree.label)
      this.list1.push(setTree.label)
      //this.list2.push(setTree.label)
      console.log(setTree.label);
    
    },
    getListData() {
        let dataArray = [];
        
        console.log('forEach start ==>')
        this.setTree.forEach(function (data) {
          let parentId = data.parentId;
          
          console.log('parentId ==>' + parentId)
          
          if (parentId == '0000000000') {
              let objTemp = {
                  id: data.id,
                  label: data.name,
                  /*order: data.order,*/
                  parentId: parentId,
              }
              dataArray.push(objTemp);
          }
        })
        
        //console.log('this.setTree ==>' + this.setTree)
        console.log('dataArray ==>' + dataArray)
        
        this.data2treeDG(this.setTree, dataArray)
    },

    data2treeDG(datas, dataArray) {
      for (let j = 0; j < dataArray.length; j++) {
          let dataArrayIndex = dataArray[j];
          let childrenArray = [];
          let Id = dataArrayIndex.id;
          for (let i = 0; i < datas.length; i++) {
              let data = datas[i];

              let parentId = data.parentId;
              if (parentId == Id) {//Determine whether it is a child node
                  let objTemp = {
                      id: data.id,
                      label: data.name,
                    /* order: data.order,*/
                      parentId: parentId,
                  }
                  childrenArray.push(objTemp);
              }

          }
          dataArrayIndex.children = childrenArray;
          console.log(666)
          console.log(dataArrayIndex.children)
          if (childrenArray.length> 0) {//Recursive if there are son nodes
              this.data2treeDG(datas, childrenArray)
          }
      }
      this.setTree = dataArray;
      return dataArray;
    },

    currentChecked(data, currentChecked) {
      const { checkedNodes, halfCheckedNodes } = currentChecked
      console.log(checkedNodes, halfCheckedNodes)
    },

    isEmpty(value) { 
      if( value == "" || value == null || value == undefined){  
        return '' 
      }else{ 
        return value
      }
    },
		walletAddressGetAddPop() {
			
			this.walletAddressAddPop = true;
		},
    testAxios(){
      
      this.workStat = ['100','200','300']  
      var _this = this;


      var jsonData ={
        upCatgCd: '',
        catgLv: ''
        //workStat: '100'       
        //workStat: ''       
        //checkedExams1: ['100']
      }
      
      console.log('==========>' + JSON.stringify(jsonData))

      console.log('this.data2 ===>',this.data2)

      axios.post('http://localhost:9999/api/treeList', jsonData
      //axios.post('http://localhost:9999/api/prodList3', JSON.stringify(jsonData)
     //   ,{ headers: { 'Content-Type': 'application/json' } }
      )
      .then(function(response) {
          if (response.status == 200) {
              console.log(response.data.newCatList)
              _this.treeData = response.data.newCatList
          
          }
      })
    },
     
    displaytreeData() {
      console.log('treeList ===>' + this.treeList)
    },
     
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.el-tree-node__content {
    height: 55px !important;
}
</style>

