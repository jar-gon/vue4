<template lang="pug">
  .account
    a-form(:form="form" @submit="handleSubmit")
      a-form-item(:validate-status="isFieldError('username') ? 'error' : ''", :help="isFieldError('username') || ''")
        a-input(v-decorator="['username', {rules: [{ required: true, message: 'Please input your username!' }]}]" placeholder="Username")
          a-icon(slot="prefix" type="user" style="color:rgba(0,0,0,.25)")
      a-form-item(:validate-status="isFieldError('password') ? 'error' : ''", :help="isFieldError('password') || ''")
        a-input(v-decorator="['password', {rules: [{ required: true, message: 'Please input your Password!' }]}]" type="password" placeholder="Password")
          a-icon(slot="prefix" type="lock" style="color:rgba(0,0,0,.25)")
      a-form-item
        #noCaptchaCode.slide-verify-code
      a-form-item
        a-button(html-type="submit" type="primary", :disabled="hasErrors(form.getFieldsError())") Log in
</template>

<script>
// @ is an alias to /src
import { Button, Form, Icon, Input } from 'ant-design-vue'

import { NoCaptcha } from 'utils/captcha'
import { checkLogin, storage } from 'utils/storage'
import { getQueryParams } from 'utils/url'

import accountApi from 'apis/account'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

export default {
  name: 'Login',
  components: {
    AButton: Button,
    AForm: Form,
    AFormItem: Form.Item,
    AIcon: Icon,
    AInput: Input,
  },
  data() {
    return {
      noCaptcha: NoCaptcha,
      hasErrors,
      form: this.$form.createForm(this)
    }
  },
  mounted() {
    if (checkLogin()) {
      this.redirectFromLogin()
      return
    }
    this.noCaptcha = new NoCaptcha()
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields()
    })
  },
  methods: {
    // Only show error after a field is touched.
    isFieldError(field) {
      return this.form.isFieldTouched(field) && this.form.getFieldError(field)
    },

    handleSubmit(e) {
      e.preventDefault()
      if (!this.noCaptcha.captchaData) {
        return
      }
      const { csessionid: sessionId, scene, sig, token } = this.noCaptcha.captchaData
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          accountApi.login(values.username, values.password, sessionId, scene, sig, token).then(({ token }) => {
            storage.token = token
            this.redirectFromLogin()
          }, err => {
            console.info(err)
            this.noCaptcha.captcha.reset()
          })
        }
      })
    },

    redirectFromLogin() {
      let { redirect } = getQueryParams()
      if (!redirect || redirect[0] !== '/') {
        redirect = '/'
      }
      window.location.replace(redirect)
    }
  }
}
</script>
