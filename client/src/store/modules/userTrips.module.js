import tripsService from '../../services/trips.service'
import parkService from '../../services/park.service'

const STATE = {
  TRIPS: 'trips',
  BADGES: 'badges',
  PARKS: 'parks'
}

const MUTATIONS = {
  SET_TRIPS: 'SET_TRIPS',
  SET_BADGES: 'SET_BADGES',
  SET_PARKS: 'SET_PARKS'
}

const ACTIONS = {
  GET_TRIPS: 'getTrips',
  GET_BADGES: 'getBadges',
  GET_PARKS: 'getParks'
}

const GETTERS = {}

const userTripsModule = {
  namespaced: true,

  state: {
    [STATE.TRIPS]: [],
    [STATE.BADGES]: [],
    [STATE.PARKS]: []
  },

  mutations: {
    [MUTATIONS.SET_TRIPS](state, payload) {
      state[STATE.TRIPS] = payload
    },

    [MUTATIONS.SET_BADGES](state, payload) {
      state[STATE.BADGES] = payload
    },

    [MUTATIONS.SET_PARKS](state, payload) {
      state[STATE.PARKS] = payload
    }
  },

  actions: {
    [ACTIONS.GET_TRIPS]({ commit }) {
      return new Promise((resolve, reject) => {
        tripsService
          .getUserTrips()
          .then(data => {
            if (data.success) {
              commit(MUTATIONS.SET_TRIPS, data.trips)
            }
            resolve(data)
          })
          .catch(reject)
      })
    },

    [ACTIONS.GET_BADGES]({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        const { user } = rootState.authModule
        tripsService
          .getBadges(user._id)
          .then(data => {
            if (data.success) {
              commit(MUTATIONS.SET_BADGES, data.badges)
            }
            resolve(data)
          })
          .catch(reject)
      })
    },

    [ACTIONS.GET_PARKS]({ commit }) {
      return new Promise((resolve, reject) => {
        parkService
          .getAllParks()
          .then(data => {
            if (data.success) {
              commit(MUTATIONS.SET_PARKS, data.parks)
            }
            resolve(data)
          })
          .catch(reject)
      })
    }
  }
}

export { STATE, MUTATIONS, ACTIONS, GETTERS, userTripsModule }
