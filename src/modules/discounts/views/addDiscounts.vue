<template>
  <div>
    <dashboard-page-title :showSearch="false" :showFilter="false" :showMainActions="false" @addEvent="$router.push({name: 'addMerchant'})">
    إضافة خصم
    </dashboard-page-title>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col md="8">
            <div>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <h5 class="text-primary"><i class="las la-file-alt"></i> معلومات الخصم</h5>
                </template>
                <b-row>
                  <b-col md="12" class="mb-3">
                    <input-form placeholder="أدخل الاسم" label="الإسم" v-model="offer.title" name="Name" validate="required"></input-form>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <input-form placeholder="أدخل الكود" label="الكود" v-model="offer.code" name="code" validate="required"></input-form>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <main-select :options="['all-orders']" label-title= 'استهداف' dir="rtl" v-model="offer.target"/>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <input-form placeholder="عدد مرات استخدام الكود" label="عدد مرات استخدام الكود" v-model="offer.max_used" name="max_used" validate="required|numeric"></input-form>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <input-form placeholder="عدد مرات استخدام الكود للمستخدم الواحد" label="عدد مرات استخدام الكود للمستخدم الواحد" v-model="offer.max_user_used" name="max_used" validate="required|numeric"></input-form>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <main-select :options="['amount', 'percentage']" label-title= 'نوع العرض' dir="rtl" v-model="offer.type_option"/>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <input-form placeholder="القيمة" label="القيمة" v-model="offer.value" name="value" validate="required|numeric"></input-form>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <input-form placeholder="الحد الأقصى لقيمة الخصم" label="الحد الأقصى لقيمة الخصم" v-model="offer.max_discount" name="max_discount" validate="required|numeric"></input-form>
                  </b-col>
                  <b-col md="12" class="mb-3">
                    <input-form placeholder="الحد الأدنى لقيمة الطلب" label="الحد الأدنى لقيمة الطلب" v-model="offer.min_order_price" name="min_order_price" validate="required|numeric"></input-form>
                  </b-col>
                  <b-col md="12" class="mb-3">
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
                  <b-col md="12" class="mb-3">
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
                  <b-col md="12" class="mb-3">
                    <b-form-checkbox class="custom-radio-color" inline v-model="offer.can_use_with_promotion" :color="'primary'" name="color">هل يستخدم مع العروض ؟</b-form-checkbox>
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
                                 v-model="offer.products" label="name"
                                 :selectable="option => !offer.products.includes(option.id)"
                                 :reduce="product => product.id"
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
import discountServices from '../services/discounts'
export default {
  components: { },
  mounted () {
    core.index()
  },
  data () {
    return {
      offer: {
        title: '',
        code: '',
        max_used: null,
        max_user_used: null,
        value: null,
        max_discount: null,
        can_use_with_promotion: null,
        type_option: 'amount',
        target: 'all-orders',
        min_order_price: null,
        start_date: null,
        end_date: null,
        products: [],
        product_collections: []
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
    onSubmit () {
      discountServices.addNewDiscount(this.offer).then(res => {
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
