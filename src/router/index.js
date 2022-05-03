import Vue from 'vue'
import VueRouter from 'vue-router'
import RegistroView from '../views/RegistroView.vue'
import LoginView from '../views/LoginView.vue'
import PerfilView from '../views/PerfilView.vue'

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
    path: '/inicio',
    name: 'inicio',
    component: LoginView
  },
  {
    path: '/user/:loginUsuario',
    name: 'user',
    component: PerfilView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
