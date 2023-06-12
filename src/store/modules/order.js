import api from '@/api'

const state = {
  orderList: [],
  orderDetail: {}
}
const actions = {
  getOrders({ commit }, { params }) {
    return new Promise((resolve, reject) => {
      api.order.orders(params).then(
        response => {
          commit('setOrders', response.data.data)
          resolve(response)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  getOrderDetail({ commit }, { orderId }) {
    return new Promise((resolve, reject) => {
      api.order.orderDetail(orderId).then(
        response => {
          commit('setOrderDetail', response.data.data)
          resolve(response)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  processOrder({ _ }, { orderId }) {
    return new Promise((resolve, reject) => {
      api.order.processOrder(orderId).then(
        response => {
          resolve(response)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  rejectOrder({ _ }, { orderId, payloads }) {
    return new Promise((resolve, reject) => {
      api.order.rejectOrder(orderId, payloads).then(
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
  setOrders(state, value) {
    state.orderList = value
  },
  setOrderDetail(state, value) {
    state.orderDetail = value
  }
}
const getters = {
  orderList: state => state.orderList,
  orderDetail: state => state.orderDetail
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
