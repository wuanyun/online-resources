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
