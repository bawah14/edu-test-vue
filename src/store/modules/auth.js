import api from '@/api'

const state = {
  userData: {
    user: {
      id: null
    }
  },
  userProfile: {}
}
const actions = {
  getCurrentUser: ({ commit }) => {
    const data = localStorage.getItem('user_data')
    if (data) commit('setUserData', JSON.parse(data))
  },
  removeUserData: ({ commit }) => {
    commit('setUserData', { user: { id: null } })
  },
  getProfile({ commit }) {
    return new Promise((resolve, reject) => {
      api.auth.profile().then(
        response => {
          commit('setUserProfile', response.data.data)
          resolve(response)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  login({ commit }, { payloads }) {
    return new Promise((resolve, reject) => {
      api.auth.login(payloads).then(
        response => {
          commit('setUserData', response.data.data)
          resolve(response)
        },
        error => {
          reject(error)
        }
      )
    })
  },
  logout({ dispatch }) {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('user_data')
      dispatch('removeUserData')
      resolve()
    })
  }
}
const mutations = {
  setUserData(state, value) {
    state.userData = value
    localStorage.removeItem('user_data')
    localStorage.setItem('user_data', JSON.stringify(value))
  },
  setUserProfile(state, value) {
    state.userProfile = value
  }
}
const getters = {
  userData: state => state.userData,
  isLoggedIn: state => (state && state.userData ? state.userData.user.id !== null : false),
  // isLoggedIn: state => true,
  userProfile: state => state.userProfile
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
