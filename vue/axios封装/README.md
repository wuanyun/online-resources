# ����vue-cli4��������Ŀ���������ϵ����Ϸ�װ��axios

### 1.��װ����
`cnpm i axios -S` `cnpm i qs -S`
### 2.���û����л�
����Ŀ��Ŀ¼�´���`.env.development`���������£�
```
NODE_ENV=development
VUE_APP_BASE_URL=http://172.20.10.3:8080
```
����Ŀ��Ŀ¼�´���`.env.production`���������£�
```
NODE_ENV=production
VUE_APP_BASE_URL=http://172.20.10.3:8080
```
### axios�����װ
##### 1. ��ʼ������
- baseURL ����ͳһapi���
- timeout ���ó�ʱʱ��
- headers ��������ͷ

##### 2. ��������
- ����token�ȶ�����Ϣ

##### 3. ��Ӧ����
- ����ɹ�����
  - ���ݷ��ص�data�Զ���״̬���жϵ����Ƿ�ɹ�
- ����ʧ�ܴ���
  - �ж��Ƿ���response
  - �жϷ�ʱ
  - ����response.status�ж�ʧ������(�������, δ��Ȩ, �ܾ�����,����ʱ��)
  
##### 4. ��װ���ļ����£�
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
    //   config.headers['ADMINTOKEN'] = getToken()  // ��ÿ������Я��token-- ['ADMINTOKEN']Ϊ�Զ���key �����ʵ����������޸�
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
    // ״̬�벻��ȷʱ��return Promise.reject(response) ����return Promise.reject(null);
    // �Է��ص���Ϣ����һ������
    return response
  },
  (err) => {
    console.log("---", err)
    console.log("---", err.response)
    // �������
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = "�������(400)"
          break
        case 401:
          err.message = "δ��Ȩ�������µ�¼(401)"
          break
        case 403:
          err.message = "�ܾ�����(403)"
          break
        case 404:
          err.message = "�������(404)"
          break
        case 408:
          err.message = "����ʱ(408)"
          break
        case 500:
          err.message = "����������(500)"
          break
        case 501:
          err.message = "����δʵ��(501)"
          break
        case 502:
          err.message = "�������(502)"
          break
        case 503:
          err.message = "���񲻿���(503)"
          break
        case 504:
          err.message = "���糬ʱ(504)"
          break
        case 505:
          err.message = "HTTP�汾����֧��(505)"
          break
        default:
          err.message = `���ӳ���(${err.response.status})!`
      }
    } else {
      // err.message = '���ӷ�����ʧ��!'
      console.log("���ӷ�����ʧ��")
    }
    return Promise.reject(err)
  }
)

export default service

```

### ��װ���÷���
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

### apiͳһ����
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

### ���ýӿ�
����ģ��`import { getMethod, postMethod } from "@/api/api"`
##### 1. get��������
```
getMethod({ params: { a: "a" } }).then((res) => {
  console.log(res)
})
```

##### 2. post��������
```
postMethod({ data: { b: "b" } }).then((res) => {
  console.log(res)
})
```
