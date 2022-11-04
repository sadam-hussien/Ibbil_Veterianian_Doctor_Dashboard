<template>
  <div>
    <dashboard-page-title @addEvent="$router.push({name: 'addCategories'})">{{$t('main.sidebar.categories')}}</dashboard-page-title>
    <main-table :fields="fields" :list_url="'merchant/product-categories'"></main-table>
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
        { label: 'الصوره', key: 'featured_image', class: 'text-right', type: 'image' },
        { label: 'الاسم', key: 'name', class: 'text-right' },
        { label: 'الوصف', key: 'description', class: 'text-right' },
        { label: 'عدد المنتجات', key: 'num_of_products', class: 'text-right' },
        {
          label: 'التحكم',
          key: 'actions',
          class: 'text-right',
          type: 'actions',
          actions: [
            {
              text: 'Delete',
              icon: 'ri-delete-bin-line',
              color: 'danger',
              url: 'merchant/product-categories',
              titleHeader: 'قسم',
              question: 'هل متأكد أنك تريد مسح هذا القسم',
              textContent: 'name',
              textDeleteButton: 'بالتأكيد, مسح',
              textCancelButton: 'الغاء',
              showAlert: true
            }
          ]
        }
      ]
    }
  },
  methods: {
  }
}
</script>
