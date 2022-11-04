<template>
  <div>
    <dashboard-page-title :showSearch="false" :showFilter="false" :showMainActions="false" @addEvent="$router.push({name: 'addMerchant'})">
      إضافة مجموعة
    </dashboard-page-title>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col md="8">
            <div>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <h5 class="text-primary"><i class="las la-file-alt"></i> معلومات المجموعة </h5>
                </template>
                <b-row>
                  <b-col md="12" class="mb-3">
                    <input-form placeholder="أدخل الاسم" label="الإسم" v-model="collection.name" name="categories name" validate="required"></input-form>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <textarea-form placeholder="الوصف" v-model="collection.description" label="الوصف" name="details" validate="required"></textarea-form>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <input-form placeholder="slug" v-model="collection.slug" label="slug"  name="slug" validate="required"></input-form>
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <h5 class="text-primary"><i class="las la-image"></i>  الصور</h5>
                </template>
                <b-row>
                  <b-col md="12" class="mb-3">
                    <cropper-images
                        label="رفع الصورة الرئيسية"
                        nameOfImage="image.jpg"
                        @cropper-save="saveMasterImage"
                        :progressLoading="loadingImage"
                        :showProgress="false"
                        :multi="false"
                        :imageUrl="collection.image"
                    />
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>
          <b-col md="3">
            <b-card class="iq-border-radius-10 mb-3">
              <template v-slot:header>
                <h5 class="text-primary">
                  <i class="las la-save"></i>
                  النشر
                </h5>
              </template>
              <div class="d-flex justify-content-end gap_1" v-if="!loadingSubmit">
                <b-button variant="primary" class="w-100" type="submit"> حفظ </b-button>
              </div>
              <div class="d-flex justify-content-end gap_1" v-else>
                <b-button variant="primary" class="text-white w-100" disabled type="submit"> <spinner-loading text="loading"></spinner-loading> </b-button>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import collectionervice from '../services/collections'
export default {
  components: { },
  mounted () {
    core.index()
  },
  data () {
    return {
      collection: {
        name: '',
        description: '',
        slug: '',
        store_id: 1,
        image: ''
      },
      loadingLogo: 0,
      loadingSubmit: false
    }
  },
  methods: {
    saveMasterImage (file) {
      const formData = new FormData()
      formData.append('file', file.image)
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.loadingLogo = percent
        }
      }
      this.commonUploadFiles(formData, options).then(res => {
        this.collection.image = res.data.url
        this.showSuccessUploadFile()
      })
    },
    onSubmit () {
      this.loadingSubmit = true
      collectionervice.addNewCollection(this.collection).then(res => {
        core.showSnackbar('success', 'تمت إضافة القسم بنجاح')
        this.$router.push({ name: 'collections' })
      }).finally(() => {
        this.loadingSubmit = false
      })
    }
  },
  created () {
  }
}
</script>
