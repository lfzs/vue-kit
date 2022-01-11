import { AxiosResponse, RequestResponseData } from 'axios'

type Response = AxiosResponse<RequestResponseData>

function handleResponse(response: Response) {
  return response
}

export {
  handleResponse
}
