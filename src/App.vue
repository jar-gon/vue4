<template lang="pug">
  ConfigProvider(:locale="zh_CN", :autoInsertSpaceInButton="false")
    router-view
</template>

<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN"
import { ConfigProvider } from "ant-design-vue"
import { mapMutations } from 'vuex'

import { session } from 'utils/session'
import { checkLogin } from 'utils/storage'
import { getLogoutUrl } from 'utils/url'

import accountApi from 'apis/account'

const publicUrls = [
  '/login',
  '/logout'
]

export default {
  name: "App",
  components: {
    ConfigProvider
  },
  provide() {
    return {
      _appSelf: this
    }
  },
  data() {
    return {
      zh_CN,
      account: {}
    }
  },
  created() {
    if (!publicUrls.includes(window.location.pathname)) {
      if (checkLogin()) {
        this.getUserInfo()
      } else {
        this.$router.replace(getLogoutUrl())
      }
    }
    // //在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem("store") ) {
    //   this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    // }

    // //在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener("beforeunload",()=>{
    //   sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    // })
  },
  methods: {
    getUserInfo() {
      accountApi.getInfo().then(account => {
        this.setAccount(account)
        this.account = account
        session.initialized = true
      })
    },
    ...mapMutations({
      setAccount: 'SET_ACCOUNT'
    })
  }
}
</script>
