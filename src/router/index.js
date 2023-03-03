import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      component: () => import('../views/AdminView.vue'),
      children:[
        {
          path: 'products',
          name:'products',
          component: () => import('../views/admin/AdminProducts.vue')
        },
        {
          path: 'orders',
          component: () => import('../views/admin/AdminOrders.vue')
        },
        {
          path: 'coupons',
          component: () => import('../views/admin/AdminCoupons.vue')
        },
        {
          path: 'news',
          component: () => import('../views/admin/AdminNewsArticle.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*', // 重新導向
      redirect: {
        name: 'products'
      }
    }
  ]
})

export default router
