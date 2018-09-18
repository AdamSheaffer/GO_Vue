<template>
  <div class="parks">
    <span class="parks__heading">Teams</span>
    <span class="parks__subheading parks__subheading--al">
      American League
    </span>
    <el-row
      class="parks__container"
      type="flex"
      justify="space-between">
      <el-col
        v-for="park in alParks"
        :key="park._id"
        :xs="24"
        :sm="12"
        :md="8">
        <router-link :to="{path: `teams/${park.team}`}" class="park-link">
          <div class="park">
            <img
              class="park__img"
              :src="require(`../assets/images/teams/${park.team.toLowerCase().replace(' ', '')}.png`)">
            <span class="park__label park__team park__team--al">{{park.team}}</span>
            <span class="park__label">{{park.name}}</span>
            <span class="park__label">Visited: {{park.hasVisited ? 'Yes' : 'No'}}</span>
          </div>
        </router-link>
      </el-col>
    </el-row>
    <span class="parks__heading">Teams</span>
    <span class="parks__subheading parks__subheading--nl">
      National League
    </span>
    <el-row>
      <el-col
        v-for="park in nlParks"
        :key="park._id"
        :xs="24"
        :sm="12"
        :md="8">
        <router-link :to="{path: `teams/${park.team}`}" class="park-link">
          <div class="park">
            <img
              class="park__img"
              :src="require(`../assets/images/teams/${park.team.toLowerCase().replace(' ', '')}.png`)">
            <span class="park__label park__team park__team--nl">{{park.team}}</span>
            <span class="park__label">{{park.name}}</span>
            <span class="park__label">Visited: {{park.hasVisited ? 'Yes' : 'No'}}</span>
          </div>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['parks', 'trips'],

  computed: {
    alParks() {
      const parks = this.parks.filter(park =>
        park.division.includes('American')
      )
      return parks.map(p => {
        const hasVisited = !!this.trips.find(t => t.park._id === p._id)
        p.hasVisited = hasVisited
        return p
      })
    },

    nlParks() {
      const parks = this.parks.filter(park =>
        park.division.includes('National')
      )
      return parks.map(p => {
        const hasVisited = !!this.trips.find(t => t.park._id === p._id)
        p.hasVisited = hasVisited
        return p
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.parks__container {
  flex-wrap: wrap;
}

.parks__heading {
  font-size: 25px;
  margin: 60px 0 0;
  display: block;
}

.parks__subheading {
  display: block;
  font-size: 16px;
  margin-bottom: 40px;
}

.parks__subheading--al {
  color: #1e9fe0;
}

.parks__subheading--nl {
  color: #ff2f3e;
}

.park {
  margin-bottom: 20px;
  cursor: pointer;
}

.park-link {
  text-decoration: none;
  color: black;
}

.park__img {
  display: block;
  margin: auto;
}

.park__label {
  display: block;
  text-align: center;
  font-size: 15px;
}

.park__team {
  font-weight: 600;
  margin-top: 10px;
}

.park__team--al {
  color: #1e9fe0;
}

.park__team--nl {
  color: #ff2f3e;
}
</style>
