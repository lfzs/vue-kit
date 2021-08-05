import { axios } from '@/util/axios'
import { AxiosRequestConfig } from 'axios'

interface SigninData {
  username: string,
  password: string,
}

class Auth {
  static signin(data: SigninData, config: AxiosRequestConfig) {
    return axios.post('login', data, config)
  }
}

export {
  Auth,
}
