import Vue from 'vue'
import moment from 'moment'

Vue.filter('datetime', (value, format) => {
  if (value) {
    return moment(value).format(format || 'MM/DD/YYYY')
  }
})
