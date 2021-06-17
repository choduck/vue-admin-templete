import request from '@/utils/request'

var baseURL = 'http://localhost:9999'

export function getList(params) {
  return request({
    url:'/api/statisticsList',
    method: 'post',
    data: params  
  })
}

