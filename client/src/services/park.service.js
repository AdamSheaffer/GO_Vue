import axios from 'axios'

const parkService = {
  getAllParks() {
    return axios.get('api/parks').then(({ data }) => data)
  },

  getParkByTeam(teamName) {
    return axios.get(`api/parks/${teamName}`).then(({ data }) => data)
  }
}

export default parkService
