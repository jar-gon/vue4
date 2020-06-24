// import format from 'date-fns/format'

// export function formatDate(date) {
//   return format(date instanceof Date ? date : new Date(date), 'yyyy-MM-dd HH:mm:ss')
// }

// export function formatCurrency(value) {
//   return currencyFormatter.format(value).replace(/CNY\s?/, '')
// }

export function strmax(value, max = 32, suffix = false) {
  if (value.length <= max / 2) {
    return value
  }
  let count = 0
  let length = max
  while (count < value.length) {
    length -= value.charCodeAt(count) < 255 ? 1 : 2
    if (length < 0) {
      break
    }
    count++
  }
  let str = value.substr(0, count)
  if (suffix && str.length < value.length) {
    str += suffix
  }
  return str
}

export function extendParams(query, value, skip = 'datetime') {
  Object.keys(value)
    .filter(x => x !== skip && ![ undefined, null ].includes(value[x]))
    .forEach(x => query[x] = value[x])
}

export function extendDateRangeParam(query, dates, [ startKey, endKey ] = [ 'start', 'end' ], fixTime = false) {
  const [ startTime, endTime ] = dates || [ ]
  if (startTime && startKey) {
    const startString = startTime.toISOString()
    query[startKey] = !fixTime ? `${ startString.substr(0, startString.length - 5) }Z` : `${ startString.substr(0, 11) }00:00:00Z`
  }
  if (endTime && endKey) {
    const endString = endTime.toISOString()
    query[endKey] = !fixTime ? `${ endString.substr(0, endString.length - 5) }Z` : `${ endString.substr(0, 11) }23:59:59Z`
  }
}

export function handleFormValues (values) {
  const params = {}
  extendParams(params, values)
  if (values.datetime) {
    extendDateRangeParam(params, values.datetime)
  }
  return params
}
