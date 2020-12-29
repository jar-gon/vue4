<template src="./home.pug"></template>

<script>
import { mapGetters } from 'vuex'

import A from 'components/a'
import B from 'components/b'
import C from 'components/c'

// import EventBus from 'utils/event-bus'

export default {
  name: 'Home',
  components: {
    A,
    B,
    C
  },
  inject: [ "_appSelf" ],
  data() {
    return {
      num: 0
    }
  },
  computed: {
    ...mapGetters([
      'account'
    ])
  },
  mounted() {
    this.$bus.$on("increment", (v) => {
        this.num += v
    })
    this.$bus.$on("decrease", (v) => {
        this.num -= v
    })
  }
}
</script>
