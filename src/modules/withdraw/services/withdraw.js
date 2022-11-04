import { marketPlace } from '@/axios'

export default {
  createWithdraw (payload) {
    return marketPlace().post('merchant/withdrawals', payload)
  }
}
