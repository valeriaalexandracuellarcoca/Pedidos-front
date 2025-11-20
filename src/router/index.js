// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import RestaurantesLista from '@/views/cliente/RestaurantesLista.vue'
import PaymentView from '@/views/cliente/PaymentView.vue'

const routes = [
  {
    path: '/',
    name: 'Restaurantes',
    component: RestaurantesLista
  },
  {
    path: '/restaurantes/:id/menu',
    name: 'RestauranteMenu',
    component: () => import('@/views/cliente/RestauranteMenu.vue')
  },
  {
    path: '/payment',
    name: 'Payment',
    component: PaymentView
  }
  // Agrega más rutas según necesites
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router