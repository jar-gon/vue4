<template lang="pug">
  a-form.simple-form(:form="form", :hideRequiredMark="formProperty.hideRequiredMark", :labelAlign="formProperty.labelAlign", :layout="formProperty.layout",  @submit="handleSubmit")
    template(v-for="(field, name) in formFields")
      a-form-item(v-if="field.type == 'text'", :label="field.label", :key="name", :label-col="{ span: 8 }", :wrapper-col="{ span: 16 }")
        span {{ field.value }}
      a-form-item(v-if="field.type == 'input' || !field.type", :label="field.label", :key="name", :label-col="{ span: 8 }", :wrapper-col="{ span: 16 }")
        a-input(v-decorator="[name, {rules: field.rules, initialValue: field.value}]", :maxLength="field.maxlength" :placeholder="field.placeholder || field.label")
      a-form-item(v-if="field.type == 'textarea'", :label="field.label", :key="name", :label-col="{ span: 8 }", :wrapper-col="{ span: 16 }")
        a-textarea(v-decorator="[name, {rules: field.rules, initialValue: field.value}]", :maxLength="field.maxlength" :placeholder="field.placeholder || field.label")
      a-form-item(v-if="field.type == 'password'", :label="field.label", :key="name", :label-col="{ span: 8 }", :wrapper-col="{ span: 16 }")
        a-input-password(v-decorator="[name, {rules: field.rules, initialValue: field.value}]", :maxLength="field.maxlength", allow-clear :placeholder="field.placeholder || field.label")
      a-form-item(v-if="field.type == 'select'", :label="field.label", :key="name", :label-col="{ span: 8 }", :wrapper-col="{ span: 16 }")
        a-select(v-decorator="[name, {rules: field.rules, initialValue: field.value}]", :mode="field.mode", :placeholder="field.placeholder || field.label" allowClear)
          a-select-option(v-for="(item, index) of field.data", :key="index", :value="item.value") {{ item.label }}
      a-form-item(v-if="field.type == 'rangePicker'", :label="field.label", :key="name", :label-col="{ span: 8 }", :wrapper-col="{ span: 16 }")
        a-range-picker(v-decorator="[name, {rules: field.rules}]" show-time)
          a-icon(slot="suffixIcon" type="calendar")
      a-form-item(v-if="field.type == 'tpl'", :label="field.label", :key="name", :label-col="{ span: 8 }", :wrapper-col="{ span: 16 }")
        slot(:name="name")
      a-form-item(v-if="field.type == 'checkbox'", :key="name", :wrapper-col="{ span: 16, offset: 8 }")
        a-checkbox(v-decorator="[name, {rules: field.rules, valuePropName: 'checked', initialValue: field.value}]") {{ field.label }}
</template>

<script>
import { Button, Checkbox, DatePicker, Form, Icon, Input, Select } from 'ant-design-vue'

import { handleFormValues } from 'utils/common'

export default {
  name: 'SimpleForm',
  components: {
    AButton: Button,
    ACheckbox: Checkbox,
    AForm: Form,
    AFormItem: Form.Item,
    AIcon: Icon,
    AInput: Input,
    AInputPassword: Input.Password,
    ARangePicker: DatePicker.RangePicker,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATextarea: Input.TextArea
  },
  props: {
    formStates: {
      type: Object,
      required: true,
      default:  () => {
        return {}
      }
    }
  },
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  computed: {
    formProperty: function () {
      return this.formStates.form || {}
    },
    formFields: function () {
      delete this.formStates.form
      return this.formStates
    }
  },
  methods: {
    getFieldsValue() {
      return handleFormValues(this.form.getFieldsValue())
    },
    handleSubmit() {
      const _ = this
      this.form.validateFields((err, values) => {
        if (!err) {
          _.$emit('submit', handleFormValues(values))
        }
      })
    },
    resetFields() {
      this.form.resetFields()
    }
  }
}
</script>
