<template>
  <div>
    <dashboard-page-title :showSearch="false" :showFilter="false" :showMainActions="false" @addEvent="$router.push({name: 'addMerchant'})">
    إضافة متجر
    </dashboard-page-title>
    <ValidationObserver v-slot="{ validate }">
      <form @submit.prevent="validate(onSubmit)">
        <b-row>
          <b-col md="3" class="mb-3">
           <input-form placeholder="أدخل الاسم" label="الإسم الثلاثي"></input-form>
          </b-col>
          <b-col md="3" class="mb-3">
           <input-form placeholder="ادخل اسم المتجر" label="إسم المتجر"></input-form>
          </b-col>
          <b-col md="3" class="mb-3">
            <input-form placeholder="المدينة" label="المدينة"></input-form>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="3" class="mb-3">
            <input-form placeholder="ادخل رقم الجوال" label="رقم الهاتف"></input-form>
          </b-col>
          <b-col md="6" class="mb-3">
            <input-form placeholder="ادخل البريد الإلكتروني" label="البريد الإلكتروني"></input-form>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="9" class="mb-3">
            <p>سوف يتم إرسال دعوة عبر البريد الإلكتروني والهاتف لتكملة البيانات من قِبل التاجر</p>
            <b-button variant="primary">إرسال دعوة</b-button>
          </b-col>
        </b-row>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
export default {
  components: { },
  mounted () {
    core.index()
  },
  data () {
    return {
    }
  },
  methods: {
    onSubmit () {
      console.log('hello')
    }
  }
}
</script>
