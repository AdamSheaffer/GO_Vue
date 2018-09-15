<template>
  <div>
    <div :class="{ active: false }">
      <el-menu
        mode="horizontal"
        :router="true"
        class="menu">
        <el-menu-item index="/">
          <img
            class="menu__img"
            src="../assets/images/009-location-sm.png"
            alt="logo">
          <h3 class="menu__logo">Ground Out</h3>
        </el-menu-item>
        <el-menu-item index="/tickets" :route="{ name: 'tickets' }">
          Find Tickets
        </el-menu-item>
        <el-menu-item index="/teams/welcome" :route="{ name: 'teams' }">
          Teams
        </el-menu-item>
      </el-menu>
    </div>
  </div>

</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.menu {
  background: #002538;
}

.menu__img {
  margin-right: 5px;
}

.menu__logo {
  display: inline;
}
</style>
