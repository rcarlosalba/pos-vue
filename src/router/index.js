import { createRouter, createWebHistory } from 'vue-router';
import ShopView from '../views/ShopView.vue';
import AdminLayout from '../views/admin/AdminLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: ShopView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => AdminLayout,
      children: [
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/admin/ProductsView.vue'),
        },
        /* {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('../views/admin/OrdersView.vue'),
        }, */
      ],
    },
  ],
});

export default router;
