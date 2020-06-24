import Home from 'views/home'
import store from 'store'
// import { storage } from 'utils/storage'

export const menus = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import('views/login')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () =>
      import('views/logout')
  },
  {
    path: '/user',
    name: 'user',
    component: () =>
      import('views/user')
  },
  {
    path: '/user/:id',
    name: 'userDetail',
    component: () =>
      import('views/user/[_id]')
  }
]

export function getCurrentMenu() {
  const pathname = `/${ window.location.pathname.split('/')[1] }`
  return menus.find(({ paths }) => paths.includes(pathname))
}

export function isCurrentMenu(menu) {
  const { pathname } = window.location
  if (menu.paths.includes(pathname)) {
    return true
  }
  if (!menu.exact) {
    if (pathname.startsWith(`${ menu.path }/`)) {
      return true
    }
    if (menu.menus && menu.menus.some(({ path, paths }) => paths.includes(pathname) || pathname.startsWith(`${ path }/`))) {
      return true
    }
  }
  return false
}

export function isMenuAccessible(role) {
  // const token = storage.token
  const { account } = store.state
  return (!role || role >= account.role)
}
