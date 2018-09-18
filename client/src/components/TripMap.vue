<template>
  <el-card :body-style="{ padding: 0 }">
    <div id="map"></div>
  </el-card>
</template>

<script>
import * as L from 'leaflet/dist/leaflet'
import orderBy from 'lodash/orderBy'

const defaultLat = 39.5
const defaultLon = -98.35
const defaultZoom = 4
const mapboxUrl = process.env.VUE_APP_MAP_URL
const mapboxAttribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>' +
  'contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
  'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'

export default {
  props: ['trips'],

  mounted() {
    this.map = L.map('map').setView([defaultLat, defaultLon], defaultZoom)

    this.map.scrollWheelZoom.disable()

    L.tileLayer(mapboxUrl, {
      attribution: mapboxAttribution,
      maxZoom: 18,
      id: 'mapbox.streets'
    }).addTo(this.map)
  },

  methods: {
    clearLines() {
      if (!this.map || !this.polyline) return

      this.map.removeLayer(this.polyline)
    },

    drawLines() {
      if (!this.map) return

      const latlngs = this.tripsCoords.map(coords => {
        return L.latLng(coords.lat, coords.lon)
      })

      this.polyline = L.polyline(latlngs, { color: '#ea5249' })
      this.polyline.addTo(this.map)
    },

    setBounds() {
      if (!this.map || !this.tripsCoords || !this.tripsCoords.length) return
      this.map.fitBounds(this.polyline.getBounds().pad(0.25))
    }
  },

  computed: {
    tripsCoords() {
      const ordered = orderBy(this.trips)
      return ordered.map(trip => {
        const [lon, lat] = trip.park.location.coordinates
        return { lat, lon }
      })
    }
  },

  watch: {
    trips(newTrips) {
      this.clearLines()
      this.drawLines()
      this.setBounds()
    }
  }
}
</script>

<style lang="scss" scoped>
#map {
  height: 500px;
  width: 100%;
}
</style>
