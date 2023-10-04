import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue';
import ProductDetails from '@/components/ProductDetails.vue';
import ProductInsert from '@/components/ProductInsert.vue';
import ErrorView from '@/views/ErrorView.vue';
import AdminView from '@/views/AdminView.vue';
import LoginView from '@/views/LoginView.vue';
import { useProductStore } from '@/stores/product';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductDetails,
    props: castRouteParamsId
  },
  {
    path: '/product/insert',
    name: 'productInsert',
    component: ProductInsert,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: ErrorView
  }
]

function castRouteParamsId(route) {
  return {
    id: Number(route.params.id),
  };
}

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const productStore = useProductStore();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(!productStore.loggedIn) {
      next('/login')
    } else next()
  } else next()
})

export default router
