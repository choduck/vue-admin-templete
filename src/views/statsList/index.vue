<template>
  <section>  
    <el-form class="toolbar" :inline="true">
     
      <el-form-item label="작업일자" prop="dpDt">
        <el-date-picker  
        
            v-model="datepicker1"
            type="date"
            placeholder="Start Time" value-format="yyyy-MM-dd" >
          </el-date-picker>
          <span class="demonstration"> ~ </span>
          <el-date-picker 
            v-model="datepicker2"
            type="date"
            placeholder="End Time" value-format="yyyy-MM-dd" >
          </el-date-picker>
           <el-button type="primary" v-on:click="fetchData">검색</el-button>
      </el-form-item><br>

    
    </el-form>

    <div class="app-container">
          <el-table ref="fruits" :data="tableData" show-summary :summary-method="getSummaries" >
              <el-table-column prop="work_user_id" label="ID" width="180" align="center"> </el-table-column>
              <el-table-column prop="chrg_insp_user_id" label="담당접수자" align="center"> </el-table-column>
              <el-table-column prop="tot" label="할당" width="180" align="center"> </el-table-column>
              <el-table-column prop="complete" label="검수완료" width="180" align="center"> </el-table-column>
              <el-table-column prop="progress" label="진행률" width="180" align="center"> </el-table-column>
              <el-table-column prop="working" label="작업중" width="180" align="center"> </el-table-column>
              <el-table-column prop="request" label="검수요청" width="180" align="center"> </el-table-column>
              <el-table-column prop="reject" label="검수반려" width="180" align="center"> </el-table-column>
          </el-table>
  </div>
  </section>
</template>

<script>
import { getList } from '@/api/statistics'

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
      list: null,
      listLoading: true,
      questionCheck: ['question one', 'question two'],
      questions: ['question one', 'question two','question tree'],
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
          }
      ],
      srchWord:''
    }
  },

  created() {
    this.fetchData()
  },
  methods: {
    getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '';
            return;
          }
          if (index !== 1) {
            const values = data.map(item =>  Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
            } 
          }else{
            sums[index] = '합계'; 
          }
        });
        return sums;
      },
    fetchData() {
      this.listLoading = true
      
      getList({
        datepicker1: this.datepicker1,
        datepicker2: this.datepicker2       
      }).then(response => {
        
        console.log('response.data ==>' + response.data)
        
        this.tableData = response.data    
        var tableSize = this.tableData.length + 1;
        this.listLoading = false
        
        console.log('response.data ==>' + this.tableData[tableSize])
        this.tableData[tableSize]
      })
    },
  }
}
</script>