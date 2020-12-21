import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    username: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
      console.log('store、localstorage保存token成功！')
    },
    delToken (state) {
      state.token = null
      localStorage.removeItem('token')
    },
    setUsername (state, username) {
      state.username = username
      localStorage.setItem('username', username)
    },
    delUsername (state) {
      state.username = null
      localStorage.removeItem('username')
    }
  },
  actions: {},
  modules: {}
})
