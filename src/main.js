import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import axios from '@/config/axiosConfig'
import VueAxios from 'vue-axios'
import Antd from 'ant-design-vue/es'
import 'ant-design-vue/dist/antd.css'
import '@ant-design/icons-vue'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueAxios, axios)
// app.config.productionTip = false
app.use(Antd)
app.mount('#app')
