<template lang="pug">
  .layout
    h1 {{ msg }}
</template>

<script>
export default {
  name: 'Layout',
  props: {
    msg: String
  }
}
</script>
