<template>
  <div>
    <dashboard-page-title :showSearch="false" :showFilter="false" :showMainActions="false" @addEvent="$router.push({name: 'addMerchant'})">
    إضافة عرض
    </dashboard-page-title>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col md="8">
            <div>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <h5 class="text-primary"><i class="las la-file-alt"></i> معلومات العرض</h5>
                </template>
                <b-row>
                  <b-col md="12" class="mb-3">
                    <input-form placeholder="أدخل الاسم" label="الإسم" v-model="offer.name" name="product name" validate="required"></input-form>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <main-select :options="['date', 'quantity']" label-title= 'نوع العرض' dir="rtl" v-model="offer.type"/>
                  </b-col>
                  <b-col md="12" v-if="offer.type === 'date'" class="mb-3">
                    <b-form-group
                        :label="'بداية العرض'"
                        :label-for="'بداية العرض'"
                        class="position-relative"
                    >
                      <validation-provider
                          :name="'start_date'"
                          rules="required"
                          :bails="false"
                          #default="{errors}"
                      >
                        <i class="las la-calendar position-absolute text-gray font-size-20 datePickerIcon"></i>
                        <flat-pickr v-model="offer.start_date" :config="config" :class="['form-control bg-white date-error' , { 'is-invalid': errors.length > 0 }]"></flat-pickr>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col md="12" v-if="offer.type === 'date'" class="mb-3">
                    <b-form-group
                        :label="'انتهاء العرض'"
                        :label-for="'انتهاء العرض'"
                        class="position-relative"
                    >
                      <validation-provider
                          :name="'end_date'"
                          rules="required"
                          :bails="false"
                          #default="{errors}"
                      >
                        <i class="las la-calendar position-absolute text-gray font-size-20 datePickerIcon"></i>
                        <flat-pickr v-model="offer.end_date" :config="config" :class="['form-control bg-white date-error' , { 'is-invalid': errors.length > 0 }]"></flat-pickr>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <h5 class="text-primary"><i class="las la-boxes"></i> المنتجات</h5>
                </template>
                <b-row>
                  <b-col md="12" class="mb-3">
                    <main-select label-title= 'المنتجات' multiple :options="allProducts" dir="rtl"
                                 v-model="selectedProduct" label="name"
                                 :selectable="option => !selectedProduct.includes(option.id)"
                                 :reduce="product => product.id" @deselected="removeProduct" @selecting="addProduct"
                    />
                    <div v-for="(item, key) in offer.flash_sale_products" :key="key" class="mb-3 bg-gray-light iq-border-radius-5 p-3">
                       <div class="w-100 d-flex gap_1 align-items-center">
                         <img class="avatar-90 iq-border-radius-5" src="data:image/jpeg;base64,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"  :alt="item.name"/>
                         <div>
                           <p class="text-primary font-weight-bold mt-2 m-0">{{item.product.name}}</p>
                           <p class="text-primary font-weight-bold m-0"><span class="text-dark d-inline-block mx-1">السعر </span>{{item.product.price}} SAR</p>
                         </div>
                       </div>
                      <b-row class="mt-4">
                        <b-col lg="4" class="mb-3">
                          <input-form placeholder="السعر" label="السعر بعد الخصم" v-model="item.price" name="price" validate="required|numeric"></input-form>
                        </b-col>
                        <b-col lg="4" class="mb-3">
                          <input-form placeholder="النسبة" label="النسبة" v-model="item.percentage" name="percentage" validate="required|numeric"></input-form>
                        </b-col>
                        <b-col lg="4" class="mb-3" v-if="offer.type === 'quantity'">
                          <input-form placeholder="الكمية" label="الكمية" v-model="item.quantity" name="quantity" validate="required|numeric"></input-form>
                        </b-col>
                      </b-row>
                    </div>
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
                <b-button variant="primary" class="text-white w-100" type="submit"> حفظ </b-button>
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
import productServices from '@/modules/products/services/products'
import offersServices from '@/modules/offers/services/offers'
export default {
  components: { },
  mounted () {
    core.index()
  },
  data () {
    return {
      offer: {
        name: '',
        date: '',
        start_date: '',
        end_date: '',
        type: 'date',
        flash_sale_products: []
      },
      loadingSubmit: false,
      config: {
        altInput: true,
        dateFormat: 'Y-m-d',
        enableTime: true
      },
      allProducts: [],
      selectedProduct: []
    }
  },
  methods: {
    getAllMerchantProducts () {
      productServices.getAllMerchantProducts().then(res => {
        this.allProducts = res.data.data
      })
    },
    addProduct (productData) {
      this.offer.flash_sale_products.push({
        product: productData,
        price: '',
        percentage: '',
        quantity: ''
      })
    },
    removeProduct (productData) {
      var position = this.offer.flash_sale_products.findIndex(product => product.product.id === productData.id)
      this.offer.flash_sale_products.splice(position, 1)
    },
    onSubmit () {
      offersServices.addNewFlashSale(this.offer).then(res => {
        core.showSnackbar(res.data.message)
        this.$router.push({ name: 'offers' })
      })
      console.log('hello')
    }
  },
  created () {
    this.getAllMerchantProducts()
  }
}
</script>
0
