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
        <div class="menu--left">
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
          <el-menu-item
            v-if="isLoggedIn"
            index="/trips"
            :route="{ name: 'trips' }">
            Scrapbook
          </el-menu-item>
        </div>
        <div class="menu--right">
          <img
            v-if="!!user"
            :src="user.gravatar"
            :alt="user.name"
            class="avatar">
          <el-menu-item index="#">
            <el-dropdown v-if="isLoggedIn">
              <span class="el-dropdown-link">
                {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="logout">Log Out</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
          <el-menu-item
            v-if="!isLoggedIn"
            :route="{ name: 'login' }"
            index="/login">
            Login
          </el-menu-item>
          <el-menu-item
            v-if="!isLoggedIn"
            :route="{ name: 'register' }"
            index="/register">
            Register
          </el-menu-item>
        </div>
      </el-menu>
    </div>
  </div>

</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { ACTIONS, STATE, GETTERS } from '../store/modules/auth.module'

const { mapState, mapGetters, mapActions } = createNamespacedHelpers(
  'authModule'
)

export default {
  methods: {
    ...mapActions({
      logout: ACTIONS.LOGOUT
    }),

    exit() {
      this.logout()
      this.$message({
        center: true,
        message: 'You are now logged out'
      })
      this.$router.push('/')
    }
  },

  computed: {
    ...mapState({
      user: STATE.USER
    }),

    ...mapGetters({
      isLoggedIn: GETTERS.IS_LOGGED_IN
    })
  }
}
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  justify-content: space-between;
}

.menu--left {
  width: 50%;
  display: flex;
  justify-content: flex-start;
}

.menu--right {
  width: 50%;
  display: flex;
  justify-content: flex-end;
}

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

.avatar {
  height: 45px;
  display: block;
  border-radius: 100px;
  margin: auto 0;
}
</style>
