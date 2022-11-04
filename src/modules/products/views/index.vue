<template>
  <div>
    <dashboard-page-title @addEvent="$router.push({name: 'addProduct'})">المنتجات</dashboard-page-title>
    <main-table :fields="fields" :list_url="'merchant/products'"></main-table>
  </div>
</template>
<script>
import { core } from '@/config/pluginInit'
// import productServices from '@/modules/products/services/products'
export default {
  components: {},
  mounted () {
    core.index()
  },
  data () {
    return {
      fields: [
        { label: 'الصوره الرئيسية', key: 'featured_image', class: 'text-right', type: 'image' },
        { label: 'الاسم', key: 'name', class: 'text-right' },
        { label: 'الصور', key: 'product_images', class: 'text-right', type: 'multi_image' },
        { label: 'السعر', key: 'price', class: 'text-right' },
        { label: 'الكمية', key: 'quantity', class: 'text-right' },
        { label: 'التاريخ', key: 'created_at', class: 'text-right' },
        { label: 'التاريخ', key: 'created_at', class: 'text-right' },
        { label: 'الحالة', key: 'status', class: 'text-right', type: 'status' },
        {
          label: 'التحكم',
          key: 'actions',
          class: 'text-right',
          type: 'actions',
          actions: [
            {
              text: 'view',
              icon: 'ri-eye',
              color: 'primary',
              ifNavigate: true,
              routePath: 'show-product/:id'
            },
            {
              text: 'edit',
              icon: 'ri-ball-pen-fill',
              color: 'info',
              ifNavigate: true,
              routePath: 'edit-product/:id'
            },
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
        }
      ]
    }
  },
  methods: {
    addMerchant () {
      console.log('hello')
    }
    // deleteProduct (id) {
    //   productServices.deleteProduct(id).then(res => {
    //     console.log('delete', res.data)
    // this.products.splice(i, 1)
    // this.product.splice(this.events.indexOf(product), 1);
    //   })
    // }
  }
}
</script>
