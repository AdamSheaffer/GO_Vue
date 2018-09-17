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
import tripsService from '../services/trips.service'
import parkService from '../services/park.service'
import Trip from '../components/Trip.vue'
import { createNamespacedHelpers } from 'vuex'
import { STATE } from '../store/modules/auth.module'

const { mapState } = createNamespacedHelpers('authModule')

export default {
  components: {
    'user-trip': Trip
  },

  data() {
    return {
      trips: [],
      parks: [],
      badges: []
    }
  },

  mounted() {
    tripsService.getUserTrips().then(data => {
      this.trips = data.trips
    })

    tripsService.getBadges(this.user._id).then(data => {
      this.badges = data.badges
    })

    parkService.getAllParks().then(data => {
      this.parks = data.parks
    })
  },

  computed: {
    ...mapState({
      user: STATE.USER
    })
  }
}
</script>
