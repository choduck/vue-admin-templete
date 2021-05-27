<template>
<div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="작업일자">
            <el-date-picker
                v-model="form.datepicker1"
                type="date"
                placeholder="Start day"
                value-format="yyyy-MM-dd"></el-date-picker>
            <span class="demonstration">
                ~
            </span>
            <el-date-picker
                v-model="form.datepicker2"
                type="date"
                placeholder="End day"
                value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="그룹">
            <el-checkbox-group v-model="form.type">
                <el-checkbox label="BK" name="type"/>
                <el-checkbox label="GP" name="type"/>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="상태">
            <el-radio-group v-model="form.resource">
                <el-radio label="전체"/>
                <el-radio label="이관요청" aria-checked="checked"/>
                <el-radio label="이관완료"/>
                <el-radio label="이관거절"/>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="Activity name">
            <el-col :span="2">
                <el-select v-model="form.region" placeholder="please select your zone">
                    <el-option label="All" value="all"/>
                    <el-option label="작업자Id" value="workUser"/>
                    <el-option label="보정자Id" value="inspUser"/>
                </el-select>
            </el-col>
            <el-col :span="1">-</el-col>
            <el-col :span="10">
                <el-input
                    v-model="form.name"
                    @keyup.enter.native="fetchData"
                    placeholder="검색어를 입력하세요"/>
            </el-col>
            <el-col :span="5">-</el-col>
            <el-col :span="2">
                <el-button type="primary" @click="fetchData">검색</el-button>
            </el-col>
        </el-form-item>
    </el-form>
    <div class="app-container">
        <el-table :data="form.tableData">
            <el-table-column prop="prod_no" label="ID" width="100" align="center"></el-table-column>
            <el-table-column prop="prod_kor_nm" label="상품명" align="center"></el-table-column>
            <el-table-column prop="old_catg_nm" label="카테고리" width="180" align="center"></el-table-column>
            <el-table-column prop="trans_stat" label="상태" width="180" align="center"></el-table-column>
            <el-table-column prop="trans_type" label="bk업무" width="180" align="center"></el-table-column>
            <el-table-column prop="working" label="GP업무" width="180" align="center"></el-table-column>
            <el-table-column prop="trans_dtm" label="접수일" width="180" align="center"></el-table-column>
        </el-table>
        <el-pagination
            @current-change="handleCurrentChange"
            :page-size="10"
            :pager-count="11"
            layout="prev, pager, next"
            :total="1000"></el-pagination>
    </div>
</div>
</template>


<script>
import {getList} from '@/api/selectTransfer'
var pg=1;
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
            form: {
              tableData : [],
              datepiecker1: '',
              datepiecker2: '',
              type: [],
              page:''
            }
        }
    },

    created() {
        this.fetchData()
    },
    methods: {
        handleCurrentChange(val) {
          pg = val;
          this.fetchData();
        },
        fetchData() {
            this.listLoading = true

            getList({
              datepicker1: this.datepicker1,
              datepicker2: this.datepicker2,
              page : pg
            }).then(
                response => {
                  console.log(response.data.result)
                    this.form.tableData = response.data.result
                    this.listLoading = false
                }
            )
        }
    }
}
</script>