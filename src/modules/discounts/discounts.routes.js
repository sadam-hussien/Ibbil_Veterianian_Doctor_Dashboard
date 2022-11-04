// Layout
const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout.vue')

const allOffers = () => import('./views/index')
const addDiscounts = () => import('./views/addDiscounts')

// start Routes
export default [
  {
    path: '/discount',
    name: 'discount',
    component: dashboardLayout,
    children: [{
      path: '',
      name: 'discount',
      meta: {
        name: 'discount',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: allOffers
    }, {
      path: 'add-discounts',
      name: 'addDiscounts',
      meta: {
        name: 'addDiscounts',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: addDiscounts
    }
    ]
  }
]
