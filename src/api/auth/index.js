import { api } from '@/constants'
import { getAuthHeader } from '@/util'
import baseURL from '@/service/api'

const auth = {
  login: payloads => {
    const url = api.auth.login
    return baseURL.post(url, payloads)
  },
  logout: () => {
    const url = api.auth.logout
    return baseURL.delete(url, { headers: getAuthHeader() })
  },
  profile: () => {
    const url = api.profile
    return baseURL.get(url, { headers: getAuthHeader() })
  }
}
export default auth
