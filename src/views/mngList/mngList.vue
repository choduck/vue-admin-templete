<template>
  <el-row>
    <el-col :span="10">
      <el-container>
        <el-main>
          <div class="grid-content bg-purple" style="border-right: #60626614 solid;">
            <el-tree
              ref="tree"
              :data="setTree"
              :show-checkbox="false"
              node-key="id"
              highlight-current="highlight-current"
              :props="defaultProps"
              @check="currentChecked"
              @node-click="handleNodeClick"
            />
          </div>
        </el-main>
      </el-container>
    </el-col>
    <el-col :span="13" style="margin-top:50px;">
      <el-card class="box-card">
        <div id="root">
          <div v-if="write">
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label-width="60px" label="Author:" class="postInfo-container-item">
                <el-select v-model="form.author" :remote-method="getRemoteUserList" filterable default-first-option remote placeholder="Search user">
                  <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item" />
                </el-select>
              </el-form-item>
              <el-form-item label="카테고리 한글명">
                <el-input placeholder="검색어를 입력하세요" />
              </el-form-item>
              <el-form-item label="카테고리 영문명">
                <el-input placeholder="검색어를 입력하세요" />
              </el-form-item>
              <el-form-item label="그룹">
                <el-input placeholder="검색어를 입력하세요" />
              </el-form-item>
            </el-form>
            <el-row>
              <el-button v-if="update" type="primary" @click="onUpdateButton">수정</el-button>
              <el-button v-else type="primary" @click="onSaveButton">등록</el-button>
              <el-button type="primary" @click="onDetailButton">목록</el-button>
            </el-row>
          </div>
          <div v-else>
            <el-form ref="form" :model="form" label-width="120px">
              <el-form-item label-width="60px" label="Author:" class="postInfo-container-item" />
              <el-form-item label="ID">asdad</el-form-item>
              <el-form-item label="레벨">asdad</el-form-item>
              <el-form-item label="카테고리 한글명">asdad</el-form-item>
              <el-form-item label="카테고리 영문명">asdsadasdsad</el-form-item>
              <el-form-item label="사용여부">asdad</el-form-item>
              <el-form-item label="생성자">asdad</el-form-item>
              <el-form-item label="생성일자">asdad</el-form-item>
              <el-form-item label="수정자">asdad</el-form-item>
              <el-form-item label="수정일자">asdad</el-form-item>
            </el-form>
            <el-row>
              <el-button type="primary" @click="onSaveButton">등록</el-button>
              <el-button type="primary" @click="onUpdateButton">수정</el-button>
              <el-button type="primary" @click="onDeleteButton">삭제</el-button>
              <el-button type="primary" @click="onMoveButton">이동</el-button>
            </el-row>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'
