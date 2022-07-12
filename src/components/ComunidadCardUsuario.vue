<template>
  <div class="container-card" @click="goTo">
    <div class="container-nombre-eliminar">
      <div class ="anchura-perfecta" >
        <p class="nombre">{{info.nombre_comunidad}}</p>
      </div>
    </div>
    <div class="anchura-perfecta altura-perfecta" >
      <p>Descripción: {{info.direccion}}</p>
      <p>Código postal: {{info.codigo_postal}}</p>
      <p>Descripción: {{info.descripcion}}</p>
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
  props: {
    info: {
      id_comunidad: String,
      nombre_comunidad: String,
      id_administrador: String,
      nombre_administrador: String,
      direccion: String,
      codigo_postal: String,
      descripcion: String
    }
  },
  methods: {
    goTo () {
      localStorage.id_comunidad = this.info.id_comunidad // Guardamos el id de la comunidad que vamos a visitar

      this.$router.push(`/${this.login}/comunidad/${this.info.id_comunidad}`)
    }
  }
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
    cursor: pointer;
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
