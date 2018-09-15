<template>
  <el-row type="flex" justify="center">
    <el-col
      :xl="8"
      :lg="12"
      :md="16"
      :xs="24">
      <el-card class="welcome-card">
        <div slot="header" class="clearfix welcome-header">
          <div class="welcome-header__img-container">
            <img
              src="../assets/images/026-uniform.png"
              class="welcome-header__img"
              alt="Teams">
          </div>
          <h2 class="welcome-header__text">EXPLORE TEAMS</h2>
        </div>
        <div class="text item">
          <p>Not sure which park to visit next? Explore photos uploaded by other users from their own trips. Find available tickets to each park on the date or price that works for you.</p>
          <br>
          <p>Select a team to get started.</p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.welcome-header__img-container {
  padding: 20px;
  border-radius: 190px;
  width: 150px;
  margin: auto;
  background-color: #002638;
}

.welcome-header__img {
  display: block;
  height: 150px;
  margin: auto;
}

.welcome-header__text {
  text-align: center;
  color: #002638;
}

.text {
  line-height: 30px;
}
</style>
