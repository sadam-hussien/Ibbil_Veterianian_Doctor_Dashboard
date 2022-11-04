// Layout
const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout.vue')

const storeSetting = () => import('./views/index')

// start Routes
export default [
  {
    path: '/store-settings',
    name: 'storeSettings',
    component: dashboardLayout,
    children: [{
      path: '',
      name: 'storeSettings',
      meta: {
        name: 'storeSettings',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: storeSetting
    }
    ]
  }
]
