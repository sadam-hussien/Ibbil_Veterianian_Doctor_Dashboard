<template>
  <div>
    <dashboard-page-title :showSearch="false" :showFilter="false" :showMainActions="false">
    عملية سحب جديدة
    </dashboard-page-title>
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-form @submit.prevent="handleSubmit(onSubmit)">
        <b-row>
          <b-col md="12">
            <div>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <h5 class="text-primary"><i class="las la-money-bill"></i> إيرادات قابلة للسحب</h5>
                </template>
                <p class="font-size-22 text-primary mb-0">{{storeActive.total_revenue}} <span class="text-gray">ريال سعودى</span></p>
              </b-card>
              <b-card class="iq-border-radius-10 mb-3">
                <template v-slot:header>
                  <h5 class="text-primary"><i class="las la-file-alt"></i> طلب السحب</h5>
                </template>
                <b-row>
                  <b-col md="6">
                    <b-row>
                      <b-col md="12" class="mb-3">
                        <input-form placeholder="إسم الحساب" v-model="withdraw.account_name" label="إسم الحساب" name="account_name"  validate="required"></input-form>
                      </b-col>
                      <b-col md="12" class="mb-3">
                        <input-form  placeholder="إيبان - IBAN" v-model="withdraw.IBAN_number" label="إيبان - IBAN"  name="IBAN_number" validate="required|numeric"></input-form>
                      </b-col>
                      <b-col md="12" class="mb-3">
                        <input-form placeholder="القيمة" label="القيمة" v-model="withdraw.amount" name="amount"  :validate="`required|numeric|max_value:${storeActive.total_revenue}`"></input-form>
                      </b-col>
                      <b-col md="12" class="mb-3">
                        <input-form  placeholder="إيبان - IBAN" v-model="withdraw.swift_code" label="سويفت كود"  name="swift_code" validate="required|numeric"></input-form>
                      </b-col>
                      <b-col md="12" class="mb-3">
                        <input-form  placeholder="إيبان - IBAN" v-model="withdraw.currency" label="العملة"  name="currency" validate="required"></input-form>
                      </b-col>
                      <b-col md="12" class="mb-3 d-flex gap_1">
                        <b-button v-if="loadingSubmit"  variant="primary" class="px-5 py-2"><spinner-loading :text="'يتم الحفظ'"></spinner-loading></b-button>
                        <b-button v-else type="submit" variant="primary" class="px-5 py-2">حفظ</b-button>
                        <b-button  @click="this.$router.push({name: 'withdraw'})" variant="" class="px-5 py-2">إلغاء</b-button>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </ValidationObserver>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
import withdrawServices from '../services/withdraw'
import mainInfo from '@/mixins/mainInfo'
export default {
  components: { },
  mixins: [mainInfo],
  mounted () {
    core.index()
  },
  data () {
    return {
      withdraw: {
        account_name: '',
        IBAN_number: '',
        swift_code: '',
        amount: '',
        currency: 'SAR'
      },
      loadingSubmit: false
    }
  },
  methods: {
    onSubmit () {
      this.loadingSubmit = true
      withdrawServices.createWithdraw(this.withdraw).then(res => {
        core.showSnackbar(res.data.message)
        this.loadingSubmit = false
        this.$router.push({ name: 'withdraw' })
      })
    }
  }
}
</script>
