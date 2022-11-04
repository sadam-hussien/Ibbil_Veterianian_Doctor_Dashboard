import { marketPlace } from '@/axios'

export default {
  getAllCategories () {
    return marketPlace().get('merchant/product-categories')
  },
  addNewCategory (payload) {
    return marketPlace().post('merchant/product-categories', payload)
  },
  getAllTaxes (payload) {
    return marketPlace().get('admin/taxes')
  },
  editCategory (id, payload) {
    return marketPlace().patch(`merchant/product-categories/${id}`, payload)
  }
}
