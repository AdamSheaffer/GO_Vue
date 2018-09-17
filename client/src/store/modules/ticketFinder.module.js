import groupBy from 'lodash/groupBy'
import ticketFinderService from '../../services/ticketFinder.service'

const STATE = {
  EVENTS: 'events',
  METADATA: 'eventsMetaData',
  LAT: 'lat',
  LON: 'lon',
  SEARCH_PARAMS: 'searchParams',
  PAGING: 'paging'
}

const MUTATIONS = {
  SET_EVENTS: 'SET_EVENTS',
  SET_LOCATION: 'SET_LOCATION',
  SET_SEARCH_PARAMS: 'SET_SEARCH_PARAMS',
  SET_PAGING: 'SET_PAGING'
}

const ACTIONS = {
  SEARCH_TICKETS: 'searchTickets'
}

const GETTERS = {
  EVENTS_SHOWN_COUNT: 'eventsShownCount',
  TOTAL_EVENTS_COUNT: 'totalEventCount',
  EVENTS_BY_LOCATION: 'eventsByLocation',
  LOCATION_VENUES: 'locationVenues'
}

const ticketFinderModule = {
  namespaced: true,

  state: {
    [STATE.EVENTS]: [],
    [STATE.METADATA]: null,
    [STATE.LAT]: null,
    [STATE.LON]: null,
    [STATE.SEARCH_PARAMS]: {},
    [STATE.PAGING]: { page: 1, sortBy: 'datetime_local.asc' }
  },

  mutations: {
    [MUTATIONS.SET_EVENTS](state, payload) {
      state.events = payload.events
      state.eventsMetaData = payload.meta
    },

    [MUTATIONS.SET_LOCATION](state, payload) {
      state.lat = payload.lat
      state.lon = payload.lon
    },

    [MUTATIONS.SET_SEARCH_PARAMS](state, payload) {
      state.searchParams = payload
    },

    [MUTATIONS.SET_PAGING](state, payload) {
      state.paging = Object.assign({}, payload)
    }
  },

  actions: {
    [ACTIONS.SEARCH_TICKETS]({ state, commit }) {
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
    [GETTERS.EVENTS_SHOWN_COUNT](state) {
      return state.events.length
    },

    [GETTERS.TOTAL_EVENTS_COUNT](state) {
      return state.eventsMetaData ? state.eventsMetaData.total : 0
    },

    [GETTERS.EVENTS_BY_LOCATION](state) {
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

    [GETTERS.LOCATION_VENUES](_s, getters) {
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
}

export { STATE, MUTATIONS, ACTIONS, GETTERS, ticketFinderModule }
