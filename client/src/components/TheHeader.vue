<template>
  <div class="navWrapper">
    <div id="menu" :class="{ active: false }">
      <el-menu mode="horizontal" :router="true">
        <el-menu-item id="logo" index="/" :route="{ name: 'home'}">
          <img src="../assets/images/009-location-sm.png" alt="logo">
        </el-menu-item>
        <el-menu-item index="/tickets" :route="{ name: 'tickets' }">
          Find Tickets
        </el-menu-item>
        <el-menu-item index="/teams" :route="{ name: 'teams' }">
          Teams
        </el-menu-item>
      </el-menu>
    </div>
  </div>

</template>

<script>
export default {}
</script>
