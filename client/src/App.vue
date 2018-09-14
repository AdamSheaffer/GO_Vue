<template>
  <div id="app">
    <app-header></app-header>
    <el-container>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
import Header from './components/TheHeader.vue'

export default {
  name: 'app',
  components: {
    'app-header': Header
  }
}
</script>

<style lang="scss">
html {
  font-family: 'Metropolis', 'Avenir Next', 'Helvetica Neue', Arial, sans-serif;
}
</style>
