<template>
  <div>
    <dashboard-page-title @addEvent="$router.push({name: 'addDiscounts'})">الخصومات</dashboard-page-title>
    <main-table :fields="fields" :list_url="'merchant/discounts/coupons'"></main-table>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
export default {
  components: {},
  mounted () {
    core.index()
  },
  data () {
    return {
      fields: [
        '#',
        { label: 'Name', key: 'name', class: 'text-left' },
        { label: 'Type', key: 'type', class: 'text-left' },
        { label: 'start_date', key: 'start_date', class: 'text-left' },
        { label: 'end_date', key: 'end_date', class: 'text-left' },
        { label: 'Status', key: 'status', type: 'status', class: 'text-left' },
        { label: 'Created At', key: 'created_at', class: 'text-left' }
      ]
    }
  },
  methods: {
    addMerchant () {
      console.log('hello')
    }
  }
}
</script>
