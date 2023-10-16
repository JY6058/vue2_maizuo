import axios from 'axios'
import { Toast } from 'vant'
import router from '../router/index.js'
const request = axios.create()

// 拦截器
request.interceptors.request.use((config) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true
  })
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`
  // token && (config.headers.Authorization = `Bearer ${token}`)
  return config
}, (err) => {
  return Promise.reject(err)
})

request.interceptors.response.use((res) => {
  Toast.clear()
  // console.log('拦截器', res)
  const { authorization } = res.headers
  authorization && localStorage.setItem('token', authorization)
  return Promise.resolve(res)
}, (err) => {
  if (err.response.status === 401) {
    Toast({
      message: '身份过期，请重新登录！',
      duration: 500
    })
    localStorage.removeItem('token')
    router.push('/login')
  }
  return Promise.reject(err)
})

export default request
