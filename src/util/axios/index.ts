import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { HOST } from '@/constant'
import {
  handleRequest,
  handleRequestError,
  handleResponse,
  handleResponseError,
} from './interceptor'

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
