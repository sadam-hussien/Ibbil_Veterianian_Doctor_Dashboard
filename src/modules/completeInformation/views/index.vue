<template>
  <div>
    <dashboard-page-title :showSearch="false" :showFilter="false" :showMainActions="false" @addEvent="$router.push({name: 'addMerchant'})">
      الضبط
    </dashboard-page-title>
    <ValidationObserver v-slot="{ validate }">
      <form @submit.prevent="validate(onSubmit)">
        <b-row>
          <b-col md="8">
            <div>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <h5 class="text-primary"><i class="las la-file-alt"></i> معلومات أساسية</h5>
                </template>
                <b-row>
                  <b-col md="12" class="mb-3">
                    <input-form placeholder="أدخل الاسم" label="الإسم" v-model="product.name" name="name" validate="required"></input-form>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <textarea-form placeholder="الوصف" v-model="product.details" label="الوصف" name="details" validate="required"></textarea-form>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <textarea-form placeholder="المحتوى" v-model="product.content" label="المحتوى"  name="content" validate="required"></textarea-form>
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
                        :progressLoading="loadingLogo"
                        :showProgress="false"
                        :multi="false"
                        :imageUrl="product.masterImage"
                    />
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <cropper-images
                        label="رفع الصور المتبقية"
                        @cropper-save="saveMasterImage"
                        @remove-image="removeGalleryImage"
                        :removeLoadingUi="false"
                        :progressLoading="100"
                        :images="product.masterImage"
                    ></cropper-images>
                    <!--                    <cropper-images
                                            label="رفع الصور المتبقية"
                                            nameOfImage="image.jpg"
                                            @cropper-save="saveMasterImage"
                                            :progressLoading="loadingLogo"
                                            :showProgress="false"
                                            :multi="true"
                                            :imageUrl="product.masterImage"
                                        />-->
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>
          <b-col md="3">
            <b-card class="iq-border-radius-10 mb-3 main-actions">
              <template v-slot:header>
                <h5 class="text-primary">
                  <i class="las la-save"></i>
                  النشر
                </h5>
              </template>
              <div class="d-flex justify-content-end gap_1">
                <b-button variant="primary" class="w-50"> حفظ و نشر </b-button>
                <b-button variant="warning" class="text-white w-50"> حفظ </b-button>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { core } from '@/config/pluginInit'
export default {
  name: 'completeInfo',
  components: { },
  mounted () {
    core.index()
  },
  data () {
    return {
      product: {
        name: '',
        details: '',
        content: '',
        masterImage: '',
        sku: '',
        price: '',
        discount: '',
        countaty: ''
      },
      loadingLogo: 0
    }
  },
  methods: {
    saveMasterImage (file) {
      console.log('file.image => ', file.image)
      const formData = new FormData()
      formData.append('image', file.croppedFile)
      formData.append('type', 'landmark')
      formData.append('name', file.filename)
      /* const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.progressLogo = percent
        }
      } */
    },
    removeGalleryImage () {
      console.log('Removeeeee')
    },
    onSubmit () {
      console.log('hello')
    }
  }
}
</script>

<style>
.main-actions {
  position: sticky !important;
  top: 0px;
}
</style>
