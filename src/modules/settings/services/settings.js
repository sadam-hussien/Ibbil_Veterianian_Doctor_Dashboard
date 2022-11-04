import { marketPlace } from '@/axios'

export default {
  uploadMarketplaceFiles (payload) {
    return marketPlace().patch('merchant/stores', payload)
  },
  getMerchantInfo () {
    return marketPlace().get('merchant/info')
  },
  changeDefaultStore (payload) {
    return marketPlace().patch('merchant/change-default-store', payload)
  },
  getDoctorInfo () {
    return marketPlace().get('doctors')
  },
  updateDoctorInfo (payload) {
    return marketPlace().patch('doctors', payload)
  },
  getRequiredDocuments () {
    return marketPlace().get('acceptance-docs?required_for=doctors')
  }
}
