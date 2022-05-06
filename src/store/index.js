import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // Aquí guardamos todas nuestras variables globales
    idGlobal: '',
    loginGlobal: '',
    idComunidadEditar: ''
  },
  getters: { // Son como funciones computadas para tratar las variables del state. NO MODIFICAR SU VALOR. Le tienes que pasar por parametros la variable state
    isLoged (state) {
      return state.login === ''
    }
  },
  mutations: { // Métodos para cambiar el valor de nuestras variables del state
    setId (state, newId) {
      state.idGlobal = newId
    },
    setLogin (state, newLogin) {
      state.loginGlobal = newLogin
    },
    setIdComunidadEditar (state, idComunidad) {
      state.idComunidadEditar = idComunidad
    }
  },
  actions: {
  },
  modules: {
  }
})
