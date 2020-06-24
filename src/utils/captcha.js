/* eslint-disable no-undef */
import 'static/noCaptcha'

export class NoCaptcha {
  captcha
  captchaData

  constructor(appkey = process.env.VUE_APP_CAPTCHA, renderTo = '#noCaptchaCode', language = 'cn') {
    const opts = {
      appkey,
      token: [ appkey.substring(0, 8), (new Date()).getTime(), Math.random() ].join(':'),
      renderTo,
      scene: 'nc_login',
      customWidth: 330,
      trans: { key1: 'code0' },
      elementID: [ 'usernameID' ],
      is_Opt: 0,
      language,
      isEnabled: true,
      timeout: 3000,
      times: 5,
      callback: (data) => {
        data.scene = opts.scene
        this.captchaData = data
      }
    }
    this.captcha = new noCaptcha(opts)
    if (language === 'cn') {
      this.upLang({
        _startTEXT: '请按住滑块，拖动到最右边',
        _yesTEXT: '验证通过',
        _error300: '哎呀，出错了，点击<a href="javascript:__nc.reset()">刷新</a>再来一次',
        _errorNetwork: '网络不给力，请<a href="javascript:__nc.reset()">点击刷新</a>',
      })
    }
  }

  upLang(language) {
    this.captcha.upLang(this.language, language)
  }

  reload() {
    this.captcha.reload()
  }

  get data() {
    return this.captchaData
  }
}
