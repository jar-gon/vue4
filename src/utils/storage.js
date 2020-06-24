const localStorage = window.localStorage || { }

function getValue(key) {
  return localStorage[key]
}

function setValue(key, value) {
  switch (value) {
    case undefined:
    case null:
      delete localStorage[key]
      break
    default:
      localStorage[key] = value
      break
  }
}

class Storage {
  _token = getValue('token')

  get token() {
    return this._token
  }

  set token(value) {
    setValue('token', value)
    this._token = value
  }
}

export const storage = new Storage

export function checkLogin() {
  return localStorage.token
}
