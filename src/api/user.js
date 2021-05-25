import request from '@/utils/request'
import axios from 'axios'

var baseURL = 'http://localhost:9999'

/*
export function login(data) {
  return request({
    //url: '/vue-admin-template/user/login',
    url: '/api/userCheck2',
    method: 'post',
    data
  })
}
*/


export function login(params) {
  return axios({
    //url: '/prodList2',
    url: baseURL + '/api/userCheck2',
    method: 'post',
    data: params  
  })
}


export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
