import { router } from '@/router'
import { axios } from '@/util/axios'
import { RequestResponseData } from 'axios'

interface SigninData {
  username: string,
  password: string,
}

interface SigninResponse {
  username: string,
}

class AuthStore {
  #next = '' // 登陆成功后需要跳转的页面

  setNext(path: string) {
    // 有值就不更新 #next, 防止并发 401，axios 获取路径错误
    this.#next || (this.#next = path)
  }

  signinNext() {
    this.#next ? location.replace(this.#next) : router.back()
    this.#next = ''
  }

  signin(data: SigninData) {
    return axios.post<RequestResponseData<SigninResponse>>('signin', data)
  }
}

const authStore = new AuthStore()
export {
  authStore
}
