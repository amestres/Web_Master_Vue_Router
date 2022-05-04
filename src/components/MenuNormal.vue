<template>
  <div id="container-main">
    <div class="container-menu">
      <router-link to="/:userLogin/comunidades" tag="button" class="button">Comunidades</router-link>
      <router-link to="/:userLogin/reservas" tag="button" class="button">Reservas</router-link>
      <router-link to="/:userLogin/perfil" tag="button" class="button">Perfil</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MenuNormal',
  data () {
    return {

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
