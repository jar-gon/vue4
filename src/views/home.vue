<template src="./home.pug"></template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  inject: [ "_appSelf" ],
  computed: {
    ...mapGetters([
      'account'
    ])
  }
}
</script>
