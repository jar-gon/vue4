import axios from "axios"

import { session } from 'utils/session'
import { storage, checkLogin } from 'utils/storage'
import { INVALID_TOKEN } from 'utils/api-errors'
import { browser, replaceToLogout, getLogoutUrl } from 'utils/url'

axios.defaults.baseURL = process.env.VUE_APP_UEL
if (browser && checkLogin()) {
  axios.defaults.headers.common['Yunq-Authenticate'] = storage.token
}
/* axios.defaults.headers.common['ISV-Name'] = 'qingxiu' */


// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response.data.data
  },
  function(error) {
    // 对响应错误做点什么
    const err = error.response.data
    const { retCode } = err || { }
    if (retCode === INVALID_TOKEN) {
    if (session.initialized) {
      replaceToLogout()
    } else {
      window.location.replace(getLogoutUrl())
    }
    }
    return Promise.reject(err)
  }
)
