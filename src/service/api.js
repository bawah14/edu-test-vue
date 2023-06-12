import axios from 'axios'
import store from '@/store'
const baseURL = axios.create({
  baseURL: process.env.VUE_APP_BASE_PATH
})

const responseHandler = response => {
  if (response.status === 401) {
    store.dispatch('auth/removeUserData')
  }
  return response
}

const errorHandler = error => {
  if (error.response.status === 401) {
    store.dispatch('auth/removeUserData')
  }
  return Promise.reject(error)
}

baseURL.interceptors.response.use(
  response => responseHandler(response),
  error => errorHandler(error)
)

export default baseURL
