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
    <el-row class="gallery" type="flex" justify="start">
      <div
        v-for="(photo, index) in trip.photos"
        :key="index"
        class="gallery__container">
        <el-card :body-style="{padding: '4px'}">
          <img :src="photoDir + photo" class="gallery__img">
        </el-card>
      </div>
    </el-row>
  </el-card>
</template>

<script>
const photoDir = 'https://groundout.blob.core.windows.net/groundout/'

export default {
  props: ['trip'],

  data() {
    return {
      photoDir: photoDir
    }
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
          this.$emit('remove', this.trip._id)
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
.gallery {
  flex-wrap: wrap;
}

.gallery__img {
  display: block;
  height: 100px;
}

.gallery__container {
  padding: 10px;
  cursor: pointer;
}
</style>
