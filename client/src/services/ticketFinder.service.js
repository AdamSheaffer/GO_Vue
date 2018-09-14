import axios from 'axios'

const ticketFinderService = {
  searchTickets(params) {
    return axios.get('/api/range', { params }).then(({ data }) => data)
  }
}

export default ticketFinderService
