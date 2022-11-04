// Layout
const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout.vue')

const allOffers = () => import('./views/index')
const addOffer = () => import('./views/addOffer')

// start Routes
export default [
  {
    path: '/offers',
    name: 'offers',
    component: dashboardLayout,
    children: [{
      path: '',
      name: 'offers',
      meta: {
        name: 'offers',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: allOffers
    }, {
      path: 'add-offer',
      name: 'addOffer',
      meta: {
        name: 'addOffer',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: addOffer
    }
    ]
  }
]
