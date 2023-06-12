import api from '@/api'

const state = {
  applicantList: [],
  applicantDetail: {},
  applicantResult: [],
  applicantResultDetail: {},
  testLocation: []
}
const actions = {
  getApplicantList({ commit }, { params }) {
    return new Promise((resolve, reject) => {
      api.applicant.list(params).then(
        response => {
          commit('setApplicantList', response.data.data)
          resolve(response)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  getApplicantDetail({ commit }, { id }) {
    return new Promise((resolve, reject) => {
      api.applicant.detail(id).then(
        response => {
          commit('setApplicantDetail', response.data.data)
          resolve(response)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  getApplicantResult({ commit }, { id }) {
    return new Promise((resolve, reject) => {
      api.applicant.result(id).then(
        response => {
          commit('setApplicantResult', response.data.data)
          resolve(response)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  getApplicantResultDetail({ commit }, { applicantId, resultId }) {
    return new Promise((resolve, reject) => {
      api.applicant.resultDetail(applicantId, resultId).then(
        response => {
          commit('setApplicantResultDetail', response.data.data)
          resolve(response)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  downloadPDF({ _ }, { applicantId, resultId }) {
    return new Promise((resolve, reject) => {
      api.applicant.downloadPDF(applicantId, resultId).then(
        response => {
          resolve(response)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  getTestLocation({ commit }) {
    return new Promise((resolve, reject) => {
      api.applicant.location().then(
        response => {
          commit('setTestLocation', response.data.data)
          resolve(response)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  addApplicant({ _ }, { payload }) {
    return new Promise((resolve, reject) => {
      api.applicant.addApplicant(payload).then(
        response => {
          resolve(response)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  updatePaymentStatus({ _ }, { booking_id, payload }) {
    return new Promise((resolve, reject) => {
      api.applicant.updatePaymentStatus(booking_id, payload).then(
        response => {
          resolve(response)
        },
        error => {
          reject(error)
        }
      )
    })
  }
}
const mutations = {
  setApplicantList(state, value) {
    state.applicantList = value
  },
  setApplicantDetail(state, value) {
    state.applicantDetail = value
  },
  setApplicantResult(state, value) {
    state.applicantResult = value
  },
  setApplicantResultDetail(state, value) {
    state.applicantResultDetail = value
  },
  setTestLocation(state, value) {
    state.testLocation = value
  }
}
const getters = {
  applicantList: state => state.applicantList,
  applicantDetail: state => state.applicantDetail,
  applicantResult: state => state.applicantResult,
  applicantResultDetail: state => state.applicantResultDetail,
  testLocation: state => state.testLocation
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
