<template>
  <div>
    <dashboard-page-title @addEvent="$router.push({name: 'addProduct'})" >الطلبات</dashboard-page-title>

    <main-table :fields="fields" list_url="merchant/orders"></main-table>
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
        { label: 'Id', key: 'id', class: 'text-right', sortable: true },
        { label: 'اسم العميل', key: 'order_address.name', class: 'text-right' },
        { label: 'المنتج', key: 'order_products', array_keys: ['product_name'], class: 'text-right', type: 'array' },
        { label: 'العنوان', key: 'order_address.address', class: 'text-right' },
        { label: 'رقم الهاتف', key: 'order_address.phone', class: 'text-right' },
        { label: 'الحالة', key: 'status', type: 'status', class: 'text-right' },
        { label: 'المبلغ الاجمالى', key: 'total_amount', class: 'text-right' },
        { label: 'Created At', key: 'created_at', class: 'text-right' }
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
