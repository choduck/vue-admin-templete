//import request from '@/utils/request'
import axios from 'axios'

var baseURL = 'http://localhost:9999'

export function getList(params) {

  return axios({
    url: baseURL + '/api/statisticsList',
    method: 'post',
    data: params  
  })
}

