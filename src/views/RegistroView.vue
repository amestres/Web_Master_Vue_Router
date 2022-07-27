<template>
  <div class="container-main">
    <div class="container-buttons">
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
          <div v-if="passwordStatus === 'hidden'" class="container-password-superior">
            <label for="password" class="label-formulario">Password</label>
            <i class="uil uil-eye icono-password" @click="showPassword()" style="font-size: 1em"></i>
          </div>
          <div v-else class="container-password-superior">
            <label for="password" class="label-formulario">Password</label>
            <i class="uil uil-eye-slash icono-password" @click="showPassword()" style="font-size: 1em"></i>
          </div>
          <input v-model="formData.password" type="password" name="password" id="passwordInput" required>
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
    <MDBFooter></MDBFooter>
  </div>

</template>

<script>
import axios from 'axios'
import MDBFooter from '../components/Footer.vue'

export default {
  name: 'RegistroView',
  components: {
    MDBFooter
  },
  data () {
    return {
      formData: {
        login: '',
        password: '',
        nombre: '',
        apellidos: ''
      },
      passwordStatus: 'hidden'
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

        localStorage.login = this.formData.login // Guardamos el login y el id del usuario en el storage GLOBAL
        console.log(localStorage.login)
        localStorage.id_usuario = response.data.data.id
        console.log(localStorage.id_usuario)

        this.$router.push(`/${localStorage.login}/comunidades`)
        this.resetInputs()
      } else {
        if (response.data.data.resultado === 'login_usuario_ya_existe') {
          console.log('Ya existe ese login')
        }
      }
    },
    showPassword () {
      const password = document.getElementById('passwordInput')
      if (password.type === 'password') {
        password.type = 'text'
        this.passwordStatus = 'visible'
      } else {
        password.type = 'password'
        this.passwordStatus = 'hidden'
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
.container-main{
    width: 100%;
  }

  .container-buttons{
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .button{
    width: 16rem;
    height: 4rem;
    margin: 2rem;
    border: 0.1px solid black;
    border-radius: 20px;
    font-size: 20px;
    background-color: rgb(13, 108, 252);
    color: white;
    cursor: pointer;
  }

  .button:hover{
    background-color: #3246fc;
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .30);
  }

  .container-formularios{
    display: flex;
    justify-content: center;
  }

  form{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container-separador{
    width: 90%;
    margin-top: 10px;
    padding: .75rem 1rem .25rem;
    justify-content: center;
    border-radius: .5rem;
    background-color: #E7EFFF;
  }

  .container-separador:hover{
    box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .30);
  }

  .container-password-superior{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .icono-password:hover{
    color: grey;
    cursor: pointer;
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

  /************* Tablet *************/
  @media (max-width: 1280px) {

  }

  /************* Mobile *************/
  @media (max-width: 767px) {
    .container-buttons{
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .button{
      margin: 0.5rem;
    }

    .container-formularios{
      margin-top: 2rem;
    }
  }
</style>
