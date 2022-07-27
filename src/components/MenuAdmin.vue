<template>
  <div class="container-menu">
    <button class="button" @click="goTo('comunidades')">Comunidades</button>
    <button class="button" @click="goTo('crearComunidad')">Crear comunidad</button>
    <button class="button" @click="openAlert()">Salir</button>
  </div>
</template>

<script>

export default {
  name: 'MenuAdmin',
  data () {
    return {
      string: '',
      login: localStorage.login // Login guardado en el storage
    }
  },
  methods: {
    goTo (palabra) { // método que se lanza cuando pulsamos en un botón del menú. Recibe por parámetros un string con el nombre de la view que queremos que se muestre
      if (this.login === '') { // controlamos que haya un login guardado en el vuex
        this.$router.push('/error') // si no hay ningún login guardado de manera global, mostramos una view de error y damos la opción de volver a logearse
      } else {
        this.$router.push(`/ADMIN/${this.login}/${palabra}`)
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
  .container-menu{
    width: 100%;
    height: 70px;
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

  /************* Tablet *************/
  @media (max-width: 1280px) {

  }

  /************* Mobile *************/
  @media (max-width: 596px) {
    .container-menu{
      height: 50px;
    }
    .button{
      font-size: 14px;
    }
  }
</style>
