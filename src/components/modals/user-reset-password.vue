<template src="./modal-form.pug"></template>

<script>
import { modalFormMixin } from 'components/mixin/modal-form'

import { notificationTask } from 'utils/task'

import userApi from 'apis/user'

export default {
  name: 'UserResetPassword',
  mixins: [
    modalFormMixin
  ],
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      title: '重置密码'
    }
  },
  methods: {
    getformStates() {
      const user = this.user
      return {
        username: {
          label: '用户名',
          value: user.username,
          type: 'text'
        },
        password: {
          label: '密码',
          type: 'password',
          rules: [
            {
              required: true,
              message: 'Please input your note!'
            }
          ]
        },
        reset: {
          label: '是否重置密码',
          type: 'checkbox'
        }
      }
    },
    submit(values) {
      this.handleCancel()
      notificationTask(userApi.resetPassword(this.user.id, values.password, values.reset), this.title)
    },
    afterClose() {
      this.$emit('afterClose')
    }
  }
}
</script>
