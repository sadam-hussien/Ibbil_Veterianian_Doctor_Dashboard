<template>
  <div>
    <dashboard-page-title @addEvent="$router.push({name: 'addProduct'})" :showAddBtn="false">المراجعات</dashboard-page-title>

    <main-table :fields="fields" list_url="merchant/reviews"></main-table>
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
        { label: 'صوره المنتج', key: 'product.featured_image', class: 'text-right', type: 'image' },
        { label: 'اسم المنتج', key: 'product.name', class: 'text-right' },
        { label: 'اسم المتجر', key: 'store.name', class: 'text-right' },
        { label: 'التعليق', key: 'comment', class: 'text-right' },
        { label: 'التقييم', key: 'star', class: 'text-right' },
        { label: 'االحالة', key: 'status', class: 'text-right', type: 'status' },
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
