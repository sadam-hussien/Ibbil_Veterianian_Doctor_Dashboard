import { marketPlace } from '@/axios'

export default {
  addNewDiscount (payload) {
    return marketPlace().post('merchant/discounts/coupons', payload)
  }
}
