import { axios } from '@/helper/axios'
import { RequestResponseData } from 'axios'
import { router } from '@/entry/client'

interface SigninData {
  username: string,
  password: string,
}

interface SigninResponse {
  username: string,
}

class AuthStore {
  // 登陆成功后需要跳转的页面
  private next = ''

  setNext(path: string) {
    // 有值就不更新 #next, 防止并发 401，axios 获取路径错误
    this.next || (this.next = path)
  }

  signin(data: SigninData) {
    return axios.post<RequestResponseData<SigninResponse>>('signin', data)
  }

  signinNext() {
    this.next ? location.replace(decodeURIComponent(this.next)) : router.back()
    this.next = ''
  }
}

const authStore = new AuthStore()
export {
  authStore
}
