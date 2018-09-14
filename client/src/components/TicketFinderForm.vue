<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Find Games Near Me</span>
    </div>
    <div class="text item">
      <el-form ref="searchParams"
               :model="searchParams"
               @submit.native.prevent
               :rules="searchParamRules"
               label-width="120px"
               size="medium">
        <el-form-item prop="range" label="Radius (miles)">
          <el-select v-model="searchParams.range">
            <el-option v-for="(option, index) in radiusOptions"
                       :key="index"
                       :value="option.val"
                       :label="option.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="beginDate" label="From Date">
          <el-date-picker
            v-model="searchParams.beginDate"
            type="date"
            placeholder="Begin Date">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="endDate" label="To Date">
          <el-date-picker
            v-model="searchParams.endDate"
            type="date"
            placeholder="End Date">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="minPrice" label="Min Ticket Price">
          <el-col :span="8">
            <el-input v-model="searchParams.minPrice"
                      placeholder="Price"
                      type="number"
                      min="0">
            </el-input>
          </el-col>
        </el-form-item>
        <el-form-item prop="maxPrice" label="Max Ticket Price">
          <el-col :span="8">
            <el-input v-model="searchParams.maxPrice"
                      placeholder="Any Price"
                      type="number"
                      min="0"></el-input>
          </el-col>
        </el-form-item>
        <el-button @click="findGames"
                   :loading="isSearching"
                   :disabled="isSearching || !isValid"
                   icon="el-icon-search"
                   type="primary">
          Find Games
        </el-button>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      radiusOptions: [
        { label: '50', val: 50 },
        { label: '100', val: 100 },
        { label: '200', val: 200 },
        { label: '300', val: 300 },
        { label: '400', val: 400 },
        { label: '500+', val: undefined }
      ],

      searchParams: {
        range: 300,
        beginDate: new Date(),
        endDate: new Date(),
        minPrice: 0,
        maxPrice: null
      },

      searchParamRules: {
        beginDate: [
          {
            type: 'date',
            required: true,
            message: 'Please select a date',
            trigger: 'change'
          }
        ],
        endDate: [
          {
            type: 'date',
            required: true,
            message: 'Please select a date',
            trigger: 'change'
          }
        ]
      },

      isSearching: false
    }
  },

  methods: {
    ...mapActions(['searchTickets']),

    ...mapMutations(['SET_EVENTS', 'SET_SEARCH_PARAMS', 'SET_PAGING']),

    findGames() {
      this.isSearching = true
      this.SET_SEARCH_PARAMS(this.searchParams)
      this.SET_PAGING({ page: 1, sortBy: 'datetime_local.asc' })

      this.searchTickets().then(() => {
        this.isSearching = false
        const messageType = this.totalEventCount > 0 ? 'success' : 'warning'
        this.$message({
          type: messageType,
          message: `Found ${this.totalEventCount} Games`,
          center: true
        })
      })
    }
  },

  computed: {
    ...mapState(['lat', 'lon']),

    ...mapGetters(['totalEventCount']),

    // TODO: Explore Vue Validators
    isValid() {
      return !!(this.searchParams.beginDate && this.searchParams.endDate)
    }
  }
}
</script>
