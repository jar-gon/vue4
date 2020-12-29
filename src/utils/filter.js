import Vue from 'vue'

Vue.filter('formatDate', function(v) {
  return `formatDate ${ v }`
})

Vue.filter('formatCurrency', function(v) {
  return `formatCurrency ${ v }`
})
