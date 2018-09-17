<template>
  <el-card class="trip">
    <div slot="header" class="clearfix">
      <span class="trip__header">
        {{trip.park.name}}
      </span>
      <span class="trip__header trip__header--sm">
        {{trip.tripDate | datetime('MMMM D, YYYY')}}
      </span>
      <div class="trip__header--right">
        <el-tooltip
          class="item"
          effect="dark"
          content="Edit Trip"
          placement="left">
          <i class="el-icon-edit-outline option option--info"></i>
        </el-tooltip>
        <el-tooltip
          class="item"
          effect="dark"
          content="Delete Trip"
          placement="right">
          <i @click="deleteTrip" class="el-icon-delete option option--danger"></i>
        </el-tooltip>
      </div>
    </div>
    <div>
      <p>{{trip.comments}}</p>
      <el-rate
        v-model="trip.rating"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value} / 5">
      </el-rate>
    </div>
    <!-- PHOTOS -->
  </el-card>
</template>

<script>
export default {
  props: ['trip'],

  data() {
    return {}
  },

  methods: {
    deleteTrip() {
      this.$confirm(
        `This will delete your trip to ${
          this.trip.park.name
        }. Are you sure you want to continue?`,
        'Delete Trip',
        {
          type: 'warning',
          center: true
        }
      )
        .then(() => {
          this.emit('delete')
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.trip {
  margin-bottom: 30px;
}

.trip__header {
  font-size: 20px;
  margin-right: 5px;
}

.trip__header--sm {
  font-size: 12px;
  opacity: 0.8;
}

.trip__header--right {
  float: right;

  .option {
    margin-left: 15px;
    font-size: 20px;
    cursor: pointer;
  }

  .option--info {
    color: #1e9fe0;
  }

  .option--danger {
    color: #fd423f;
  }
}
</style>
