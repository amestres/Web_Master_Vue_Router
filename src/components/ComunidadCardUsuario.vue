<template>
  <div class="container-card" >
    <div class="container-nombre-eliminar">
      <div class ="anchura-perfecta" >
        <p class="nombre">{{info.id_comunidad}}</p>
      </div>
    </div>
    <div class="anchura-perfecta altura-perfecta" >
      <p>Descripción: </p>
      <p>Código postal: </p>
      <p>Descripción: </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ComunidadCardUsuario',
  data () {
    return {
      login: localStorage.login
    }
  },
  props: ['info']
}
</script>

<style scoped>
  .container-card{
    height: 200px;
    width: 50%;
    margin-top: 20px;
    padding: 20px;
    background-color: #E7EFFF;
    border: 1px solid grey;
    border-radius: 15px;
  }
  .container-card:hover{
    height: 200px;
    margin-top: 20px;
    background-color: #E7EFFF;
    border-radius: 15px;
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .30);
  }

  .container-nombre-eliminar{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .anchura-perfecta{
    width: 99%;
  }

  .altura-perfecta{
    height: 85%;
  }

  .nombre{
    font-size: 20px;
  }
</style>
