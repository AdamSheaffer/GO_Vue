import axios from 'axios'

const authService = {
  login(user) {
    return axios.post('account/login', user).then(({ data }) => data)
  },

  register(user) {
    return axios.post('account/register', user).then(({ data }) => data)
  },

  getUser() {
    const userStr = localStorage.getItem('user')
    if (!userStr) return

    return JSON.parse(userStr)
  },

  getToken() {
    return localStorage.getItem('token')
  },

  parseToken(encoded) {
    const payload = encoded.split('.')[1]
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  },

  isLoggedIn() {
    const encoded = this.getToken()

    if (!encoded) return false

    const token = this.parseToken(encoded)
    const expiration = token.exp
    const currentTime = Date.now() / 1000
    return expiration > currentTime
  },

  removeAll() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
}

export default authService
