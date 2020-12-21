import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '@/views/SignIn'
import SignUp from '@/views/SignUp'
import Homepage from '@/views/Homepage'
import MerchantHomepage from '@/views/MerchantHomepage'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signUp',
    name: SignUp,
    component: SignUp
  },
  {
    path: '/homepage',
    name: Homepage,
    component: Homepage
  }, {
    path: '/merchantHomepage',
    name: MerchantHomepage,
    component: MerchantHomepage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// // 导航守卫
// // 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path === '/signIn' || to.path === '/signUp') {
//     next()
//   } else {
//     const token = localStorage.getItem('token')
//
//     if (token === null || token === '') {
//       next('/login')
//     } else {
//       next()
//     }
//   }
// })

export default router
