<template>
  <el-main>
    <el-row :gutter="25">
      <el-col
        :xs="24"
        :md="12"
        :lg="14">
        <user-trip
          v-for="trip in trips"
          :trip="trip"
          :key="trip._id"/>
      </el-col>
      <el-col
        :xs="24"
        :md="12"
        :lg="10">
        <trip-map :trips="trips"/>
        <trip-progress :trips="trips" :parks="parks"/>
        <user-badges :badges="badges"/>
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

const { mapState, mapActions } = createNamespacedHelpers('userTripsModule')

export default {
  components: {
    'user-trip': Trip,
    'trip-map': TripMap,
    'trip-progress': TripsProgress,
    'user-badges': Badges
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
      getParks: ACTIONS.GET_PARKS
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
            message: 'Woops! something went wrong',
            type: 'error',
            center: true
          })
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
