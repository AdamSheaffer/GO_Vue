<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Parks</span>
    </div>
    <div class="text item">
      <el-alert
        :closable="false"
        v-if="!parks || !parks.length"
        title="No Parks Listed"
        type="info"
        center
        show-icon>
      </el-alert>
      <div v-else>
        <el-row>
          <el-col
            v-for="park in parks"
            :key="park.id"
            :xl="4"
            :lg="6"
            :md="8"
            :sm="12"
            :xs="24"
            class="park">
            <img
              :src="park.image"
              :alt="park.parkName"
              class="park__img">
            <div class="park__details">
              <strong class="park__name">{{park.parkName}}</strong>
              <span class="park__name">{{park.teamName}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: ['parks']
}
</script>

<style lang="scss" scoped>
.park__img {
  display: block;
  border-radius: 100px;
  height: 100px;
  width: 100px;
  margin: 0 auto 10px;
  cursor: pointer;
}

.park__name {
  text-align: center;
  font-size: 12px;
  display: block;
  width: 100px;
  line-height: 15px;
  margin: auto;
  cursor: pointer;
}

.park__details {
  min-height: 80px;
}
</style>
