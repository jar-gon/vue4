import Vue from 'vue'

Vue.directive('trim', {
  inserted: function(e) {
    console.info(e)
  }
})
