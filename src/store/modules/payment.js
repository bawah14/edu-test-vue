import api from '@/api'

const state = {
  paymentHistory: {},
  paymentDetail: {}
}
const actions = {
  getPaymentHistory({ commit }, { params }) {
    return new Promise((resolve, reject) => {
      api.payment.history(params).then(
        (response) => {
          commit('setPaymentHistory', response.data.data)
          resolve(response)
        },
        (error) => {
          reject(error)
        }
      )
    })
  },
  getPaymentDetail({ commit }, { id }) {
    return new Promise((resolve, reject) => {
      api.payment.detail(id).then(
        (response) => {
          commit('setPaymentDetail', response.data.data)
          resolve(response)
        },
        (error) => {
          reject(error)
        }
      )
    })
  },
  setPaymentComplete({ _ }, { id }) {
    return new Promise((resolve, reject) => {
      api.payment.paymentComplete(id).then(
        (response) => {
          resolve(response)
        },
        (error) => {
          reject(error)
        }
      )
    })
  }
}
const mutations = {
  setPaymentHistory(state, value) {
    state.paymentHistory = value
  },
  setPaymentDetail(state, value) {
    state.paymentDetail = value
  }
}
const getters = {
  paymentHistory: (state) => state.paymentList,
  paymentList: (state) => state.paymentHistory && state.paymentHistory.payment_list,
  income: (state) => state.paymentHistory && state.paymentHistory.overview,
  paymentDetail: (state) => state.paymentDetail
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
