<template>
  <div>
    <dashboard-page-title v-if="productItem.length < 0" :showSearch="false" :showFilter="false" :showMainActions="false" @addEvent="$router.push({name: 'addMerchant'})">
    إضافة منتج
    </dashboard-page-title>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col md="8">
            <div>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>                  <h5 class="text-primary"><i class="las la-file-alt"></i> معلومات أساسية</h5>
                </template>
                <b-row>
                  <b-col md="12" class="mb-3">
                    <input-form placeholder="أدخل الاسم" label="الإسم" v-model="product.name" name="product name" :disabled="routeName === 'showProduct'" validate="required"></input-form>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <textarea-form placeholder="الوصف" v-model="product.description" label="وصف مختصر" name="details" :disabled="routeName === 'showProduct'" validate="required"></textarea-form>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <textarea-form  placeholder="المحتوى" v-model="product.content" label="التفاصيل"  name="description" :disabled="routeName === 'showProduct'" validate="required"></textarea-form>
                  </b-col>
                </b-row>
            </b-card>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <h5 class="text-primary"><i class="las la-image"></i>  الصور</h5>
                </template>
                <b-row>
                  <b-col md="12" class="mb-3">
<!--                    <div class="view-main-img"-->
<!--                         :style="{-->
<!--                    'background-image': 'url(' + product.featured_image + ')',-->
<!--                      'background-size' : 'cover',-->
<!--                      'background-position': 'center'-->
<!--                  }"-->
<!--                    >-->
<!--                    </div>-->
                    <cropper-images
                        label="رفع الصورة الرئيسية"
                        nameOfImage="image.jpg"
                        @cropper-save="saveMasterImage"
                        :progressLoading="loadingLogo"
                        :showProgress="false"
                        :multi="false"
                        :imageUrl="product.featured_image"
                    />
                  </b-col>
                  <b-col md="12" class="mb-3">
<!--                    <div class="d-flex align-items-center">-->
<!--                      <div v-for="(arrImg, key) in product.images" :key="key" class="view-main-img">-->
<!--                        <div class="image_slider_background d-flex align-items-center"-->
<!--                             :style="{-->
<!--                    'background-image': 'url(' + arrImg.image + ')',-->
<!--                      'background-size' : 'cover',-->
<!--                      'background-position': 'center'-->
<!--                  }"-->
<!--                        ></div>-->
<!--                      </div>-->
<!--                    </div>-->
                    <cropper-images
                        label="رفع الصور المتبقية"
                        @cropper-save="saveGalleryImage"
                        @remove-image="removeGalleryImage"
                        :progressLoading="loadingGallery"
                        :removeLoadingUi="removeLoadingUi"
                        :images="product.images"
                    ></cropper-images>
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <h5 class="text-primary"><i class="las la-info"></i>  تفاصيل المنتج</h5>
                </template>
                <b-row>
                  <b-col md="4" class="mb-3">
                    <input-form placeholder="SKU" label="SKU" v-model="product.sku" name="SKU" validate="" :disabled="routeName === 'showProduct'"></input-form>
                  </b-col>
                  <b-col md="4" class="mb-3">
                    <input-form :placeholder="product.price" label="السعر" v-model="product.price" name="price" validate="numeric" :disabled="routeName === 'showProduct'"></input-form>
                  </b-col>
                  <b-col md="4" class="mb-3">
                    <input-form placeholder=" 0" label="الخصم" v-model="product.discount" name="discount" validate="numeric" :disabled="routeName === 'showProduct'"></input-form>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <input-form :placeholder="product.quantity" label="الكمية" v-model="product.quantity" name="quantity" validate="numeric" :disabled="routeName === 'showProduct'"></input-form>
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <h5 class="text-primary"><i class="las la-truck"></i>  الشحن</h5>
                </template>
                <b-row>
                  <b-col md="6" class="mb-3">
                    <input-form placeholder="مثال : 1000 جم " label="الوزن" v-model="product.weight" name="size" validate="numeric"></input-form>
                  </b-col>
                  <b-col md="6" class="mb-3">
                    <input-form placeholder="مثال : 1000 سم" label="الطول" v-model="product.height" name="tall" validate="numeric"></input-form>
                  </b-col>
                  <b-col md="6" class="mb-3">
                    <input-form placeholder="مثال : 200 سم" label="العرض" v-model="product.width" name="width" validate="numeric"></input-form>
                  </b-col>
                  <b-col md="6" class="mb-3">
                    <input-form placeholder="مثال : 200 سم" label="الارتفاع" v-model="product.length" name="hight" validate="numeric"></input-form>
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <div class="d-flex justify-content-between align-items-center">
                  <h5 class="text-primary">
                    <i class="las la-plus-circle"></i>
                    سمات المنتج
                  </h5>
                  <span class="cursor-pointer text-warning font-size-16"> إضافة سمة جديدة +</span>
                  </div>
                </template>
                <b-row>
                  <b-col md="12" class="mb-3">
                    <p class="text-black">إضافة سمات جديدة للمنتج يساعد على إعطاء خيارات كثيرة مثل اللون والمقاسات</p>
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <h5 class="text-primary">
                    <i class="las la-link"></i>
                    منتجات ذات صلة
                  </h5>
                 </template>
                <b-row>
                  <b-col md="12" class="mb-3">
                    <input-form placeholder="اسم المنتج" label="اسم المنتج" v-model="product.name" name="name"></input-form>
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <div class="d-flex justify-content-between align-items-center">
                    <h5 class="text-primary">
                      <i class="las la-question-circle"></i>
                      الاسئلة الشائعة الخاصة بالمنتج
                    </h5>
                    <span class="cursor-pointer text-warning font-size-16"> إضافة سؤال +</span>
                  </div>
                </template>
                <b-row>
                  <b-col md="12" class="mb-3 cursor-pointer">
                    1- ماذا تعرف عن شركتنا؟
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <div class="d-flex justify-content-between align-items-center">
                    <h5 class="text-primary">
                      <i class="las la-file-word"></i>
                      كلمات دالة
                    </h5>
                  </div>
                </template>
                <b-row>
                  <b-col md="12" class="mb-3 cursor-pointer">
                    <main-select  :multiple="true" taggable v-model="product.tags" label-title="ادخل الكلمات"></main-select>
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
                <b-button variant="primary" class="w-50" type="submit"> حفظ و نشر </b-button>
                <b-button variant="warning" class="text-white w-50" type="submit"> حفظ </b-button>
              </div>
              <div class="d-flex justify-content-end gap_1" v-else>
                <b-button variant="warning" class="text-white w-100" disabled type="submit"> <spinner-loading text="loading"></spinner-loading> </b-button>
              </div>
            </b-card>
