import tripsService from '../../services/trips.service'

const STATE = {
  TRIPS: 'trips'
}

const MUTATIONS = {
  SET_TRIPS: 'SET_TRIPS'
}

const ACTIONS = {
  GET_TRIPS: 'getTrips'
}

const GETTERS = {}

const userTripsModule = {
  namespaced: true,

  state: {
    [STATE.TRIPS]: []
  },

  mutations: {
    [MUTATIONS.SET_TRIPS](state, payload) {
      state[STATE.TRIPS] = payload
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
    }
  }
}

export { STATE, MUTATIONS, ACTIONS, GETTERS, userTripsModule }
