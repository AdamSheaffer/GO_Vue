<template>
  <el-main class="main">
    <el-row type="flex" justify="center">
      <el-col
        :xl="6"
        :lg="8"
        :md="12"
        :sm="16"
        :xs="24"
        class="register">
        <el-card>
          <div slot="header" class="clearfix">
          <div class="register__img-container">
            <img
              class="register__img"
              src="../assets/images/012-card.png"
              alt="Register">
          </div>
          <span class="register__header register__header--sm">Welcome to Ground Out</span>
          <span class="register__header register__header--lg">SIGN UP</span>
          </div>
          <el-form
            :model="registerForm"
            ref="registerForm"
            :rules="rules">
            <el-form-item label="Username" prop="name">
              <el-input
                v-model="registerForm.name"
                type="text"
                placeholder="Username">
              </el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input
                v-model="registerForm.email"
                type="text"
                placeholder="Email">
              </el-input>
            </el-form-item>
            <el-form-item label="Password" prop="pw">
              <el-input
                v-model="registerForm.pw"
                type="password"
                placeholder="Password">
              </el-input>
            </el-form-item>
            <el-form-item label="Confirm Password" prop="confirm">
              <el-input
                v-model="registerForm.confirm"
                type="password"
                placeholder="Confirm Password">
              </el-input>
            </el-form-item>
            <el-alert
              v-if="showValidationError"
              :closable="false"
              title="Please correct errors before submitting"
              type="error"
              class="alert alert--error">
            </el-alert>
            <el-button @click="submit">Register</el-button>
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
    const validatePasswordConfirm = (rule, value, fn) => {
      if (value !== this.registerForm.pw) {
        fn(new Error("Passwords don't match"))
      } else {
        fn()
      }
    }

    return {
      registerForm: {
        name: '',
        email: '',
        pw: '',
        confirm: ''
      },

      rules: {
        name: [
          { required: true, message: 'Username is required', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: 'Invalid Email', trigger: 'blur' },
          { required: true, message: 'Email is required', trigger: 'blur' },
          { max: 60, message: 'Email address is too long', trigger: 'change' }
        ],
        pw: [
          { required: true, message: 'Password is required', trigger: 'blur' }
        ],
        confirm: [
          { required: true, message: 'Passowrd is required', trigger: 'blur' },
          { validator: validatePasswordConfirm, trigger: 'blur' }
        ]
      },

      showValidationError: false
    }
  },

  methods: {
    ...mapActions('authModule', [ACTIONS.REGISTER]),

    submit() {
      this.$refs.registerForm.validate(isValid => {
        if (isValid) {
          this.showValidationError = false
          this.attemptRegister()
        } else {
          this.showValidationError = true
        }
      })
    },

    attemptRegister() {
      const { name, email, pw: password, confirm } = this.registerForm
      this.register({ name, email, password, confirm })
        .then(data => {
          if (data.success) {
            localStorage.setItem('user', JSON.stringify(data.user))
            localStorage.setItem('token', data.token)
            this.$message({
              message: data.message,
              type: 'success',
              center: true
            })
          } else {
            this.$message({
              message: data.message,
              type: 'error',
              center: true
            })
          }
        })
        .catch(() => {
          const message = 'Woops! something went wrong'
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

.register {
  margin: auto;
}

.register__img {
  display: block;
  height: 250px;
  margin: auto;
}

.register__header {
  text-align: center;
  color: #002638;
}

.register__header--sm {
  display: block;
  opacity: 0.65;
  margin-top: 30px;
  font-size: 20px;
}

.register__header--lg {
  display: block;
  font-size: 30px;
}

.alert {
  margin-bottom: 22px;
}
</style>
