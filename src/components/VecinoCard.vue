<template>
  <div class="container-vecino" id="vecinos">
      <div class="container-login-eliminar container-separador">
          <p>Login: {{login}}</p>
          <i class="uil uil-trash-alt icono-eliminar" @click="openAlert(info.id)"></i>
      </div>
      <div class="container-separador">
          <p>Nombre: {{nombre}}</p>
      </div>
      <div class="container-separador">
          <p>Apellidos: {{apellidos}}</p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'VecinoCard',
  data () {
    return {
      login: '',
      nombre: '',
      apellidos: '',
      id_usuario: ''
    }
  },
  props: ['info'],
  async mounted () {
    // Llamada a la api para obtener y mostrar los datos de un usuario (en este caso los usuarios devueltos serán los usuarios que sean vecinos de la comunidad)
    const responseUsuario = await axios.post('http://localhost/api/?servicio=obtener_usuarios', {
      id_usuario: this.info.id_usuario
    })

    if (responseUsuario.data.data.resultado === 'ok') { // Si la consulta a la api nos devuelve un registro, mostramos la información del registro en los inputs
      this.login = responseUsuario.data.data.datos[0].login
      this.nombre = responseUsuario.data.data.datos[0].nombre
      this.apellidos = responseUsuario.data.data.datos[0].apellidos
      this.id_usuario = responseUsuario.data.data.datos[0].id_usuario
    } else if (responseUsuario.data.data.resultado === 'sin_resultados') {
      console.log('Esta comunidad no tiene vecinos')
    }
  },
  methods: {

    openAlert (id) {
      localStorage.id_vecino = id
      this.$confirm('¿Desea expulsar este usuario de la comunidad?', '', 'question').then(() => {
        this.eliminarVecino()
      })
    },

    async eliminarVecino () {
      const response = await axios.post('http://localhost/api/?servicio=eliminar_asignacion', {
        id_asignacion: localStorage.id_vecino
      })

      if (response.data.data.resultado === 'ok') {
        console.log('Vecino eliminado de la comunidad')
        this.$router.go()
      } else if (response.data.data.resultado === 'id_asignacion_no_existe') {
        console.log('No existe ningún id de asignación así')
      }
    }
  }
}
</script>

<style scoped>
  .container-vecino{
    height: 70px;
    width: 70%;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #E7EFFF;
    border: 1px solid grey;
    border-radius: 15px;
  }
  .container-vecino:hover{
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .30);
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
</style>
