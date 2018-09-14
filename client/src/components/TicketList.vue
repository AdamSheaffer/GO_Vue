<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>&nbsp;</span>
      <el-row
        type="flex"
        class="row-bg"
        justify="space-between">
        <el-col :span="12">
          <span>Tickets</span>
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="end">
            <div v-if="totalEventCount">
              <a @click="sort('datetime_local')">
                <i class="el-icon-caret-top" v-if="isSortedByDateAsc"></i>
                <i class="el-icon-caret-bottom" v-else-if="isSortedByDateDesc"></i>
                Date
              </a>
              <span> | </span>
              <a @click="sort('lowest_price')">
                Price
                <i class="el-icon-caret-top" v-if="isSortedByPriceAsc"></i>
                <i class="el-icon-caret-bottom" v-else-if="isSortedByPriceDesc"></i>
              </a>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="text item">
      <el-alert
        :closable="false"
        v-if="totalEventCount < 1"
        title="No Tickets Found"
        type="info"
        center
        show-icon>
      </el-alert>
      <div v-else>
        <el-table
          :stripe="true"
          :data="events"
          style="width: 100%">
          <el-table-column type="expand" class="event-details">
            <template slot-scope="props">
              <el-row>
                <el-col :span="8" class="cell">
                  <a :href="props.row.url" target="_blank">
                    <img
                      src="../assets/images/021-ticket.png"
                      class="event-details__img"
                      alt="Buy Tickets" />
                    <span class="event-details__link">Buy Tickets</span>
                  </a>
                </el-col>
                <el-col :span="16" class="cell">
                  <p>
                    <strong>Park:</strong>
                    &nbsp;{{ props.row.venue.name }}
                  </p>
                  <p>
                    <strong>Prices:</strong>
                    &nbsp;${{ props.row.stats.lowest_price }}.00 to ${{ props.row.stats.highest_price }}.00
                  </p>
                  <p>
                    <strong>Location:</strong>
                    &nbsp;{{ props.row.venue.display_location }}
                  </p>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            label="Date"
            :formatter="dateFormatter"
            prop="datetime_local">
          </el-table-column>
          <el-table-column label="Teams" prop="short_title">
          </el-table-column>
        </el-table>
        <el-row
          class="bg-row paging"
          type="flex"
          justify="space-between">
          <el-col class="paging__pager">
            <div v-if="!isFirstPage" @click="previousPage">
              <i class="el-icon-arrow-left"></i>
              <span>Previous</span>
            </div>
          </el-col>
          <el-col class="paging__display">{{pageDisplay}}</el-col>
          <el-col class="paging__pager paging__pager--right">
            <div v-if="!isLastPage" @click="nextPage">
              <span>Next</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: ['events', 'totalEventCount', 'perPage', 'page', 'sortBy'],

  methods: {
    dateFormatter(row, col, value, index) {
      return this.$options.filters.datetime(value, 'll')
    },

    previousPage() {
      if (this.isFirstPage) return

      this.$emit('previous')
    },

    nextPage() {
      if (this.isLastPage) return

      this.$emit('next')
    },

    sort(value) {
      const hasSameSortBy = this.sortBy.includes(value)

      if (hasSameSortBy) {
        const newValue = this.toggleDirection(this.sortBy)
        this.$emit('sort', newValue)
      } else {
        const newValue = `${value}.asc`
        this.$emit('sort', newValue)
      }
    },

    toggleDirection(sortByStr) {
      if (sortByStr.includes('asc')) {
        return sortByStr.replace('asc', 'desc')
      } else {
        return sortByStr.replace('desc', 'asc')
      }
    }
  },

  computed: {
    isFirstPage() {
      return this.page === 1
    },

    isLastPage() {
      if (!this.totalEventCount) return true

      return this.page * this.perPage >= this.totalEventCount
    },

    pageDisplay() {
      const endingRecord = this.isLastPage
        ? this.totalEventCount
        : this.page * this.perPage
      return `${this.page * this.perPage - 9} - ${endingRecord} of ${
        this.totalEventCount
      }`
    },

    isSortedBy() {
      return value => this.sortBy === value
    },

    isSortedByDateAsc() {
      return this.isSortedBy('datetime_local.asc')
    },

    isSortedByDateDesc() {
      return this.isSortedBy('datetime_local.desc')
    },

    isSortedByPriceAsc() {
      return this.isSortedBy('lowest_price.asc')
    },

    isSortedByPriceDesc() {
      return this.isSortedBy('lowest_price.desc')
    }
  }
}
</script>

<style lang="scss" scoped>
.event-details__img {
  height: 100px;
  display: block;
}

.event-details__link {
  text-decoration: none;
}

.paging {
  margin-top: 20px;
}

.paging__display {
  text-align: center;
}

.paging__pager {
  cursor: pointer;
}

.paging__pager--right {
  text-align: right;
}
</style>
