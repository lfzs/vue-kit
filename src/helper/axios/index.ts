import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { HOST } from '@/constant'

import { handleRequest } from './interceptor/handle-request'
import { handleRequestError } from './interceptor/handle-request-error'
import { handleResponse } from './interceptor/handle-response'
import { handleResponseError } from './interceptor/handle-response-error'

const config: AxiosRequestConfig = {
  baseURL: `${HOST}/api`,
  timeout: 60000,
}

const axios: AxiosInstance = Axios.create(config)
axios.interceptors.request.use(handleRequest, handleRequestError)
axios.interceptors.response.use(handleResponse, handleResponseError)

export {
  axios,
}
