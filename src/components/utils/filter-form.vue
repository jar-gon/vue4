<template lang="pug">
  .filter-form
    simple-form(ref="form", :formStates="filterFormStates")
    a-button(@click="search") 查询
    a-button(@click="clear") 清空
</template>

<script>
import { Button } from 'ant-design-vue'
import SimpleForm from './simple-form.vue'

export default {
  name: 'FilterForm',
  components: {
    AButton: Button,
    SimpleForm
  },
  props: {
    filterFormStates: {
      type: Object,
      required: true,
      default:  () => {
        return {}
      }
    }
  },
  methods: {
    clear() {
      this.$refs.form.resetFields()
    },
    search() {
      this.$emit('search', this.$refs.form.getFieldsValue())
    }
  }
}
</script>
