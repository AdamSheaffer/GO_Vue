import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import TicketFinder from './views/TicketFinder.vue'
import Teams from './views/Teams.vue'
import TeamsWelcome from './components/TeamsWelcome.vue'
import TeamDetails from './components/TeamDetails.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: TicketFinder
    },
    {
      path: '/teams',
      component: Teams,
      children: [
        {
          name: 'teams',
          path: '/',
          component: TeamsWelcome
        },
        {
          path: ':team',
          component: TeamDetails
        }
      ]
    },
    // Lazy Loaded Routes
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/trips',
      name: 'trips',
      component: () => import('./views/Scrapbook.vue')
    },
    {
      path: '/trips/new',
      name: 'new',
      component: () => import('./views/TripLogger.vue')
    }
  ]
})
