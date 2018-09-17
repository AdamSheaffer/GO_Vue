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

  removeAll() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
}

export default authService
