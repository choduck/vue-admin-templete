<template>
  <section>  
    <el-form class="toolbar" :inline="true">
     
      <el-form-item label="작업일자" prop="dpDt">
          <el-date-picker  
            v-model="startDt"
            type="datetime"
            placeholder="Start Time">
          </el-date-picker>
          <span class="demonstration"> ~ </span>
          <el-date-picker 
            v-model="endDt"
            type="datetime"
            placeholder="End Time">
          </el-date-picker>
          
      </el-form-item><br>

    
    </el-form>

    <div class="app-container">
          <el-table :data="tableData">
              <el-table-column prop="prod_no" label="ID" width="180" align="center"> </el-table-column>
              <el-table-column prop="work_stat_nm" label="담당접수자" align="center"> </el-table-column>
              <el-table-column prop="prod_kor_nm" label="할당" width="180" align="center"> </el-table-column>
              <el-table-column prop="t1_old_catg_nm" label="검수완료" width="180" align="center"> </el-table-column>
              <el-table-column prop="t2_old_catg_nm" label="진행률" width="180" align="center"> </el-table-column>
              <el-table-column prop="t3_old_catg_nm" label="작업중" width="180" align="center"> </el-table-column>
              <el-table-column prop="t4_old_catg_nm" label="검수요청" width="180" align="center"> </el-table-column>
              <el-table-column prop="work_user_nm" label="검수반려" width="180" align="center"> </el-table-column>
          </el-table>
  </div>
  </section>
</template>

<script>
import axios from 'axios'
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
      oldCatg:'전체',
      oldCatg2:'전체',
      oldCatg3:'전체',
      oldCatg4:'전체',
      list: null,
      listLoading: true,
      workStat: '100',
      questionCheck: ['question one', 'question two'],
      questions: ['question one', 'question two','question tree'],
      workStatOptions: ['100','200','300','400','500'],
      checkedExams: '100',
      checkedExams1:[],
      startDt:'',
      endDt:'',
      isIndeterminate:'',
      checkAll: false
    }
  },
  created() {
    console.log('ProdList =====>')
    this.fetchData()
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedExams = val ? this.workStatOptions : [];
      this.isIndeterminate = false;
      
      for (var i = 0; i < this.checkedExams.length; i++) {
        var obj = {
          id: this.checkedExams[i]
        };
        this.checkedExams1.push(obj);
      }
       
      //this.checkedExams = checkedExams  
      console.log('checkedExams ==>' + this.checkedExams)
      console.log('checkedExams1 ==>' + this.checkedExams1)

    
    },
    
    getWorkStatList(){    
      
      //var checkedExams = [];
      for (var i = 0; i < this.checkedExams.length; i++) {
        var obj = {
          id: this.checkedExams[i]
        };
        this.checkedExams1.push(obj);
      }
       
      //this.checkedExams = checkedExams  
      console.log('checkedExams ==>' + this.checkedExams)
      console.log('checkedExams1 ==>' + this.checkedExams1)

    },
    
    onOldCatgChange(){
      console.log(this.oldCatg)
    },
    fetchData() {
      this.listLoading = true
      //this.workStat[0] = {workStat:'100'}
      
      getList({
        upCatgCd: this.oldCatg,
        catgLv: 2,
        workStat: '100'       
        //workStat: this.workStatOptions       
        //checkedExams1: ['100']
      }).then(response => {
        
        console.log('response.data ==>' + response.data)
        
        this.tableData = response.data
        this.oldCtgyList = response.oldCtgyList         
        

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
        
        console.log('response.oldCtgyList ==>' + response.oldCtgyList)
        
        //this.tableData = response.data
        this.oldCtgyList2 = response.oldCtgyList         
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
        
        console.log('response.oldCtgyList ==>' + response.oldCtgyList)
        
        //this.tableData = response.data
        this.oldCtgyList3 = response.oldCtgyList         
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
        
        console.log('response.oldCtgyList ==>' + response.oldCtgyList)
        
        //this.tableData = response.data
        this.oldCtgyList4 = response.oldCtgyList         
        //this.oldCatg2 =''
        //this.list = response.data.items
        this.listLoading = false
      })
  }


}

}
</script>
