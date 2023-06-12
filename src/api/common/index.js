import { api } from '@/constants'
import { getAuthHeader, getAuthAndMultipartHeader } from '@/util'
import baseURL from '@/service/api'

const common = {
  uploadImage: payloads => {
    const url = api.image.upload
    return baseURL.post(url, payloads, { headers: getAuthAndMultipartHeader() })
  },
  checkAwb: awbNumber => {
    const url = api.awb(awbNumber)
    return baseURL.get(url, { headers: getAuthAndMultipartHeader() })
  },
  updatePassword: payloads => {
    const url = api.user.updatePassword
    return baseURL.post(url, payloads, { headers: getAuthAndMultipartHeader() })
  }
}
export default common
