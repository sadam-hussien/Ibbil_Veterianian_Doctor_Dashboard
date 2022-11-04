import { marketPlace } from '@/axios'

export default {
  getAllCollections () {
    return marketPlace().get('merchant/product-collections')
  },
  addNewCollection (payload) {
    return marketPlace().post('merchant/product-collections', payload)
  },
  editCollection (id, payload) {
    return marketPlace().patch(`merchant/product-collections/${id}`, payload)
  }
}
