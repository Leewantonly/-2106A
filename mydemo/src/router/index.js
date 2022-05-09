import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: () => import('../views/Home'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: () => import('../views/Users/welcome')
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('../views/Users')
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import('../views/Roles/roles.vue')
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => import('../views/Roles/rights.vue')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/Goods/goods.vue')
      },
      {
        path: '/add',
        name: 'add',
        component: () => import('../views/Goods/add.vue')
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('../views/Goods/categories.vue')
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import('../views/Orders/orders.vue')
      },
      {
        path: '/params',
        name: 'params',
        component: () => import('../views/Goods/params.vue')
      },
      {
        path: '/reports',
        name: 'reports',
        component: () => import('../views/Reports/reports.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login')
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token')
  if (to.path === '/login') {
    next()
  } else {
    if (token) {
      next()
    } else {
      next('/login')
    }
  }

})
export default router
