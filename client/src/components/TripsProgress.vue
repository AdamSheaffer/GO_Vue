<template>
  <div class="progress">
    <span class="progress__heading">Progress</span>
    <el-row
      type="flex"
      justify="space-between"
      class="row-bg">
      <div class="el-col">
        <el-progress
          type="circle"
          :percentage="totalProgress"
          color="#00d357">
        </el-progress>
        <div class="progress__label">Total Progress</div>
      </div>
      <div class="el-col">
        <el-progress
          type="circle"
          :percentage="alProgress"
          color="#1e9fe0">
        </el-progress>
        <div class="progress__label">American League</div>
      </div>
      <div class="el-col">
        <el-progress
          type="circle"
          :percentage="nlProgress"
          color="#ff2f3e">
        </el-progress>
        <div class="progress__label">National League</div>
      </div>
    </el-row>
  </div>
</template>

<script>
import uniqBy from 'lodash/uniqBy'

export default {
  props: ['trips', 'parks'],
  computed: {
    totalParks() {
      return this.parks.length
    },

    alParks() {
      return this.parks.filter(p => p.division.includes('American'))
    },

    nlParks() {
      return this.parks.filter(p => p.division.includes('National'))
    },

    uniqueTrips() {
      return uniqBy(this.trips, trip => trip.park.name)
    },

    totalProgress() {
      if (!this.totalParks) return 0

      const parksVisited = this.uniqueTrips.length
      return Math.floor(parksVisited / this.totalParks * 100)
    },

    alProgress() {
      if (!this.totalParks) return 0

      const alParksVisited = this.uniqueTrips.filter(t =>
        t.park.division.includes('American')
      )

      return Math.floor(alParksVisited.length / this.alParks.length * 100)
    },

    nlProgress() {
      if (!this.totalParks) return 0

      const nlParksVisited = this.uniqueTrips.filter(t =>
        t.park.division.includes('National')
      )

      return Math.floor(nlParksVisited.length / this.nlParks.length * 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.progress {
  margin-top: 25px;
}

.progress__heading {
  font-size: 25px;
  margin-bottom: 30px;
  display: block;
}

.progress__label {
  text-align: center;
  opacity: 0.8;
}
</style>
