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
              label-width="120px">
              <el-form-item label="Date">
                <el-date-picker type="date" placeholder="Select a date"></el-date-picker>
              </el-form-item>
              <el-form-item label="Park">
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
              <el-form-item label="Rating">
                <el-rate
                  v-model="form.rating">
                </el-rate>
              </el-form-item>
              <el-form-item label="Details">
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
                    <i class="el-icon-delete"></i>
                    <img
                      :src="preview"
                      :alt="`photo_${index}`"
                      class="preview__img">
                  </div>
                </el-row>
              </div>
              <el-form-item label="Photos">
                <label class="el-button" for="photos">Add Photos</label>
                <input type="file" @change="onPhotoSelect($event)" name="photos" id="photos" multiple/>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import parkService from '../services/park.service'

export default {
  data() {
    return {
      parks: [],
      photos: [],
      photoPreviews: [],
      form: {
        date: null,
        park: null,
        rating: 1,
        comments: ''
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
  height: 150px;
  display: block;
  margin: auto;
}
</style>
