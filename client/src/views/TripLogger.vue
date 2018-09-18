<template>
  <el-main>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :md="16">
        <el-card>
          <div slot="header">
            <span>Log Trip</span>
          </div>
          <div>
            <el-form
              ref="form"
              :model="form"
              label-width="120px"
              :rules="rules">
              <el-form-item label="Date" prop="tripDate">
                <el-date-picker
                  v-model="form.tripDate"
                  type="date"
                  placeholder="Select a date">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="Park" prop="park">
                <el-select
                  v-model="form.park"
                  placeholder="Select a park"
                  :disabled="!parks || !parks.length">
                  <el-option
                    v-for="park in parks"
                    :key="park._id"
                    :label="park.name"
                    :value="park._id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Rating" prop="rating">
                <el-rate
                  v-model="form.rating">
                </el-rate>
              </el-form-item>
              <el-form-item label="Details" prop="comments">
                <el-input
                  type="textarea"
                  :rows="20"
                  placeholder="Score, stats, weather, details, etc"
                  v-model="form.comments">
                </el-input>
              </el-form-item>
              <div class="previews">
                <el-row :gutter="20">
                  <div
                    v-for="(preview, index) in photoPreviews"
                    :key="index"
                    class="preview">
                    <el-card :body-style="{padding: '10px'}">
                      <img
                        :src="preview"
                        :alt="`photo_${index}`"
                        class="preview__img">
                      <hr>
                      <el-tooltip class="item" effect="dark" content="Delete Photo" placement="right">
                        <i @click="deletePhoto(index)" class="el-icon-delete"></i>
                      </el-tooltip>
                      </el-card>
                  </div>
                </el-row>
              </div>
              <el-form-item label="Photos">
                <label class="el-button" for="photos">Add Photos</label>
                <input type="file" @change="onPhotoSelect($event)" name="photos" id="photos" multiple/>
              </el-form-item>
              <hr class="divider">
              <el-alert
                v-if="showValidationError"
                :closable="false"
                title="Correct validation errors before submitting"
                type="error">
              </el-alert>
              <div class="actions">
                <router-link :to="{path: '/trips'}">
                  <el-button class="action__btn">Cancel</el-button>
                </router-link>
                <el-button
                  type="primary"
                  @click="attemptSubmit"
                  :loading="isSaving"
                  class="action__btn">
                  Submit
                </el-button>
              </div>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import parkService from '../services/park.service'
import tripsService from '../services/trips.service'

export default {
  data() {
    return {
      parks: [],
      photos: [],
      photoPreviews: [],
      showValidationError: false,
      isSaving: false,

      form: {
        tripDate: null,
        park: null,
        rating: 1,
        comments: ''
      },

      rules: {
        date: [
          { required: true, message: 'Date is required', trigger: 'blur' }
        ],
        park: [{ required: true, message: 'Park is required', trigger: 'blur' }]
      }
    }
  },

  created() {
    parkService.getAllParks().then(data => {
      this.parks = data.parks
    })
  },

  methods: {
    onPhotoSelect(event) {
      const photos = event.target.files || event.srcElement.files
      this.photos.push(...photos)
      this.readUrl(event.target)
    },

    readUrl(input) {
      if (input.files && input.files.length) {
        const files = Array.from(input.files)

        files.forEach(f => {
          const reader = new FileReader()
          reader.onload = e => {
            this.photoPreviews.push(e.target.result)
          }
          reader.readAsDataURL(f)
        })
      }
    },

    deletePhoto(index) {
      this.photos.splice(index, 1)
      this.photoPreviews.splice(index, 1)
    },

    attemptSubmit() {
      this.$refs.form.validate(isValid => {
        if (isValid) {
          this.submit()
        } else {
          this.showValidationError = true
        }
      })
    },

    submit() {
      this.isSaving = true
      const formData = new FormData()
      this.form.tripDate = this.formatDate(this.form.tripDate)
      formData.append('trip', JSON.stringify(this.form))
      this.photos.forEach(p => formData.append('photos', p))

      tripsService
        .postUserTrip(formData)
        .then(data => {
          this.isSaving = false
          if (data.success) {
            this.$message({
              message: data.message,
              type: 'success',
              center: true
            })
            this.$router.push('/trips')
            // TODO: Check for badges
          } else {
            this.$message({
              message: data.message,
              type: 'error',
              center: true
            })
          }
        })
        .catch(() => {
          this.isSaving = false
          this.$message({
            message: 'Woops! Something went wrong',
            type: 'error',
            center: true
          })
        })
    },

    formatDate(date) {
      return this.$options.filters.datetime(date, 'L')
    }
  }
}
</script>

<style lang="scss" scoped>
#photos {
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}

.previews {
  margin-left: 120px;
  margin-bottom: 20px;
}

.preview {
  display: inline-block;
  margin-right: 15px;
}

.preview__img {
  height: 125px;
  display: block;
  margin: auto;
}

.el-icon-delete {
  color: #ff2f3e;
  cursor: pointer;
}

.actions {
  margin-top: 20px;
}

.action__btn {
  margin-right: 10px;
}

.divider {
  opacity: 0.5;
  margin-bottom: 20px;
}
</style>
