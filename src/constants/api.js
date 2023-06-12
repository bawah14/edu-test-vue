const api = {
  base: process.env.VUE_APP_BASE_PATH,
  auth: {
    login: '/auth'
  },
  applicant: {
    list: `/applicants`,
    detail: id => `/applicants/${id}`,
    result: id => `/applicants/${id}/test-results`,
    resultDetail: (applicantId, resultId) => `/applicants/${applicantId}/test-results/${resultId}`,
    downloadPDF: (applicantId, resultId) => `/applicants/${applicantId}/test-results/${resultId}/download-pdf`,
    offline: `/applicants/offline-result`,
    updatePaymentStatus: booking_id => `/applicants/${booking_id}/payment`
  },
  payment: {
    history: '/payment-histories',
    detail: id => `/payment-histories/${id}`,
    paymentComplete: id => `/payment-histories/${id}/payment-complete`
  },
  test: {
    result: `/test-results`,
    resultDetail: id => `/test-results/${id}`,
    location: `/test-locations`
  },
  user: {
    updatePassword: '/users/password/update'
  },
  Question:{
    
  }
}

export default api
