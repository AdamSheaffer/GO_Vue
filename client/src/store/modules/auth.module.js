import authService from '../../services/auth.service'

const parseToken = encoded => {
  const payload = encoded.split('.')[1]
  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
  return JSON.parse(atob(base64))
}

const STATE = {
  USER: 'user',
  TOKEN: 'token',
  PENDING: 'pending'
}

const MUTATIONS = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS'
}

const ACTIONS = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  REGISTER: 'register'
}

const GETTERS = {
  IS_LOGGED_IN: 'isLoggedIn'
}

const authModule = {
  namespaced: true,

  state: {
    [STATE.USER]: authService.getUser(),
    [STATE.TOKEN]: authService.getToken(),
    [STATE.PENDING]: false
  },

  mutations: {
    [MUTATIONS.LOGIN](state) {
      state.pending = true
    },

    [MUTATIONS.LOGIN_SUCCESS](state, payload) {
      state.pending = false
      state.user = payload.user
      state.token = payload.token
    },

    [MUTATIONS.LOGOUT](state) {
      state.user = null
      state.token = null
    },

    [MUTATIONS.REGISTER](state) {
      state.pending = true
    },

    [MUTATIONS.REGISTER_SUCCESS](state, payload) {
      state.pending = false
      state.user = payload.user
      state.token = payload.token
    }
  },

  actions: {
    [ACTIONS.LOGIN]({ commit }, credentials) {
      commit('LOGIN')
      return new Promise((resolve, reject) => {
        authService
          .login(credentials)
          .then(data => {
            if (data.success) {
              commit('LOGIN_SUCCESS', data)
            }
            resolve(data)
          })
          .catch(reject)
      })
    },

    [ACTIONS.LOGOUT]({ commit }) {
      authService.removeAll()
      commit('LOGOUT')
    },

    [ACTIONS.REGISTER]({ commit }, credentials) {
      commit('REGISTER')
      return new Promise((resolve, reject) => {
        authService
          .register(credentials)
          .then(data => {
            if (data.success) {
              commit('REGISTER_SUCCESS', data)
            }
            resolve(data)
          })
          .catch(reject)
      })
    }
  },

  getters: {
    [GETTERS.IS_LOGGED_IN](state) {
      if (!state.user) return false

      const token = parseToken(state.token)
      const expiration = token.exp
      const currentTime = Date.now() / 1000
      return expiration > currentTime
    }
  }
}

export { STATE, MUTATIONS, ACTIONS, GETTERS, authModule }
