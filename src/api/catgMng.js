import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/newctgyList',
    method: 'post',
    data: params
  })
}
