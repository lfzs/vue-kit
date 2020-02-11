export default new class {

  next = 'home' // 登陆成功后需要跳转的页面
  signinNext(path = 'home') {
    this.next = path
  }

  signin({ mobile = '', password = '' }) {
    return axios.post('sessions/login_with_password', { mobile, password })
  }
}
