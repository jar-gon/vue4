<template lang="pug">
  div {{ id }}
</template>

<script>
export default {
  name: 'UserDetail',
  data() {
    return {
      id: this.$route.params.id
    }
  }
}
</script>