import { getTreeList, selectKdmLovVal, saveNewCatInfo } from '@/api/prodList'
import { getList } from '@/api/catgMng'
import { getListData, data2treeDG } from '@/utils/category'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      tableData: [],
      write: false,
      update: false,
      prodNo: this.$route.query.prodNo,
      prodNm: this.$route.query.prodNm,
      work_stat_nm: this.$route.query.work_stat_nm,

      walletAddressAddPop: false, // 주소록 추가 팝업
      destinationAddressChk: false, // 추가주소록 체크박스
      treeData: [],
      setTree: [],
      newCatg: [],
      list1: [],
      list2: [],
      gpProc1: [],
      gpProc2: [],
      gpProc1Info: '',
      gpProc2Info: '',

      catg_info: [],
      catg_del_info: [],
      gpMatrNm: '',
      workUserCmmnt: '',
      inspUserCmmnt: '',
      keyword: '',

      data2: [
        {
          id: 1,
          label: 'Level one 1',
          children: [
            {
              id: 4,
              label: 'Level two 1-1',
              children: [
                {
                  id: 9,
                  label: 'Level three 1-1-1'
                },
                {
                  id: 10,
                  label: 'Level three 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: 'Level one 2',
          children: [
            {
              id: 5,
              label: 'Level two 2-1'
            },
            {
              id: 6,
              label: 'Level two 2-2'
            }
          ]
        },
        {
          id: 3,
          label: 'Level one 3',
          children: [
            {
              id: 7,
              label: 'Level two 3-1'
            },
            {
              id: 8,
              label: 'Level two 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      // treeList:'',
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
    })
  },

  watch: {
    list2(value) {
      console.log('value ===>' + value)
    },
    walletAddressAddPop(value) {
      console.log('value ===>' + value)

      if (value === true) {
        // 1주일

        var _this = this
        if (this.treeList !== '') _this.setTree = this.treeList
        // _this.setTree ()
      }
    }
  },

  created() {
    console.log('create this.treeList ==>' + this.treeList)
    if (this.treeList === '') {
      getTreeList().then(response => {
        console.log('this.treeList == null')
        // console.log("response.data.treeModel =======>" + response.data.treeModel)
        let dataArray = []
        // commit('SET_TREELIST', response.data.treeModel)
        dataArray = getListData(response.data.treeModel)
        this.setTree = data2treeDG(response.data.treeModel, dataArray)
      })
    }

    // this.setTree ()
    console.log('this.setTree =====>' + JSON.stringify(this.setTree))
    this.fetchKdmValListData('GP_PROC1')
    // this.testAxios()
  },

  methods: {
    fetchKdmValList(value) {
      console.log('fetchPromiseTest==========>')

      return new Promise((resolve, reject) => {
        selectKdmLovVal({
          lovCd: value,
          upLovVal: this.gpProc1Info !== '' ? this.gpProc1Info : ''
        })
          .then(response => {
            console.log('value ===> ' + value)

            console.log('response ==>' + JSON.stringify(response))
            console.log(
              'response.data ==>' + JSON.stringify(response.data.kdmLovVal)
            )

            if (value === 'GP_PROC1') this.gpProc1 = response.data.kdmLovVal
            else if (value === 'GP_PROC2') { this.gpProc2 = response.data.kdmLovVal }

            console.log('this.gpProc2 ==>' + JSON.stringify(this.gpProc2))

            resolve((value === 'GP_PROC1' ? this.gpProc1 : this.gpProc2))
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getRemoteUserList(query) {
    },
    async fetchKdmValListData(value) {
      this.gpProc2Info = ''
      console.log('gpProc1Info ==>' + this.gpProc1Info)

      var list = await this.fetchKdmValList(value)
      console.log('async fetchKdmValList ====>' + list)
    },

    saveNewCatInfoClick() {
      var param = {
        catgInfo: this.catg_info,
        catgDelInfo: this.catg_del_info,
        prodNo: this.prodNo,
        gpMatrNm: this.gpMatrNm,
        gpProc1: this.gpProc1Info,
        gpProc2: this.gpProc2Info,
        workUserCo: this.workUserCmmnt,
        inspUserCo: this.inspUserCmmnt,
        keyword: this.keyword
      }

      console.log('param ====>' + JSON.stringify(param))

      saveNewCatInfo(param).then(response => {
        console.log('response ==>' + JSON.stringify(response))
      })
    },

    handleNodeClick(setTree) {
      getList({
        newCatgCd: setTree.id
      }).then(response => {
        console.log(response.data.newctgyList)
        this.tableData = response.data.newctgyList
        var tableSize = this.tableData.length + 1
        this.listLoading = false

        console.log('response.data ==>' + this.tableData[tableSize])
        this.tableData[tableSize]
      })
    },

    getListData() {
      const dataArray = []

      console.log('forEach start ==>')
      this.setTree.forEach(function(data) {
        const parentId = data.parentId

        console.log('parentId ==>' + parentId)

        if (parentId === '0000000000') {
          const objTemp = {
            id: data.id,
            label: data.name,
            /* order: data.order,*/
            parentId: parentId
          }
          dataArray.push(objTemp)
        }
      })

      // console.log('this.setTree ==>' + this.setTree)
      console.log('dataArray ==>' + dataArray)

      this.data2treeDG(this.setTree, dataArray)
    },

    data2treeDG(datas, dataArray) {
      for (let j = 0; j < dataArray.length; j++) {
        const dataArrayIndex = dataArray[j]
        const childrenArray = []
        const Id = dataArrayIndex.id
        for (let i = 0; i < datas.length; i++) {
          const data = datas[i]

          const parentId = data.parentId
          if (parentId === Id) {
            // Determine whether it is a child node
            const objTemp = {
              id: data.id,
              label: data.name,
              /* order: data.order,*/
              parentId: parentId
            }
            childrenArray.push(objTemp)
          }
        }
        dataArrayIndex.children = childrenArray
        console.log(666)
        console.log(dataArrayIndex.children)
        if (childrenArray.length > 0) {
          // Recursive if there are son nodes
          this.data2treeDG(datas, childrenArray)
        }
      }
      this.setTree = dataArray
      return dataArray
    },

    currentChecked(data, currentChecked) {
      const { checkedNodes, halfCheckedNodes } = currentChecked
      console.log(checkedNodes, halfCheckedNodes)
    },

    isEmpty(value) {
      if (value === '' || value == null || value === undefined) {
        return ''
      } else {
        return value
      }
    },
    walletAddressGetAddPop() {
      this.walletAddressAddPop = true
    },
    testAxios() {
      this.workStat = ['100', '200', '300']
      var _this = this

      var jsonData = {
        upCatgCd: '',
        catgLv: ''
        // workStat: '100'
        // workStat: ''
        // checkedExams1: ['100']
      }

      console.log('==========>' + JSON.stringify(jsonData))

      console.log('this.data2 ===>', this.data2)

      axios
        .post(
          'http://localhost:9999/api/treeList',
          jsonData
          // axios.post('http://localhost:9999/api/prodList3', JSON.stringify(jsonData)
          //   ,{ headers: { 'Content-Type': 'application/json' } }
        )
        .then(function(response) {
          if (response.status === 200) {
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
    },
    // 등록 화면 버튼
    onSaveButton() {
      this.write = true
      this.update = false
    },
    // 수정 화면 버튼
    onUpdateButton() {
      // eslint-disable-next-line no-sequences
      this.write = true,
      this.update = true
    },
    // 목록 화면 버튼
    onDetailButton() {
      this.write = false
    },
    // 삭제 버튼
    onDeleteButton() {

    }
  }
}
</script>

<style scoped>
.line {
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
