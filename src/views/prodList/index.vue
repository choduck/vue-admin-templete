<template>
  <section>  
<div class="app-container">
    <el-form class="toolbar" >
      <el-form-item label="카테고리 분류">
        <el-select v-bind:style="{marginRight:'20px'}" v-model="oldCatg" @change="fetchOldCatgData()" placeholder="Select">
          <el-option
            v-for="item in oldCtgyList"
            :key="item.old_catg_cd"
            :label="item.old_catg_kor_nm"
            :value="item.old_catg_cd">
          </el-option>
        </el-select>
        <el-select v-bind:style="{marginRight:'20px'}" v-model="oldCatg2" @change="fetchOldCatgData2()" placeholder="Select">
          <el-option
            v-for="item in oldCtgyList2"
            :key="item.old_catg_cd"
            :label="item.old_catg_kor_nm"
            :value="item.old_catg_cd">
          </el-option>
        </el-select>
        <el-select v-bind:style="{marginRight:'20px'}" v-model="oldCatg3" @change="fetchOldCatgData3()" placeholder="Select">
          <el-option
            v-for="item in oldCtgyList3"
            :key="item.old_catg_cd"
            :label="item.old_catg_kor_nm"
            :value="item.old_catg_cd">
          </el-option>
        </el-select>
        <el-select v-bind:style="{marginRight:'20px'}" v-model="oldCatg4" placeholder="Select">
          <el-option
            v-for="item in oldCtgyList4"
            :key="item.old_catg_cd"
            :label="item.old_catg_kor_nm"
            :value="item.old_catg_cd">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="상태" prop="checkedExams">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">All</el-checkbox>
        <el-checkbox-group v-model="workStat"  @change="getWorkStatList">
          <el-checkbox label="000" :disabled="false">{{'미보정'}}</el-checkbox>
          <el-checkbox label="100" :disabled="false">{{'작업중'}}</el-checkbox>
          <el-checkbox label="200" :disabled="false">{{'검수요청'}}</el-checkbox>
          <el-checkbox label="400" :disabled="false">{{'검수완료'}}</el-checkbox>
          <el-checkbox label="500" :disabled="false">{{'검수반려'}}</el-checkbox>
        </el-checkbox-group>
       <!-- <el-button type="primary" @click="getWorkStatList">작업상태가져오기</el-button>  -->
      </el-form-item><br>
      <el-form-item label="작업일자" prop="dpDt">
          <el-date-picker  
            v-model="datepicker1"
            type="date"
            placeholder="Start Time" value-format="yyyy-MM-dd" @change="handleDateChange">
          </el-date-picker>
          <span class="demonstration"> ~ </span>
          <el-date-picker 
            v-model="datepicker2"
            type="date"
            placeholder="End Time" value-format="yyyy-MM-dd" @change="handleDateChange" >
          </el-date-picker>
          
      </el-form-item>

      <el-form-item label="검색어">
        <el-row :gutter="5">
          <el-col :span="3">
            <el-select v-model="SrchTypeId" placeholder="Select">
              <el-option
                v-for="item in SrchType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="14">
            <el-input v-model="srchWord" @keyup.enter.native="fetchData" placeholder="검색어를 입력하세요"></el-input>
          
          </el-col>
          <el-col :span="4">
            <el-button type="primary" v-on:click="fetchData">검색</el-button>
           <!-- <el-button type="primary" v-on:click="testAxios">검색1</el-button>
            <el-button type="primary" v-on:click="testAxios2">검색2</el-button>
          -->
          </el-col>
        </el-row>
      </el-form-item>

<!--
      <el-checkbox-group 
            v-model="questionCheck"
              :min="1"
              :max="3">
          <el-checkbox v-for="(question,key) in questions" :label="question" :key="key"> 
                {{question}}
          </el-checkbox>
      </el-checkbox-group>   
-->
    
    </el-form>
</div>
    <div class="app-container">
          <el-table :data="tableData">
              <el-table-column prop="prod_no" label="상품번호" width="180" align="center"> </el-table-column>
              <el-table-column prop="work_stat_nm" label="작업상태" align="center"> </el-table-column>
              <el-table-column prop="prod_kor_nm" label="상품한글명" width="180" align="center"> 
                  <template slot-scope="scope">

                    <span @click="detail(scope.row.prod_no,
                                         scope.row.prod_kor_nm,
                                         scope.row.work_stat_nm,
                                         scope.row.t1_old_catg_nm,
                                         scope.row.t2_old_catg_nm,
                                         scope.row.t3_old_catg_nm,
                                         scope.row.t4_old_catg_nm,
                                         scope.row.org_old_catg_cd  
                                        )">{{scope.row.prod_kor_nm}}</span>

                  </template>
              </el-table-column>   
              <el-table-column prop="t1_old_catg_nm" label="Lvl" width="180" align="center"> </el-table-column>
              <el-table-column prop="t2_old_catg_nm" label="Lv2" width="180" align="center"> </el-table-column>
              <el-table-column prop="t3_old_catg_nm" label="Lv3" width="180" align="center"> </el-table-column>
              <el-table-column prop="t4_old_catg_nm" label="Lv4" width="180" align="center"> </el-table-column>
              <el-table-column prop="work_user_nm" label="작업자ID" width="180" align="center"> </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            :page-size="10"
            :pager-count="11"
            layout="prev, pager, next"
            :total="1000"></el-pagination>
  </div>
  </section>
