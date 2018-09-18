import axios from 'axios'

const createAuthHeader = () => {
  const token = localStorage.getItem('token')
  return { authorization: token }
}

const tripsService = {
  getUserTrips() {
    const headers = createAuthHeader()
    return axios.get('api/trips', { headers }).then(({ data }) => data)
  },

  getBadges(userId) {
    const headers = createAuthHeader()
    return axios
      .get(`api/badges/${userId}`, { headers })
      .then(({ data }) => data)
  }
}

export default tripsService
