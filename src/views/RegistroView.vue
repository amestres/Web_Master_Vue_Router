<template>
  <div>
    <div class="container-botones">
      <router-link to="/" tag="button" class="button">Registro</router-link>
      <router-link to="/login" tag="button" class="button">Login</router-link>
    </div>

    <div class="container-formularios">
      <form onsubmit="event.preventDefault()">
        <div class="container-separador">
          <label for="login" class="label-formulario">Login</label>
          <input v-model="formData.login" type="text" name="login" required>
        </div>
        <div class="container-separador">
          <label for="password" class="label-formulario">Password</label>
          <input v-model="formData.password" type="password" name="password" required>
        </div>

        <div class="container-separador">
          <label for="nombre" class="label-formulario">Nombre</label>
          <input v-model="formData.nombre" type="text" name="nombre" required>
        </div>

        <div class="container-separador">
          <label for="apellidos" class="label-formulario">Apellidos</label>
          <input v-model="formData.apellidos" type="text" name="apellidos" required>
        </div>

        <input type="submit" id="boton" class="button" @click="crearUsuario" value="Registrar usuario">
      </form>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'RegistroView',
  data () {
    return {
      formData: {
        login: '',
        password: '',
        nombre: '',
        apellidos: ''
      }
    }
  },
  methods: {
    // Funcion para crear un usuario nuevo (con rol normal)
    async crearUsuario () {
      const response = await axios.post('http://localhost/api/?servicio=registrar_usuario', {
        login: this.formData.login,
        password: this.formData.password,
        nombre: this.formData.nombre,
        apellidos: this.formData.apellidos
      })

      // Mostramos por consola que mensaje nos ha devuelto la api
      if (response.data.data.resultado === 'ok') {
        console.log('Usuario registrado')
        this.resetInputs()

        const login = response.data.data.login
        this.$router.push(`/${login}/comunidades`)
      } else {
        if (response.data.data.resultado === 'login_usuario_ya_existe') {
          console.log('Ya existe ese login')
        }
      }
    },
    resetInputs () {
      this.formData.login = ''
      this.formData.password = ''
      this.formData.nombre = ''
      this.formData.apellidos = ''
    }
  }
}
</script>

<style scoped>
  .container-botones{
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .button{
    width: 16rem;
    height: 4rem;
    margin: 2rem;
    border: 0.5px solid black;
    border-radius: 20px;
    font-size: 20px;
    background-color: rgb(13, 108, 252);
    color: white;
  }

  .button:hover{
    background-color: #3246fc;
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .30);
  }

  .container-formularios{
    display: flex;
    justify-content: center;
  }

  .container-separador{
    margin-top: 10px;
    justify-content: center;
    border-radius: .5rem;
    padding: .75rem 1rem .25rem;
    background-color: #E7EFFF;
  }

  input{
    width: 100%;
    background-color: #E7EFFF;
    font-size: var(--normal-font-size);
    border: none;
    outline: none;
    padding: .25rem .5rem .5rem 0;
  }

  .label-formulario{
    font-size: .813rem;
  }
</style>
