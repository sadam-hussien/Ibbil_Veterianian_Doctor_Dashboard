<template>
  <div>
    <dashboard-page-title @addEvent="$router.push({name: 'addWithdraw'})">عمليات السحب</dashboard-page-title>

    <main-table :fields="fields" list_url="merchant/withdrawals"></main-table>
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
        { label: 'Account Name', key: 'bank_info.account_name', class: 'text-left' },
        { label: 'IBAN Number', key: 'bank_info.IBAN_number', class: 'text-left' },
        { label: 'Swift Code', key: 'bank_info.swift_code', class: 'text-left' },
        { label: 'Account Name', key: 'bank_info.account_name', class: 'text-left' },
        { label: 'Amount', key: 'amount', class: 'text-left' },
        { label: 'Current Balance', key: 'current_balance', class: 'text-left' },
        { label: 'Status', key: 'status', class: 'text-left', type: 'status' },
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
