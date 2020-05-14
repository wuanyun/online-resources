import axios from "axios"

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
})

service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // if (store.getters.token) {
    //   config.headers['ADMINTOKEN'] = getToken()  // 让每个请求携带token-- ['ADMINTOKEN']为自定义key 请根据实际情况自行修改
    // }
    console.log(config)
    return config
  },
  (err) => {
    console.log(err)
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  (response) => {
    // 状态码不正确时，return Promise.reject(response) 或者return Promise.reject(null);
    // 对返回的信息做进一步处理
    return response
  },
  (err) => {
    console.log("---", err)
    console.log("---", err.response)
    // 处理错误
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = "请求错误(400)"
          break
        case 401:
          err.message = "未授权，请重新登录(401)"
          break
        case 403:
          err.message = "拒绝访问(403)"
          break
        case 404:
          err.message = "请求出错(404)"
          break
        case 408:
          err.message = "请求超时(408)"
          break
        case 500:
          err.message = "服务器错误(500)"
          break
        case 501:
          err.message = "服务未实现(501)"
          break
        case 502:
          err.message = "网络错误(502)"
          break
        case 503:
          err.message = "服务不可用(503)"
          break
        case 504:
          err.message = "网络超时(504)"
          break
        case 505:
          err.message = "HTTP版本不受支持(505)"
          break
        default:
          err.message = `连接出错(${err.response.status})!`
      }
    } else {
      // err.message = '连接服务器失败!'
      console.log("连接服务器失败")
    }
    return Promise.reject(err)
  }
)

export default service
