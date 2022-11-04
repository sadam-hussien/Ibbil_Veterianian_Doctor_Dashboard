// Layout
const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout.vue')
const allReviews = () => import('./views/index')
const addProduct = () => import('./views/addProduct')

// start Routes
export default [
  {
    path: '/reviews',
    name: 'reviews',
    component: dashboardLayout,
    children: [{
      path: '',
      name: 'reviews',
      meta: {
        name: 'reviews',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: allReviews
    }, {
      path: 'add-product',
      name: 'addProduct',
      meta: {
        name: 'addProduct',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: addProduct
    }
    ]
  }
]
