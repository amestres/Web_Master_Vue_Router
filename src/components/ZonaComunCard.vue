<template>
  <div class="container-zona">
    <div class="container-login-eliminar container-separador">
      <div class="anchura-perfecta" @click="goTo">
        <p class="title-zona">{{info.nombre}}</p>
      </div>
      <i class="uil uil-trash-alt icono-eliminar" @click="openAlert(info.id)"></i>
    </div>
    <div class="anchura-perfecta container-separador altura-perfecta" @click="goTo">
        <p>{{info.descripcion}}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ZonaComunCard',
  data () {
    return {
      id: '',
      nombre: '',
      descripcion: '',
      activa: ''
    }
  },
  props: ['info'],
  methods: {
    goTo () {
      localStorage.id_zona = this.info.id
      this.$router.push(`/ADMIN/${localStorage.login}/zona/${localStorage.id_zona}`)
    },

    openAlert (id) {
      localStorage.id_zona = id
      this.$confirm('¿Desea eliminar esta zona común?', '', 'question').then(() => {
        this.eliminarZonaComun()
      })
    },

    async eliminarZonaComun () {
      const response = await axios.post('http://localhost/api/?servicio=eliminar_zona', {
        id_zona: localStorage.id_zona
      })

      if (response.data.data.resultado === 'ok') {
        console.log('Zona común eliminada.')
        this.$router.go()
      } else if (response.data.data.resultado === 'id_zona_no_existe') {
        console.log('No existe ninguna zona con este id')
      }
    }
  }
}
</script>

<style scoped>
  .container-zona{
    height: 300px;
    width: 34rem;
    padding: 10px;
    background-color: #E7EFFF;
    border: 1px solid grey;
    border-radius: 15px;
    margin-top: 20px;
  }

  .container-login-eliminar{
    display: flex;
    justify-content: space-between;
  }

  .icono-eliminar:hover{
    color:red
  }

  .container-separador{
      margin-bottom: 4px;
  }

  .title-zona{
    font-size: 20px;
  }

  .anchura-perfecta{
    width: 99%;
  }

  .altura-perfecta{
    height: 85%;
  }

  /************* Tablet *************/
  @media (max-width: 1280px) {
    .container-zona{
      margin-bottom: 20px;
    }
  }

  /************* Mobile *************/
  @media (max-width: 767px) {
    .container-zona{
      width: 18rem;
    }
  }

</style>
