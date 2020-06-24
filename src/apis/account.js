/* eslint-disable object-property-newline */

import axios from 'axios'

const accountApi = {
  getInfo() {
    return axios.get('/account/info')
  },
  login(username, password, sessionId, scene, sig, token) {
    const params = { username, password, sessionId, scene, sig, token, mode: 'mis' }
    return axios.get('/account/token', { params })
  },
  logout(token) {
    return axios.delete(`/account/token/${ token }`)
  }
}

export default accountApi
