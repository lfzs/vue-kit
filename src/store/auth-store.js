import router from '@/router'

export default new class {
  #next = '' // 登陆成功后需要跳转的页面

  setNext(path) {
    // 有值就不更新 #next, 防止并发 401，axios 获取路径错误
    this.#next || (this.#next = path)
  }

  signinNext() {
    this.#next ? location.replace(this.#next) : router.back()
    this.#next = ''
  }

  signin(body) {
    return axios.post('login', body)
  }
}
