import axios from 'axios'

const authService = {
  login(user) {
    return axios.post('account/login', user).then(({ data }) => data)
  },

  register(user) {
    return axios.post('account/register', user).then(({ data }) => data)
  }
}

export default authService