</template>

<script>
import { getList,getOldCatList } from '@/api/prodList'
import axios from 'axios'

var pg = 1;
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableData: [],
      oldCtgyList:[],
      oldCtgyList2:[],
      oldCtgyList3:[],
      oldCtgyList4:[],
      oldCatg:'',
      oldCatg2:'',
      oldCatg3:'',
      oldCatg4:'',
      list: null,
      listLoading: true,
      workStat: [],
      questionCheck: ['question one', 'question two'],
      questions: ['question one', 'question two','question tree'],
      workStatOptions: ['100','200','300','400','500'],
      checkedExams: '100',
      checkedExams1:[],
      datepicker1:'',
      datepicker2:'',
      isIndeterminate:'',
      checkAll: false ,
      SrchTypeId:'',
      SrchType: [{
              value: 'all   ',
              label: 'ALL'
          }, {
              value: 'prdId',
              label: '상품ID'
          }, {
              value: 'prdNm',
              label: '상품명'
          }, {
              value: 'workUserNm',
              label: '작업자'
          }
      ],
      srchWord:''

    }
  },
  created() {
    console.log('ProdList =====>')
    
    //this.fetchData()
    //this.fetchPromiseTest()
    this.fetchTestData()
    //this.testAxios()
  },
  methods: {
    detail(prodNo,prodNm,work_stat_nm,t1_old_catg_nm,t2_old_catg_nm,t3_old_catg_nm,t4_old_catg_nm) {
      console.log('no = ', prodNo);
      this.$router.push({
        path: '/detail',
        query: {prodNo:prodNo,
                prodNm:prodNm,
                work_stat_nm:work_stat_nm,
                t1_old_catg_nm:t1_old_catg_nm,
                t2_old_catg_nm:t2_old_catg_nm,
                t3_old_catg_nm:t3_old_catg_nm,
                t4_old_catg_nm:t4_old_catg_nm
               }
      })
    },
    handleDateChange(){
      console.log('datepicker1 ==>' + this.datepicker1)
      console.log('datepicker2 ==>' + this.datepicker2)
    },
    handleCheckAllChange(val) {
      this.workStat = val ? this.workStatOptions : [];
      this.isIndeterminate = false;
      
      for (var i = 0; i < this.workStat.length; i++) {
        var obj = {
          id: this.workStat[i]
        };
        this.checkedExams1.push(obj);
      }
       
      //this.checkedExams = checkedExams  
      console.log('workStat ==>' + this.workStat)
      console.log('checkedExams1 ==>' + this.checkedExams1)

    
    },
    
    getWorkStatList(){    
      
      //var checkedExams = [];
      for (var i = 0; i < this.workStat.length; i++) {
        var obj = {
          id: this.workStat[i]
        };
        this.checkedExams1.push(obj);
      }
       
      //this.checkedExams = checkedExams  
      console.log('workStat ==>' + this.workStat)
      console.log('checkedExams1 ==>' + this.checkedExams1)

    },
    
    onOldCatgChange(){
      console.log(this.oldCatg)
    },
    testAxios(){
      
      this.workStat = ['100','200','300']  
      
      var jsonData ={
        upCatgCd: this.oldCatg,
        catgLv: 2,
        //workStat: '100'       
        workStat: this.workStat       
        //checkedExams1: ['100']
      }
      
      console.log('==========>' + JSON.stringify(jsonData))

      axios.post('http://localhost:9999/api/prodList3', jsonData
      //axios.post('http://localhost:9999/api/prodList3', JSON.stringify(jsonData)
     //   ,{ headers: { 'Content-Type': 'application/json' } }
      )
      .then(function(response) {
          if (response.status == 200) {
              console.log(response);
          }
      })
  

    },
    testAxios2(){
      
      this.workStat = ['100','200','300']  
      
      var jsonData ={
        upCatgCd: this.oldCatg,
        catgLv: 2,
        //workStat: '100'       
        workStat: this.workStat       
        //checkedExams1: ['100']
      }
      
      console.log('==========>' + JSON.stringify(jsonData))

      const service = axios.create({
        //baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
        url: "http://127.0.0.1:9999",

        //baseURL: "http://127.0.0.1:9999",
      //  headers: 'application/json;charset=utf-8',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        
        
        withCredentials: true, // send cookies when cross-domain requests
        timeout: 5000 // request timeout
      })

      
      service.post('/api/prodList3', jsonData
      //axios.post('http://localhost:9999/api/prodList3', JSON.stringify(jsonData)
     //   ,{ headers: { 'Content-Type': 'application/json' } }
      )
      .then(function(response) {
          if (response.status == 200) {
              console.log(response);
          }
      })
  

    },

    
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ userId: username.trim(), userPass: password }).then(response => {
          
          
          console.log("user login")
          console.log(response)

          //const { data } = response.data
          console.log("data.token =======>" + response.token)
          console.log("data.user =======>" + JSON.stringify(response.user))

          commit('SET_TOKEN', response.token)
          setToken(response.token)

          //commit('SET_TOKEN', data.token)
          //setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    fetchPromiseTest(){
      
      console.log('fetchPromiseTest==========>')

      return new Promise((resolve, reject) => {
        getList({
          upCatgCd: this.oldCatg,
          catgLv: 2,
          oldCatgCd1: this.oldCatg,
          oldCatgCd2: this.oldCatg2,
          oldCatgCd3: this.oldCatg3,
          oldCatgCd4: this.oldCatg4,
          workStat: this.workStat,
          srchType : this.SrchTypeId,
          srchWord : this.srchWord,
          datepicker1: this.datepicker1,
          datepicker2: this.datepicker2       
          //checkedExams1: ['100']
        }).then(response => {
          
          console.log('response.data ==>' + response.data.data)
          
          this.tableData = response.data.data
          this.oldCtgyList = response.data.oldCtgyList         
          

          //this.list = response.data.items
          this.listLoading = false
          
          resolve(this.tableData)
        }).catch(error => {
          reject(error)
        })
 
      
      })  
    },
    
    async fetchTestData() {
      var list = await this.fetchPromiseTest()
      console.log('async test ====>' + list)
    },

    fetchData() {
      this.listLoading = true
      
      getList({
        upCatgCd: this.oldCatg,
        catgLv: 2,
        oldCatgCd1: this.oldCatg,
        oldCatgCd2: this.oldCatg2,
        oldCatgCd3: this.oldCatg3,
        oldCatgCd4: this.oldCatg4,
        workStat: this.workStat,
        srchType : this.SrchTypeId,
	      srchWord : this.srchWord,
        datepicker1: this.datepicker1,
        datepicker2: this.datepicker2,
        page : pg
        //checkedExams1: ['100']
      }).then(response => {
        
        console.log('response.data ==>' + response.data.data)
        
        this.tableData = response.data.data
        this.oldCtgyList = response.data.oldCtgyList         
        

        //this.list = response.data.items
        this.listLoading = false
      })
    },
    
    fetchOldCatgData() {  
      this.listLoading = true
      getOldCatList({
        upCatgCd: this.oldCatg,
        catgLv: 2

      }).then(response => {
        
        console.log('response.oldCtgyList ==>' + response.data.oldCtgyList)
        
        //this.tableData = response.data
        this.oldCtgyList2 = response.data.oldCtgyList         
        this.oldCatg2 =''
        this.oldCatg3 =''
        this.oldCatg4 =''
        //this.list = response.data.items
        this.listLoading = false
      })
  },
  fetchOldCatgData2() {
      this.listLoading = true
      getOldCatList({
        upCatgCd: this.oldCatg2,
        catgLv: 3

      }).then(response => {
        
        console.log('response.oldCtgyList ==>' + response.data.oldCtgyList)
        
        //this.tableData = response.data
        this.oldCtgyList3 = response.data.oldCtgyList         
        this.oldCatg3 =''
        this.oldCatg4 =''
        //this.list = response.data.items
        this.listLoading = false
      })
  },
  fetchOldCatgData3() {
      this.listLoading = true
      getOldCatList({
        upCatgCd: this.oldCatg3,
        catgLv: 4

      }).then(response => {
        
        console.log('response.oldCtgyList ==>' + response.data.oldCtgyList)
        
        //this.tableData = response.data
        this.oldCtgyList4 = response.data.oldCtgyList         
        //this.oldCatg2 =''
        //this.list = response.data.items
        this.listLoading = false
      })
  }


}

}
</script>

<style scoped>
  .el-pagination {
    text-align: center;
    /* font-size: 30px; */
  }
</style>