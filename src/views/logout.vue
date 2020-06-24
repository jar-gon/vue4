<template lang="pug"></template>

<script>
import { storage } from 'utils/storage'
import { getQueryParams, buildUrl } from 'utils/url'

import accountApi from 'apis/account'

export default {
  name: 'Logout',
  created() {
    if (storage.token) {
      accountApi.logout().then(() => {
        storage.token = null
        this.redirectFromLogout()
      })
    } else {
      this.redirectFromLogout()
    }
  },
  methods: {
    redirectFromLogout() {
      const { redirect } = getQueryParams()
      const url = buildUrl({
        path: '/login',
        query: redirect && { redirect },
      })
      this.$router.replace(url)
    }
  }
}
</script>
