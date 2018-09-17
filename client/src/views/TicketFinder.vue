<template>
  <el-main>
    <el-row :gutter="25">
      <el-col :xs="24" :md="12" :lg="10">
        <ticket-finder-form class="ticket-container"/>
        <ticket-list
          :events="events"
          :total-event-count="totalEventCount"
          :page="paging.page"
          :per-page="10"
          :sort-by="paging.sortBy"
          @previous="onPageDown"
          @next="onPageUp"
          @sort="onSort"
          class="ticket-container"/>
      </el-col>
      <el-col :xs="24" :md="12" :lg="14">
        <ticket-map class="ticket-container"/>
        <park-list
          :parks="locationVenues"
          class="ticket-container"/>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import TicketFinderForm from '../components/TicketFinderForm.vue'
import TicketMap from '../components/TicketMap.vue'
import TicketList from '../components/TicketList.vue'
import ParkList from '../components/ParksList.vue'

import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ticket-finder',
  components: {
    'ticket-finder-form': TicketFinderForm,
    'ticket-map': TicketMap,
    'ticket-list': TicketList,
    'park-list': ParkList
  },

  created() {
    let getPosition =
      window &&
      window.navigator &&
      window.navigator.geolocation &&
      window.navigator.geolocation.getCurrentPosition

    if (getPosition) {
      getPosition = getPosition.bind(window.navigator.geolocation)
      getPosition(({ coords }) => {
        this.SET_LOCATION({ lat: coords.latitude, lon: coords.longitude })
      })
    }
  },

  methods: {
    ...mapMutations('ticketFinderModule', ['SET_LOCATION', 'SET_PAGING']),

    ...mapActions('ticketFinderModule', ['searchTickets']),

    onPageDown() {
      const previousPage = this.paging.page - 1
      this.SET_PAGING({ page: previousPage })
      this.searchTickets()
    },

    onPageUp() {
      const nextPage = this.paging.page + 1
      this.SET_PAGING({ page: nextPage })
      this.searchTickets()
    },

    onSort(sortBy) {
      this.SET_PAGING({ sortBy })
      this.searchTickets()
    }
  },

  computed: {
    ...mapState('ticketFinderModule', ['events', 'paging']),
    ...mapGetters('ticketFinderModule', ['totalEventCount', 'locationVenues'])
  }
}
</script>

<style lang="scss" scoped>
.ticket-container {
  margin-bottom: 20px;
}
</style>
