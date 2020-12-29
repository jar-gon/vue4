import Vue from 'vue'
import VueRouter from 'vue-router'
import { menus } from './common'

Vue.use(VueRouter)

const routes = menus

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   console.info(to, '全局前置守卫')
//   console.info(from, '全局前置守卫')
//   if (to.name === 'home') next({ name: 'user' })
//   next()
// })

export default router
