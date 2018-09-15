import axios from 'axios'

const ticketFinderService = {
  searchTickets(params) {
    return axios.get('/api/range', { params }).then(({ data }) => data)
  },

  searchTicketsByPark(park, page, sortBy) {
    const params = { page, sortBy }
    return axios.get(`api/tickets/${park}`, { params }).then(({ data }) => data)
  }
}

export default ticketFinderService
