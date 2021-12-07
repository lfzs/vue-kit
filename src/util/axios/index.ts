import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

import { handleRequest } from './interceptor/handle-request'
import { handleRequestError } from './interceptor/handle-request-error'
import { handleResponse } from './interceptor/handle-response'
import { handleResponseError } from './interceptor/handle-response-error'

const configDefault: AxiosRequestConfig = {
  // 只有服务端才需要到指定地址获取数据
  baseURL: __SSR_ENV__ === 'server' ? `${process.env.SERVER_HOST}/api` : '/api',
  timeout: 60000,
}

function creater(config = configDefault) {
  const axios: AxiosInstance = Axios.create(config)
  axios.interceptors.request.use(handleRequest, handleRequestError)
  axios.interceptors.response.use(handleResponse, handleResponseError)
  return axios
}

const axios = creater()

export {
  axios,
}
