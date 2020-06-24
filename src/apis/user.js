/* eslint-disable object-property-newline */

import axios from 'axios'

const userApi = {
  listUser(params) {
    return axios.get('/users', { params })
  },
  resetPassword(userId, password, reset) {
    return axios.put(`/user/${ userId }/password`, { password, reset })
  },
  updateUser(userId, user) {
    return axios.patch(`/user/${ userId }/info`, user)
  }
}

export default userApi
