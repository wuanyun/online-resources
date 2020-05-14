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
