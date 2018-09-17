<template>
  <el-main>
    <el-row>
      <el-col
        :xs="24"
        :md="12"
        :lg="14">
        <user-trip
          v-for="trip in trips"
          :trip="trip"
          :key="trip._id">
        </user-trip>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
// import parkService from '../services/park.service'
import Trip from '../components/Trip.vue'
import { STATE, ACTIONS } from '../store/modules/userTrips.module'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('userTripsModule')

export default {
  components: {
    'user-trip': Trip
  },

  mounted() {
    this.getUserTrips()
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

    // tripsService.getBadges(this.user._id).then(data => {
    //   this.badges = data.badges
    // })

    // parkService.getAllParks().then(data => {
    //   this.parks = data.parks
    // })
  },

  methods: {
    ...mapActions({
      getUserTrips: ACTIONS.GET_TRIPS
    })
  },

  computed: {
    ...mapState({
      trips: STATE.TRIPS
    })
  }
}
</script>
