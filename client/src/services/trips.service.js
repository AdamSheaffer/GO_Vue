import axios from 'axios'

const token = localStorage.getItem('token')
axios.defaults.headers.common['authorization'] = `${token}`

const tripsService = {
  getUserTrips() {
    return axios.get('api/trips').then(({ data }) => data)
  },

  getBadges(userId) {
    return axios.get(`api/badges/${userId}`).then(({ data }) => data)
  }
}

export default tripsService
