declare module 'axios' {

  // 拓展 AxiosRequestConfig
  interface AxiosRequestConfig {
    sign?: string, // 唯一标识符，可用来取消请求
    ignore401?: boolean, // 401 要不要自动去登录页
    errorToast?: boolean, // 请求出错，要不要弹窗提示
  }

  // 新增 API 返回值类型
  interface RequestResponseData<T = unknown> {
    data?: T,
    code?: number, // 状态码
    meta?: {
      page: number, // 页码
      pageSize: number, // 每页数量
      offset: number, // 偏移量
    },
    message?: string, // 错误信息
  }
}

export {}
