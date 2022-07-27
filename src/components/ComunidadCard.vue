<template>
  <div class="container-card" >
    <div class="container-nombre-eliminar">
      <div class ="anchura-perfecta" @click="goTo">
        <p class="nombre">{{info.nombre_comunidad}}</p>
      </div>
      <i class="uil uil-trash-alt icono-eliminar" @click="openAlert(info.id_comunidad)" style="font-size: 1.5em"></i>
    </div>
    <div class="anchura-perfecta altura-perfecta informacion" @click="goTo">
      <p>Dirección: {{info.direccion}}</p>
      <p>Código postal: {{info.codigo_postal}}</p>
      <p>Descripción: {{info.descripcion}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ComunidadCard',
  data () {
    return {
      string: '',
      login: localStorage.login
    }
  },
  props: ['info'],
  methods: {

    goTo () {
      localStorage.id_comunidad = this.info.id_comunidad // Guardamos el id de la comunidad que vamos a administrar

      this.$router.push(`/ADMIN/${this.login}/comunidad/${this.info.id_comunidad}`)
    },

    openAlert (id) {
      localStorage.id_comunidad = id
      this.$confirm('¿Desea eliminar la comunidad?', '', 'question').then(() => {
        this.eliminarComunidad()
      })
    },

    async eliminarComunidad () {
      const response = await axios.post('http://localhost/api/?servicio=eliminar_comunidad', {
        id_comunidad: localStorage.id_comunidad
      })

      if (response.data.data.resultado === 'ok') {
        console.log('Comunidad eliminada con éxito')
        this.$router.go()
      } else if (response.data.data.resultado === 'id_comunidad_no_existe') {
        console.log('No existe ninguna comunidad con este id')
      }
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

  .icono-eliminar:hover{
    color:red
  }

  /************* Tablet *************/
  @media (max-width: 1280px) {
    .container-card{
      width: 40rem;
    }
  }

  /************* Mobile *************/
  @media (max-width: 767px) {
    .container-card{
      width: 80%;
    }
    .informacion>p{
      font-size: 14px;
    }
  }
</style>
