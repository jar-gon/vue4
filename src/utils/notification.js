/* eslint-disable object-property-newline */

import Notification from 'ant-design-vue/es/notification'
import uuid from 'uuid/v4'

export default class {
  static create(type, message, description, props) {
    const messageId = uuid()
    Notification.open({
      ...props,
      type,
      key: messageId,
      message,
      description,
      'class': `ant-notification--${ type }`,
    })
    return messageId
  }

  static success(message, description, props) {
    return this.create('success', message, description, props)
  }

  static info(message, description, props) {
    return this.create('info', message, description, { duration: 0, ...props })
  }

  static warning(message, description, props) {
    return this.create('warning', message, description, { ...props })
  }

  static error(message, description, props) {
    return this.create('error', message, description, { duration: 0, ...props })
  }

  static close(messageId) {
    Notification.close(messageId)
  }

  static destroy() {
    Notification.destroy()
  }
}
