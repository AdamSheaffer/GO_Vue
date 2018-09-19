<template>
  <el-main>
    <el-row
      :gutter="25"
      type="flex"
      justify="space-between">
      <el-col :xs="24" :md="8">
        <el-card class="card">
          <div class="header" slot="header">
            <img
              class="header__img"
              src="../assets/images/007-tactics.png"
              alt="track progress">
            <router-link :to="{path: '/trips'}" class="link">
              <h1 class="header__text">TRACK PROGRESS</h1>
            </router-link>
          </div>
          <div class="card__content">
            Track your progress as you visit all 30 Major League ballparks. You'll unlock badges as you post photos and document each
            trip you make around the country. Ground Out will keep a scrapbook of your journey for you to revist any
            time.
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-card class="card">
          <div class="header" slot="header">
            <img
              class="header__img"
              src="../assets/images/017-field.png"
              alt="explore parks">
            <router-link :to="{path: '/teams'}" class="link">
              <h1 class="header__text">EXPLORE PARKS</h1>
            </router-link>
          </div>
          <div class="card__content">
            Not sure which ballpark to check out next? See what other users have posted about each one before you plan your next trip.
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-card class="card">
          <div class="header" slot="header">
            <img
              class="header__img"
              src="../assets/images/021-ticket.png"
              alt="find tickets">
            <router-link :to="{path: '/tickets'}" class="link">
              <h3 class="header__text">FIND TICKETS</h3>
            </router-link>
          </div>
          <div class="card__content">
            The Ground Out Ticket Finder scours Seatgeek to find the tickets you want. Search by price, distance, and date.
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<style lang="scss" scoped>
.header__img {
  display: block;
  height: 125px;
  margin: auto;
  padding: 5px;
}

.card__content {
  line-height: 30px;
  opacity: 0.8;
  min-height: 200px;
}

.header__circle {
  width: 145px;
  height: 145px;
  border-radius: 100px;
  width: 190px;
  margin: auto;
}

.header__text {
  color: #1e9fe0;
  text-align: center;
  font-weight: 500;
  font-family: 'Josefin Sans', sans-serif;
  cursor: pointer;
}

.link {
  text-decoration: none;
}
</style>
