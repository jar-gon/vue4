<template lang="pug">
  .layout
    h1 {{ msg }}{{num}}
    a-button(@click="decrease()") -
</template>

<script>
import { Button } from 'ant-design-vue'

// import EventBus from 'utils/event-bus'

export default {
  name: 'Layout',
  components: {
    AButton: Button,
  },
  data() {
    return {
      msg: '组件A',
      num: 1
    }
  },
  methods: {
    decrease() {
      this.$bus.$emit('decrease', this.num)
    }
  },
  beforeDestroy() {
    this.$bus.$off('decrease')
  }
}
</script>
