import api from '@/api'

const state = {

}
const actions = {
    addQuestion({ _ }, { payload }) {
        return new Promise((resolve, reject) => {
        api.question.addQuestion(payload).then(
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
    
}

const getters = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
  