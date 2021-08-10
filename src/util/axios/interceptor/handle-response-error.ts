import Axios, { AxiosError, RequestResponseData } from 'axios'
import { router } from '@/router'
import { ElMessage } from 'element-plus'
import { getErrorMessage } from '@/util/common'

function responseErrorIsCancel() {
  const responseCancelData: RequestResponseData = {
    message: 'Request cancelled',
    code: -1
  }
  return Promise.reject(responseCancelData)
}

async function responseErrorIs401(error: AxiosError) {
  // TODO clearToken
  const { config } = error
  if (!config.ignore401) {
    // authStore.setNext(location.href)
    await router.replace('/signin')
  }
}

// get 请求出错 toast 提示
function responseErrorToast(error: AxiosError) {
  const { config: { errorToast = true }, response } = error
  if (errorToast) {
    const message = getErrorMessage(response?.data)
    ElMessage.error(message)
  }
}

async function handleResponseError(error: AxiosError) {
  // 请求取消
  if (Axios.isCancel(error)) return responseErrorIsCancel()

  responseErrorToast(error)
  await responseErrorIs401(error)
  return Promise.reject(error)
}

export {
  handleResponseError
}
