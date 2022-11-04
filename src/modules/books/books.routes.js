// Layout
const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout.vue')

const books = () => import('./views/index')
/* const addProduct = () => import('./views/addProduct') */

// start Routes
export default [
  {
    path: '/books',
    name: 'books',
    component: dashboardLayout,
    children: [{
      path: '',
      name: 'books',
      meta: {
        name: 'books',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: books
    }]
  }
]