<!--            <b-card class="iq-border-radius-10 mb-3">
              <template v-slot:header>
                  <h5 class="text-primary">
                    <i class="las la-exclamation"></i>
                    الحالة
                  </h5>
              </template>
              <div>
               <v-select placeholder="اختر الحالة" :dir="'rtl'"  :options="[1,2,3,4]"></v-select>
              </div>
            </b-card>-->
<!--            <b-card class="iq-border-radius-10 mb-3">
              <template v-slot:header>
                  <h5 class="text-primary">
                    <i class="las la-store"></i>
                    اختر المتجر
                  </h5>
              </template>
              <div>
               <v-select placeholder="اختر المتجر" label="name" :dir="'rtl'" :options="allStores"  v-model="product.store_id"  :reduce="store => store.id" ></v-select>
              </div>
            </b-card>-->
<!--            <b-card class="iq-border-radius-10 mb-3">
              <template v-slot:header>
                  <h5 class="text-primary">
                    <i class="las la-copyright"></i>
                    العلامة التجارية
                  </h5>
              </template>
              <div>
               <v-select placeholder="اختر المتجر" :dir="'rtl'" :options="[1]"></v-select>
              </div>
            </b-card>-->
            <b-card class="iq-border-radius-10 mb-3">
              <template v-slot:header>
                  <h5 class="text-primary">
                    <i class="las la-box-open"></i>
                    الأقسام
                  </h5>
              </template>
              <div class="m-0 p-0">
                <p v-for="(i,key) in allCategories" :key="key">
                  <b-form-checkbox class="custom-checkbox-color-checked" plain v-model="product.product_categories" color="warning"
                                   name="color" :value="i.id" >
                    <span class="text-black font-size-16 mx-4">{{i.name}}</span>
                  </b-form-checkbox>
                </p>
              </div>
            </b-card>
            <b-card class="iq-border-radius-10 mb-3">
              <template v-slot:header>
                  <h5 class="text-primary">
                    <i class="las la-layer-group"></i>
                    المجموعات
                  </h5>
              </template>
              <div class="m-0 p-0">
                <p v-for="(i,key) in allCollections" :key="key">
                  <b-form-checkbox class="custom-checkbox-color-checked" plain v-model="product.product_collections" color="warning"
                                   name="color" :value="i.id" >
                    <span class="text-black font-size-16 mx-4">{{i.name}}</span>
                  </b-form-checkbox>
                </p>
              </div>
            </b-card>
            <b-card class="iq-border-radius-10 mb-3">
              <template v-slot:header>
                <h5 class="text-primary">
                  <i class="las la-money-bill-alt"></i>
                  الضريبة
                </h5>
              </template>
              <div class="m-0 p-0">
                <p v-for="(i,key) in allTaxes" :key="key">
                  <b-form-checkbox class="custom-checkbox-color-checked" plain v-model="product.tax_id" color="warning"
                                   name="color" :value="i.id" >
                    <span class="text-black font-size-16 mx-4"> {{i.title}} - % {{i.percentage}}  </span>
                  </b-form-checkbox>
                </p>
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
import productsService from '../services/products'
import collectionsService from '../collections/services/collections'
import categoriesService from '../categories/services/categories'
export default {
  components: { },
  mounted () {
    console.log(
      this.url_data = this.$route.params.id
    )
    this.url_data = this.$route.params.id
    core.index()
  },
  data () {
    return {
      product: {
        name: '',
        content: '',
        description: '',
        featured_image: '',
        status: 'pending',
        sku: '',
        quantity: '',
        price: '',
        sale_price: 0,
        length: '',
        width: '',
        height: '',
        weight: '',
        images: [],
        product_collections: [],
        product_categories: [],
        tax_id: '',
        tags: []
      },
      allProducts: [],
      loadingLogo: 0,
      removeLoadingUi: false,
      loadingGallery: 0,
      allStores: [],
      loadingSubmit: false,
      productItem: {},
      productUpdate: {},
      routeName: this.$route.name,
      allCollections: [],
      allCategories: [],
      allTaxes: []
    }
  },
  methods: {
    getAllMerchantProducts () {
      productsService.getAllMerchantProducts().then(res => {
        this.allProducts = res.data.data
      })
    },
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
        this.product.featured_image = res.data.url
        this.product.images.unshift(res.data.url)
        this.showSuccessUploadFile()
      })
    },
    saveGalleryImage (data) {
      this.removeLoadingUi = false
      const formData = new FormData()
      formData.append('file', data.image)
      formData.append('name', data.imageInfo.name)
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent
          const percent = Math.floor((loaded * 100) / total)
          this.loadingGallery = percent
        }
      }
      this.commonUploadFiles(formData, options).then(res => {
        this.product.images.push(res.data.url)
        this.showSuccessUploadFile()
        this.removeLoadingUi = true
      })
    },
    removeGalleryImage () {
      console.log('Removeeeee')
    },
    getAllStores () {
      productsService.getAllStores().then(res => {
        console.log('allresponse', res.data.data)
        this.allStores = res.data.data
      })
    },
    getProduct () {
      productsService.getProduct(this.$route.params.id).then(res => {
        console.log('product', res.data)
        this.product = {
          name: res.data.name,
          content: res.data.content,
          description: res.data.description,
          featured_image: res.data.featured_image,
          status: res.data.status,
          sku: res.data.sku,
          quantity: res.data.quantity,
          price: res.data.price,
          sale_price: res.data.sale_price,
          length: res.data.length,
          width: res.data.width,
          height: res.data.height,
          weight: res.data.weight,
          images: res.data.product_images,
          product_collection_id: res.data.product_collection_id
        }
      })
    },
    editProduct () {
      this.loadingSubmit = true
      productsService.editProduct(this.$route.params.id, this.product).then(() => {
        this.loadingSubmit = false
        core.showSnackbar('success', 'تم تعديل المنتج بنجاح')
        this.$router.push('/products')
      })
    },
    getAllCategories () {
      categoriesService.getAllCategories().then((res) => {
        this.allCategories = res.data.data
      })
    },
    getAllCollections () {
      collectionsService.getAllCollections().then((res) => {
        this.allCollections = res.data.data
      })
    },
    getAllTaxes () {
      categoriesService.getAllTaxes().then((res) => {
        this.allTaxes = res.data.data
      })
    },
    onSubmit () {
      if (this.$route.name === 'editProduct') {
        this.editProduct()
      } else {
        this.loadingSubmit = true
        productsService.addNewProduct(this.product).then(() => {
          core.showSnackbar('success', 'تم إضافه المنتج بنجاح')
          this.$router.push('/products')
          this.loadingSubmit = false
        })
      }
    }
  },
  created () {
    this.getAllCategories()
    this.getAllCollections()
    this.getAllTaxes()
    this.getAllMerchantProducts()
    // this.getAllStores()
    // this.getProduct()
  }
}
</script>
<style>
.view-main-img{
  width: 120px;
  height: 120px;
}
.image_slider_background {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
