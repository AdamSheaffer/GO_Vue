<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Ticket Map</span>
    </div>
    <div class="text item">
      <div id="map"></div>
    </div>
  </el-card>
</template>

<script>
import * as L from 'leaflet/dist/leaflet'
import { mapState, mapGetters } from 'vuex'
import { STATE, GETTERS } from '../store/modules/ticketFinder.module'

const defaultLat = 39.5
const defaultLon = -98.35
const defaultZoom = 4
const mapboxUrl = process.env.VUE_APP_MAP_URL
const mapboxAttribution =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>' +
  'contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
  'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'

const createInfoWindowContent = eventsByLocation => {
  const events = eventsByLocation.events
  const homeTeam = events[0].performers.homeTeam
  const dates = buildDateString(events)

  return `
      <h3 id="firstHeading" class="firstHeading">${events[0].venue.name}</h3>
      <div>
        <b>Team:</b> ${homeTeam.name}
      </div>
      <div>
        <b> Dates: </b> ${dates}
      </div>
      <hr />
      <br />
      <img src="${homeTeam.image}" />`
}

const buildDateString = events => {
  const months = 'Jan Feb Mar Apr May Jun Jul Aug Sept Oct Nov Dec'.split(' ')
  return events.reduce((dateStr, event, i) => {
    if (i > 0) {
      dateStr += ', '
    }
    const date = new Date(event.datetime_local)
    const month = months[date.getMonth()]
    const day = date.getDate()

    return (dateStr += `${month} ${day}`)
  }, '')
}

export default {
  data() {
    return {
      map: {},
      markers: []
    }
  },

  mounted() {
    this.map = L.map('map').setView([defaultLat, defaultLon], defaultZoom)

    this.map.scrollWheelZoom.disable()

    L.tileLayer(mapboxUrl, {
      attribution: mapboxAttribution,
      maxZoom: 18,
      id: 'mapbox.streets'
    }).addTo(this.map)

    if (this.events && this.events.length) {
      this.preloadLocationImages(this.eventsByLocation)
      this.setMarkers(this.eventsByLocation)
      this.setBounds(this.eventsByLocation)
    }
  },

  methods: {
    setMarkers(eventsByLocation) {
      this.clearMarkers()
      this.markers = eventsByLocation.map(eventLocation => {
        const { lat, lon } = eventLocation.location
        const title = eventLocation.events[0].performers.homeTeam.name
        const iconUrl = require('../assets/images/009-location-sm.png')
        const icon = L.icon({ iconUrl })
        const marker = L.marker([lat, lon], { title, icon })
          .addTo(this.map)
          .bindPopup(createInfoWindowContent(eventLocation))

        return marker
      })
    },

    clearMarkers() {
      this.markers.forEach(m => this.map.removeLayer(m))
    },

    setBounds(eventsByLocation) {
      if (!this.map || !eventsByLocation || !eventsByLocation.length) return

      const featureGroup = L.featureGroup(this.markers)
      this.map.fitBounds(featureGroup.getBounds().pad(0.25))
    },

    preloadLocationImages(eventsByLocation) {
      if (!eventsByLocation || !eventsByLocation.length) return

      eventsByLocation.forEach(location => {
        const events = location.events
        const url = events[0].performers.homeTeam.image
        const image = new Image()
        image.src = url
      })
    }
  },

  computed: {
    ...mapState('ticketFinderModule', [STATE.LAT, STATE.LON, STATE.EVENTS]),
    ...mapGetters('ticketFinderModule', [GETTERS.EVENTS_BY_LOCATION])
  },

  watch: {
    [STATE.LAT]() {
      this.map.panTo(L.latLng(this.lat, this.lon))
    },

    [STATE.EVENTS](events) {
      this.preloadLocationImages(this.eventsByLocation)
      this.setMarkers(this.eventsByLocation)
      this.setBounds(this.eventsByLocation)
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
