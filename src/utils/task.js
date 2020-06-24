import Notification from 'utils/notification'

export function notificationTask(promise, action) {
  const messageId = Notification.info(action, '')
  promise.then(
    () => {
      Notification.success(action, '操作成功')
      Notification.close(messageId)
    },
    (err) => {
      Notification.error(action, `操作失败：${ err.retMsg }`)
      Notification.close(messageId)
    }
  )
  return promise
}
