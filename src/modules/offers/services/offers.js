import { marketPlace } from '@/axios'

export default {
  addNewFlashSale (payload) {
    return marketPlace().post('merchant/flash-sales', payload)
  }
}
