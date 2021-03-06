<template>
  <el-main class="main">
    <el-row type="flex" justify="center">
      <el-col :xl="6" :lg="8" :md="12" :sm="16" :xs="24" class="login">
        <el-card>
          <div slot="header" class="clearfix">
          <div class="login__img-container">
            <img
              class="login__img"
              src="../assets/images/012-card.png"
              alt="Login">
          </div>
          <span class="login__header login__header--sm">Welcome to Ground Out</span>
          <span class="login__header login__header--lg">LOGIN</span>
          </div>
          <el-form
            @submit.native.prevent="submit"
            :model="loginForm"
            ref="loginForm"
            :rules="rules">
            <el-form-item label="Email" prop="email">
              <el-input
                @keyup.native.enter="submit"
                v-model="loginForm.email"
                type="text"
                placeholder="Email">
              </el-input>
            </el-form-item>
            <el-form-item label="Password" prop="pw">
              <el-input
                v-model="loginForm.pw"
                type="password"
                placeholder="Password">
              </el-input>
            </el-form-item>
            <el-alert
              :closable="false"
              v-if="showValidationError"
              title="Please correct errors before logging in"
              type="error"
              class="alert">
            </el-alert>
            <el-button @click="submit" native-type="submit">Log In</el-button>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import { mapActions } from 'vuex'
import { ACTIONS } from '../store/modules/auth.module'

export default {
  data() {
    return {
      loginForm: {
        email: '',
        pw: ''
      },

      rules: {
        email: [
          { type: 'email', message: 'Invalid Email', trigger: 'blur' },
          { required: true, message: 'Email is required', trigger: 'blur' },
          { max: 60, message: 'Email address is too long', trigger: 'change' }
        ],
        pw: [
          { required: true, message: 'Password is required', trigger: 'blur' }
        ]
      },

      showValidationError: false
    }
  },

  methods: {
    ...mapActions('authModule', [ACTIONS.LOGIN]),

    submit() {
      this.$refs.loginForm.validate(isValid => {
        if (isValid) {
          this.showValidationError = false
          this.attemptLogin()
        } else {
          this.showValidationError = true
        }
      })
    },

    attemptLogin() {
      const { email, pw: password } = this.loginForm
      this.login({ email, password })
        .then(data => {
          if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('token', data.token)
            this.$message({
              message: data.message,
              type: 'success',
              center: true
            })
            this.$router.push('/trips')
          } else {
            this.$message({
              message: data.message,
              type: 'error',
              center: true
            })
          }
        })
        .catch(err => {
          const message =
            err.response && err.response.status === 401
              ? 'Invalid Email or Password'
              : 'Woops! something went wrong'

          this.$message({ message, type: 'error', center: true })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  background: #fafafa;
  min-height: 100vh;
}

.login {
  margin: auto;
}

.login__img {
  display: block;
  height: 250px;
  margin: auto;
}

.login__header {
  text-align: center;
  color: #002638;
}

.login__header--sm {
  display: block;
  opacity: 0.65;
  margin-top: 30px;
  font-size: 20px;
}

.login__header--lg {
  display: block;
  font-size: 30px;
}

.alert {
  margin-bottom: 22px;
}
</style>
