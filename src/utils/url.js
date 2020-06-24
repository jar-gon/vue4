import router from "../router"
import qs from 'qs'
export var dev = process.env.NODE_ENV !== 'production'
export var browser = process.browser
export function getQueryParams() {
    return qs.parse(window.location.search.substr(1))
}
export function buildUrl(_a) {
    var _b = _a.origin, origin = _b === void 0 ? '' : _b, path = _a.path, query = _a.query, _c = _a.hash, hash = _c === void 0 ? '' : _c
    return "" + origin + path + (query ? "?" + qs.stringify(query) : '') + (hash ? "#" + hash : '')
}
export function getPathAndQuery() {
    var _a = window.location, pathname = _a.pathname, search = _a.search
    return pathname + search
}
export function getLoginUrl(currentUrl) {
    var redirectUrl = getPathAndQuery()
    return buildUrl({
        path: '/login',
        query: redirectUrl !== currentUrl ? { redirect: redirectUrl } : null,
    })
}
export function getLogoutUrl(currentUrl) {
    var redirectUrl = getPathAndQuery()
    return buildUrl({
        path: '/logout',
        query: redirectUrl !== currentUrl ? { redirect: redirectUrl } : null,
    })
}
export function redirectToLogin(current) {
    router.push(getLoginUrl(current))
}
export function replaceToLogin(current) {
    router.replace(getLoginUrl(current))
}
export function redirectToLogout(current) {
    router.push(getLogoutUrl(current))
}
export function replaceToLogout(current) {
    router.replace(getLogoutUrl(current))
}
export function getParentNode(triggerNode) {
    return triggerNode.parentNode
}
