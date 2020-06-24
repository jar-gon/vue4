/* eslint-disable object-property-newline */

import { NORMAL_STATUS } from 'components/converters/normal-status'

function status(data, label = '状态') {
  return {
    label,
    type: 'select',
    data
  }
}

export function normalStatus(label){
  return status(NORMAL_STATUS.map((x, i) => ({ label: x, value: i + 1 })), label)
}

export function datetime(label = '创建时间'){
  return {
    label,
    type: 'rangePicker',
  }
}
