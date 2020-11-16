<template lang="pug">
  .layout
    h1 {{ msg }}{{ num }}
    a-button(@click="increment()") +
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
      msg: '组件B',
      num: 2
    }
  },
  methods: {
    increment() {
      this.$bus.$emit('increment', this.num)
    }
  },
  beforeDestroy() {
    this.$bus.$off('increment')
  }
}
</script>
