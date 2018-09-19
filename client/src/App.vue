<template>
  <div id="app">
    <app-header></app-header>
    <el-container>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
import Header from './components/TheHeader.vue'
import axios from 'axios'
import { createNamespacedHelpers } from 'vuex'
import { ACTIONS } from './store/modules/auth.module'
const { mapActions } = createNamespacedHelpers('authModule')

export default {
  name: 'app',
  components: {
    'app-header': Header
  },

  // handle logout on unauthorized calls
  created() {
    axios.interceptors.response.use(undefined, err => {
      return new Promise((resolve, reject) => {
        if (err.response.status === 401) {
          this.logout()
          this.$router.push('/login')
        }
        throw err
      })
    })
  },

  methods: {
    ...mapActions({
      logout: ACTIONS.LOGOUT
    })
  }
}
</script>

<style lang="scss">
html {
  font-family: 'Metropolis', 'Avenir Next', 'Helvetica Neue', Arial, sans-serif;
}

body {
  margin: 0;
  background-attachment: #fafafa;
}
</style>
