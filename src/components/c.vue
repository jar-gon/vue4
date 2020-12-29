<template lang="pug">
  .layout
    slot(name='header', :msg='msg')
    slot(name='footer')
</template>

<script>
import { Button } from 'ant-design-vue'


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
  }
}
</script>
