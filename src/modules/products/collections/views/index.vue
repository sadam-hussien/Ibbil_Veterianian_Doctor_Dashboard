<template>
  <div>
    <dashboard-page-title @addEvent="$router.push({name: 'addCollections'})">{{$t('main.sidebar.collections')}}</dashboard-page-title>
    <main-table :fields="fields" :list_url="'merchant/product-collections'"></main-table>
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
        { label: 'slug', key: 'slug', class: 'text-right' },
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
              url: 'merchant/product-collections',
              titleHeader: 'مجموعة',
              question: 'هل متأكد أنك تريد مسح هذه المجموعة',
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
