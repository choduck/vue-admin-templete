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
        <el-col :span="7">
            <el-button type="primary" @click="walletAddressGetAddPop()">신카테고리</el-button> 
        </el-col>
        <el-col :span="17">
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
      <el-tree :data="treeData" show-checkbox node-key="menuId" ref="tree" highlight-current :props="defaultProps">
      </el-tree>

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
      <div style="text-align:center; margin-top:15px;">
        <el-button @click="walletAddressAddPop = false;">등록</el-button>
      </div>
    </el-dialog>


  
  
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      
      prodNo: this.$route.query.prodNo,
      prodNm: this.$route.query.prodNm,
      work_stat_nm: this.$route.query.work_stat_nm,
      old_catg_nm: this.$route.query.t1_old_catg_nm + '>' + this.$route.query.t2_old_catg_nm +  (this.$route.query.t3_old_catg_nm = 'undefined'? '': '>' + this.$route.query.t3_old_catg_nm) + (this.$route.query.t4_old_catg_nm = 'undefined'? '': '>' + this.$route.query.t4_old_catg_nm),
      
			walletAddressAddPop: false,							// 주소록 추가 팝업
			destinationAddressChk: false,						// 추가주소록 체크박스
      treeData:[],
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
  watch: {
    walletAddressAddPop(value) {

        console.log('value ===>' + value)
        
        if (value == true) { // 1주일
            
            this.testAxios()
        } 
    }
  },
  created() {
    console.log('ProdList =====>')
    //this.testAxios()
    //this.testAxios()
  },

  
  methods: {
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
</style>

