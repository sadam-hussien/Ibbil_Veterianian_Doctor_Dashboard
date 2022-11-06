import { veterainary } from '@/axios'

export default {
  listDataTabl (url, filter) {
    return veterainary().get(url, {
      params: filter
    })
  },
  commonUploadFiles (payload, config) {
    return veterainary().post('media-files/upload', payload, config)
  },
  removeImage (id, type) {
    return veterainary().get(`remove-image/${id}/${type}`)
  },
  removeRow (url, rowId) {
    console.log(url, rowId)
    return veterainary().delete(`${url}/${rowId}`)
  },
  changeStatus (payload) {
    return veterainary().post('change-status', payload)
  }
}
