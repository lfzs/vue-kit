import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { BASE_URL } from '@/constant'

import { handleRequest } from './interceptor/handle-request'
import { handleRequestError } from './interceptor/handle-request-error'
import { handleResponse } from './interceptor/handle-response'
import { handleResponseError } from './interceptor/handle-response-error'

const configDefault: AxiosRequestConfig = {
  baseURL: `${BASE_URL}/api`,
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
