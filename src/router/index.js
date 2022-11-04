import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/modules/auth/auth.routes'
import dashboardRoutes from '@/modules/dashboard/dashboard.routes'
import productRoutes from '@/modules/products/products.routes'
import orderRoutes from '@/modules/orders/order.routes'
import offersRoutes from '@/modules/offers/offers.routes'
import discountsRoutes from '@/modules/discounts/discounts.routes'
import withdrawRoutes from '@/modules/withdraw/withdraw.routes'
import reviewsRoutes from '@/modules/reviews/reviews.routes'
import settingsRoutes from '@/modules/settings/settings.routes'
import completeInformationRoutes from '@/modules/completeInformation/completeInformation.routes'
import processingRoutes from '@/modules/processing/processing.routes'
import booksRoutes from '@/modules/books/books.routes'
import financialOperationsRoutes from '@/modules/financialOperations/financialOperations.routes'
/* Extra Pages */
const ErrorPage = () => import('../views/Pages/ErrorPage')

Vue.use(VueRouter)

const routes = [
  ...auth,
  ...dashboardRoutes,
  ...productRoutes,
  ...orderRoutes,
  ...offersRoutes,
  ...withdrawRoutes,
  ...reviewsRoutes,
  ...settingsRoutes,
  ...completeInformationRoutes,
  ...processingRoutes,
  ...discountsRoutes,
  ...booksRoutes,
  ...financialOperationsRoutes,
  {
    path: '*',
    name: 'errorPage',
    meta: { name: 'dashboard', userType: 'both' },
    component: ErrorPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
// router.beforeEach((to, from, next) => {
//   console.log('Hello')
//   next(vm => {
//     console.log('vm.checkIfLogin() => ', vm.checkIfLogin())
//     if (!vm.checkIfLogin()) {
//       vm.logout()
//     } else next()
//   })
// })
/* router.beforeEach((to, from, next) => {
    next(vm => {
      if (!vm.checkIfLogin()) {
        next({ name: 'login' })
      } else next()
    })
  if (to.meta.userType === 'both') {
    next()
  } else if (securityFunctions.methods.isAdmin(to.meta.userType)) {
    if (securityFunctions.methods.hasPer(to.meta.permission)) {
      next()
    } else {
      debugger
      next({ name: 'errorPage' })
    }
  } else {
    if (securityFunctions.methods.hasServiceType(to.meta.serviceTypes) || to.meta.serviceTypes === 'all') {
      next()
    } else {
      debugger
      next({ name: 'errorPage' })
    }
  }
}) */
export default router
