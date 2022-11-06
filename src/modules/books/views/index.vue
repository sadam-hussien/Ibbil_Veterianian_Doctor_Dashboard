<template>
  <div>
    <dashboard-page-title :showAddBtn="false" :showFilter="true" :showSearch="true" :showExportation="true">الحجوزات</dashboard-page-title>
    <main-table :fields="fields" list_url="doctor/reservations"></main-table>
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
        { label: 'اسم العميل', key: 'customer_name', class: 'text-right' },
        { label: 'تكلفة الكشف', key: 'price', class: 'text-right' },
        { label: 'تاريخ الزيارة', key: 'time.date', class: 'text-right' },
        { label: 'التشخيص', key: 'diagnosis', type: 'status', class: 'text-right' },
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
              url: 'merchant/products',
              titleHeader: 'منتج',
              question: 'هل متأكد أنك تريد مسح هذا المنتج',
              textContent: 'name',
              textDeleteButton: 'بالتأكيد, مسح',
              textCancelButton: 'الغاء',
              showAlert: true
            }
          ]
        },
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
