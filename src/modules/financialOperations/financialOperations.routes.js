// Layout
const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout.vue')

const financialOperations = () => import('./views/index')

// start Routes
export default [
  {
    path: '/financialOperations',
    name: 'financialOperations',
    component: dashboardLayout,
    children: [{
      path: '',
      name: 'financialOperations',
      meta: {
        name: 'financialOperations',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: financialOperations
    }]
  }
]
