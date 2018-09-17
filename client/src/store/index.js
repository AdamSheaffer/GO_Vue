import Vue from 'vue'
import Vuex from 'vuex'
import { authModule } from './modules/auth.module'
import { ticketFinderModule } from './modules/ticketFinder.module'
import { userTripsModule } from './modules/userTrips.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ticketFinderModule,
    authModule,
    userTripsModule
  }
})
