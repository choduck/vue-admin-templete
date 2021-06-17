import request from '@/utils/request'
import axios from 'axios'

var baseURL = 'http://localhost:9999'


export function getList(params) {
    return request({
      url: '/api/selectTransfer',
      method: 'post',
      data: params
    })
  }