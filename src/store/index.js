import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import auth from './modules/auth'
import payment from './modules/payment'
import applicant from './modules/applicant'
import question from './modules/question'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    common,
    payment,
    applicant,
    question
  }
})
