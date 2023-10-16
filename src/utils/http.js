import axios from 'axios'
import { Toast } from 'vant'
const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 10000,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16893359391143165675372545","bc":"110100"}'
  }
})

// 拦截器
http.interceptors.request.use((config) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true
  })
  return config
}, (err) => {
  return Promise.reject(err)
})

http.interceptors.response.use((res) => {
  Toast.clear()
  return Promise.resolve(res)
}, (err) => {
  return Promise.reject(err)
})

export default http
