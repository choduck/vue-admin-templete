import axios from 'axios'

var baseURL = 'http://localhost:9999'

export function getList(params) {
    console.log(params);
    return axios({
        url: baseURL + '/api/selectTransfer',
        method: 'post',
        data: params
    })
}