<template>
  <div>
    <div :class="{ active: false }">
      <el-menu
        mode="horizontal"
        :router="true"
        background-color="#002538"
        active-text-color="#fafafa"
        text-color="#ababab"
        class="menu">
        <el-menu-item index="/" class="brand">
          <img
            class="menu__img"
            src="../assets/images/009-location-sm.png"
            alt="logo">
          <span class="menu__logo">Ground Out</span>
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
.menu li:first-of-type {
  border-bottom: none;
}

.menu__img {
  margin-right: 5px;
}

.menu__logo {
  display: inline;
  color: #fafafa;
  font-size: 18px;
}
</style>
