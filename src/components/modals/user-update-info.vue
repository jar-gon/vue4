<template src="./modal-form.pug"></template>

<script>
import { modalFormMixin } from 'components/mixin/modal-form'

import { notificationTask } from 'utils/task'

import userApi from 'apis/user'

export default {
  name: 'UserUpdateInfo',
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
      title: '修改用户'
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
        mobile: {
          label: '手机',
          value: user.mobile,
          rules: [
            {
              required: true,
              message: 'Please input your mobile!'
            }
          ]
        },
        email: {
          label: '邮箱',
          value: user.email,
          rules: [
            {
              required: true,
              message: 'Please input your email!'
            }
          ]
        }
      }
    },
    submit(values) {
      this.handleCancel()
      notificationTask(userApi.updateUser(this.user.id, values), this.title).then(() => this.$emit('afterClose'))
    }
  }
}
</script>
