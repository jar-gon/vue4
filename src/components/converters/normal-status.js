export const NORMAL_STATUS = [ '正常', '已禁用' ]

export function ConvertNormalStatus(status) {
  return NORMAL_STATUS[status - 1] || status
}
