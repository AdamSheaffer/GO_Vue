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
            <h1 class="header__text">TRACK PROGRESS</h1>
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
            <h1 class="header__text">EXPLORE PARKS</h1>
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
            <h3 class="header__text">FIND TICKETS</h3>
          </div>
          <div class="card__content">
            Track your progress as you visit all 30 Major League ballparks. You'll unlock badges as you post photos and document each
            trip you make around the country. Ground Out will keep a scrapbook of your journey for you to revist any
            time.
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
    <!-- <div class="banner-container">
      <div class="banner">
        <img
          class="stopwatch"
          src="../assets/images/014-stopwatch.png"
          alt="Stopwatch">
      </div>
      <div class="banner">
        <h3 class="banner-subheader">Welcome to</h3>
        <h1 class="banner-header">GROUND OUT</h1>
      </div>
    </div> -->
    <!-- <div class="row flex-items-xs-center nav-button-group">
        <a routerLink="/auth/login" class="btn btn-outline col-xs-12 col-sm-6 col-md-2">Log in</a>
        <a routerLink="/auth/register" class="btn btn-primary col-xs-12 col-sm-6 col-md-2">Get Started</a>
    </div>
    <div class="row flex-items-xs-center nav-button-group">
        <a routerLink="/trips" class="btn btn-primary">View My Trips</a>
        <a routerLink="/trips/new" class="btn btn-outline">Log New Trip</a>
    </div>
    <h3 class="tagline">Helping you visit every Major League ballpark</h3>
    <div class="content-container row">
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card">
                <div class="card-header">
                    <a routerLink="/events/teams">
                        <div class="content-img-circle dark-blue">
                            <img class="content-img" src="../assets/images/017-field.png" alt="find tickets">
                        </div>
                        <h3 class="content-heading">EXPLORE PARKS</h3>
                    </a>
                </div>
                <div class="card-block">
                    Not sure which ballpark to check out next? See what other users have posted about each one before you plan your next trip.
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card">
                <div class="card-header">
                    <a routerLink="/trips">
                        <div class="content-img-circle red">
                            <img class="content-img" src="../assets/images/007-tactics.png" alt="find tickets">
                        </div>
                        <h3 class="content-heading">TRACK PROGRESS</h3>
                    </a>
                </div>
                <div class="card-block">
                    Track your progress as you visit all 30 Major League ballparks. You'll unlock badges as you post photos and document each
                    trip you make around the country. Ground Out will keep a scrapbook of your journey for you to revist any
                    time.
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="card">
                <div class="card-header">
                    <a routerLink="/events">
                        <div class="content-img-circle gold">
                            <img class="content-img" src="../assets/images/021-ticket.png" alt="find tickets">
                        </div>
                        <h3 class="content-heading">FIND TICKETS</h3>
                    </a>
                </div>
                <div class="card-block">
                    The Ground Out Ticket Finder scours Seatgeek to find the tickets you want. Search by price, distance, and date.
                </div>
            </div>
        </div>
    </div> -->
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
}
</style>
