<template>
  <div class="badges">
    <span class="badges__heading">Badges</span>
    <el-row
      type="flex"
      justify="start"
      class="row-bg">
      <em v-if="!badge || !badges.length">
        You haven't earned any badges yet!
      </em>
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
        v-for="badge in badges"
        :key="badge._id"
        class="badge">
        <el-popover
          placement="top"
          :title="badge.name"
          trigger="hover"
          :content="badge.description">
          <img
            slot="reference"
            :src="require(`../assets/images/${badge.image}`)"
            class="badge__img"
            :alt="badge.description">
        </el-popover>
        <div>
          <span class="badge__label">{{badge.name}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['badges']
}
</script>

<style lang="scss" scoped>
.badges__heading {
  font-size: 25px;
  margin: 60px 0;
  display: block;
}

.badge__img {
  height: 125px;
  padding: 5px;
  display: block;
  margin: auto;
  transition: all 0.1s linear;
}

.badge__img:hover {
  transform: scale(1.1);
}

.badge__label {
  text-align: center;
  display: block;
  font-weight: 500;
  color: #1e9fe0;
}
</style>
