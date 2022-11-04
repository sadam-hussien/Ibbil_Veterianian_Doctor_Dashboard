// Layout
const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout.vue')

const allWithdraws = () => import('./views/index')
const addWithdraw = () => import('./views/addWithdraw')

// start Routes
export default [
  {
    path: '/withdraw',
    name: 'withdraw',
    component: dashboardLayout,
    children: [{
      path: '',
      name: 'withdraw',
      meta: {
        name: 'withdraw',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: allWithdraws
    },
    {
      path: 'add-withdraw',
      name: 'addWithdraw',
      meta: {
        name: 'addWithdraw',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: addWithdraw
    }
    ]
  }
]
