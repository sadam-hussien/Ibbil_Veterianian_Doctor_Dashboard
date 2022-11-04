import { marketPlace } from '@/axios'

export default {
  getAllStores () {
    return marketPlace().get('merchant/stores')
  },
  addNewProduct (payload) {
    return marketPlace().post('merchant/products', payload)
  },
  getProduct (id) {
    return marketPlace().get(`merchant/products/${id}`)
  },
  editProduct (id, payload) {
    return marketPlace().put(`merchant/products/${id}`, payload)
  },
  getAllMerchantProducts () {
    return marketPlace().get('merchant/products?limit=1000')
  }
}
