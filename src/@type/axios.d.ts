declare module 'axios' {
  interface AxiosRequestConfig {
    signature?: string, // 唯一标识符，可用来取消请求
    ignore401?: boolean, // 401 要不要去登录页
    errorToast?: boolean, // 请求出错，要不要弹窗提示
  }
}

export {}
