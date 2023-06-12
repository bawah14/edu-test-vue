import { api } from '@/constants'
import { getAuthHeader, serializeQueryParams } from '@/util'
import baseURL from '@/service/api'

const applicant = {
  list: params => {
    const url = api.applicant.list + serializeQueryParams(params)
    return baseURL.get(url, { headers: getAuthHeader() })
  },
  detail: id => {
    const url = api.applicant.detail(id)
    return baseURL.get(url, { headers: getAuthHeader() })
  },
  result: id => {
    const url = api.applicant.result(id)
    return baseURL.get(url, { headers: getAuthHeader() })
  },
  resultDetail: (applicantId, resultId) => {
    const url = api.applicant.resultDetail(applicantId, resultId)
    return baseURL.get(url, { headers: getAuthHeader() })
  },
  downloadPDF: (applicantId, resultId) => {
    const url = api.applicant.downloadPDF(applicantId, resultId)
    return baseURL.post(url, {}, { headers: getAuthHeader(), responseType: 'blob' })
  },
  location: () => {
    const url = api.test.location
    return baseURL.get(url, { headers: getAuthHeader() })
  },
  addApplicant: payload => {
    const url = api.applicant.offline
    return baseURL.post(url, payload, { headers: getAuthHeader() })
  },
  updatePaymentStatus: (booking_id, payload) => {
    const url = api.applicant.updatePaymentStatus(booking_id)
    return baseURL.post(url, payload, { headers: getAuthHeader() })
  }
}
export default applicant
