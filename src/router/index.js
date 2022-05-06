import Vue from 'vue'
import VueRouter from 'vue-router'

import RegistroView from '../views/RegistroView.vue'
import LoginView from '../views/LoginView.vue'
import ErrorView from '../views/ErrorView.vue'

import ComunidadesView from '../views/ComunidadesView.vue'
import ReservasView from '../views/ReservasView.vue'
import PerfilView from '../views/PerfilView.vue'

import AdminComunidadesView from '../views/AdminComunidadesView.vue'
import AdminCrearComunidadView from '../views/AdminCrearComunidadView.vue'
import AdminUsuariosView from '../views/AdminUsuariosView.vue'
import AdminEditarComunidadView from '../views/AdminEditarComunidadView.vue'

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
  {
    path: '/error',
    name: 'error',
    component: ErrorView
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
    path: '/ADMIN/:userLogin/crearComunidad',
    name: 'adminCrearComunidad',
    component: AdminCrearComunidadView
  },
  {
    path: '/ADMIN/:userLogin/editarComunidad/:idComunidad',
    name: 'adminEditarComunidad',
    component: AdminEditarComunidadView
  },
  {
    path: '/ADMIN/:userLogin/usuarios',
    name: 'adminUsuarios',
    component: AdminUsuariosView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
