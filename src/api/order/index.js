import { api } from '@/constants'
import { getAuthHeader, serializeQueryParams } from '@/util'
import baseURL from '@/service/api'

const order = {
  orders: params => {
    const url = api.order.list + serializeQueryParams(params)
    return baseURL.get(url, { headers: getAuthHeader() })
  },
  orderDetail: orderId => {
    const url = api.order.detail(orderId)
    return baseURL.get(url, { headers: getAuthHeader() })
  },
  processOrder: orderId => {
    const url = api.order.processOrder(orderId)
    return baseURL.post(url, {}, { headers: getAuthHeader() })
  },
  rejectOrder: (orderId, payloads) => {
    const url = api.order.rejectOrder(orderId)
    return baseURL.post(url, payloads, { headers: getAuthHeader() })
  }
}
export default order
