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

export default router
