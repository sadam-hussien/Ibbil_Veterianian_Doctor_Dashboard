import { veterainary } from '@/axios'

export default {
  uploadMarketplaceFiles (payload) {
    return veterainary().patch('merchant/stores', payload)
  },
  getMerchantInfo () {
    return veterainary().get('merchant/info')
  },
  changeDefaultStore (payload) {
    return veterainary().patch('merchant/change-default-store', payload)
  },
  getDoctorInfo () {
    return veterainary().get('doctors')
  },
  updateDoctorInfo (payload) {
    return veterainary().patch('doctors', payload)
  },
  getRequiredDocuments () {
    return veterainary().get('acceptance-docs?required_for=doctors')
  },
  uploadDotorDocument (payload) {
    return veterainary().post('upload', payload)
  },
  updateDoctorDocuments (payload) {
    return veterainary().post('doctors/documents', payload)
  },
  getDcotorReservation () {
    return veterainary().get('doctor/reservations')
  }
}
