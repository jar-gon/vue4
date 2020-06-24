import * as types from './mutation-types'

const mutation = {
  [types.SET_ACCOUNT](state, account) {
    state.account = account
  }
}

export default mutation