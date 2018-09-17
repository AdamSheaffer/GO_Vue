<template>
  <el-container class="container">
    <el-aside id="ticket-sidebar">
      <el-menu
        :collapse-transition="false"
        :collapse="sidebarCollapsed"
        :router="true"
        :default-openeds="['2', '3']"
        class="el-menu-vertical-demo team-list">
        <el-menu-item
          index="#"
          @click="toggleSidebar"
          class="team-list__toggle">
          <i :class="{'el-icon-arrow-right': sidebarCollapsed, 'el-icon-arrow-left': !sidebarCollapsed}"></i>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span v-if="!sidebarCollapsed">National League</span>
          </template>
          <el-menu-item
            v-for="team in nlTeams"
            :key="team"
            :index="team">{{team}}</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span v-if="!sidebarCollapsed">American League</span>
          </template>
          <el-menu-item
            v-for="team in alTeams"
            :key="team"
            :index="team">{{team}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import parkService from '../services/park.service'

export default {
  data() {
    return {
      sidebarCollapsed: false,
      parks: []
    }
  },

  mounted() {
    parkService.getAllParks().then(data => {
      this.parks = data.parks
    })
  },

  methods: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    }
  },

  computed: {
    alTeams() {
      return this.parks
        .filter(t => t.division.includes('American'))
        .map(t => t.team)
        .sort()
    },

    nlTeams() {
      return this.parks
        .filter(t => t.division.includes('National'))
        .map(t => t.team)
        .sort()
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background: #fafafa;
}

.team-list {
  min-height: 100vh;
}

.team-list__toggle {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  border-bottom: 1px solid #cdcdcd;
}

#ticket-sidebar {
  width: inherit !important;
}

.el-menu {
  width: 300px;
}

.el-menu--collapse {
  width: 64px;
}
</style>
