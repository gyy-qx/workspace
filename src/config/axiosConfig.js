import axios from 'axios'
import router from '@/router'
import store from '@/store/index.js'

axios.interceptors.request.use(config => {
  console.log(store.state.token)
  if (store.state.token) {
    console.log(store.state.token)
    config.headers.token = store.state.token
  }
  return config
}, error => {
  console.log('在request拦截器显示错误：', error.response)
  return Promise.reject(error)
}
)

axios.interceptors.response.use(response => {
  if (response.headers.token) {
    store.commit('setToken', response.headers.token)
    // store.mutations.setToken(this.state, response.headers.token)
  }
  return response
}, error => {
  console.log(error)
  if (error.response) {
    switch (error.response.status) {
      case 401:
        router.replace({
          path: '/signIn',
          query: { redirect: router.currentRoute.value }
        }).then(error => {
          console.log(error)
        })
    }
  }
  return Promise.reject(error)
}
)

export default axios
