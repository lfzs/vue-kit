import router from '@/router'

export default new class {
  #next = '' // 登陆成功后需要跳转的页面

  setNext(path) {
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
