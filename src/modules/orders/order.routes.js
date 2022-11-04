// Layout
const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout.vue')

const allOrders = () => import('./views/index')
/* const addProduct = () => import('./views/addProduct') */

// start Routes
export default [
  {
    path: '/orders',
    name: 'orders',
    component: dashboardLayout,
    children: [{
      path: '',
      name: 'orders',
      meta: {
        name: 'orders',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: allOrders
    }
      /* {
      path: 'add-product',
      name: 'addProduct',
      meta: {
        name: 'addProduct',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: addProduct
    } */
    ]
  }
]
