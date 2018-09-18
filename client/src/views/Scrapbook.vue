<template>
  <el-main class="main">
    <el-row :gutter="25">
      <el-col
        :xs="24"
        :md="12"
        :lg="14">
        <div v-if="trips.length > 0">
          <user-trip
            v-for="trip in trips"
            :trip="trip"
            :key="trip._id"
            @remove="removeTrip"></user-trip>
        </div>
        <div v-else>
          <el-card class="welcome-card">
            <div slot="header" class="welcome-header">
              <div class="welcome-header__img-container">
                <img
                  class="welcome-header__img"
                  src="../assets/images/029-cap.png"
                  alt="Cap">
              </div>
              <h2 class="welcome-header__text">WELCOME!</h2>
            </div>
            <div class="text">
              <p>You don't have any trips logged yet. When you do log a trip to a ballpark it will show up here. You'll be able to track your progress and see how close you are to seeing them all. Badges you earn along the way will show up here as well.</p>
              <br>
              <p>Log your first trip to get started!</p>
            </div>
            <div class="actions">
              <router-link :to="{path: 'trips/new'}">
                <el-button type="primary">Log New Trip</el-button>
              </router-link>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col
        :xs="24"
        :md="12"
        :lg="10">
        <trip-map :trips="trips"/>
        <trip-progress :trips="trips" :parks="parks"/>
        <user-badges :badges="badges"/>
        <park-list :parks="parks" :trips="trips"/>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
// import parkService from '../services/park.service'
import Trip from '../components/Trip.vue'
import TripMap from '../components/TripMap.vue'
import TripsProgress from '../components/TripsProgress.vue'
import Badges from '../components/Badges.vue'
import { STATE, ACTIONS } from '../store/modules/userTrips.module'
import { createNamespacedHelpers } from 'vuex'
import ScrapbookParks from '../components/ScrapbookParks.vue'

const { mapState, mapActions } = createNamespacedHelpers('userTripsModule')

export default {
  components: {
    'user-trip': Trip,
    'trip-map': TripMap,
    'trip-progress': TripsProgress,
    'user-badges': Badges,
    'park-list': ScrapbookParks
  },

  mounted() {
    this.handleErrors(this.getUserTrips())
    this.handleErrors(this.getBadges())
    this.handleErrors(this.getParks())
  },

  methods: {
    ...mapActions({
      getUserTrips: ACTIONS.GET_TRIPS,
      getBadges: ACTIONS.GET_BADGES,
      getParks: ACTIONS.GET_PARKS,
      deleteTrip: ACTIONS.DELETE_TRIP
    }),

    handleErrors(promise) {
      return promise
        .then(data => {
          if (!data.success) {
            this.$message({
              message: data.message,
              type: 'error',
              center: true
            })
          }
        })
        .catch(() => {
          this.$message({
            message: 'Woops! Something went wrong',
            type: 'error',
            center: true
          })
        })
    },

    removeTrip(tripId) {
      this.deleteTrip(tripId).then(data => {
        if (data.success) {
          this.$message({
            message: data.message,
            center: true,
            type: 'success'
          })
        } else {
          this.$message({
            message: 'Woops! Something went wrong',
            center: true,
            type: 'success'
          })
        }
      })
    }
  },

  computed: {
    ...mapState({
      trips: STATE.TRIPS,
      badges: STATE.BADGES,
      parks: STATE.PARKS
    })
  }
}
</script>

<style lang="scss" scoped>
.main {
  background: #fafafa;
}

.welcome-header__img-container {
  padding: 20px;
  border-radius: 190px;
  width: 150px;
  margin: auto;
  background-color: #002638;
}

.welcome-header__img {
  display: block;
  height: 150px;
  margin: auto;
}

.welcome-header__text {
  text-align: center;
  color: #002638;
}

.text {
  line-height: 30px;
}
</style>
