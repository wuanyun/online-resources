# 基于vue-cli4创建的项目，根据网上的资料封装的axios

### 1.安装依赖
`cnpm i axios -S` `cnpm i qs -S`
### 2.配置环境切换
在项目根目录下创建`.env.development`，内容如下：
```
NODE_ENV=development
VUE_APP_BASE_URL=http://172.20.10.3:8080
```
在项目根目录下创建`.env.production`，内容如下：
```
NODE_ENV=production
VUE_APP_BASE_URL=http://172.20.10.3:8080
```
### axios整体封装
##### 1. 初始化参数
- baseURL 设置统一api入口
- timeout 设置超时时间
- headers 设置请求头

##### 2. 请求拦截
- 设置token等额外信息

##### 3. 响应拦截
- 请求成功处理
  - 根据返回的data自定义状态码判断调用是否成功
- 请求失败处理
  - 判断是否有response
  - 判断否超时
  - 根据response.status判断失败类型(请求错误, 未授权, 拒绝访问,请求超时等)
  
##### 4. 封装的文件如下：
`/src/utils/request.js`

```
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

```

### 封装调用方法
`/src/utils/http.js`

```
import request from "./request"
import QS from "qs"

function axios(option) {
  return new Promise((resolve, reject) => {
    request({
      url: option.url,
      method: option.method || "get",
      params: option.params || {},
      data: QS.stringify(option.data) || {}
    })
      .then((res) => {
        resolve(res)
      })
      .catch((res) => {
        reject(res)
      })
  })
}

export default axios

```

### api统一管理
`/src/api/api.js`

```
import http from "../utils/http"

export const getMethod = (query) =>
  http({
    url: "/api/get",
    ...query
  })

export const postMethod = (query) =>
  http({
    url: "/api/post",
    method: "post",
    ...query
  })
```

### 调用接口
导入模块`import { getMethod, postMethod } from "@/api/api"`
##### 1. get方法调用
```
getMethod({ params: { a: "a" } }).then((res) => {
  console.log(res)
})
```

##### 2. post方法调用
```
postMethod({ data: { b: "b" } }).then((res) => {
  console.log(res)
})
```
