import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { BASE_URL } from '@/constant'

import { handleRequest } from './interceptor/handle-request'
import { handleRequestError } from './interceptor/handle-request-error'
import { handleResponse } from './interceptor/handle-response'
import { handleResponseError } from './interceptor/handle-response-error'

const config: AxiosRequestConfig = {
  baseURL: `${BASE_URL}/api`,
  timeout: 60000,
}

const axios: AxiosInstance = Axios.create(config)
axios.interceptors.request.use(handleRequest, handleRequestError)
axios.interceptors.response.use(handleResponse, handleResponseError)

export {
  axios,
}
