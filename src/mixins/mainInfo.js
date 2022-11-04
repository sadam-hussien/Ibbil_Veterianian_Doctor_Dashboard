import settingServices from '@/modules/settings/services/settings'
export default {
  data () {
    return {
      vendorInfo: {},
      storeActive: {},
      myStores: []
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo () {
      settingServices.getMerchantInfo().then(res => {
        console.log('user_12345 =>', res)
        this.myStores = res.data.stores
        const selectedStoreIndex = res.data.stores.findIndex(store => {
          return store.id === res.data.default_store_id
        })
        console.log(res.data.stores[selectedStoreIndex])
        this.storeActive = res.data.stores[selectedStoreIndex]
        if (this.storeActive.status === 'pending') {
          this.$router.push({ name: 'setting' })
          localStorage.setItem('storeStatus', 'pending')
        } else if (this.storeActive.status === 'processing') {
          this.$router.push({ name: 'processing' })
          localStorage.setItem('storeStatus', 'processing')
          localStorage.setItem('vendorActiveStore', JSON.stringify(res.data.stores[selectedStoreIndex]))
        } else {
        }
      })
    },
    changeDefaultStore (storeId) {
      settingServices.changeDefaultStore({ default_store_id: storeId }).then(() => {
        this.$router.push({ name: 'index' })
        this.getInfo()
      })
    }
  }
}
