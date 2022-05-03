import Vue from 'vue'
import VueRouter from 'vue-router'
import RegistroView from '../views/RegistroView.vue'
import LoginView from '../views/LoginView.vue'
import ComunidadesView from '../views/ComunidadesView.vue'
import ReservasView from '../views/ReservasView.vue'
import PerfilView from '../views/PerfilView.vue'

import AdminComunidadesView from '../views/AdminComunidadesView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', // inicio de la web
    name: 'regitro',
    component: RegistroView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },

  // USUARIO NORMAL
  {
    path: '/:userLogin/comunidades',
    name: 'comunidades',
    component: ComunidadesView
  },
  {
    path: '/:userLogin/reservas',
    name: 'reservas',
    component: ReservasView
  },
  {
    path: '/:userLogin/perfil',
    name: 'perfil',
    component: PerfilView
  },

  // USUARIO ADMIN
  {
    path: '/ADMIN/:userLogin/comunidades',
    name: 'adminComunidades',
    component: AdminComunidadesView
  },
  {
    path: '/ADMIN/:userLogin/comunidad/:id_comunidad',
    name: 'editarComunidad',
    component: ComunidadesView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
