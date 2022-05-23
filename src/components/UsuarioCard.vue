<template>
  <div class="container-vecino" id="vecinos" @click="openAlert(info.id_usuario)">
    <div class="container-login-eliminar container-separador">
        <p>Login: {{login}}</p>
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
  name: 'UsuarioCard',
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
      console.log('Este usuario no existe')
    }
  },
  methods: {

    openAlert (id) {
      this.$confirm('¿Desea añadir este usuario a la comunidad?', '', 'question').then(() => {
        this.crearAsignacion(id)
      })
    },

    async crearAsignacion (id) { // creamos un registro en la tabla comunidad_usuario que es la que vincula una comunidad ocn un usuario (vecino)
      const response = await axios.post('http://localhost/api/?servicio=alta_asignacion', {
        id_comunidad: localStorage.id_comunidad,
        id_usuario: id
      })

      if (response.data.data.resultado === 'ok') {
        console.log('Usuario añadido a la comunidad')
        this.$router.go()
      } else if (response.data.data.resultado === 'usuario_no_existe') {
        console.log('No existe ningún usuario con ese id')
      } else if (response.data.data.resultado === 'usuario_no_existe') {
        console.log('No existe ningún usuario con ese id')
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
