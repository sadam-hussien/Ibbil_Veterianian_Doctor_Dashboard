<template>
  <div>
<!--    <dashboard-page-title>
      لوحة تحكم
    </dashboard-page-title>-->
    Hello Dashboard
  </div>
</template>
<script>
/* import DashboardPageTitle from '@/components/ibbil/DashboardPageTitle.vue' DashboardPageTitle */
import { core } from '@/config/pluginInit'
export default {
  name: 'mainDash',
  components: {},
  mounted () {
    core.index()
  }
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     if (!vm.checkIfLogin()) {
  //       next({ name: 'login' })
  //     } else next()
  //   })
  // }
}
</script>
