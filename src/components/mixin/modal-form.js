import SimpleForm from 'components/utils/simple-form'

export const modalFormMixin = {
  data() {
    return {
      visible: false,
    }
  },
  components: {
    SimpleForm
  },
  methods: {
    handleCancel() {
      this.visible = false
      this.$refs.form.resetFields()
    },
    handleOk() {
      this.$refs.form.handleSubmit()
    },
    show() {
      this.visible = true
    }
  }
}
