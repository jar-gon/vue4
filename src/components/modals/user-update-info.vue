<template src="./modal-form.pug"></template>

<script>
import { modalFormMixin } from 'components/mixin/modal-form'

import { notificationTask } from 'utils/task'
import { mobileFn, email } from 'utils/validators'

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
      title: '修改用户',
      mobile: ''
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
            },
            {
              // pattern: email,
              validator: mobileFn,
              message: '请输入正确的手机号'
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
            },
            {
              pattern: email,
              message: '请输入正确的邮箱'
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
