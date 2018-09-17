<template>
  <div>
    <div class="details-header">
      <img
        v-if="teamName" :src="require(`../assets/images/teams/${teamLowerNoSpaces}.png`)"
        alt="team-logo"
        class="details-header__img">
      <h1 class="details-header__team">{{teamName}}</h1>
    </div>
    <el-row class="details-body" :gutter="40">
      <el-col :lg="12" :xs="24">
        <ticket-list
          :events="events"
          :total-event-count="eventsMetaData.total"
          :page="ticketParams.page"
          :per-page="eventsMetaData.per_page"
          :sort-by="ticketParams.sortBy"
          @next="nextPage"
          @previous="previousPage"
          @sort="sort"
          class="details-body__tickets">
        </ticket-list>
      </el-col>
      <el-col v-if="park.name" :lg="12" :xs="24">
        <div>
          <img
            v-if="divisionLowerNoSpaces"
            :src="require(`../assets/images/${divisionLowerNoSpaces}.png`)"
            class="details-body__division-img"
            alt="division">
        </div>
        <div class="details-body__label">
          Park Name:
        </div>
        <div class="details-body__attr">
          {{park.name}}
        </div>
        <div class="details-body__label">
          Address:
        </div>
        <div class="details-body__attr">
          {{park.location.address}}
        </div>
        <div class="details-body__label">
          Upcoming Home Games:
        </div>
        <div class="details-body__attr">
          {{eventsMetaData.total}}
        </div>
        <div class="details-body__label">
          Avg Trip Rating:
        </div>
        <div class="details-body__attr">
          <span v-if="park.avgRating">
            <el-rate
              v-model="roundedRating"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </span>
          <em v-else>No one has rated {{park.name}} yet</em>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import parkService from '../services/park.service'
import ticketService from '../services/ticketFinder.service'
import TicketList from './TicketList.vue'

export default {
  components: {
    'ticket-list': TicketList
  },

  data() {
    return {
      teamName: null,
      events: [],
      eventsMetaData: {},
      ticketParams: { page: 1, sortBy: 'datetime_local.asc' },
      park: {},
      divisionLowerNoSpaces: null
    }
  },

  mounted() {
    this.getTeamDetails(this.$route.params.team)
  },

  methods: {
    getTeamDetails(teamName) {
      this.teamName = teamName
      this.teamLowerNoSpaces = this.teamName.toLowerCase().replace(' ', '')
      parkService.getParkByTeam(teamName).then(data => {
        this.park = data.park
        this.divisionLowerNoSpaces = this.park.division
          .toLowerCase()
          .replace(' ', '')
        this.getTickets()
      })
    },

    getTickets() {
      const { page, sortBy } = this.ticketParams
      ticketService
        .searchTicketsByPark(this.park.name, page, sortBy)
        .then(({ meta, events }) => {
          this.eventsMetaData = meta
          this.events = events
        })
    },

    nextPage() {
      this.ticketParams.page += 1
      this.getTickets()
    },

    previousPage() {
      this.ticketParams.page -= 1
      this.getTickets()
    },

    sort(newSortBy) {
      this.ticketParams.sortBy = newSortBy
      this.getTickets()
    }
  },

  computed: {
    roundedRating() {
      if (this.park.avgRating) {
        return Math.round(this.park.avgRating * 10) / 10
      }
    }
  },

  watch: {
    '$route.params.team'(newVal) {
      this.getTeamDetails(newVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.details-header__img {
  display: block;
  margin: auto;
}

.details-header__team {
  text-align: center;
  font-size: 35px;
  color: #002638;
}

.details-body__division-img {
  height: 250px;
}

.details-body__label {
  margin-top: 15px;
  font-weight: 600;
  font-size: 20px;
}

.details-body__attr {
  margin-top: 5px;
}
</style>
