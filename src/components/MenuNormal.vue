<template>
  <div id="container-main">
    <div class="container-menu">
      <button class="button" @click="goTo('comunidades')">Comunidades</button>
      <button class="button" @click="goTo('reservas')">Reservas</button>
      <button class="button" @click="goTo('perfil')">Perfil</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex' // para poder usar los atajos en esta vista tenemos que importarlos de vuex

export default {
  name: 'MenuNormal',
  data () {
    return {
      string: ''
    }
  },
  computed: {
    ...mapState(['idGlobal', 'loginGlobal']) // usamos el mapState para traer las variables del vuex que queramos usar
  },
  methods: {
    goTo (palabra) { // meétodo que s elanza cuando pulsamos en un botón del menú. Recibe por parámetros un string con el nombre de la view que queremos que se muestre
      this.$router.push(`/${this.loginGlobal}/${palabra}`)
    }
  }
}
</script>

<style scoped>
  .container-main{
    width: 100%;
    height: 100vh;
  }

  .container-menu{
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    background-color: #5271ff;
    color: white;
  }

  .button{
    width: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #5271ff;
    color: white;
  }

  .button:hover{
    background-color: #3246fc;
  }
</style>
