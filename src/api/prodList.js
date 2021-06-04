//import request from '@/utils/request'
import axios from 'axios'

var baseURL = 'http://localhost:9999'

export function getList(params) {

  return axios({
    //url: '/prodList2',
    url: baseURL + '/api/prodList',
    method: 'post',
    data: params  
  })

}

export function getOldCatList(params) {

  return axios({
    
    url: baseURL + '/api/getOldCatList',
    method: 'post',
    data: params  
  })

}

export function getTreeList() {

  return axios({
    
    url: baseURL + '/api/treeList2',
    method: 'post'
  })
}

export function selectNewCatPath(params) {

  return axios({
    
    url: baseURL + '/api/selectNewCatPath',
    method: 'post',
    data: params
  })
}

export function selectKdmLovVal(params) {

  return axios({
    
    url: baseURL + '/api/selectKdmLovVal',
    method: 'post',
    data: params
  })
}


export function saveTransInfo(params) {

  return axios({
    
    url: baseURL + '/api/saveTransInfo',
    method: 'post',
    data: params
  })
}


export function saveNewCatInfo(params) {

  return axios({
    
    url: baseURL + '/api/saveNewCatInfo',
    method: 'post',
    data: params
  })
}


