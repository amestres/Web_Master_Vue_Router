<template>
  <div id="container-main">
    <div class="container-menu"> <!-- AQUÍ FALTA EL V-IF-->
      <router-link to="/:userLogin/comunidades'" tag="button" class="button">Comunidades</router-link>
      <router-link to="/:userLogin/reservas" tag="button" class="button">Crear comunidad</router-link>
      <router-link to="/:userLogin/perfil" tag="button" class="button">Usuarios</router-link>
    </div>

    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'AdminComunidadesView',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
    .container-main{
        width: 100%;
        height: 100%;
    }
    .container-menu{
       width: 100%;
       height: 4rem;
       display: flex;
       justify-content: center;
       background-color: #5271ff;
       color: white;
    }
</style>
