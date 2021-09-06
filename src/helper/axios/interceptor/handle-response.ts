import { AxiosResponse, RequestResponseData } from 'axios'
import { router } from '@/entry/client'
import { getErrorMessage } from '@/helper/common'
import { authStore } from '@/store'

type Response = AxiosResponse<RequestResponseData>

// get 请求出错 toast 提示
function responseErrorToast(response: Response) {
  const { config: { errorToast = true }, data } = response
  if (errorToast) {
    const message = getErrorMessage(data)
    // TODO replace
    // eslint-disable-next-line no-alert
    alert(message)
  }
}

async function responseErrorIs401(response: Response) {
  const { config, data: { code } } = response
  if (code === 401) {
    // TODO clearToken
    if (!config.ignore401) {
      authStore.setNext(encodeURIComponent(location.href))
      await router.replace('/signin')
    }
  }
}

async function handleResponse(response: Response) {
  // 返回值 code 为 0 才算成功
  if (response.data.code === 0) return response

  if (process.env.browser) {
    responseErrorToast(response)
  }

  await responseErrorIs401(response)
  return Promise.reject(response.data)
}

export {
  handleResponse
}
