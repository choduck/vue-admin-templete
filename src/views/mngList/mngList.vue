<template>
    <el-row>
        <el-col :span="10">
            <el-container>
                <el-main>
                    <div class="grid-content bg-purple">
                        <el-tree :data="setTree" :show-checkbox="false" node-key="id" ref="tree" highlight-current :props="defaultProps" @check="currentChecked" @node-click="handleNodeClick">
                        </el-tree>
                    </div>
                </el-main>
            </el-container>
        </el-col>
        <el-col :span="14">
        <el-container>
            <el-main>
                <el-row>
                    <el-table>
                        <el-table-column prop="prod_no" label="한글명" width="180" align="center">
                           <el-input v-model="title" class="edit-input" size="small" /> </el-table-column>
                        <el-table-column prop="work_stat_nm" label="영문명" align="center"> 
                           <el-input v-model="title" class="edit-input" size="small" />
                        </el-table-column>
                        <el-table-column prop="t1_old_catg_nm" label="등록" width="180" align="center">
                             <template slot-scope="scope">
                               <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
                <el-row>
                    <el-table >
                        <el-table-column prop="prod_no" label="순서" width="180" align="center"> </el-table-column>
                        <el-table-column prop="work_stat_nm" label="카테고리명" align="center"> </el-table-column>
                        <el-table-column prop="prod_no" label="한글명" width="180" align="center"> </el-table-column>
                        <el-table-column prop="work_stat_nm" label="영문명" align="center"> </el-table-column>
                        <el-table-column prop="t1_old_catg_nm" label="그룹" width="180" align="center"> </el-table-column>
                        <el-table-column prop="t1_old_catg_nm" label="이동" width="180" align="center"> </el-table-column>
                    </el-table>
                </el-row>
            </el-main>
        </el-container>
        </el-col>
    </el-row>
</template>


<script>
import axios from 'axios'
import { getTreeList,selectNewCatPath,selectKdmLovVal,saveNewCatInfo } from '@/api/prodList'
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
      
      catg_info:[],
      catg_del_info:[],
      gpMatrNm:'',
      workUserCmmnt:'',
      inspUserCmmnt:'',
      keyword:'',
      
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
      var _this = this;


      value.forEach(function(element, index, array){
        console.log('displayList2 ===>' + `${JSON.stringify(element.id)}`);
        
        _this.catg_info.push(element.id)
        //console.log(`${JSON.stringify(array)}의 ${index}번째 요소 : ${JSON.stringify(element.id)}`);
      });
    },

    displayList3(value){
      
      //console.log('displayList3 ===>' + JSON.stringify(value))
      
      value.forEach(function(element, index, array){
        console.log(`'displayList3 ===>' + ${JSON.stringify(element.id)}`);
        this.catg_del_info.push(element.id)
        //console.log(`${JSON.stringify(array)}의 ${index}번째 요소 : ${JSON.stringify(element.id)}`);
      });
    },

    saveNewCatInfoClick(){

      var param = { catgInfo:this.catg_info,
                    catgDelInfo:this.catg_del_info,
                    prodNo:this.prodNo,
                    gpMatrNm:this.gpMatrNm,
                    gpProc1:this.gpProc1Info,
                    gpProc2:this.gpProc2Info,
                    workUserCo:this.workUserCmmnt,
                    inspUserCo:this.inspUserCmmnt,
                    keyword : this.keyword
                    }

      console.log('param ====>' + JSON.stringify(param))
      

      saveNewCatInfo(param).then(response => {
        
        console.log('response ==>' + JSON.stringify(response))

     })

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

