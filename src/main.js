import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import './utils/directive'
import './utils/filter'
import "./apis"

import { Modal } from 'ant-design-vue'

var EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

import "./stylus/index.less"
import "./stylus/index.styl"

Vue.config.productionTip = false
Vue.use(Modal)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
