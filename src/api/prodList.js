//import request from '@/utils/request'
import axios from 'axios'

var baseURL = 'http://localhost:9999'

export function getList(params) {
  //var params1 = JSON.stringify(params)
  //var params1 = JSON.parse(params)  


  return axios({
    //url: '/prodList2',
    url: baseURL + '/api/prodList3',
    method: 'post',
    data: params  
  })


  
/*  
  return request({
    //url: '/prodList2',
    url: '/api/prodList3',
    method: 'post',
    params  
  })
*/

}

export function getOldCatList(params) {

  return axios({
    //url: '/prodList2',
    url: baseURL + '/api/getOldCatList',
    method: 'post',
    data: params  
  })

  /*
  return request({
    url: '/api/getOldCatList',
    method: 'post',
    params
  })
*/

}

