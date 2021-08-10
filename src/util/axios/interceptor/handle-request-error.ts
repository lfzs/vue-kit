import { AxiosError } from 'axios'

function handleRequestError(error: AxiosError) {
  return Promise.reject(error)
}

export {
  handleRequestError
}
