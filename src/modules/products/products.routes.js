// Layout
const dashboardLayout = () => import('@/layouts/DashboardLayout/dashboardLayout.vue')

const allProducts = () => import('./views/index')
const addProduct = () => import('./views/addProduct')
const allCategories = () => import('./categories/views/index')
const addCategories = () => import('./categories/views/addCategories')
const allCollections = () => import('./collections/views/index')
const addCollections = () => import('./collections/views/addCollections')

// start Routes
export default [
  {
    path: '/products',
    name: 'products',
    component: dashboardLayout,
    children: [{
      path: '',
      name: 'products',
      meta: {
        name: 'products',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: allProducts
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
    },
    {
      path: 'show-product/:id',
      name: 'showProduct',
      props: true,
      meta: {
        name: 'showProduct',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: addProduct
    },
    {
      path: 'edit-product/:id',
      name: 'editProduct',
      props: true,
      meta: {
        name: 'editProduct',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: addProduct
    }
    ]
  },
  {
    path: '/categories',
    name: 'categories',
    component: dashboardLayout,
    children: [{
      path: '',
      name: 'categories',
      meta: {
        name: 'products',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: allCategories
    }, {
      path: 'add-categories',
      name: 'addCategories',
      meta: {
        name: 'addCategories',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: addCategories
    }
    ]
  },
  {
    path: '/collections',
    name: 'collections',
    component: dashboardLayout,
    children: [{
      path: '',
      name: 'collections',
      meta: {
        name: 'collections',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: allCollections
    }, {
      path: 'add-collections',
      name: 'addCollections',
      meta: {
        name: 'addCollections',
        parentName: 'marketplace',
        userType: '',
        permission: ''
      },
      component: addCollections
    }
    ]
  }
]
