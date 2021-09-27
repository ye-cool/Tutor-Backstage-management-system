import axios from 'axios'
import { message } from 'ant-design-vue'

const baseUrl = process.env.NODE_ENV == 'development' ? '/dev' : '/Api'

// 状态码
const statusCode = {
  tokenExpire: 400
}

//容错处理
const errHandle = (status, info) => {
  switch (status) {
    case statusCode.tokenExpire:
      message.error('操作超时，请重新登录！')
      break
    default:
      message.error(info)
      break
  }
}

//创建请求实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? baseUrl : '/Api',
  headers: {
    'Content-Type': 'application/json'
  }
})

//请求拦截
service.interceptors.request.use(
  config => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization = localStorage.getItem('Authorization')
    }
    // else if (config.url.indexOf('/user') != -1) {
    //   if(store.state.isLoggedin) {
    //     config.headers['Authorization'] = 'Bearer ' + store.state.userData.userToken
    //   }
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
//响应拦截
service.interceptors.response.use(
  response => {
    if (response.data.code === 200) {
      return response.data
    } else {
      errHandle(response.data.code, response.data.msg)
    }
  },
  error => {
    if (error) {
      // console.log(error)
      if (error.response) {
        message.error(error.response.data.msg)
      } else {
        message.error('请求超时，请重试！', 3)
      }
      return Promise.reject(error)
    } else {
      message.error('网络异常')
    }
  }
)

export default service
