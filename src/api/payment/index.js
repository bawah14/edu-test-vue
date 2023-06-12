import { api } from '@/constants'
import { getAuthHeader, serializeQueryParams } from '@/util'
import baseURL from '@/service/api'

const payment = {
  history: (params) => {
    const url = api.payment.history + serializeQueryParams(params)
    return baseURL.get(url, { headers: getAuthHeader() })
  },
  detail: (id) => {
    const url = api.payment.detail(id)
    return baseURL.get(url, { headers: getAuthHeader() })
  },
  paymentComplete: (id) => {
    const url = api.payment.paymentComplete(id)
    return baseURL.post(url, {}, { headers: getAuthHeader() })
  }
}
export default payment
