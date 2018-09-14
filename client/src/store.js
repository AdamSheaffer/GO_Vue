import Vue from 'vue'
import Vuex from 'vuex'
import groupBy from 'lodash/groupBy'
import ticketFinderService from './services/ticketFinder.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: [],
    eventsMetaData: null,
    lat: null,
    lon: null,
    searchParams: {},
    paging: { page: 1, sortBy: 'datetime_local.asc' }
  },
  mutations: {
    SET_EVENTS(state, payload) {
      state.events = payload.events
      state.eventsMetaData = payload.meta
    },

    SET_LOCATION(state, payload) {
      state.lat = payload.lat
      state.lon = payload.lon
    },

    SET_SEARCH_PARAMS(state, payload) {
      state.searchParams = payload
    },

    SET_PAGING(state, payload) {
      state.paging = Object.assign({}, payload)
    }
  },
  actions: {
    searchTickets({ state, commit }) {
      const coords = { lat: state.lat, lon: state.lon }
      const { searchParams, paging } = state
      const params = Object.assign({}, coords, paging, searchParams)

      return new Promise((resolve, reject) => {
        ticketFinderService
          .searchTickets(params)
          .then(response => {
            commit('SET_EVENTS', response)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  getters: {
    eventsShownCount(state) {
      return state.events.length
    },

    totalEventCount(state) {
      return state.eventsMetaData ? state.eventsMetaData.total : 0
    },

    eventsByLocation(state) {
      if (!state.events.length) return []

      const eventsByLocation = []
      const groupedObj = groupBy(
        state.events,
        e => `${e.venue.location.lat},${e.venue.location.lon}`
      )

      for (const coords in groupedObj) {
        if (groupedObj.hasOwnProperty(coords)) {
          const [lat, lon] = coords.split(',').map(c => +c)
          eventsByLocation.push({
            location: { lat, lon },
            events: groupedObj[coords]
          })
        }
      }

      return eventsByLocation
    },

    locationVenues(_s, getters) {
      return getters.eventsByLocation.map(({ events }) => {
        const event = events[0]
        const id = event.venue.id
        const parkName = event.venue.name
        const image = event.performers.homeTeam.image
        const teamName = event.performers.homeTeam.name
        return { id, parkName, image, teamName }
      })
    }
  }
})
