import api from '@/api'
const state = {
  isLoading: false,
  expandedMenu: true,
  toast: null,
  isMobile: false,
  awb: {}
}
const actions = {
  setToast: ({ commit }, { options }) => {
    commit('setToastState', options)
  },
  showLoading: ({ commit }) => {
    commit('setLoadingStatus', true)
  },
  hideLoading: ({ commit }) => {
    commit('setLoadingStatus', false)
  },
  expandMenu: ({ commit }, value) => {
    commit('setExpandMenu', value)
  },
  uploadImage({ commit }, { payloads }) {
    return new Promise((resolve, reject) => {
      api.common.uploadImage(payloads).then(
        response => {
          resolve(response.data.data)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  checkAwb({ commit }, { awbNumber }) {
    return new Promise((resolve, reject) => {
      api.common.checkAwb(awbNumber).then(
        response => {
          commit('setAwbDetail', response.data.data)
          resolve(response.data.data)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  updatePassword({ _ }, { payloads }) {
    return new Promise((resolve, reject) => {
      api.common.updatePassword(payloads).then(
        response => {
          resolve(response.data.data)
        },
        error => {
          reject(error)
        }
      )
    })
  }
}
const mutations = {
  setIsMobile(state, value) {
    state.isMobile = value
  },
  setLoadingStatus(state, value) {
    state.isLoading = value
  },
  setExpandMenu(state, value) {
    state.expandedMenu = value
  },
  setToastState(state, value) {
    state.toast = value
  },
  setAwbDetail(state, value) {
    state.awb = value
  }
}
const getters = {
  isLoading: state => state.isLoading,
  expandedMenu: state => state.expandedMenu,
  toast: state => state.toast,
  isMobile: state => state.isMobile,
  awb: state => state.awb
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
