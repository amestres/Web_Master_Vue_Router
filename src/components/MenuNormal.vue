<template>
  <div class="container-menu">
    <button class="button" @click="goTo('comunidades')">Comunidades</button>
    <button class="button" @click="goTo('reservas')">Reservas</button>
    <button class="button salir" @click="openAlert()">Salir</button>
  </div>
</template>

<script>

export default {
  name: 'MenuNormal',
  data () {
    return {
      string: '',
      login: localStorage.login
    }
  },
  methods: {
    goTo (palabra) { // método que se lanza cuando pulsamos en un botón del menú. Recibe por parámetros un string con el nombre de la view que queremos que se muestre
      if (this.login === '') { // controlamos que haya un login guardado en el vuex
        this.$router.push('/error') // si no hay ningún login guardado de manera global, mostramos una view de error y damos la opción de volver a logearse
      } else {
        this.$router.push(`/${this.login}/${palabra}`)
      }
    },
    openAlert () {
      this.$confirm('¿Desea salir de la cuenta?', '', 'question').then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped>
  .container-main{
    width: 100%;
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
    font-size: 20px;
    cursor: pointer;
  }

  .button:hover{
    background-color: #3246fc;
  }
</style>
