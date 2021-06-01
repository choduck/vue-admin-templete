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
      <el-row>
        <el-col :span="8">
          <el-form-item label="주요소재:"><el-input v-model="form.desc" type="input" />
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="주요공정:">        
            <el-select v-bind:style="{marginRight:'20px'}" v-model="gpProc1Info" @change="fetchKdmValListData('GP_PROC2')" placeholder="select">
              <el-option
                v-for="item in gpProc1"
                :key="item.lov_val"
                :label="item.lov_val_kor_nm"
                :value="item.lov_val">
              </el-option>
            </el-select>
            <el-select v-bind:style="{marginRight:'20px'}" v-model="gpProc2Info" placeholder="select">
              <el-option
                v-for="item in gpProc2"
                :key="item.lov_val"
                :label="item.lov_val_kor_nm"
                :value="item.lov_val">
              </el-option>
            </el-select>

          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="15">
          <el-form-item label="키워드추가:">
          </el-form-item>
        </el-col>
        <el-col :span="9">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="특이사항:">
          <el-input v-model="form.desc" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="반려사유:">
          <el-input v-model="form.desc" type="input" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="외부검색:">
            <el-button type="primary" v-on:click="displaytreeData">GoBiz</el-button>
            <el-button type="primary" v-on:click="displayList2">Allibaba</el-button>
         </el-form-item>
        </el-col>
        <el-col :span="2">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
        </el-col>
        <el-col :span="14">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">저장하기</el-button>
            <el-button type="primary" v-on:click="testAxios">검수요청</el-button>
            <el-button type="primary" v-on:click="displaytreeData">검수요청취소</el-button>
            <el-button type="primary" v-on:click="displayList2">이관</el-button>
          </el-form-item>
        </el-col>
      </el-row>            
<!--
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
        <el-button type="primary" v-on:click="testAxios">tree검색</el-button>
        <el-button type="primary" v-on:click="displaytreeData">vuex tree 검색</el-button>
        <el-button type="primary" v-on:click="displayList2">list2 검색</el-button>
      
      </el-form-item>
-->
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
import { getTreeList,selectNewCatPath,selectKdmLovVal } from '@/api/prodList'
import {getListData,data2treeDG, getTreeData } from '@/utils/category'
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
      gpProc1:[
      ],
      gpProc2:[
      ],
      gpProc1Info:'',
      gpProc2Info:'',
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
            if(this.treeList != '')
              _this.setTree = this.treeList
            //_this.setTree = getTreeData()
        } 
    }
  },
  
  created() {
    
    console.log('create this.treeList ==>' + this.treeList)
    if(this.treeList == ''){    
        
        getTreeList().then(response => {
        
        console.log("this.treeList == null")
        //console.log("response.data.treeModel =======>" + response.data.treeModel)
        let dataArray = []
        //commit('SET_TREELIST', response.data.treeModel)
        dataArray = getListData(response.data.treeModel)
        let treeInfo = ''
        this.setTree = data2treeDG(response.data.treeModel, dataArray)
        
      })
        
                
    }
    
    //this.setTree = getTreeData()
    console.log('this.setTree =====>' + JSON.stringify(this.setTree))
    this.fetchKdmValListData('GP_PROC1')
    //this.testAxios()
  
  
  },

  
  methods: {
    fetchKdmValList(value){
      
      console.log('fetchPromiseTest==========>')

      return new Promise((resolve, reject) => {
        selectKdmLovVal({
          lovCd: value,
          upLovVal: this.gpProc1Info !=''? this.gpProc1Info :''

        }).then(response => {
          
          console.log('value ===> ' + value)

          console.log('response ==>' + JSON.stringify(response))
          console.log('response.data ==>' + JSON.stringify(response.data.kdmLovVal))
          

          if(value == 'GP_PROC1') 
            this.gpProc1 = response.data.kdmLovVal
          else if(value == 'GP_PROC2')
            this.gpProc2 = response.data.kdmLovVal         
          
          console.log('this.gpProc2 ==>' + JSON.stringify(this.gpProc2))

          resolve(value = 'GP_PROC1'? this.gpProc1 : this.gpProc2)
        
        }).catch(error => {
          reject(error)
        })
 
      
      })  
    },
    
    async fetchKdmValListData(value) {
      
      this.gpProc2Info = ''
      console.log('gpProc1Info ==>' + this.gpProc1Info)
      
      var list = await this.fetchKdmValList(value)
      console.log('async fetchKdmValList ====>' + list)
    },

    displayList2(value){
      
      console.log('displayList2 ===>' + JSON.stringify(value))
    },
    
    handleNodeClick(setTree) {
      
      console.log('setTree.id ==> ' + setTree.id)
      console.log('setTree.labal ==> ' + setTree.label)

      selectNewCatPath({
        catgCd: setTree.id

      }).then(response => {
        
        console.log('response ==>' + JSON.stringify(response))
        console.log('response.data.newCatPath ==>' + response.data.newCatPath[0].path)

        let objCatTemp = {
            id: setTree.id,
            label:setTree.label,
            path:response.data.newCatPath[0].path 
        }

        
        this.newCatg.push(objCatTemp)
        console.log('this.newCatg ==>' + JSON.stringify(this.newCatg))

        this.list1.push(setTree.label)
        //this.list2.push(setTree.label)
        console.log(setTree.label);


      })

      
      
    
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

